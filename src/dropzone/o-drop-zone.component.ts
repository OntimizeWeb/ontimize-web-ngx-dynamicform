import { Component, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
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

  public id: string;
  @InputConverter()
  public forChildren: boolean = false;
  public component: BaseComponent<any>;
  public addComponentEmitter: EventEmitter<any>;
  public moveComponentEmitter: EventEmitter<any>;

  protected DEFAULT_ID: string = 'o-drop-zone';
  protected CHILDREN_ID_PATH: string = '-children';

  public ngOnInit(): void {
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

  public onDropEnd(event: any): void {
    const comp = event.dragData;
    const params = {
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

  public allowDropFunction() {
    const self = this;
    return function (dragData: BaseComponent<any>) {
      if (dragData) {
        const fakeDZAttr: string = self.DEFAULT_ID + '-' + dragData.getComponentAttr();
        const checkSelf: boolean = this._elem.id !== fakeDZAttr && this._elem.id !== fakeDZAttr + self.CHILDREN_ID_PATH;

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
