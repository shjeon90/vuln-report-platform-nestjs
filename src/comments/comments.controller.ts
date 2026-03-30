import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService
    ) {}

    @Post()
    create(@Body() body) {
        return 'TODO';
    }

    @Get('report/:reportId')
    findByReport(@Param('reportId') reportId: string) {
        return 'TODO';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return 'TODO';
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return 'TODO';
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return 'TODO';
    }
}
