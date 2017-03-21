// THIS IS A GENERATED FILE. DO NOT MODIFY!!!
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
    'o-currency-input': getTemplate('odf-o-currency-input', "<o-currency-input #ontimizeComponent></o-currency-input>"),
    'o-date-input': getTemplate('odf-o-date-input', "<o-date-input #ontimizeComponent></o-date-input>"),
    'o-email-input': getTemplate('odf-o-email-input', "<o-email-input #ontimizeComponent></o-email-input>"),
    'o-integer-input': getTemplate('odf-o-integer-input', "<o-integer-input #ontimizeComponent></o-integer-input>"),
    'o-nif-input': getTemplate('odf-o-nif-input', "<o-nif-input #ontimizeComponent></o-nif-input>"),
    'o-password-input': getTemplate('odf-o-password-input', "<o-password-input #ontimizeComponent></o-password-input>"),
    'o-percent-input': getTemplate('odf-o-percent-input', "<o-percent-input #ontimizeComponent></o-percent-input>"),
    'o-real-input': getTemplate('odf-o-real-input', "<o-real-input #ontimizeComponent></o-real-input>"),
    'o-text-input': getTemplate('odf-o-text-input', "<o-text-input #ontimizeComponent></o-text-input>"),
    'o-textarea-input': getTemplate('odf-o-textarea-input', "<o-textarea-input #ontimizeComponent></o-textarea-input>"),

    'o-row': getTemplate('odf-o-row', "<o-row #ontimizeComponent>\r\n  <odf-components\r\n    *ngIf=\"component.isContainerComponent()\"\r\n    [components]=\"component.getChildren()\"\r\n    [edit-mode]=\"editMode\"\r\n    (render)=\"onRender()\"\r\n    [add-component-emitter]=\"onAddComponent\"\r\n    [edit-component-settings-emitter]=\"onEditComponentSettings\"\r\n    [delete-component-emitter]=\"onDeleteComponent\">\r\n  </odf-components>\r\n</o-row>"),
    'o-column': getTemplate('odf-o-column', "<o-column #ontimizeComponent>\r\n  <odf-components\r\n    *ngIf=\"component.isContainerComponent()\"\r\n    [components]=\"component.getChildren()\"\r\n    [edit-mode]=\"editMode\"\r\n    (render)=\"onRender()\"\r\n    [add-component-emitter]=\"onAddComponent\"\r\n    [edit-component-settings-emitter]=\"onEditComponentSettings\"\r\n    [delete-component-emitter]=\"onDeleteComponent\">\r\n  </odf-components>\r\n</o-column>", [], containerInputs)
  }
};
