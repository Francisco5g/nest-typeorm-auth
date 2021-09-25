import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { UsersService } from '../src/users/users.service'

describe('AuthController (e2e)', () => {
  let app: INestApplication
  let usersService: UsersService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    usersService = moduleFixture.get<UsersService>(UsersService)
    
    await app.init()
  })

  it('UsersService should be defined', async () => {
    console.log(await usersService.create({ name: 'francisco', email: 'fg@com', password: '1234' }))

    expect(usersService).toBeDefined()
  })
})