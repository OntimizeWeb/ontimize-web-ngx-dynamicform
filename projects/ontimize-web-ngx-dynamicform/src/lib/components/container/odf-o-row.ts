import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_ROW } from 'ontimize-web-ngx';

import { ComponentOptions } from '../../interfaces/component-options.interface';
import { BaseComponent } from '../base.component';
import { CustomContainerDynamicComponent } from '../o-custom-dynamic-component';

export class ORowComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_ROW;
  }

  public isContainerComponent(): boolean {
    return true;
  }

}

@Component({
  selector: 'odf-o-row',
  templateUrl: './odf-o-row.component.html'
})
export class ORowDynamicComponent extends CustomContainerDynamicComponent { }
