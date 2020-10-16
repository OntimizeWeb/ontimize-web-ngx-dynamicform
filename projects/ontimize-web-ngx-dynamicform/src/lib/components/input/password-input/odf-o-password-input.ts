import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_PASSWORD_INPUT } from 'ontimize-web-ngx';

import { CustomDynamicComponent } from '../../o-custom-dynamic-component';
import { InputComponent, InputOptions } from '../input';

export class PasswordFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_PASSWORD_INPUT;
  }

}

@Component({
  selector: 'odf-o-password-input',
  templateUrl: './odf-o-password-input.component.html'
})
export class OPasswordInputDynamicComponent extends CustomDynamicComponent { }
