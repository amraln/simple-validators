import { isString, isEmpty } from 'lodash/fp';
import Context from './Context';
import RequiredValue from './RequiredValue';

class RequiredString<TOuterContext = any> extends RequiredValue<TOuterContext> {
    protected getError(value: any, values: any, errors: any, context: Context<TOuterContext>): string | null {
        if (!isString(value) || isEmpty(value)) {
            return this.getErrorMessage(value, values, errors, context);
        }

        return null;
    }
}

export default RequiredString;
