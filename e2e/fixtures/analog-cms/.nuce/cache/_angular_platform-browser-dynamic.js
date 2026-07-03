import {
  CompilerConfig,
  ResourceLoader
} from "./chunks/chunk-XDMGSITR.js";
import {
  INTERNAL_BROWSER_PLATFORM_PROVIDERS
} from "./chunks/chunk-KBLNMCAX.js";
import {
  PLATFORM_BROWSER_ID
} from "./chunks/chunk-KDIT7KLY.js";
import {
  COMPILER_OPTIONS,
  Compiler,
  CompilerFactory,
  FactoryTarget,
  Injectable,
  Injector,
  PLATFORM_ID,
  Version,
  ViewEncapsulation$1,
  _global,
  core_exports,
  createPlatformFactory,
  platformCore,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjectable
} from "./chunks/chunk-XFNLIYHF.js";
import "./chunks/chunk-FTZ33WIP.js";
import "./chunks/chunk-77546TLZ.js";
import "./chunks/chunk-6TDWXISU.js";
import "./chunks/chunk-54KOYG5C.js";

// node_modules/@angular/platform-browser-dynamic/fesm2022/platform-browser-dynamic.mjs
var COMPILER_PROVIDERS = [{ provide: Compiler, useFactory: () => new Compiler() }];
var JitCompilerFactory = class {
  /** @internal */
  constructor(defaultOptions) {
    const compilerOptions = {
      defaultEncapsulation: ViewEncapsulation$1.Emulated
    };
    this._defaultOptions = [compilerOptions, ...defaultOptions];
  }
  createCompiler(options = []) {
    const opts = _mergeOptions(this._defaultOptions.concat(options));
    const injector = Injector.create({
      providers: [
        COMPILER_PROVIDERS,
        {
          provide: CompilerConfig,
          useFactory: () => {
            return new CompilerConfig({
              defaultEncapsulation: opts.defaultEncapsulation,
              preserveWhitespaces: opts.preserveWhitespaces
            });
          },
          deps: []
        },
        opts.providers
      ]
    });
    return injector.get(Compiler);
  }
};
function _mergeOptions(optionsArr) {
  return {
    defaultEncapsulation: _lastDefined(optionsArr.map((options) => options.defaultEncapsulation)),
    providers: _mergeArrays(optionsArr.map((options) => options.providers)),
    preserveWhitespaces: _lastDefined(optionsArr.map((options) => options.preserveWhitespaces))
  };
}
function _lastDefined(args) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (args[i] !== void 0) {
      return args[i];
    }
  }
  return void 0;
}
function _mergeArrays(parts) {
  const result = [];
  parts.forEach((part) => part && result.push(...part));
  return result;
}
var platformCoreDynamic = createPlatformFactory(platformCore, "coreDynamic", [
  { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
  { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] }
]);
var _ResourceLoaderImpl = class _ResourceLoaderImpl extends ResourceLoader {
  get(url) {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "text";
    xhr.onload = function() {
      const response = xhr.response;
      let status = xhr.status;
      if (status === 0) {
        status = response ? 200 : 0;
      }
      if (200 <= status && status <= 300) {
        resolve(response);
      } else {
        reject(`Failed to load ${url}`);
      }
    };
    xhr.onerror = function() {
      reject(`Failed to load ${url}`);
    };
    xhr.send();
    return promise;
  }
};
_ResourceLoaderImpl.\u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: core_exports, type: _ResourceLoaderImpl, deps: null, target: FactoryTarget.Injectable });
_ResourceLoaderImpl.\u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: core_exports, type: _ResourceLoaderImpl });
var ResourceLoaderImpl = _ResourceLoaderImpl;
\u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: core_exports, type: ResourceLoaderImpl, decorators: [{
  type: Injectable
}] });
var INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = [
  INTERNAL_BROWSER_PLATFORM_PROVIDERS,
  {
    provide: COMPILER_OPTIONS,
    useValue: { providers: [{ provide: ResourceLoader, useClass: ResourceLoaderImpl, deps: [] }] },
    multi: true
  },
  { provide: PLATFORM_ID, useValue: PLATFORM_BROWSER_ID }
];
var CachedResourceLoader = class extends ResourceLoader {
  constructor() {
    super();
    this._cache = _global.$templateCache;
    if (this._cache == null) {
      throw new Error("CachedResourceLoader: Template cache was not found in $templateCache.");
    }
  }
  get(url) {
    if (this._cache.hasOwnProperty(url)) {
      return Promise.resolve(this._cache[url]);
    } else {
      return Promise.reject("CachedResourceLoader: Did not find cached template for " + url);
    }
  }
};
var VERSION = new Version("17.3.12");
var RESOURCE_CACHE_PROVIDER = [{ provide: ResourceLoader, useClass: CachedResourceLoader, deps: [] }];
var platformBrowserDynamic = createPlatformFactory(platformCoreDynamic, "browserDynamic", INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
export {
  JitCompilerFactory,
  RESOURCE_CACHE_PROVIDER,
  VERSION,
  platformBrowserDynamic,
  INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS as \u0275INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  platformCoreDynamic as \u0275platformCoreDynamic
};
/*! Bundled license information:

@angular/platform-browser-dynamic/fesm2022/platform-browser-dynamic.mjs:
  (**
   * @license Angular v17.3.12
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=_angular_platform-browser-dynamic.js.map
