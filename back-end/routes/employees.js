const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employeesController');

/* API routes */
router.get('/employees', (req, res) => {
    employeeController.getEmployees(req, res)
});
router.get('/employees/:id', (req, res) => {
    employeeController.getEmployee(req, res)
});
router.put('/employees/:id', (req, res) => {
    employeeController.updateEmployee(req, res)
});
router.post('/employees', (req, res) => {
    employeeController.addEmployee(req, res)
});
router.delete('/employees/:id', (req, res) => {
    employeeController.deleteEmployee(req, res)
});

module.exports = router;