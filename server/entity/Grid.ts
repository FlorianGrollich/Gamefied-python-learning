import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Grid {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  grid: string
}
