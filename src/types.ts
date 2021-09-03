export type ResourcesLeafType = string | Function | Array<any>;
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
  return false;
}
