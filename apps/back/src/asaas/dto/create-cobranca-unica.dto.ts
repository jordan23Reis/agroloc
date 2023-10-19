import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CobrancaUnica {
    @IsNotEmpty()
    @IsString()
    customer: string;
    @IsNumber()
    @IsNotEmpty()
    value: number;
    @IsString()
    @IsOptional()
    description: string;
    @IsOptional()
    @IsString()
    externalReference: string;
}