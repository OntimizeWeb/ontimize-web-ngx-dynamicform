import { Compiler, Component, ComponentRef, EventEmitter, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { BaseComponent } from '../../components/base.component';
import { OColumnDynamicComponent } from '../../components/container/o-column';
import { ORowDynamicComponent } from '../../components/container/o-row';
import { ONifInputDynamicComponent } from '../../components/input/nif-input/o-nif-input';
import { OTextInputDynamicComponent } from '../../components/input/text-input/o-text-input';

const paths = {
  'o-column': OColumnDynamicComponent,
  'o-nif-input': ONifInputDynamicComponent,
  'o-text-input': OTextInputDynamicComponent,
  'o-row': ORowDynamicComponent
}

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

  @ViewChild('odfElement', { read: ViewContainerRef, static: true })
  public element: ViewContainerRef;

  constructor(
    protected compiler: Compiler,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  public async ngOnInit() {
    const componentReference = paths[this.component.settings['ontimize-directive']];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentReference);
    const cmpRef: ComponentRef<any> = this.element.createComponent<any>(componentFactory);


    // cmpRef.instance is a CustomDynamicComponent
    cmpRef.instance['component'] = this.component;
    cmpRef.instance['editMode'] = this.editMode;
    cmpRef.instance['onAddComponent'] = this.addComponentEmitter;
    cmpRef.instance['onMoveComponent'] = this.moveComponentEmitter;
    cmpRef.instance['onEditComponentSettings'] = this.editComponentSettingsEmitter;
    cmpRef.instance['onDeleteComponent'] = this.deleteComponentEmitter;
    cmpRef.instance['render'] = this.render;

    // const self = this;
    // DFComponents.element(this.component.settings['ontimize-directive'], this.compiler).then(factory => {
    //   if (!self.element) {
    //     return void 0;
    //   }
    //   self.element.clear();
    //   const cmpRef: ComponentRef<any> = self.element.createComponent<ODFElementComponent>(factory);
    //   // cmpRef.instance is a CustomDynamicComponent
    //   cmpRef.instance['component'] = self.component;
    //   cmpRef.instance['editMode'] = self.editMode;
    //   cmpRef.instance['onAddComponent'] = self.addComponentEmitter;
    //   cmpRef.instance['onMoveComponent'] = self.moveComponentEmitter;
    //   cmpRef.instance['onEditComponentSettings'] = self.editComponentSettingsEmitter;
    //   cmpRef.instance['onDeleteComponent'] = self.deleteComponentEmitter;
    //   cmpRef.instance['render'] = self.render;
    // });
  }

}
