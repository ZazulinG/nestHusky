import {Client} from "pg";

export const PGClient = new Client({
    host: 'localhost',
    port: 5432,
    database: 'test',
    user: 'postgres',
    password: 'user'
})
PGClient.connect()