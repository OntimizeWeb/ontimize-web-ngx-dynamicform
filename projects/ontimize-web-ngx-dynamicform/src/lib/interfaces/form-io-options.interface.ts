import { AlertsOptions } from './alerts-options.interface';
import { ErrorsOptions } from './errors-options.interface';

export interface FormioOptions {
  errors: ErrorsOptions;
  alerts: AlertsOptions;
}