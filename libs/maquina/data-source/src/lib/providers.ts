import { Maquina, MaquinaService } from "@agroloc/maquina/domain";
import { MaquinaServiceImpl } from "./infrastructure/maquina.service.impl";
import { getModelToken } from "@nestjs/mongoose";

export function provideMaquinaService(){
    return {
        provide: MaquinaService,
        useClass: MaquinaServiceImpl,
        inject: [getModelToken(Maquina.name)]
    }
}