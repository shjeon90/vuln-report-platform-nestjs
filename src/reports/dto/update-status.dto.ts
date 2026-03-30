import { ReportStatus } from "../entities/report.entity";

export class UpdateStatusDto {
    constructor (
        public status: ReportStatus
    ) {}
}