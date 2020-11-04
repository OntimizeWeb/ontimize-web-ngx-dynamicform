import { CdkDragDrop, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { BaseComponent } from '../components/base.component';

export type DragStartEventType = {
  event: CdkDragStart<any>;
  parent: BaseComponent<any>;
}

export type DragEndEventType = {
  event: CdkDragEnd<any>;
  parent: BaseComponent<any>;
}

export type DragDropType = {
  event: CdkDragDrop<any>;
  parent: BaseComponent<any>;
}

@Injectable({
  providedIn: 'root'
})
export class ODynamicFormGeneralEvents {

  private editComponentByAttr: Subject<string> = new Subject<string>();
  private deleteComponentByAttr: Subject<string> = new Subject<string>();
  private componentDropped: Subject<DragDropType> = new Subject<DragDropType>();
  private dragStarted: Subject<DragStartEventType> = new Subject<DragStartEventType>();
  private dragEnded: Subject<DragEndEventType> = new Subject<DragEndEventType>();

  editComponentByAttr$ = this.editComponentByAttr.asObservable();
  deleteComponentByAttr$ = this.deleteComponentByAttr.asObservable();
  componentDropped$ = this.componentDropped.asObservable();
  dragStarted$ = this.dragStarted.asObservable();
  dragEnded$ = this.dragEnded.asObservable();

  private editModeChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private editableComponentsChange: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
  private componentClicked: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  editModeChange$ = this.editModeChange.asObservable();
  editableComponentsChange$ = this.editableComponentsChange.asObservable();
  componentClicked$ = this.componentClicked.asObservable();

  private allDropListsIds: string[] = [];

  selectComponent(attr: string) {
    this.componentClicked.next(attr);
  }

  setAllDropListsIds(value: string[]) {
    this.allDropListsIds = value;
  }

  getAllDropListsIds(): string[] {
    return this.allDropListsIds;
  }

  editComponent(attr: string) {
    this.editComponentByAttr.next(attr);
  }

  deleteComponent(attr: string) {
    this.deleteComponentByAttr.next(attr);
  }

  dropComponent(arg: DragDropType) {
    this.componentDropped.next(arg);
  }

  dragStart(arg: DragStartEventType) {
    this.dragStarted.next(arg);
  }

  dragEnd(arg: DragEndEventType) {
    this.dragEnded.next(arg);
  }

  setEditMode(val: boolean) {
    this.editModeChange.next(val);
  }

  setEditableComponents(value: string[]) {
    this.editableComponentsChange.next(value);
  }
}
