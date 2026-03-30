import { Injectable } from '@nestjs/common';
import { Report, ReportSeverity, ReportStatus } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateSeverityDto } from './dto/update-severity.dto';

@Injectable()
export class ReportsService {
    private readonly reports: Report[] = [];
    private nextId: number = 1;

    constructor() {}

    async create(createReportDto: CreateReportDto): Promise<Report> {
        const report = new Report(
            this.nextId++,
            createReportDto.title,
            createReportDto.content,
            createReportDto.category,
            ReportStatus.OPEN,
            ReportSeverity.LOW,
            createReportDto.userId,
            [],
            [],
            new Date(),
            new Date()
        );

        this.reports.push(report);
        return report;
    }

    findAll(): Report[] {
        return [...this.reports];
    }

    findOne(id: number): Report | undefined {
        return this.reports.find(report => report.id === id);
    }

    findByUserId(userId: number): Report[] {
        return this.reports.filter(report => report.userId === userId);
    }

    update(id: number, updateReportDto: UpdateReportDto): Report {
        const report = this.findOne(id);
        if (!report) {
            throw new Error('Report not found');
        }

        if (report.userId !== updateReportDto.userId) {
            throw new Error('Unauthorized');
        }

        report.title = updateReportDto.title ?? report.title;
        report.content = updateReportDto.content ?? report.content;
        report.category = updateReportDto.category ?? report.category;
        report.updatedAt = new Date();
        return report;
    }

    updateStatus(id: number, updateStatusDto: UpdateStatusDto): Report {
        const report = this.findOne(id);
        if (!report) {
            throw new Error('Report not found');
        }
        report.status = updateStatusDto.status;
        report.updatedAt = new Date();
        return report;
    }

    updateSeverity(id: number, updateSeverityDto: UpdateSeverityDto): Report {
        const report = this.findOne(id);
        if (!report) {
            throw new Error('Report not found');
        }
        report.severity = updateSeverityDto.severity;
        report.updatedAt = new Date();
        return report;
    }

    remove(id: number) {
        const index = this.reports.findIndex(report => report.id === id);
        if (index === -1) {
            throw new Error('Report not found');
        }
        this.reports.splice(index, 1);
    }
}
