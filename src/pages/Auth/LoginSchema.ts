import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'Email không được bỏ trống',
    })
    .email({
      message: 'Email không hợp lệ',
    }),
  password: z.string().nonempty({
    message: 'Mật khẩu không được bỏ trống',
  }),
});
