import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_COMBO, OComboComponent } from 'ontimize-web-ngx';

import { ComponentOptions } from '../../interfaces/component-options.interface';
import { BaseComponent } from '../base.component';
import { CustomDynamicComponent } from '../o-custom-dynamic-component';

export class ComboComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_COMBO;
  }

  public getOntimizeComponentClass(): typeof OComboComponent {
    return OComboComponent;
  }

}

@Component({
  selector: 'odf-o-combo',
  templateUrl: './odf-o-combo.component.html'
})
export class OComboDynamicComponent extends CustomDynamicComponent { }
