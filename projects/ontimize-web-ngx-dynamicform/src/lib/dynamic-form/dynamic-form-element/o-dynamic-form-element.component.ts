import {
  Compiler,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { BaseComponent } from '../../components/base.component';
import { OCheckboxDynamicComponent } from '../../components/checkbox/odf-o-checkbox';
import { OColumnDynamicComponent } from '../../components/container/odf-o-column';
import { ORowDynamicComponent } from '../../components/container/odf-o-row';
import { OTableDynamicComponent } from '../../components/data/odf-o-table';
import { OCurrencyInputDynamicComponent } from '../../components/input/currency-input/odf-o-currency-input';
import { ODateInputDynamicComponent } from '../../components/input/date-input/odf-o-date-input';
import { OEmailInputDynamicComponent } from '../../components/input/email-input/odf-o-email-input';
import { OIntegerInputDynamicComponent } from '../../components/input/integer-input/odf-o-integer-input';
import { ONifInputDynamicComponent } from '../../components/input/nif-input/odf-o-nif-input';
import { OPasswordInputDynamicComponent } from '../../components/input/password-input/odf-o-password-input';
import { OPercentInputDynamicComponent } from '../../components/input/percent-input/odf-o-percent-input';
import { ORealInputDynamicComponent } from '../../components/input/real-input/odf-o-real-input';
import { OTextInputDynamicComponent } from '../../components/input/text-input/odf-o-text-input';
import { OTextareaInputDynamicComponent } from '../../components/input/textarea-input/odf-o-textarea-input';
import { OComboDynamicComponent } from '../../components/service/odf-o-combo';
import { OListPickerDynamicComponent } from '../../components/service/odf-o-list-picker';

const paths = {
  'o-checkbox': OCheckboxDynamicComponent,
  'o-column': OColumnDynamicComponent,
  'o-row': ORowDynamicComponent,
  'o-table': OTableDynamicComponent,
  'o-currency-input': OCurrencyInputDynamicComponent,
  'o-date-input': ODateInputDynamicComponent,
  'o-email-input': OEmailInputDynamicComponent,
  'o-integer-input': OIntegerInputDynamicComponent,
  'o-nif-input': ONifInputDynamicComponent,
  'o-password-input': OPasswordInputDynamicComponent,
  'o-percent-input': OPercentInputDynamicComponent,
  'o-real-input': ORealInputDynamicComponent,
  'o-text-input': OTextInputDynamicComponent,
  'o-textarea-input': OTextareaInputDynamicComponent,
  'o-combo': OComboDynamicComponent,
  'o-list-picker': OListPickerDynamicComponent
}

@Component({
  selector: 'odf-element',
  templateUrl: './o-dynamic-form-element.component.html',
  inputs: [
    'component',
    'render'
  ]
})
export class ODFElementComponent implements OnInit {

  public component: BaseComponent<any>;
  public render: EventEmitter<any>;

  @ViewChild('odfElement', { read: ViewContainerRef, static: true })
  public element: ViewContainerRef;

  constructor(
    protected injector: Injector,
    protected compiler: Compiler,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  public async ngOnInit() {
    if (!this.element) {
      return void 0;
    }

    const componentReference = paths[this.component.settings['ontimize-directive']];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentReference);
    
    this.element.clear();
    const cmpRef: ComponentRef<any> = this.element.createComponent<any>(componentFactory);

    // cmpRef.instance is a CustomDynamicComponent
    cmpRef.instance['injector'] = this.injector;
    cmpRef.instance['component'] = this.component;
    cmpRef.instance['render'] = this.render;
  }

}
