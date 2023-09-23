import { Injectable } from '@nestjs/common';
import { CreateFavoritoDto } from './dto/full-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';

@Injectable()
export class FavoritoService {
  create(createFavoritoDto: CreateFavoritoDto) {
    return 'This action adds a new favorito';
  }

  findAll() {
    return `This action returns all favorito`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorito`;
  }

  update(id: number, updateFavoritoDto: UpdateFavoritoDto) {
    return `This action updates a #${id} favorito`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorito`;
  }
}
