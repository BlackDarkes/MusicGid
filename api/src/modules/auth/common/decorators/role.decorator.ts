import { SetMetadata } from "@nestjs/common";
import { TypeUserRole } from "../../types/userRole.type.js";

export const ROLE_KEY = "role";
export const Roles = (...roles: TypeUserRole[]) => SetMetadata(ROLE_KEY, roles);