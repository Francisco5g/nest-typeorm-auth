import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { User } from '../users/users.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  public constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email)

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user

      return result
    }

    return null
  }

  async login(user: User) {
    const payload = {
      username: user.name,
      sub: user.id,
    }

    return { access_token: this.jwtService.sign(payload) }
  }
}
