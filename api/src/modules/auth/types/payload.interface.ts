import { TypeUserRole } from "./userRole.type.js";


export interface IPayload {
	id: string;
	role: TypeUserRole;
	email?: string;
	exp?: number;
	iat?: number;
}
