import { IEditReceipt } from './receipt.interface';
import { FormReceipt } from './form-data.interface';

export interface FormState {
  errors?: Record<string, string>;
  otherError?: string;
  data?: FormReceipt;
}

export interface EditFormState {
  errors?: Record<string, string>;
  otherError?: string;
  data?: IEditReceipt;
}
