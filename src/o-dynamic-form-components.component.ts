import {
  Component,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { BaseOptions } from './components/base';

@Component({
  moduleId: module.id,
  selector: 'odf-components',
  templateUrl: 'o-dynamic-form-components.component.html',
  inputs: [
    'components',

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
export class ODFComponentsComponent {

  components: Array<BaseOptions<any>>;

  editMode: boolean = false;
  addComponentEmitter: EventEmitter<any>;
  editComponentSettingsEmitter: EventEmitter<any>;
  deleteComponentEmitter: EventEmitter<any>;

  render: EventEmitter<any> = new EventEmitter();

  private renderCount: number = 0;

  onRender() {
    if (this.renderCount >= this.components.length) {
      return;
    }
    this.renderCount++;
    if (this.renderCount >= this.components.length) {
      this.render.emit(true);
    }
  }
}
