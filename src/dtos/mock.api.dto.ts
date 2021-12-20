import { IsObject, IsOptional, IsString } from 'class-validator';

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
  public count?: number;
}
