import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Injector,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  BooleanConverter,
  IFormDataComponent,
  IFormDataTypeComponent,
  InputConverter,
  OFormComponent,
  OFormValue,
  OntimizeService,
  OValueChangeEvent,
  ServiceUtils,
  SQLTypes,
  Util,
} from 'ontimize-web-ngx';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import * as uuid from 'uuid';

import { BaseOptions } from '../interfaces/base-options.interface';
import { DynamicFormDefinition } from '../interfaces/o-dynamic-form-definition.interface';
import { ODynamicFormEvents } from '../services/o-dynamic-form-events.service';
import { ODynamicFormGeneralEvents } from '../services/o-dynamic-form-general-events.service';

@Component({
  selector: 'o-dynamic-form',
  templateUrl: './o-dynamic-form.component.html',
  styleUrls: ['./o-dynamic-form.component.scss'],
  inputs: [
    'oattr : attr',
    'formDefinition: form-definition',
    'editMode: edit-mode',
    'entity',
    'keys',
    'parentKeys: parent-keys',
    'columns',
    'service',
    'serviceType : service-type',
    'queryOnInit : query-on-init',
    'queryOnBind : query-on-bind',
    'queryOnRender : query-on-render',
    'registerInParentForm : register-in-parent-form',
    'autoBinding: automatic-binding',
    'autoRegistering: automatic-registering'
  ],
  outputs: [
    'render',
    'submit',
    'change',
    'onAddComponent',
    'onMoveComponent',
    'onEditComponentSettings',
    'onDeleteComponent',
    'onDynamicFormDataLoaded',
    'onDrop'
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.o-dynamic-form]': 'true'
  }
})
export class ODynamicFormComponent implements OnInit, IFormDataComponent, IFormDataTypeComponent {

  public formDefComponents$: BehaviorSubject<any> = new BehaviorSubject(null);

  /* inputs */
  public oattr: string;
  protected _editMode: boolean = false;
  get editMode(): boolean {
    return this._editMode;
  }
  set editMode(value: boolean) {
    this._editMode = BooleanConverter(value);
    this.generalEventsSevice.editModeChange.next(this._editMode);
  }
  public entity: string;
  public keys: string = '';
  public parentKeys: string = '';
  public columns: string = '';
  public service: string;
  public serviceType: string;
  @InputConverter()
  public queryOnInit: boolean = true;
  @InputConverter()
  public queryOnBind: boolean = true;
  @InputConverter()
  public queryOnRender: boolean = true;
  @InputConverter()
  public registerInParentForm: boolean = true;
  @InputConverter()
  public autoBinding: boolean = true;
  @InputConverter()
  public autoRegistering: boolean = true;
  /* end of inputs */

  /*parsed inputs */
  public innerFormDefinition: DynamicFormDefinition = null;
  public keysArray: string[] = [];
  public colsArray: string[] = [];
  public dataService: any;
  /* end of parsed inputs */

  public loading: boolean = false;
  public formData: Object = {};

  public render: EventEmitter<any> = new EventEmitter();
  public submit: EventEmitter<any> = new EventEmitter();
  public change: EventEmitter<any> = new EventEmitter();
  public onChange: EventEmitter<Object>;
  public onValueChange: EventEmitter<OValueChangeEvent>;
  public onAddComponent: EventEmitter<any> = new EventEmitter();
  public onMoveComponent: EventEmitter<any> = new EventEmitter();
  public onEditComponentSettings: EventEmitter<any> = new EventEmitter();
  public onDeleteComponent: EventEmitter<any> = new EventEmitter();
  public onDynamicFormDataLoaded: EventEmitter<Object> = new EventEmitter<Object>();
  public onDrop: EventEmitter<Object> = new EventEmitter<Object>();

  protected onFormInitStream: EventEmitter<Object> = new EventEmitter<Object>();
  protected onUrlParamChangedStream: EventEmitter<Object> = new EventEmitter<Object>();
  protected reloadStream: Observable<any>;

