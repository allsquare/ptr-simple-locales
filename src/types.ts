const CustomResourcesLeafTypeSymbol = Symbol('StaticLocales.CustomResourcesLeafType');

type CustomResourcesLeafType = { [CustomResourcesLeafTypeSymbol]: true };
export type ResourcesLeafType = string | Function | Array<any> | CustomResourcesLeafType;
export type ResourcesNodeType = ResourcesType | ResourcesLeafType;
export type ResourcesType = { [key: string]: ResourcesNodeType };

export function isResourcesLeafType(node: ResourcesLeafType | Record<string, unknown>): node is ResourcesLeafType
{
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

export function makeResourcesLeafType<T extends object>(type: T): T & CustomResourcesLeafType
{
  type[CustomResourcesLeafTypeSymbol] = true;
  return type as any;
}
