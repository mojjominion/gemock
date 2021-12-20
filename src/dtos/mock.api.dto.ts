import { IsObject, IsString } from 'class-validator';

export class CreateMockApiDto {
  @IsString()
  public config: string;
}

export class MockApiBody {
  @IsObject()
  public config: NestedConfig;
}
