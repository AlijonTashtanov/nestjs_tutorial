import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the import path
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'; // Import bcrypt

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log("omar", createUserDto);

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // 10 is the salt rounds

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword, // Save the hashed password
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany(); // Use PrismaService
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } }); // Use PrismaService
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto }); // Use PrismaService
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } }); // Use PrismaService
  }
}
