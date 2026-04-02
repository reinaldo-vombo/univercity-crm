// lib/types/action-result.ts

import {
  TCourseTransfer,
  TDocumentType,
  TMarkStatus,
  TPaymentMethod,
  TPaymentStatus,
  TRegistrationStatus,
  TSemesterRegistrationStatus,
  TStatus,
  TStudentType,
  TTransferGradePolicy,
  TYearLevel,
} from './enum';

export type TUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string | undefined;
  role: string;
  contact: {
    phone: number;
    location: string;
  };
  number: number;
};
export type IQueryParams = {
  page?: number;
  limit?: number;
  search?: string | string[];
  sortBy?: string;
  order?: 'asc' | 'desc';
};
export type TStudentDocFilter = {
  format: string;
  limit: string;
  gender: string;
  studentType: string;
  isActive: string;
  shiftId: string;
  academicFacultyId: string;
  academicDepartmentId: string;
  yearLevel: string;
};
export type TSeachParams = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};
export type TEvents = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  color: string;
  location: Date;
  mandatory: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TAcademicFaculty = {
  id: string;
  title: string;
  createdAt: string;
  departments: string;
  facultys: string;
  students: number;
};

export type TRoom = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  roomNumber: string;
  floor: string;
  buildingId: string;
  building: {
    title: string;
  };
};
type TMeta = {
  total: number;
  totalResult: number;
  totalPages: number;
  currentPage: number;
  limit: number | undefined;
};
export type TCourse = {
  id: string;
  title: string;
  meta?: TMeta;
  durationInYears: number;
  academicDepartment: {
    id: string;
    title: string;
  };
  priceId: string;
  faculties: {
    faculty: {
      id: string;
      firstName: string;
      lastName: string;
      profileImage: string | null;
    };
  }[];
  courseDisciplines: {
    discipline: {
      id: string;
      name: string;
    };
    id: string;
    courseId: string;
    yearLevel: TYearLevel;
    disciplineId: string;
    semesterId: string;
  }[];
  CourseShift: {
    shift: {
      id: number;
      name: string;
    };
  }[];

  academicDepartmentId: string;
  price: {
    amount: number;
    currency: string;
  } | null;
};

export type TPrice = {
  id: string;
  amount: number;
  currency: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};
export type TCoursePrice = {
  id: string;
  price: number;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
};
export type TDiscipline = {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  suspendGrade: number;
  faculty: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: null;
    section: string;
  } | null;
  courses: [
    {
      id: string;
      courseTitle: string;
      department: string;
      courseId: string;
      yearLevel: TYearLevel;
      semesterNumber: number;
      semesterId: string;
      year: string;
    },
  ];
};

export type TOfferedCourse = {
  id: string;
  academicDepartment: {
    id: string;
    title: string;
  };
  course: {
    id: string;
    title: string;
  };
  OfferedCourseDiscipline: [
    {
      id: string;
      discipline: { id: string; name: string };
      disciplineId: string;
      offeredCourseId: string;
    },
  ];
  semesterRegistration: {
    academicSemester: {
      id: string;
      title: string;
      year: string;
    };
    status: TSemesterRegistrationStatus;
    id: string;
    createdAt: Date;
    academicSemesterId: string;
    updateAt: Date;
    startDate: Date;
    endDate: Date;
  };
  semesterRegistrationId: string;
  academicDepartmentId: string;
  offeredCourseSections: TOfferedCourseSection[];
};
export type TOfferedCourseSection = {
  id: string;
  semesterRegistrationId: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  shiftId: number;
  offeredCourseId: string;
  maxCapacity: number;
  currentlyEnrolledStudent: number;
  offeredCourse: {
    OfferedCourseDiscipline: {
      discipline: {
        id: string;
        name: string;
      };
    }[];
    semesterRegistration: {
      academicSemester: {
        title: string;
      };
    };
  };
};

type TWeek = {
  id: string;
  startTime: string;
  endTime: string;
  room: string;
  disciplineId: string;
  discipline: {
    id: string;
    name: string;
  };
  faculty: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: null;
  };
};

