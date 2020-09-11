import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_REAL_INPUT } from 'ontimize-web-ngx';

import { CustomDynamicComponent } from '../../o-custom-dynamic-component';
import { InputComponent, InputOptions } from '../input';

export class RealFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_REAL_INPUT;
  }

}

@Component({
  selector: 'odf-o-real-input',
  templateUrl: './odf-o-real-input.component.html'
})
export class ORealInputDynamicComponent extends CustomDynamicComponent { }
