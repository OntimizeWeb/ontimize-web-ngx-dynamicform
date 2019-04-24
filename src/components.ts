import { OdfOCheckbox } from './components/checkbox/o-checkbox';
import { OdfOColumn } from './components/container/o-column';
import { OdfORow } from './components/container/o-row';
import { OdfOTable } from './components/data/o-table';
import { OdfOCurrencyInput } from './components/input/currency-input/o-currency-input';
import { OdfODateInput } from './components/input/date-input/o-date-input';
import { OdfOEmailInput } from './components/input/email-input/o-email-input';
import { OdfOIntegerInput } from './components/input/integer-input/o-integer-input';
import { OdfONifInput } from './components/input/nif-input/o-nif-input';
import { OdfOPasswordInput } from './components/input/password-input/o-password-input';
import { OdfOPercentInput } from './components/input/percent-input/o-percent-input';
import { OdfORealInput } from './components/input/real-input/o-real-input';
import { OdfOTextInput } from './components/input/text-input/o-text-input';
import { OdfOTextareaInput } from './components/input/textarea-input/o-textarea-input';
import { OdfOCombo } from './components/service/o-combo';
import { OdfOListPicker } from './components/service/o-list-picker';
import { DFTemplate } from './o-dynamic-form.template';

export function RegisterComponents(template: DFTemplate): void {
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
  OdfOColumn(template);
  OdfORow(template);
  OdfOCombo(template);
  OdfOListPicker(template);
  OdfOCheckbox(template);
  OdfOTable(template);
}
