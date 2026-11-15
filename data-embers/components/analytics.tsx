import sqlite from 'node:sqlite';
import { DatabaseSync } from 'node:sqlite';

const database = new DatabaseSync(':memory:');

// Execute SQL statements from strings.
database.exec(`
  CREATE TABLE data(
    month INTEGER,
    frp INTEGER
  )
`);
// Create a prepared statement to insert data into the database.
const insert = database.prepare('INSERT INTO data (month, frp) VALUES (?, ?)');
// Execute the prepared statement with bound values.
insert.run(1, 10);
insert.run(2, 15);
insert.run(1, 30);
insert.run(2, 15);
insert.run(2, 30);

// Finalize the prepared statement once it is no longer needed.


function averageTimeline(db: DatabaseSync) {
    const array = db.prepare('SELECT month, COUNT(*) as numFires, AVG(frp) as avgFrp GROUP BY month').all();
    return array;
}

function timeline(db: DatabaseSync) {
    const array = db.prepare('SELECT year, COUNT(*) as numFires, AVG(frp) as avgFrp GROUP BY year').all();
    return array;
}

console.log(averageTimeline(database));