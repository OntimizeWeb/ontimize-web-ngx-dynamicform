import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OCustomMaterialModule } from 'ontimize-web-ngx';

@NgModule({
    imports: [
        CommonModule,
        OCustomMaterialModule
    ],
    exports: [
        OCustomMaterialModule
    ]
})
export class ODynamicFormCustomMaterialModule { }
