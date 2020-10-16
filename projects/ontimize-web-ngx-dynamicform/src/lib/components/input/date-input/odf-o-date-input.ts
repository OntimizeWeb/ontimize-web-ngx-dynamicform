import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_DATE_INPUT } from 'ontimize-web-ngx';

import { CustomDynamicComponent } from '../../o-custom-dynamic-component';
import { InputComponent, InputOptions } from '../input';

export class DateFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_DATE_INPUT;
  }

}

@Component({
  selector: 'odf-o-date-input',
  templateUrl: './odf-o-date-input.component.html'
})
export class ODateInputDynamicComponent extends CustomDynamicComponent { }
