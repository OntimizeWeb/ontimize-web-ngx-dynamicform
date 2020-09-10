import { Type } from '@angular/core';

import { DFComponentTemplate } from './interfaces/df-component-template.interface';

declare var require: any;
let Reflect = require('core-js/es7/reflect');
/**
 * Allow dynamic altering of the component templates based on what template
 * they wish to load within their renderer.
 *
 * @param cmp - The component class to alter.
 * @param template - The template to add to this component.
 */
export function RegisterTemplate(cmp: Type<any>, template: DFComponentTemplate): void {
  //noinspection TypeScriptUnresolvedFunction
  const annotations = Reflect.getMetadata('annotations', cmp);
  annotations[0].template = template.component.template;
  if (template.component.styles) {
    annotations[0].styles = template.component.styles;
  }
  //noinspection TypeScriptUnresolvedFunction
  Reflect.defineMetadata('annotations', annotations, cmp);
}
