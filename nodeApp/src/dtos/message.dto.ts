import { IsNumber, IsNumberString, IsString, MinLength } from 'class-validator';

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

export class SearchMessagesDto extends GetMessagesDto {}

export class SearchMessagesQueryDto {
  @IsString()
  @MinLength(1)
  public query: string
}
