import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity()
export class Grid {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  grid: string
}
