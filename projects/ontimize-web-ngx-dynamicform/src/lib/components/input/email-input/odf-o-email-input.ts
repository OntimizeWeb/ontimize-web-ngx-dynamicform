import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_EMAIL_INPUT } from 'ontimize-web-ngx';

import { CustomDynamicComponent } from '../../o-custom-dynamic-component';
import { InputComponent, InputOptions } from '../input';

export class EmailFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_EMAIL_INPUT;
  }

}

@Component({
  selector: 'odf-o-email-input',
  templateUrl: './odf-o-email-input.component.html'
})
export class OEmailInputDynamicComponent extends CustomDynamicComponent { }
