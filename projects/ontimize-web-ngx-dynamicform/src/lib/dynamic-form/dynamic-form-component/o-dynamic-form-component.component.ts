import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Injector,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';
import { Subscription } from 'rxjs';

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
import { CustomDynamicComponent } from '../../components/o-custom-dynamic-component';
import { ComboComponent } from '../../components/service/odf-o-combo';
import { ListPickerComponent } from '../../components/service/odf-o-list-picker';
import { ODynamicFormGeneralEvents } from '../../services/o-dynamic-form-general-events.service';
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
    'component'
  ],
  outputs: [
    'render'
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.odf-component]': 'true',
    '[class.temporal]': 'component.temp'
  }
})
export class ODFComponentComponent<T> implements OnInit, OnDestroy {

  public component: any;//BaseOptions<T>;
  public editMode: boolean = false;

  public render: EventEmitter<any> = new EventEmitter();

  public comp: BaseComponent<any>;

  protected subscriptions: Subscription = new Subscription();

  @ViewChild('odfElement', { static: false })
  public odfElementComponent: ODFElementComponent;

  constructor(
    @Optional() @Inject(forwardRef(() => OFormComponent)) protected oForm: OFormComponent,
    protected elRef: ElementRef,
    protected injector: Injector,
    protected generalEventsService: ODynamicFormGeneralEvents
  ) {
    this.subscriptions.add(this.generalEventsService.editModeChange.subscribe(value => {
      this.editMode = value;
    }));
  }

  ngOnInit(): void {
    // Add the initial component.
    this.addComponent();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  public getDynamicComponent(): CustomDynamicComponent {
    return this.odfElementComponent.cmpRef.instance;
  }

  public setConnectedIds() {
    this.getDynamicComponent().setConnectedIds();
  }

  public getConnectedIds(): string[] {
    return this.getDynamicComponent().getConnectedIds();
  }

  public setConnectedDropListIds() {
    this.getDynamicComponent().setConnectedDropListIds();
  }

  get isTemporalComponent(): boolean {
    return this.getDynamicComponent().isTemporalComponent;
  }

  get uId(): string {
    return this.getDynamicComponent().uId;
  }

  get children(): ODFComponentComponent<T>[] {
    return this.getDynamicComponent().children;
  }

  public async addComponent(): Promise<void> {
    const component = this.createComponent();
    if (component) {
      // Set the index and readOnly flag.
      component.index = 0;
      this.comp = component;
    } else {
      this.render.emit(true);
    }
    return component;
  }

  private createComponent() {
    let component;
    const DynamicComponent = paths[this.component['ontimize-directive']];
    if (DynamicComponent) {
      component = new DynamicComponent(this.component, this.injector);
    } else {
      console.warn('There is a wrong component definition (ontimize-directive ="%s" does not exists): %O', this.component['ontimize-directive'], this.component);
      return undefined;
    }
    return component;
  }
}
