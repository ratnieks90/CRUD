import {VALIDATOR_FLAG} from '../constants';

export default class Validator {

    static validate(fields) {
        let errors = [];
        //let value = input.value;
        fields.forEach( field => {
            let input = field[0];
            let value = input.value;
            let flags = field[1];
            for (let flag of flags) {
                if (flag === VALIDATOR_FLAG.required) {
                    if (value.trim().length === 0) {
                        errors.push(`${input.name} field is required`);
                        break;
                    }
                }
                if (flag.split('|')[0] === VALIDATOR_FLAG.min_length) {
                    let length = flag.split('|')[1];
                    if (value.trim().length <= (length - 1)) {
                        errors.push(`${input.name} field length must be at least ${length}`);
                        break;
                    }
                }
                if (flag.split('|')[0] === VALIDATOR_FLAG.email) {
                    if (!/(.+)@(.+){2,}\.(.+){2,}/.test(value.trim())) {
                        errors.push(`${input.name} field have invalid email format`)
                        break;
                    }
                }
            }
        })

        return errors;
    }
}