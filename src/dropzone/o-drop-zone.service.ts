import { Injectable } from '@angular/core';

@Injectable()
export class ODropZoneService {

  DEFAULT_ID: string = 'o-drop-zone';
  CHILDREN_ID_ENDING: string = '-children';

  dropZones: Array<string> = [];

  registerDropZone(id: string) {
    if (this.dropZones.indexOf(id) === -1) {
      this.dropZones.push(id);
    }
  }

  getAllowedDropZonesFormComponent(component): Array<string> {
    let childrenDropZones: Array<string> = [];
    let allowedDropZones: Array<string> = [];
    component.getChildrenAttrs().forEach(attr => {
      attr = this.DEFAULT_ID + '-' + attr;
      childrenDropZones.push(attr);
      if (component.isContainerComponent()) {
        attr += this.CHILDREN_ID_ENDING;
        childrenDropZones.push(attr);
      }
    });
    this.dropZones.forEach(dropZone => {
      if (childrenDropZones.indexOf(dropZone) === -1) {
        allowedDropZones.push(dropZone);
      }
    });
    return allowedDropZones;
  }

}
