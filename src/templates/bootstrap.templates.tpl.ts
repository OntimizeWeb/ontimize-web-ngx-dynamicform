/* eslint-disable */
/* tslint-disable */
import { DFTemplate } from '../o-dynamic-form.template';

let getTemplate = function (selector: string, template: any, styles: Array<string> = [], inputs: Array<string> = [], module: Object = {}) {
  return {
    component: {
      selector: selector,
      template: template,
      styles: styles,
      inputs: inputs
    },
    module: module
  };
};

let containerInputs = ['component', 'data', 'addCompontentEmitter : add-component-emitter', 'editMode : edit-mode'];

export const DYNAMIC_FORM_BOOTSTRAP: DFTemplate = {
  components: {
    'o-currency-input': getTemplate('odf-o-currency-input', { gulp_inject: './bootstrap/components/odf-o-currency-input.component.html' }),
    'o-date-input': getTemplate('odf-o-date-input', { gulp_inject: './bootstrap/components/odf-o-date-input.component.html' }),
    'o-email-input': getTemplate('odf-o-email-input', { gulp_inject: './bootstrap/components/odf-o-email-input.component.html' }),
    'o-integer-input': getTemplate('odf-o-integer-input', { gulp_inject: './bootstrap/components/odf-o-integer-input.component.html' }),
    'o-nif-input': getTemplate('odf-o-nif-input', { gulp_inject: './bootstrap/components/odf-o-nif-input.component.html' }),
    'o-password-input': getTemplate('odf-o-password-input', { gulp_inject: './bootstrap/components/odf-o-password-input.component.html' }),
    'o-percent-input': getTemplate('odf-o-percent-input', { gulp_inject: './bootstrap/components/odf-o-percent-input.component.html' }),
    'o-real-input': getTemplate('odf-o-real-input', { gulp_inject: './bootstrap/components/odf-o-real-input.component.html' }),
    'o-text-input': getTemplate('odf-o-text-input', { gulp_inject: './bootstrap/components/odf-o-text-input.component.html' }),
    'o-textarea-input': getTemplate('odf-o-textarea-input', { gulp_inject: './bootstrap/components/odf-o-textarea-input.component.html' }),

    'o-row': getTemplate('odf-o-row', { gulp_inject: './bootstrap/components/odf-o-row.component.html' }),
    'o-column': getTemplate('odf-o-column', { gulp_inject: './bootstrap/components/odf-o-column.component.html' }, [], containerInputs)
  }
};
