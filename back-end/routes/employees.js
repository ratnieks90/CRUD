const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/EmployeesController');

/* API routes */
router.get('/employees', (req, res) => {
    EmployeeController.getEmployees(req, res)
});
router.get('/employees/:id', (req, res) => {
    EmployeeController.getEmployee(req, res)
});
router.put('/employees/:id', (req, res) => {
    EmployeeController.updateEmployee(req, res)
});
router.post('/employees', (req, res) => {
    EmployeeController.addEmployee(req, res)
});
router.delete('/employees/:id', (req, res) => {
    EmployeeController.deleteEmployee(req, res)
});

module.exports = router;