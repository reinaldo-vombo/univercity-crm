import * as z from 'zod';

export const academicFacultyacultySchema = z.object({
  title: z.string().min(1),
});
export const updateAcademicFacultyacultySchema = z.object({
  id: z.string(),
  title: z.string().min(1),
});
