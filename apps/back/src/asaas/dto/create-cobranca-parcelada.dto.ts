import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CobrancaParcelada {
    @IsNotEmpty()
    @IsString()
    customer: string;
    @IsNumber()
    @IsNotEmpty()
    installmentCount: number;
    @IsNumber()
    @IsNotEmpty()
    installmentValue: number;
    @IsString()
    @IsOptional()
    description: string;
    @IsOptional()
    @IsString()
    externalReference: string;
}