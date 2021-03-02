import { PropertyPath } from 'lodash';
import { isNil } from 'lodash/fp';
import Context from './Context';
import FieldValidator from './FieldValidator';

class RequiredValue<TOuterContext = any> extends FieldValidator<TOuterContext> {
    protected defaultMessage?: string;

    constructor(field: PropertyPath, defaultMessage?: string) {
        super(field);
        this.defaultMessage = defaultMessage;
    }

    protected getErrorMessage(value: any, values: any, errors: any, context: Context<TOuterContext>): string {
        return this.defaultMessage || context.defaultMessages.requiredValue;
    }

    protected getError(value: any, values: any, errors: any, context: Context<TOuterContext>): string | null {
        if (isNil(value)) {
            return this.getErrorMessage(value, values, errors, context);
        }

        return null;
    }
}

export default RequiredValue;
