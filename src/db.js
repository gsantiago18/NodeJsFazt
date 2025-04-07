import pg from 'pg'
import {
    DB_HOST,
    DB_USER,
    DB_NAME,
    DB_PORT,
    DB_PASSWORD
} from './config.js' 

export const pool = new pg.Pool({
    hsot : DB_HOST,
    user : DB_USER,
    port : DB_PORT,
    password : DB_PASSWORD,
    database:DB_NAME
})

