import { DFComponents } from '../components';
import { DFTemplate } from '../../o-dynamic-form.template';
import { ODynamicFormEvents } from '../../o-dynamic-form.events';
import { BaseComponent, ComponentOptions } from '../base';
import { DEFAULT_INPUTS_O_ROW } from 'ontimize-web-ng2/ontimize';

export class OColumnComponent extends BaseComponent<ComponentOptions<string, any>> {
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

export function OdfOColumn(template: DFTemplate) {
  DFComponents.register('o-column', OColumnComponent, template.components['o-column']);
};
