import { Injectable } from '@nestjs/common';
import { FullTipoPrecoDto } from './dto/full.tipo-preco.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TipoPreco } from './entities/tipo-preco.entity';
import { Model } from 'mongoose';
import { MaquinaService } from '../maquina/maquina.service';

@Injectable()
export class TipoPrecoService {
constructor(
  @InjectModel(TipoPreco.name) private tipoPrecoModel: Model<TipoPreco>,
  private maquinaService: MaquinaService
){}

  async create(createTipoPrecoDto: FullTipoPrecoDto) {
    const createdTipoPreco = await this.tipoPrecoModel.create(createTipoPrecoDto);
    return createdTipoPreco;
  }

  async update(id: string, updateTipoPrecoDto: FullTipoPrecoDto) {
    const updatedTipoPreco = await this.tipoPrecoModel.findByIdAndUpdate(id, updateTipoPrecoDto);
    const foundMaquinasPorCategoria = await this.maquinaService.findMaquinasPorIdCategoria(id);
    foundMaquinasPorCategoria.forEach( async maq => {
      maq.Categoria.Nome = updateTipoPrecoDto.Nome;
      await maq.save();
    })

    return updatedTipoPreco;
  }

  async remove(id: string) {
    const removedTipoPreco = await this.tipoPrecoModel.findByIdAndDelete(id);

    const foundMaquinasPorCategoria = await this.maquinaService.findMaquinasPorIdCategoria(id);
    foundMaquinasPorCategoria.forEach( async maq => {
      maq.Categoria = undefined
      await maq.save();
    })

    return removedTipoPreco;
  }
}
