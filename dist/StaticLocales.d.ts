import type { ResourcesType } from './types';
import type { PartialResources } from './partialResources';
export interface StaticLocaleResourcesStrict<LocaleT extends string | number, ResourcesT extends ResourcesType<keyof ResourcesT>> {
    locales: Readonly<Record<LocaleT, ResourcesT>>;
    get(locale: LocaleT): ResourcesT;
}
export interface StaticLocaleResources<LocaleT extends string | number, ResourcesT extends ResourcesType<keyof ResourcesT>> {
    locales: Readonly<Partial<Record<LocaleT, ResourcesT>>>;
    get(locale: LocaleT): ResourcesT;
}
export declare class StaticLocales<LocaleT extends string | number> {
    createResourcesStrict<ResourcesT extends ResourcesType<keyof ResourcesT>>(mappings: Readonly<Record<LocaleT, ResourcesT>>): StaticLocaleResourcesStrict<LocaleT, ResourcesT>;
    createResourcesPartialLocalesWithDefaultLocale<ResourcesT extends ResourcesType<keyof ResourcesT>, DefaultLocaleT extends LocaleT>(defaultLocale: DefaultLocaleT, mappings: Readonly<{
        [key in DefaultLocaleT]: ResourcesT;
    } & Partial<Record<LocaleT, ResourcesT>>>): StaticLocaleResources<LocaleT, ResourcesT>;
    createResourcesPartialResourcesWithDefaultLocale<ResourcesT extends ResourcesType<keyof ResourcesT>, DefaultLocaleT extends LocaleT>(defaultLocale: DefaultLocaleT, mappings: Readonly<{
        [key in DefaultLocaleT]: ResourcesT;
    } & Record<LocaleT, PartialResources<ResourcesT>>>): StaticLocaleResources<LocaleT, ResourcesT>;
    createResourcesPartialWithDefaultLocale<ResourcesT extends ResourcesType<keyof ResourcesT>, DefaultLocaleT extends LocaleT>(defaultLocale: DefaultLocaleT, mappings: Readonly<{
        [key in DefaultLocaleT]: ResourcesT;
    } & Partial<Record<LocaleT, PartialResources<ResourcesT>>>>): StaticLocaleResources<LocaleT, ResourcesT>;
}
export declare class StaticLocalesWithDefaultLocale<LocaleT extends string | number, DefaultLocaleT extends LocaleT> extends StaticLocales<LocaleT> {
    private _defaultLocale;
    constructor(_defaultLocale: any);
    createResourcesPartialLocales<ResourcesT extends ResourcesType<keyof ResourcesT>>(mappings: Readonly<{
        [key in DefaultLocaleT]: ResourcesT;
    } & Partial<Record<LocaleT, ResourcesT>>>): StaticLocaleResources<LocaleT, ResourcesT>;
    createResourcesPartialResources<ResourcesT extends ResourcesType<keyof ResourcesT>>(mappings: Readonly<{
        [key in DefaultLocaleT]: ResourcesT;
    } & Record<LocaleT, PartialResources<ResourcesT>>>): StaticLocaleResources<LocaleT, ResourcesT>;
    createResourcesPartial<ResourcesT extends ResourcesType<keyof ResourcesT>>(mappings: Readonly<{
        [key in DefaultLocaleT]: ResourcesT;
    } & Partial<Record<LocaleT, PartialResources<ResourcesT>>>>): StaticLocaleResources<LocaleT, ResourcesT>;
    get defaultLocale(): any;
}
export default StaticLocales;
