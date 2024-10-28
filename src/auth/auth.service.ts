// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
    return this.excludePassword(user);
  }

  async login(email: string, password: string) {
    console.log('Email:', email); // Log the email to check if it's undefined
    console.log('Password:', password); // Log the password as well

    // Check if email is provided
    if (!email) {
      throw new Error('Email is required');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email: email, // Ensure this is defined
      },
    });

    // If user is found, compare the password
    if (user && await bcrypt.compare(password, user.password)) {
      return user; // Authentication successful
    } else {
      throw new Error('Invalid credentials'); // Handle invalid credentials
    }
  }

  private excludePassword(user: any) {
    const { password, ...result } = user;
    return result;
  }
}
