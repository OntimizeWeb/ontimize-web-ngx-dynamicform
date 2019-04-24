import { DEFAULT_INPUTS_O_ROW } from 'ontimize-web-ngx';

import { ODynamicFormEvents } from '../../o-dynamic-form.events';
import { DFTemplate } from '../../o-dynamic-form.template';
import { BaseComponent, ComponentOptions } from '../base';
import { DFComponents } from '../components';

export class ORowComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  public getInputsProperties(): any[] {
    return DEFAULT_INPUTS_O_ROW;
  }

  public isContainerComponent(): boolean {
    return true;
  }

}

export function OdfORow(template: DFTemplate): void {
  DFComponents.register('o-row', ORowComponent, template.components['o-row']);
}
