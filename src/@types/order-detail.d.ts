interface IOrderDetail {
  id: number;
  quantity: number;
  total_price: number;
  book: IBook;
  order: IOrder;
  created_at: string;
  updated_at: string;
}
