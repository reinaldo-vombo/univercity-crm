import { z } from 'zod';

export const createBankAccountZodSchema = z.object({
  bankName: z.string().min(1, 'Nome do Banco é Obrigatório'),
  accountName: z.string().min(1, 'Nome da Conta é Obrigatório'),
  accountNumber: z.string().min(1, 'Número da Conta é Obrigatório'),
  iban: z.string().min(1, 'Ibn da Conta é Obrigatório'),
  isActive: z.boolean(),
  swift: z.coerce.number().optional(),
  entityCode: z.string().optional(),
});

export const updateBankAccountZodSchema = z.object({
  id: z.string(),
  bankName: z.string().optional(),
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  iban: z.string().optional(),
  isActive: z.boolean(),
  swift: z.coerce.number().optional(),
  entityCode: z.string().optional(),
});

export const UniversitySettings = z.object({
  id: z.string(),
  maxFailedSubjectsToProgress: z.coerce.number(),
  maxSubjectsInResit: z.coerce.number(),
  maxSubjectsInSpecialExam: z.coerce.number(),
  maxExamAttemptsTotal: z.coerce.number(),
  minimumPassingGrade: z.coerce.number(),
  monthlyPaymentDueDay: z.coerce.number(),
  maxSubjectsPerSemester: z.coerce.number(),
  allowRetryOnlyIfFailed: z.coerce.boolean(),
  blockEnrollmentIfDebt: z.coerce.boolean(),
  allowSpecialExamOnlyForFinalYear: z.coerce.boolean(),
  blockIfPendingResult: z.coerce.boolean(),
  gradeSubmissionUpdate: z.coerce.boolean(),
});
