import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Report, ReportSeverity, ReportStatus } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateSeverityDto } from './dto/update-severity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class ReportsService {
    private readonly reports: Report[] = [];
    private nextId: number = 1;

    constructor(
        @InjectRepository(Report) private readonly reportsRepository: Repository<Report>
    ) {}

    async create(createReportDto: CreateReportDto): Promise<Report> {
        // const report = new Report(
        //     this.nextId++,
        //     createReportDto.title,
        //     createReportDto.content,
        //     createReportDto.category,
        //     ReportStatus.OPEN,
        //     ReportSeverity.LOW,
        //     createReportDto.userId,
        //     [],
        //     [],
        //     new Date(),
        //     new Date()
        // );

        // this.reports.push(report);
        // return report;
        const report = this.reportsRepository.create({
            ...createReportDto,
        });
        return await this.reportsRepository.save(report);
    }

    // findAll(): Report[] {
    //     return [...this.reports];
    // }

    async findAll(): Promise<Report[]> {
        return await this.reportsRepository.find({
            relations: ['user'],    // Include user information when fetching reports
            order: { createdAt: 'DESC' },
        });
    }

    // findOne(id: number): Report | undefined {
    //     return this.reports.find(report => report.id === id);
    // }

    async findOne(id: number): Promise<Report | null> {
        const report = await this.reportsRepository.findOne({
            where: { id },
            relations: ['user'],    // Include user information when fetching a single report
        });

        if (!report) {
            throw new NotFoundException('Report not found');
        }
        return report;
    }

    // findByUserId(userId: number): Report[] {
    //     return this.reports.filter(report => report.userId === userId);
    // }

    async findByUserId(userId: number): Promise<Report[]> {
        return await this.reportsRepository.find({
            where: { userId },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }

    // update(id: number, updateReportDto: UpdateReportDto): Report {
    //     const report = this.findOne(id);
    //     if (!report) {
    //         throw new Error('Report not found');
    //     }

    //     if (report.userId !== updateReportDto.userId) {
    //         throw new Error('Unauthorized');
    //     }

    //     report.title = updateReportDto.title ?? report.title;
    //     report.content = updateReportDto.content ?? report.content;
    //     report.category = updateReportDto.category ?? report.category;
    //     report.updatedAt = new Date();
    //     return report;
    // }

    async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
        const report = await this.findOne(id);
        if (!report) {
            throw new NotFoundException('Report not found');
        }  

        if (report.userId !== updateReportDto.userId && report.user.role !== UserRole.ADMIN) {
            throw new ForbiddenException('Unauthorized');
        }

        Object.assign(report, updateReportDto);
        return this.reportsRepository.save(report);
    }

    // updateStatus(id: number, updateStatusDto: UpdateStatusDto): Report {
    //     const report = this.findOne(id);
    //     if (!report) {
    //         throw new Error('Report not found');
    //     }
    //     report.status = updateStatusDto.status;
    //     report.updatedAt = new Date();
    //     return report;
    // }

    async updateStatus(id: number, updateStatusDto: UpdateStatusDto): Promise<Report> {
        const report = await this.findOne(id);
        if (!report) {
            throw new NotFoundException('Report not found');
        }

        report.status = updateStatusDto.status;

        return this.reportsRepository.save(report);
    }

    // updateSeverity(id: number, updateSeverityDto: UpdateSeverityDto): Report {
    //     const report = this.findOne(id);
    //     if (!report) {
    //         throw new Error('Report not found');
    //     }
    //     report.severity = updateSeverityDto.severity;
    //     report.updatedAt = new Date();
    //     return report;
    // }

    async updateSeverity(id: number, updateSeverityDto: UpdateSeverityDto): Promise<Report> {
        const report = await this.findOne(id);
        if (!report) {
            throw new NotFoundException('Report not found');
        }

        report.severity = updateSeverityDto.severity;

        return this.reportsRepository.save(report);
    }

    // remove(id: number) {
    //     const index = this.reports.findIndex(report => report.id === id);
    //     if (index === -1) {
    //         throw new Error('Report not found');
    //     }
    //     this.reports.splice(index, 1);
    // }

    async remove(id: number): Promise<void> {
        const report = await this.findOne(id);
        if (!report) {
            throw new NotFoundException('Report not found');
        }
        await this.reportsRepository.remove(report);
    }
}
