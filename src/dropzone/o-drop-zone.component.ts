import { Component, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { InputConverter } from 'ontimize-web-ngx';

import { BaseComponent } from '../components/base';

@Component({
  selector: 'o-drop-zone',
  templateUrl: './o-drop-zone.component.html',
  styleUrls: ['./o-drop-zone.component.scss'],
  inputs: [
    'component',
    'forChildren : for-children',
    'addComponentEmitter : add-component-emitter',
    'moveComponentEmitter : move-component-emitter'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODropZoneComponent implements OnInit {

  protected DEFAULT_ID: string = 'o-drop-zone';
  protected CHILDREN_ID_PATH: string = '-children';

  id: string;
  @InputConverter()
  forChildren: boolean = false;
  component: BaseComponent<any>;
  addComponentEmitter: EventEmitter<any>;
  moveComponentEmitter: EventEmitter<any>;

  ngOnInit() {
    this.id = this.DEFAULT_ID;
    let attr: string;
    if (this.component) {
      attr = this.component.getComponentAttr();
      this.id += '-' + attr;
    }
    if (this.forChildren) {
      this.id += this.CHILDREN_ID_PATH;
    }

  }

  onDropEnd(event: any) {
    let comp = event.dragData;
    let params = {
      component: comp
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
    if (comp instanceof BaseComponent) {
      this.moveComponentEmitter.emit(params);
    } else {
      this.addComponentEmitter.emit(params);
    }
  }

  allowDropFunction() {
    let self = this;
    return function (dragData: BaseComponent<any>) {
      if (dragData) {

        if (typeof dragData['getDirective'] === 'function') {
          // Trying to drop a list element from menu
          if (dragData['getDirective']().startsWith('o-list-')) {
            return self.id.endsWith(self.CHILDREN_ID_PATH) && self.component.getNumComponents() === 0;
          } else {
            return !self.id.endsWith(self.CHILDREN_ID_PATH);
          }
        } else if (self.component && self.component.settings['ontimize-directive'] === 'o-list') {
          // Moving o-list component
          return dragData.settings['ontimize-directive'] === 'o-list' && !self.id.endsWith(self.CHILDREN_ID_PATH) && !dragData.getComponentAttr().includes(self.component.getComponentAttr());
        }

        let fakeDZAttr: string = self.DEFAULT_ID + '-' + dragData.getComponentAttr();
        let checkSelf: boolean = this._elem.id !== fakeDZAttr && this._elem.id !== fakeDZAttr + self.CHILDREN_ID_PATH;

        let checkChildren: boolean = true;
        if (dragData instanceof BaseComponent && dragData.isContainerComponent()) {
          let childrenAttrs = [];
          // TODO: look for a faster way not to allow drop a component on their children drop zones
          childrenAttrs = dragData.getChildrenAttrs();
          if (self.component) {
            checkChildren = childrenAttrs.indexOf(self.component.getComponentAttr()) === -1;
          }
        }
        return dragData && checkSelf && checkChildren;
      }
      return false;
    };
  }

}