  protected _pKeysEquiv = {};

  protected urlParams: Object;

  protected _fControl: FormControl;

  @HostBinding('style.flexDirection') get style_flexDirection() { return 'column'; }

  uId: string;
  connectedDropListIds: string[];

  protected subscriptions: Subscription = new Subscription();

  constructor(
    protected actRoute: ActivatedRoute,
    protected injector: Injector,
    public events: ODynamicFormEvents,
    protected generalEventsSevice: ODynamicFormGeneralEvents,
    protected elRef: ElementRef,
    @Optional() @Inject(forwardRef(() => OFormComponent)) protected parentForm: OFormComponent
  ) {
    this.uId = uuid.v4();

    this.reloadStream = combineLatest(
      this.onFormInitStream.asObservable(),
      this.onUrlParamChangedStream.asObservable()
    );

    this.subscriptions.add(this.reloadStream.subscribe(valArr => {
      if (Util.isArray(valArr) && valArr.length === 2) {
        if (this.queryOnInit && valArr[0] === true && valArr[1] === true) {
          this.doQuery(true);
        }
      }
    }));

    this.subscriptions.add(this.generalEventsSevice.componentDropped.subscribe((arg) => {
      this.doDrag(arg.event, { parent: arg.parent });
    }));

    this.subscriptions.add(this.generalEventsSevice.componentDeleted.subscribe((arg) => {
      this.onDeleteComponent.emit(arg);
    }));

    this.subscriptions.add(this.generalEventsSevice.editComponent.subscribe((arg) => {
      this.onEditComponentSettings.emit(arg);
    }));

  }

  ngOnInit(): void {
    this.keysArray = Util.parseArray(this.keys);
    this.colsArray = Util.parseArray(this.columns);
    const pkArray = Util.parseArray(this.parentKeys);
    this._pKeysEquiv = Util.parseParentKeysEquivalences(pkArray);

    // ensuring formControl creation
    this.getControl();

    this.configureService();

    this.registerFormListeners();

    this.subscriptions.add(this.actRoute.params.subscribe(params => {
      this.urlParams = params;
      if (this.urlParams && Object.keys(this.urlParams).length > 0) {
        this.onUrlParamChangedStream.emit(true);
      }
    }));

    if (this.parentForm && this.queryOnBind) {
      this.subscriptions.add(this.parentForm.onDataLoaded.subscribe(data => {
        const filter = ServiceUtils.getParentKeysFromForm(this._pKeysEquiv, this.parentForm);
        this.queryData(filter);
      }));
    }
  }

