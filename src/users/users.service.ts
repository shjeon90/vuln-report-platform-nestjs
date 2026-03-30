import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { create } from 'domain';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];
    private nextId: number = 1;

    constructor() {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = this.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const user = new User(
            this.nextId++,
            createUserDto.email,
            createUserDto.password,
            createUserDto.username,
            UserRole.USER,
            new Date(),
            [],
            []
        );

        this.users.push(user);
        return user;
    }

    async validatePassword(password1: string, password2: string): Promise<boolean> {
        return password1 === password2;
    }

    findById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    findByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }
}
