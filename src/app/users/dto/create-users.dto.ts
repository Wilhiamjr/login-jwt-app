import { IsNotEmpty, IsEmail, Matches,  } from "class-validator";
import { MessageHelpers } from "src/helpers/message.helpers";
import { RegexHelper } from "src/helpers/regex.helpers";

export class CreateUsersDto {
    @IsNotEmpty()
    FirstName: string;
    @IsNotEmpty()
    LastName: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @Matches(RegexHelper.password, { message: MessageHelpers.PASSWORD_VALID })
    password: string;
}