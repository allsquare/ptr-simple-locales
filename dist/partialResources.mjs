import { isResourcesLeafType } from './types';
export function completePartialResources(values, defaults) {
    const res = {};
    for (const key in defaults) {
        const value = values[key];
        if (value === undefined)
            res[key] = defaults[key];
        else {
            if (isResourcesLeafType(value))
                res[key] = value;
            else
                res[key] = completePartialResources(value, defaults[key]);
        }
    }
    return res;
}
//# sourceMappingURL=partialResources.js.map