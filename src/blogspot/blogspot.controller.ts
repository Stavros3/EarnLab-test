import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlogspotService } from './blogspot.service';
import { CreatePostDto } from './odt/CreatePost.dto';
@Controller('b_post')
export class BlogspotController {
  constructor(private readonly blogspotService: BlogspotService) {}

  @Get()
  async findAll(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.blogspotService.findAll(skip, limit);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.blogspotService.create(createPostDto);
  }

  //clear cache
  @Get('clear')
  async clearCache() {
    return await this.blogspotService.clearCache();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.blogspotService.findOne(id);
  }
}
