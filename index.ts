import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DndModule } from 'ng2-dnd';

import { ODynamicFormCustomMaterialModule } from './src/shared/custom.material.module';
import { ODynamicFormEvents } from './src/o-dynamic-form.events';
import { RegisterComponents } from './src/components';
import { DYNAMIC_FORM_BOOTSTRAP } from './src/templates/bootstrap.templates';
import { O_DYNAMICFORM_COMPONENTS } from './src/dynamic-form.index';

export { ODynamicFormComponent } from './src/o-dynamic-form.component';
import { ODataTableModule } from 'ontimize-web-ngx-datatable';

@NgModule({
  imports: [
    ODataTableModule,
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
    ODynamicFormCustomMaterialModule,
    DndModule.forRoot()
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
