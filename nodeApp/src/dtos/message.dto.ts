import { IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  public applicationToken: string
  @IsNumber()
  public chatNumber: number
  @IsNumber()
  public number: number
  @IsString()
  public content: string
}


export class GetMessagesDto {
  @IsString()
  public token: string

  @IsNumberString()
  public chatNumber: number
}

export class GetMessageDto extends GetMessagesDto{
  @IsNumberString()
  public number: string
}