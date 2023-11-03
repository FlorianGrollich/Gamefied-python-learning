import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    hashedPassword: string;

    setPassword(password: string) {
        this.hashedPassword = bcrypt.hashSync(password, 12);
    }

    validatePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.hashedPassword);
    }
}
