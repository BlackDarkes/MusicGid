import { Module } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { AdminController } from './admin.controller.js';
import { AuthService } from '../auth/auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AuthService],
  imports: [
    UsersModule,
    AuthModule,
  ]
})
export class AdminModule {}
