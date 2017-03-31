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

  component: BaseOptions<T>;

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
    private events: ODynamicFormEvents
  ) {
    // this.render = this.events.onRender;
  }

  ngOnInit() {
    // Add the initial component.
    this.addComponent();
    // if (
    //   this.data &&
    //   this.component.multiple &&
    //   this.data.hasOwnProperty(this.component.key) &&
    //   (this.data[this.component.key] instanceof Array) &&
    //   (this.data[this.component.key].length > 1)
    // ) {
    //   // Add other components if this is an array...
    //   for (var i = 1; i < this.data[this.component.key].length; i++) {
    //     this.addComponent();
    //   }
    // }
    // this.checkConditions();
    this.events.onChange.subscribe(() => this.checkConditions());
  }

  checkConditions() {
    // var subData = this.submission ? this.submission.value : {};
    //var compData = Object.assign({}, subData, this.form.value);
    this.show = true;
    // FormioUtils.checkCondition(this.component, compData);
  }

  addComponent() {
    let component = DFComponents.createComponent(
      this.component,
      this.events,
      this.injector
    );
    if (component) {
      // Set the index and readOnly flag.
      component.index = this.components.length;
      // Add this to the instances.
      this.components.push(component);
    } else {
      // component wasnt created (triggering render so the dynamic-form would trigger render event correctly)
      this.render.emit(true);
    }
    return component;
  }

  removeAt(index: number) {
    // this.container.removeAt(index);
    this.components.splice(index, 1);
  }

  isContainerComponent(component: BaseComponent<any>) {
    return component.isContainerComponent();
  }
}
