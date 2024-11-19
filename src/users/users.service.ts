import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepo.create({ ...createUserDto });
    return await this.usersRepo.save(user);
  }

  async findAll() {
    return await this.usersRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findBy(email: string) {
    return await this.usersRepo.findOneBy({ email });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
