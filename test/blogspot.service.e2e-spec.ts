import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('BlogspotController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/b_post (GET)', () => {
    return request(app.getHttpServer()).get('/b_post').expect(200);
  });

  it('/b_post (POST)', () => {
    return request(app.getHttpServer())
      .post('/b_post')
      .send({ title: 'Test Post', content: 'This is a test post.' })
      .expect(201);
  });

  it('/b_post/clear (GET)', () => {
    return request(app.getHttpServer()).get('/b_post/clear').expect(200);
  });

  it('/b_post/:id (GET)', () => {
    return request(app.getHttpServer()).get('/b_post/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
