import {
  Component,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

import { BaseComponent } from './components/base';

@Component({
  selector: 'odf-element-options',
  templateUrl: 'o-dynamic-form-element-options.component.html',
  inputs: [
    'component',
    'editComponentSettingsEmitter : edit-component-settings-emitter',
    'deleteComponentEmitter : delete-component-emitter'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODFElementOptionsComponent {

  component: BaseComponent<any>;
  editComponentSettingsEmitter: EventEmitter<any>;
  deleteComponentEmitter: EventEmitter<any>;

  onEditOdfElement() {
    this.editComponentSettingsEmitter.emit({
      component: this.component
    });
  }

  onDeleteOdfElement() {
    this.deleteComponentEmitter.emit({
      component: this.component
    });
  }
}
