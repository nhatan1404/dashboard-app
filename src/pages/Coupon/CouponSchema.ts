import { z } from 'zod';
import { TypeCoupon, Status } from '../../constants/enum';

export const CreateCouponSchema = z.object({
  code: z.string().nonempty({
    message: 'Code không được bỏ trống',
  }),
  type: z.nativeEnum(TypeCoupon),
  value: z.number(),
  status: z.nativeEnum(Status),
});

export const EditCouponSchema = z.object({
  code: z.string().nonempty({
    message: 'Code không được bỏ trống',
  }),
  type: z.nativeEnum(TypeCoupon),
  value: z.number(),
  status: z.nativeEnum(Status),
});
