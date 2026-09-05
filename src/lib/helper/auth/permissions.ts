// lib/permissions.ts
export const ACTIONS = [
  'create',
  'read',
  'update',
  'delete',
  'manage',
] as const;
export type Action = (typeof ACTIONS)[number];

export const SUBJECTS = [
  'User',
  'Auth',
  'Role',
  'AcademicSemester',
  'AcademicDepartment',
  'AcademicFaculty',
  'AcademicCourse',
  'AcademicDiscipline',
  'OfferedCourse',
  'OfferedCourseClassScheudule',
  'OfferedCourseSection',
  'AdmitionExame',
  'ExamStatement',
  'Notification',
  'BankAccounte',
  'Question',
  'Student',
  'Faculty',
  'building',
  'Room',
  'Payment',
  'Secretary',
  'SemesterRegistration',
  'StudentSemesterPayment',
  'StudentSemesterRegistrationCourse',
  'StudentEnrolledCourseMark',
  'CoursePricing',
  'Session',
  'UniversityConfig',
  'Retake',
  'AuditLog',
  'Finance',
] as const;
export type Subject = (typeof SUBJECTS)[number];

export type PermissionKey = `${Action}:${Subject}` | 'manage:all';

export function hasPermission(
  userPermissions: string[],
  action: Action,
  subject: Subject,
): boolean {
  return (
    userPermissions.includes('manage:all') ||
    userPermissions.includes(`manage:${subject}`) ||
    userPermissions.includes(`${action}:${subject}`)
  );
}
