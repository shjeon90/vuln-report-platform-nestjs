import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor (
        private readonly usersService: UsersService
    ) {}

    async register(email: string, password: string, username: string): Promise<User> {
        const user = this.usersService.create({
            email,
            password,
            username
        });

        return user;
    }

    async login(email: string, password: string): Promise<boolean> {
        const user = this.usersService.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await this.usersService.validatePassword(password, user.password);
        return isPasswordValid;
    }
}
