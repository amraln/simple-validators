import { toPath } from 'lodash/fp';
import Context from './Context';
import defaultMessages from './defaultMessages';

export type ValidateOptions = Partial<Omit<Context, 'outerContext' | 'getAbsolutePath' | 'applyPrefix'>> & {
    initialErrors?: object;
};

class Validator<TOuterContext = any> {
    public execute(values: any, errors: any, context: Context<TOuterContext>): any {
        return errors;
    }

    public validate(values: any, outerContext?: TOuterContext, options: ValidateOptions = {}): object | undefined {
        const { initialErrors, ...customContext } = options;

        const context: Context<TOuterContext> = {
            prefix: [],
            outerContext,
            defaultMessages,
            getAbsolutePath(path) {
                const arrayPath = toPath(path);

                if (arrayPath.length && arrayPath[0] === '$$') {
                    return arrayPath;
                }

                return [...toPath(this.prefix), ...arrayPath];
            },
            applyPrefix(prefix) {
                return {
                    ...this,
                    prefix: this.getAbsolutePath(prefix),
                };
            },
            ...customContext,
        };

        return this.execute(values, initialErrors, context);
    }
}

export default Validator;
