import { Component, ElementRef, EventEmitter, forwardRef, Inject, Injector, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IFormDataComponent, IFormDataTypeComponent, InputConverter, OFormComponent, OFormValue, OntimizeService, OValueChangeEvent, ServiceUtils, SQLTypes, Util } from 'ontimize-web-ngx';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

import { DynamicFormDefinition } from './o-dynamic-form.common';
import { ODynamicFormEvents } from './o-dynamic-form.events';

@Component({
  selector: 'o-dynamic-form',
  templateUrl: './o-dynamic-form.component.html',
  styleUrls: ['./o-dynamic-form.component.scss'],
  inputs: [
    'oattr : attr',
    'formDefinition: form-definition',
    'editMode : edit-mode',
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
    'onDynamicFormDataLoaded'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODynamicFormComponent implements OnInit, IFormDataComponent, IFormDataTypeComponent {

  // public formDefinition$: BehaviorSubject<any> = new BehaviorSubject(null);
  public formDefComponents$: BehaviorSubject<any> = new BehaviorSubject(null);

  /* inputs */
  public oattr: string;
  @InputConverter()
  public editMode: boolean = false;
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
  protected _pKeysEquiv = {};
  public dataService: any;
  /* end of parsed inputs */

  public render: EventEmitter<any> = new EventEmitter();
  public submit: EventEmitter<any> = new EventEmitter();
  public change: EventEmitter<any> = new EventEmitter();

  public onAddComponent: EventEmitter<any> = new EventEmitter();
  public onMoveComponent: EventEmitter<any> = new EventEmitter();
  public onEditComponentSettings: EventEmitter<any> = new EventEmitter();
  public onDeleteComponent: EventEmitter<any> = new EventEmitter();

  public onDynamicFormDataLoaded: EventEmitter<Object> = new EventEmitter<Object>();

  protected onFormInitStream: EventEmitter<Object> = new EventEmitter<Object>();
  protected onUrlParamChangedStream: EventEmitter<Object> = new EventEmitter<Object>();
  protected reloadStream: Observable<any>;

  public loading: boolean = false;
  public formData: Object = {};

  protected urlParamSub: any;
  protected urlParams: Object;
  protected onFormDataSubscribe: any;

  protected _fControl: FormControl;

  public onChange: EventEmitter<Object>;
  public onValueChange: EventEmitter<OValueChangeEvent>;

  constructor(
    protected actRoute: ActivatedRoute,
    protected injector: Injector,
    public events: ODynamicFormEvents,
    protected elRef: ElementRef,
    @Optional() @Inject(forwardRef(() => OFormComponent)) protected parentForm: OFormComponent
  ) {
    this.reloadStream = combineLatest(
      this.onFormInitStream.asObservable(),
      this.onUrlParamChangedStream.asObservable()
    );

    const self = this;
    this.reloadStream.subscribe(function (valArr) {
      if (Util.isArray(valArr) && valArr.length === 2) {
        if (self.queryOnInit && valArr[0] === true && valArr[1] === true) {
          self.doQuery(true);
        }
      }
    });
  }

  public ngOnInit(): void {
    this.keysArray = Util.parseArray(this.keys);
    this.colsArray = Util.parseArray(this.columns);
    let pkArray = Util.parseArray(this.parentKeys);
    this._pKeysEquiv = Util.parseParentKeysEquivalences(pkArray);

    // ensuring formControl creation
    this.getControl();

    this.configureService();

    this.registerFormListeners();

    const self = this;
    this.urlParamSub = this.actRoute.params.subscribe(params => {
      self.urlParams = params;
      if (self.urlParams && Object.keys(self.urlParams).length > 0) {
        self.onUrlParamChangedStream.emit(true);
      }
    });

    if (this.parentForm) {
      if (self.queryOnBind) {
        this.onFormDataSubscribe = this.parentForm.onDataLoaded.subscribe(data => {
          const filter = ServiceUtils.getParentKeysFromForm(self._pKeysEquiv, self.parentForm);
          self.queryData(filter);
        });
      }
    }
  }

  public getSQLType(): number {
    return SQLTypes.OTHER;
  }

  public getAttribute() {
    if (this.oattr) {
      return this.oattr;
    } else if (this.elRef && this.elRef.nativeElement.attributes['attr']) {
      return this.elRef.nativeElement.attributes['attr'].value;
    }
  }

  public ngAfterViewInit(): void {
    this.onFormInitStream.emit(true);
  }

  public configureService() {
    let loadingService: any = OntimizeService;
    if (this.serviceType) {
      loadingService = this.serviceType;
    }
    try {
      this.dataService = this.injector.get(loadingService);
      if (Util.isDataService(this.dataService)) {
        let serviceCfg = this.dataService.getDefaultServiceConfiguration(this.service);
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
    let formDef = undefined;
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

  protected getCurrentKeysValues() {
    let filter = {};
    if (this.urlParams && this.keysArray) {
      this.keysArray.map(key => {
        if (this.urlParams[key]) {
          filter[key] = this.urlParams[key];
        }
      });
    }

    let keys = Object.keys(this._pKeysEquiv);
    if (this.urlParams && keys && keys.length > 0) {
      keys.forEach(item => {
        let urlVal = this.urlParams[this._pKeysEquiv[item]];
        if (urlVal) {
          filter[item] = urlVal;
        }
      });
    }
    return filter;
  }

  public doQuery(useFilter: boolean = false): void {
    let filter = {};
    if (useFilter) {
      filter = this.getCurrentKeysValues();
    }
    this.queryData(filter);
  }

  public getAttributesToQuery(): any[] {
    let attributes: any[] = [];
    // add form keys...
    if (this.keysArray && this.keysArray.length > 0) {
      attributes.push(...this.keysArray);
    }
    if (this.oattr) {
      attributes.push(this.oattr);
    }
    return attributes;
  }

  _setData(data) {
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
      let dynamicData = this.formData[this.oattr];
      this.formDefinition = dynamicData;
    }
  }

  _emitData(data) {
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

  public ngOnDestroy(): void {
    if (this.urlParamSub) {
      this.urlParamSub.unsubscribe();
    }
    this.unregisterFormListeners();
    if (this.onFormDataSubscribe) {
      this.onFormDataSubscribe.unsubscribe();
    }
  }

  public onComponentRendered(): void {
    // The form is done rendering.
    if (this.render) {
      this.render.emit(this.queryOnRender);
    }
  }

  public load(): any {
    const self = this;
    const loadObservable = new Observable(observer => {
      var timer = window.setTimeout(() => {
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

  get formDefinition() {
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

}
