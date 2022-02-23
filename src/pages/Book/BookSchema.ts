import { z } from 'zod';
import { Status } from '../../constants/enum';

export const CreateBookSchema = z.object({
  title: z.string().nonempty({
    message: 'Tiêu đề không được bỏ trống',
  }),
  description: z.string().nonempty({
    message: 'Mô tả không được bỏ trống',
  }),
    
  quantity: z.number(),
  price: z.number(),
  status: z.nativeEnum(Status),
  discount: z.number(),
  page_number: z.number().or(
    z.string().nonempty({
      message: 'Số trang không được bỏ trống',
    }),
  ),
  category_id: z.number().or(
    z.string().nonempty({
      message: 'Chưa chọn danh mục',
    }),
  ),
  author_id: z.number().or(
    z.string().nonempty({
      message: 'Chưa chọn tác giả',
    }),
  ),
  publisher_id: z.number().or(
    z.string().nonempty({
      message: 'Chưa chọn nhà xuất bản',
    }),
  ),
  language_id: z.number().or(
    z.string().nonempty({
      message: 'Chưa chọn ngôn ngữ',
    }),
  ),
});
export const EditBookSchema = z.object({
  title: z.string().nonempty({
    message: 'Tiêu đề không được bỏ trống',
  }),
  description: z.string().nonempty({
    message: 'Mô tả không được bỏ trống',
  }),
  images: z.string().nonempty({
    message: 'Chưa chọn ảnh',
  }),
  quantity: z.number(),
  price: z.number(),
  status: z.nativeEnum(Status),
  discount: z.number(),
  page_number: z.number().or(
    z.string().nonempty({
      message: 'Số trang không được bỏ trống',
    }),
  ),
  category_id: z.number().or(
    z.string().nonempty({
      message: 'Chưa chọn danh mục',
    }),
  ),
  author_id: z.number().or(
    z.string().nonempty({
      message: 'Chưa chọn tác giả',
    }),
  ),
  publisher_id: z.number().or(
    z.string().nonempty({
      message: 'Chưa chọn nhà xuất bản',
    }),
  ),
  language_id: z.number().or(
    z.string().nonempty({
      message: 'Chưa chọn ngôn ngữ',
    }),
  ),
});
