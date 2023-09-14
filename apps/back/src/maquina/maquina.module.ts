import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MaquinaService } from './maquina.service';
import { MaquinaController } from './maquina.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Maquina, MaquinaSchema } from './entities/maquina.entity';
import { MaquinaMiddlewares } from './entities/maquina.middlewares';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { CheckMachineExistance } from './middlewares/checkmachineexistance.middleware';


const modelMaquina = MongooseModule.forFeatureAsync([
  { 
    name: Maquina.name, 
    useFactory: MaquinaMiddlewares
  }
])

@Module({
  imports: [
    modelMaquina,
    CloudinaryModule,
    // MulterModule.register({dest: join(__dirname, "assets/maquina")})
  ],
  controllers: [MaquinaController],
  providers: [MaquinaService],
})
export class MaquinaModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckMachineExistance)
      .forRoutes(
        { path: 'maquina/:id', method: RequestMethod.PUT },
        { path: 'maquina/:id', method: RequestMethod.DELETE },
        { path: 'maquina/imagem/principal/:idMaquina', method: RequestMethod.POST },
        { path: 'maquina/imagem/principal/:idMaquina/', method: RequestMethod.DELETE },
        { path: 'maquina/imagem/secundaria/:idMaquina', method: RequestMethod.POST },
        { path: 'maquina/imagem/secundaria/:idMaquina/:filename', method: RequestMethod.DELETE },
      )
  }
}
