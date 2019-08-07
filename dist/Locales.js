"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const mobx_1 = require("mobx");
class Locales {
    constructor(_mappings, defaultLocale, _storage) {
        this._mappings = _mappings;
        this._storage = _storage;
        if (_storage) {
            const storedLocale = _storage.get();
            if (storedLocale) {
                if (this.setLocale(storedLocale, false))
                    return;
                console.warn(`Locales: invalid stored locale: ${storedLocale}`);
                _storage.clear();
            }
        }
        if (!this.setLocale(defaultLocale, false))
            throw new Error(`Locales: invalid default locale: ${defaultLocale}`);
    }
    formatDate(date) {
        return date.toLocaleDateString(this.current.locale);
    }
    formatTime(date) {
        return date.toLocaleTimeString(this.current.locale);
    }
    formatDateTime(date) {
        return date.toLocaleString(this.current.locale);
    }
    formatNullableDate(date, nullString) {
        return date ? this.formatDate(date) : nullString;
    }
    formatNullableTime(date, nullString) {
        return date ? this.formatTime(date) : nullString;
    }
    formatNullableDateTime(date, nullString) {
        return date ? this.formatDateTime(date) : nullString;
    }
    get locales() {
        return this._mappings;
    }
    get current() {
        return this._currentLocaleResources;
    }
    get currentLocale() {
        return this._currentLocale;
    }
    setLocale(locale, store = true) {
        const res = this._mappings.get(locale);
        if (res) {
            moment.locale(res.moment);
            this._currentLocale = locale;
            this._currentLocaleResources = res;
            if (store && this._storage)
                this._storage.store(locale);
            return true;
        }
        return false;
    }
}
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], Locales.prototype, "_currentLocaleResources", void 0);
__decorate([
    mobx_1.observable,
    __metadata("design:type", Object)
], Locales.prototype, "_currentLocale", void 0);
__decorate([
    mobx_1.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", Boolean)
], Locales.prototype, "setLocale", null);
exports.default = Locales;
;
//# sourceMappingURL=Locales.js.map