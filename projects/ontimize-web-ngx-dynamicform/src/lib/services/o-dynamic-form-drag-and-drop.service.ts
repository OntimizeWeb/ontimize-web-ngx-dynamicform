import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ODynamicFormDragAndDropService {

  public allDropListsIds$: BehaviorSubject<string[]> = new BehaviorSubject(null);
  public ids: string[] = [];

  constructor() {
  }

  reset() {
    this.ids = [];
  }

  addDropListId(dropListId: string) {
    if (this.ids.find(id => id === dropListId) == null) {
      this.ids.push(dropListId);
      this.allDropListsIds$.next(this.ids);
    }
  }
}
