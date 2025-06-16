import * as z from 'zod';

export const academicFacultyacultySchema = z.object({
  title: z.string().min(1),
});
