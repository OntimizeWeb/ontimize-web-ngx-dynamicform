import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_PASSWORD_INPUT } from 'ontimize-web-ngx';

import { ODynamicFormEvents } from '../../../services/o-dynamic-form-events.service';
import { CustomDynamicComponent } from '../../o-custom-dynamic-component';
import { InputComponent, InputOptions } from '../input';

export class PasswordFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
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
