import pg from 'pg'

export const pool = new pg.Pool({
    hsot : 'localhost',
    user : 'postgres',
    port : 5432,
    password : '',
    database: 'usersfazt'
})

