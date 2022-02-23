interface IOrder {
  id: number;
  firstname: string;
  lastname: string;
  address: string;
  phone: sting;
  email: string;
  note?: string;
  discount_price: number;
  total: number;
  user: IUser;
  coupon?: ICoupon;
}

interface IOrderPayload {
  firstname: string;
  lastname: string;
  address: string;
  phone: sting;
  email: string;
  note?: string;
  discount_price?: number;
  total: number;
  user: IUser;
  coupon?: ICoupon;
}
