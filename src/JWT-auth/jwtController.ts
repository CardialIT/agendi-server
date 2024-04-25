// /* eslint-disable */
// import { Controller, Get, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { UsersService } from 'src/users/users.service';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Get()
//   @UseGuards(AuthGuard())
//   findAll() {
//     return this.usersService.findAll();
//   }
// }
