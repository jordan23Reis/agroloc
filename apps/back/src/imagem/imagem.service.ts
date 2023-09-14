import { Injectable } from '@nestjs/common';
import { ModelDefinition } from '@nestjs/mongoose';
import { Models, Schema, SchemaDefinition } from 'mongoose';

@Injectable()
export class ImagemService {

  findAll(teste: any) {
    return teste.find({});
  }

}
