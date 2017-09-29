import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdIconRegistry } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdIconModule
  ],
  providers: [
    MdIconRegistry
  ]
})
export class ODynamicFormCustomMaterialModule { }
