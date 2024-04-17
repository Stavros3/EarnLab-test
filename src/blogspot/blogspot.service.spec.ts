import { Test, TestingModule } from '@nestjs/testing';
import { BlogspotService } from './blogspot.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { NotFoundException } from '@nestjs/common';
import { mock, MockProxy } from 'jest-mock-extended';
import { BPost } from './blogspot.entity';
import { CreatePostDto } from './odt/CreatePost.dto';

describe('BlogspotService', () => {
  let service: BlogspotService;
  let repo: MockProxy<Repository<BPost>>;
  let cache: MockProxy<Cache>;

  beforeEach(async () => {
    repo = mock<Repository<BPost>>();
    cache = mock<Cache>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogspotService,
        { provide: getRepositoryToken(BPost), useValue: repo },
        { provide: 'CACHE_MANAGER', useValue: cache },
      ],
    }).compile();

    service = module.get<BlogspotService>(BlogspotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      const result = [new BPost(), new BPost()];
      repo.find.mockResolvedValue(result);

      expect(await service.findAll(0, 20)).toBe(result);
      expect(repo.find).toHaveBeenCalledWith({ skip: 0, take: 20 });
    });
  });

  describe('findOne', () => {
    it('should return a post if it is in the cache', async () => {
      const result = new BPost();
      cache.get.mockResolvedValue(result);

      expect(await service.findOne('1')).toBe(result);
      expect(cache.get).toHaveBeenCalledWith('post_1');
    });

    it('should return a post if it is in the repository and not in the cache', async () => {
      const result = new BPost();
      cache.get.mockResolvedValue(null);
      repo.findOne.mockResolvedValue(result);

      expect(await service.findOne('1')).toBe(result);
      expect(cache.get).toHaveBeenCalledWith('post_1');
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(cache.set).toHaveBeenCalledWith('post_1', result);
    });

    it('should throw an exception if the post is not found', async () => {
      cache.get.mockResolvedValue(null);
      repo.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
      expect(cache.get).toHaveBeenCalledWith('post_1');
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('create', () => {
    it('should create a post', async () => {
      const dto = new CreatePostDto();
      const result = new BPost();
      repo.save.mockResolvedValue(result);

      expect(await service.create(dto)).toBe(result);
      expect(repo.save).toHaveBeenCalledWith(dto);
    });
  });

  describe('clearCache', () => {
    it('should clear the cache', async () => {
      await service.clearCache();
      expect(cache.reset).toHaveBeenCalled();
    });
  });
});
