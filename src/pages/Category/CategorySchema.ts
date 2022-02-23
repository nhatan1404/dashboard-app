import { z } from 'zod';

export const CreateCategorySchema = z.object({
  title: z.string().nonempty({
    message: 'Tiêu đề không được bỏ trống',
  }),
  note: z.string().nullable().optional(),
  parent_id: z.string().nullable().optional(),
});

export const UpdateCategorySchema = z.object({
  title: z.string().nonempty({
    message: 'Tiêu đề không được bỏ trống',
  }),
  note: z.string().nullable().optional(),
  parent_id: z.string().nullable().optional(),
});
