const db_host = process.env.DB_HOST || '127.0.0.1';
const db_port: number = parseInt( process.env.DB_PORT ) || 5432;
const db_username = process.env.DB_USER || 'julius';
const db_password = process.env.DB_PASSWORD || 'juliuspass';
const db_schema = process.env.DB_SCHEMA || 'juliusreport';
const orm_sync = ( process.env.DB_ORM_SYNC === 'true' ) || false;

export class BancoConfig {
    constructor(
        readonly type: 'postgres' = 'postgres',
        readonly host: string = db_host,
        readonly port: number = db_port,
        readonly login: string = db_username,
        readonly password = db_password,
        readonly schema = db_schema,
        readonly sync = orm_sync
    ) { }
}
