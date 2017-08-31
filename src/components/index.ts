import { DFTemplate } from '../o-dynamic-form.template';

import { OdfOCurrencyInput } from './input/currency-input/o-currency-input';
import { OdfODateInput } from './input/date-input/o-date-input';
import { OdfOEmailInput } from './input/email-input/o-email-input';
import { OdfOIntegerInput } from './input/integer-input/o-integer-input';
import { OdfONifInput } from './input/nif-input/o-nif-input';
import { OdfOPasswordInput } from './input/password-input/o-password-input';
import { OdfOPercentInput } from './input/percent-input/o-percent-input';
import { OdfORealInput } from './input/real-input/o-real-input';
import { OdfOTextInput } from './input/text-input/o-text-input';
import { OdfOTextareaInput } from './input/textarea-input/o-textarea-input';

import { OdfOColumn } from './container/o-column';
import { OdfORow } from './container/o-row';


export function RegisterComponents(template: DFTemplate) {
  OdfOColumn(template);
  OdfORow(template);

  OdfOCurrencyInput(template);
  OdfODateInput(template);
  OdfOEmailInput(template);
  OdfOIntegerInput(template);
  OdfONifInput(template);
  OdfOPasswordInput(template);
  OdfOPercentInput(template);
  OdfORealInput(template);
  OdfOTextInput(template);
  OdfOTextareaInput(template);
}
