import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DYNAMIC_FORM_BOOTSTRAP } from './src/templates/bootstrap.templates';

import { ODynamicFormComponent } from './src/o-dynamic-form.component';
import { ODFComponentsComponent } from './src/o-dynamic-form-components.component';
import { ODFComponentComponent } from './src/o-dynamic-form-component.component';
import { ODFElementComponent } from './src/o-dynamic-form-element.component';
import { ODynamicFormEvents } from './src/o-dynamic-form.events';
import { RegisterComponents } from './src/components/index';
import { DFTemplate } from './src/o-dynamic-form.template';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ODynamicFormComponent,
    ODFComponentsComponent,
    ODFComponentComponent,
    ODFElementComponent
  ],
  exports: [
    ODynamicFormComponent,
    ODFComponentsComponent,
    ODFComponentComponent,
    ODFElementComponent
  ]
})
export class DynamicFormModule {
  static forRoot(): ModuleWithProviders {
    this.setTemplate(DYNAMIC_FORM_BOOTSTRAP);
    return {
      ngModule: DynamicFormModule,
      providers: [ODynamicFormEvents]
    };
  }
  public static setTemplate(template: DFTemplate) {
    RegisterComponents(template);
  }
}
