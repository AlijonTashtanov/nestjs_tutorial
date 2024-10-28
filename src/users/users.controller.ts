import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto'; // Ensure you have DTOs created
import { UpdateUserDto } from './dto/update-user.dto'; // Ensure you have DTOs created
import { AuthGuard } from '@nestjs/passport'; // Import the AuthGuard

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint to create a new user
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Endpoint to get the profile of the authenticated user
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  findAll() {
    return this.usersService.findAll();
  }

  // Endpoint to get a specific user by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // Endpoint to update a user by ID
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
