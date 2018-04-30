import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatIconModule
  ],
  providers: [
    MatIconRegistry
  ]
})
export class ODynamicFormCustomMaterialModule { }
