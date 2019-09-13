import { observable, action, computed } from 'mobx';

export interface LocaleStorage<LocaleT>
{
  store(locale: LocaleT),
  get(): LocaleT | null,
  clear(): void,
}

export interface LocaleResources<LocaleT, T>
{
  locales: Map<LocaleT, T>,
  current: T,
  parent: Locales<LocaleT>,
}

export default class Locales<LocaleT>
{
  @observable private _currentLocale: LocaleT;
  private _validLocales: Set<LocaleT> | null = null;

  constructor(
    private _defaultLocale: LocaleT,
    private _storage?: LocaleStorage<LocaleT>,
    validLocales?: Set<LocaleT>,
  )
  {
    if (validLocales)
    {
      if (!validLocales.has(_defaultLocale))
        throw new Error(`Locales: provided validLocales don't include defaultLocale`);
      this._validLocales = new Set(validLocales);
    }
    if (_storage)
    {
      const storedLocale = _storage.get();
      if (storedLocale !== null)
      {
        if (this.setLocale(storedLocale, false))
          return;
        console.warn(`Locales: invalid stored locale: ${storedLocale}`);
        _storage.clear();
      }
    }
    if (!this.setLocale(_defaultLocale, false))
      throw new Error(`Locales: invalid default locale: ${_defaultLocale}`);
  }

  private _checkNewResourcesMappings<ResourcesT>(mappings: Map<LocaleT, ResourcesT>)
  {
    if (!this._validLocales)
    {
      if (!mappings.has(this._defaultLocale))
        throw new Error(`Locales.createResources: missing locale in resources mappings: ${this._defaultLocale}`);
      this._validLocales = new Set(mappings.keys());
      if (!this._validLocales.has(this._currentLocale))
      {
        console.warn(`LocaleResources.createResources: currently selected locale is invalid; using default locale as fallback`);
        this._setLocale(this._currentLocale);
      }
    }
    else
      for (let key of this._validLocales.values())
        if (!mappings.has(key))
          throw new Error(`Locales.createResources: missing locale in resources mappings: ${key}`);
  }

  public createResources<ResourcesT>(mappings: Map<LocaleT, ResourcesT>): LocaleResources<LocaleT, ResourcesT>
  {
    this._checkNewResourcesMappings<ResourcesT>(mappings);

    const This = this;
    const current = computed<ResourcesT>(() => mappings.get(this._currentLocale)!);
    return {
      get locales()
      {
        return mappings;
      },

      get current(): ResourcesT
      {
        return current.get();
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

  public get defaultLocale()
  {
    return this._defaultLocale;
  }

  @action private _setLocale(locale: LocaleT)
  {
    this._currentLocale = locale;
  }

  public setLocale(locale: LocaleT, store: boolean = true): boolean
  {
    if (this._validLocales && !this._validLocales.has(locale))
      return false;
    this._setLocale(locale);
    if (store && this._storage)
      this._storage.store(locale);
    return true;
  }
};
