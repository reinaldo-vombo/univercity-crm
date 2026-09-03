export type TYearLevel = 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH' | 'FIFTH';
export type TDaysOfWeek =
  | 'SEGUNDA'
  | 'TERCA'
  | 'QUARTA'
  | 'QUITA'
  | 'SEXTA'
  | 'SABADO'
  | 'DOMINGO';
export type TSemesterRegistrationStatus = 'UPCOMING' | 'ONGOING' | 'ENDED';
export type TPaymentStatus = 'PAID' | 'PENDING' | 'OVERDUE';
export type TStatus = 'APROVE' | 'PENDING' | 'DENIDE';
export type TPaymentMethod = 'INVOICE' | 'EXPRESS';
export type TRegistrationStatus = 'CONFIRMED' | 'WAITING_LIST' | 'CANCELLED';
export type TStudentType = 'NORMAL' | 'CADEIRANTE' | 'BOLSEIRO';
export type TMarkStatus =
  | 'DISPENSADO'
  | 'ADMITIDO'
  | 'APROVADO'
  | 'RECURSO'
  | 'ESPECIAL'
  | 'REPROVADO'
  | 'PENDENTE';
export type DayOfWeek =
  | 'SEGUNDA'
  | 'TERCA'
  | 'QUARTA'
  | 'QUINTA'
  | 'SEXTA'
  | 'SABADO'
  | 'DOMINGO';
export type TDocumentType =
  | 'BI'
  | 'GRADE_DECLARATION'
  | 'CERTIFICATE'
  | 'PAYMENT_RECEIPT'
  | 'OTHER';
export type TCourseTransfer =
  | 'END_OF_SEMESTER'
  | 'ENROLLMENT_PERIOD'
  | 'ANYTIME';
export type TTransferGradePolicy =
  | 'LOSE_ALL'
  | 'KEEP_EQUIVALENTS'
  | 'ADMIN_DECIDES';
export type TRoles =
  | 'super_admin'
  | 'admin'
  | 'student'
  | 'editor'
  | 'manager'
  | 'faculty'
  | 'accountant'
  | 'department_head'
  | 'staff';
export type TAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'PROMOTE'
  | 'LOGIN'
  | 'LOGOUT'
  | 'APPROVE'
  | 'REJECT';
export type TServicePeriodType = 'RESIT' | ' SPECIAL_EXAM' | 'ADMISSION_EXAM';
export type TNotificationType =
  | 'ACADEMIC'
  | 'PAYMENT'
  | 'TRANSFER'
  | 'DOCUMENT'
  | 'SEMESTER'
  | 'CONTENT'
  | 'LOG_IN'
  | 'SYSTEM';
export type TMessageDirection = 'OUTBOUND' | 'INBOUND';
export type TMessageChannel = 'WHATSAPP' | 'SMS' | 'EMAIL';
export type TRecipientType = 'STUDENT' | 'FACULTY' | 'CANDIDATE';
export type TMessageStatus =
  | 'PENDING'
  | 'SENT'
  | 'DELIVERED'
  | 'READ'
  | 'FAILED';
export type ExamType = 'FREQUENCI' | 'RETAKE' | 'SPECIAL';
export type ExamContext = 'COURSE' | 'DISCIPLINE';
export type TQuestionType = 'BOOLEAN' | 'WRITTEN';
