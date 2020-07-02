import _ from 'lodash';
import popup from './popup';
import loader from './loader';
import employeeService from '../employeeService';
import notification from './notification';
import validator from './validator';
import uiElement from './uiElement';
//constants
import {FIELDS, NOTIFICATION_TYPE, STATE_TYPES, TABLE_ROW, VALIDATOR_FLAG} from '../constants';

class EmployeeUi {
    constructor() {
        this.employees = [];
        this.container = document.querySelector('[data-employees]');
        this.counterContainer = document.querySelector('[data-total]');
        const addNewEmployee = document.querySelector('[data-new-employee]');

        this.deleteEventHandler = this.deleteEventHandler.bind(this);
        this.editEventHandler = this.editEventHandler.bind(this);
        this.addEventHandler = this.addEventHandler.bind(this);
        this.viewEventHandler = this.viewEventHandler.bind(this);
        this.confirmAddHandler = this.confirmAddHandler.bind(this);

        addNewEmployee.addEventListener('click', this.addEventHandler);
    }

    init() {
        loader.showLoader();
        employeeService.getEmployees().then(resp => {
            loader.hideLoader();
            this.employees = resp.data ? resp.data : [];
            this.renderTable(this.employees);
            this.updateState(window.location.pathname);
        }).catch(error => {
            loader.hideLoader();
            notification.pushNotification(error.toString(), NOTIFICATION_TYPE.warning);
        })
    }

    addEventHandler() {
        window.history.pushState('add', 'Add employee', '/add');
        this.renderAddForm();
    }

    editEventHandler(e) {
        let id = e.target.parentNode.parentNode.dataset.id;
        window.history.pushState('edit', 'Edit employee', `/edit/${id}`);
        this.renderEditForm(id);
    }

    deleteEventHandler(e) {
        let id = e.target.parentNode.parentNode.dataset.id;
        window.history.pushState('delete', 'Delete employee', `/delete/${id}`);
        this.renderDeleteDialog(id);
    }

    viewEventHandler(e) {
        if (e.target.tagName === TABLE_ROW){
            let id = e.target.parentNode.dataset.id;
            window.history.pushState('view', 'View single employee', `/view/${id}`);
            this.renderViewPopup(id);
        }
    }

    cancelEventHandler() {
        popup.closePopup();
    }

    confirmDeleteHandler(id, index) {
        loader.showLoader();
        employeeService.deleteEmployee(id).then(resp => {
            loader.hideLoader();
            this.employees.splice(index, 1);
            this.renderTable(this.employees);
            popup.closePopup();
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
                popup.closePopup();
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
                popup.closePopup();
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
            //render edit form
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
        //render add form
        const addForm = uiElement.form('Add new employee', null, this.confirmAddHandler);
        //insert content to popup
        popup.showPopup(addForm);
    }

    renderViewPopup(id) {
        const index = _.findIndex(this.employees, {'id': Number(id)});
        if (index !== -1) {
            const employee = this.employees[index];
            //render view block
            const block = uiElement.viewBlock(employee);
            //insert content to popup
            popup.showPopup(block);
        } else {
            notification.pushNotification('Employee not found', NOTIFICATION_TYPE.warning);
        }
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
            const tableBody = uiElement.tableBody(
                data,
                this.editEventHandler,
                this.deleteEventHandler,
                this.viewEventHandler
            );
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

    updateState(path) {
        let [type, value] = path.substring(1).split('/');
        let id = value ? value : null;
        switch (type) {
            case STATE_TYPES.add:
                this.renderAddForm();
                break;
            case STATE_TYPES.edit:
                this.renderEditForm(id);
                break;
            case STATE_TYPES.delete:
                this.renderDeleteDialog(id);
                break;
            case STATE_TYPES.view:
                this.renderViewPopup(id);
                break;
            default:
                popup.hidePopup();
        }
    }
}

export default new EmployeeUi();