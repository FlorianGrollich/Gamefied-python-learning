import { DataSource } from 'typeorm'
import { BananaEntities } from '../entity/_BananaEntities'

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  synchronize: true,
  logging: false,
  entities: BananaEntities,
  migrations: [],
  subscribers: [],
})