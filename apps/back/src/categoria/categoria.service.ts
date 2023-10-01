import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { FullCategoriaDto } from './dto/full-categoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './entities/categoria.entity';
import { UsersService } from '../users/users.service';
import { MaquinaService } from '../maquina/maquina.service';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
constructor(
  @InjectModel(Categoria.name) private categoriaModel: Model<Categoria>,
  @Inject(forwardRef(() => UsersService))
  private usersService: UsersService,
  @Inject(forwardRef(() => MaquinaService))
  private maquinaService: MaquinaService

){}

  async findOne(id:string){
    const foundCategoria = await this.categoriaModel.findById(id);
    return foundCategoria;
  }

  async findAll() {
    const foundCategorias = await this.categoriaModel.find({});
    return foundCategorias;
  }

  async create(createCategoriaDto: FullCategoriaDto) {
    const createdCategoria = await this.categoriaModel.create(createCategoriaDto);
    return createdCategoria;  
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const updatedCategoria = await this.categoriaModel.findByIdAndUpdate(id, updateCategoriaDto, {new: true});

    const foundUsersPorCategoriaAutomovel = await this.usersService.findUsersPorIdCategoriaAutomovel(id);
    foundUsersPorCategoriaAutomovel.forEach( async user => {
      user.CadastroFreteiro.Automovel.forEach(aut => {
        if(aut.Categoria?.idCategoria.toString() == id){
          aut.Categoria.Nome = updateCategoriaDto.Nome;
        }
      })
      await user.save();
    })
  
    const foundMaquinasPorCategoria = await this.maquinaService.findMaquinasPorIdCategoria(id);
    foundMaquinasPorCategoria.forEach( async maq => {
      maq.Categoria.Nome = updateCategoriaDto.Nome;
      await maq.save();
    });

    return updatedCategoria;  
  }

  async remove(id: string) {
    const removedCategoria = await this.categoriaModel.findByIdAndDelete(id);

    const foundUsersPorCategoriaAutomovel = await this.usersService.findUsersPorIdCategoriaAutomovel(id);
    foundUsersPorCategoriaAutomovel.forEach( async user => {
      user.CadastroFreteiro.Automovel.forEach(aut => {
        if(aut.Categoria?.idCategoria.toString() == id){
          aut.Categoria = undefined;
        }
      })
      await user.save();
    })

    const foundMaquinasPorCategoria = await this.maquinaService.findMaquinasPorIdCategoria(id);
    foundMaquinasPorCategoria.forEach( async maq => {
      maq.Categoria = undefined;
      await maq.save();
    });


    return removedCategoria;  
  }
}
