const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "./back-end/database/employees.db";

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database(DBSOURCE);

/* Init employees table if don't exist */
const init = () => {
    db.run("CREATE TABLE if not exists employees (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " name TEXT NOT NULL," +
        " surname TEXT NOT NULL," +
        " email TEXT NOT NULL UNIQUE," +
        " phone INTEGER," +
        " description TEXT" +
        ")", error => {
        if (error) {
            console.log("table already exist");
        }
    });
};

module.exports = {
    db: db,
    init: init
};