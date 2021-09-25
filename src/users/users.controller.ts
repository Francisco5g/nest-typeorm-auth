import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/CreateUserDto'
import { UsersService } from './users.service'

@Controller()
export class UserController {
  public constructor(private usersService: UsersService) {}

  @Get('/users')
  async index() {
    console.log(process.env)

    return await this.usersService.findAll()
  }

  @Post('/user/register')
  async store(@Body() body: CreateUserDto) {
    return this.usersService.create(body)
  }

  @Delete('/user/delete/:id')
  async delete(@Param('id') id: string) {
    return this.usersService.deleteOne(id)
  }
}
