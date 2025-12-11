/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  response?: {
    data: {
      message: string;
      statusCode: number;
    };
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  is_veridied_email: boolean;
  avatar: string;
  phone?: string;
  address?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequst {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  message: string;
  user: User
}