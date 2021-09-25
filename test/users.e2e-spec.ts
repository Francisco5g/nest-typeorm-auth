import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { getRepository } from 'typeorm'
import { User } from '../src/users/users.entity'

describe('UsersController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    const usersRepository = getRepository(User)

    await usersRepository.clear()
  })

  it('should create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send({ name: 'Francisco', email: 'fg@gmail.com', password: '1234' })

    expect(response.status).toBe(201)
  })
})
