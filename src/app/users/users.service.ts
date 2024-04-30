import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUsersDto } from './dto/update-users.dto';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) { }

    async findAll() {
        return await this.usersRepository.find({
            select: ['id', 'FirstName', 'LastName', 'email'],
        });
    }
    async findOneOrFail( options: FindOneOptions<UserEntity>) {
        try {
            return await this.usersRepository.findOneOrFail(options);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    async store(data:CreateUsersDto) {
        const user = this.usersRepository.create(data);
        return await this.usersRepository.save(user);
    }
    async update(id:string,data:UpdateUsersDto) {
        const user = await this.findOneOrFail({ where: { id:id } });
        this.usersRepository.merge(user, data);
        return await this.usersRepository.save(user);
    }
    async destroy(id:string) {
        await this.usersRepository.findOneOrFail({ where: { id: id } });
        await this.usersRepository.softDelete({ id: id });
    }
}
