import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/app/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) { }

async login(user) {
    const payload = {
        sub: user.id,name: user.FirstName ,email: user.email
    }
    return {"token":this.jwtService.sign(payload)}
}
async validateUser(email: string, password: string) {

    let user 
    try {
        user = await this.usersService.findOneOrFail({ where: { email: email } });
    } catch (error) {
        return null;
    }
    const isPasswordValid = compareSync(password, user.password);
    if(!isPasswordValid) return null;
    return user;
}
}


