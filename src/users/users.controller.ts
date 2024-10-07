import {Body, Controller, Get, Post} from '@nestjs/common';
import {CreateUser, UsersService} from './users.service';


@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {
        this.usersService = usersService;
    }

    @Get()
    list() {
        return this.usersService.findAll();
    }

    @Post()
    //   handles the post request to /users/create endpoint to create new user
    async signUp(@Body() user: CreateUser) {
        return await this.usersService.createUser(user);
    }
}
