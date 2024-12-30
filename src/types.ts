export interface FormState {
  errors?: ErrorsMap;
  pictureError?: string;
  successMsg?: string;
  data?: Receipt;
}

export interface ErrorsMap {
  [key: string]: string;
}

export interface Receipt {
  owner: string;
  imageName: string;
  totalCost: number;
  category: string;
  date: Date;
}
