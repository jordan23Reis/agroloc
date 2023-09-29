import mongoose from "mongoose";
import {
    IsObject,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
  } from '@nestjs/class-validator';
  import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from "class-validator";
import { FavoritoSchemaDtoRestraints } from "@agroloc/shared/util";


export class ImagemPrincipal {

    @IsNotEmpty()
    @IsString()
    @MinLength(FavoritoSchemaDtoRestraints.tamMinUrlImagem)
    @MaxLength(FavoritoSchemaDtoRestraints.tamMaxUrlImagem)
    Url: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(FavoritoSchemaDtoRestraints.tamMinNomeArquivo)
    @MaxLength(FavoritoSchemaDtoRestraints.tamMaxNomeArquivo)
    NomeArquivo: string;
}


export class ItemFavorito {

    @IsNotEmpty()
    @IsString()
    @MinLength(FavoritoSchemaDtoRestraints.tamMinIdItemFavorito)
    @MaxLength(FavoritoSchemaDtoRestraints.tamMaxIdItemFavorito)
    idItemFavorito: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @MinLength(FavoritoSchemaDtoRestraints.tamMinNomeItem)
    @MaxLength(FavoritoSchemaDtoRestraints.tamMaxNomeItem)
    Nome: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(FavoritoSchemaDtoRestraints.tamMinTipo)
    @MaxLength(FavoritoSchemaDtoRestraints.tamMaxTipo)
    Tipo: string;

    @IsOptional()
    @ValidateNested()
    @IsObject()
    @Type(() => ItemFavorito)
    ImagemPrincipal: ImagemPrincipal;
}




export class FullFavoritoDto {

    @IsNotEmpty()
    @ValidateNested()
    @IsObject()
    @Type(() => ItemFavorito)
    ItemFavorito: ItemFavorito;
}
