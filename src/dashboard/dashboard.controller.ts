import { Controller, Get, Query } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
    constructor() {}

    @Get('statistics')
    getStatistics() {
        return 'TODO';
    }

    @Get('cves/recent')
    getRecentCVEs(@Query('limit') limit?: string) {
        return 'TODO';
    }

    @Get('cves/search')
    searchCVE(@Query('query') keyword: string) {
        return 'TODO';
    }
}
