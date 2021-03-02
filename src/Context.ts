import { PropertyName, PropertyPath } from 'lodash';
import * as defaultMessages from './defaultMessages';

type Context<TOuterContext = any> = {
    prefix: PropertyPath;
    outerContext?: TOuterContext;
    defaultMessages: typeof defaultMessages;
    getAbsolutePath: (path: PropertyPath) => Array<PropertyName>;
    applyPrefix: (prefix: PropertyPath) => Context<TOuterContext>;
};

export default Context;
