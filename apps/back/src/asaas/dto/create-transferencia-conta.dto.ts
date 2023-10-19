import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

class Bank {
    @IsNotEmpty()
    @IsString()
    code: string
}

class BankAcount {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Bank)
    bank: Bank

    @IsOptional()
    @IsString()
    accountName: string;

    @IsNotEmpty()
    @IsString()
    ownerName: string;

    @IsOptional()
    @IsString()
    ownerBirthDate: string;

    @IsNotEmpty()
    @IsString()
    cpfCnpj: string;

    @IsNotEmpty()
    @IsString()
    agency: string;

    @IsNotEmpty()
    @IsString()
    account: string;

    @IsNotEmpty()
    @IsString()
    accountDigit: string;

    @IsOptional()
    @IsString()
    bankAccountType: string;
}


export class TransferenciaConta {
    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => BankAcount)
    bankAccount: BankAcount;

    @IsOptional()
    @IsString()
    operationType: string;

    @IsOptional()
    @IsString()
    description: string;
}