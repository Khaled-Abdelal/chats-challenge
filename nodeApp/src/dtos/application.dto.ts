import { IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  public name: string;
}
