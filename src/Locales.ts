import * as moment from 'moment';
import { observable, action } from 'mobx';
import { LocaleResourcesBase } from './types';

export interface LocaleStorage<LocaleT>
{
  store(locale: LocaleT),
  get(): LocaleT | null,
  clear(): void,
}

export default class Locales<LocaleT, ResourcesT extends LocaleResourcesBase>
{
  @observable private _currentLocaleResources: ResourcesT;
  @observable private _currentLocale: LocaleT;

  constructor(private _mappings: Map<LocaleT, ResourcesT>, private _defaultLocale: LocaleT, private _storage?: LocaleStorage<LocaleT>)
  {
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

  public get locales()
  {
    return this._mappings;
  }

  public get current()
  {
    return this._currentLocaleResources;
  }

  public get currentLocale()
  {
    return this._currentLocale;
  }

  public get defaultLocale()
  {
    return this._defaultLocale;
  }

  @action public setLocale(locale: LocaleT, store: boolean = true): boolean
  {
    const res = this._mappings.get(locale);
    if (res)
    {
      moment.locale(res.moment);
      this._currentLocale = locale;
      this._currentLocaleResources = res;
      if (store && this._storage)
        this._storage.store(locale);
      return true;
    }
    return false;
  }
};
