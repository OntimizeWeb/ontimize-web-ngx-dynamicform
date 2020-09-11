import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_TEXTAREA_INPUT } from 'ontimize-web-ngx';

import { CustomDynamicComponent } from '../../o-custom-dynamic-component';
import { InputComponent, InputOptions } from '../input';

export class TextareaFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_TEXTAREA_INPUT;
  }

}

@Component({
  selector: 'odf-o-textarea-input',
  templateUrl: './odf-o-textarea-input.component.html'
})
export class OTextareaInputDynamicComponent extends CustomDynamicComponent { }
