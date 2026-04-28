import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRole } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";


export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findById(payload.sub);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return {
            userId: user.id,
            email: user.email,
            role: user.role
        };
    }
    
}