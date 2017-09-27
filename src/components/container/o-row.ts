import { DFComponents } from '../components';
import { DFTemplate } from '../../o-dynamic-form.template';
import { ODynamicFormEvents } from '../../o-dynamic-form.events';
import { BaseComponent, ComponentOptions } from '../base';
import { DEFAULT_INPUTS_O_ROW } from 'ontimize-web-ngx';

export class ORowComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, events?: ODynamicFormEvents, data?: any) {
    super(settings, events, data);
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_ROW;
  }

  isContainerComponent() {
    return true;
  }

}

export function OdfORow(template: DFTemplate) {
  DFComponents.register('o-row', ORowComponent, template.components['o-row']);
}
