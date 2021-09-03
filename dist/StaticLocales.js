"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticLocalesWithDefaultLocale = exports.StaticLocales = void 0;
const partialResources_1 = require("./partialResources");
class StaticLocales {
    createResourcesStrict(mappings) {
        return {
            locales: mappings,
            get(locale) {
                return mappings[locale];
            },
        };
    }
    createResourcesPartialLocalesWithDefaultLocale(defaultLocale, mappings) {
        return {
            locales: mappings,
            get(locale) {
                if (mappings[locale])
                    return mappings[locale];
                return mappings[defaultLocale];
            },
        };
    }
    createResourcesPartialResourcesWithDefaultLocale(defaultLocale, mappings) {
        const defaultResources = mappings[defaultLocale];
        const completedResourcesMappings = new Map();
        completedResourcesMappings.set(defaultLocale, defaultResources);
        return {
            locales: mappings,
            get(locale) {
                const resources = completedResourcesMappings.get(locale);
                if (resources)
                    return resources;
                const completedResources = (0, partialResources_1.completePartialResources)(mappings[locale], defaultResources);
                completedResourcesMappings.set(locale, completedResources);
                return completedResources;
            },
        };
    }
    createResourcesPartialWithDefaultLocale(defaultLocale, mappings) {
        const defaultResources = mappings[defaultLocale];
        const completedResourcesMappings = new Map();
        completedResourcesMappings.set(defaultLocale, defaultResources);
        return {
            locales: mappings,
            get(locale) {
                const resources = completedResourcesMappings.get(locale);
                if (resources)
                    return resources;
                const incompleteResources = mappings[locale];
                if (!incompleteResources)
                    return defaultResources;
                const completedResources = (0, partialResources_1.completePartialResources)(mappings[locale], defaultResources);
                completedResourcesMappings.set(locale, completedResources);
                return completedResources;
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
    createResourcesPartialLocales(mappings) {
        return this.createResourcesPartialLocalesWithDefaultLocale(this._defaultLocale, mappings);
    }
    createResourcesPartialResources(mappings) {
        return this.createResourcesPartialResourcesWithDefaultLocale(this._defaultLocale, mappings);
    }
    createResourcesPartial(mappings) {
        return this.createResourcesPartialWithDefaultLocale(this._defaultLocale, mappings);
    }
    get defaultLocale() {
        return this._defaultLocale;
    }
}
exports.StaticLocalesWithDefaultLocale = StaticLocalesWithDefaultLocale;
exports.default = StaticLocales;
//# sourceMappingURL=StaticLocales.js.map