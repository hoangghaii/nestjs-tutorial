import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/core/constants';
import { Role } from '../users/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
