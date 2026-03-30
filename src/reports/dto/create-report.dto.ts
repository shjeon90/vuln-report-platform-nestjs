import { ReportCategory } from "../entities/report.entity";

export class CreateReportDto {
    title: string;

    content: string;

    category: ReportCategory;

    userId: number;
}