import { DataSource } from "typeorm";

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "mydatabase",
    synchronize: true,
    logging: false,
    entities: [
        "entity/**/*.ts"
    ],
});
