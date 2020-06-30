import _ from 'lodash';
import popup from './popup';
import loader from './loader';
import employeeService from '../employeeService';
import notification from './notification';
import validator from './validator';
import uiElement from "./uiElement";
//constants
import {FIELDS, NOTIFICATION_TYPE, VALIDATOR_FLAG} from "../constants";

class EmployeeUi {
    constructor() {
        this.employees = [];
        this.container = document.querySelector('[data-employees]');
        this.counterContainer = document.querySelector('[data-total]');
        this.deleteEventHandler = this.deleteEventHandler.bind(this);
        this.editEventHandler = this.editEventHandler.bind(this);
        this.addEventHandler = this.addEventHandler.bind(this);
        this.confirmAddHandler = this.confirmAddHandler.bind(this);

        const addNewEmployee = document.querySelector('[data-new-employee]');
        addNewEmployee.addEventListener('click', this.addEventHandler);
    }

    init() {
        loader.showLoader();
        employeeService.getEmployees().then(resp => {
            loader.hideLoader();
            this.employees = resp.data ? resp.data : [];
            this.renderTable(this.employees);
            //this.renderEditForm(15);
        }).catch(error => {
            loader.hideLoader();
            notification.pushNotification(error.toString(), NOTIFICATION_TYPE.warning);
        })
    }

    addEventHandler() {
        this.renderAddForm();
    }

    editEventHandler(e) {
        let id = e.target.parentNode.parentNode.dataset.id;
        this.renderEditForm(id);
    }

    deleteEventHandler(e) {
        let id = e.target.parentNode.parentNode.dataset.id;
        this.renderDeleteDialog(id);
    }

    cancelEventHandler() {
        popup.hidePopup();
    }

    confirmDeleteHandler(id, index) {
        loader.showLoader();
        employeeService.deleteEmployee(id).then(resp => {
            loader.hideLoader();
            this.employees.splice(index, 1);
            this.renderTable(this.employees);
            popup.hidePopup();
            notification.pushNotification(resp.message, NOTIFICATION_TYPE.success);
        }).catch(error => {
            loader.hideLoader();
            notification.pushNotification(error.toString(), NOTIFICATION_TYPE.warning);
        })
    }

    confirmEditHandler(event, id, index) {
        event.preventDefault();
        const fields = event.target.parentNode.elements;
        const errors = this.validateFields(fields);
        if (errors.length > 0) {
            uiElement.errorsBlock(errors, event.target.parentNode);
        } else {
            let data = {};
            loader.showLoader();
            Object.entries(FIELDS).forEach(([key, fieldName]) => {
                data[fieldName] = fields[fieldName].value
            })
            employeeService.editEmployee(id, data).then(resp => {
                loader.hideLoader();
                this.employees[index] = {id: Number(id), ...data};
                this.renderTable(this.employees);
                popup.hidePopup();
                notification.pushNotification(resp.message, NOTIFICATION_TYPE.success);
            }).catch(error => {
                loader.hideLoader();
                notification.pushNotification(error.toString(), NOTIFICATION_TYPE.warning);
            })
        }
    }

    confirmAddHandler(event) {
        event.preventDefault();
        const fields = event.target.parentNode.elements;
        const errors = this.validateFields(fields);
        if (errors.length > 0) {
            uiElement.errorsBlock(errors, event.target.parentNode);
        } else {
            let data = {};
            loader.showLoader();
            Object.entries(FIELDS).forEach(([key, fieldName]) => {
                data[fieldName] = fields[fieldName].value
            })
            employeeService.addEmployee(data).then(resp => {
                loader.hideLoader();
                this.employees.push(resp.data)
                this.renderTable(this.employees);
                popup.hidePopup();
                notification.pushNotification(resp.message, NOTIFICATION_TYPE.success);
            }).catch(error => {
                loader.hideLoader();
                notification.pushNotification(error.toString(), NOTIFICATION_TYPE.warning);
            })
        }

    }

    renderDeleteDialog(id) {
        const index = _.findIndex(this.employees, {'id': Number(id)});
        if (index !== -1) {
            const employee = this.employees[index];
            const title = `Delete employee ${employee.name} ${employee.surname}?`;
            //render delete confirmation dialog
            const deleteDialog = uiElement.deleteDialog(title, this.cancelEventHandler, () => {
                this.confirmDeleteHandler(id, index)
            })

            //insert content to popup
            popup.showPopup(deleteDialog);
        } else {
            notification.pushNotification('Employee not found', NOTIFICATION_TYPE.warning);
        }
    }

    renderEditForm(id) {
        const index = _.findIndex(this.employees, {'id': Number(id)});
        if (index !== -1) {
            const employee = this.employees[index];
            const title = `Edit employee ${employee.name} ${employee.surname}`;
            //render delete confirmation dialog
            const editForm = uiElement.form(title, employee, (e) => {
                this.confirmEditHandler(e, id, index)
            });
            //insert content to popup
            popup.showPopup(editForm);
        } else {
            notification.pushNotification('Employee not found', NOTIFICATION_TYPE.warning);
        }
    }

    renderAddForm() {
        const addForm = uiElement.form('Add new employee', null, this.confirmAddHandler);
        //insert content to popup
        popup.showPopup(addForm);
    }

    renderNoResults(title, parentNode) {
        const noData = document.createElement('h2');
        noData.textContent = title;
        noData.classList.add('no-data');
        parentNode.appendChild(noData);
    }

    renderTable(data) {
        this.counterContainer.textContent = `Employees - ${data.length}`;
        this.container.innerHTML = '';
        if (!data || data.length === 0) {
            this.renderNoResults('Employees not found', this.container)
        } else {
            const table = uiElement.tableBase();
            const tableBody = uiElement.tableBody(data, this.editEventHandler, this.deleteEventHandler)
            table.appendChild(tableBody);
            this.container.appendChild(table);
        }
    }

    validateFields(fields) {
        //validate fields
        return validator.validate([
            [fields[FIELDS.name], [VALIDATOR_FLAG.required, `${VALIDATOR_FLAG.min_length}|5`]],
            [fields[FIELDS.surname], [VALIDATOR_FLAG.required, `${VALIDATOR_FLAG.min_length}|5`]],
            [fields[FIELDS.email], [VALIDATOR_FLAG.required, VALIDATOR_FLAG.email]]
        ])
    }
}

export default new EmployeeUi();