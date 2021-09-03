"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeResourcesLeafType = exports.isResourcesLeafType = void 0;
const CustomResourcesLeafTypeSymbol = Symbol('StaticLocales.CustomResourcesLeafType');
function isResourcesLeafType(node) {
    if (typeof node === 'string')
        return true;
    if (typeof node === 'function')
        return true;
    if (Array.isArray(node))
        return true;
    if (node[CustomResourcesLeafTypeSymbol] === true)
        return true;
    return false;
}
exports.isResourcesLeafType = isResourcesLeafType;
function makeResourcesLeafType(type) {
    type[CustomResourcesLeafTypeSymbol] = true;
    return type;
}
exports.makeResourcesLeafType = makeResourcesLeafType;
//# sourceMappingURL=types.js.map