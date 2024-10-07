import {HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity';

export interface CreateUser {
    firstName: string;
    lastName: string;
}

@Injectable()
export class UsersService {
    private logger = new Logger();

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({id});
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async createUser(createUser: CreateUser): Promise<User> {
        try {
            const user = await this.usersRepository.create(createUser);
            return await this.usersRepository.save(user);
        } catch (err) {
            if (err.code == 23505) {
                this.logger.error(err.message, err.stack);
                throw new HttpException('Username already exists', HttpStatus.CONFLICT);
            }
            this.logger.error(err.message, err.stack);
            throw new InternalServerErrorException(
                'Something went wrong, Try again!',
            );
        }
    }
}