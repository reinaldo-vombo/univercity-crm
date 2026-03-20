// lib/validations/university-config.ts
import { z } from 'zod';

export const universityConfigSchema = z.object({
  // ── Académico ────────────────────────────────────────────────
  maxFailedSubjectsToProgress: z.coerce.number().int().min(1).max(20),
  maxSubjectsInResit: z.coerce.number().int().min(1).max(20),
  maxSubjectsInSpecialExam: z.coerce.number().int().min(1).max(20),
  maxExamAttemptsTotal: z.coerce.number().int().min(1).max(10),
  maxExamAttemptsPerYear: z.coerce.number().int().min(1).max(10),
  maxSubjectsPerSemester: z.coerce.number().int().min(1).max(20),
  minimumPassingGrade: z.coerce.number().min(0).max(20),
  allowOptionalCourses: z.boolean(),
  allowRetryOnlyIfFailed: z.boolean(),
  allowSpecialExamOnlyForFinalYear: z.boolean(),
  blockIfPendingResult: z.boolean(),
  gradeSubmissionUpdate: z.boolean(),
  resitRegistrationStart: z.date().nullable().optional(),
  resitRegistrationEnd: z.date().optional(),

  // ── Pagamentos ───────────────────────────────────────────────
  monthlyPaymentDueDay: z.coerce.number().int().min(1).max(31),
  blockEnrollmentOnDebt: z.boolean(),
  blockEnrollmentIfDebt: z.boolean(),

  // ── Matrícula ────────────────────────────────────────────────
  autoCreateSemesterRegistration: z.boolean(),
  autoAssignDisciplines: z.boolean(),
  autoConfirmStudents: z.boolean(),

  // ── Transferências ───────────────────────────────────────────
  allowCourseTransfer: z.boolean(),
  allowShiftTransfer: z.boolean(),
  courseTransferRequiresApproval: z.boolean(),
  courseTransferHasCost: z.boolean(),
  courseTransferFee: z.coerce.number().min(0),
  courseTransferPeriod: z.enum([
    'END_OF_SEMESTER',
    'ANYTIME',
    'ENROLLMENT_PERIOD',
  ]),
  courseTransferKeepGrades: z.enum([
    'LOSE_ALL',
    'KEEP_EQUIVALENTS',
    'ADMIN_DECIDES',
  ]),
});
