import * as z from 'zod';
export const buildingSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const updateBuildingSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});
