import { StaticLocalesWithDefaultLocale, } from './StaticLocales';
export default class Locales extends StaticLocalesWithDefaultLocale {
    constructor(defaultLocale, _storage) {
        super(defaultLocale);
        this._storage = _storage;
        if (_storage) {
            const storedLocale = _storage.get();
            if (storedLocale !== null) {
                this._setLocale(storedLocale);
                return;
            }
        }
        this._setLocale(this.defaultLocale);
    }
    _completeStaticLocaleResources(resources) {
        const This = this;
        return Object.assign(Object.assign({}, resources), { get current() {
                return resources.get(This._currentLocale);
            },
            get parent() {
                return This;
            } });
    }
    get currentLocale() {
        return this._currentLocale;
    }
    _setLocale(locale) {
        this._currentLocale = locale;
    }
    setLocale(locale, store = true) {
        this._setLocale(locale);
        if (store && this._storage)
            this._storage.store(locale);
        return true;
    }
    createResourcesStrict(mappings) {
        const resources = super.createResourcesStrict(mappings);
        return this._completeStaticLocaleResources(resources);
    }
    createResourcesPartialWithDefaultLocale(defaultLocale, mappings) {
        const resources = super.createResourcesPartialWithDefaultLocale(defaultLocale, mappings);
        return this._completeStaticLocaleResources(resources);
    }
    createResourcesPartial(mappings) {
        const resources = super.createResourcesPartial(mappings);
        return this._completeStaticLocaleResources(resources);
    }
}
;
//# sourceMappingURL=Locales.js.map