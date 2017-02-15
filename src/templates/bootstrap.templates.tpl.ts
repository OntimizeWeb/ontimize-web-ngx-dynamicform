/* eslint-disable */
/* tslint-disable */
import { DFTemplate } from '../o-dynamic-form.template';

let getTemplate = function(selector: string, template: string, styles: Array<string> = [], module: Object = {}) {
    return {
        component: {
            selector: selector,
            template: template,
            styles: styles
        },
        module: module
    };
};
export const DYNAMIC_FORM_BOOTSTRAP: DFTemplate = {
    components: {
        'o-text-input': getTemplate( 'odf-text-input', { gulp_inject: './bootstrap/components/o-text-input.component.html' })
    }
};
