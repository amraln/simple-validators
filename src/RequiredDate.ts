import dayjs from 'dayjs';
import Context from './Context';
import RequiredValue from './RequiredValue';

class RequiredDate<TOuterContext = any> extends RequiredValue<TOuterContext> {
    protected getError(value: any, values: any, errors: any, context: Context<TOuterContext>): string | null {
        if (!value || !dayjs(value).isValid()) {
            return this.getErrorMessage(value, values, errors, context);
        }

        return null;
    }
}

export default RequiredDate;
