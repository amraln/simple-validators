import { PropertyPath } from 'lodash';
import { CustomValidatorHandler } from './CustomValidator';
import Validator from './Validator';
import * as methods from './methods';

export const requiredValue = <TOuterContext = any>(field: PropertyPath, message?: string) =>
    new methods.RequiredValue<TOuterContext>(field, message);

export const requiredString = <TOuterContext = any>(field: PropertyPath, message?: string) =>
    new methods.RequiredString<TOuterContext>(field, message);

export const requiredNumber = <TOuterContext = any>(field: PropertyPath, message?: string) =>
    new methods.RequiredNumber<TOuterContext>(field, message);

export const requiredDate = <TOuterContext = any>(field: PropertyPath, message?: string) =>
    new methods.RequiredDate<TOuterContext>(field, message);

export const compose = <TOuterContext = any>(...validators: Validator<TOuterContext>[]) =>
    new methods.Compose<TOuterContext>(validators);

export const nest = <TOuterContext = any>(path: PropertyPath, validator: Validator<TOuterContext>) =>
    new methods.Nest<TOuterContext>(path, validator);

export const forEach = <TOuterContext = any>(field: PropertyPath, validator: Validator<TOuterContext>) =>
    new methods.ForEach<TOuterContext>(field, validator);

export const custom = <TOuterContext = any>(field: PropertyPath, validator: CustomValidatorHandler<TOuterContext>) =>
    new methods.CustomValidator<TOuterContext>(field, validator);
