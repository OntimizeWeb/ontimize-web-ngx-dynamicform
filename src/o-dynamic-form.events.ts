import { EventEmitter, Injectable } from '@angular/core';
import { /*FormioError,*/ FormioAlert } from './o-dynamic-form.common';

export interface DynamicFormEvent {
  type: string;
  data?: Object;
}

@Injectable()
export class ODynamicFormEvents {
  public beforeSubmit: EventEmitter<Object>;
  public onSubmit: EventEmitter<Object>;
  public onInvalid: EventEmitter<boolean>;
  public onChange: EventEmitter<Object>;
  public onRender: EventEmitter<any>;
  // public errors: Array<FormioError>;
  public alerts: Array<FormioAlert>;
  // public addComponentEmitter: EventEmitter<Object>;

  constructor() {
    this.beforeSubmit = new EventEmitter();
    this.onSubmit = new EventEmitter();
    this.onInvalid = new EventEmitter();
    this.onChange = new EventEmitter();
    this.onRender = new EventEmitter();
    // this.addComponentEmitter = new EventEmitter();
    // this.errors = [];
    this.alerts = [];
  }

}
