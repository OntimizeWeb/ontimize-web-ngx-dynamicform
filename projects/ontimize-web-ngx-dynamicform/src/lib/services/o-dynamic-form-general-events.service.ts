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
  
  constructor() {
  }

}
