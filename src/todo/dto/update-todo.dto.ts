import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';
import { IsString } from 'class-validator';
import { faker } from '@faker-js/faker';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @ApiPropertyOptional({ example: 'Study for exam' })
    @IsString()
    readonly title?: string = faker.lorem.words(3);
  
    @ApiPropertyOptional({ example: 'Read chapters 5-10' })
    @IsString()
    readonly description?: string = faker.lorem.sentence();
}