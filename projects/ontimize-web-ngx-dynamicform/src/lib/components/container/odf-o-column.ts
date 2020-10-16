import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_COLUMN } from 'ontimize-web-ngx';

import { ComponentOptions } from '../../interfaces/component-options.interface';
import { BaseComponent } from '../base.component';
import { CustomContainerDynamicComponent } from '../o-custom-dynamic-component';

export class OColumnComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_COLUMN;
  }

  public isContainerComponent(): boolean {
    return true;
  }

}

@Component({
  selector: 'odf-o-column',
  templateUrl: './odf-o-column.component.html'
})
export class OColumnDynamicComponent extends CustomContainerDynamicComponent { }