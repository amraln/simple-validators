import { isNumber, isNil, isNaN } from 'lodash/fp';
import Context from './Context';
import RequiredValue from './RequiredValue';

class RequiredNumber<TOuterContext = any> extends RequiredValue<TOuterContext> {
    protected getError(value: any, values: any, errors: any, context: Context<TOuterContext>): string | null {
        if (!isNumber(value) || isNil(value) || isNaN(value)) {
            return this.getErrorMessage(value, values, errors, context);
        }

        return null;
    }
}

export default RequiredNumber;
