import type { TypeUserRole } from "@/libs/api";

interface IAdmin {
  id: string;
  name: string;
  email: string;
  role: TypeUserRole;
  is_verified_email: boolean;
  avatar: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { IAdmin };