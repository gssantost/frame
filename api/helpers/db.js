import pgp from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const dbString = process.env.DB_STRING;
const db = pgp()(dbString);

export default db;