import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class Cliente {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    cpfCnpj: string;
    @IsOptional()
    @IsString()
    email?: string;
    @IsOptional()
    @IsString()
    mobilePhone?: string;
    @IsOptional()
    @IsString()
    externalReference: string;
}