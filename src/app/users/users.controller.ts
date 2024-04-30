import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async index() {

        return await this.usersService.findAll();
    }

    @Post()
    async store(@Body() body:CreateUsersDto) {
        return await this.usersService.store(body);
    }

    @Get(':id')
    async show(@Param('id',new ParseUUIDPipe()) id: string) {
        return await this.usersService.findOneOrFail({ where: { id:id } });
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body:UpdateUsersDto) {
        console.log(body)
        return await this.usersService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.usersService.destroy(id);
    }
}
