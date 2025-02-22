export interface FormReceipt {
  owner: string;
  name: string;
  imageName: string;
  image: File;
  totalCost: number;
  category: string;
  date: Date;
}
