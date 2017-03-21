import {
  Component,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

import { BaseComponent } from './components/base';

@Component({
  selector: 'odf-element-drop-zone',
  templateUrl: 'o-dynamic-form-element-drop-zone.component.html',
  inputs: [
    'component',
    'addComponentEmitter : add-component-emitter'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODFElementDropZoneComponent {

  component: BaseComponent<any>;
  addComponentEmitter: EventEmitter<any>;

  onDropEnd(event: any) {
    this.addComponentEmitter.emit({
      component: event.dragData,
      previousSibling: this.component
    });
  }
}
