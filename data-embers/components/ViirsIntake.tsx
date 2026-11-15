"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import fs from "node:fs";
import { parse } from "csv-parse";
import { Database } from "node:sqlite"
import { create } from "node:domain";

interface CsvRow {
  lattitude: number;
  longitude: number;
  acq_date: number;
  acq_time: number;
  confidence: number;
  frp: number;
  brightness: number;
  day: boolean;
}

export default function ViirsTable() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [headers, setHeaders] = useState<(keyof CsvRow)[]>([]);
  const [rows, setRows] = useState<CsvRow[]>([]);
  useEffect(() => {
    async function fetchViirs() {
      try {
        const response = await fetch("/api");
        const csvData = await response.text();
        console.log(csvData);

        if (!response.ok) {
          throw new Error("Unable to load users.");
        }

        setText(csvData);
        Papa.parse<CsvRow>(csvData, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (results) => {
            setHeaders((results.meta.fields as (keyof CsvRow)[]) || []);
            setRows(results.data);
          },
        });
      } catch {
        setError("Unable to load users.");
      } finally {
        setIsLoading(false);
      }
    }

    void fetchViirs();
  }, []);

  function createTableAndDatabase() {
    const db = new Database(':memory:');

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

  function parseViirs(db: Database) {
    fs.createReadStream("/api")
      .pipe(parse({delimiter: ",", from_line: 2}))
      .on("data", function (row) {
        db.serialize(function () {
          db.run(
            'INSERT INTO data VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [row[0], row[1], (row[2] + row[12])/2, parseInt(row[5].substring(0, 4)), parseInt(row[5].substring(5, 7)), parseInt(row[5].substring(8)), row[6], row[9], row[12], row[13]]
          );
        });
      });
  }

  const db = createTableAndDatabase();
  parseViirs(db);

  return (
    <>
      {" "}
      <div>
        {rows.length > 0 && (
          <table
            border={1}
            style={{ marginTop: "1rem", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header} style={{ padding: "8px" }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header) => (
                    <td
                      key={`${rowIndex}-${header}`}
                      style={{ padding: "8px" }}
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

// function parseCSV(csv: string) {
//   const lines = csv.trim().split("\n");
//   if (lines.length <= 1) return []; // Returns empty array if no fires found

//   const headers = lines[0].split(",");
//   return lines.slice(1).map((line) => {
//     const values = line.split(",");
//     return headers.reduce((obj, header, index) => {
//       obj[header.trim()] = values[index]?.trim();
//       return obj;
//     }, {});
//   });
// }
