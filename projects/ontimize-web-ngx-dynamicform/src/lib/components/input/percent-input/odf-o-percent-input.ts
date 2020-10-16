import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_PERCENT_INPUT } from 'ontimize-web-ngx';

import { CustomDynamicComponent } from '../../o-custom-dynamic-component';
import { InputComponent, InputOptions } from '../input';

export class PercentFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_PERCENT_INPUT;
  }

}

@Component({
  selector: 'odf-o-percent-input',
  templateUrl: './odf-o-percent-input.component.html'
})
export class OPercentInputDynamicComponent extends CustomDynamicComponent { }
