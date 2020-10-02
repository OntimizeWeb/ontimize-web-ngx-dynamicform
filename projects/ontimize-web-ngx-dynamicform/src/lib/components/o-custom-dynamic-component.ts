import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Injector } from '@angular/core';
import { EventEmitter, Input, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import * as uuid from 'uuid';
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
  public generalEventsSevice: ODynamicFormGeneralEvents;

  get numComponents(): number {
    return this.component.getNumComponents();
  }

  public ngOnInit(): void {
    this.setOntimizeComponentInputs();
    this.generalEventsSevice = this.injector.get(ODynamicFormGeneralEvents);
  }

  public ngAfterViewInit(): void {
    this.onRender();
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
}

export class CustomContainerDynamicComponent extends CustomDynamicComponent {
  public editMode: boolean = false;
  public connectedDropListIds: string[];
  public uId: string;
  protected subscriptions: Subscription = new Subscription();

  constructor() {
    super();
    this.uId = uuid.v4();
  }

  ngOnInit() {
    super.ngOnInit();
    this.component.settings.dynamicComponent = this;

    if (this.generalEventsSevice) {
      this.subscriptions.add(this.generalEventsSevice.editModeChange.subscribe(value => {
        this.editMode = value;
      }));
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  onDragDropComponent(event: CdkDragDrop<any>) {
    if (this.generalEventsSevice) {
      this.generalEventsSevice.componentDropped.emit({ event: event, parent: this.component });
    }
  }
}
