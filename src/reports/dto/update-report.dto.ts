import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ReportCategory } from "../entities/report.entity";

export class UpdateReportDto {
    // constructor (
    //     public title?: string,
    //     public content?: string,
    //     public category?: ReportCategory,
    //     public userId?: number
    // ) {}
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsEnum(ReportCategory)
    @IsOptional()
    category?: ReportCategory;

    @IsNumber()
    userId: number;
}