import { LocaleResourcesBase } from './types';
export default class Locales<LocaleT, ResourcesT extends LocaleResourcesBase> {
    private _mappings;
    private _currentLocaleResources;
    private _currentLocale;
    constructor(_mappings: Map<LocaleT, ResourcesT>, defaultLocale: LocaleT);
    formatDate(date: Date): string;
    formatTime(date: Date): string;
    formatDateTime(date: Date): string;
    formatNullableDate(date: Date | null, nullString: string): string;
    formatNullableTime(date: Date | null, nullString: string): string;
    formatNullableDateTime(date: Date | null, nullString: string): string;
    readonly locales: Map<LocaleT, ResourcesT>;
    readonly current: ResourcesT;
    readonly currentLocale: LocaleT;
    setLocale(locale: LocaleT): void;
}
