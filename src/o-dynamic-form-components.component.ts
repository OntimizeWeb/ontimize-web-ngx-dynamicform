import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseOptions } from './components/base';

@Component({
  moduleId: module.id,
  selector: 'odf-components',
  templateUrl: 'o-dynamic-form-components.component.html'
})
export class ODFComponentsComponent {

  @Input() components: Array<BaseOptions<any>>;
  @Input() form: FormGroup;
  @Input() submission: FormGroup;
  @Input() data: any;

  @Output() render: EventEmitter<any> = new EventEmitter();

  private renderCount: number = 0;

  onRender() {
    if (this.renderCount >= this.components.length) {
      return;
    }
    this.renderCount++;
    if (this.renderCount >= this.components.length) {
      this.render.emit(true);
    }
  }
}
