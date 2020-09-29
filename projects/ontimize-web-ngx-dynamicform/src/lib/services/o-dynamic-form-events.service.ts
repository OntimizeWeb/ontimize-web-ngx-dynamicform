import { EventEmitter, Injectable } from '@angular/core';

import { FormioAlert } from '../interfaces/form-io-alert.interface';

@Injectable()
export class ODynamicFormEvents {

  public beforeSubmit: EventEmitter<Object>;
  public onSubmit: EventEmitter<Object>;
  public onInvalid: EventEmitter<boolean>;
  public onChange: EventEmitter<Object>;
  public onRender: EventEmitter<any>;
  // public errors: Array<FormioError>;
  public alerts: FormioAlert[];

  constructor() {
    this.beforeSubmit = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this.onInvalid = new EventEmitter();
    this.onChange = new EventEmitter();
    this.onRender = new EventEmitter();
    // this.errors = [];
    this.alerts = [];
  }

}
