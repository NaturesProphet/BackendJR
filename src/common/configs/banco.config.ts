const db_host = process.env.DB_HOST || '127.0.0.1';
const db_port: number = parseInt( process.env.DB_PORT ) || 5432;
const db_username = process.env.DB_USER || 'julius';
const db_password = process.env.DB_PASSWORD || 'juliuspass';
const db_schema = process.env.DB_SCHEMA || 'juliusreport';

let orm_sync: boolean;
if ( process.env.DB_ORM_SYNC == 'true' ) {
    orm_sync = true;
} else {
    orm_sync = false;
}
if ( process.env.NODE_ENV != 'production' ) {
    orm_sync = true;
}
if ( !process.env.NODE_ENV ) {
    orm_sync = true;
}

export { db_host, db_password, db_port, db_schema, db_username, orm_sync }