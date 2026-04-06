import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateSeverityDto } from './dto/update-severity.dto';

@Controller('reports')
export class ReportsController {
    constructor (
        private readonly reportsService: ReportsService
    ) {}

    @Post()
    create(@Body() createReportDto: CreateReportDto) {
        return this.reportsService.create(createReportDto);
    }

    @Get()
    findAll() {
        return this.reportsService.findAll();
    }

    // @Get('my')
    // findMyReports(@Query('userId') userId: string) {
    //     return this.reportsService.findByUserId(Number(userId));
    // }

    @Get('my')
    findMyReports(@Query('userId', ParseIntPipe) userId: number) {
        return this.reportsService.findByUserId(userId);
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.reportsService.findOne(Number(id));
    // }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.reportsService.findOne(id);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    //     return this.reportsService.update(Number(id), updateReportDto);
    // }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateReportDto: UpdateReportDto) {
        return this.reportsService.update(id, updateReportDto);
    }

    // @Patch(':id/status')
    // updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    //     return this.reportsService.updateStatus(Number(id), updateStatusDto);
    // }

    @Patch(':id/status')
    updateStatus(@Param('id', ParseIntPipe) id: number, @Body() updateStatusDto: UpdateStatusDto) {
        return this.reportsService.updateStatus(id, updateStatusDto);
    }

    // @Patch(':id/severity')
    // updateSeverity(@Param('id') id: string, @Body() updateSeverityDto: UpdateSeverityDto) {
    //     return this.reportsService.updateSeverity(Number(id), updateSeverityDto);
    // }

    @Patch(':id/severity')
    updateSeverity(@Param('id', ParseIntPipe) id: number, @Body() updateSeverityDto: UpdateSeverityDto) {
        return this.reportsService.updateSeverity(id, updateSeverityDto);
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.reportsService.remove(Number(id));
    // }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.reportsService.remove(id);
    }
}
