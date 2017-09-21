import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Injector,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { OFormComponent } from 'ontimize-web-ng2';

import { DFComponents } from './components/components';
import {
  BaseComponent,
  BaseOptions
} from './components/base';
import { ODynamicFormEvents } from './o-dynamic-form.events';
import { ODFElementComponent } from './o-dynamic-form-element.component';

@Component({
  selector: 'odf-component',
  template: require('./o-dynamic-form-component.component.html'),
  inputs: [
    'component',
    'editMode : edit-mode',
    'addComponentEmitter : add-component-emitter',
    'moveComponentEmitter : move-component-emitter',
    'editComponentSettingsEmitter : edit-component-settings-emitter',
    'deleteComponentEmitter : delete-component-emitter'
  ],
  outputs: [
    'render'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODFComponentComponent<T> implements OnInit {

  @ViewChild('odfElement')
  protected odfElement: ODFElementComponent;

  show: Boolean = true;
  components: Array<BaseComponent<any>> = [];

  component: BaseOptions<T>;

  label: string | boolean;
  editMode: boolean = false;

  addComponentEmitter: EventEmitter<any>;
  moveComponentEmitter: EventEmitter<any>;
  editComponentSettingsEmitter: EventEmitter<any>;
  deleteComponentEmitter: EventEmitter<any>;

  render: EventEmitter<any> = new EventEmitter();

  isDragEnabled: boolean = false;

  constructor(
    @Optional() @Inject(forwardRef(() => OFormComponent)) protected oForm: OFormComponent,
    protected elRef: ElementRef,
    protected injector: Injector,
    private events: ODynamicFormEvents
  ) { }

  ngOnInit() {
    // Add the initial component.
    this.addComponent();
    this.events.onChange.subscribe(() => this.checkConditions());
  }

  checkConditions() {
    this.show = true;
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
    this.components.splice(index, 1);
  }

  isContainerComponent(component: BaseComponent<any>) {
    return component.isContainerComponent();
  }

  getDraggableData() {
    return this.odfElement ? this.odfElement.component : null;
  }

}
