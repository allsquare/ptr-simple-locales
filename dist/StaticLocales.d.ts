export interface StaticLocaleResourcesStrict<LocaleT extends string | number, ResourcesT> {
    locales: Readonly<Record<LocaleT, ResourcesT>>;
    get(locale: LocaleT): ResourcesT;
}
export interface StaticLocaleResources<LocaleT extends string | number, ResourcesT> {
    locales: Readonly<Partial<Record<LocaleT, ResourcesT>>>;
    get(locale: LocaleT): ResourcesT;
}
export declare class StaticLocales<LocaleT extends string | number> {
    createResourcesStrict<ResourcesT>(mappings: Readonly<Record<LocaleT, ResourcesT>>): StaticLocaleResourcesStrict<LocaleT, ResourcesT>;
    createResourcesPartialWithDefaultLocale<ResourcesT, DefaultLocaleT extends LocaleT>(defaultLocale: DefaultLocaleT, mappings: Readonly<{
        [key in DefaultLocaleT]: ResourcesT;
    } & Partial<Record<LocaleT, ResourcesT>>>): StaticLocaleResources<LocaleT, ResourcesT>;
}
export declare class StaticLocalesWithDefaultLocale<LocaleT extends string | number, DefaultLocaleT extends LocaleT> extends StaticLocales<LocaleT> {
    private _defaultLocale;
    constructor(_defaultLocale: any);
    createResourcesPartial<ResourcesT>(mappings: Readonly<{
        [key in DefaultLocaleT]: ResourcesT;
    } & Partial<Record<LocaleT, ResourcesT>>>): StaticLocaleResources<LocaleT, ResourcesT>;
    readonly defaultLocale: any;
}
export default StaticLocales;
