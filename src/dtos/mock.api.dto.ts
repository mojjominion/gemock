import { IsString } from 'class-validator';

export class CreateMockApiDto {
  @IsString()
  public config: string;
}
