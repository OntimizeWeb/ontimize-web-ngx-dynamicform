import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_LIST_PICKER, OListPickerComponent } from 'ontimize-web-ngx';

import { ComponentOptions } from '../../interfaces/component-options.interface';
import { BaseComponent } from '../base.component';
import { CustomDynamicComponent } from '../o-custom-dynamic-component';

export class ListPickerComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_LIST_PICKER;
  }

  public getOntimizeComponentClass(): typeof OListPickerComponent {
    return OListPickerComponent;
  }

}

@Component({
  selector: 'odf-o-list-picker',
  templateUrl: './odf-o-list-picker.component.html'
})
export class OListPickerDynamicComponent extends CustomDynamicComponent { }
