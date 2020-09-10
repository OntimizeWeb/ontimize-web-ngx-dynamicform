import { ODynamicFormEvents } from '../services/o-dynamic-form-events.service';

export class BaseComponent<T> {

  public index: number = 0;

  constructor(
    public settings: any,
    public events: ODynamicFormEvents,
    public data: any = {}
  ) { }

  public getNumComponents(): number {
    return this.isContainerComponent() ? this.getChildren().length : 0;
  }

  public allowMultiple(): boolean {
    return this.settings.multiple;
  }

  public getInputsProperties(): any[] {
    return [];
  }

  public getInputsMapping(): any[] {
    const rawProperties = this.getInputsProperties();
    const parsedProperties = [];
    rawProperties.forEach(properties => {
      const splitted = properties.split(':');
      const propObj = {
        propName: splitted[0].trim(),
        input: splitted[splitted.length - 1].trim()
      };
      parsedProperties.push(propObj);
    });
    return parsedProperties;
  }

  public isContainerComponent(): boolean {
    return false;
  }

  public getChildren(): any {
    return this.settings.children;
  }

  public getComponentAttr(): string {
    return this.settings.attr;
  }

  public getChildrenAttrs(): string[] {
    const attrs = [];
    this._getChildrenAttrsFromSettings(this.settings, attrs);
    return attrs;
  }

  protected _getChildrenAttrsFromSettings(element: Object, attrs: string[]): string[] {
    attrs.push(element['attr']);
    if (element['children']) {
      element['children'].forEach(e => {
        this._getChildrenAttrsFromSettings(e, attrs);
      });
    }
    return attrs;
  }

}
