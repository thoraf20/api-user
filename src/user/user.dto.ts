import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  public fullName: string;

  @IsString()
  public email: string;

  @IsString()
  @IsOptional()
  public role?: string;
}

export class ResetUserKeyDto {
  @IsString()
  public email: string;

  @IsString()
  public apiKey: string;
}
