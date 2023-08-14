import mysql from 'mysql2';
// const mysql = require('mysql2');

import config from '../config';

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = config;

const db = () => {
  const conn = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
  });

  conn.connect((err: any) => {
    if (err) {
      console.error(`\nError when trying to connect database: \n ${err.message}`);
      return;
    }

    console.log('\nConnected to MySQL successfully!');
  });

  return { conn };

}


export default db;