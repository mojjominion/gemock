import { IsObject, IsOptional, IsString, Length } from 'class-validator';

export class CreateMockApiDto {
  @IsString()
  public config: string;
}

export class MockApiBody {
  @IsObject()
  public config: NestedConfig;
}

export class MockApiQuery {
  @IsOptional()
  @Length(0, 3, { message: 'count should be between 0 - 999' })
  public count?: number;
}
