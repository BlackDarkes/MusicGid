import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TypeUserRole } from "../../types/userRole.type.js";
import { ROLE_KEY } from "../decorators/role.decorator.js";

@Injectable()
export class RolesGuard implements CanActivate{
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<TypeUserRole[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Доступ всем пользователям
    if (!requiredRole) {
      return true;
    }

    // Получаем пользователя из request (Strategy туда положил)
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = requiredRole.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException();
    }

    return true;
  }
}