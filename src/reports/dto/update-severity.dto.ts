import { ReportSeverity } from "../entities/report.entity";

export class UpdateSeverityDto {
    constructor (
        public severity: ReportSeverity
    ) {}
}