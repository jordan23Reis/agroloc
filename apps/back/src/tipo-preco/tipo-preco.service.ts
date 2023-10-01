import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { FullTipoPrecoDto } from './dto/full.tipo-preco.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TipoPreco } from './entities/tipo-preco.entity';
import { Model } from 'mongoose';
import { MaquinaService } from '../maquina/maquina.service';

@Injectable()
export class TipoPrecoService {
constructor(
  @InjectModel(TipoPreco.name) private tipoPrecoModel: Model<TipoPreco>,
  
  @Inject(forwardRef(() => MaquinaService))
  private maquinaService: MaquinaService
){}

  async findOne(id: string){
    const foundTipoPreco = await this.tipoPrecoModel.findById(id);
    return foundTipoPreco;
  }

  async findAll(){
    const foundTipoPrecos = await this.tipoPrecoModel.find();
    return foundTipoPrecos;
  }


  async create(createTipoPrecoDto: FullTipoPrecoDto) {
    const createdTipoPreco = await this.tipoPrecoModel.create(createTipoPrecoDto);
    return createdTipoPreco;
  }

  async update(id: string, updateTipoPrecoDto: FullTipoPrecoDto) {
    const updatedTipoPreco = await this.tipoPrecoModel.findByIdAndUpdate(id, updateTipoPrecoDto, {new: true});
    const foundMaquinasPorPreco = await this.maquinaService.findMaquinasPorIdPreco(id);
    foundMaquinasPorPreco.forEach( async maq => {
      maq.Preco.Tipo.Nome = updateTipoPrecoDto.Nome;
      await maq.save();
    })

    return updatedTipoPreco;
  }

  async remove(id: string) {
    const removedTipoPreco = await this.tipoPrecoModel.findByIdAndDelete(id);

    if(removedTipoPreco != null){
    const foundMaquinasPorPreco = await this.maquinaService.findMaquinasPorIdPreco(id);
    foundMaquinasPorPreco.forEach( async maq => {
      maq.Preco.Tipo = undefined
      maq.EstaAtiva = false;
      await maq.save();
    })
    return removedTipoPreco;
   }else{
    return {response: "Tipo Preco não existe!"};
   }

  }
}
