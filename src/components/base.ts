import { ComponentRef } from '@angular/core';

import {
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { ODynamicFormEvents } from '../o-dynamic-form.events';

export interface ConditionalOptions {
  show?: string;
  when?: any;
  eq?: any;
}

export interface ValidateOptions {
  required?: boolean;
  custom?: string;
  customPrivate?: boolean;
}

export interface ComponentOptions<T, V> {
  'ontimize-directive': string;
  defaultValue?: T | Array<T>;
  type?: string;
  key?: string;
  label?: string;
  input?: boolean;
  required?: boolean;
  multiple?: boolean;
  protected?: boolean;
  unique?: boolean;
  persistent?: boolean;
  tableView?: boolean;
  lockKey?: boolean;
  validate?: V;
  conditional?: ConditionalOptions;
  customConditional?: string;
}

export interface BaseOptions<T> extends ComponentOptions<T, ValidateOptions> { }

/**
 * Create the custom validator for validating based on Javascript.
 * @param custom
 * @param form
 * @returns {(control:FormControl)=>{validateCustom: boolean}}
 * @constructor
 */
export function CustomValidator(custom: string, form: FormGroup) {
  return function (control: FormControl) {
    var valid = true;
    /*eslint-disable no-unused-vars */
    // var input = control.value;
    /*eslint-enable no-unused-vars */
    custom = custom.replace(/({{\s+(.*)\s+}})/, function (match, $1, $2) {
      return form.value[$2];
    });

    /* jshint evil: true */
    // eval(custom);
    return (valid === true) ? null : { custom: valid };
  };
}

export class BaseComponent<T> {
  control: FormControl | FormGroup | FormArray;
  index: number = 0;
  protected validators: ValidatorFn[] = [];
  private _label: string | boolean;

  constructor(
    public form: FormGroup,
    public settings: any,
    public events: ODynamicFormEvents,
    public data: any = {}
  ) {
    this.getControl();
    this.registerEvents();
  }

  getData(index?: number): any {
    if (this.data.hasOwnProperty(this.settings.key)) {
      var data = this.data[this.settings.key];
      if (typeof index !== 'undefined') {
        data = data[index];
      }
      return data;
    } else {
      return {};
    }
  }

  registerEvents() {
    this.events.onInvalid.subscribe(() => {
      this.control.markAsDirty(true);
      // let errors: Array<FormioError> = this.errors;
      // if (errors.length) {
      //     this.events.errors = this.events.errors.concat(errors);
      // }
    });
  }

  public setValue(value: any) {
    if (this.control && (this.control instanceof FormControl)) {
      let formControl = this.control as FormControl;
      formControl.setValue(value);
      formControl.markAsDirty();
    }
  }

  public disable() {
    if (this.control) {
      this.control.disable();
    }
  }

  set label(label: string | boolean) {
    this._label = label;
  }

  get label(): string | boolean {
    if (this._label === false) {
      return false;
    }
    if (this._label) {
      return this._label;
    }
    if (this.index > 0) {
      return '';
    }
    if (this.settings.label) {
      return this.settings.label;
    }
    return this.settings.key;
  }

  get defaultValue(): T {
    if (this.settings.defaultValue) {
      let isArray = (this.settings.defaultValue instanceof Array);
      return isArray ? this.settings.defaultValue[this.index] : this.settings.defaultValue;
    }
    return this.settings.defaultValue;
  }

  getControl(): FormArray | FormGroup | FormControl {
    if (!this.settings.input) {
      return null;
    }
    if (!this.control) {
      this.addValidators();
      this.control = new FormControl(this.defaultValue, this.validators);
    }
    return this.control;
  }

  getError(type: string, error: any): string {
    if ((type === 'required') && error) {
      return this.label + ' is required';
    }
    if ((type === 'custom') && error) {
      return error;
    }
    return '';
  }
  // getFormioError(type: string, error: any) : FormioError {
  //     let message: string = this.getError(type, error);
  //     return new FormioError(message, this.settings);
  // }
  // get errors(): Array<FormioError> {
  //     let errors: Array<FormioError> = [];
  //     if (
  //         this.control &&
  //         this.control.errors
  //     ) {
  //         for (let err in this.control.errors) {
  //             var error: FormioError = this.getFormioError(err, this.control.errors[err]);
  //             if (error) {
  //                 errors.push(error);
  //             }
  //         }
  //     }
  //     return errors;
  // }

  addValidators() {
    if (!this.settings.validate) {
      return;
    }
    if (this.settings.validate.required) {
      this.validators.push(Validators.required);
    }
    if (this.settings.validate.custom) {
      this.validators.push(CustomValidator(this.settings.validate.custom, this.form));
    }
  }

  allowMultiple(): boolean {
    return this.settings.multiple;
  }

  getInputsProperties(): Array<any> {
    return [];
  }

  getInputsMapping() {
    let rawProperties = this.getInputsProperties();
    let parsedProperties = [];
    for (var i = 0; i < rawProperties.length; i++) {
      let splitted = rawProperties[i].split(':');
      let propObj = {
        propName: splitted[0].trim(),
        input: splitted[splitted.length - 1].trim()
      };
      parsedProperties.push(propObj);
    }
    return parsedProperties;
  }

  setInstanceProperties(componentReference: ComponentRef<any>) {
    let inputsMapping = this.getInputsMapping();
    for (var i = 0; i < inputsMapping.length; i++) {
      let curr = inputsMapping[i];
      if (this.settings.hasOwnProperty(curr.input)) {
        componentReference.instance[curr.propName] = this.settings[curr.input];
      }
    }
  }

  isContainerComponent() {
    return false;
  }

  getComponentAttr() {
    return this.settings.attr;
  }
}
