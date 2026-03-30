import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService
    ) {}

    @Post('upload/:reportId')
    upload(@Param('reportId') reportId: string) {
        return 'TODO';
    }

    @Get('report/:reportId')
    getReportFiles(@Param('reportId') reportId: string) {
        return 'TODO';
    }

    @Get(':id/download')
    download(@Param('id') id: string) {
        return 'TODO';
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return 'TODO';
    }
}
