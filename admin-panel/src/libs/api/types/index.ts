/* eslint-disable @typescript-eslint/no-explicit-any */
interface IApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

interface IApiError {
  response?: {
    data: {
      message: string;
      statusCode: number;
    };
  };
}

type TypeUserRole = "ADMIN" | "USER" | "SELLER";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: TypeUserRole;
  is_verified_email: boolean;
  avatar: string;
  phone?: string;
  address?: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}


interface IAuthResponse {
  message: string;
  user: IUser;
}

export type {
  IApiResponse,
  IApiError,
  TypeUserRole,
  IUser,
  ILoginRequest,
  IAuthResponse,
};
