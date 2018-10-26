import * as moment from 'moment';
import { observable, action } from 'mobx';
import { LocaleResourcesBase } from './types';

export default class Locales<LocaleT, ResourcesT extends LocaleResourcesBase>
{
  @observable private _currentLocaleResources: ResourcesT;
  @observable private _currentLocale: LocaleT;

  constructor(private _mappings: Map<LocaleT, ResourcesT>, defaultLocale: LocaleT)
  {
    this.setLocale(defaultLocale);
    if (!this._currentLocaleResources)
      throw new Error(`Locales: invalid default locale: ${defaultLocale}`);
  }

  public formatDate(date: Date): string
  {
    return date.toLocaleDateString(this.current.locale);
  }

  public formatTime(date: Date): string
  {
    return date.toLocaleTimeString(this.current.locale);
  }

  public formatDateTime(date: Date): string
  {
    return date.toLocaleString(this.current.locale);
  }

  public formatNullableDate(date: Date | null, nullString: string)
  {
    return date ? this.formatDate(date) : nullString;
  }

  public formatNullableTime(date: Date | null, nullString: string)
  {
    return date ? this.formatTime(date) : nullString;
  }

  public formatNullableDateTime(date: Date | null, nullString: string)
  {
    return date ? this.formatDateTime(date) : nullString;
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

  @action setLocale(locale: LocaleT)
  {
    const res = this._mappings.get(locale);
    if (res)
    {
      moment.locale(res.moment);
      this._currentLocale = locale;
      this._currentLocaleResources = res;
    }
  }
};
