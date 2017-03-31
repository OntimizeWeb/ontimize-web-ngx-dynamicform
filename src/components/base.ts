import { ODynamicFormEvents } from '../o-dynamic-form.events';

export interface ConditionalOptions {
  show?: string;
  when?: any;
  eq?: any;
}

export interface ValidateOptions {
  required?: boolean;
  custom?: string;
  customPrivate?: boolean;
}

export interface ComponentOptions<T, V> {
  'ontimize-directive': string;
  defaultValue?: T | Array<T>;
  type?: string;
  key?: string;
  label?: string;
  input?: boolean;
  required?: boolean;
  multiple?: boolean;
  protected?: boolean;
  unique?: boolean;
  persistent?: boolean;
  tableView?: boolean;
  lockKey?: boolean;
  validate?: V;
  conditional?: ConditionalOptions;
  customConditional?: string;
}

export interface BaseOptions<T> extends ComponentOptions<T, ValidateOptions> { }

export class BaseComponent<T> {
  index: number = 0;

  constructor(
    public settings: any,
    public events: ODynamicFormEvents,
    public data: any = {}
  ) {

  }

  getNumComponents() {
    return this.isContainerComponent() ? this.getChildren().length : 0;
  }

  allowMultiple(): boolean {
    return this.settings.multiple;
  }

  getInputsProperties(): Array<any> {
    return [];
  }

  getInputsMapping() {
    let rawProperties = this.getInputsProperties();
    let parsedProperties = [];
    for (var i = 0; i < rawProperties.length; i++) {
      let splitted = rawProperties[i].split(':');
      let propObj = {
        propName: splitted[0].trim(),
        input: splitted[splitted.length - 1].trim()
      };
      parsedProperties.push(propObj);
    }
    return parsedProperties;
  }

  isContainerComponent() {
    return false;
  }

  getChildren() {
    return this.settings.children;
  }

  getComponentAttr() {
    return this.settings.attr;
  }
}
