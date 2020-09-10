import { ConditionalOptions } from './conditional-options.interface';

export interface ComponentOptions<T, V> {
  'ontimize-directive': string;
  defaultValue?: T | T[];
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
