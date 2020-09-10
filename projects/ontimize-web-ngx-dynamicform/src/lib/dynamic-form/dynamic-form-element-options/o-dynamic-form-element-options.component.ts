import { Component, EventEmitter, ViewEncapsulation } from '@angular/core';

import { BaseComponent } from '../../components/base';

@Component({
  selector: 'odf-element-options',
  templateUrl: './o-dynamic-form-element-options.component.html',
  inputs: [
    'component',
    'editComponentSettingsEmitter : edit-component-settings-emitter',
    'deleteComponentEmitter : delete-component-emitter'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODFElementOptionsComponent {

  public component: BaseComponent<any>;
  public editComponentSettingsEmitter: EventEmitter<any>;
  public deleteComponentEmitter: EventEmitter<any>;

  public onEditOdfElement(): void {
    this.editComponentSettingsEmitter.emit({
      component: this.component
    });
  }

  public onDeleteOdfElement(): void {
    this.deleteComponentEmitter.emit({
      component: this.component
    });
  }

}
