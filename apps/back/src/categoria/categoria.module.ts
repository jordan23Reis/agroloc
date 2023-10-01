import { Module, forwardRef } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaMiddlewares } from './entities/categoria.middlewares';
import { Categoria } from './entities/categoria.entity';
import { UsersModule } from '../users/users.module';
import { MaquinaModule } from '../maquina/maquina.module';


const modelCategoria = MongooseModule.forFeatureAsync([
  {
    name: Categoria.name,
    useFactory: CategoriaMiddlewares,
  },
]);

@Module({
  imports: [modelCategoria, 
    forwardRef(() => UsersModule),
    forwardRef(() => MaquinaModule)
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService]
})
export class CategoriaModule {}
