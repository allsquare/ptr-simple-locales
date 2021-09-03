import type { ResourcesType } from './types';
import type { PartialResources } from './partialResources';

import { completePartialResources } from './partialResources';

export interface StaticLocaleResourcesStrict<LocaleT extends string | number, ResourcesT extends ResourcesType>
{
  locales: Readonly<Record<LocaleT, ResourcesT>>,
  get(locale: LocaleT): ResourcesT,
}

export interface StaticLocaleResources<LocaleT extends string | number, ResourcesT extends ResourcesType>
{
  locales: Readonly<Partial<Record<LocaleT, ResourcesT>>>,
  get(locale: LocaleT): ResourcesT,
}

export class StaticLocales<LocaleT extends string | number>
{
  public createResourcesStrict<ResourcesT extends ResourcesType>(
    mappings: Readonly<Record<LocaleT, ResourcesT>>,
  ): StaticLocaleResourcesStrict<LocaleT, ResourcesT>
  {
    return {
      locales: mappings,
      get(locale: LocaleT)
      {
        return mappings[locale];
      },
    };
  }

  public createResourcesPartialLocalesWithDefaultLocale<ResourcesT extends ResourcesType, DefaultLocaleT extends LocaleT>(
    defaultLocale: DefaultLocaleT,
    mappings: Readonly<{ [key in DefaultLocaleT]: ResourcesT } & Partial<Record<LocaleT, ResourcesT>>>,
  ): StaticLocaleResources<LocaleT, ResourcesT>
  {
    return {
      locales: mappings,
      get(locale: LocaleT)
      {
        if (mappings[locale])
          return mappings[locale];
        return mappings[defaultLocale];
      },
    };
  }

  public createResourcesPartialResourcesWithDefaultLocale<ResourcesT extends ResourcesType, DefaultLocaleT extends LocaleT>(
    defaultLocale: DefaultLocaleT,
    mappings: Readonly<{ [key in DefaultLocaleT]: ResourcesT } & Record<LocaleT, PartialResources<ResourcesT>>>,
  ): StaticLocaleResources<LocaleT, ResourcesT>
  {
    const defaultResources = mappings[defaultLocale];
    const completedResourcesMappings = new Map<LocaleT, ResourcesT>();
    completedResourcesMappings.set(defaultLocale, defaultResources);
    return {
      locales: mappings,
      get(locale: LocaleT)
      {
        const resources = completedResourcesMappings.get(locale);
        if (resources)
          return resources;
        const completedResources = completePartialResources<ResourcesT>(mappings[locale], defaultResources);
        completedResourcesMappings.set(locale, completedResources);
        return completedResources;
      },
    };
  }

  public createResourcesPartialWithDefaultLocale<ResourcesT extends ResourcesType, DefaultLocaleT extends LocaleT>(
    defaultLocale: DefaultLocaleT,
    mappings: Readonly<{ [key in DefaultLocaleT]: ResourcesT } & Partial<Record<LocaleT, PartialResources<ResourcesT>>>>,
  ): StaticLocaleResources<LocaleT, ResourcesT>
  {
    const defaultResources = mappings[defaultLocale];
    const completedResourcesMappings = new Map<LocaleT, ResourcesT>();
    completedResourcesMappings.set(defaultLocale, defaultResources);
    return {
      locales: mappings,
      get(locale: LocaleT)
      {
        const resources = completedResourcesMappings.get(locale);
        if (resources)
          return resources;
        const incompleteResources = mappings[locale];
        if (!incompleteResources)
          return defaultResources;
        const completedResources = completePartialResources<ResourcesT>(mappings[locale], defaultResources);
        completedResourcesMappings.set(locale, completedResources);
        return completedResources;
      },
    };
  }
}

export class StaticLocalesWithDefaultLocale<
  LocaleT extends string | number,
  DefaultLocaleT extends LocaleT,
> extends StaticLocales<LocaleT>
{
  constructor(private _defaultLocale)
  {
    super();
  }

  public createResourcesPartialLocales<ResourcesT extends ResourcesType>(
    mappings: Readonly<{ [key in DefaultLocaleT]: ResourcesT } & Partial<Record<LocaleT, ResourcesT>>>,
  ): StaticLocaleResources<LocaleT, ResourcesT>
  {
    return this.createResourcesPartialLocalesWithDefaultLocale<ResourcesT, DefaultLocaleT>(this._defaultLocale, mappings);
  }

  public createResourcesPartialResources<ResourcesT extends ResourcesType>(
    mappings: Readonly<{ [key in DefaultLocaleT]: ResourcesT } & Record<LocaleT, PartialResources<ResourcesT>>>,
  ): StaticLocaleResources<LocaleT, ResourcesT>
  {
    return this.createResourcesPartialResourcesWithDefaultLocale<ResourcesT, DefaultLocaleT>(this._defaultLocale, mappings);
  }

  public createResourcesPartial<ResourcesT extends ResourcesType>(
    mappings: Readonly<{ [key in DefaultLocaleT]: ResourcesT } & Partial<Record<LocaleT, PartialResources<ResourcesT>>>>,
  ): StaticLocaleResources<LocaleT, ResourcesT>
  {
    return this.createResourcesPartialWithDefaultLocale<ResourcesT, DefaultLocaleT>(this._defaultLocale, mappings);
  }

  public get defaultLocale()
  {
    return this._defaultLocale;
  }
}

export default StaticLocales;
