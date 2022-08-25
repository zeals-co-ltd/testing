import sql from 'k6/x/sql';

// The second argument is a MySQL connection string, e.g.
// myuser:mypass@tcp(127.0.0.1:3306)/mydb
const db = sql.open('mysql', 'readonly:fPUeLUfjNCCf7pJE@tcp(192.168.208.2:3306)/fanp');

export function setup() {
  
}

export function teardown() {
  db.close();
}

export default function () {
  let results = sql.query(db, 'SELECT 1');
  
}
