export interface StaticLocaleResourcesStrict<LocaleT extends string | number, ResourcesT>
{
  locales: Readonly<Record<LocaleT, ResourcesT>>,
  get(locale: LocaleT): ResourcesT,
}

export interface StaticLocaleResources<LocaleT extends string | number, ResourcesT>
{
  locales: Readonly<Partial<Record<LocaleT, ResourcesT>>>,
  get(locale: LocaleT): ResourcesT,
}

export class StaticLocales<LocaleT extends string | number>
{
  public createResourcesStrict<ResourcesT>(
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

  public createResourcesPartialWithDefaultLocale<ResourcesT, DefaultLocaleT extends LocaleT>(
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

  public createResourcesPartial<ResourcesT>(
    mappings: Readonly<{ [key in DefaultLocaleT]: ResourcesT } & Partial<Record<LocaleT, ResourcesT>>>,
  ): StaticLocaleResources<LocaleT, ResourcesT>
  {
    const This = this;
    return {
      locales: mappings,
      get(locale: LocaleT)
      {
        if (mappings[locale])
          return mappings[locale];
        return mappings[This._defaultLocale];
      },
    };
  }

  public get defaultLocale()
  {
    return this._defaultLocale;
  }
}

export default StaticLocales;
