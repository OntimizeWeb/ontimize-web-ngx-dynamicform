import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OCustomMaterialModule } from 'ontimize-web-ngx';

@NgModule({
  imports: [CommonModule, OCustomMaterialModule],
  exports: [OCustomMaterialModule]
})
export class ODynamicFormCustomMaterialModule { }
