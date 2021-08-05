export class StaticLocales {
    createResourcesStrict(mappings) {
        return {
            locales: mappings,
            get(locale) {
                return mappings[locale];
            },
        };
    }
    createResourcesPartialWithDefaultLocale(defaultLocale, mappings) {
        return {
            locales: mappings,
            get(locale) {
                if (mappings[locale])
                    return mappings[locale];
                return mappings[defaultLocale];
            },
        };
    }
}
export class StaticLocalesWithDefaultLocale extends StaticLocales {
    constructor(_defaultLocale) {
        super();
        this._defaultLocale = _defaultLocale;
    }
    createResourcesPartial(mappings) {
        const This = this;
        return {
            locales: mappings,
            get(locale) {
                if (mappings[locale])
                    return mappings[locale];
                return mappings[This._defaultLocale];
            },
        };
    }
    get defaultLocale() {
        return this._defaultLocale;
    }
}
export default StaticLocales;
//# sourceMappingURL=StaticLocales.js.map