export type TClassShedule = {
  id: string;
  offeredCourseSectionId: string;
  department: string;
  course: string;
  title: string;
  shift: {
    name: string;
    id: number;
  };
  yearLevel: TYearLevel;
  semester: {
    id: string;
    isCurrent: boolean;
    title: string;
  };
  scheduleGrid: {
    SEGUNDA: [TWeek];
    TERCA: [TWeek];
    QUARTA: [TWeek];
    QUINTA: [TWeek];
    SEXTA: [TWeek];
    SABADO: [TWeek];
    DOMINGO: [TWeek];
  };
};
export type TExamePayment = {
  id: string;
  canditateId: string;
  totalAmount: number;
  extraAmount: number;
  currency: string;
  status: TStatus;
  method: TPaymentMethod;
  transactionRef: string | null;
  payerName: string | null;
  payerIban: string | null;
  payerBank: string | null;
  universityBankAccountId: null;
  createdAt: Date;
  updatedAt: Date;
  paidAt: Date | null;
  ReceiptUrl: string | null;
  universityBankAccount: TUniversityBankAccount | null;
  paymentItems: [
    {
      id: string;
      amount: number;
      description: string;
      entityType: string;
    },
  ];
};
export type TAdmitionExame = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  exameId: string;
  status: TRegistrationStatus;
  paymentRecipt: string;
  exameDate: Date;
  document: string;
  building: string | null;
  room: string | null;
  phoneNumber: string;
  academicFalcultyId: string;
  email: string;
  paymentAmoute: number;
  exameResults: number;
  passed: boolean;
  fase: {
    name: string;
  };
  ExamePayment: TExamePayment[];
};
export type TUniversityBankAccount = {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  bankName: string;
  accountName: string;
  accountNumber: string;
  iban: string;
  swift: number | null;
  entityCode: number | null;
};
export type TTrasition = {
  id: string;
  createdAt: Date;
  student: {
    id: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    profileImage: string | null;
  };
  currency: string;
  totalAmount: number;
  extraAmount: number;
  method: TPaymentMethod;
  payerName: string | null;
  payerIban: string | null;
  payerBank: string | null;
  paidAt: Date | null;
  ReceiptUrl: string | null;
};
export type TBankAccountAnalitycs = {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  iban: string;
  isActive: boolean;
  totalReceived: number;
  totalTransactions: number;
  transactions: TTrasition[] | null;
};
export type TAdmitionExameFase = {
  name: string;
  id: number;
  buildingId: number | undefined;
  startDate: Date;
  endDate: Date;
  ordem: number;
  duoDate: Date | undefined;
  roomId: number | undefined;
  building: {
    title: string;
  };
  room: {
    roomNumber: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
export type TCalendar = {
  end: Date;
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  type: 'EVENTO' | 'SERVICO_ACADEMICO';
  location: string | null;
  start: Date;
};

export type TDepartemant = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  academicFacultyId: string;
  departmentHeadId: string | null;
  academicFaculty: {
    title: string;
  };
  _count: {
    faculties: number;
    courses: number;
    students: number;
  };
  departmentHead: {
    name: string;
    id: string;
    avatar: string | null;
  } | null;
};
export type TBuilding = {
  id: string;
  title: string;
  rooms: {
    id: string;
    roomNumber: string;
    floor: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type TSemester = {
  id: string;
  title: '1 semestre' | '2 semestre';
  createdAt: Date;
  updatedAt: Date;
  code: '01' | '02' | '03';
  year: string;
  startMonth: string;
  endMonth: string;
  isCurrent: boolean;
};
export type TSemesterRegistration = {
  id: string;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  startDate: Date;
  endDate: Date;
  academicSemesterId: string;
  createdAt: Date;
  updateAt: Date;
};

export type TStudent = {
  id: string;
  firstName: string;
  studentId: string;
  studentType: TStudentType;
  middleName: string;
  lastName: string;
  profileImage: string | null;
  email: string;
  contactNo: string;
  gender: string;
  isWorker: boolean;
  yearLevel: TYearLevel;
  status: string;
  isActive: boolean;
  address: string;
  createdAt: Date;
};
export type TStudentCourse = {
  student: {
    name: string;
    yearLevel: string;
    status: string;
    section: string;
    shift: string;
    faculty: string;
    department: string;
  };
  semester: {
    title: string;
    year: number;
  };
  summary: {
    totalCourses: number;
    approved: number;
    failed: number;
    pending: number;
    inResit: number;
    exempt: number;
    semesterAverage: number;
  };
  courses: {
    status: string;
    course: {
      title: string;
    };
    section: {
      title: string;
      shift: string;
      capacity: number;
      enrolled: number;
      price: {
        amount: number;
      };
    };
    disciplines: {
      name: string;
      suspendGrade: number;
    }[];
    marks: {
      acAverage: number;
      firstTest: number;
      secondTest: number;
      totalMarks: number;
    };
    markStatus: string;
  }[];
};
type TDay = {
  disciplines: string[];
  class: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    room: number;
    floor: number;
    building: string;
    faculty: string;
  };
};

export type TStudentSchedule = {
  semester: {
    title: string;
    year: number;
  };
  course: {
    title: string;
  };
  section: string;
  shift: string;
  schedule: {
    id: string;
    disciplines: string[];
    class: {
      dayOfWeek: string;
      startTime: string;
      endTime: string;
      room: number;
      floor: number;
      building: string;
      faculty: string;
    };
  }[];
  byDay: {
    MONDAY: TDay[];
    WEDNESDAY: TDay[];
    FRIDAY: TDay[];
  };
};

export type TFaculty = {
  academicDepartment: {
    id: string;
    title: string;
  };
  courses: {
    course: {
      id: string;
      title: string;
    };
    facultyId: string;
    courseId: string;
  }[];
  shift: {
    name: string;
  };
} & {
  id: string;
  facultyId: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  profileImage: string | null;
  email: string | null;
  contactNo: string | null;
  gender: string;
  designation: string;
  password: string;
  academicFacultyId: string;
  academicDepartmentId: string;
  createdAt: Date;
  updatedAt: Date;
  shiftId: number;
};
export type TFacultyDisciplines = {
  id: string;
  faculty: {
    id: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    profileImage: string | null;
  };
  discipline: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    suspendGrade: number;
  };
  facultyId: string;
  createdAt: Date;
  disciplineId: string;
  offeredCourseSectionId: string;
};
export type TAuthLogos = {
  id: string;
  userId: string;
  ip: string;
  browser: {
    name: string;
    version: string;
    major: string;
    type: string | undefined;
  };
  os: { name: string; version: string };
  deviceType: {
    type: string | undefined;
    model: string | undefined;
    vendor: string | undefined;
  };
  timestamp: Date;
  isActive: boolean;
};
export type TNotification = {
  notifications: {
    id: string;
    type: string;
    title: string;
    message: string;
    userId: string;
    metadata: {
      message: string;
      authorId: string;
      description: string;
      url: string;
    };
    read: boolean;
    recipientType: 'USER';
    facultyId: null;
    studentId: null;
    createdAt: Date;
  }[];
  unreadCount: number;
};
export type TNotify = {
  id: string;
  type: string;
  title: string;
  message: string;
  userId: string;
  metadata: {
    message: string;
    authorId: string;
    description: string;
    url: string;
  };
  read: boolean;
  recipientType: 'USER';
  facultyId: null;
  studentId: null;
  createdAt: Date;
};

export type TNotificationPreference = {
  id: string;
  userId: string;
  enabled: boolean;
  settings: {
    user_action: boolean;
    users_logs: boolean;
    student_action: boolean;
    department_action: boolean;
    payment_action: boolean;
    course_action: boolean;
    events_action: boolean;
    calendar_action: boolean;
    exames_action: boolean;
  };
  updatedAt: Date;
};
export type TActionHistory = {
  id: string;
  createdAt: Date;
  userId: string | null;
  action: string;
  entityType: string;
  entityId: string;
  newData: any;
  oldData?: any;
  user: TUser;
};
type TPaymentItems = {
  id: string;
  amount: number;
  description: string;
  entityType: string;
};

export type TPayment = {
  id: string;
  canditateId?: string;
  studentId?: string;
  totalAmount: number | null;
  extraAmount: number | null;
  currency: string;
  status: TStatus;
  method: TPaymentMethod;
  transactionRef: string;
  payerName: string | null;
  payerIban: string | null;
  payerBank: string | null;
  universityBankAccountId: string;
  createdAt: Date;
  updatedAt: Date;
  paidAt: Date | null;
  ReceiptUrl: string | null;
  student: {
    id: string;
    studentType: TStudentType;
    firstName: string;
    middleName: string | null;
    profileImage: string | null;
    isActive: boolean;
  };
  paymentItems: TPaymentItems[];
  universityBankAccount: TUniversityBankAccount;
};
export type TUniversityConfig = {
  // id: number;
  maxFailedSubjectsToProgress: number;
  maxSubjectsInResit: number;
  maxSubjectsInSpecialExam: number;
  maxExamAttemptsTotal: number;
  maxExamAttemptsPerYear: number;
  allowRetryOnlyIfFailed: boolean;
  allowOptionalCourses: boolean;
  blockEnrollmentOnDebt: boolean;
  autoCreateSemesterRegistration: boolean;
  autoAssignDisciplines: boolean;
  autoConfirmStudents: boolean;
  allowCourseTransfer: boolean;
  allowShiftTransfer: boolean;
  courseTransferRequiresApproval: boolean;
  courseTransferHasCost: boolean;
  courseTransferFee: number;
  courseTransferPeriod: TCourseTransfer;
  courseTransferKeepGrades: TTransferGradePolicy;
  minimumPassingGrade: number;
  resitRegistrationEnd: any;
  resitRegistrationStart: any;
  monthlyPaymentDueDay: number;
  blockEnrollmentIfDebt: boolean;
  maxSubjectsPerSemester: number;
  allowSpecialExamOnlyForFinalYear: boolean;
  blockIfPendingResult: boolean;
  gradeSubmissionUpdate: boolean;
  // createdAt?: Date;
  // updatedAt?: Date;
};
export type TAcademicService = {
  id: string;
  title: string;
  priceId: string;
  type: string;
  price: {
    amount: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type TStudentCause = {
  academicSemester: {
    title: string;
    year: string;
    isCurrent: boolean;
  };
} & {
  id: string;
  studentId: string;
  academicSemesterId: string;
  createdAt: Date;
  updatedAt: Date;
  status: string | null;
  courseId: string;
  grade: string | null;
  point: number | null;
  totalMarks: number | null;
  situation: string | null;
};
export type TGlobalAnalitics = {
  year: number;
  summary: {
    totalGenerated: number;
    totalCollected: number;
    totalPending: number;
    totalOverdue: number;
    totalLateFee: number;
    totalTuition: number;
    totalOptional: number;
    totalRetake: number;
    totalStudents: number;
    studentsInDebt: number;
    collectionRate: number;
  };
  monthlyBreakdown: {
    month: number;
    monthName: string;
    totalGenerated: number;
    totalCollected: number;
    totalPending: number;
    totalLateFee: number;
    totalTuition: number;
    totalOptional: number;
    totalRetake: number;
    studentsCount: number;
    studentsInDebt: number;
  }[];
  revenueBySource: {
    source: string;
    total: number;
    percentage: number;
  }[];
  semesterBreakdown: {
    semesterTitle: string;
    totalGenerated: number;
    totalCollected: number;
    totalPending: number;
    totalLateFee: number;
    studentsCount: number;
    collectionRate: number;
  }[];
};

export type MonthlyPayment = {
  monthName: string;
  amount: number;
  lateFee: number;
  status: TPaymentStatus;
};

export type StudentBreakdown = {
  student: { name: string; studentId: string };
  totalPaid: number;
  totalPending: number;
  totalLateFee: number;
  monthlyPayments: MonthlyPayment[];
};

export type TuitionSemester = {
  semester: { title: string; year: string };
  summary: {
    totalAmount: number;
    totalBase: number;
    totalLateFee: number;
    totalOptional: number;
    totalPaid: number;
    totalPending: number;
    totalStudents: number;
    averagePerStudent: number;
    uniqueStudentsInDebt: number;
    collectionRate: number;
  };
  byStatus: Record<TPaymentStatus, { count: number; total: number }>;
  monthlyBreakdown: {
    month: number;
    monthName: string;
    year: number;
    totalAmount: number;
    baseAmount: number;
    lateFee: number;
    optionalAmount: number;
    paid: number;
    pending: number;
    count: number;
  }[];
  studentBreakdown: StudentBreakdown[];
};
export type TMarkSheetRow = {
  disciplineName: string;
  suspendGrade: number;
  ac: number[];
  acAverage: number;
  firstTest: number | null;
  secondTest: number | null;
  exam: number | null;
  examAverage: number | null;
  retake: number | null;
  retakeAverage: number | null;
  specialExam: number | null;
  finalRetakeAvg: number | null;
  totalMarks: number | null;
  status: TMarkStatus;
};

export type TMarkSheet = {
  student: {
    id: string;
    name: string;
    profileImage: string;
    studentId: string;
  };
  semester: {
    id: string;
    title: '1º Semestre' | '2º Semestre';
    year: number;
  };
  summary: {
    total: number;
    approved: number;
    failed: number;
    pending: number;
    inResit: number;
    inSpecial: number;
    semesterAverage: number;
  };
  sheet: TMarkSheetRow[];
};

export type TRequest = {
  id: string;
  type: string;
  status: string;
  reason: string;
  adminNote: string | null;
  createdAt: string;
  student: {
    studentId: string;
    name: string;
    profileImage: string | null;
  };
  semester: {
    title: string;
    year: string;
  };
  details: {
    from: string;
    to: string;
  };
};
export type TUactiveStudents = {
  id: string;
  academicSemester: {
    id: string;
    title: string;
  };
  academicDepartment: {
    id: string;
    title: string;
  };
  firstName: string;
  middleName: string | null;
  lastName: string;
  profileImage: string | null;
};
export type TSemesterHistory = {
  id: string;
  studentId: string;
  academicSemesterId: string;
  sectionTitle: string;
  yearLevel: string;
  nextSectionTitle: string;
  promotedToYear: string;
  totalDisciplines: number;
  approvedDisciplines: number;
  failedDisciplines: number;
  exemptDisciplines: number;
  semesterAverage: number;
  cumulativeAverage: number;
  status: string;
  statusReason: null;
  blockedByDebt: boolean;
  createdAt: string;
  academicSemester: {
    id: string;
    title: string;
    year: number;
    isCurrent: boolean;
  };
  disciplineRecords: TDisciplineRecords[];
};

type TDisciplineRecords = {
  id: string;
  disciplineName: string;
  suspendGrade: number;
  ac: number[];
  acAverage: number;
  firstTest: number;
  secondTest: number;
  exam: number | null;
  examAverage: number | null;
  retake: number | null;
  retakeAverage: number | null;
  specialExam: number | null;
  finalRetakeAvg: number | null;
  totalMarks: number;
  result: string;
};
export type TStudentDocuments = {
  id: string;
  type: TDocumentType;
  status: 'APPROVED' | 'REJECTED';
  studentId: string;
  rejectedReason: string | null;
  fileUrl: string;
  uploadedAt: Date;
  reviewedAt: Date | null;
  reviewedBy: string | null;
};
export type TLockedAccount = {
  name: string;
  id: string;
  email: string;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
  lastLoginAt: Date | null;
  role: string;
};
export type TExames = {
  id: string;
  status: TPaymentStatus;
  student: {
    id: string;
    studentId: string;
    name: string;
    profileImage: string | null;
  };
  discipline: {
    name: string;
    id: string;
  };
  course: {
    id: string;
    title: string;
  };
  semester: {
    id: string;
    title: string;
    year: string;
  };
  section: {
    id: string;
    title: string;
    shift: string;
  };
  location: {
    building: string;
    room: string;
    floor: string;
  };
  date: Date;
  time: string;
  payment: TPaymentStatus;
};
export type TExameStatemant = {
  id: string;
  academicSemester: string;
  course: string;
  discipline: string;
  faculty: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string | null;
  };
  documentUrl: string;
  type: 'RETAKE' | 'ESPECIAL_EXAME';
};
export type TRetakeAta = {
  discipline: {
    name: string;
    id: string;
  };
  semester: {
    id: string;
    title: string;
    year: number;
  };
  retakes: {
    number: number;
    studentId: string;
    name: string;
    section: string;
    shift: string;
    date: Date;
    time: string;
    location: {
      building: string;
      room: string;
      floor: string | null;
    };
  }[];
};
export type Semester = {
  id: string;
  title: string;
  year: number;
};
export type Location = {
  building: string;
  room: string;
  floor: number | null;
};
export type AtaStudent = {
  number: number;
  studentId: string;
  name: string;
  date: string;
  time: string;
  location: Location;
};
export type AtaSection = {
  section: {
    id: string;
    title: string;
    shift: string;
  };
  course: {
    title: string;
  };
  department: {
    id: string;
    title: string;
  };
  students: AtaStudent[];
};
export type TAtaDiscipline = {
  name: string;
  id: string;
};
export type RetakeSectionItem = {
  id: string;
  title: string;
  shift: string;
};
export type RetakeAtaResponse = {
  discipline: TAtaDiscipline;
  semester: Semester | null;
  sections: AtaSection[];
};
export type TMenssage = {
  id: string;
  type: string;
  smsMessage?: string | undefined;
  menssage?: string | undefined;
  phoneNumber?: string | undefined;
  email?: string | undefined;
  senderName: string;
};
