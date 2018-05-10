import { Component, ElementRef, EventEmitter, forwardRef, Inject, Injector, OnInit, Optional, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/combineLatest';

import {
  IFormDataComponent,
  IFormDataTypeComponent,
  InputConverter,
  OFormComponent,
  OFormValue,
  OntimizeService,
  SQLTypes,
  Util,
  ServiceUtils
} from 'ontimize-web-ngx';

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

  public ready: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /* inputs */
  oattr: string;
  @InputConverter()
  editMode: boolean = false;
  entity: string;
  keys: string = '';
  parentKeys: string = '';
  columns: string = '';
  service: string;
  serviceType: string;
  @InputConverter()
  queryOnInit: boolean = true;
  @InputConverter()
  queryOnBind: boolean = true;
  @InputConverter()
  queryOnRender: boolean = true;
  @InputConverter()
  registerInParentForm: boolean = true;
  @InputConverter()
  autoBinding: boolean = true;
  @InputConverter()
  autoRegistering: boolean = true;
  /* end of inputs */

  /*parsed inputs */
  innerFormDefinition: DynamicFormDefinition = null;
  keysArray: string[] = [];
  colsArray: string[] = [];
  _pKeysEquiv = {};
  dataService: any;
  /* end of parsed inputs */

  render: EventEmitter<any> = new EventEmitter();
  submit: EventEmitter<any> = new EventEmitter();
  change: EventEmitter<any> = new EventEmitter();

  onAddComponent: EventEmitter<any> = new EventEmitter();
  onMoveComponent: EventEmitter<any> = new EventEmitter();
  onEditComponentSettings: EventEmitter<any> = new EventEmitter();
  onDeleteComponent: EventEmitter<any> = new EventEmitter();

  onDynamicFormDataLoaded: EventEmitter<Object> = new EventEmitter<Object>();

  protected onFormInitStream: EventEmitter<Object> = new EventEmitter<Object>();
  protected onUrlParamChangedStream: EventEmitter<Object> = new EventEmitter<Object>();
  protected reloadStream: Observable<any>;

  public loading: boolean = false;
  public formData: Object = {};

  protected urlParamSub: any;
  protected urlParams: Object;
  protected onFormDataSubscribe: any;

  constructor(
    protected actRoute: ActivatedRoute,
    protected injector: Injector,
    public events: ODynamicFormEvents,
    protected elRef: ElementRef,
    @Optional() @Inject(forwardRef(() => OFormComponent)) protected parentForm: OFormComponent
  ) {
    this.reloadStream = Observable.combineLatest(
      this.onFormInitStream.asObservable(),
      this.onUrlParamChangedStream.asObservable()
    );

    var self = this;
    this.reloadStream.subscribe(
      function (valArr) {
        if (Util.isArray(valArr) && valArr.length === 2) {
          if (self.queryOnInit && valArr[0] === true && valArr[1] === true) {
            self.doQuery(true);
          }
        }
      });
  }

  ngOnInit() {
    if (this.formDefinition) {
      this.ready.next(true);
    }

    this.keysArray = Util.parseArray(this.keys);
    this.colsArray = Util.parseArray(this.columns);
    let pkArray = Util.parseArray(this.parentKeys);
    this._pKeysEquiv = Util.parseParentKeysEquivalences(pkArray);

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
        this.onFormDataSubscribe = this.parentForm.onFormDataLoaded.subscribe(data => {
          const filter = ServiceUtils.getParentItemFromForm(undefined, self._pKeysEquiv, self.parentForm);
          self.queryData(filter);
        });
      }
    }
  }

  getSQLType(): number {
    return SQLTypes.OTHER;
  }

  getAttribute() {
    if (this.oattr) {
      return this.oattr;
    } else if (this.elRef && this.elRef.nativeElement.attributes['attr']) {
      return this.elRef.nativeElement.attributes['attr'].value;
    }
  }

  ngAfterViewInit() {
    this.onFormInitStream.emit(true);
  }

  configureService() {
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

  registerFormListeners() {
    if (this.parentForm && this.registerInParentForm) {
      this.parentForm.registerFormComponent(this);
      this.parentForm.registerDynamicFormComponent(this);
      this.parentForm.registerSQLTypeFormComponent(this);
    }
  }

  unregisterFormListeners() {
    if (this.parentForm && this.registerInParentForm) {
      this.parentForm.unregisterFormComponent(this);
      this.parentForm.unregisterDynamicFormComponent(this);
      this.parentForm.unregisterSQLTypeFormComponent(this);
    }
  }

  setValue(val: any) {
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

  isAutomaticBinding(): Boolean {
    return this.autoBinding;
  }

  isAutomaticRegistering(): Boolean {
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

  doQuery(useFilter: boolean = false) {
    let filter = {};
    if (useFilter) {
      filter = this.getCurrentKeysValues();
    }
    this.queryData(filter);
  }

  getAttributesToQuery() {
    let attributes: Array<any> = [];
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

  queryData(filter) {
    var self = this;
    var loader = self.load();
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

  get areEmptyComponents() {
    if (this.formDefinition && this.formDefinition.components) {
      return this.formDefinition.components.length === 0;
    }
    return true;
  }

  ngOnDestroy() {
    if (this.urlParamSub) {
      this.urlParamSub.unsubscribe();
    }
    this.unregisterFormListeners();
    if (this.onFormDataSubscribe) {
      this.onFormDataSubscribe.unsubscribe();
    }
  }

  onComponentRendered() {
    // The form is done rendering.
    if (this.render) {
      this.render.emit(this.queryOnRender);
    }
  }

  load(): any {
    var self = this;
    var loadObservable = new Observable(observer => {
      var timer = window.setTimeout(() => {
        observer.next(true);
      }, 250);

      return () => {
        window.clearTimeout(timer);
        self.loading = false;
      };

    });
    var subscription = loadObservable.subscribe(val => {
      self.loading = val as boolean;
    });
    return subscription;
  }

  set formDefinition(definition) {
    let definitionJSON: any = definition;
    if (definition && typeof definition === 'string') {
      try {
        definitionJSON = JSON.parse(definition);
      } catch (e) {
        console.error('set formDefinition error');
      }
    }
    this.innerFormDefinition = definitionJSON;
  }

  get formDefinition() {
    return this.innerFormDefinition;
  }

  getControl(): FormControl {
    return undefined;
  }

  getFormControl(): FormControl {
    return undefined;
  }

  hasError(error: string): boolean {
    return false;
  }
}
