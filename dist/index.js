"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locales = exports.StaticLocalesWithDefaultLocale = exports.StaticLocales = exports.completePartialResources = exports.makeResourcesLeafType = exports.isResourcesLeafType = void 0;
const Locales_1 = require("./Locales");
exports.Locales = Locales_1.default;
var types_1 = require("./types");
Object.defineProperty(exports, "isResourcesLeafType", { enumerable: true, get: function () { return types_1.isResourcesLeafType; } });
Object.defineProperty(exports, "makeResourcesLeafType", { enumerable: true, get: function () { return types_1.makeResourcesLeafType; } });
var partialResources_1 = require("./partialResources");
Object.defineProperty(exports, "completePartialResources", { enumerable: true, get: function () { return partialResources_1.completePartialResources; } });
var StaticLocales_1 = require("./StaticLocales");
Object.defineProperty(exports, "StaticLocales", { enumerable: true, get: function () { return StaticLocales_1.StaticLocales; } });
Object.defineProperty(exports, "StaticLocalesWithDefaultLocale", { enumerable: true, get: function () { return StaticLocales_1.StaticLocalesWithDefaultLocale; } });
exports.default = Locales_1.default;
//# sourceMappingURL=index.js.map