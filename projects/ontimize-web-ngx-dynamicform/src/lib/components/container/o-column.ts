import { DEFAULT_INPUTS_O_COLUMN } from 'ontimize-web-ngx';

import { ComponentOptions } from '../../interfaces/component-options.interface';
import { DFTemplate } from '../../interfaces/df-template.interface';
import { ODynamicFormEvents } from '../../services/o-dynamic-form-events.service';
import { BaseComponent } from '../base';
import { DFComponents } from '../components';

export class OColumnComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_COLUMN;
  }

  public isContainerComponent(): boolean {
    return true;
  }

}

export function OdfOColumn(template: DFTemplate): void {
  DFComponents.register('o-column', OColumnComponent, template.components['o-column']);
}
