import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlogspotService } from './blogspot.service';
import { CreatePostDto } from './odt/CreatePost.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('b_post')
export class BlogspotController {
  constructor(private readonly blogspotService: BlogspotService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'The posts have been successfully fetched.',
  })
  async findAll(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    if (limit > 100) {
      limit = 100;
    }

    if (skip < 0) {
      skip = 0;
    }

    return this.blogspotService.findAll(skip, limit);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  async create(@Body() createPostDto: CreatePostDto) {
    return this.blogspotService.create(createPostDto);
  }

  //clear cache
  @Get('clear')
  @ApiOperation({ summary: 'Clear cache' })
  @ApiResponse({
    status: 200,
    description: 'The cache has been successfully cleared.',
  })
  async clearCache() {
    return await this.blogspotService.clearCache();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully fetched.',
  })
  async findOne(@Param('id') id: string) {
    return this.blogspotService.findOne(id);
  }
}
