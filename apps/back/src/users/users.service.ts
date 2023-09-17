import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Usuario.name) private UserModel: Model<Usuario>) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.Login.Senha = await this.encryparSenha(
      createUserDto.Login.Senha
    );
    const createdUser = this.UserModel.create(createUserDto);
    return createdUser;
  }

  findAll() {
    const listedUsers = this.UserModel.find({}).select('-Login');
    return listedUsers;
  }

  findOne(id: string) {
    const foundUser = this.UserModel.findById(id).select('-Login');
    return foundUser;
  }

  async findOneCredentials(email: string) {
    const foundCredentials = await this.UserModel.findOne({
      'Login.Email': email,
    }).select('Login _id');
    return foundCredentials;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.UserModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    }).select('-login');
    return updatedUser;
  }

  async encryparSenha(senha: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(senha, saltOrRounds);
  }

  remove(id: string) {
    const deletedUser = this.UserModel.findByIdAndDelete(id).select('-Login');
    return deletedUser;
  }
}
