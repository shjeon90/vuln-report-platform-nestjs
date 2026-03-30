
export enum ReportCategory {
    XSS = 'XSS',
    CSRF = 'CSRF',
    SQLI = 'SQL_INJECTION',
    OTHER = 'OTHER'
}

export enum ReportStatus {
    OPEN = 'OPEN',
    IN_REVIEW = 'IN_REVIEW',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export enum ReportSeverity {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL'
}

export class Report {
    constructor (
        public id: number,
        public title: string,
        public content: string,
        public category: ReportCategory,
        public status: ReportStatus,
        public severity: ReportSeverity,
        public userId: number,
        public comments: any[],
        public files: any[],
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}