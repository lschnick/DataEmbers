import fs from "node:fs";
import { parse } from "csv-parse";
import { DatabaseSync } from "node:sqlite";
import { create } from "node:domain";

function createTableAndDatabase() {
  const db = new DatabaseSync(":memory:");

  db.exec(`
      CREATE TABLE data(
      latitude INTEGER,
      longitude INTEGER,
      brightness INTEGER,
      year INTEGER,
      month INTEGER,
      day INTEGER,
      time INTEGER,
      confidence TEXT,
      frp INTEGER,
      daynight TEXT
      )
    `);

  return db;
}

function parseViirs(db: DatabaseSync) {
  const insert = db.prepare(
    "INSERT INTO data VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  );

  fs.createReadStream("/api")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row: string[]) => {
      if (row[9] === "l") return;

      const brightness = (parseFloat(row[2]) + parseFloat(row[11])) / 2;

      insert.run(
        parseFloat(row[0]),
        parseFloat(row[1]),
        brightness,
        parseInt(row[5].substring(0, 4), 10),
        parseInt(row[5].substring(5, 7), 10),
        parseInt(row[5].substring(8), 10),
        parseInt(row[6], 10),
        row[9],
        parseFloat(row[12]),
        row[13],
      );
    });
}

function modisConfidence(confidence: number) {
  if (confidence <= 25) {
    return "l";
  } else if (confidence < 75) {
    return "n";
  } else {
    return "h";
  }
}

function parseModis(db: DatabaseSync) {
  const insert = db.prepare(
    "INSERT INTO data VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  );

  fs.createReadStream("/api")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row: string[]) => {
      const conf = modisConfidence(parseFloat(row[9]));
      if (conf === "l") return;

      const brightness = (parseFloat(row[2]) + parseFloat(row[11])) / 2;

      insert.run(
        parseFloat(row[0]),
        parseFloat(row[1]),
        brightness,
        parseInt(row[5].substring(0, 4), 10),
        parseInt(row[5].substring(5, 7), 10),
        parseInt(row[5].substring(8), 10),
        parseInt(row[6], 10),
        conf,
        parseFloat(row[12]),
        row[13],
      );
    });
}

const db = createTableAndDatabase();
parseViirs(db);
