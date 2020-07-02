import axios from 'axios';
import employeeService from './employeeService';

jest.mock('axios');

describe('Employee service get employees: ', () => {
    let response;
    let employees;
    let errorResponse;

    beforeEach(() => {
        employees = [
            {
                "id": 1,
                "name": "John1",
                "surname": "Doe1",
                "email": "johnDoe1@gmail.com",
                "phone": 28365031,
                "description": "test description"
            },
            {
                "id": 2,
                "name": "John0",
                "surname": "Doe0",
                "email": "johnDoe0@gmail.com",
                "phone": 28365031,
                "description": "test description 2"
            }
        ]
        response = {
            data: {
                message: 'success',
                data: employees
            }
        }
        errorResponse = {
            response: {
                data: {
                    error: 'something went wrong'
                }
            }
        }
    })

    test('should return response object', () => {
        axios.get.mockResolvedValue(response);

        return employeeService.getEmployees().then(response => {
            expect(response).toBeDefined();
        })
    })

    test('should contain message', () => {
        axios.get.mockResolvedValue(response);

        return employeeService.getEmployees().then(response => {
            expect(response.message).toBeDefined();
        })
    })

    test('should message key contain success message', () => {
        axios.get.mockResolvedValue(response);

        return employeeService.getEmployees().then(response => {
            expect(response.message).toBe('success');
        })
    })

    test('should response contain data', () => {
        axios.get.mockResolvedValue(response);

        return employeeService.getEmployees().then(response => {
            expect(response.data).toBeDefined();
        })
    })

    test('should response data contain employees array', () => {
        axios.get.mockResolvedValue(response);

        return employeeService.getEmployees().then(response => {
            expect(response.data).toEqual(expect.arrayContaining(employees));
        })
    })

    test('should response data array length be equal to 2', () => {
        axios.get.mockResolvedValue(response);

        return employeeService.getEmployees().then(response => {
            expect(response.data.length).toBe(2);
        })
    })

    test('should catch contain error string', () => {
        axios.get.mockRejectedValue(errorResponse);

        return employeeService.getEmployees().catch(resp => {
            expect(resp).toBe('something went wrong');
        })
    })
});

describe('Employee service add employee: ', () => {
    let response;
    let employee;
    let message;
    let errorResponse;

    beforeEach(() => {
        employee = {
            "id": 1,
            "name": "John1",
            "surname": "Doe1",
            "email": "johnDoe1@gmail.com",
            "phone": 28365031,
            "description": "test description"
        };
        message = `Employee ${employee.name} ${employee.surname} added successfully`;
        response = {
            data: {
                message: message,
                data: employee
            }
        }
    });

    test('should return response object', () => {
        axios.post.mockResolvedValue(response);

        return employeeService.addEmployee().then(response => {
            expect(response).toBeDefined();
        })
    })

    test('should response object contain message key', () => {
        axios.post.mockResolvedValue(response);

        return employeeService.addEmployee().then(response => {
            expect(response.message).toBeDefined();
        })
    })

    test('should message key contain success message', () => {
        axios.post.mockResolvedValue(response);

        return employeeService.addEmployee().then(response => {
            expect(response.message).toBe(message);
        })
    })

    test('should response contain data object', () => {
        axios.post.mockResolvedValue(response);

        return employeeService.addEmployee().then(response => {
            expect(response.data).toBeDefined();
        })
    })

    test('should data contain employee object', () => {
        axios.post.mockResolvedValue(response);

        return employeeService.addEmployee().then(response => {
            expect(response.data).toEqual(expect.objectContaining(employee));
        })
    })

    test('should catch contain error string', () => {
        axios.get.mockRejectedValue(errorResponse);

        return employeeService.addEmployee().catch(resp => {
            expect(resp).toBe('something went wrong');
        })
    })
})
