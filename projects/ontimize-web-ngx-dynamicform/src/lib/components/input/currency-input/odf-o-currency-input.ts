import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_CURRENCY_INPUT } from 'ontimize-web-ngx';

import { CustomDynamicComponent } from '../../o-custom-dynamic-component';
import { InputComponent, InputOptions } from '../input';

export class CurrencyFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_CURRENCY_INPUT;
  }

}

@Component({
  selector: 'odf-o-currency-input',
  templateUrl: './odf-o-currency-input.component.html'
})
export class OCurrencyInputDynamicComponent extends CustomDynamicComponent { }
