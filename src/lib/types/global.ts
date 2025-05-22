export type ApiResponse<T> = {
  data: T;
  message?: string;
  success?: boolean;
};

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

export type TStudent = {
  id: string;
  name: string;
  email: string;
  major: string;
};
