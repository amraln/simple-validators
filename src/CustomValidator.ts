import { PropertyPath } from 'lodash';
import { get, isNil, set } from 'lodash/fp';
import Context from './Context';
import Validator from './Validator';

export type CustomValidatorHandler<TOuterContext> = (
    value: any,
    values: any,
    errors: any,
    context: Context<TOuterContext>
) => string | undefined | null;

class CustomValidator<TOuterContext = any> extends Validator<TOuterContext> {
    protected field: PropertyPath;

    protected validator: CustomValidatorHandler<TOuterContext>;

    protected skipOnErrors: boolean;

    constructor(field: PropertyPath, validator: CustomValidatorHandler<TOuterContext>, skipOnErrors = true) {
        super();
        this.validator = validator;
        this.field = field;
        this.skipOnErrors = skipOnErrors;
    }

    public execute(values: any, errors: any, context: Context<TOuterContext>): any {
        const absolutePath = context.getAbsolutePath(this.field);

        if (this.skipOnErrors) {
            const previousError = get(absolutePath, errors);

            if (!isNil(previousError)) {
                return errors;
            }
        }

        const value = get(absolutePath, values);
        const error = this.validator(value, values, errors, context);

        if (!isNil(error)) {
            return set(absolutePath, error, errors);
        }

        return errors;
    }
}

export default CustomValidator;
