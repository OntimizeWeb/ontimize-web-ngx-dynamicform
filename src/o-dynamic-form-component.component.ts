import {
  Component,
  OnInit,
  EventEmitter,
  Optional,
  Inject,
  Injector,
  forwardRef,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';

import { FormGroup, FormArray } from '@angular/forms';

import { DFComponents } from './components/components';

import {
  BaseOptions,
  BaseComponent
} from './components/base';

// import { FormioError } from './o-dynamic-form.common';
import {
  // DynamicFormEvent,
  ODynamicFormEvents
} from './o-dynamic-form.events';
// var FormioUtils = require('formio-utils');

import { OFormComponent } from 'ontimize-web-ng2/ontimize';

@Component({
  selector: 'odf-component',
  templateUrl: 'o-dynamic-form-component.component.html',
  inputs: [
    'component',
    'form',
    'submission',
    'data',
    'label',
    'editMode : edit-mode',

    'addComponentEmitter : add-component-emitter',
    'editComponentSettingsEmitter : edit-component-settings-emitter',
    'deleteComponentEmitter : delete-component-emitter'
  ],
  outputs: [
    'render'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODFComponentComponent<T> implements OnInit {
  show: Boolean = true;
  components: Array<BaseComponent<any>> = [];
  container: FormArray = new FormArray([]);

  component: BaseOptions<T>;
  form: FormGroup;
  data: any;
  submission: FormGroup;
  label: string | boolean;
  editMode: boolean = false;

  addComponentEmitter: EventEmitter<any>;
  editComponentSettingsEmitter: EventEmitter<any>;
  deleteComponentEmitter: EventEmitter<any>;

  render: EventEmitter<any> = new EventEmitter();

  constructor(
    @Optional() @Inject(forwardRef(() => OFormComponent)) protected oForm: OFormComponent,
    protected elRef: ElementRef,
    protected injector: Injector,
    private events: ODynamicFormEvents) { }

  ngOnInit() {
    // Add the initial component.
    this.addComponent();
    if (
      this.data &&
      this.component.multiple &&
      this.data.hasOwnProperty(this.component.key) &&
      (this.data[this.component.key] instanceof Array) &&
      (this.data[this.component.key].length > 1)
    ) {
      // Add other components if this is an array...
      for (var i = 1; i < this.data[this.component.key].length; i++) {
        this.addComponent();
      }
    }
    // this.checkConditions();
    this.events.onChange.subscribe(() => this.checkConditions());
  }

  getData(key: number | string): any {
    if (this.data.hasOwnProperty(key)) {
      return this.data[key];
    } else {
      return {};
    }
  }

  checkConditions() {
    // var subData = this.submission ? this.submission.value : {};
    //var compData = Object.assign({}, subData, this.form.value);
    this.show = true;
    // FormioUtils.checkCondition(this.component, compData);
  }

  addComponent() {
    let component = DFComponents.createComponent(
      this.component['ontimize-directive'],
      this.form,
      this.component,
      this.events,
      this.injector
    );

    // Set the index and readOnly flag.
    component.index = this.components.length;

    // Add the form controls.
    if (this.form && this.component.input && this.component.key) {
      let control = component.getControl();
      if (control) {
        if (this.component.multiple && !component.allowMultiple()) {
          control.setValue([]);
          this.form.addControl(this.component.key, control);
        } else if (this.component.multiple) {
          this.container.push(control);
          this.form.addControl(this.component.key, this.container);
        } else {
          this.form.addControl(this.component.key, control);
        }
      }
    }

    // Add this to the instances.
    this.components.push(component);
    return component;
  }
  removeAt(index: number) {
    this.container.removeAt(index);
    this.components.splice(index, 1);
  }
  get errors(): Array<string> {
    // if (!this.component.input) {
    //   return [];
    // }
    // if (!this.form.controls.hasOwnProperty(this.component.key)) {
    //   return [];
    // }
    // if (this.form.controls[this.component.key].pristine) {
    //   return [];
    // }
    // if (this.form.controls[this.component.key].valid) {
    //   return [];
    // }
    // let errors: Array<string> = [];
    // this.components.forEach((component: BaseComponent<any>) => {
    //   let compErrs: Array<FormioError> = component.errors;
    //   compErrs.forEach((compError) => {
    //     errors.push(compError.message);
    //   });
    // });
    // return errors;
    return [];
  }

  isContainerComponent(component: BaseComponent<any>) {
    return component.isContainerComponent();
  }
}
