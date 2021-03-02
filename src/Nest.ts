import { PropertyPath } from 'lodash';
import { get } from 'lodash/fp';
import Context from './Context';
import Validator from './Validator';

class Nest<TOuterContext = any> extends Validator<TOuterContext> {
    protected validator: Validator;

    protected path: PropertyPath;

    constructor(path: PropertyPath, validator: Validator) {
        super();
        this.path = path;
        this.validator = validator;
    }

    protected skipExecute(nodeValues: any, values: any, errors: any, context: Context<TOuterContext>): boolean {
        // may be implemented to make the test optional
        return false;
    }

    public execute(values: any, errors: any, context: Context<TOuterContext>): any {
        const absolutePath = context.getAbsolutePath(this.path);
        const nodeValues = get(absolutePath, values);

        if (this.skipExecute(nodeValues, values, errors, context)) {
            return errors;
        }

        const nextContext = context.applyPrefix(this.path);

        return this.validator.execute(values, errors, nextContext);
    }
}

export default Nest;
