// lib/types/action-result.ts

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
  id: string;
  createdAt: Date;
  updatedAt: Date;
  roomNumber: string;
  floor: string;
  buildingId: string;
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
  code: string;
  meta?: TMeta;
  durationInYears: number;
  academicDepartment: {
    title: string;
  };
  academicDepartmentId: string;
  price: {
    amount: number;
    currency: string;
  };
  faculties: TFaculty[];
  offeredCourses?: TOfferedCourse[];
  studentEnrolledCourses?: TStudentEnrolledCourse[];
  preRequisiteCourses?: [
    {
      courseId: string;
      isDeleted?: boolean | null;
    }
  ];
};
export type TPrice = {
  id: string;
  amount: number;
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
  id: string;
  name: string;
  code: string;
  description: string | null;
  credits: number;
  minimumGradeToDismiss: number;
  createdAt: Date;
  updatedAt: Date;
};
export type TOfferedCourse = {
  id: string;
  academicDepartmentId: string;
  courseId: string;
  semesterRegistrationId: string;
  offeredCourseSections: TOfferedCourseSection[];
};
type TOfferedCourseSection = {
  id: string;
  semesterRegistrationId: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  offeredCourseId: string;
  maxCapacity: number;
  currentlyEnrolledStudent: number;
};
type TStudentEnrolledCourse = {
  id: string;
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
    id: string;
    createdAt: Date;
    updatedAt: Date;
    startDate: Date;
    endDate: Date;
    ordem: number;
  };
  payment?: {
    id: string;
    paymentRecipt?: string;
    totalAmount: number;
    approved: boolean;
    paymentType: string;
    status: string;
    method: string;

    createdAt: Date;
    updatedAt: Date;
  };
};

export type TDepartemant = {
  id: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  academicFacultyId: string;
  departmentHeadId: string | null;
};
export type TBuilding = {
  id: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TSemester = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  isCurrent: boolean;
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
  shift: 'MORNING' | 'AFTERNOON' | 'EVENING';
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
  id: string;
  facultyId: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  email: string;
  contactNo: string;
  profileImage: string;
  designation: string;
  gender: string;
  shift: 'MORNING' | 'AFTERNOON' | 'EVENING';
  password: string;
  academicDepartment: {
    title: string;
  };
  courses: {
    facultyId: string;
    courseId: string;
  }[];
  academicFacultyId: string;
  academicDepartmentId: string;
  createdAt: Date;
  updatedAt: Date;
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
  user: TUser;
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
