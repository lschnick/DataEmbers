import sqlite from 'node:sqlite';
import { DatabaseSync } from 'node:sqlite';


function averageTimeline(db: DatabaseSync) {
    const array = db.prepare('SELECT month as dataDiv, COUNT(*) as numFires, AVG(frp) as avgFrp GROUP BY month').all();
    return array;
}

function timeline(db: DatabaseSync) {
    const array = db.prepare('SELECT year as dataDiv, COUNT(*) as numFires, AVG(frp) as avgFrp GROUP BY year').all();
    return array;
}