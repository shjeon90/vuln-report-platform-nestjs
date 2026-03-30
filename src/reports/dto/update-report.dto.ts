import { ReportCategory } from "../entities/report.entity";

export class UpdateReportDto {
    constructor (
        public title?: string,
        public content?: string,
        public category?: ReportCategory,
        public userId?: number
    ) {}
}