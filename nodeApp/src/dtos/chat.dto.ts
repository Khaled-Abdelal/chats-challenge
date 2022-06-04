import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  public applicationToken: string
  @IsNumber()
  public number: number
}

export class GetChatDto {
  @IsString()
  public token: string

  @IsNumberString()
  public number: number
}