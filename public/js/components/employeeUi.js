import _ from 'lodash';
import popup from './popup';
import {ACTIONS} from '../constants';
import loader from './loader';
import employeeService from '../employeeService';
import UiElement from './UiElement';

class EmployeeUi {
    constructor() {
        this.table = null;
        this.employees = [];
        this.container = document.querySelector('[data-employees]');
    }

    init() {
        loader.showLoader();
        employeeService.getEmployees().then(resp => {
            loader.hideLoader();
            this.employees = resp.data ? resp.data : [];
            if (!this.employees || this.employees.length === 0) {
                this.renderNoResults('Employees not found', this.container)
            } else {
                this.renderTable(this.employees);
            }
        }).catch(error => {
            console.log(error)
            loader.hideLoader();
        })
    }

    renderNoResults(title, parentNode) {
        const noData = document.createElement('h2');
        noData.textContent = title;
        noData.classList.add('no-data');
        parentNode.appendChild(noData);
    }

    renderTable(data) {
        this.table = document.createElement('table');
        this.table.classList.add('employees-table');
        const tHead = document.createElement('thead');
        tHead.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        `;

        this.table.addEventListener('click', (e) => {
            let currentElement = e.target;
            switch (currentElement.dataset.action) {
                case ACTIONS.delete:
                    let id = currentElement.parentNode.parentNode.dataset.id
                    this.renderDeleteDialog(id);
                    break;
                case ACTIONS.edit:
                    console.log('edit')
                    break;
                default:
                    console.log('show')
            }
        })
        this.table.classList.add('visible');
        const tBody = document.createElement('tbody');

        data.forEach((employee) => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', employee.id);
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.surname}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.description}</td>
                <td>
                    <button data-action="edit" class="edit">Edit</button>
                    <button data-action="delete" class="delete">Delete</button>
                </td>
            `;
            tBody.appendChild(row);
        });
        this.table.appendChild(tBody);
        this.table.appendChild(tHead);
        this.container.appendChild(this.table);
    }

    renderDeleteDialog(id) {
        const index = _.findIndex(this.employees, {'id': Number(id)});
        if (index !== -1) {
            const employee = this.employees[index];
            const dialog = document.createElement('div');
            const title = document.createElement('h3');
            title.textContent = `Delete employee ${employee.name} ${employee.surname}?`;

            const cancelButton = UiElement.button('Cancel', 'cancel', () => {
                popup.hidePopup();
            })
            const submitButton = UiElement.button('Delete', 'confirm', () => {
                employeeService.deleteEmployee(id).then(resp => {
                    console.log(resp)
                })
            });

            dialog.appendChild(title);
            dialog.appendChild(cancelButton);
            dialog.appendChild(submitButton);
            popup.showPopup(dialog);
        }
    }
}

export default new EmployeeUi();