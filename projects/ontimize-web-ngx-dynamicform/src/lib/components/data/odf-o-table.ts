import { Component } from '@angular/core';
import { DEFAULT_INPUTS_O_TABLE, OTableComponent } from 'ontimize-web-ngx';

import { BaseComponent } from '../base.component';
import { InputOptions } from '../input/input';
import { CustomDynamicComponent } from '../o-custom-dynamic-component';

export class TableComponent extends BaseComponent<InputOptions> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_TABLE;
  }

  public getOntimizeComponentClass(): typeof OTableComponent {
    return OTableComponent;
  }

}

@Component({
  selector: 'odf-o-table',
  templateUrl: './odf-o-table-input.component.html'
})
export class OTableDynamicComponent extends CustomDynamicComponent { }