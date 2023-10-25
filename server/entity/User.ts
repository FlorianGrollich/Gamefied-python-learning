import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    hashedPassword: string;

    private plainPassword?: string;

    setPassword(password: string) {
        this.plainPassword = password;
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.hashedPassword);
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword() {
        if (this.plainPassword) {
            const salt = await bcrypt.genSalt(12);
            this.hashedPassword = await bcrypt.hash(this.plainPassword, salt);
            this.plainPassword = undefined;
        }
    }
}
