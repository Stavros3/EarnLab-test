import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BPost } from './blogspot.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './odt/CreatePost.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class BlogspotService {
  constructor(
    @InjectRepository(BPost)
    private readonly bPostRepository: Repository<BPost>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async findAll(skip: number, limit = 20): Promise<BPost[]> {
    return this.bPostRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(id: string): Promise<BPost> {
    // check if data is in cache:
    const cacheKey = `post_${id}`;
    const cachedPost = await this.cacheService.get(cacheKey);

    if (cachedPost) {
      return cachedPost as BPost;
    }

    const bpost = await this.bPostRepository.findOne({ where: { id } });

    if (bpost) {
      // save data to cache:
      await this.cacheService.set(cacheKey, bpost);
      return bpost;
    } else {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  async create(bPost: CreatePostDto): Promise<BPost> {
    return this.bPostRepository.save(bPost);
  }

  //clear cache
  async clearCache() {
    return await this.cacheService.reset();
  }
}
