import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule, MdIconRegistry } from '@angular/material';
import { DndModule } from 'ng2-dnd';

import { DYNAMIC_FORM_BOOTSTRAP } from './src/templates/bootstrap.templates';

import { ODynamicFormComponent } from './src/o-dynamic-form.component';
import { ODFComponentComponent } from './src/o-dynamic-form-component.component';
import { ODFElementComponent } from './src/o-dynamic-form-element.component';
import { ODynamicFormEvents } from './src/o-dynamic-form.events';
import { RegisterComponents } from './src/components/index';

import { ODFElementOptionsComponent } from './src/o-dynamic-form-element-options.component';
import { ODropZoneComponent } from './src/dropzone/o-drop-zone.component';
import { ODropZoneService } from './src/dropzone/o-drop-zone.service';

export { ODynamicFormComponent } from './src/o-dynamic-form.component';

export function getODropZoneServiceProvider() {
  return new ODropZoneService();
}

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    DndModule.forRoot(),
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ODynamicFormComponent,
    ODFComponentComponent,
    ODFElementComponent,
    ODFElementOptionsComponent,
    ODropZoneComponent
  ],
  exports: [
    ODynamicFormComponent,
    ODFComponentComponent,
    ODFElementComponent,
    ODFElementOptionsComponent,
    ODropZoneComponent
  ],
  providers: [
    MdIconRegistry,
    ODynamicFormEvents,
    {
      provide: ODropZoneService,
      useFactory: getODropZoneServiceProvider
    }
  ]
})
export class DynamicFormModule {

  constructor() {
    RegisterComponents(DYNAMIC_FORM_BOOTSTRAP);
  }

}
