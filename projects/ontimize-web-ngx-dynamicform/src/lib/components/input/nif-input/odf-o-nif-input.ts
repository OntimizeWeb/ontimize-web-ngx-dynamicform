import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_NIF_INPUT } from 'ontimize-web-ngx';

import { ODynamicFormEvents } from '../../../services/o-dynamic-form-events.service';
import { CustomDynamicComponent } from '../../o-custom-dynamic-component';
import { InputComponent, InputOptions } from '../input';

export class NifFieldComponent extends InputComponent<InputOptions> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_NIF_INPUT;
  }

}

@Component({
  selector: 'odf-o-nif-input',
  templateUrl: './odf-o-nif-input.component.html'
})
export class ONifInputDynamicComponent extends CustomDynamicComponent { }