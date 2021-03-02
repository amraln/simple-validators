import { PropertyPath } from 'lodash';
import { set, isNil, get } from 'lodash/fp';
import Context from './Context';
import Validator from './Validator';

class FieldValidator<TOuterContext = any> extends Validator<TOuterContext> {
    protected field: PropertyPath;

    constructor(field: PropertyPath) {
        super();
        this.field = field;
    }

    protected getValue(values: any, errors: any, context: Context<TOuterContext>): any {
        return get(context.getAbsolutePath(this.field), values);
    }

    protected getError(value: any, values: any, errors: any, context: Context<TOuterContext>): string | null {
        // will need to be implemented by child classes
        return null;
    }

    protected skipExecute(value: any, values: any, errors: any, context: Context<TOuterContext>): boolean {
        // may be implemented to make the test optional
        return false;
    }

    public execute(values: any, errors: any, context: Context<TOuterContext>): any {
        const value = this.getValue(values, errors, context);

        if (this.skipExecute(value, values, errors, context)) {
            return errors;
        }

        const error = this.getError(value, values, errors, context);

        if (!isNil(error)) {
            const absolutePath = context.getAbsolutePath(this.field);

            return set(absolutePath, error, errors);
        }

        return errors;
    }
}

export default FieldValidator;
