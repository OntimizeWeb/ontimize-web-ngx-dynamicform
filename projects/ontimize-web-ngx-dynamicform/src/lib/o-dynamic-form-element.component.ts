import { Compiler, Component, ComponentRef, EventEmitter, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { BaseComponent } from './components/base';
import { DFComponents } from './components/components';


@Component({
  selector: 'odf-element',
  templateUrl: './o-dynamic-form-element.component.html',
  inputs: [
    'component',
    'render',
    'editMode : edit-mode',
    'addComponentEmitter : add-component-emitter',
    'moveComponentEmitter : move-component-emitter',
    'editComponentSettingsEmitter : edit-component-settings-emitter',
    'deleteComponentEmitter : delete-component-emitter'
  ]
})
export class ODFElementComponent implements OnInit {

  public component: BaseComponent<any>;
  public render: EventEmitter<any>;
  public editMode: boolean = false;
  public addComponentEmitter: EventEmitter<any>;
  public moveComponentEmitter: EventEmitter<any>;
  public editComponentSettingsEmitter: EventEmitter<any>;
  public deleteComponentEmitter: EventEmitter<any>;

  @ViewChild('odfElement', { read: ViewContainerRef, static: false })
  public element: ViewContainerRef;

  constructor(
    protected compiler: Compiler
  ) { }

  public ngOnInit(): void {
    const self = this;
    DFComponents.element(this.component.settings['ontimize-directive'], this.compiler).then(factory => {
      if (!self.element) {
        return void 0;
      }
      self.element.clear();
      const cmpRef: ComponentRef<any> = self.element.createComponent<ODFElementComponent>(factory);
      // cmpRef.instance is a CustomDynamicComponent
      cmpRef.instance['component'] = self.component;
      cmpRef.instance['editMode'] = self.editMode;
      cmpRef.instance['onAddComponent'] = self.addComponentEmitter;
      cmpRef.instance['onMoveComponent'] = self.moveComponentEmitter;
      cmpRef.instance['onEditComponentSettings'] = self.editComponentSettingsEmitter;
      cmpRef.instance['onDeleteComponent'] = self.deleteComponentEmitter;
      cmpRef.instance['render'] = self.render;
    });
  }

}
