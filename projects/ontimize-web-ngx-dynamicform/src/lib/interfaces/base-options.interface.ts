import { ComponentOptions } from './component-options.interface';
import { ValidateOptions } from './validate-options.interface';

export interface BaseOptions<T> extends ComponentOptions<T, ValidateOptions> { }