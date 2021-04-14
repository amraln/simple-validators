import { PropertyName, PropertyPath } from 'lodash';

type Context<TOuterContext = any> = {
    prefix: PropertyPath;
    outerContext?: TOuterContext;
    defaultMessages: { [key: string]: string };
    getAbsolutePath: (path: PropertyPath) => Array<PropertyName>;
    applyPrefix: (prefix: PropertyPath) => Context<TOuterContext>;
};

export default Context;
