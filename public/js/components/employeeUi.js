import _ from 'lodash';
import popup from './popup';
import loader from './loader';
import employeeService from '../employeeService';
import UiElement from './uiElement';
import notification from './notification';
import validator from './validator';
import {FIELDS, NOTIFICATION_TYPE, VALIDATOR_FLAG} from "../constants";
import uiElement from "./uiElement";

class EmployeeUi {
    constructor() {
        this.employees = [];
        this.container = document.querySelector('[data-employees]');
        this.deleteEventHandler = this.deleteEventHandler.bind(this);
        this.editEventHandler = this.editEventHandler.bind(this);
    }

    init() {
        loader.showLoader();
        employeeService.getEmployees().then(resp => {
            loader.hideLoader();
            this.employees = resp.data ? resp.data : [];
            this.renderTable(this.employees);
            this.renderEditForm(15);
        }).catch(error => {
            loader.hideLoader();
            notification.pushNotification(error.toString(), NOTIFICATION_TYPE.warning);
        })
    }

    renderNoResults(title, parentNode) {
        const noData = document.createElement('h2');
        noData.textContent = title;
        noData.classList.add('no-data');
        parentNode.appendChild(noData);
    }

    renderTable(data) {
        this.container.innerHTML = '';
        if (!data || data.length === 0) {
            this.renderNoResults('Employees not found', this.container)
        } else {
            const table = UiElement.tableBase();
            const tableBody = UiElement.tableBody(data, this.editEventHandler, this.deleteEventHandler)
            table.appendChild(tableBody);
            this.container.appendChild(table);
        }
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
        let data = {};
        const fields = event.target.parentNode.elements;
        //validate fields
        const errors = validator.validate([
            [fields[FIELDS.name], [VALIDATOR_FLAG.required, `${VALIDATOR_FLAG.min_length}|5`]],
            [fields[FIELDS.surname], [VALIDATOR_FLAG.required, `${VALIDATOR_FLAG.min_length}|5`]],
            [fields[FIELDS.email], [VALIDATOR_FLAG.required, VALIDATOR_FLAG.email]]
        ])

        if(errors.length > 0) {
            uiElement.errorsBlock(errors, event.target.parentNode);
        }else {
            loader.showLoader();
            Object.entries(FIELDS).forEach(([key, fieldName]) => {
                data[fieldName] = fields[fieldName].value
            })
            employeeService.editEmployee(id, data).then( resp => {
                loader.hideLoader();
                this.employees[index] = {id: Number(id), ...data};
                console.log(this.employees)
                this.renderTable(this.employees);
                popup.hidePopup();
                notification.pushNotification(resp.message, NOTIFICATION_TYPE.success);
            }).catch( error => {
                loader.hideLoader();
                notification.pushNotification(error.toString(), NOTIFICATION_TYPE.warning);
            })
        }
    }

    renderDeleteDialog(id) {
        console.log(id, this.employees)
        const index = _.findIndex(this.employees, {'id': Number(id)});
        if (index !== -1) {
            const employee = this.employees[index];
            const title = `Delete employee ${employee.name} ${employee.surname}?`;
            //render delete confirmation dialog
            const deleteDialog = UiElement.deleteDialog(title, this.cancelEventHandler, () => {this.confirmDeleteHandler(id, index)})

            //insert content to popup
            popup.showPopup(deleteDialog);
        }else {
            notification.pushNotification('Employee not found', NOTIFICATION_TYPE.warning);
        }
    }

    renderEditForm(id) {
        const index = _.findIndex(this.employees, {'id': Number(id)});
        if (index !== -1) {
            const employee = this.employees[index];
            const title = `Edit employee ${employee.name} ${employee.surname}`;
            //render delete confirmation dialog
            const editForm = UiElement.form(title,  employee, (e) => {this.confirmEditHandler(e, id, index)});
            //insert content to popup
            popup.showPopup(editForm);
        }else {
            notification.pushNotification('Employee not found', NOTIFICATION_TYPE.warning);
        }
    }
}

export default new EmployeeUi();