import { StaticLocalesWithDefaultLocale, StaticLocaleResources, StaticLocaleResourcesStrict } from './StaticLocales';
export interface LocaleStorage<LocaleT extends string | number> {
    store(locale: LocaleT): any;
    get(): LocaleT | null;
    clear(): void;
}
export interface LocaleResources<LocaleT extends string | number, DefaultLocaleT extends LocaleT, ResourcesT> extends StaticLocaleResources<LocaleT, ResourcesT> {
    current: ResourcesT;
    parent: Locales<LocaleT, DefaultLocaleT>;
}
export interface LocaleResourcesStrict<LocaleT extends string | number, DefaultLocaleT extends LocaleT, ResourcesT> extends StaticLocaleResourcesStrict<LocaleT, ResourcesT> {
    current: ResourcesT;
    parent: Locales<LocaleT, DefaultLocaleT>;
}
export default class Locales<LocaleT extends string | number, DefaultLocaleT extends LocaleT> extends StaticLocalesWithDefaultLocale<LocaleT, DefaultLocaleT> {
    private _storage?;
    private _currentLocale;
    constructor(defaultLocale: DefaultLocaleT, _storage?: LocaleStorage<LocaleT> | undefined);
    private _completeStaticLocaleResources;
    readonly currentLocale: LocaleT;
    private _setLocale;
    setLocale(locale: LocaleT, store?: boolean): boolean;
    createResourcesStrict<ResourcesT>(mappings: Readonly<Record<LocaleT, ResourcesT>>): LocaleResourcesStrict<LocaleT, DefaultLocaleT, ResourcesT>;
    createResourcesPartialWithDefaultLocale<ResourcesT, _DefaultLocaleT extends LocaleT>(defaultLocale: _DefaultLocaleT, mappings: Readonly<{
        [key in _DefaultLocaleT]: ResourcesT;
    } & Partial<Record<LocaleT, ResourcesT>>>): LocaleResources<LocaleT, DefaultLocaleT, ResourcesT>;
    createResourcesPartial<ResourcesT>(mappings: Readonly<{
        [key in DefaultLocaleT]: ResourcesT;
    } & Partial<Record<LocaleT, ResourcesT>>>): LocaleResources<LocaleT, DefaultLocaleT, ResourcesT>;
}
