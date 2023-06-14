interface IProductBody {
  productId: number;
  qty: number;
}
export interface ITransactionBody {
  customerName: string | null;
  pay: number[];
  data: IProductBody[];
}
