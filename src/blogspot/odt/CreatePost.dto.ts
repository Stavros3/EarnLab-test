import { IsString } from 'class-validator';
import { PostModel } from '../models/post.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto implements PostModel {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;
}
