import { IsNotEmpty, IsEmail, Matches,  } from "class-validator";

export class UpdateUsersDto {
    @IsNotEmpty()
    FirstName: string;
    @IsNotEmpty()
    LastName: string;
}