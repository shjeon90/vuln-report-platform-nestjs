import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { create } from 'domain';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];
    private nextId: number = 1;

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,  // Repository injection for User entity
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        // const existingUser = this.findByEmail(createUserDto.email);
        // if (existingUser) {
        //     throw new Error('User with this email already exists');
        // }

        // const user = new User(
        //     this.nextId++,
        //     createUserDto.email,
        //     createUserDto.password,
        //     createUserDto.username,
        //     UserRole.USER,
        //     new Date(),
        //     [],
        //     []
        // );

        // this.users.push(user);
        // return user;

        const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const user = this.usersRepository.create({
            email: createUserDto.email,
            password: createUserDto.password,
            username: createUserDto.username,
            role: UserRole.USER,
        });
        return this.usersRepository.save(user);
    }

    async validatePassword(password1: string, password2: string): Promise<boolean> {
        return password1 === password2;
    }

    // findById(id: number): User | undefined {
    //     return this.users.find(user => user.id === id);
    // }

    async findById(id: number): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { id } });
    }

    // findByEmail(email: string): User | undefined {
    //     return this.users.find(user => user.email === email);
    // }

    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { email } });
    }
}
