import { load,EnvType } from 'ts-dotenv'

export const schema = {
    PORT: Number,
    DB_HOST: String,
    DB_USER: String,
    DB_PASSWORD: String,
    DB_NAME: String,
    DB_PORT: Number,
    DB_DIALECT: String,
};

export type Env = EnvType<typeof schema>

export let env:Env

export const loadEnv = ():void => {
    env = load(schema)
}