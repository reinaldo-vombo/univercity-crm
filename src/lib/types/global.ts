// lib/types/action-result.ts

export type TUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
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

export type TCourse = {
  id: string;
  title: string;
  code: string;
  credits: number;
  durationInYears: number;
  academicDepartment: {
    title: string;
  };
  academicDepartmentId: string;
  coursePricing: {
    price: number;
  };
  faculties: TTeacher[];
  offeredCourses?: TOfferedCourse[];
  studentEnrolledCourses?: TStudentEnrolledCourse[];
  preRequisiteCourses?: [
    {
      courseId: string;
      isDeleted?: boolean | null;
    }
  ];
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
  fase: number;
  document: string;
  paymentAmoute: number | null;
  aprovePayment: boolean | null | undefined;
  exameResults: number | null | undefined;
  passed: boolean | null;
};

export type TDepartemant = {
  id: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  academicFacultyId: string;
  departmentHeadId: string | null;
};
export type TBuiding = {
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
  name: string;
  email: string;
  major: string;
};
type TTeacher = {
  id: string;
  name: string;
  email: string;
  major: string;
};
