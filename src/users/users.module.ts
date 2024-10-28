import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // Import the controller
import { PrismaModule } from '../prisma/prisma.module'; // Import the module where PrismaService is provided

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  controllers: [UsersController], // Register the controller here
  exports: [UsersService],
})
export class UsersModule {}
