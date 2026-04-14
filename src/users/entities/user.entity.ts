import { Report } from "src/reports/entities/report.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
    // constructor (
    //     public id: number,
    //     public email: string,
    //     public password: string,
    //     public username: string,
    //     public role: UserRole,
    //     public createdAt: Date,
    //     public reports: Report[],
    //     public comments: any[]
    // ) {}
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    username!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role!: UserRole;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => Report, report => report.user)
    reports?: Report[];

    // @OneToMany(() => Comment, comment => comment.user)
    // comments?: Comment[];
}