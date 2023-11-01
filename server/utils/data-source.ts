import {DataSource} from "typeorm";
import {BananaEntities} from "../entity/_BananaEntities";

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "password",
    database: "mydatabase",
    synchronize: true,
    logging: false,
    entities: BananaEntities,
    migrations: [],
    subscribers: [],
});