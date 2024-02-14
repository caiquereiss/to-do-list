import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      // Se a rota não exigir papéis/roles específicos, permita o acesso
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles = request.user?.roles;

    if (!userRoles || userRoles.length === 0) {
      throw new UnauthorizedException(
        'Usuário não tem as permissões necessárias',
      );
    }

    const hasRequiredRole = userRoles.some((role) =>
      requiredRoles.includes(role),
    );

    if (!hasRequiredRole) {
      throw new UnauthorizedException(
        'Usuário não tem as permissões necessárias',
      );
    }

    return true;
  }
}
