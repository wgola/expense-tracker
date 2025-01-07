export interface IReceipt {
  owner: string;
  name: string;
  imageName: string;
  totalCost: number;
  category: string;
  date: Date;
}

export interface IEditReceipt {
  name: string;
  totalCost: number;
  category: string;
  date: Date;
}
