import mysql from "mysql2/promise";

let pool;

export function getDb() {
  if (!pool) {
    pool = mysql.createPool({
      host: "127.0.0.1",
      user: "u958652474_familieplanadm",
      password: "pRSRUjjwtn6",
      database: "u958652474_famileplan",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool;
}
