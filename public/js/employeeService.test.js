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
});

describe('Employee service edit employee: ', () => {
    let response;
    let employee;
    let message;
    let errorResponse;

    beforeEach(() => {
        employee = {
            "name": "John1",
            "surname": "Doe1",
            "email": "johnDoe1@gmail.com",
            "phone": 28365031,
            "description": "test description"
        };
        message = `Employee ${employee.name} ${employee.surname} successfully updated`;
        response = {
            data: {
                message: message,
                data: employee,
                changes: 1
            }
        };
        errorResponse = {
            response: {
                data: {
                    error: 'something went wrong'
                }
            }
        }
    });

    test('should return response object', () => {
        axios.put.mockResolvedValue(response);

        return employeeService.editEmployee(1, employee).then(response => {
            expect(response).toBeDefined();
        })
    })

    test('should contain message key', () => {
        axios.put.mockResolvedValue(response);

        return employeeService.editEmployee(1, employee).then(response => {
            expect(response.message).toBeDefined();
        })
    })

    test('should contain changes key', () => {
        axios.put.mockResolvedValue(response);

        return employeeService.editEmployee(1, employee).then(response => {
            expect(response.changes).toBeDefined();
        })
    })

    test('should changes key have value 1', () => {
        axios.put.mockResolvedValue(response);

        return employeeService.editEmployee(1, employee).then(response => {
            expect(response.changes).toEqual(1);
        })
    })

    test('should response contain data', () => {
        axios.put.mockResolvedValue(response);

        return employeeService.editEmployee(1, employee).then(response => {
            expect(response.data).toBeDefined();
        })
    })

    test('should response data contain employee object', () => {
        axios.put.mockResolvedValue(response);

        return employeeService.editEmployee(1, employee).then(response => {
            expect(response.data).toEqual(expect.objectContaining(employee));
        })
    })

    test('should catch contain error string', () => {
        axios.put.mockRejectedValue(errorResponse);

        return employeeService.editEmployee(1, employee).catch(resp => {
            expect(resp).toBe('something went wrong');
        })
    })
});

describe('Employee service delete employee: ', () => {
    let response;
    let message;
    let errorResponse;

    beforeEach(() => {
        message = 'Employee successfully deleted';
        response = {
            data: {
                message: message,
                changes: 1
            }
        };
        errorResponse = {
            response: {
                data: {
                    error: 'something went wrong'
                }
            }
        }
    });

    test('should return response object', () => {
        axios.delete.mockResolvedValue(response);

        return employeeService.deleteEmployee(1).then(response => {
            expect(response).toBeDefined();
        })
    })

    test('should contain message key', () => {
        axios.delete.mockResolvedValue(response);

        return employeeService.deleteEmployee(1).then(response => {
            expect(response.message).toBeDefined();
        })
    })

    test('should contain changes key', () => {
        axios.delete.mockResolvedValue(response);

        return employeeService.deleteEmployee(1).then(response => {
            expect(response.changes).toBeDefined();
        })
    })

    test('should changes key have value 1', () => {
        axios.delete.mockResolvedValue(response);

        return employeeService.deleteEmployee(1).then(response => {
            expect(response.changes).toEqual(1);
        })
    })

    test('should catch contain error string', () => {
        axios.delete.mockRejectedValue(errorResponse);

        return employeeService.deleteEmployee(1).catch(resp => {
            expect(resp).toBe('something went wrong');
        })
    })
})