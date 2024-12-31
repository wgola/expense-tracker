import { IReceipt } from './receipt.interface';

export interface FormState {
  errors?: Record<string, string>;
  pictureError?: string;
  data?: IReceipt;
}
