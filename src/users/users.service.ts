import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/CreateUserDto'
import { User } from './users.entity'

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find()
  }

  async create(data: CreateUserDto) {
    const userInstance = this.usersRepository.create(data)

    return await this.usersRepository.save(userInstance)
  }

  async findOne(email: string) {
    return this.usersRepository.findOne({ where: { email } })
  }

  async deleteOne(id: string) {
    await this.usersRepository.delete({ id })

    return
  }
}
