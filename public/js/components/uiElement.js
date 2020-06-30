import {FIELDS} from "../constants";

export default class UiElement {

    static button(text, className, clickEvent) {
        const button = document.createElement('button');
        button.classList.add(className);
        button.textContent = text;
        button.addEventListener('click', clickEvent);
        return button;
    }

    static tableBase() {
        const table = document.createElement('table');
        table.classList.add('employees-table');
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
        table.appendChild(tHead);

        return table;
    }

    static tableBody(employees, editEvent, deleteEvent, viewEvent) {
        const tBody = document.createElement('tbody');

        employees.forEach((employee) => {
            //action buttons
            const actionsColumn = document.createElement('td');
            actionsColumn.appendChild(UiElement.button('Edit', 'edit', editEvent));
            actionsColumn.appendChild(UiElement.button('Delete', 'delete', deleteEvent));

            const row = document.createElement('tr');
            row.addEventListener('click', viewEvent);
            row.setAttribute('data-id', employee.id);
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.surname}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.description}</td>
            `;
            row.appendChild(actionsColumn);
            tBody.appendChild(row);
        });
        return tBody;
    }

    static deleteDialog(text, cancelHandler, deleteConfirmHandler) {

        const dialog = document.createElement('div');
        const title = document.createElement('h3');

        title.textContent = text;

        const cancelButton = UiElement.button('Cancel', 'cancel', cancelHandler);
        const confirmButton = UiElement.button('Delete', 'confirm', deleteConfirmHandler);

        dialog.appendChild(title);
        dialog.appendChild(cancelButton);
        dialog.appendChild(confirmButton);

        return dialog;
    }

    static viewBlock(employee) {

        const block = document.createElement('div');
        const descriptionBlock = document.createElement('dl');
        descriptionBlock.classList.add('employee-details');
        Object.entries(employee).forEach(([key, value]) => {
            let dt = document.createElement('dt');
            dt.textContent = key.toUpperCase();
            let dd = document.createElement('dd');
            dd.textContent = value.toString();
            descriptionBlock.appendChild(dt);
            descriptionBlock.appendChild(dd);
        })
        block.appendChild(descriptionBlock);

        return block;
    }

    static form(text, employee, formSubmitHandler) {
        const form = document.createElement('form');
        const title = document.createElement('h3');

        title.textContent = text;

        const nameField = UiElement.field(
            'Name',
            'name',
            'name',
            employee ? employee.name : '',
            true);
        const surnameField = UiElement.field(
            'Surname',
            'surname',
            'surname',
            employee ? employee.surname : '',
            true);
        const emailField = UiElement.field(
            'Email',
            'email',
            'email',
            employee ? employee.email : '',
            true);
        const phoneField = UiElement.field(
            'Phone',
            'phone',
            'phone',
            employee ? employee.phone : '');
        const descriptionField = UiElement.field(
            'Description',
            'description',
            'description',
            employee ? employee.description : '');
        const submitButton = UiElement.button(
            'Submit form',
            'confirm',
            formSubmitHandler);

        form.appendChild(title);
        form.appendChild(nameField);
        form.appendChild(surnameField);
        form.appendChild(emailField);
        form.appendChild(phoneField);
        form.appendChild(descriptionField);
        form.appendChild(submitButton);

        return form;
    }

    static errorsBlock(errors, container) {
        let errorsList;
        errorsList = document.querySelector('[data-errors]');
        if (!errorsList) {
            errorsList = document.createElement('ul');
            errorsList.classList.add('errors-list');
            errorsList.setAttribute('data-errors', '');
        }
        errorsList.innerHTML = '';
        errors.forEach(error => {
            let errorNode = document.createElement('li');
            errorNode.textContent = error;
            errorsList.appendChild(errorNode);
        })
        container.prepend(errorsList);
    }

    static field(labelText, inputName, id, value, required = false) {
        //creating field wrapper
        const field = document.createElement('div');
        field.classList.add('form-field');
        //creating label
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.textContent = labelText;
        if(required) {
            label.classList.add('required')
        }
        //creating input
        const input = document.createElement('input');

        input.setAttribute('name', inputName);
        input.setAttribute('value', value);
        input.setAttribute('id', id);

        field.appendChild(label);
        field.appendChild(input);

        return field;
    }
}