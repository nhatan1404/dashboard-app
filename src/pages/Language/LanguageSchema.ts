import { z } from 'zod';

export const CreateLanguageSchema = z.object({
  name: z.string().nonempty({
    message: 'Tên ngôn ngữ không được bỏ trống',
  }),
});

export const EditLanguageSchema = z.object({
  name: z.string().nonempty({
    message: 'Tên ngôn ngữ không được bỏ trống',
  }),
});
