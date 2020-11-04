import { CdkDragDrop, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { EventEmitter, Injector, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import * as uuid from 'uuid';

import { ODFComponentComponent } from '../dynamic-form/dynamic-form-component/o-dynamic-form-component.component';
import { ODynamicFormGeneralEvents } from '../services/o-dynamic-form-general-events.service';
import { BaseComponent } from './base.component';

export class CustomDynamicComponent {

  @Input() public component: BaseComponent<any>;
  @Input() public data: any;

  @ViewChild('ontimizeComponent', { static: true })
  public ontimizeComponent: any;

  public formGroupSubs: any;

  public render: EventEmitter<any>;
  public renderCount: number = 0;

  public injector: Injector;
  public generalEventsService: ODynamicFormGeneralEvents;

  public uId: string;

  constructor() {
    this.uId = uuid.v4();
  }

  public ngOnInit(): void {
    this.setOntimizeComponentInputs();
    this.generalEventsService = this.injector.get(ODynamicFormGeneralEvents);
  }

  public ngAfterViewInit(): void {
    if (!this.isTemporalComponent) {
      this.onRender();
    }
  }

  get numComponents(): number {
    return this.component.getNumComponents();
  }

  public setOntimizeComponentInputs(): void {
    if (this.component && this.ontimizeComponent) {
      const inputsMapping = this.component.getInputsMapping();
      inputsMapping.forEach(curr => {
        if (this.component.settings.hasOwnProperty(curr.input)) {
          this.ontimizeComponent[curr.propName] = this.component.settings[curr.input];
        }
      });
    }
  }

  public onRender(): void {
    if (!this.render) {
      return;
    }
    if (this.renderCount > this.numComponents) {
      return;
    }
    this.renderCount++;
    if (this.renderCount > this.numComponents) {
      this.render.emit(true);
    }
  }

  public getConnectedIds(): string[] {
    return [];
  }

  public setConnectedIds() {
  }

  public setConnectedDropListIds() {
  }

  get isTemporalComponent(): boolean {
    return (this.component && this.component.settings && this.component.settings.temp);
  }

  get children(): ODFComponentComponent<any>[] {
    return [];
  }

}

export class CustomContainerDynamicComponent extends CustomDynamicComponent {
  public editMode: boolean = false;
  protected subscriptions: Subscription = new Subscription();
  isHovering: boolean = false;

  @ViewChildren('odfComponent') dynamicChildren: QueryList<ODFComponentComponent<any>>;
  protected _connectedIds: string[] = [];
  protected _connectedDropListIds: string[] = [];

  ngOnInit() {
    super.ngOnInit();

    if (this.generalEventsService) {
      this.subscriptions.add(this.generalEventsService.editModeChange$.subscribe(value => {
        this.editMode = value;
      }));
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  get children(): ODFComponentComponent<any>[] {
    return this.dynamicChildren.toArray();
  }

  public getConnectedIds(): string[] {
    return this._connectedIds;
  }

  public setConnectedIds() {
    const result = [this.uId];
    this.dynamicChildren.toArray().forEach(child => {
      child.setConnectedIds();
      result.push(...child.getConnectedIds());
    });
    this._connectedIds = result;
  }

  public setConnectedDropListIds() {
    this.dynamicChildren.toArray().forEach(child => child.setConnectedDropListIds());
    const diff = this.generalEventsService.getAllDropListsIds().filter(id => this._connectedIds.indexOf(id) === -1);
    diff.reverse();
    this._connectedDropListIds = diff;
  }

  get connectedDropListIds(): string[] {
    return this._connectedDropListIds;
  }

  public onDragDropComponent(event: CdkDragDrop<any>) {
    if (this.generalEventsService) {
      this.generalEventsService.dropComponent({ event: event, parent: this.component });
    }
  }

  public dropListEntered() {
    this.isHovering = true;
  }

  public dropListExited() {
    this.isHovering = false;
  }

  public dragStarted(event: CdkDragStart<any>) {
    if (this.generalEventsService) {
      this.generalEventsService.dragStart({ event: event, parent: this.component });
    }
  }

  public dragEnded(event: CdkDragEnd<any>) {
    if (this.generalEventsService) {
      this.generalEventsService.dragEnd({ event: event, parent: this.component });
    }
  }
}
