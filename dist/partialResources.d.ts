import type { ResourcesType, ResourcesLeafType } from './types';
declare type _PartialResources<T> = {
    [key in keyof T]?: T[key] extends ResourcesLeafType ? T[key] : _PartialResources<T[key]>;
};
export declare type PartialResources<T extends ResourcesType<keyof T>> = _PartialResources<T>;
export declare function completePartialResources<T extends ResourcesType<keyof T>>(values: PartialResources<T>, defaults: T): T;
export {};
