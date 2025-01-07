import { IEditReceipt, IReceipt } from './receipt.interface';

export interface FormState {
  errors?: Record<string, string>;
  otherError?: string;
  data?: IReceipt;
}

export interface EditFormState {
  errors?: Record<string, string>;
  otherError?: string;
  data?: IEditReceipt;
}
