import type { ResourcesType, ResourcesLeafType } from './types';

import { isResourcesLeafType } from './types';

type _PartialResources<T> = {
  [key in keyof T]?: T[key] extends ResourcesLeafType ? T[key] : _PartialResources<T[key]>
};

export type PartialResources<T extends ResourcesType> = _PartialResources<T>;

export function completePartialResources<T extends ResourcesType>(values: PartialResources<T>, defaults: T): T
{
  const res: T = {} as T;
  for (const key in defaults)
  {
    const value = values[key];
    if (value === undefined)
      res[key] = defaults[key];
    else
    {
      if (isResourcesLeafType(value))
        res[key] = value as any/*typescript seem to ignore the type guard function*/;
      else
        res[key] = completePartialResources(value, defaults[key] as any/*typescript seem to ignore the type guard function*/);
    }
  }
  return res;
}
