import { Report } from "src/reports/entities/report.entity";


export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export class User {
    constructor (
        public id: number,
        public email: string,
        public password: string,
        public username: string,
        public role: UserRole,
        public createdAt: Date,
        public reports: Report[],
        public comments: any[]
    ) {}
}