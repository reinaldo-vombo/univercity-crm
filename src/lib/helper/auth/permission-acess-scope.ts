import { Eye, Pencil, Plus, Trash2, Wrench } from 'lucide-react';
import { Action, Subject } from './permissions';

export const SUBJECT_GROUPS: { label: string; subjects: Subject[] }[] = [
  {
    label: 'Académico',
    subjects: [
      'AcademicSemester',
      'AcademicDepartment',
      'AcademicFaculty',
      'AcademicCourse',
      'AcademicDiscipline',
      'OfferedCourse',
      'OfferedCourseClassScheudule',
      'OfferedCourseSection',
      'CoursePricing',
      'Retake',
    ],
  },
  {
    label: 'Admissões e Avaliações',
    subjects: [
      'AdmitionExame',
      'ExamStatement',
      'Question',
      'StudentEnrolledCourseMark',
    ],
  },
  {
    label: 'Pessoas',
    subjects: ['User', 'Student', 'Faculty', 'Secretary', 'Role', 'Auth'],
  },
  {
    label: 'Matrículas',
    subjects: [
      'SemesterRegistration',
      'StudentSemesterPayment',
      'StudentSemesterRegistrationCourse',
    ],
  },
  {
    label: 'Financeiro',
    subjects: ['Payment', 'BankAccounte', 'Finance'],
  },
  {
    label: 'Infraestrutura',
    subjects: ['building', 'Room'],
  },
  {
    label: 'Sistema',
    subjects: ['Notification', 'Session', 'UniversityConfig', 'AuditLog'],
  },
];

export const ACTION_META: Record<
  Action,
  { label: string; icon: React.ElementType; className: string }
> = {
  create: {
    label: 'Criar',
    icon: Plus,
    className:
      'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  read: {
    label: 'Ver',
    icon: Eye,
    className: 'border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400',
  },
  update: {
    label: 'Editar',
    icon: Pencil,
    className:
      'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  delete: {
    label: 'Eliminar',
    icon: Trash2,
    className: 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400',
  },
  manage: {
    label: 'Gerir tudo',
    icon: Wrench,
    className: 'border-primary/30 bg-primary/10 text-primary',
  },
};
