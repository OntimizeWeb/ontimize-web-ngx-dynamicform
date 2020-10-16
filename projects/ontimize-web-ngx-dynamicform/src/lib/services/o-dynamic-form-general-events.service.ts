import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ODynamicFormGeneralEvents {

  componentDropped: EventEmitter<any> = new EventEmitter<any>();
  componentDeleted: EventEmitter<any> = new EventEmitter<any>();
  editComponent: EventEmitter<any> = new EventEmitter<any>();

  editModeChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  editableComponentsChange: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);

  dragStarted: EventEmitter<any> = new EventEmitter<any>();
  dragEnded: EventEmitter<any> = new EventEmitter<any>();

  protected _allDropListsIds: string[] = [];

  constructor() {
  }

  get allDroplistsIds(): string[] {
    return this._allDropListsIds;
  }

  set allDroplistsIds(value: string[]) {
    this._allDropListsIds = [...value];
  }
}
