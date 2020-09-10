import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponents } from './components';
import { O_DYNAMICFORM_COMPONENTS } from './dynamic-form.index';
import { ODynamicFormEvents } from './services/o-dynamic-form-events.service';
import { ODynamicFormCustomMaterialModule } from './shared/custom.material.module';
import { DYNAMIC_FORM_BOOTSTRAP } from './templates/bootstrap.templates';

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
    ODynamicFormCustomMaterialModule,
    DragDropModule
  ],
  declarations: O_DYNAMICFORM_COMPONENTS,
  exports: O_DYNAMICFORM_COMPONENTS,
  providers: [
    ODynamicFormEvents
  ]
})
export class DynamicFormModule {
  constructor() {
    RegisterComponents(DYNAMIC_FORM_BOOTSTRAP);
  }
}
