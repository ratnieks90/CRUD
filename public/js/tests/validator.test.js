import validator from '../components/validator';
import {VALIDATOR_FLAG} from "../constants";

describe('Validator: : ', () => {

    const errorStrings = {
        nameRequired: 'name field is required',
        minLengthFive: 'name field length must be at least 5',
        emailFormat: 'name field have invalid email format'
    }

    let nameField;

    beforeEach(() => {
        nameField = document.createElement('input');
        nameField.setAttribute('name', 'name');
    })

    test('should pass required flag', () => {
        nameField.setAttribute('value', 'John Doe');
        let fields = [
            [nameField, [VALIDATOR_FLAG.required]],
        ];
        expect(validator.validate(fields)).toEqual(expect.arrayContaining([]));
    })

    test('should pass min length|5 flag', () => {
        nameField.setAttribute('value', 'John Doe');
        let fields = [
            [nameField, [`${VALIDATOR_FLAG.min_length}|5`]],
        ];
        expect(validator.validate(fields)).toEqual(expect.arrayContaining([]));
    })

    test('should pass email flag', () => {
        nameField.setAttribute('value', 'JohnDoe@inbox.lv');
        let fields = [
            [nameField, [VALIDATOR_FLAG.email]],
        ];
        expect(validator.validate(fields)).toEqual(expect.arrayContaining([]));
    })

    test('should return empty array if data not passed or undefined', () => {
        expect(validator.validate()).toEqual(expect.arrayContaining([]));
    })

    test('should return error on required flag', () => {
        let fields = [
            [nameField, [VALIDATOR_FLAG.required]],
        ];
        expect(validator.validate(fields)).toContain(errorStrings.nameRequired);
    })

    test('should return error on min_length|5 flag', () => {
        nameField.setAttribute('value', 'John');
        let fields = [
            [nameField, [`${VALIDATOR_FLAG.min_length}|5`]],
        ];
        expect(validator.validate(fields)).toContain(errorStrings.minLengthFive);
    })

    test('should return error on email flag', () => {
        nameField.setAttribute('value', 'John');
        let fields = [
            [nameField, [VALIDATOR_FLAG.email]],
        ];
        expect(validator.validate(fields)).toContain(errorStrings.emailFormat);
    })
})