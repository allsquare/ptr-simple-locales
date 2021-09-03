"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completePartialResources = void 0;
const types_1 = require("./types");
function completePartialResources(values, defaults) {
    const res = {};
    for (const key in defaults) {
        const value = values[key];
        if (value === undefined)
            res[key] = defaults[key];
        else {
            if ((0, types_1.isResourcesLeafType)(value))
                res[key] = value;
            else
                res[key] = completePartialResources(value, defaults[key]);
        }
    }
    return res;
}
exports.completePartialResources = completePartialResources;
//# sourceMappingURL=partialResources.js.map