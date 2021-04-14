import Context from './Context';
import Validator from './Validator';

export type OnlyChecker<TOuterContext> = (values: any, errors: any, context: Context<TOuterContext>) => boolean;

class OnlyValidator<TOuterContext = any> extends Validator<TOuterContext> {
    protected check: OnlyChecker<TOuterContext>;

    protected validator: Validator<TOuterContext>;

    constructor(check: OnlyChecker<TOuterContext>, validator: Validator<TOuterContext>) {
        super();
        this.validator = validator;
        this.check = check;
    }

    public execute(values: any, errors: any, context: Context<TOuterContext>): any {
        if (this.check(values, errors, context)) {
            return this.validator.execute(values, errors, context);
        }

        return errors;
    }
}

export default OnlyValidator;
