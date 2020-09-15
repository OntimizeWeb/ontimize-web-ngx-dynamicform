import { EventEmitter, Input, ViewChild } from '@angular/core';

import { BaseComponent } from './base.component';

export class CustomDynamicComponent {

  @Input() public component: BaseComponent<any>;
  @Input() public data: any;

  public onAddComponent: EventEmitter<any> = new EventEmitter();
  public onMoveComponent: EventEmitter<any> = new EventEmitter();
  public onEditComponentSettings: EventEmitter<any> = new EventEmitter();
  public onDeleteComponent: EventEmitter<any> = new EventEmitter();

  @ViewChild('ontimizeComponent', { static: true })
  public ontimizeComponent: any;

  public formGroupSubs: any;

  public render: EventEmitter<any>;
  public renderCount: number = 0;

  get numComponents(): number {
    return this.component.getNumComponents();
  }

  public ngOnInit(): void {
    this.setOntimizeComponentInputs();
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
  @Input('add-component-emitter') public addComponentEmitter: EventEmitter<any>;
  @Input('edit-mode') public editMode: boolean = false;
}