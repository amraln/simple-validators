import Context from './Context';
import Validator from './Validator';

class Compose<TOuterContext = any> extends Validator<TOuterContext> {
    protected validators: Validator[];

    constructor(validators: Validator[]) {
        super();
        this.validators = validators;
    }

    public execute(values: any, errors: any, context: Context<TOuterContext>): any {
        return this.validators.reduce(
            (nextErrors, validator) => validator.execute(values, nextErrors, context),
            errors
        );
    }
}

export default Compose;
