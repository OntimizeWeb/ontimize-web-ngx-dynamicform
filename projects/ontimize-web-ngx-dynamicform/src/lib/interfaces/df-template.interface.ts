import { DFComponentTemplate } from './df-component-template.interface';
import { DFComponentsTemplate } from './df-components-template.interface';

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
