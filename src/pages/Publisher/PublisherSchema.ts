import { z } from 'zod';

export const CreatePublisherSchema = z.object({
  name: z.string().nonempty({
    message: 'Tên ngôn ngữ không được bỏ trống',
  }),
  description: z.string().optional(),
});

export const EditPublisherSchema = z.object({
  name: z.string().nonempty({
    message: 'Tên ngôn ngữ không được bỏ trống',
  }),
  description: z.string().optional(),
});
