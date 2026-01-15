import { TypeUserRole } from "./userRole.type.js";

export interface IPayload {
	id: string;
	email: string;
	role: TypeUserRole;
	exp?: number;
	iat?: number;
}
