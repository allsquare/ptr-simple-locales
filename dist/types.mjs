const CustomResourcesLeafTypeSymbol = Symbol('StaticLocales.CustomResourcesLeafType');
export function isResourcesLeafType(node) {
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
export function makeResourcesLeafType(type) {
    type[CustomResourcesLeafTypeSymbol] = true;
    return type;
}
//# sourceMappingURL=types.js.map