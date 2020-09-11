import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_DATE_INPUT } from 'ontimize-web-ngx';

import { ODynamicFormEvents } from '../../../services/o-dynamic-form-events.service';
import { CustomDynamicComponent } from '../../o-custom-dynamic-component';
import { InputComponent, InputOptions } from '../input';

export class DateFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
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
