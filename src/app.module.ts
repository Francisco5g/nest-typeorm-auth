import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/users.entity'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { LoggerMiddleware } from './common/middleware/logger.middlware'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/database/db.sqlite',
      entities: [User],
      synchronize: true,
      keepConnectionAlive: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    if (process.env.NODE_ENV !== 'test') {
      consumer.apply(LoggerMiddleware).forRoutes('*')
    }
  }
}