  ngOnDestroy(): void {
    this.unregisterFormListeners();
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  public getSQLType(): number {
    return SQLTypes.OTHER;
  }

  public getAttribute(): string {
    if (this.oattr) {
      return this.oattr;
    } else if (this.elRef && this.elRef.nativeElement.attributes['attr']) {
      return this.elRef.nativeElement.attributes['attr'].value;
    }
    return this.oattr;
  }

  public ngAfterViewInit(): void {
    this.onFormInitStream.emit(true);
  }

  public configureService(): void {
    let loadingService: any = OntimizeService;
    if (this.serviceType) {
      loadingService = this.serviceType;
    }
    try {
      this.dataService = this.injector.get(loadingService);
      if (Util.isDataService(this.dataService)) {
        const serviceCfg = this.dataService.getDefaultServiceConfiguration(this.service);
        if (this.entity) {
          serviceCfg['entity'] = this.entity;
        }
        this.dataService.configureService(serviceCfg);
      }
    } catch (e) {
      console.error(e);
    }
  }

  public registerFormListeners(): void {
    if (this.parentForm && this.registerInParentForm) {
      this.parentForm.registerFormComponent(this);
      this.parentForm.registerDynamicFormComponent(this);
      this.parentForm.registerSQLTypeFormComponent(this);
    }
  }

  public unregisterFormListeners(): void {
    if (this.parentForm && this.registerInParentForm) {
      this.parentForm.unregisterFormComponent(this);
      this.parentForm.unregisterDynamicFormComponent(this);
      this.parentForm.unregisterSQLTypeFormComponent(this);
    }
  }

  public getValue(): void {
    // TO-DO
  }

  public clearValue(): void {
    // TO-DO
  }

  public setValue(val: any): void {
    this.formDefinition = val;
  }

  set data(value: any) {
    let formDef: any;
    if (value instanceof OFormValue) {
      formDef = value.value;
    }
    if (!formDef) {
      formDef = {};
    }
    this.formDefinition = formDef;
  }

  public isAutomaticBinding(): boolean {
    return this.autoBinding;
  }

  public isAutomaticRegistering(): boolean {
    return this.autoRegistering;
  }

  public doQuery(useFilter: boolean = false): void {
    let filter = {};
    if (useFilter) {
      filter = this.getCurrentKeysValues();
    }
    this.queryData(filter);
  }

  public getAttributesToQuery(): any[] {
    const attributes: any[] = [];
    // add form keys...
    if (this.keysArray && this.keysArray.length > 0) {
      attributes.push(...this.keysArray);
    }
    if (this.oattr) {
      attributes.push(this.oattr);
    }
    return attributes;
  }

  public _setData(data): void {
    if (Util.isArray(data) && data.length === 1) {
      this.formData = data[0];
      this._emitData(this.formData);
    } else if (Util.isObject(data)) {
      this.formData = data;
      this._emitData(this.formData);
    } else {
      console.warn('DynamicForm has received not supported service data. Supported data are Array or Object');
    }
    if (this.oattr) {
      const dynamicData = this.formData[this.oattr];
      this.formDefinition = dynamicData;
    }
  }

  public _emitData(data): void {
    this.onDynamicFormDataLoaded.emit(data);
  }

  public queryData(filter): void {
    if (!Util.isDefined(filter) || (Util.isObject(filter) && Object.keys(filter).length === 0)) {
      return;
    }
    const self = this;
    const loader = self.load();
    if (this.dataService === undefined) {
      console.warn('No service configured! aborting query');
      return;
    }
    // let sqlTypes = this.getAttributesSQLTypes();
    this.dataService.query(filter, this.getAttributesToQuery(), this.entity).subscribe(resp => {
      loader.unsubscribe();
      if (resp.code === 0) {
        self._setData(resp.data);
      } else {
        console.log('error ');
      }
    }, err => {
      console.log(err);
      loader.unsubscribe();
    });
  }

  get areEmptyComponents(): boolean {
    if (this.innerFormDefinition && this.innerFormDefinition.components) {
      return this.innerFormDefinition.components.length === 0;
    }
    return true;
  }

  innerRenders: number = 0;
  public onComponentRendered(): void {
    this.innerRenders++;
    // The form is done rendering.
    if (this.innerRenders === this.innerFormDefinition.components.length && this.render) {
      this.render.emit(this.queryOnRender);
      this.setConnectedIds();
      this.innerRenders = 0;
    }
  }

  public load(): any {
    const self = this;
    const loadObservable = new Observable(observer => {
      const timer = window.setTimeout(() => {
        observer.next(true);
      }, 250);

      return () => {
        window.clearTimeout(timer);
        self.loading = false;
      };

    });
    const subscription = loadObservable.subscribe(val => {
      self.loading = val as boolean;
    });
    return subscription;
  }

  set formDefinition(definition: any) {
    let definitionJSON: any = definition;
    if (definition && typeof definition === 'string') {
      try {
        definitionJSON = JSON.parse(definition);
      } catch (e) {
        console.error('set formDefinition error', definition);
      }
    }
    this.innerFormDefinition = definitionJSON;
    if (this.innerFormDefinition) {
      this.formDefComponents$.next(this.innerFormDefinition.components);
    }
  }

  get formDefinition(): any {
    return this.innerFormDefinition;
  }

  public getControl(): FormControl {
    if (!this._fControl) {
      this._fControl = new FormControl();
    }
    return this._fControl;
  }

  public getFormControl(): FormControl {
    return this._fControl;
  }

  public hasError(error: string): boolean {
    return this._fControl && this._fControl.hasError(error);
  }

  protected getCurrentKeysValues(): any {
    const filter = {};
    if (this.urlParams && this.keysArray) {
      this.keysArray.forEach(key => {
        if (this.urlParams[key]) {
          filter[key] = this.urlParams[key];
        }
      });
    }

    const keys = Object.keys(this._pKeysEquiv);
    if (this.urlParams && keys && keys.length > 0) {
      keys.forEach(item => {
        const urlVal = this.urlParams[this._pKeysEquiv[item]];
        if (urlVal) {
          filter[item] = urlVal;
        }
      });
    }
    return filter;
  }

  onDragDrop(event: CdkDragDrop<any>) {
    const attrs = this.innerFormDefinition.components.map((comp: any) => comp.attr);
    this.doDrag(event, { attrs: attrs });
  }

  private doDrag(event: CdkDragDrop<any>, args: any) {
    const comp = event.item.data;
    if (comp.hasOwnProperty('directive')) {
      delete comp['directive'];
      this.onAddComponent.emit({
        component: comp,
        parent: args.parent,
        index: event.currentIndex
      });
    } else {
      if (event.previousContainer.id === event.container.id) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        const orderedAttrs = args.attrs || event.container.data.map(child => child.attr);
        this.onMoveComponent.emit({
          type: 'move',
          parent: args.parent,
          attrs: orderedAttrs
        });
      } else {
        const previousContainerComp = this.findComponentByUId(this.innerFormDefinition.components, event.previousContainer.id);
        const containerComp = this.findComponentByUId(this.innerFormDefinition.components, event.container.id);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.onMoveComponent.emit({
          type: 'transfer',
          previousContainer: previousContainerComp,
          container: containerComp,
          previousIndex: event.previousIndex,
          currentIndex: event.currentIndex
        });
      }
    }
    this.onDrop.emit();
  }

