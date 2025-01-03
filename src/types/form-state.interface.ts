import { FormReceipt } from './form-data.interface';

export interface FormState {
  errors?: Record<string, string>;
  pictureError?: string;
  data?: FormReceipt;
}
