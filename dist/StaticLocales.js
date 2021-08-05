"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StaticLocales {
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
exports.StaticLocales = StaticLocales;
class StaticLocalesWithDefaultLocale extends StaticLocales {
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
exports.StaticLocalesWithDefaultLocale = StaticLocalesWithDefaultLocale;
exports.default = StaticLocales;
//# sourceMappingURL=StaticLocales.js.map