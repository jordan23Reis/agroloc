import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Usuario.name) private UserModel: Model<Usuario>) {}
  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.UserModel.create(createUserDto);
    return createdUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
