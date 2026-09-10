import { z } from 'zod';

export const updateExamStatementSchema = z
  .object({
    context: z.enum(['ADMISSION', 'COURSE']).optional(),
    type: z.enum(['NORMAL', 'RETAKE', 'SPECIAL']).optional(),
    disciplineId: z.string().uuid().optional(),
    offeredCourseSectionId: z.string().uuid().optional(),
    courseId: z.string().uuid().optional(),
    academicSemesterId: z.string().uuid().optional(),
    facultyId: z.string().uuid().optional(),
    retakeId: z.string().uuid().optional(),
    specialExamId: z.string().uuid().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.context === 'COURSE' && data.disciplineId === undefined) {
    }

    if (data.type === 'RETAKE' && data.retakeId === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['retakeId'],
        message: 'Exames de recurso exigem retakeId.',
      });
    }
  });

export const assertionSchema = z.object({
  label: z.string().min(1, 'Obrigatório').max(1, 'Apenas 1 caracter'),
  text: z.string().min(1, 'O texto da alternativa é obrigatório'),
  correctValue: z.boolean(),
  order: z.number(),
});

export const questionSchema = z.object({
  title: z.string().min(1, 'O enunciado é obrigatório'),
  type: z.enum(['BOOLEAN', 'WRITTEN']).default('BOOLEAN'),
  value: z.coerce.number().min(0, 'O valor não pode ser negativo'),
  assertions: z
    .array(assertionSchema)
    .min(2, 'Adicione pelo menos 2 alternativas'),
});

export const examStatementSchema = z
  .object({
    id: z.string().optional(),
    context: z.enum(['ADMISSION', 'COURSE'], {
      required_error: 'Selecione o contexto do exame',
    }),

    type: z
      .enum(['FREQUENCI', 'RETAKE', 'SPECIAL'], {
        required_error: 'Selecione o tipo de exame',
      })
      .optional(),
    variant: z.enum(['A', 'B', 'C', 'D']).optional(),

    disciplineId: z.string().optional(),
    offeredCourseSectionId: z.string().optional(),
    courseId: z.string().optional(),
    academicDepartmentId: z.string().optional(),
    discipline: z.string().optional(),
    course: z.string().optional(),
    section: z.string().optional(),
    department: z.string().optional(),
    academicSemesterId: z.string().optional(),
    facultyId: z.string().optional(),
    retakeId: z.string().optional(),
    specialExamId: z.string().optional(),

    questions: z
      .array(questionSchema)
      .min(1, 'O enunciado precisa de pelo menos 1 pergunta'),
  })
  .superRefine((data, ctx) => {
    if (data.context === 'COURSE' && !data.disciplineId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['disciplineId'],
        message: 'Exames de curso exigem uma disciplina.',
      });
    }

    if (data.type === 'RETAKE' && !data.retakeId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['retakeId'],
        message: 'Exames de recurso exigem retakeId.',
      });
    }

    if (data.type === 'SPECIAL' && !data.specialExamId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['specialExamId'],
        message: 'Exames especiais exigem specialExamId.',
      });
    }
  });

export type ExamStatementFormValues = z.infer<typeof examStatementSchema>;

export type UpdateExamStatementFormValues = z.infer<
  typeof updateExamStatementSchema
>;

export const deleteExamStatementSchema = z.object({
  id: z.string().uuid('ID inválido'),
});

export const answerSheetSchema = z
  .object({
    imageFile: z.instanceof(File).optional(),
    examStatementId: z.string().optional(),
    imageFileName: z.string(),
    imageMimeType: z.string(),
    candidateId: z.string().optional(),
    studentId: z.string().optional(),
  })
  .refine((data) => data.imageFile instanceof File, {
    message: 'A imagem é obrigatória',
    path: ['imageFile'],
  });

export type DeleteExamStatementFormValues = z.infer<
  typeof deleteExamStatementSchema
>;
