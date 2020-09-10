import { BaseOptions } from './base-options.interface';

/**
 * The form structure.
 */
export interface DynamicFormDefinition {
  title?: string;
  name?: string;
  path?: string;
  project?: string;
  template?: string;
  components?: Array<BaseOptions<any>>;
}
