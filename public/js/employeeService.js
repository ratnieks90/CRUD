import fetch from './fetch';

export default class EmployeeService {

    static getEmployees() {
        return fetch.get('/api/employees');
    }

    static deleteEmployee(id) {
        return fetch.delete(`/api/employees/${id}`);
    }

}