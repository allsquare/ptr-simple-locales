export default class Locales {
    constructor(_defaultLocale, _storage, validLocales) {
        this._defaultLocale = _defaultLocale;
        this._storage = _storage;
        this._validLocales = null;
        if (validLocales) {
            if (!validLocales.has(_defaultLocale))
                throw new Error(`Locales: provided validLocales don't include defaultLocale`);
            this._validLocales = new Set(validLocales);
        }
        if (_storage) {
            const storedLocale = _storage.get();
            if (storedLocale !== null) {
                if (this.setLocale(storedLocale, false))
                    return;
                console.warn(`Locales: invalid stored locale: ${storedLocale}`);
                _storage.clear();
            }
        }
        if (!this.setLocale(_defaultLocale, false))
            throw new Error(`Locales: invalid default locale: ${_defaultLocale}`);
    }
    _checkNewResourcesMappings(mappings) {
        if (!this._validLocales) {
            if (!mappings.has(this._defaultLocale))
                throw new Error(`Locales.createResources: missing locale in resources mappings: ${this._defaultLocale}`);
            this._validLocales = new Set(mappings.keys());
            if (!this._validLocales.has(this._currentLocale)) {
                console.warn(`LocaleResources.createResources: currently selected locale is invalid; using default locale as fallback`);
                this._setLocale(this._currentLocale);
            }
        }
        else
            for (let key of this._validLocales.values())
                if (!mappings.has(key))
                    throw new Error(`Locales.createResources: missing locale in resources mappings: ${key}`);
    }
    createResources(mappings) {
        this._checkNewResourcesMappings(mappings);
        const This = this;
        return {
            get locales() {
                return mappings;
            },
            get current() {
                return mappings.get(This._currentLocale);
            },
            get parent() {
                return This;
            },
        };
    }
    get currentLocale() {
        return this._currentLocale;
    }
    get defaultLocale() {
        return this._defaultLocale;
    }
    _setLocale(locale) {
        this._currentLocale = locale;
    }
    setLocale(locale, store = true) {
        if (this._validLocales && !this._validLocales.has(locale))
            return false;
        this._setLocale(locale);
        if (store && this._storage)
            this._storage.store(locale);
        return true;
    }
}
;
//# sourceMappingURL=Locales.js.map