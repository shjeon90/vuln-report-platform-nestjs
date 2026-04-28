import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ReportCategory } from "../entities/report.entity";

export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    content!: string;

    @IsEnum(ReportCategory)
    category!: ReportCategory;

    // @IsNumber()
    // userId!: number;
}