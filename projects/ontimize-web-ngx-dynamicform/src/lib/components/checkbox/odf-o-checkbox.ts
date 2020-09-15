import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_CHECKBOX, OCheckboxComponent } from 'ontimize-web-ngx';

import { ComponentOptions } from '../../interfaces/component-options.interface';
import { BaseComponent } from '../base.component';
import { CustomDynamicComponent } from '../o-custom-dynamic-component';

export class CheckboxComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_CHECKBOX;
  }

  public getOntimizeComponentClass(): typeof OCheckboxComponent {
    return OCheckboxComponent;
  }

}

@Component({
  selector: 'odf-o-checkbox',
  templateUrl: './odf-o-checkbox.component.html'
})
export class OCheckboxDynamicComponent extends CustomDynamicComponent { }