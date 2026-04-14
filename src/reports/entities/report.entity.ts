import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

@Entity('reports')
export class Report {
    // constructor (
    //     public id: number,
    //     public title: string,
    //     public content: string,
    //     public category: ReportCategory,
    //     public status: ReportStatus,
    //     public severity: ReportSeverity,
    //     public userId: number,
    //     public comments: any[],
    //     public files: any[],
    //     public createdAt: Date,
    //     public updatedAt: Date
    // ) {}

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('text')
    content!: string;

    @Column({
        type: 'enum',
        enum: ReportCategory,
    })
    category!: ReportCategory;

    @Column({
        type: 'enum',
        enum: ReportStatus,
        default: ReportStatus.OPEN,
    })
    status!: ReportStatus;

    @Column({
        type: 'enum',
        enum: ReportSeverity,
        default: ReportSeverity.LOW,
    })
    severity!: ReportSeverity;

    @ManyToOne(() => User, user => user.reports)
    @JoinColumn({ name: 'userId' }) // Foreign key column
    user!: User;

    @Column()
    userId!: number;

    // @OneToMany(() => Comment, comment => comment.report)
    // comments?: Comment[];

    // @OneToMany(() => File, file => file.report)
    // files?: File[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}