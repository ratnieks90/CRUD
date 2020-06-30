import fetch from './fetch';

export default class EmployeeService {

    static getEmployees() {
        return fetch.get('/api/employees');
    }

    static deleteEmployee(id) {
        return fetch.delete(`/api/employees/${id}`);
    }

    static editEmployee(id, data) {
        return fetch.put(`/api/employees/${id}`, data);
    }
}