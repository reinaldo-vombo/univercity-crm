import { z } from 'zod';

export const facultySchema = z.object({
  firstName: z.string({
    required_error: 'Primero nome é obrigatorio',
  }),
  lastName: z.string({
    required_error: 'Último nome é obrigatorio',
  }),
  middleName: z.string().optional(),
  profileImage: z.union([z.string(), z.instanceof(File)]).optional(),
  email: z.string({
    required_error: 'Email é obrigatorio',
  }),
  contactNo: z.string().optional(),
  gender: z.string({
    required_error: 'Genero é obrigatorio',
  }),
  academicDepartmentId: z
    .string()
    .min(1, { message: 'Departamento é obrigatorio' }),
  coursedIds: z.array(
    z.string().min(1, { message: 'Selecione ao menos um curso' })
  ),
});

export const updateFacultySchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  profileImage: z.string().optional().nullable(),
  email: z.string(),
  contactNo: z.string(),
  gender: z.string(),
  coursedIds: z.array(
    z.string().min(1, { message: 'Selecione ao menos um curso' })
  ),
  academicDepartmentId: z.string(),
});

export const facultyDisciplineAssignmentSchema = z.object({
  facultyId: z.string().uuid(),
  disciplineId: z.string({
    required_error: 'Disciplina é obrigarorio',
  }),
  shiftId: z.coerce.number({
    required_error: 'Turno é obrigatorios',
  }),
});
export const assignFacultyToSectionDisciplinesSchema = z.object({
  offeredCourseSectionId: z.string().min(1, { message: 'Turma é obrigatorio' }),
  assignments: z.array(
    z.object({
      disciplineId: z.string().min(1, { message: 'Disciplina é obrigatorio' }),
      facultyId: z.string().min(1, { message: 'Professor é obrigatorio' }),
    })
  ),
});
