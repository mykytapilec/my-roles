import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/roles (GET)', () => {
    return request(app.getHttpServer())
      .get('/roles')
      .expect(200)
      .expect((res) => {
        expect(res.body).toContain('admin');
      });
  });

  it('/users/:id/roles (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/users/1/roles')
      .send({ roles: ['admin'] })
      .expect(200)
      .expect((res) => {
        expect(res.body.roles).toContain('admin');
      });
  });
});
