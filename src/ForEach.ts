import { PropertyPath } from 'lodash';
import { get, keys, isEmpty, toPath } from 'lodash/fp';
import Context from './Context';
import Validator from './Validator';

class ForEach<TOuterContext = any> extends Validator<TOuterContext> {
    protected validator: Validator;

    protected field: PropertyPath;

    constructor(field: PropertyPath, validator: Validator) {
        super();
        this.field = field;
        this.validator = validator;
    }

    protected skipExecute(collection: any, errors: any, values: any, context: Context<TOuterContext>): boolean {
        // may be implemented to make the test optional
        return false;
    }

    protected skipItemExecute(
        item: any,
        errors: any,
        collection: any,
        values: any,
        context: Context<TOuterContext>
    ): boolean {
        // may be implemented to make the test optional
        return false;
    }

    public execute(values: any, errors: any, context: Context<TOuterContext>): any {
        const collectionPath = context.getAbsolutePath(this.field);
        const collection = get(collectionPath, values);

        if (isEmpty(collection) || this.skipExecute(collection, errors, values, context)) {
            return errors;
        }

        let nextErrors = errors;

        for (const key of keys(collection)) {
            const item = get(key, collection);

            if (this.skipItemExecute(item, errors, collection, values, context)) {
                continue;
            }

            const itemContext = context.applyPrefix([...toPath(this.field), key]);

            nextErrors = this.validator.execute(values, nextErrors, itemContext);
        }

        return nextErrors;
    }
}

export default ForEach;
