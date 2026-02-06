// lib/types/action-result.ts

import { TSemesterRegistrationStatus, TYearLevel } from './enum';

export type TUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
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

export type TSection = {
  id: string;
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
  courses: [
    {
      id: string;
      courseTitle: string;
      courseId: string;
      yearLevel: TYearLevel;
      shift: string;
      semester: string;
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
export type TAdmitionExame = {
  id: string;
  applicantName: string;
  paymentRecipt: string;
  exameDate: Date;
  document: string;
  phoneNumber: string;
  email: string;
  paymentAmoute: number;
  aprovePayment: boolean;
  exameResults: number;
  passed: boolean;
  fase: {
    name: string;
  };
  payment: {
    id: string;
    status: 'APROVE' | 'PENDING' | 'DENIDE';
    receipt: {
      id: string;
      payerIban: string;
      beneficiaryIban: string;
      paidAt: Date;
    } | null;
    PaymentReference: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      message: string;
      paymentId: string;
      code: number;
      reference: string;
    }[];
    totalAmount: number;
    approved: boolean;
  } | null;
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
  studentType: string;
  middleName: string;
  lastName: string;
  profileImage: string | null;
  email: string;
  contactNo: string;
  shift: {
    name: string;
  };
  gender: string;
  isWoker: boolean;
  yearLevel: string;
  isActive: boolean;
  gradeDeclarationFile: string;
  biFile: string;
  presentAddress: string;
  createdAt: Date;
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
  id: string;
  type: string;
  message: string;
  userId: string;
  metadata: {
    message: string;
    authorId: string;
    description: string;
    url: string;
  };
  read: boolean;
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
  User: TUser;
};
export type TPayment = {
  id: string;
  atendent: string;
  method: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  currency: string;
  entity: string;
  TotalAmount: number;
  extraAmount: number;
  transactionRef: string;
  approved: boolean;
  paymentType: string;
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

export type TMenssage = {
  id: string;
  type: string;
  smsMessage?: string | undefined;
  menssage?: string | undefined;
  phoneNumber?: string | undefined;
  email?: string | undefined;
  senderName: string;
};
