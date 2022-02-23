enum TypeCoupon {
  FIXED = 'FIXED',
  PERCENT = 'PERCENT',
}

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

interface ICoupon {
  id: number;
  code: string;
  type: TypeCoupon;
  value: number;
  status: Status;
  created_at?: string;
  updated_at?: string;
}

interface ICouponPayload {
  code: string;
  type: TypeCoupon;
  value: number;
  status: Status;
}
