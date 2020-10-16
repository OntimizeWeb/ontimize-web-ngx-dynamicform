import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { DYNAMIC_COMPONENTS_WRAPPERS } from './components/o-components';
import { O_DYNAMICFORM_COMPONENTS } from './dynamic-form/index';

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatIconModule,
    OntimizeWebModule
  ],
  declarations: [
    ...O_DYNAMICFORM_COMPONENTS,
    ...DYNAMIC_COMPONENTS_WRAPPERS
  ],
  exports: O_DYNAMICFORM_COMPONENTS,
  entryComponents: DYNAMIC_COMPONENTS_WRAPPERS
})
export class DynamicFormModule { }
