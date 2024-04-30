import {  PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { MessageHelpers } from "src/helpers/message.helpers";


@Injectable()
export class localStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super({usernameField: 'email'});
    }
    // Validação de email e senha local
    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password);

        if(!user) {
            console.log('User not found');
            throw  new UnauthorizedException(MessageHelpers.PASSWORD_OR_EMAIL_INVALID);
        }
        return user;
    }
}