  private findComponentByUId(components: BaseOptions<any>[], uId: string) {
    return components.find(child => {
      const comp = child as any;
      if (comp.dynamicComponent && comp.dynamicComponent.uId === uId) {
        return comp;
      } else if (comp.children != null) {
        this.findComponentByUId(comp.children, uId);
      }
      return undefined;
    });
  }


  private setConnectedIds() {
    const map = {};

    const allUIds = [this.uId];
    if (this.innerFormDefinition && this.innerFormDefinition.components) {
      this.innerFormDefinition.components.forEach((c: any) => {
        const childIds = this.getContainerIds(c);
        if (c.dynamicComponent && c.dynamicComponent.uId) {
          map[c.dynamicComponent.uId] = childIds;
        }
        allUIds.push(...childIds);
      });
    }
    allUIds.reverse();
    this.connectedDropListIds = allUIds;
    if (this.innerFormDefinition && this.innerFormDefinition.components) {
      this.innerFormDefinition.components.forEach((c: any) => {
        if (c.dynamicComponent && map.hasOwnProperty(c.dynamicComponent.uId)) {
          const compUIds = map[c.dynamicComponent.uId];
          const otherIds = allUIds.filter(item => compUIds.indexOf(item) < 0);
          c.dynamicComponent.connectedDropListIds = otherIds;
        }
      });
    }
  }

  private getContainerIds(c: any): string[] {
    const result = (c.dynamicComponent && c.dynamicComponent.uId) ? [c.dynamicComponent.uId] : [];
    if (c.children) {
      c.children.forEach(child => result.push(...this.getContainerIds(child)));
    }
    return result;
  }
}
