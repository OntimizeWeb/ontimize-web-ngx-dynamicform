import { Type, NgModule } from '@angular/core';
let Reflect = require('core-js/es7/reflect');

export interface DFComponentMetaData {
    template?: string;
    selector?: string;
    inputs?: Array<string>;
    styles?: Array<string>;
}

export interface DFComponentTemplate {
    component: DFComponentMetaData;
    module?: NgModule;
}

export interface DFComponentsTemplate {
    // button: DFComponentTemplate;
    // columns: DFComponentTemplate;
    // container: DFComponentTemplate;
    // datagrid: DFComponentTemplate;
    // input: DFComponentTemplate;
    // number: DFComponentTemplate;
    // textarea: DFComponentTemplate;
    // hidden: DFComponentTemplate;
    // radio: DFComponentTemplate;
    // checkbox: DFComponentTemplate;
    // custom: DFComponentTemplate;
    // table: DFComponentTemplate;
    // panel: DFComponentTemplate;
    // fieldset: DFComponentTemplate;
    // well: DFComponentTemplate;
    // datetime: DFComponentTemplate;
    // selectboxes: DFComponentTemplate;
    // content: DFComponentTemplate;
    // html: DFComponentTemplate;
    // currency: DFComponentTemplate;
    // select: DFComponentTemplate;
    // survey: DFComponentTemplate;
    // resource: DFComponentTemplate;
    // address: DFComponentTemplate;
    // phoneNumber: DFComponentTemplate;
    // signature: DFComponentTemplate;
    // day: DFComponentTemplate;
    'o-text-input': DFComponentTemplate;
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
};

/**
 * Allow dynamic altering of the component templates based on what template
 * they wish to load within their renderer.
 *
 * @param cmp - The component class to alter.
 * @param template - The template to add to this component.
 * @constructor
 */
export function RegisterTemplate(cmp: Type<any>, template: DFComponentTemplate) {
    //noinspection TypeScriptUnresolvedFunction
    let annotations = Reflect.getMetadata('annotations', cmp);
    annotations[0].template = template.component.template;
    if (template.component.styles) {
        annotations[0].styles = template.component.styles;
    }
    //noinspection TypeScriptUnresolvedFunction
    Reflect.defineMetadata('annotations', annotations, cmp);
}
