import { env } from "./env"

export const PORT = env.PORT



// DB configuration
export const DB_HOST = env.DB_HOST
export const DB_USER = env.DB_USER
export const DB_PASSWORD = env.DB_PASSWORD
export const DB_PORT = env.DB_PORT
export const DB_NAME = env.DB_NAME
export const DB_DIALECT = env.DB_DIALECT
export const TOKEN_KEY = env.TOKEN_KEY
export const DAY_IN_MILLIS = 1000*60*60*24
