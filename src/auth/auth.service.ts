import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    // return type Promise<User> to Promise<Partial<User>>
    async register(email: string, password: string, username: string): Promise<Partial<User>> {
        const user = await this.usersService.create({
            email,
            password,
            username
        });

        // return user;
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        };
    }

    // return type Promise<boolean> -> Promise<Partial<User>> -> implicit
    async login(email: string, password: string){
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        // const isPasswordValid = await this.usersService.validatePassword(password, user.password);
        // return isPasswordValid;

        const isPasswordValid = await this.usersService.validatePassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // return {
        //     id: user.id,
        //     email: user.email,
        //     username: user.username,
        //     role: user.role,
        // }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            }
        }
    }
}
