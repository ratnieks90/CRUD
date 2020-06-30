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

    static tableBody(employees, editEvent, deleteEvent) {
        const tBody = document.createElement('tbody');

        employees.forEach((employee) => {
            //action buttons
            const actionsColumn = document.createElement('td');
            actionsColumn.appendChild(UiElement.button('Edit', 'edit', editEvent));
            actionsColumn.appendChild(UiElement.button('Delete', 'delete', deleteEvent));

            const row = document.createElement('tr');
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

    static form(text, employee, formSubmitHandler) {
        const form = document.createElement('form');
        const title = document.createElement('h3');

        title.textContent = text;

        const nameField = UiElement.field('Name', 'name', 'name', employee ? employee.name : '');
        const surnameField = UiElement.field('Surname', 'surname', 'surname', employee ? employee.surname : '');
        const emailField = UiElement.field('Email', 'email', 'email', employee ? employee.email : '');
        const phoneField = UiElement.field('Phone', 'phone', 'phone', employee ? employee.phone : '');
        const descriptionField = UiElement.field('Description', 'description', 'description', employee ? employee.description : '');
        const submitButton = UiElement.button('Submit form', 'confirm', formSubmitHandler);

        form.appendChild(title);
        form.appendChild(nameField);
        form.appendChild(surnameField);
        form.appendChild(emailField);
        form.appendChild(phoneField);
        form.appendChild(descriptionField);
        form.appendChild(submitButton);

        return form;
    }

    static field(labelText, inputName, id, value){
        //creating field wrapper
        const field = document.createElement('div');
        field.classList.add('form-field');
        //creating label
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.textContent = labelText;
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