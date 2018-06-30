import pgp from 'pg-promise';

const dbString = 'postgres://postgres:masterkey@127.0.0.1:5433/frame';
const db = pgp()(dbString);

export default db;