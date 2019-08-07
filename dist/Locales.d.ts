import { LocaleResourcesBase } from './types';
export interface LocaleStorage<LocaleT> {
    store(locale: LocaleT): any;
    get(): LocaleT | null;
    clear(): void;
}
export default class Locales<LocaleT, ResourcesT extends LocaleResourcesBase> {
    private _mappings;
    private _storage?;
    private _currentLocaleResources;
    private _currentLocale;
    constructor(_mappings: Map<LocaleT, ResourcesT>, defaultLocale: LocaleT, _storage?: LocaleStorage<LocaleT> | undefined);
    formatDate(date: Date): string;
    formatTime(date: Date): string;
    formatDateTime(date: Date): string;
    formatNullableDate(date: Date | null, nullString: string): string;
    formatNullableTime(date: Date | null, nullString: string): string;
    formatNullableDateTime(date: Date | null, nullString: string): string;
    readonly locales: Map<LocaleT, ResourcesT>;
    readonly current: ResourcesT;
    readonly currentLocale: LocaleT;
    setLocale(locale: LocaleT, store?: boolean): boolean;
}
