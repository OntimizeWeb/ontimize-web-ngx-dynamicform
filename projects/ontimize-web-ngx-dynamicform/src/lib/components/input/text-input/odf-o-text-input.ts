import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_TEXT_INPUT, OTextInputComponent } from 'ontimize-web-ngx';

import { CustomDynamicComponent } from '../../o-custom-dynamic-component';
import { InputComponent, InputOptions } from '../input';

export class TextFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_TEXT_INPUT;
  }

  public getOntimizeComponentClass(): typeof OTextInputComponent {
    return OTextInputComponent;
  }

}

@Component({
  selector: 'odf-o-text-input',
  templateUrl: './odf-o-text-input.component.html'
})
export class OTextInputDynamicComponent extends CustomDynamicComponent { }
