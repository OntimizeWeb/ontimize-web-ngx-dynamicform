import { Component, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Util } from 'ontimize-web-ng2';

import { BaseComponent } from '../components/base';

@Component({
  selector: 'o-drop-zone',
  template: require('./o-drop-zone.component.html'),
  styles: [require('./o-drop-zone.component.scss')],
  inputs: [
    '_forChildren : for-children',
    'component',
    'addComponentEmitter : add-component-emitter'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODropZoneComponent implements OnInit {

  id: string;
  forChildren: boolean = false;
  component: BaseComponent<any>;
  addComponentEmitter: EventEmitter<any>;

  private _forChildren: string;

  ngOnInit() {
    this.forChildren = Util.parseBoolean(this._forChildren);
    this.id = 'o-drop-zone';
    if (this.component) {
      this.id += '-' + this.component.getComponentAttr();
    }
    if (this.forChildren) {
      this.id += '-children';
    }
  }

  onDropEnd(event: any) {
    let params = {
      component: event.dragData
    };
    if (this.component) {
      if (this.forChildren) {
        // Drop zone from row or column
        params['parent'] = this.component;
      } else {
        // Drop zone form element
        params['previousSibling'] = this.component;
      }
    }
    this.addComponentEmitter.emit(params);
  }

}
