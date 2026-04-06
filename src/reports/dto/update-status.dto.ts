import { IsEnum } from "class-validator";
import { ReportStatus } from "../entities/report.entity";

export class UpdateStatusDto {
    // constructor (
    //     public status: ReportStatus
    // ) {}

    @IsEnum(ReportStatus)
    status: ReportStatus;
}