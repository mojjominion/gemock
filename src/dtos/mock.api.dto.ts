import { IsObject, IsOptional, IsString, Length } from 'class-validator';

export class CreateMockApiDto {
  @IsString()
  public config: string;
}

export class MockApiQuery {
  @IsOptional()
  @Length(0, 3, { message: 'count should be between 0 - 999' })
  public count?: number;

  @IsOptional()
  public locale?: string;
}
export class MockApiBody extends MockApiQuery {
  @IsObject()
  public config: NestedConfig;
}
