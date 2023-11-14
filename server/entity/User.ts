import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { generateToken } from './../utils/token'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  hashedPassword: string

  setPassword(password: string) {
    this.hashedPassword = bcrypt.hashSync(password, 12)
  }

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.hashedPassword)
  }

  generateToken(): string {
    return generateToken(this.id, this.username)
  }
}
