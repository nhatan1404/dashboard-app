import { z } from 'zod';

export const CreateAuthorSchema = z.object({
  firstname: z.string().nonempty({
    message: 'Họ không được bỏ trống',
  }),
  lastname: z.string().nonempty({
    message: 'Tên không không được bỏ trống',
  }),
  biography: z.string().nonempty({
    message: 'Tiểu sử không không được bỏ trống',
  }),
});

export const EditAuthorSchema = z.object({
  firstname: z.string().nonempty({
    message: 'Họ không được bỏ trống',
  }),
  lastname: z.string().nonempty({
    message: 'Tên không không được bỏ trống',
  }),
  biography: z.string().nonempty({
    message: 'Tiểu sử không không được bỏ trống',
  }),
});
