import {
  Component,
  EventEmitter,
  OnInit,
  Compiler,
  ViewContainerRef,
  ViewChild,
  ComponentRef
} from '@angular/core';

import { DFComponents } from './components/components';
import { BaseComponent } from './components/base';
import { ODynamicFormEvents } from './o-dynamic-form.events';

@Component({
  selector: 'odf-element',
  templateUrl: 'o-dynamic-form-element.component.html',
  inputs: [
    'component',
    'render',

    'editMode : edit-mode',
    'addComponentEmitter : add-component-emitter',
    'editComponentSettingsEmitter : edit-component-settings-emitter',
    'deleteComponentEmitter : delete-component-emitter'
  ]
})
export class ODFElementComponent implements OnInit {

  component: BaseComponent<any>;
  render: EventEmitter<any>;

  editMode: boolean = false;
  addComponentEmitter: EventEmitter<any>;
  editComponentSettingsEmitter: EventEmitter<any>;
  deleteComponentEmitter: EventEmitter<any>;

  @ViewChild('odfElement', { read: ViewContainerRef })
  element: ViewContainerRef;

  constructor(
    private compiler: Compiler,
    private events: ODynamicFormEvents
  ) {

  }

  onContainerDropEnd(event) {
    if (this.editMode) {
    this.addComponentEmitter.emit({
      component: event.dragData,
      parent: this.component
      });
    }
  }

  ngOnInit() {
    var self = this;
    DFComponents.element(this.component.settings['ontimize-directive'], this.compiler).then(factory => {
      if (!self.element) {
        return;
      }
      self.element.clear();
      let cmpRef: ComponentRef<any> = self.element.createComponent<ODFElementComponent>(factory);
      // cmpRef.instance is a CustomDynamicComponent
      cmpRef.instance['component'] = self.component;
      cmpRef.instance['editMode'] = self.editMode;
      cmpRef.instance['onAddComponent'] = self.addComponentEmitter;
      cmpRef.instance['onEditComponentSettings'] = self.editComponentSettingsEmitter;
      cmpRef.instance['onDeleteComponent'] = self.deleteComponentEmitter;
      cmpRef.instance['render'] = self.render;
    });
  }
}
