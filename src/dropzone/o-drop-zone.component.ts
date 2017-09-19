import { Component, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { InputConverter } from 'ontimize-web-ng2';

import { ODropZoneService } from './o-drop-zone.service';
import { BaseComponent } from '../components/base';

@Component({
  selector: 'o-drop-zone',
  template: require('./o-drop-zone.component.html'),
  styles: [require('./o-drop-zone.component.scss')],
  inputs: [
    'component',
    'forChildren : for-children',
    'addComponentEmitter : add-component-emitter',
    'moveComponentEmitter : move-component-emitter'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODropZoneComponent implements OnInit {

  id: string;
  @InputConverter()
  forChildren: boolean = false;
  component: BaseComponent<any>;
  addComponentEmitter: EventEmitter<any>;
  moveComponentEmitter: EventEmitter<any>;

  constructor(
    protected oDropZoneService: ODropZoneService
  ) { }

  ngOnInit() {
    this.id = this.oDropZoneService.DEFAULT_ID;
    let attr: string;
    if (this.component) {
      attr = this.component.getComponentAttr();
      this.id += '-' + attr;
    }
    if (this.forChildren) {
      this.id += this.oDropZoneService.CHILDREN_ID_ENDING;
    }
    this.oDropZoneService.registerDropZone(this.id);
  }

  getDropZones() {
    return [this.id];
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

  // allowDropFunction() {
  //   let self = this;
  //   return function (dragData: BaseComponent<any>) {
  //     if (dragData) {
  //       let fakeDZAttr: string = self.oDropZoneService.DEFAULT_ID + '-' + dragData.getComponentAttr();
  //       let checkSelf: boolean = this._elem.id !== fakeDZAttr && this._elem.id !== fakeDZAttr + self.oDropZoneService.CHILDREN_ID_ENDING;

  //       let checkChildren: boolean = true;
  //       if (dragData instanceof BaseComponent && dragData.isContainerComponent()) {
  //         let childrenAttrs = [];
  //         // TODO: look for a faster way not to allow drop a component on their children drop zones
  //         childrenAttrs = dragData.getChildrenAttrs();
  //         if (self.component) {
  //           checkChildren = childrenAttrs.indexOf(self.component.getComponentAttr()) === -1;
  //         }
  //       }
  //       return dragData && checkSelf && checkChildren;
  //     }
  //     return false;
  //   };
  // }

}
