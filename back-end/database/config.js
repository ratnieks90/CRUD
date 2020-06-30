const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "./back-end/database/employees.db"

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database(DBSOURCE);

/* Init employees table if don't exist */
const init = () => {
    db.run("CREATE TABLE if not exists employees (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " name TEXT NOT NULL," +
        " surname TEXT NOT NULL," +
        " email TEXT NOT NULL," +
        " phone INTEGER," +
        " description TEXT NOT NULL" +
        ")", error => {
        if (error) {
            console.log("table already exist")
        } else {
            const insert = 'INSERT INTO employees (name, surname, email, phone, description) VALUES (?,?,?,?,?)'
            db.run(insert, ["mister", "test", "admin@example2.com", "3223433", "admin322"])
            db.run(insert, ["mister", "test2", "admin@example.com", "3223433433", "admin3222"])
        }
    });
}

module.exports = {
    db: db,
    init: init
};