import { Dialect, Sequelize } from "sequelize";

import { DB_USER, DB_HOST, DB_DIALECT, DB_NAME, DB_PASSWORD, DB_PORT } from "../configuration/config";

export const sequelize = new Sequelize({
    dialect: DB_DIALECT as Dialect,
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_NAME
});


