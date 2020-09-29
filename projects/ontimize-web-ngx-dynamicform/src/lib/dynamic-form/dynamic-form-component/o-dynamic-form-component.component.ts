import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Injector,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';

import { BaseComponent } from '../../components/base.component';
import { CheckboxComponent } from '../../components/checkbox/odf-o-checkbox';
import { OColumnComponent } from '../../components/container/odf-o-column';
import { ORowComponent } from '../../components/container/odf-o-row';
import { TableComponent } from '../../components/data/odf-o-table';
import { CurrencyFieldComponent } from '../../components/input/currency-input/odf-o-currency-input';
import { DateFieldComponent } from '../../components/input/date-input/odf-o-date-input';
import { EmailFieldComponent } from '../../components/input/email-input/odf-o-email-input';
import { IntegerFieldComponent } from '../../components/input/integer-input/odf-o-integer-input';
import { NifFieldComponent } from '../../components/input/nif-input/odf-o-nif-input';
import { PasswordFieldComponent } from '../../components/input/password-input/odf-o-password-input';
import { PercentFieldComponent } from '../../components/input/percent-input/odf-o-percent-input';
import { RealFieldComponent } from '../../components/input/real-input/odf-o-real-input';
import { TextFieldComponent } from '../../components/input/text-input/odf-o-text-input';
import { TextareaFieldComponent } from '../../components/input/textarea-input/odf-o-textarea-input';
import { ComboComponent } from '../../components/service/odf-o-combo';
import { ListPickerComponent } from '../../components/service/odf-o-list-picker';
import { BaseOptions } from '../../interfaces/base-options.interface';
import { ODynamicFormEvents } from '../../services/o-dynamic-form-events.service';
import { ODFElementComponent } from '../dynamic-form-element/o-dynamic-form-element.component';

const paths = {
  'o-checkbox': CheckboxComponent,
  'o-column': OColumnComponent,
  'o-row': ORowComponent,
  'o-table': TableComponent,
  'o-currency-input': CurrencyFieldComponent,
  'o-date-input': DateFieldComponent,
  'o-email-input': EmailFieldComponent,
  'o-integer-input': IntegerFieldComponent,
  'o-nif-input': NifFieldComponent,
  'o-password-input': PasswordFieldComponent,
  'o-percent-input': PercentFieldComponent,
  'o-real-input': RealFieldComponent,
  'o-text-input': TextFieldComponent,
  'o-textarea-input': TextareaFieldComponent,
  'o-combo': ComboComponent,
  'o-list-picker': ListPickerComponent
}

@Component({
  selector: 'odf-component',
  templateUrl: './o-dynamic-form-component.component.html',
  styleUrls: ['./o-dynamic-form-component.component.scss'],
  inputs: [
    'component',
    'editMode : edit-mode',
    'editComponentSettingsEmitter : edit-component-settings-emitter',
    'deleteComponentEmitter : delete-component-emitter'
  ],
  outputs: [
    'render',
    'componentDropped'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ODFComponentComponent<T> implements OnInit {

  public show: boolean = true;
  public components: Array<BaseComponent<any>> = [];

  public label: string | boolean;

  public component: BaseOptions<T>;
  public editMode: boolean = false;
  
  public editComponentSettingsEmitter: EventEmitter<any>;
  public deleteComponentEmitter: EventEmitter<any>;

  public render: EventEmitter<any> = new EventEmitter();
  public componentDropped: EventEmitter<any> = new EventEmitter();

  public isDragEnabled: boolean = false;

  @ViewChild('odfElement', { static: false })
  protected odfElement: ODFElementComponent;

  constructor(
    @Optional() @Inject(forwardRef(() => OFormComponent)) protected oForm: OFormComponent,
    protected elRef: ElementRef,
    protected injector: Injector,
    private events: ODynamicFormEvents
  ) { }

  public ngOnInit(): void {
    // Add the initial component.
    this.addComponent();
    this.events.onChange.subscribe(() => this.checkConditions());
  }

  public checkConditions(): void {
    this.show = true;
  }

  public async addComponent(): Promise<void> {
    const component = this.createComponent();
    if (component) {
      // Set the index and readOnly flag.
      component.index = this.components.length;
      // Add this to the instances.
      this.components.push(component);
    } else {
      // component wasnt created (triggering render so the dynamic-form would trigger render event correctly)
      this.render.emit(true);
    }
    return component;
  }

  public removeAt(index: number): void {
    this.components.splice(index, 1);
  }

  public isContainerComponent(component: BaseComponent<any>): boolean {
    return component.isContainerComponent();
  }

  public getDraggableData(): BaseComponent<any> {
    return this.odfElement ? this.odfElement.component : null;
  }

  private createComponent() {
    let component;
    const DynamicComponent = paths[this.component['ontimize-directive']];
    if (DynamicComponent) {
      component = new DynamicComponent(this.component, this.events, this.injector);
    } else {
      console.warn('There is a wrong component definition (ontimize-directive ="%s" does not exists): %O', this.component['ontimize-directive'], this.component);
      return undefined;
    }
    return component;
  }
}
