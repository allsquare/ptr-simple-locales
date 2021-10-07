const CustomResourcesLeafTypeSymbol = Symbol('StaticLocales.CustomResourcesLeafType');

type CustomResourcesLeafType = { [CustomResourcesLeafTypeSymbol]: true };
export type ResourcesLeafType = string | Function | Array<any> | CustomResourcesLeafType;
export type ResourcesNodeType = _ResourcesType | ResourcesLeafType;
export type ResourcesType<KeyType extends string | number | symbol> = Record<KeyType, ResourcesNodeType>;
interface _ResourcesType extends ResourcesType<string | number | symbol> {} //Needed to prevent circular types

export function isResourcesLeafType(node: ResourcesLeafType | object): node is ResourcesLeafType
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
