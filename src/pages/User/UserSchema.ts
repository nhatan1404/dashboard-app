import { z } from 'zod';
import { Role, Status } from '../../constants/enum';

export const CreateUserSchema = z.object({
  firstname: z.string().nonempty({
    message: 'Tên không được bỏ trống',
  }),
  lastname: z.string().nonempty({
    message: 'Họ không được bỏ trống',
  }),
  password: z.string().nonempty({
    message: 'Mật khẩu không được bỏ trống',
  }),
  avatar: z.string().optional(),
  address: z.string().nonempty({
    message: 'Địa chỉ không được bỏ trống',
  }),
  email: z
    .string()
    .nonempty({
      message: 'Email không được bỏ trống',
    })
    .email({
      message: 'Email không hợp lệ',
    }),
  phone: z.string().nonempty({
    message: 'Số điện thoại không được bỏ trống',
  }),
  role: z.nativeEnum(Role),
  status: z.nativeEnum(Status),
});

export const EditUserSchema = z.object({
  firstname: z.string().nonempty({
    message: 'Tên không được bỏ trống',
  }),
  lastname: z.string().nonempty({
    message: 'Họ không được bỏ trống',
  }),
  password: z.string().optional(),
  avatar: z.string().optional(),
  address: z.string().nonempty({
    message: 'Địa chỉ không được bỏ trống',
  }),
  email: z
    .string()
    .nonempty({
      message: 'Email không được bỏ trống',
    })
    .email({
      message: 'Email không hợp lệ',
    }),
  phone: z.string().nonempty({
    message: 'Số điện thoại không được bỏ trống',
  }),
  role: z.nativeEnum(Role),
  status: z.nativeEnum(Status),
});
