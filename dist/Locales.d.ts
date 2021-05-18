export interface LocaleStorage<LocaleT> {
    store(locale: LocaleT): any;
    get(): LocaleT | null;
    clear(): void;
}
export interface LocaleResources<LocaleT, T> {
    locales: Map<LocaleT, T>;
    current: T;
    get(locate: LocaleT): T;
    parent: Locales<LocaleT>;
}
export default class Locales<LocaleT> {
    private _defaultLocale;
    private _storage?;
    private _currentLocale;
    private _validLocales;
    constructor(_defaultLocale: LocaleT, _storage?: LocaleStorage<LocaleT> | undefined, validLocales?: Set<LocaleT>);
    private _checkNewResourcesMappings;
    createResources<ResourcesT>(mappings: Map<LocaleT, ResourcesT>): LocaleResources<LocaleT, ResourcesT>;
    readonly currentLocale: LocaleT;
    readonly defaultLocale: LocaleT;
    private _setLocale;
    setLocale(locale: LocaleT, store?: boolean): boolean;
}
