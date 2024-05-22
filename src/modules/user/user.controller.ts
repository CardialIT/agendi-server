import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post('/create')
    async create(@Body() data: UserDTO) {
        return this.userService.create(data);
    }
}