import { DFComponents } from '../components';
import { DFTemplate } from '../../o-dynamic-form.template';
import { BaseComponent, ComponentOptions } from '../base';
import { DEFAULT_INPUTS_O_LIST } from 'ontimize-web-ngx';

export class ListComponent extends BaseComponent<ComponentOptions<string, any>> {

  constructor(settings: any, data?: any) {
    super(settings, data);
  }

  isContainerComponent() {
    return true;
  }

  getInputsProperties(): Array<any> {
    return DEFAULT_INPUTS_O_LIST;
  }

}

export function OdfOList(template: DFTemplate) {
  DFComponents.register('o-list', ListComponent, template.components['o-list']);
}
