import { NgModule, Type } from '@angular/core';

declare var require: any;
let Reflect = require('core-js/es7/reflect');

export interface DFComponentMetaData {
  template?: string;
  selector?: string;
  inputs?: string[];
  styles?: string[];
}

export interface DFComponentTemplate {
  component: DFComponentMetaData;
  module?: NgModule;
}

export interface DFComponentsTemplate {
  'o-currency-input': DFComponentTemplate;
  'o-date-input': DFComponentTemplate;
  'o-email-input': DFComponentTemplate;
  'o-integer-input': DFComponentTemplate;
  'o-nif-input': DFComponentTemplate;
  'o-password-input': DFComponentTemplate;
  'o-percent-input': DFComponentTemplate;
  'o-real-input': DFComponentTemplate;
  'o-text-input': DFComponentTemplate;
  'o-textarea-input': DFComponentTemplate;
  'o-row': DFComponentTemplate;
  'o-column': DFComponentTemplate;
  'o-combo': DFComponentTemplate;
  'o-list-picker': DFComponentTemplate;
  'o-checkbox': DFComponentTemplate;
  'o-table': DFComponentTemplate;
}

/**
 * The Form.io template interface.
 *
 * Defines all the fields and components necessary to create a Form.io form
 * rendering template.
 */
export interface DFTemplate {
  formio?: DFComponentTemplate;
  formio_component?: DFComponentTemplate;
  formio_components?: DFComponentTemplate;
  components: DFComponentsTemplate;
}

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
