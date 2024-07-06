import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class CreateTodoDto {
  @ApiProperty({
    example: faker.lorem.words(3),
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string = faker.lorem.words(3);

  @ApiProperty({
    example: faker.lorem.sentence(),
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string = faker.lorem.sentence();
}