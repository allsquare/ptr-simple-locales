import {
  StaticLocalesWithDefaultLocale,
  StaticLocaleResources,
  StaticLocaleResourcesStrict,
} from './StaticLocales';

export interface LocaleStorage<LocaleT extends string | number>
{
  store(locale: LocaleT),
  get(): LocaleT | null,
  clear(): void,
}

export interface LocaleResources<
  LocaleT extends string | number,
  DefaultLocaleT extends LocaleT,
  ResourcesT,
> extends StaticLocaleResources<LocaleT, ResourcesT>
{
  current: ResourcesT,
  parent: Locales<LocaleT, DefaultLocaleT>,
}

export interface LocaleResourcesStrict<
  LocaleT extends string | number,
  DefaultLocaleT extends LocaleT,
  ResourcesT,
> extends StaticLocaleResourcesStrict<LocaleT, ResourcesT>
{
  current: ResourcesT,
  parent: Locales<LocaleT, DefaultLocaleT>,
}

export default class Locales<
  LocaleT extends string | number,
  DefaultLocaleT extends LocaleT,
> extends StaticLocalesWithDefaultLocale<LocaleT, DefaultLocaleT>
{
  private _currentLocale: LocaleT;

  constructor(
    defaultLocale: DefaultLocaleT,
    private _storage?: LocaleStorage<LocaleT>,
  )
  {
    super(defaultLocale);
    if (_storage)
    {
      const storedLocale = _storage.get();
      if (storedLocale !== null)
      {
        this._setLocale(storedLocale);
        return;
      }
    }
    this._setLocale(this.defaultLocale);
  }

  private _completeStaticLocaleResources<T extends StaticLocaleResources<LocaleT, any>>(resources: T)
  {
    const This = this;
    return {
      ...resources,

      get current()
      {
        return resources.get(This._currentLocale);
      },

      get parent()
      {
        return This;
      },
    };
  }

  public get currentLocale()
  {
    return this._currentLocale;
  }

  private _setLocale(locale: LocaleT)
  {
    this._currentLocale = locale;
  }

  //Truthy return value kept for compatibility with anterior versions
  public setLocale(locale: LocaleT, store: boolean = true): boolean
  {
    this._setLocale(locale);
    if (store && this._storage)
      this._storage.store(locale);
    return true;
  }

  public createResourcesStrict<ResourcesT>(
    mappings: Readonly<Record<LocaleT, ResourcesT>>,
  ): LocaleResourcesStrict<LocaleT, DefaultLocaleT, ResourcesT>
  {
    const resources = super.createResourcesStrict(mappings);
    return this._completeStaticLocaleResources(resources);
  }

  public createResourcesPartialWithDefaultLocale<ResourcesT, _DefaultLocaleT extends LocaleT>(
    defaultLocale: _DefaultLocaleT,
    mappings: Readonly<{ [key in _DefaultLocaleT]: ResourcesT } & Partial<Record<LocaleT, ResourcesT>>>,
  ): LocaleResources<LocaleT, DefaultLocaleT, ResourcesT>
  {
    const resources = super.createResourcesPartialWithDefaultLocale<ResourcesT, _DefaultLocaleT>(defaultLocale, mappings);
    return this._completeStaticLocaleResources(resources);
  }

  public createResourcesPartial<ResourcesT>(
    mappings: Readonly<{ [key in DefaultLocaleT]: ResourcesT } & Partial<Record<LocaleT, ResourcesT>>>,
  ): LocaleResources<LocaleT, DefaultLocaleT, ResourcesT>
  {
    const resources = super.createResourcesPartial<ResourcesT>(mappings);
    return this._completeStaticLocaleResources(resources);
  }
};
