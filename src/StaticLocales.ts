import type { ResourcesType } from './types';

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

  public createResourcesPartialWithDefaultLocale<ResourcesT extends ResourcesType, DefaultLocaleT extends LocaleT>(
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

  public createResourcesPartial<ResourcesT extends ResourcesType>(
    mappings: Readonly<{ [key in DefaultLocaleT]: ResourcesT } & Partial<Record<LocaleT, ResourcesT>>>,
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
