const {db} = require('../database/config');

class EmployeesController {

    static getEmployees(req, res) {
        let sql = "select * from employees";
        let params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            });
        });
    }

    static getEmployee(req, res) {
        let sql = "select * from employees where id = ?";
        let params = [req.params.id];
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            res.json({
                "message": "success",
                "data": row
            });
        });
    }

    static updateEmployee(req, res) {
        let data = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
            description: req.body.description
        };
        db.run(
            `UPDATE employees set 
           name = ?, 
           surname = ?, 
           email = ?, 
           phone = COALESCE(?,phone), 
           description = COALESCE(?,description) 
           WHERE id = ?`,
            [data.name, data.surname, data.email, data.phone, data.description, req.params.id],
            function (err) {
                if (err) {
                    res.status(400).json({"error": err.message});
                    return;
                }
                res.status(201)
                    .json({
                        message: `Employee ${data.name} ${data.surname} successfully updated`,
                        data: data,
                        changes: this.changes
                    });
            });
    }

    static addEmployee(req, res) {
        let data = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
            description: req.body.description
        };
        const sql = 'INSERT INTO employees (name, surname, email, phone, description) VALUES (?,?,?,?,?)';
        const params = [data.name, data.surname, data.email, data.phone, data.description];
        db.run(sql, params, function (err) {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            res.json({
                "message": `Employee ${data.name} ${data.surname} added successfully`,
                "data": {id: this.lastID, ...data},
            });
        });
    }

    static deleteEmployee(req, res) {
        db.run(
            'DELETE FROM employees WHERE id = ?',
            req.params.id,
            function (err) {
                if (err) {
                    res.status(400).json({"error": res.message});
                    return;
                }
                res.json({"message": "Employee successfully deleted", changes: this.changes});
            });
    }
}

module.exports = EmployeesController;