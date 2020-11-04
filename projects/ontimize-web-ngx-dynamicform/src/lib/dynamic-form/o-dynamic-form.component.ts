import { CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
  QueryList,
  ViewChildren,
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

import { BaseComponent } from '../components/base.component';
import { DynamicFormDefinition } from '../interfaces/o-dynamic-form-definition.interface';
import { ODynamicFormGeneralEvents } from '../services/o-dynamic-form-general-events.service';
import { ODFComponentComponent } from './dynamic-form-component/o-dynamic-form-component.component';

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
    'autoRegistering: automatic-registering',
    'editableComponents: editable-components'
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
    'onDrop',
    'onSelectComponent',
  ],
  encapsulation: ViewEncapsulation.None
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
    this.generalEventsService.setEditMode(this._editMode);
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

  set editableComponents(arg: string[]) {
    if (this.generalEventsService) {
      this.generalEventsService.setEditableComponents(arg);
    }
  }
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
  public onEditComponentSettings: EventEmitter<string> = new EventEmitter();
  public onDeleteComponent: EventEmitter<string> = new EventEmitter();
  public onDynamicFormDataLoaded: EventEmitter<Object> = new EventEmitter<Object>();
  public onDrop: EventEmitter<Object> = new EventEmitter<Object>();
  public onSelectComponent: EventEmitter<string> = new EventEmitter<string>();

  protected onFormInitStream: EventEmitter<Object> = new EventEmitter<Object>();
  protected onUrlParamChangedStream: EventEmitter<Object> = new EventEmitter<Object>();
  protected reloadStream: Observable<any>;

  protected _pKeysEquiv = {};

  protected urlParams: Object;

  protected _fControl: FormControl;

  @HostBinding('style.flexDirection') get style_flexDirection() { return 'column'; }
  @HostBinding('class.o-dynamic-form') get dynamicFormClass() { return true; }

  uId: string;
  _connectedDropListIds: string[] = [];
  isHovering: boolean = false;
  protected dynamicChildrenSubscription: Subscription;
  protected subscriptions: Subscription = new Subscription();

  @ViewChildren('odfComponent') dynamicChildren: QueryList<ODFComponentComponent<any>>;

  constructor(
    protected actRoute: ActivatedRoute,
    protected injector: Injector,
    protected generalEventsService: ODynamicFormGeneralEvents,
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

    this.subscriptions.add(this.generalEventsService.componentDropped$.subscribe((arg) => {
      this.doDrag(arg.event, { parent: arg.parent });
    }));

    this.subscriptions.add(this.generalEventsService.deleteComponentByAttr$.subscribe((arg: string) => {
      this.onDeleteComponent.emit(arg);
    }));

    this.subscriptions.add(this.generalEventsService.editComponentByAttr$.subscribe((arg: string) => {
      this.onEditComponentSettings.emit(arg);
    }));

    this.subscriptions.add(this.generalEventsService.dragStarted$.subscribe((arg) => {
      this.dragStarted(arg.event, arg.parent);
    }));

    this.subscriptions.add(this.generalEventsService.dragEnded$.subscribe((arg) => {
      this.dragEnded(arg.event, arg.parent);
    }));

    this.subscriptions.add(this.generalEventsService.componentClicked$.subscribe(attr => {
      if (attr) {
        this.onSelectComponent.emit(attr);
      }
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

  ngAfterViewInit(): void {
    this.onFormInitStream.emit(true);
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

  protected renderCount: number = 0;

  public onComponentRendered(): void {
    if (this.renderCount > this.innerFormDefinition.components.length) {
      return;
    }
    this.renderCount++;
    if (this.renderCount === this.innerFormDefinition.components.length) {
      this.render.emit(true);
      this.addDynamicChildrenListener();
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
    this.renderCount = 0;
    this.innerFormDefinition = definitionJSON;
    if (this.innerFormDefinition) {
      this.componentsArray = this.innerFormDefinition.components;
      this.formDefComponents$.next(this.innerFormDefinition.components);
      if (this.innerFormDefinition.components.length === 0) {
        this._connectedDropListIds = [this.uId];
      }
    }
  }

  componentsArray: any[] = [];

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
    if (comp.new) {
      delete comp['new'];
      this.onAddComponent.emit({
        component: comp,
        parent: args.parent,
        index: event.currentIndex
      });
      this.setActiveComponent(comp.configuredInputs.attr);
    } else {
      if (event.previousContainer.id === event.container.id) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        if (event.previousIndex !== event.currentIndex) {
          const orderedAttrs = args.attrs || event.container.data.map(child => child.attr);
          this.onMoveComponent.emit({
            type: 'move',
            parent: args.parent,
            attrs: orderedAttrs
          });
        }
      } else {
        const componentsArray = this.dynamicChildren.toArray();
        const previousContainerComp = this.findComponentByUId(componentsArray, event.previousContainer.id);
        const containerComp = this.findComponentByUId(componentsArray, event.container.id);
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
          previousIndex: event.previousIndex - 1,
          currentIndex: event.currentIndex
        });
      }
    }
    this.onDrop.emit();
  }

  private findComponentByUId(components: ODFComponentComponent<any>[], uId: string) {
    const result = components.filter(c => !c.isTemporalComponent).find(c => {
      if (c.uId === uId) {
        return c;
      } else {
        this.findComponentByUId(c.children, uId);
      }
      return null;
    });
    return result ? result.component : null;
  }

  protected addDynamicChildrenListener() {
    if (!this.editMode || !this.dynamicChildren || this.dynamicChildrenSubscription != null) {
      return;
    }
    this.dynamicChildrenSubscription = this.dynamicChildren.changes.subscribe(() => {
      if (this.innerFormDefinition
        && this.innerFormDefinition.components.length === this.dynamicChildren.toArray().length) {
        this.setConnectedDropListIds();
        this.dynamicChildrenSubscription.unsubscribe();
        this.dynamicChildrenSubscription = null;
      }
    });
  }

  get connectedDropListIds(): string[] {
    return this._connectedDropListIds;
  }

  public dropListEntered() {
    this.isHovering = true;
  }

  public dropListExited() {
    this.isHovering = false;
  }

  public dragStarted(event: CdkDragStart<any>, parent?: BaseComponent<any>) {

    const childArray = parent ? parent.getChildren() : this.innerFormDefinition.components;
    if (!childArray.find(item => item.temp)) {
      const index = childArray.findIndex(child => child.attr === event.source.data.attr);
      const newChildData = Object.assign({}, event.source.data, { temp: true });
      if (parent) {
        parent.addChildInPosition(newChildData, index);
      } else {
        this.innerFormDefinition.components.splice(index, 0, newChildData);
      }
    }
  }

  public dragEnded(event: CdkDragEnd<any>, parent?: BaseComponent<any>) {
    if (parent) {
      const index = parent.getChildren().findIndex(child => child.temp);
      parent.removeChildInPosition(index);
    } else {
      const index = this.innerFormDefinition.components.findIndex((child: any) => child.temp);
      this.innerFormDefinition.components.splice(index, 1);
    }
  }

  public setConnectedDropListIds() {
    const result = [this.uId];
    this.dynamicChildren.toArray().forEach(child => {
      child.setConnectedIds();
      result.push(...child.getConnectedIds());
    });
    this.generalEventsService.setAllDropListsIds(result);
    this.dynamicChildren.toArray().forEach(child => child.setConnectedDropListIds());

    result.reverse();
    this._connectedDropListIds = result;
  }

  public setActiveComponent(attr: string) {
    this.generalEventsService.selectComponent(attr);
  }

}
