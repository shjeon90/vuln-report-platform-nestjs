import { IsEnum } from "class-validator";
import { ReportSeverity } from "../entities/report.entity";

export class UpdateSeverityDto {
    // constructor (
    //     public severity: ReportSeverity
    // ) {}

    @IsEnum(ReportSeverity)
    severity: ReportSeverity;
}