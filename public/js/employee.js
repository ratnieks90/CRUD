import fetch from './fetch';

export default class Employee {

    static getEmployees() {
        return fetch.get('/api/employees');
    }
}