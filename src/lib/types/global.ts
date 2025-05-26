// lib/types/action-result.ts

export type TUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  number: number;
};
export type TCurse = {
  id: string;
  title: string;
  createdAt: string;
  departments: string;
  facultys: string;
  students: number;
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
