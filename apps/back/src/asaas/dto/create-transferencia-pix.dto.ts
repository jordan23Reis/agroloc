import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class TransferenciaPix {
    @IsNotEmpty()
    @IsNumber()
    value: number;
    @IsNotEmpty()
    @IsString()
    pixAddressKey: string;
    @IsNotEmpty()
    @IsString()
    pixAddressKeyType: string;
    @IsOptional()
    @IsString()
    description?: string;
}