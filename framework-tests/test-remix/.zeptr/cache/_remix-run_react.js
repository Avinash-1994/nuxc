import {
  require_main,
  require_router_cjs
} from "./chunks/chunk-A2EGYITP.js";
import {
  require_react_dom
} from "./chunks/chunk-FTYHDA2X.js";
import {
  __commonJS,
  __publicField,
  __toESM,
  require_react
} from "./chunks/chunk-2DZYPUER.js";

// node_modules/react-router-dom/dist/umd/react-router-dom.development.js
var require_react_router_dom_development = __commonJS({
  "node_modules/react-router-dom/dist/umd/react-router-dom.development.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_react(), require_react_dom(), require_main(), require_router_cjs()) : typeof define === "function" && define.amd ? define(["exports", "react", "react-dom", "react-router", "@remix-run/router"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.ReactRouterDOM = {}, global.React, global.ReactDOM, global.ReactRouter, global.RemixRouter));
    })(exports, (function(exports2, React9, ReactDOM, reactRouter, router2) {
      "use strict";
      function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = /* @__PURE__ */ Object.create(null);
        if (e) {
          Object.keys(e).forEach(function(k) {
            if (k !== "default") {
              var d = Object.getOwnPropertyDescriptor(e, k);
              Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: function() {
                  return e[k];
                }
              });
            }
          });
        }
        n["default"] = e;
        return Object.freeze(n);
      }
      var React__namespace = /* @__PURE__ */ _interopNamespace(React9);
      var ReactDOM__namespace = /* @__PURE__ */ _interopNamespace(ReactDOM);
      function _extends2() {
        _extends2 = Object.assign ? Object.assign.bind() : function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends2.apply(this, arguments);
      }
      function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null) return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;
        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          target[key] = source[key];
        }
        return target;
      }
      const defaultMethod = "get";
      const defaultEncType = "application/x-www-form-urlencoded";
      function isHtmlElement(object) {
        return object != null && typeof object.tagName === "string";
      }
      function isButtonElement(object) {
        return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
      }
      function isFormElement(object) {
        return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
      }
      function isInputElement(object) {
        return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
      }
      function isModifiedEvent(event) {
        return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
      }
      function shouldProcessLinkClick(event, target) {
        return event.button === 0 && // Ignore everything but left clicks
        (!target || target === "_self") && // Let browser handle "target=_blank" etc.
        !isModifiedEvent(event);
      }
      function createSearchParams2(init) {
        if (init === void 0) {
          init = "";
        }
        return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
          let value = init[key];
          return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
        }, []));
      }
      function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
        let searchParams = createSearchParams2(locationSearch);
        if (defaultSearchParams) {
          defaultSearchParams.forEach((_, key) => {
            if (!searchParams.has(key)) {
              defaultSearchParams.getAll(key).forEach((value) => {
                searchParams.append(key, value);
              });
            }
          });
        }
        return searchParams;
      }
      let _formDataSupportsSubmitter = null;
      function isFormDataSubmitterSupported() {
        if (_formDataSupportsSubmitter === null) {
          try {
            new FormData(
              document.createElement("form"),
              // @ts-expect-error if FormData supports the submitter parameter, this will throw
              0
            );
            _formDataSupportsSubmitter = false;
          } catch (e) {
            _formDataSupportsSubmitter = true;
          }
        }
        return _formDataSupportsSubmitter;
      }
      const supportedFormEncTypes = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
      function getFormEncType(encType) {
        if (encType != null && !supportedFormEncTypes.has(encType)) {
          router2.UNSAFE_warning(false, '"' + encType + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + defaultEncType + '"'));
          return null;
        }
        return encType;
      }
      function getFormSubmissionInfo(target, basename) {
        let method;
        let action;
        let encType;
        let formData;
        let body;
        if (isFormElement(target)) {
          let attr = target.getAttribute("action");
          action = attr ? router2.stripBasename(attr, basename) : null;
          method = target.getAttribute("method") || defaultMethod;
          encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
          formData = new FormData(target);
        } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
          let form = target.form;
          if (form == null) {
            throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
          }
          let attr = target.getAttribute("formaction") || form.getAttribute("action");
          action = attr ? router2.stripBasename(attr, basename) : null;
          method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
          encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
          formData = new FormData(form, target);
          if (!isFormDataSubmitterSupported()) {
            let {
              name,
              type,
              value
            } = target;
            if (type === "image") {
              let prefix = name ? name + "." : "";
              formData.append(prefix + "x", "0");
              formData.append(prefix + "y", "0");
            } else if (name) {
              formData.append(name, value);
            }
          }
        } else if (isHtmlElement(target)) {
          throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
        } else {
          method = defaultMethod;
          action = null;
          encType = defaultEncType;
          body = target;
        }
        if (formData && encType === "text/plain") {
          body = formData;
          formData = void 0;
        }
        return {
          action,
          method: method.toLowerCase(),
          encType,
          formData,
          body
        };
      }
      const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "unstable_viewTransition"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "unstable_viewTransition", "children"], _excluded3 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "unstable_viewTransition"];
      const REACT_ROUTER_VERSION = "6";
      try {
        window.__reactRouterVersion = REACT_ROUTER_VERSION;
      } catch (e) {
      }
      function createBrowserRouter(routes, opts) {
        return router2.createRouter({
          basename: opts == null ? void 0 : opts.basename,
          future: _extends2({}, opts == null ? void 0 : opts.future, {
            v7_prependBasename: true
          }),
          history: router2.createBrowserHistory({
            window: opts == null ? void 0 : opts.window
          }),
          hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
          routes,
          mapRouteProperties: reactRouter.UNSAFE_mapRouteProperties,
          unstable_dataStrategy: opts == null ? void 0 : opts.unstable_dataStrategy,
          window: opts == null ? void 0 : opts.window
        }).initialize();
      }
      function createHashRouter(routes, opts) {
        return router2.createRouter({
          basename: opts == null ? void 0 : opts.basename,
          future: _extends2({}, opts == null ? void 0 : opts.future, {
            v7_prependBasename: true
          }),
          history: router2.createHashHistory({
            window: opts == null ? void 0 : opts.window
          }),
          hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
          routes,
          mapRouteProperties: reactRouter.UNSAFE_mapRouteProperties,
          unstable_dataStrategy: opts == null ? void 0 : opts.unstable_dataStrategy,
          window: opts == null ? void 0 : opts.window
        }).initialize();
      }
      function parseHydrationData() {
        var _window;
        let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
        if (state && state.errors) {
          state = _extends2({}, state, {
            errors: deserializeErrors2(state.errors)
          });
        }
        return state;
      }
      function deserializeErrors2(errors) {
        if (!errors) return null;
        let entries = Object.entries(errors);
        let serialized = {};
        for (let [key, val] of entries) {
          if (val && val.__type === "RouteErrorResponse") {
            serialized[key] = new router2.UNSAFE_ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
          } else if (val && val.__type === "Error") {
            if (val.__subType) {
              let ErrorConstructor = window[val.__subType];
              if (typeof ErrorConstructor === "function") {
                try {
                  let error = new ErrorConstructor(val.message);
                  error.stack = "";
                  serialized[key] = error;
                } catch (e) {
                }
              }
            }
            if (serialized[key] == null) {
              let error = new Error(val.message);
              error.stack = "";
              serialized[key] = error;
            }
          } else {
            serialized[key] = val;
          }
        }
        return serialized;
      }
      const ViewTransitionContext = /* @__PURE__ */ React__namespace.createContext({
        isTransitioning: false
      });
      {
        ViewTransitionContext.displayName = "ViewTransition";
      }
      const FetchersContext = /* @__PURE__ */ React__namespace.createContext(/* @__PURE__ */ new Map());
      {
        FetchersContext.displayName = "Fetchers";
      }
      const START_TRANSITION = "startTransition";
      const startTransitionImpl = React__namespace[START_TRANSITION];
      const FLUSH_SYNC = "flushSync";
      const flushSyncImpl = ReactDOM__namespace[FLUSH_SYNC];
      const USE_ID = "useId";
      const useIdImpl = React__namespace[USE_ID];
      function startTransitionSafe(cb) {
        if (startTransitionImpl) {
          startTransitionImpl(cb);
        } else {
          cb();
        }
      }
      function flushSyncSafe(cb) {
        if (flushSyncImpl) {
          flushSyncImpl(cb);
        } else {
          cb();
        }
      }
      class Deferred2 {
        // @ts-expect-error - no initializer
        // @ts-expect-error - no initializer
        constructor() {
          this.status = "pending";
          this.promise = new Promise((resolve, reject) => {
            this.resolve = (value) => {
              if (this.status === "pending") {
                this.status = "resolved";
                resolve(value);
              }
            };
            this.reject = (reason) => {
              if (this.status === "pending") {
                this.status = "rejected";
                reject(reason);
              }
            };
          });
        }
      }
      function RouterProvider2(_ref) {
        let {
          fallbackElement,
          router: router$1,
          future
        } = _ref;
        let [state, setStateImpl] = React__namespace.useState(router$1.state);
        let [pendingState, setPendingState] = React__namespace.useState();
        let [vtContext, setVtContext] = React__namespace.useState({
          isTransitioning: false
        });
        let [renderDfd, setRenderDfd] = React__namespace.useState();
        let [transition, setTransition] = React__namespace.useState();
        let [interruption, setInterruption] = React__namespace.useState();
        let fetcherData = React__namespace.useRef(/* @__PURE__ */ new Map());
        let {
          v7_startTransition
        } = future || {};
        let optInStartTransition = React__namespace.useCallback((cb) => {
          if (v7_startTransition) {
            startTransitionSafe(cb);
          } else {
            cb();
          }
        }, [v7_startTransition]);
        let setState = React__namespace.useCallback((newState, _ref2) => {
          let {
            deletedFetchers,
            unstable_flushSync: flushSync,
            unstable_viewTransitionOpts: viewTransitionOpts
          } = _ref2;
          deletedFetchers.forEach((key) => fetcherData.current.delete(key));
          newState.fetchers.forEach((fetcher, key) => {
            if (fetcher.data !== void 0) {
              fetcherData.current.set(key, fetcher.data);
            }
          });
          let isViewTransitionUnavailable = router$1.window == null || router$1.window.document == null || typeof router$1.window.document.startViewTransition !== "function";
          if (!viewTransitionOpts || isViewTransitionUnavailable) {
            if (flushSync) {
              flushSyncSafe(() => setStateImpl(newState));
            } else {
              optInStartTransition(() => setStateImpl(newState));
            }
            return;
          }
          if (flushSync) {
            flushSyncSafe(() => {
              if (transition) {
                renderDfd && renderDfd.resolve();
                transition.skipTransition();
              }
              setVtContext({
                isTransitioning: true,
                flushSync: true,
                currentLocation: viewTransitionOpts.currentLocation,
                nextLocation: viewTransitionOpts.nextLocation
              });
            });
            let t = router$1.window.document.startViewTransition(() => {
              flushSyncSafe(() => setStateImpl(newState));
            });
            t.finished.finally(() => {
              flushSyncSafe(() => {
                setRenderDfd(void 0);
                setTransition(void 0);
                setPendingState(void 0);
                setVtContext({
                  isTransitioning: false
                });
              });
            });
            flushSyncSafe(() => setTransition(t));
            return;
          }
          if (transition) {
            renderDfd && renderDfd.resolve();
            transition.skipTransition();
            setInterruption({
              state: newState,
              currentLocation: viewTransitionOpts.currentLocation,
              nextLocation: viewTransitionOpts.nextLocation
            });
          } else {
            setPendingState(newState);
            setVtContext({
              isTransitioning: true,
              flushSync: false,
              currentLocation: viewTransitionOpts.currentLocation,
              nextLocation: viewTransitionOpts.nextLocation
            });
          }
        }, [router$1.window, transition, renderDfd, fetcherData, optInStartTransition]);
        React__namespace.useLayoutEffect(() => router$1.subscribe(setState), [router$1, setState]);
        React__namespace.useEffect(() => {
          if (vtContext.isTransitioning && !vtContext.flushSync) {
            setRenderDfd(new Deferred2());
          }
        }, [vtContext]);
        React__namespace.useEffect(() => {
          if (renderDfd && pendingState && router$1.window) {
            let newState = pendingState;
            let renderPromise = renderDfd.promise;
            let transition2 = router$1.window.document.startViewTransition(async () => {
              optInStartTransition(() => setStateImpl(newState));
              await renderPromise;
            });
            transition2.finished.finally(() => {
              setRenderDfd(void 0);
              setTransition(void 0);
              setPendingState(void 0);
              setVtContext({
                isTransitioning: false
              });
            });
            setTransition(transition2);
          }
        }, [optInStartTransition, pendingState, renderDfd, router$1.window]);
        React__namespace.useEffect(() => {
          if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
            renderDfd.resolve();
          }
        }, [renderDfd, transition, state.location, pendingState]);
        React__namespace.useEffect(() => {
          if (!vtContext.isTransitioning && interruption) {
            setPendingState(interruption.state);
            setVtContext({
              isTransitioning: true,
              flushSync: false,
              currentLocation: interruption.currentLocation,
              nextLocation: interruption.nextLocation
            });
            setInterruption(void 0);
          }
        }, [vtContext.isTransitioning, interruption]);
        React__namespace.useEffect(() => {
          router2.UNSAFE_warning(fallbackElement == null || !router$1.future.v7_partialHydration, "`<RouterProvider fallbackElement>` is deprecated when using `v7_partialHydration`, use a `HydrateFallback` component instead");
        }, []);
        let navigator = React__namespace.useMemo(() => {
          return {
            createHref: router$1.createHref,
            encodeLocation: router$1.encodeLocation,
            go: (n) => router$1.navigate(n),
            push: (to, state2, opts) => router$1.navigate(to, {
              state: state2,
              preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
            }),
            replace: (to, state2, opts) => router$1.navigate(to, {
              replace: true,
              state: state2,
              preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
            })
          };
        }, [router$1]);
        let basename = router$1.basename || "/";
        let dataRouterContext = React__namespace.useMemo(() => ({
          router: router$1,
          navigator,
          static: false,
          basename
        }), [router$1, navigator, basename]);
        return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(reactRouter.UNSAFE_DataRouterContext.Provider, {
          value: dataRouterContext
        }, /* @__PURE__ */ React__namespace.createElement(reactRouter.UNSAFE_DataRouterStateContext.Provider, {
          value: state
        }, /* @__PURE__ */ React__namespace.createElement(FetchersContext.Provider, {
          value: fetcherData.current
        }, /* @__PURE__ */ React__namespace.createElement(ViewTransitionContext.Provider, {
          value: vtContext
        }, /* @__PURE__ */ React__namespace.createElement(reactRouter.Router, {
          basename,
          location: state.location,
          navigationType: state.historyAction,
          navigator,
          future: {
            v7_relativeSplatPath: router$1.future.v7_relativeSplatPath
          }
        }, state.initialized || router$1.future.v7_partialHydration ? /* @__PURE__ */ React__namespace.createElement(DataRoutes, {
          routes: router$1.routes,
          future: router$1.future,
          state
        }) : fallbackElement))))), null);
      }
      function DataRoutes(_ref3) {
        let {
          routes,
          future,
          state
        } = _ref3;
        return reactRouter.UNSAFE_useRoutesImpl(routes, void 0, state, future);
      }
      function BrowserRouter(_ref4) {
        let {
          basename,
          children,
          future,
          window: window2
        } = _ref4;
        let historyRef = React__namespace.useRef();
        if (historyRef.current == null) {
          historyRef.current = router2.createBrowserHistory({
            window: window2,
            v5Compat: true
          });
        }
        let history = historyRef.current;
        let [state, setStateImpl] = React__namespace.useState({
          action: history.action,
          location: history.location
        });
        let {
          v7_startTransition
        } = future || {};
        let setState = React__namespace.useCallback((newState) => {
          v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
        }, [setStateImpl, v7_startTransition]);
        React__namespace.useLayoutEffect(() => history.listen(setState), [history, setState]);
        return /* @__PURE__ */ React__namespace.createElement(reactRouter.Router, {
          basename,
          children,
          location: state.location,
          navigationType: state.action,
          navigator: history,
          future
        });
      }
      function HashRouter(_ref5) {
        let {
          basename,
          children,
          future,
          window: window2
        } = _ref5;
        let historyRef = React__namespace.useRef();
        if (historyRef.current == null) {
          historyRef.current = router2.createHashHistory({
            window: window2,
            v5Compat: true
          });
        }
        let history = historyRef.current;
        let [state, setStateImpl] = React__namespace.useState({
          action: history.action,
          location: history.location
        });
        let {
          v7_startTransition
        } = future || {};
        let setState = React__namespace.useCallback((newState) => {
          v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
        }, [setStateImpl, v7_startTransition]);
        React__namespace.useLayoutEffect(() => history.listen(setState), [history, setState]);
        return /* @__PURE__ */ React__namespace.createElement(reactRouter.Router, {
          basename,
          children,
          location: state.location,
          navigationType: state.action,
          navigator: history,
          future
        });
      }
      function HistoryRouter(_ref6) {
        let {
          basename,
          children,
          future,
          history
        } = _ref6;
        let [state, setStateImpl] = React__namespace.useState({
          action: history.action,
          location: history.location
        });
        let {
          v7_startTransition
        } = future || {};
        let setState = React__namespace.useCallback((newState) => {
          v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
        }, [setStateImpl, v7_startTransition]);
        React__namespace.useLayoutEffect(() => history.listen(setState), [history, setState]);
        return /* @__PURE__ */ React__namespace.createElement(reactRouter.Router, {
          basename,
          children,
          location: state.location,
          navigationType: state.action,
          navigator: history,
          future
        });
      }
      {
        HistoryRouter.displayName = "unstable_HistoryRouter";
      }
      const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
      const ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
      const Link2 = /* @__PURE__ */ React__namespace.forwardRef(function LinkWithRef(_ref7, ref) {
        let {
          onClick,
          relative,
          reloadDocument,
          replace,
          state,
          target,
          to,
          preventScrollReset,
          unstable_viewTransition
        } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
        let {
          basename
        } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
        let absoluteHref;
        let isExternal = false;
        if (typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to)) {
          absoluteHref = to;
          if (isBrowser) {
            try {
              let currentUrl = new URL(window.location.href);
              let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
              let path = router2.stripBasename(targetUrl.pathname, basename);
              if (targetUrl.origin === currentUrl.origin && path != null) {
                to = path + targetUrl.search + targetUrl.hash;
              } else {
                isExternal = true;
              }
            } catch (e) {
              router2.UNSAFE_warning(false, '<Link to="' + to + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
            }
          }
        }
        let href = reactRouter.useHref(to, {
          relative
        });
        let internalOnClick = useLinkClickHandler2(to, {
          replace,
          state,
          target,
          preventScrollReset,
          relative,
          unstable_viewTransition
        });
        function handleClick(event) {
          if (onClick) onClick(event);
          if (!event.defaultPrevented) {
            internalOnClick(event);
          }
        }
        return (
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          /* @__PURE__ */ React__namespace.createElement("a", _extends2({}, rest, {
            href: absoluteHref || href,
            onClick: isExternal || reloadDocument ? onClick : handleClick,
            ref,
            target
          }))
        );
      });
      {
        Link2.displayName = "Link";
      }
      const NavLink2 = /* @__PURE__ */ React__namespace.forwardRef(function NavLinkWithRef(_ref8, ref) {
        let {
          "aria-current": ariaCurrentProp = "page",
          caseSensitive = false,
          className: classNameProp = "",
          end = false,
          style: styleProp,
          to,
          unstable_viewTransition,
          children
        } = _ref8, rest = _objectWithoutPropertiesLoose(_ref8, _excluded2);
        let path = reactRouter.useResolvedPath(to, {
          relative: rest.relative
        });
        let location = reactRouter.useLocation();
        let routerState = React__namespace.useContext(reactRouter.UNSAFE_DataRouterStateContext);
        let {
          navigator,
          basename
        } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
        let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useViewTransitionState(path) && unstable_viewTransition === true;
        let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
        let locationPathname = location.pathname;
        let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
        if (!caseSensitive) {
          locationPathname = locationPathname.toLowerCase();
          nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
          toPathname = toPathname.toLowerCase();
        }
        if (nextLocationPathname && basename) {
          nextLocationPathname = router2.stripBasename(nextLocationPathname, basename) || nextLocationPathname;
        }
        const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
        let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
        let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
        let renderProps = {
          isActive,
          isPending,
          isTransitioning
        };
        let ariaCurrent = isActive ? ariaCurrentProp : void 0;
        let className;
        if (typeof classNameProp === "function") {
          className = classNameProp(renderProps);
        } else {
          className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
        }
        let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
        return /* @__PURE__ */ React__namespace.createElement(Link2, _extends2({}, rest, {
          "aria-current": ariaCurrent,
          className,
          ref,
          style,
          to,
          unstable_viewTransition
        }), typeof children === "function" ? children(renderProps) : children);
      });
      {
        NavLink2.displayName = "NavLink";
      }
      const Form2 = /* @__PURE__ */ React__namespace.forwardRef((_ref9, forwardedRef) => {
        let {
          fetcherKey,
          navigate,
          reloadDocument,
          replace,
          state,
          method = defaultMethod,
          action,
          onSubmit,
          relative,
          preventScrollReset,
          unstable_viewTransition
        } = _ref9, props = _objectWithoutPropertiesLoose(_ref9, _excluded3);
        let submit = useSubmit2();
        let formAction = useFormAction2(action, {
          relative
        });
        let formMethod = method.toLowerCase() === "get" ? "get" : "post";
        let submitHandler = (event) => {
          onSubmit && onSubmit(event);
          if (event.defaultPrevented) return;
          event.preventDefault();
          let submitter = event.nativeEvent.submitter;
          let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
          submit(submitter || event.currentTarget, {
            fetcherKey,
            method: submitMethod,
            navigate,
            replace,
            state,
            relative,
            preventScrollReset,
            unstable_viewTransition
          });
        };
        return /* @__PURE__ */ React__namespace.createElement("form", _extends2({
          ref: forwardedRef,
          method: formMethod,
          action: formAction,
          onSubmit: reloadDocument ? onSubmit : submitHandler
        }, props));
      });
      {
        Form2.displayName = "Form";
      }
      function ScrollRestoration2(_ref10) {
        let {
          getKey,
          storageKey
        } = _ref10;
        useScrollRestoration({
          getKey,
          storageKey
        });
        return null;
      }
      {
        ScrollRestoration2.displayName = "ScrollRestoration";
      }
      var DataRouterHook = /* @__PURE__ */ (function(DataRouterHook2) {
        DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
        DataRouterHook2["UseSubmit"] = "useSubmit";
        DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
        DataRouterHook2["UseFetcher"] = "useFetcher";
        DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
        return DataRouterHook2;
      })(DataRouterHook || {});
      var DataRouterStateHook = /* @__PURE__ */ (function(DataRouterStateHook2) {
        DataRouterStateHook2["UseFetcher"] = "useFetcher";
        DataRouterStateHook2["UseFetchers"] = "useFetchers";
        DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
        return DataRouterStateHook2;
      })(DataRouterStateHook || {});
      function getDataRouterConsoleError(hookName) {
        return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
      }
      function useDataRouterContext2(hookName) {
        let ctx = React__namespace.useContext(reactRouter.UNSAFE_DataRouterContext);
        !ctx ? router2.UNSAFE_invariant(false, getDataRouterConsoleError(hookName)) : void 0;
        return ctx;
      }
      function useDataRouterState(hookName) {
        let state = React__namespace.useContext(reactRouter.UNSAFE_DataRouterStateContext);
        !state ? router2.UNSAFE_invariant(false, getDataRouterConsoleError(hookName)) : void 0;
        return state;
      }
      function useLinkClickHandler2(to, _temp) {
        let {
          target,
          replace: replaceProp,
          state,
          preventScrollReset,
          relative,
          unstable_viewTransition
        } = _temp === void 0 ? {} : _temp;
        let navigate = reactRouter.useNavigate();
        let location = reactRouter.useLocation();
        let path = reactRouter.useResolvedPath(to, {
          relative
        });
        return React__namespace.useCallback((event) => {
          if (shouldProcessLinkClick(event, target)) {
            event.preventDefault();
            let replace = replaceProp !== void 0 ? replaceProp : reactRouter.createPath(location) === reactRouter.createPath(path);
            navigate(to, {
              replace,
              state,
              preventScrollReset,
              relative,
              unstable_viewTransition
            });
          }
        }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, unstable_viewTransition]);
      }
      function useSearchParams2(defaultInit) {
        router2.UNSAFE_warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.");
        let defaultSearchParamsRef = React__namespace.useRef(createSearchParams2(defaultInit));
        let hasSetSearchParamsRef = React__namespace.useRef(false);
        let location = reactRouter.useLocation();
        let searchParams = React__namespace.useMemo(() => (
          // Only merge in the defaults if we haven't yet called setSearchParams.
          // Once we call that we want those to take precedence, otherwise you can't
          // remove a param with setSearchParams({}) if it has an initial value
          getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current)
        ), [location.search]);
        let navigate = reactRouter.useNavigate();
        let setSearchParams = React__namespace.useCallback((nextInit, navigateOptions) => {
          const newSearchParams = createSearchParams2(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
          hasSetSearchParamsRef.current = true;
          navigate("?" + newSearchParams, navigateOptions);
        }, [navigate, searchParams]);
        return [searchParams, setSearchParams];
      }
      function validateClientSideSubmission() {
        if (typeof document === "undefined") {
          throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
        }
      }
      let fetcherId = 0;
      let getUniqueFetcherId = () => "__" + String(++fetcherId) + "__";
      function useSubmit2() {
        let {
          router: router3
        } = useDataRouterContext2(DataRouterHook.UseSubmit);
        let {
          basename
        } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
        let currentRouteId = reactRouter.UNSAFE_useRouteId();
        return React__namespace.useCallback(function(target, options) {
          if (options === void 0) {
            options = {};
          }
          validateClientSideSubmission();
          let {
            action,
            method,
            encType,
            formData,
            body
          } = getFormSubmissionInfo(target, basename);
          if (options.navigate === false) {
            let key = options.fetcherKey || getUniqueFetcherId();
            router3.fetch(key, currentRouteId, options.action || action, {
              preventScrollReset: options.preventScrollReset,
              formData,
              body,
              formMethod: options.method || method,
              formEncType: options.encType || encType,
              unstable_flushSync: options.unstable_flushSync
            });
          } else {
            router3.navigate(options.action || action, {
              preventScrollReset: options.preventScrollReset,
              formData,
              body,
              formMethod: options.method || method,
              formEncType: options.encType || encType,
              replace: options.replace,
              state: options.state,
              fromRouteId: currentRouteId,
              unstable_flushSync: options.unstable_flushSync,
              unstable_viewTransition: options.unstable_viewTransition
            });
          }
        }, [router3, basename, currentRouteId]);
      }
      function useFormAction2(action, _temp2) {
        let {
          relative
        } = _temp2 === void 0 ? {} : _temp2;
        let {
          basename
        } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
        let routeContext = React__namespace.useContext(reactRouter.UNSAFE_RouteContext);
        !routeContext ? router2.UNSAFE_invariant(false, "useFormAction must be used inside a RouteContext") : void 0;
        let [match] = routeContext.matches.slice(-1);
        let path = _extends2({}, reactRouter.useResolvedPath(action ? action : ".", {
          relative
        }));
        let location = reactRouter.useLocation();
        if (action == null) {
          path.search = location.search;
          let params = new URLSearchParams(path.search);
          if (params.has("index") && params.get("index") === "") {
            params.delete("index");
            path.search = params.toString() ? "?" + params.toString() : "";
          }
        }
        if ((!action || action === ".") && match.route.index) {
          path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
        }
        if (basename !== "/") {
          path.pathname = path.pathname === "/" ? basename : router2.joinPaths([basename, path.pathname]);
        }
        return reactRouter.createPath(path);
      }
      function useFetcher2(_temp3) {
        var _route$matches;
        let {
          key
        } = _temp3 === void 0 ? {} : _temp3;
        let {
          router: router$1
        } = useDataRouterContext2(DataRouterHook.UseFetcher);
        let state = useDataRouterState(DataRouterStateHook.UseFetcher);
        let fetcherData = React__namespace.useContext(FetchersContext);
        let route = React__namespace.useContext(reactRouter.UNSAFE_RouteContext);
        let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
        !fetcherData ? router2.UNSAFE_invariant(false, "useFetcher must be used inside a FetchersContext") : void 0;
        !route ? router2.UNSAFE_invariant(false, "useFetcher must be used inside a RouteContext") : void 0;
        !(routeId != null) ? router2.UNSAFE_invariant(false, 'useFetcher can only be used on routes that contain a unique "id"') : void 0;
        let defaultKey = useIdImpl ? useIdImpl() : "";
        let [fetcherKey, setFetcherKey] = React__namespace.useState(key || defaultKey);
        if (key && key !== fetcherKey) {
          setFetcherKey(key);
        } else if (!fetcherKey) {
          setFetcherKey(getUniqueFetcherId());
        }
        React__namespace.useEffect(() => {
          router$1.getFetcher(fetcherKey);
          return () => {
            router$1.deleteFetcher(fetcherKey);
          };
        }, [router$1, fetcherKey]);
        let load = React__namespace.useCallback((href, opts) => {
          !routeId ? router2.UNSAFE_invariant(false, "No routeId available for fetcher.load()") : void 0;
          router$1.fetch(fetcherKey, routeId, href, opts);
        }, [fetcherKey, routeId, router$1]);
        let submitImpl = useSubmit2();
        let submit = React__namespace.useCallback((target, opts) => {
          submitImpl(target, _extends2({}, opts, {
            navigate: false,
            fetcherKey
          }));
        }, [fetcherKey, submitImpl]);
        let FetcherForm = React__namespace.useMemo(() => {
          let FetcherForm2 = /* @__PURE__ */ React__namespace.forwardRef((props, ref) => {
            return /* @__PURE__ */ React__namespace.createElement(Form2, _extends2({}, props, {
              navigate: false,
              fetcherKey,
              ref
            }));
          });
          {
            FetcherForm2.displayName = "fetcher.Form";
          }
          return FetcherForm2;
        }, [fetcherKey]);
        let fetcher = state.fetchers.get(fetcherKey) || router2.IDLE_FETCHER;
        let data = fetcherData.get(fetcherKey);
        let fetcherWithComponents = React__namespace.useMemo(() => _extends2({
          Form: FetcherForm,
          submit,
          load
        }, fetcher, {
          data
        }), [FetcherForm, submit, load, fetcher, data]);
        return fetcherWithComponents;
      }
      function useFetchers2() {
        let state = useDataRouterState(DataRouterStateHook.UseFetchers);
        return Array.from(state.fetchers.entries()).map((_ref11) => {
          let [key, fetcher] = _ref11;
          return _extends2({}, fetcher, {
            key
          });
        });
      }
      const SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
      let savedScrollPositions = {};
      function useScrollRestoration(_temp4) {
        let {
          getKey,
          storageKey
        } = _temp4 === void 0 ? {} : _temp4;
        let {
          router: router$1
        } = useDataRouterContext2(DataRouterHook.UseScrollRestoration);
        let {
          restoreScrollPosition,
          preventScrollReset
        } = useDataRouterState(DataRouterStateHook.UseScrollRestoration);
        let {
          basename
        } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
        let location = reactRouter.useLocation();
        let matches = reactRouter.useMatches();
        let navigation = reactRouter.useNavigation();
        React__namespace.useEffect(() => {
          window.history.scrollRestoration = "manual";
          return () => {
            window.history.scrollRestoration = "auto";
          };
        }, []);
        usePageHide(React__namespace.useCallback(() => {
          if (navigation.state === "idle") {
            let key = (getKey ? getKey(location, matches) : null) || location.key;
            savedScrollPositions[key] = window.scrollY;
          }
          try {
            sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
          } catch (error) {
            router2.UNSAFE_warning(false, "Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (" + error + ").");
          }
          window.history.scrollRestoration = "auto";
        }, [storageKey, getKey, navigation.state, location, matches]));
        if (typeof document !== "undefined") {
          React__namespace.useLayoutEffect(() => {
            try {
              let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
              if (sessionPositions) {
                savedScrollPositions = JSON.parse(sessionPositions);
              }
            } catch (e) {
            }
          }, [storageKey]);
          React__namespace.useLayoutEffect(() => {
            let getKeyWithoutBasename = getKey && basename !== "/" ? (location2, matches2) => getKey(
              // Strip the basename to match useLocation()
              _extends2({}, location2, {
                pathname: router2.stripBasename(location2.pathname, basename) || location2.pathname
              }),
              matches2
            ) : getKey;
            let disableScrollRestoration = router$1 == null ? void 0 : router$1.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKeyWithoutBasename);
            return () => disableScrollRestoration && disableScrollRestoration();
          }, [router$1, basename, getKey]);
          React__namespace.useLayoutEffect(() => {
            if (restoreScrollPosition === false) {
              return;
            }
            if (typeof restoreScrollPosition === "number") {
              window.scrollTo(0, restoreScrollPosition);
              return;
            }
            if (location.hash) {
              let el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
              if (el) {
                el.scrollIntoView();
                return;
              }
            }
            if (preventScrollReset === true) {
              return;
            }
            window.scrollTo(0, 0);
          }, [location, restoreScrollPosition, preventScrollReset]);
        }
      }
      function useBeforeUnload2(callback, options) {
        let {
          capture
        } = options || {};
        React__namespace.useEffect(() => {
          let opts = capture != null ? {
            capture
          } : void 0;
          window.addEventListener("beforeunload", callback, opts);
          return () => {
            window.removeEventListener("beforeunload", callback, opts);
          };
        }, [callback, capture]);
      }
      function usePageHide(callback, options) {
        let {
          capture
        } = options || {};
        React__namespace.useEffect(() => {
          let opts = capture != null ? {
            capture
          } : void 0;
          window.addEventListener("pagehide", callback, opts);
          return () => {
            window.removeEventListener("pagehide", callback, opts);
          };
        }, [callback, capture]);
      }
      function usePrompt(_ref12) {
        let {
          when,
          message
        } = _ref12;
        let blocker = reactRouter.useBlocker(when);
        React__namespace.useEffect(() => {
          if (blocker.state === "blocked") {
            let proceed = window.confirm(message);
            if (proceed) {
              setTimeout(blocker.proceed, 0);
            } else {
              blocker.reset();
            }
          }
        }, [blocker, message]);
        React__namespace.useEffect(() => {
          if (blocker.state === "blocked" && !when) {
            blocker.reset();
          }
        }, [blocker, when]);
      }
      function useViewTransitionState(to, opts) {
        if (opts === void 0) {
          opts = {};
        }
        let vtContext = React__namespace.useContext(ViewTransitionContext);
        !(vtContext != null) ? router2.UNSAFE_invariant(false, "`unstable_useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : void 0;
        let {
          basename
        } = useDataRouterContext2(DataRouterHook.useViewTransitionState);
        let path = reactRouter.useResolvedPath(to, {
          relative: opts.relative
        });
        if (!vtContext.isTransitioning) {
          return false;
        }
        let currentPath = router2.stripBasename(vtContext.currentLocation.pathname, basename) || vtContext.currentLocation.pathname;
        let nextPath = router2.stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname;
        return router2.matchPath(path.pathname, nextPath) != null || router2.matchPath(path.pathname, currentPath) != null;
      }
      Object.defineProperty(exports2, "AbortedDeferredError", {
        enumerable: true,
        get: function() {
          return reactRouter.AbortedDeferredError;
        }
      });
      Object.defineProperty(exports2, "Await", {
        enumerable: true,
        get: function() {
          return reactRouter.Await;
        }
      });
      Object.defineProperty(exports2, "MemoryRouter", {
        enumerable: true,
        get: function() {
          return reactRouter.MemoryRouter;
        }
      });
      Object.defineProperty(exports2, "Navigate", {
        enumerable: true,
        get: function() {
          return reactRouter.Navigate;
        }
      });
      Object.defineProperty(exports2, "NavigationType", {
        enumerable: true,
        get: function() {
          return reactRouter.NavigationType;
        }
      });
      Object.defineProperty(exports2, "Outlet", {
        enumerable: true,
        get: function() {
          return reactRouter.Outlet;
        }
      });
      Object.defineProperty(exports2, "Route", {
        enumerable: true,
        get: function() {
          return reactRouter.Route;
        }
      });
      Object.defineProperty(exports2, "Router", {
        enumerable: true,
        get: function() {
          return reactRouter.Router;
        }
      });
      Object.defineProperty(exports2, "Routes", {
        enumerable: true,
        get: function() {
          return reactRouter.Routes;
        }
      });
      Object.defineProperty(exports2, "UNSAFE_DataRouterContext", {
        enumerable: true,
        get: function() {
          return reactRouter.UNSAFE_DataRouterContext;
        }
      });
      Object.defineProperty(exports2, "UNSAFE_DataRouterStateContext", {
        enumerable: true,
        get: function() {
          return reactRouter.UNSAFE_DataRouterStateContext;
        }
      });
      Object.defineProperty(exports2, "UNSAFE_LocationContext", {
        enumerable: true,
        get: function() {
          return reactRouter.UNSAFE_LocationContext;
        }
      });
      Object.defineProperty(exports2, "UNSAFE_NavigationContext", {
        enumerable: true,
        get: function() {
          return reactRouter.UNSAFE_NavigationContext;
        }
      });
      Object.defineProperty(exports2, "UNSAFE_RouteContext", {
        enumerable: true,
        get: function() {
          return reactRouter.UNSAFE_RouteContext;
        }
      });
      Object.defineProperty(exports2, "UNSAFE_useRouteId", {
        enumerable: true,
        get: function() {
          return reactRouter.UNSAFE_useRouteId;
        }
      });
      Object.defineProperty(exports2, "createMemoryRouter", {
        enumerable: true,
        get: function() {
          return reactRouter.createMemoryRouter;
        }
      });
      Object.defineProperty(exports2, "createPath", {
        enumerable: true,
        get: function() {
          return reactRouter.createPath;
        }
      });
      Object.defineProperty(exports2, "createRoutesFromChildren", {
        enumerable: true,
        get: function() {
          return reactRouter.createRoutesFromChildren;
        }
      });
      Object.defineProperty(exports2, "createRoutesFromElements", {
        enumerable: true,
        get: function() {
          return reactRouter.createRoutesFromElements;
        }
      });
      Object.defineProperty(exports2, "defer", {
        enumerable: true,
        get: function() {
          return reactRouter.defer;
        }
      });
      Object.defineProperty(exports2, "generatePath", {
        enumerable: true,
        get: function() {
          return reactRouter.generatePath;
        }
      });
      Object.defineProperty(exports2, "isRouteErrorResponse", {
        enumerable: true,
        get: function() {
          return reactRouter.isRouteErrorResponse;
        }
      });
      Object.defineProperty(exports2, "json", {
        enumerable: true,
        get: function() {
          return reactRouter.json;
        }
      });
      Object.defineProperty(exports2, "matchPath", {
        enumerable: true,
        get: function() {
          return reactRouter.matchPath;
        }
      });
      Object.defineProperty(exports2, "matchRoutes", {
        enumerable: true,
        get: function() {
          return reactRouter.matchRoutes;
        }
      });
      Object.defineProperty(exports2, "parsePath", {
        enumerable: true,
        get: function() {
          return reactRouter.parsePath;
        }
      });
      Object.defineProperty(exports2, "redirect", {
        enumerable: true,
        get: function() {
          return reactRouter.redirect;
        }
      });
      Object.defineProperty(exports2, "redirectDocument", {
        enumerable: true,
        get: function() {
          return reactRouter.redirectDocument;
        }
      });
      Object.defineProperty(exports2, "renderMatches", {
        enumerable: true,
        get: function() {
          return reactRouter.renderMatches;
        }
      });
      Object.defineProperty(exports2, "resolvePath", {
        enumerable: true,
        get: function() {
          return reactRouter.resolvePath;
        }
      });
      Object.defineProperty(exports2, "useActionData", {
        enumerable: true,
        get: function() {
          return reactRouter.useActionData;
        }
      });
      Object.defineProperty(exports2, "useAsyncError", {
        enumerable: true,
        get: function() {
          return reactRouter.useAsyncError;
        }
      });
      Object.defineProperty(exports2, "useAsyncValue", {
        enumerable: true,
        get: function() {
          return reactRouter.useAsyncValue;
        }
      });
      Object.defineProperty(exports2, "useBlocker", {
        enumerable: true,
        get: function() {
          return reactRouter.useBlocker;
        }
      });
      Object.defineProperty(exports2, "useHref", {
        enumerable: true,
        get: function() {
          return reactRouter.useHref;
        }
      });
      Object.defineProperty(exports2, "useInRouterContext", {
        enumerable: true,
        get: function() {
          return reactRouter.useInRouterContext;
        }
      });
      Object.defineProperty(exports2, "useLoaderData", {
        enumerable: true,
        get: function() {
          return reactRouter.useLoaderData;
        }
      });
      Object.defineProperty(exports2, "useLocation", {
        enumerable: true,
        get: function() {
          return reactRouter.useLocation;
        }
      });
      Object.defineProperty(exports2, "useMatch", {
        enumerable: true,
        get: function() {
          return reactRouter.useMatch;
        }
      });
      Object.defineProperty(exports2, "useMatches", {
        enumerable: true,
        get: function() {
          return reactRouter.useMatches;
        }
      });
      Object.defineProperty(exports2, "useNavigate", {
        enumerable: true,
        get: function() {
          return reactRouter.useNavigate;
        }
      });
      Object.defineProperty(exports2, "useNavigation", {
        enumerable: true,
        get: function() {
          return reactRouter.useNavigation;
        }
      });
      Object.defineProperty(exports2, "useNavigationType", {
        enumerable: true,
        get: function() {
          return reactRouter.useNavigationType;
        }
      });
      Object.defineProperty(exports2, "useOutlet", {
        enumerable: true,
        get: function() {
          return reactRouter.useOutlet;
        }
      });
      Object.defineProperty(exports2, "useOutletContext", {
        enumerable: true,
        get: function() {
          return reactRouter.useOutletContext;
        }
      });
      Object.defineProperty(exports2, "useParams", {
        enumerable: true,
        get: function() {
          return reactRouter.useParams;
        }
      });
      Object.defineProperty(exports2, "useResolvedPath", {
        enumerable: true,
        get: function() {
          return reactRouter.useResolvedPath;
        }
      });
      Object.defineProperty(exports2, "useRevalidator", {
        enumerable: true,
        get: function() {
          return reactRouter.useRevalidator;
        }
      });
      Object.defineProperty(exports2, "useRouteError", {
        enumerable: true,
        get: function() {
          return reactRouter.useRouteError;
        }
      });
      Object.defineProperty(exports2, "useRouteLoaderData", {
        enumerable: true,
        get: function() {
          return reactRouter.useRouteLoaderData;
        }
      });
      Object.defineProperty(exports2, "useRoutes", {
        enumerable: true,
        get: function() {
          return reactRouter.useRoutes;
        }
      });
      Object.defineProperty(exports2, "UNSAFE_ErrorResponseImpl", {
        enumerable: true,
        get: function() {
          return router2.UNSAFE_ErrorResponseImpl;
        }
      });
      exports2.BrowserRouter = BrowserRouter;
      exports2.Form = Form2;
      exports2.HashRouter = HashRouter;
      exports2.Link = Link2;
      exports2.NavLink = NavLink2;
      exports2.RouterProvider = RouterProvider2;
      exports2.ScrollRestoration = ScrollRestoration2;
      exports2.UNSAFE_FetchersContext = FetchersContext;
      exports2.UNSAFE_ViewTransitionContext = ViewTransitionContext;
      exports2.UNSAFE_useScrollRestoration = useScrollRestoration;
      exports2.createBrowserRouter = createBrowserRouter;
      exports2.createHashRouter = createHashRouter;
      exports2.createSearchParams = createSearchParams2;
      exports2.unstable_HistoryRouter = HistoryRouter;
      exports2.unstable_usePrompt = usePrompt;
      exports2.unstable_useViewTransitionState = useViewTransitionState;
      exports2.useBeforeUnload = useBeforeUnload2;
      exports2.useFetcher = useFetcher2;
      exports2.useFetchers = useFetchers2;
      exports2.useFormAction = useFormAction2;
      exports2.useLinkClickHandler = useLinkClickHandler2;
      exports2.useSearchParams = useSearchParams2;
      exports2.useSubmit = useSubmit2;
      Object.defineProperty(exports2, "__esModule", { value: true });
    }));
  }
});

// node_modules/react-router-dom/dist/main.js
var require_main2 = __commonJS({
  "node_modules/react-router-dom/dist/main.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_router_dom_development();
    }
  }
});

// node_modules/react-router-dom/server.js
var require_server = __commonJS({
  "node_modules/react-router-dom/server.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React9 = require_react();
    var router2 = require_router_cjs();
    var reactRouter = require_main();
    var reactRouterDom = require_main2();
    function _interopNamespace(e) {
      if (e && e.__esModule) return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React9);
    function StaticRouter({
      basename,
      children,
      location: locationProp = "/",
      future
    }) {
      if (typeof locationProp === "string") {
        locationProp = reactRouterDom.parsePath(locationProp);
      }
      let action = router2.Action.Pop;
      let location = {
        pathname: locationProp.pathname || "/",
        search: locationProp.search || "",
        hash: locationProp.hash || "",
        state: locationProp.state || null,
        key: locationProp.key || "default"
      };
      let staticNavigator = getStatelessNavigator();
      return /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Router, {
        basename,
        children,
        location,
        navigationType: action,
        navigator: staticNavigator,
        future,
        static: true
      });
    }
    function StaticRouterProvider2({
      context,
      router: router$1,
      hydrate: hydrate2 = true,
      nonce
    }) {
      !(router$1 && context) ? true ? router2.UNSAFE_invariant(false, "You must provide `router` and `context` to <StaticRouterProvider>") : router2.UNSAFE_invariant(false) : void 0;
      let dataRouterContext = {
        router: router$1,
        navigator: getStatelessNavigator(),
        static: true,
        staticContext: context,
        basename: context.basename || "/"
      };
      let fetchersContext = /* @__PURE__ */ new Map();
      let hydrateScript = "";
      if (hydrate2 !== false) {
        let data = {
          loaderData: context.loaderData,
          actionData: context.actionData,
          errors: serializeErrors(context.errors)
        };
        let json2 = htmlEscape(JSON.stringify(JSON.stringify(data)));
        hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${json2});`;
      }
      let {
        state
      } = dataRouterContext.router;
      return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_DataRouterContext.Provider, {
        value: dataRouterContext
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_DataRouterStateContext.Provider, {
        value: state
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_FetchersContext.Provider, {
        value: fetchersContext
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_ViewTransitionContext.Provider, {
        value: {
          isTransitioning: false
        }
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Router, {
        basename: dataRouterContext.basename,
        location: state.location,
        navigationType: state.historyAction,
        navigator: dataRouterContext.navigator,
        static: dataRouterContext.static,
        future: {
          v7_relativeSplatPath: router$1.future.v7_relativeSplatPath
        }
      }, /* @__PURE__ */ React__namespace.createElement(DataRoutes, {
        routes: router$1.routes,
        future: router$1.future,
        state
      })))))), hydrateScript ? /* @__PURE__ */ React__namespace.createElement("script", {
        suppressHydrationWarning: true,
        nonce,
        dangerouslySetInnerHTML: {
          __html: hydrateScript
        }
      }) : null);
    }
    function DataRoutes({
      routes,
      future,
      state
    }) {
      return reactRouter.UNSAFE_useRoutesImpl(routes, void 0, state, future);
    }
    function serializeErrors(errors) {
      if (!errors) return null;
      let entries = Object.entries(errors);
      let serialized = {};
      for (let [key, val] of entries) {
        if (router2.isRouteErrorResponse(val)) {
          serialized[key] = {
            ...val,
            __type: "RouteErrorResponse"
          };
        } else if (val instanceof Error) {
          serialized[key] = {
            message: val.message,
            __type: "Error",
            // If this is a subclass (i.e., ReferenceError), send up the type so we
            // can re-create the same type during hydration.
            ...val.name !== "Error" ? {
              __subType: val.name
            } : {}
          };
        } else {
          serialized[key] = val;
        }
      }
      return serialized;
    }
    function getStatelessNavigator() {
      return {
        createHref,
        encodeLocation,
        push(to) {
          throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
        },
        replace(to) {
          throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
        },
        go(delta) {
          throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
        },
        back() {
          throw new Error(`You cannot use navigator.back() on the server because it is a stateless environment.`);
        },
        forward() {
          throw new Error(`You cannot use navigator.forward() on the server because it is a stateless environment.`);
        }
      };
    }
    function createStaticHandler(routes, opts) {
      return router2.createStaticHandler(routes, {
        ...opts,
        mapRouteProperties: reactRouter.UNSAFE_mapRouteProperties
      });
    }
    function createStaticRouter2(routes, context, opts = {}) {
      let manifest = {};
      let dataRoutes = router2.UNSAFE_convertRoutesToDataRoutes(routes, reactRouter.UNSAFE_mapRouteProperties, void 0, manifest);
      let matches = context.matches.map((match) => {
        let route = manifest[match.route.id] || match.route;
        return {
          ...match,
          route
        };
      });
      let msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
      return {
        get basename() {
          return context.basename;
        },
        get future() {
          return {
            v7_fetcherPersist: false,
            v7_normalizeFormMethod: false,
            v7_partialHydration: opts.future?.v7_partialHydration === true,
            v7_prependBasename: false,
            v7_relativeSplatPath: opts.future?.v7_relativeSplatPath === true,
            unstable_skipActionErrorRevalidation: false
          };
        },
        get state() {
          return {
            historyAction: router2.Action.Pop,
            location: context.location,
            matches,
            loaderData: context.loaderData,
            actionData: context.actionData,
            errors: context.errors,
            initialized: true,
            navigation: router2.IDLE_NAVIGATION,
            restoreScrollPosition: null,
            preventScrollReset: false,
            revalidation: "idle",
            fetchers: /* @__PURE__ */ new Map(),
            blockers: /* @__PURE__ */ new Map()
          };
        },
        get routes() {
          return dataRoutes;
        },
        get window() {
          return void 0;
        },
        initialize() {
          throw msg("initialize");
        },
        subscribe() {
          throw msg("subscribe");
        },
        enableScrollRestoration() {
          throw msg("enableScrollRestoration");
        },
        navigate() {
          throw msg("navigate");
        },
        fetch() {
          throw msg("fetch");
        },
        revalidate() {
          throw msg("revalidate");
        },
        createHref,
        encodeLocation,
        getFetcher() {
          return router2.IDLE_FETCHER;
        },
        deleteFetcher() {
          throw msg("deleteFetcher");
        },
        dispose() {
          throw msg("dispose");
        },
        getBlocker() {
          return router2.IDLE_BLOCKER;
        },
        deleteBlocker() {
          throw msg("deleteBlocker");
        },
        _internalFetchControllers: /* @__PURE__ */ new Map(),
        _internalActiveDeferreds: /* @__PURE__ */ new Map(),
        _internalSetRoutes() {
          throw msg("_internalSetRoutes");
        }
      };
    }
    function createHref(to) {
      return typeof to === "string" ? to : reactRouterDom.createPath(to);
    }
    function encodeLocation(to) {
      let href = typeof to === "string" ? to : reactRouterDom.createPath(to);
      href = href.replace(/ $/, "%20");
      let encoded = ABSOLUTE_URL_REGEX2.test(href) ? new URL(href) : new URL(href, "http://localhost");
      return {
        pathname: encoded.pathname,
        search: encoded.search,
        hash: encoded.hash
      };
    }
    var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
    var ESCAPE_LOOKUP2 = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    var ESCAPE_REGEX2 = /[&><\u2028\u2029]/g;
    function htmlEscape(str) {
      return str.replace(ESCAPE_REGEX2, (match) => ESCAPE_LOOKUP2[match]);
    }
    exports.StaticRouter = StaticRouter;
    exports.StaticRouterProvider = StaticRouterProvider2;
    exports.createStaticHandler = createStaticHandler;
    exports.createStaticRouter = createStaticRouter2;
  }
});

// node_modules/@remix-run/react/dist/esm/index.js
var import_react_router_dom7 = __toESM(require_main2());

// node_modules/@remix-run/server-runtime/dist/esm/responses.js
var import_router = __toESM(require_router_cjs());
var json = (data, init = {}) => {
  return (0, import_router.json)(data, init);
};
var defer = (data, init = {}) => {
  return (0, import_router.defer)(data, init);
};
var redirect = (url, init = 302) => {
  return (0, import_router.redirect)(url, init);
};
var redirectDocument = (url, init = 302) => {
  return (0, import_router.redirectDocument)(url, init);
};

// node_modules/turbo-stream/dist/turbo-stream.mjs
var HOLE = -1;
var NAN = -2;
var NEGATIVE_INFINITY = -3;
var NEGATIVE_ZERO = -4;
var NULL = -5;
var POSITIVE_INFINITY = -6;
var UNDEFINED = -7;
var TYPE_BIGINT = "B";
var TYPE_DATE = "D";
var TYPE_ERROR = "E";
var TYPE_MAP = "M";
var TYPE_NULL_OBJECT = "N";
var TYPE_PROMISE = "P";
var TYPE_REGEXP = "R";
var TYPE_SET = "S";
var TYPE_SYMBOL = "Y";
var TYPE_URL = "U";
var TYPE_PREVIOUS_RESOLVED = "Z";
var Deferred = class {
  constructor() {
    __publicField(this, "promise");
    __publicField(this, "resolve");
    __publicField(this, "reject");
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
};
function createLineSplittingTransform() {
  const decoder = new TextDecoder();
  let leftover = "";
  return new TransformStream({
    transform(chunk, controller) {
      const str = decoder.decode(chunk, { stream: true });
      const parts = (leftover + str).split("\n");
      leftover = parts.pop() || "";
      for (const part of parts) {
        controller.enqueue(part);
      }
    },
    flush(controller) {
      if (leftover) {
        controller.enqueue(leftover);
      }
    }
  });
}
var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var globalObj = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : void 0;
function unflatten(parsed) {
  const { hydrated, values } = this;
  if (typeof parsed === "number")
    return hydrate.call(this, parsed);
  if (!Array.isArray(parsed) || !parsed.length)
    throw new SyntaxError();
  const startIndex = values.length;
  for (const value of parsed) {
    values.push(value);
  }
  hydrated.length = values.length;
  return hydrate.call(this, startIndex);
}
function hydrate(index) {
  const { hydrated, values, deferred, plugins } = this;
  let result;
  const stack = [
    [
      index,
      (v) => {
        result = v;
      }
    ]
  ];
  let postRun = [];
  while (stack.length > 0) {
    const [index2, set] = stack.pop();
    switch (index2) {
      case UNDEFINED:
        set(void 0);
        continue;
      case NULL:
        set(null);
        continue;
      case NAN:
        set(NaN);
        continue;
      case POSITIVE_INFINITY:
        set(Infinity);
        continue;
      case NEGATIVE_INFINITY:
        set(-Infinity);
        continue;
      case NEGATIVE_ZERO:
        set(-0);
        continue;
    }
    if (hydrated[index2]) {
      set(hydrated[index2]);
      continue;
    }
    const value = values[index2];
    if (!value || typeof value !== "object") {
      hydrated[index2] = value;
      set(value);
      continue;
    }
    if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const [type, b, c] = value;
        switch (type) {
          case TYPE_DATE:
            set(hydrated[index2] = new Date(b));
            continue;
          case TYPE_URL:
            set(hydrated[index2] = new URL(b));
            continue;
          case TYPE_BIGINT:
            set(hydrated[index2] = BigInt(b));
            continue;
          case TYPE_REGEXP:
            set(hydrated[index2] = new RegExp(b, c));
            continue;
          case TYPE_SYMBOL:
            set(hydrated[index2] = Symbol.for(b));
            continue;
          case TYPE_SET:
            const newSet = /* @__PURE__ */ new Set();
            hydrated[index2] = newSet;
            for (let i = 1; i < value.length; i++)
              stack.push([
                value[i],
                (v) => {
                  newSet.add(v);
                }
              ]);
            set(newSet);
            continue;
          case TYPE_MAP:
            const map = /* @__PURE__ */ new Map();
            hydrated[index2] = map;
            for (let i = 1; i < value.length; i += 2) {
              const r = [];
              stack.push([
                value[i + 1],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                value[i],
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                map.set(r[0], r[1]);
              });
            }
            set(map);
            continue;
          case TYPE_NULL_OBJECT:
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index2] = obj;
            for (const key of Object.keys(b).reverse()) {
              const r = [];
              stack.push([
                b[key],
                (v) => {
                  r[1] = v;
                }
              ]);
              stack.push([
                Number(key.slice(1)),
                (k) => {
                  r[0] = k;
                }
              ]);
              postRun.push(() => {
                obj[r[0]] = r[1];
              });
            }
            set(obj);
            continue;
          case TYPE_PROMISE:
            if (hydrated[b]) {
              set(hydrated[index2] = hydrated[b]);
            } else {
              const d = new Deferred();
              deferred[b] = d;
              set(hydrated[index2] = d.promise);
            }
            continue;
          case TYPE_ERROR:
            const [, message, errorType] = value;
            let error = errorType && globalObj && globalObj[errorType] ? new globalObj[errorType](message) : new Error(message);
            hydrated[index2] = error;
            set(error);
            continue;
          case TYPE_PREVIOUS_RESOLVED:
            set(hydrated[index2] = hydrated[b]);
            continue;
          default:
            if (Array.isArray(plugins)) {
              const r = [];
              const vals = value.slice(1);
              for (let i = 0; i < vals.length; i++) {
                const v = vals[i];
                stack.push([
                  v,
                  (v2) => {
                    r[i] = v2;
                  }
                ]);
              }
              postRun.push(() => {
                for (const plugin of plugins) {
                  const result2 = plugin(value[0], ...r);
                  if (result2) {
                    set(hydrated[index2] = result2.value);
                    return;
                  }
                }
                throw new SyntaxError();
              });
              continue;
            }
            throw new SyntaxError();
        }
      } else {
        const array = [];
        hydrated[index2] = array;
        for (let i = 0; i < value.length; i++) {
          const n = value[i];
          if (n !== HOLE) {
            stack.push([
              n,
              (v) => {
                array[i] = v;
              }
            ]);
          }
        }
        set(array);
        continue;
      }
    } else {
      const object = {};
      hydrated[index2] = object;
      for (const key of Object.keys(value).reverse()) {
        const r = [];
        stack.push([
          value[key],
          (v) => {
            r[1] = v;
          }
        ]);
        stack.push([
          Number(key.slice(1)),
          (k) => {
            r[0] = k;
          }
        ]);
        postRun.push(() => {
          object[r[0]] = r[1];
        });
      }
      set(object);
      continue;
    }
  }
  while (postRun.length > 0) {
    postRun.pop()();
  }
  return result;
}
async function decode(readable, options) {
  const { plugins } = options ?? {};
  const done = new Deferred();
  const reader = readable.pipeThrough(createLineSplittingTransform()).getReader();
  const decoder = {
    values: [],
    hydrated: [],
    deferred: {},
    plugins
  };
  const decoded = await decodeInitial.call(decoder, reader);
  let donePromise = done.promise;
  if (decoded.done) {
    done.resolve();
  } else {
    donePromise = decodeDeferred.call(decoder, reader).then(done.resolve).catch((reason) => {
      for (const deferred of Object.values(decoder.deferred)) {
        deferred.reject(reason);
      }
      done.reject(reason);
    });
  }
  return {
    done: donePromise.then(() => reader.closed),
    value: decoded.value
  };
}
async function decodeInitial(reader) {
  const read = await reader.read();
  if (!read.value) {
    throw new SyntaxError();
  }
  let line;
  try {
    line = JSON.parse(read.value);
  } catch (reason) {
    throw new SyntaxError();
  }
  return {
    done: read.done,
    value: unflatten.call(this, line)
  };
}
async function decodeDeferred(reader) {
  let read = await reader.read();
  while (!read.done) {
    if (!read.value)
      continue;
    const line = read.value;
    switch (line[0]) {
      case TYPE_PROMISE: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.resolve(value);
        break;
      }
      case TYPE_ERROR: {
        const colonIndex = line.indexOf(":");
        const deferredId = Number(line.slice(1, colonIndex));
        const deferred = this.deferred[deferredId];
        if (!deferred) {
          throw new Error(`Deferred ID ${deferredId} not found in stream`);
        }
        const lineData = line.slice(colonIndex + 1);
        let jsonLine;
        try {
          jsonLine = JSON.parse(lineData);
        } catch (reason) {
          throw new SyntaxError();
        }
        const value = unflatten.call(this, jsonLine);
        deferred.reject(value);
        break;
      }
      default:
        throw new SyntaxError();
    }
    read = await reader.read();
  }
}

// node_modules/@remix-run/server-runtime/dist/esm/single-fetch.js
var SingleFetchRedirectSymbol = /* @__PURE__ */ Symbol("SingleFetchRedirect");

// node_modules/@remix-run/react/dist/esm/browser.js
var import_router6 = __toESM(require_router_cjs());
var React6 = __toESM(require_react());
var import_react_router = __toESM(require_main());
var import_react_router_dom5 = __toESM(require_main2());

// node_modules/@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// node_modules/@remix-run/react/dist/esm/components.js
var React2 = __toESM(require_react());
var import_react_router_dom2 = __toESM(require_main2());

// node_modules/@remix-run/react/dist/esm/invariant.js
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}

// node_modules/@remix-run/react/dist/esm/links.js
var import_react_router_dom = __toESM(require_main2());

// node_modules/@remix-run/react/dist/esm/routeModules.js
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    if (window.__remixContext.isSpaMode && // @ts-expect-error
    typeof import.meta.hot !== "undefined") {
      console.error(`Error loading route module \`${route.module}\`:`, error);
      throw error;
    }
    window.location.reload();
    return new Promise(() => {
    });
  }
}

// node_modules/@remix-run/react/dist/esm/links.js
function getKeyedLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    var _module$links;
    let module = routeModules[match.route.id];
    let route = manifest.routes[match.route.id];
    return [route.css ? route.css.map((href) => ({
      rel: "stylesheet",
      href
    })) : [], (module === null || module === void 0 ? void 0 : (_module$links = module.links) === null || _module$links === void 0 ? void 0 : _module$links.call(module)) || []];
  }).flat(2);
  let preloads = getCurrentPageModulePreloadHrefs(matches, manifest);
  return dedupeLinkDescriptors(descriptors, preloads);
}
async function prefetchStyleLinks(route, routeModule) {
  var _route$css, _routeModule$links;
  if (!route.css && !routeModule.links || !isPreloadSupported()) return;
  let descriptors = [((_route$css = route.css) === null || _route$css === void 0 ? void 0 : _route$css.map((href) => ({
    rel: "stylesheet",
    href
  }))) ?? [], ((_routeModule$links = routeModule.links) === null || _routeModule$links === void 0 ? void 0 : _routeModule$links.call(routeModule)) ?? []].flat(1);
  if (descriptors.length === 0) return;
  let styleLinks = [];
  for (let descriptor of descriptors) {
    if (!isPageLinkDescriptor(descriptor) && descriptor.rel === "stylesheet") {
      styleLinks.push({
        ...descriptor,
        rel: "preload",
        as: "style"
      });
    }
  }
  let matchingLinks = styleLinks.filter((link) => (!link.media || window.matchMedia(link.media).matches) && !document.querySelector(`link[rel="stylesheet"][href="${link.href}"]`));
  await Promise.all(matchingLinks.map(prefetchStyleLink));
}
async function prefetchStyleLink(descriptor) {
  return new Promise((resolve) => {
    let link = document.createElement("link");
    Object.assign(link, descriptor);
    function removeLink() {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    }
    link.onload = () => {
      removeLink();
      resolve();
    };
    link.onerror = () => {
      removeLink();
      resolve();
    };
    document.head.appendChild(link);
  });
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page === "string";
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links = await Promise.all(matches.map(async (match) => {
    let mod = await loadRouteModule(manifest.routes[match.route.id], routeModules);
    return mod.links ? mod.links() : [];
  }));
  return dedupeLinkDescriptors(links.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map((link) => link.rel === "stylesheet" ? {
    ...link,
    rel: "prefetch",
    as: "style"
  } : {
    ...link,
    rel: "prefetch"
  }));
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let path = parsePathPatch(page);
  let isNew = (match, index) => {
    if (!currentMatches[index]) return true;
    return match.route.id !== currentMatches[index].route.id;
  };
  let matchPathChanged = (match, index) => {
    var _currentMatches$index;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_currentMatches$index = currentMatches[index].route.path) === null || _currentMatches$index === void 0 ? void 0 : _currentMatches$index.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  let newMatches = mode === "data" && location.search !== path.search ? (
    // this is really similar to stuff in transition.ts, maybe somebody smarter
    // than me (or in less of a hurry) can share some of it. You're the best.
    nextMatches.filter((match, index) => {
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index) || matchPathChanged(match, index)) {
        return true;
      }
      if (match.route.shouldRevalidate) {
        var _currentMatches$;
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(location.pathname + location.search + location.hash, window.origin),
          currentParams: ((_currentMatches$ = currentMatches[0]) === null || _currentMatches$ === void 0 ? void 0 : _currentMatches$.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: true
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return true;
    })
  ) : nextMatches.filter((match, index) => {
    let manifestRoute = manifest.routes[match.route.id];
    return (mode === "assets" || manifestRoute.hasLoader) && (isNew(match, index) || matchPathChanged(match, index));
  });
  return newMatches;
}
function getDataLinkHrefs(page, matches, manifest) {
  let path = parsePathPatch(page);
  return dedupeHrefs(matches.filter((match) => manifest.routes[match.route.id].hasLoader).map((match) => {
    let {
      pathname,
      search
    } = path;
    let searchParams = new URLSearchParams(search);
    searchParams.set("_data", match.route.id);
    return `${pathname}?${searchParams}`;
  }));
}
function getModuleLinkHrefs(matches, manifestPatch) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifestPatch.routes[match.route.id];
    let hrefs = [route.module];
    if (route.imports) {
      hrefs = hrefs.concat(route.imports);
    }
    return hrefs;
  }).flat(1));
}
function getCurrentPageModulePreloadHrefs(matches, manifest) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifest.routes[match.route.id];
    let hrefs = [route.module];
    if (route.imports) {
      hrefs = hrefs.concat(route.imports);
    }
    return hrefs;
  }).flat(1));
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  let preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let alreadyModulePreload = preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
    if (alreadyModulePreload) {
      return deduped;
    }
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({
        key,
        link: descriptor
      });
    }
    return deduped;
  }, []);
}
function parsePathPatch(href) {
  let path = (0, import_react_router_dom.parsePath)(href);
  if (path.search === void 0) path.search = "";
  return path;
}
var _isPreloadSupported;
function isPreloadSupported() {
  if (_isPreloadSupported !== void 0) {
    return _isPreloadSupported;
  }
  let el = document.createElement("link");
  _isPreloadSupported = el.relList.supports("preload");
  el = null;
  return _isPreloadSupported;
}

// node_modules/@remix-run/react/dist/esm/markup.js
var ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
function createHtml(html) {
  return {
    __html: html
  };
}

// node_modules/@remix-run/react/dist/esm/single-fetch.js
var React = __toESM(require_react());
var import_router3 = __toESM(require_router_cjs());

// node_modules/@remix-run/react/dist/esm/data.js
var import_router2 = __toESM(require_router_cjs());
function isCatchResponse(response) {
  return response.headers.get("X-Remix-Catch") != null;
}
function isErrorResponse(response) {
  return response.headers.get("X-Remix-Error") != null;
}
function isNetworkErrorResponse(response) {
  return isResponse(response) && response.status >= 400 && response.headers.get("X-Remix-Error") == null && response.headers.get("X-Remix-Catch") == null && response.headers.get("X-Remix-Response") == null;
}
function isRedirectResponse(response) {
  return response.headers.get("X-Remix-Redirect") != null;
}
function isDeferredResponse(response) {
  var _response$headers$get;
  return !!((_response$headers$get = response.headers.get("Content-Type")) !== null && _response$headers$get !== void 0 && _response$headers$get.match(/text\/remix-deferred/));
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
}
async function fetchData(request, routeId, retry = 0) {
  let url = new URL(request.url);
  url.searchParams.set("_data", routeId);
  if (retry > 0) {
    await new Promise((resolve) => setTimeout(resolve, 5 ** retry * 10));
  }
  let init = await createRequestInit(request);
  let revalidation = window.__remixRevalidation;
  let response = await fetch(url.href, init).catch((error) => {
    if (typeof revalidation === "number" && revalidation === window.__remixRevalidation && (error === null || error === void 0 ? void 0 : error.name) === "TypeError" && retry < 3) {
      return fetchData(request, routeId, retry + 1);
    }
    throw error;
  });
  if (isErrorResponse(response)) {
    let data = await response.json();
    let error = new Error(data.message);
    error.stack = data.stack;
    return error;
  }
  if (isNetworkErrorResponse(response)) {
    let text = await response.text();
    let error = new Error(text);
    error.stack = void 0;
    return error;
  }
  return response;
}
async function createRequestInit(request) {
  let init = {
    signal: request.signal
  };
  if (request.method !== "GET") {
    init.method = request.method;
    let contentType = request.headers.get("Content-Type");
    if (contentType && /\bapplication\/json\b/.test(contentType)) {
      init.headers = {
        "Content-Type": contentType
      };
      init.body = JSON.stringify(await request.json());
    } else if (contentType && /\btext\/plain\b/.test(contentType)) {
      init.headers = {
        "Content-Type": contentType
      };
      init.body = await request.text();
    } else if (contentType && /\bapplication\/x-www-form-urlencoded\b/.test(contentType)) {
      init.body = new URLSearchParams(await request.text());
    } else {
      init.body = await request.formData();
    }
  }
  return init;
}
var DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
async function parseDeferredReadableStream(stream) {
  if (!stream) {
    throw new Error("parseDeferredReadableStream requires stream argument");
  }
  let deferredData;
  let deferredResolvers = {};
  try {
    let sectionReader = readStreamSections(stream);
    let initialSectionResult = await sectionReader.next();
    let initialSection = initialSectionResult.value;
    if (!initialSection) throw new Error("no critical data");
    let criticalData = JSON.parse(initialSection);
    if (typeof criticalData === "object" && criticalData !== null) {
      for (let [eventKey, value] of Object.entries(criticalData)) {
        if (typeof value !== "string" || !value.startsWith(DEFERRED_VALUE_PLACEHOLDER_PREFIX)) {
          continue;
        }
        deferredData = deferredData || {};
        deferredData[eventKey] = new Promise((resolve, reject) => {
          deferredResolvers[eventKey] = {
            resolve: (value2) => {
              resolve(value2);
              delete deferredResolvers[eventKey];
            },
            reject: (error) => {
              reject(error);
              delete deferredResolvers[eventKey];
            }
          };
        });
      }
    }
    void (async () => {
      try {
        for await (let section of sectionReader) {
          let [event, ...sectionDataStrings] = section.split(":");
          let sectionDataString = sectionDataStrings.join(":");
          let data = JSON.parse(sectionDataString);
          if (event === "data") {
            for (let [key, value] of Object.entries(data)) {
              if (deferredResolvers[key]) {
                deferredResolvers[key].resolve(value);
              }
            }
          } else if (event === "error") {
            for (let [key, value] of Object.entries(data)) {
              let err = new Error(value.message);
              err.stack = value.stack;
              if (deferredResolvers[key]) {
                deferredResolvers[key].reject(err);
              }
            }
          }
        }
        for (let [key, resolver] of Object.entries(deferredResolvers)) {
          resolver.reject(new import_router2.AbortedDeferredError(`Deferred ${key} will never be resolved`));
        }
      } catch (error) {
        for (let resolver of Object.values(deferredResolvers)) {
          resolver.reject(error);
        }
      }
    })();
    return new import_router2.UNSAFE_DeferredData({
      ...criticalData,
      ...deferredData
    });
  } catch (error) {
    for (let resolver of Object.values(deferredResolvers)) {
      resolver.reject(error);
    }
    throw error;
  }
}
async function* readStreamSections(stream) {
  let reader = stream.getReader();
  let buffer = [];
  let sections = [];
  let closed = false;
  let encoder = new TextEncoder();
  let decoder = new TextDecoder();
  let readStreamSection = async () => {
    if (sections.length > 0) return sections.shift();
    while (!closed && sections.length === 0) {
      let chunk = await reader.read();
      if (chunk.done) {
        closed = true;
        break;
      }
      buffer.push(chunk.value);
      try {
        let bufferedString = decoder.decode(mergeArrays(...buffer));
        let splitSections = bufferedString.split("\n\n");
        if (splitSections.length >= 2) {
          sections.push(...splitSections.slice(0, -1));
          buffer = [encoder.encode(splitSections.slice(-1).join("\n\n"))];
        }
        if (sections.length > 0) {
          break;
        }
      } catch {
        continue;
      }
    }
    if (sections.length > 0) {
      return sections.shift();
    }
    if (buffer.length > 0) {
      let bufferedString = decoder.decode(mergeArrays(...buffer));
      sections = bufferedString.split("\n\n").filter((s) => s);
      buffer = [];
    }
    return sections.shift();
  };
  let section = await readStreamSection();
  while (section) {
    yield section;
    section = await readStreamSection();
  }
}
function mergeArrays(...arrays) {
  let out = new Uint8Array(arrays.reduce((total, arr) => total + arr.length, 0));
  let offset = 0;
  for (let arr of arrays) {
    out.set(arr, offset);
    offset += arr.length;
  }
  return out;
}

// node_modules/@remix-run/react/dist/esm/single-fetch.js
var defineClientLoader = (clientLoader) => clientLoader;
var defineClientAction = (clientAction) => clientAction;
function StreamTransfer({
  context,
  identifier,
  reader,
  textDecoder,
  nonce
}) {
  if (!context.renderMeta || !context.renderMeta.didRenderScripts) {
    return null;
  }
  if (!context.renderMeta.streamCache) {
    context.renderMeta.streamCache = {};
  }
  let {
    streamCache
  } = context.renderMeta;
  let promise = streamCache[identifier];
  if (!promise) {
    promise = streamCache[identifier] = reader.read().then((result) => {
      streamCache[identifier].result = {
        done: result.done,
        value: textDecoder.decode(result.value, {
          stream: true
        })
      };
    }).catch((e) => {
      streamCache[identifier].error = e;
    });
  }
  if (promise.error) {
    throw promise.error;
  }
  if (promise.result === void 0) {
    throw promise;
  }
  let {
    done,
    value
  } = promise.result;
  let scriptTag = value ? /* @__PURE__ */ React.createElement("script", {
    nonce,
    dangerouslySetInnerHTML: {
      __html: `window.__remixContext.streamController.enqueue(${escapeHtml(JSON.stringify(value))});`
    }
  }) : null;
  if (done) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, scriptTag, /* @__PURE__ */ React.createElement("script", {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `window.__remixContext.streamController.close();`
      }
    }));
  } else {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, scriptTag, /* @__PURE__ */ React.createElement(React.Suspense, null, /* @__PURE__ */ React.createElement(StreamTransfer, {
      context,
      identifier: identifier + 1,
      reader,
      textDecoder,
      nonce
    })));
  }
}
function getSingleFetchDataStrategy(manifest, routeModules) {
  return async ({
    request,
    matches
  }) => request.method !== "GET" ? singleFetchActionStrategy(request, matches) : singleFetchLoaderStrategy(manifest, routeModules, request, matches);
}
function singleFetchActionStrategy(request, matches) {
  return Promise.all(matches.map(async (m) => {
    let actionStatus;
    let result = await m.resolve(async (handler) => {
      let result2 = await handler(async () => {
        let url = singleFetchUrl(request.url);
        let init = await createRequestInit(request);
        let {
          data,
          status
        } = await fetchAndDecode(url, init);
        actionStatus = status;
        return unwrapSingleFetchResult(data, m.route.id);
      });
      return {
        type: "data",
        result: result2,
        status: actionStatus
      };
    });
    return {
      ...result,
      // Proxy along the action HTTP response status for thrown errors
      status: actionStatus
    };
  }));
}
function singleFetchLoaderStrategy(manifest, routeModules, request, matches) {
  let singleFetchPromise;
  return Promise.all(matches.map(async (m) => m.resolve(async (handler) => {
    let result;
    let url = stripIndexParam(singleFetchUrl(request.url));
    if (manifest.routes[m.route.id].hasClientLoader) {
      result = await handler(async () => {
        url.searchParams.set("_routes", m.route.id);
        let {
          data
        } = await fetchAndDecode(url);
        return unwrapSingleFetchResults(data, m.route.id);
      });
    } else {
      result = await handler(async () => {
        if (!singleFetchPromise) {
          url = addRevalidationParam(manifest, routeModules, matches.map((m2) => m2.route), matches.filter((m2) => m2.shouldLoad).map((m2) => m2.route), url);
          singleFetchPromise = fetchAndDecode(url).then(({
            data
          }) => data);
        }
        let results = await singleFetchPromise;
        return unwrapSingleFetchResults(results, m.route.id);
      });
    }
    return {
      type: "data",
      result
    };
  })));
}
function stripIndexParam(url) {
  let indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue);
    }
  }
  for (let toKeep of indexValuesToKeep) {
    url.searchParams.append("index", toKeep);
  }
  return url;
}
function addRevalidationParam(manifest, routeModules, matchedRoutes, loadRoutes, url) {
  let genRouteIds = (arr) => arr.filter((id) => manifest.routes[id].hasLoader).join(",");
  let needsParam = matchedRoutes.some((r) => {
    var _routeModules$r$id, _manifest$routes$r$id;
    return ((_routeModules$r$id = routeModules[r.id]) === null || _routeModules$r$id === void 0 ? void 0 : _routeModules$r$id.shouldRevalidate) || ((_manifest$routes$r$id = manifest.routes[r.id]) === null || _manifest$routes$r$id === void 0 ? void 0 : _manifest$routes$r$id.hasClientLoader);
  });
  if (!needsParam) {
    return url;
  }
  let matchedIds = genRouteIds(matchedRoutes.map((r) => r.id));
  let loadIds = genRouteIds(loadRoutes.filter((r) => {
    var _manifest$routes$r$id2;
    return !((_manifest$routes$r$id2 = manifest.routes[r.id]) !== null && _manifest$routes$r$id2 !== void 0 && _manifest$routes$r$id2.hasClientLoader);
  }).map((r) => r.id));
  if (matchedIds !== loadIds) {
    url.searchParams.set("_routes", loadIds);
  }
  return url;
}
function singleFetchUrl(reqUrl) {
  let url = typeof reqUrl === "string" ? new URL(reqUrl, window.location.origin) : reqUrl;
  url.pathname = `${url.pathname === "/" ? "_root" : url.pathname}.data`;
  return url;
}
async function fetchAndDecode(url, init) {
  let res = await fetch(url, init);
  invariant(res.body, "No response body to decode");
  try {
    let decoded = await decodeViaTurboStream(res.body, window);
    return {
      status: res.status,
      data: decoded.value
    };
  } catch (e) {
    console.error(e);
    throw new Error(`Unable to decode turbo-stream response from URL: ${url.toString()}`);
  }
}
function decodeViaTurboStream(body, global) {
  return decode(body, {
    plugins: [(type, ...rest) => {
      if (type === "SanitizedError") {
        let [name, message, stack] = rest;
        let Constructor = Error;
        if (name && name in global && typeof global[name] === "function") {
          Constructor = global[name];
        }
        let error = new Constructor(message);
        error.stack = stack;
        return {
          value: error
        };
      }
      if (type === "ErrorResponse") {
        let [data, status, statusText] = rest;
        return {
          value: new import_router3.UNSAFE_ErrorResponseImpl(status, statusText, data)
        };
      }
      if (type === "SingleFetchRedirect") {
        return {
          value: {
            [SingleFetchRedirectSymbol]: rest[0]
          }
        };
      }
    }]
  });
}
function unwrapSingleFetchResults(results, routeId) {
  let redirect4 = results[SingleFetchRedirectSymbol];
  if (redirect4) {
    return unwrapSingleFetchResult(redirect4, routeId);
  }
  return results[routeId] !== void 0 ? unwrapSingleFetchResult(results[routeId], routeId) : null;
}
function unwrapSingleFetchResult(result, routeId) {
  if ("error" in result) {
    throw result.error;
  } else if ("redirect" in result) {
    let headers = {};
    if (result.revalidate) {
      headers["X-Remix-Revalidate"] = "yes";
    }
    if (result.reload) {
      headers["X-Remix-Reload-Document"] = "yes";
    }
    return (0, import_router3.redirect)(result.redirect, {
      status: result.status,
      headers
    });
  } else if ("data" in result) {
    return result.data;
  } else {
    throw new Error(`No response found for routeId "${routeId}"`);
  }
}

// node_modules/@remix-run/react/dist/esm/components.js
function useDataRouterContext() {
  let context = React2.useContext(import_react_router_dom2.UNSAFE_DataRouterContext);
  invariant(context, "You must render this element inside a <DataRouterContext.Provider> element");
  return context;
}
function useDataRouterStateContext() {
  let context = React2.useContext(import_react_router_dom2.UNSAFE_DataRouterStateContext);
  invariant(context, "You must render this element inside a <DataRouterStateContext.Provider> element");
  return context;
}
var RemixContext = /* @__PURE__ */ React2.createContext(void 0);
RemixContext.displayName = "Remix";
function useRemixContext() {
  let context = React2.useContext(RemixContext);
  invariant(context, "You must render this element inside a <Remix> element");
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let [maybePrefetch, setMaybePrefetch] = React2.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = React2.useState(false);
  let {
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onTouchStart
  } = theirElementProps;
  let ref = React2.useRef(null);
  React2.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry) => {
          setShouldPrefetch(entry.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, {
        threshold: 0.5
      });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  let setIntent = () => {
    if (prefetch === "intent") {
      setMaybePrefetch(true);
    }
  };
  let cancelIntent = () => {
    if (prefetch === "intent") {
      setMaybePrefetch(false);
      setShouldPrefetch(false);
    }
  };
  React2.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);
  return [shouldPrefetch, ref, {
    onFocus: composeEventHandlers(onFocus, setIntent),
    onBlur: composeEventHandlers(onBlur, cancelIntent),
    onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
    onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
    onTouchStart: composeEventHandlers(onTouchStart, setIntent)
  }];
}
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var NavLink = /* @__PURE__ */ React2.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
  let href = (0, import_react_router_dom2.useHref)(to);
  let [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(import_react_router_dom2.NavLink, _extends({}, props, prefetchHandlers, {
    ref: mergeRefs(forwardedRef, ref),
    to
  })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React2.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
NavLink.displayName = "NavLink";
var Link = /* @__PURE__ */ React2.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX.test(to);
  let href = (0, import_react_router_dom2.useHref)(to);
  let [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(import_react_router_dom2.Link, _extends({}, props, prefetchHandlers, {
    ref: mergeRefs(forwardedRef, ref),
    to
  })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React2.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
Link.displayName = "Link";
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function getActiveMatches(matches, errors, isSpaMode) {
  if (isSpaMode && !isHydrated) {
    return [matches[0]];
  }
  if (errors) {
    let errorIdx = matches.findIndex((m) => errors[m.route.id] !== void 0);
    return matches.slice(0, errorIdx + 1);
  }
  return matches;
}
function Links() {
  let {
    isSpaMode,
    manifest,
    routeModules,
    criticalCss
  } = useRemixContext();
  let {
    errors,
    matches: routerMatches
  } = useDataRouterStateContext();
  let matches = getActiveMatches(routerMatches, errors, isSpaMode);
  let keyedLinks = React2.useMemo(() => getKeyedLinksForMatches(matches, routeModules, manifest), [matches, routeModules, manifest]);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, criticalCss ? /* @__PURE__ */ React2.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: criticalCss
    }
  }) : null, keyedLinks.map(({
    key,
    link
  }) => isPageLinkDescriptor(link) ? /* @__PURE__ */ React2.createElement(PrefetchPageLinks, _extends({
    key
  }, link)) : /* @__PURE__ */ React2.createElement("link", _extends({
    key
  }, link))));
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let {
    router: router2
  } = useDataRouterContext();
  let matches = React2.useMemo(() => (0, import_react_router_dom2.matchRoutes)(router2.routes, page, router2.basename), [router2.routes, page, router2.basename]);
  if (!matches) {
    console.warn(`Tried to prefetch ${page} but no routes matched.`);
    return null;
  }
  return /* @__PURE__ */ React2.createElement(PrefetchPageLinksImpl, _extends({
    page,
    matches
  }, dataLinkProps));
}
function useKeyedPrefetchLinks(matches) {
  let {
    manifest,
    routeModules
  } = useRemixContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = React2.useState([]);
  React2.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then((links) => {
      if (!interrupted) {
        setKeyedPrefetchLinks(links);
      }
    });
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = (0, import_react_router_dom2.useLocation)();
  let {
    future,
    manifest,
    routeModules
  } = useRemixContext();
  let {
    matches
  } = useDataRouterStateContext();
  let newMatchesForData = React2.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "data"), [page, nextMatches, matches, manifest, location]);
  let newMatchesForAssets = React2.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "assets"), [page, nextMatches, matches, manifest, location]);
  let dataHrefs = React2.useMemo(() => getDataLinkHrefs(page, newMatchesForData, manifest), [newMatchesForData, page, manifest]);
  let moduleHrefs = React2.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]);
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  let linksToRender = null;
  if (!future.unstable_singleFetch) {
    linksToRender = dataHrefs.map((href) => /* @__PURE__ */ React2.createElement("link", _extends({
      key: href,
      rel: "prefetch",
      as: "fetch",
      href
    }, linkProps)));
  } else if (newMatchesForData.length > 0) {
    let url = addRevalidationParam(manifest, routeModules, nextMatches.map((m) => m.route), newMatchesForData.map((m) => m.route), singleFetchUrl(page));
    if (url.searchParams.get("_routes") !== "") {
      linksToRender = /* @__PURE__ */ React2.createElement("link", _extends({
        key: url.pathname + url.search,
        rel: "prefetch",
        as: "fetch",
        href: url.pathname + url.search
      }, linkProps));
    }
  } else ;
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, linksToRender, moduleHrefs.map((href) => /* @__PURE__ */ React2.createElement("link", _extends({
    key: href,
    rel: "modulepreload",
    href
  }, linkProps))), keyedPrefetchLinks.map(({
    key,
    link
  }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ React2.createElement("link", _extends({
      key
    }, link))
  )));
}
function Meta() {
  let {
    isSpaMode,
    routeModules
  } = useRemixContext();
  let {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext();
  let location = (0, import_react_router_dom2.useLocation)();
  let _matches = getActiveMatches(routerMatches, errors, isSpaMode);
  let error = null;
  if (errors) {
    error = errors[_matches[_matches.length - 1].route.id];
  }
  let meta = [];
  let leafMeta = null;
  let matches = [];
  for (let i = 0; i < _matches.length; i++) {
    let _match = _matches[i];
    let routeId = _match.route.id;
    let data = loaderData[routeId];
    let params = _match.params;
    let routeModule = routeModules[routeId];
    let routeMeta = [];
    let match = {
      id: routeId,
      data,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      error
    };
    matches[i] = match;
    if (routeModule !== null && routeModule !== void 0 && routeModule.meta) {
      routeMeta = typeof routeModule.meta === "function" ? routeModule.meta({
        data,
        params,
        location,
        matches,
        error
      }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta;
    } else if (leafMeta) {
      routeMeta = [...leafMeta];
    }
    routeMeta = routeMeta || [];
    if (!Array.isArray(routeMeta)) {
      throw new Error("The route at " + _match.route.path + " returns an invalid value. All route meta functions must return an array of meta objects.\n\nTo reference the meta function API, see https://remix.run/route/meta");
    }
    match.meta = routeMeta;
    matches[i] = match;
    meta = [...routeMeta];
    leafMeta = meta;
  }
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, meta.flat().map((metaProps) => {
    if (!metaProps) {
      return null;
    }
    if ("tagName" in metaProps) {
      let {
        tagName,
        ...rest
      } = metaProps;
      if (!isValidMetaTag(tagName)) {
        console.warn(`A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`);
        return null;
      }
      let Comp = tagName;
      return /* @__PURE__ */ React2.createElement(Comp, _extends({
        key: JSON.stringify(rest)
      }, rest));
    }
    if ("title" in metaProps) {
      return /* @__PURE__ */ React2.createElement("title", {
        key: "title"
      }, String(metaProps.title));
    }
    if ("charset" in metaProps) {
      metaProps.charSet ?? (metaProps.charSet = metaProps.charset);
      delete metaProps.charset;
    }
    if ("charSet" in metaProps && metaProps.charSet != null) {
      return typeof metaProps.charSet === "string" ? /* @__PURE__ */ React2.createElement("meta", {
        key: "charSet",
        charSet: metaProps.charSet
      }) : null;
    }
    if ("script:ld+json" in metaProps) {
      try {
        let json2 = JSON.stringify(metaProps["script:ld+json"]);
        return /* @__PURE__ */ React2.createElement("script", {
          key: `script:ld+json:${json2}`,
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: json2
          }
        });
      } catch (err) {
        return null;
      }
    }
    return /* @__PURE__ */ React2.createElement("meta", _extends({
      key: JSON.stringify(metaProps)
    }, metaProps));
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName === "string" && /^(meta|link)$/.test(tagName);
}
function Await(props) {
  return /* @__PURE__ */ React2.createElement(import_react_router_dom2.Await, props);
}
var isHydrated = false;
function Scripts(props) {
  let {
    manifest,
    serverHandoffString,
    abortDelay,
    serializeError,
    isSpaMode,
    future,
    renderMeta
  } = useRemixContext();
  let {
    router: router2,
    static: isStatic,
    staticContext
  } = useDataRouterContext();
  let {
    matches: routerMatches
  } = useDataRouterStateContext();
  let navigation = (0, import_react_router_dom2.useNavigation)();
  if (renderMeta) {
    renderMeta.didRenderScripts = true;
  }
  let matches = getActiveMatches(routerMatches, null, isSpaMode);
  React2.useEffect(() => {
    isHydrated = true;
  }, []);
  let serializePreResolvedErrorImp = (key, error) => {
    let toSerialize;
    if (serializeError && error instanceof Error) {
      toSerialize = serializeError(error);
    } else {
      toSerialize = error;
    }
    return `${JSON.stringify(key)}:__remixContext.p(!1, ${escapeHtml(JSON.stringify(toSerialize))})`;
  };
  let serializePreresolvedDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializePreResolvedErrorImp(key, error);
    }
    return `${JSON.stringify(key)}:__remixContext.p(${escapeHtml(serializedData)})`;
  };
  let serializeErrorImp = (routeId, key, error) => {
    let toSerialize;
    if (serializeError && error instanceof Error) {
      toSerialize = serializeError(error);
    } else {
      toSerialize = error;
    }
    return `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, !1, ${escapeHtml(JSON.stringify(toSerialize))})`;
  };
  let serializeDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializeErrorImp(routeId, key, error);
    }
    return `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, ${escapeHtml(serializedData)})`;
  };
  let deferredScripts = [];
  let initialScripts = React2.useMemo(() => {
    var _manifest$hmr;
    let streamScript = future.unstable_singleFetch ? (
      // prettier-ignore
      "window.__remixContext.stream = new ReadableStream({start(controller){window.__remixContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());"
    ) : "";
    let contextScript = staticContext ? `window.__remixContext = ${serverHandoffString};${streamScript}` : " ";
    let activeDeferreds = future.unstable_singleFetch ? void 0 : staticContext === null || staticContext === void 0 ? void 0 : staticContext.activeDeferreds;
    contextScript += !activeDeferreds ? "" : ["__remixContext.p = function(v,e,p,x) {", "  if (typeof e !== 'undefined') {", true ? "    x=new Error(e.message);\n    x.stack=e.stack;" : '    x=new Error("Unexpected Server Error");\n    x.stack=undefined;', "    p=Promise.reject(x);", "  } else {", "    p=Promise.resolve(v);", "  }", "  return p;", "};", "__remixContext.n = function(i,k) {", "  __remixContext.t = __remixContext.t || {};", "  __remixContext.t[i] = __remixContext.t[i] || {};", "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});", typeof abortDelay === "number" ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${abortDelay});` : "", "  return p;", "};", "__remixContext.r = function(i,k,v,e,p,x) {", "  p = __remixContext.t[i][k];", "  if (typeof e !== 'undefined') {", true ? "    x=new Error(e.message);\n    x.stack=e.stack;" : '    x=new Error("Unexpected Server Error");\n    x.stack=undefined;', "    p.e(x);", "  } else {", "    p.r(v);", "  }", "};"].join("\n") + Object.entries(activeDeferreds).map(([routeId, deferredData]) => {
      let pendingKeys = new Set(deferredData.pendingKeys);
      let promiseKeyValues = deferredData.deferredKeys.map((key) => {
        if (pendingKeys.has(key)) {
          deferredScripts.push(/* @__PURE__ */ React2.createElement(DeferredHydrationScript, {
            key: `${routeId} | ${key}`,
            deferredData,
            routeId,
            dataKey: key,
            scriptProps: props,
            serializeData: serializeDataImp,
            serializeError: serializeErrorImp
          }));
          return `${JSON.stringify(key)}:__remixContext.n(${JSON.stringify(routeId)}, ${JSON.stringify(key)})`;
        } else {
          let trackedPromise = deferredData.data[key];
          if (typeof trackedPromise._error !== "undefined") {
            return serializePreResolvedErrorImp(key, trackedPromise._error);
          } else {
            return serializePreresolvedDataImp(routeId, key, trackedPromise._data);
          }
        }
      }).join(",\n");
      return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(routeId)}], {${promiseKeyValues}});`;
    }).join("\n") + (deferredScripts.length > 0 ? `__remixContext.a=${deferredScripts.length};` : "");
    let routeModulesScript = !isStatic ? " " : `${(_manifest$hmr = manifest.hmr) !== null && _manifest$hmr !== void 0 && _manifest$hmr.runtime ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}import ${JSON.stringify(manifest.url)};
${matches.map((match, index) => `import * as route${index} from ${JSON.stringify(manifest.routes[match.route.id].module)};`).join("\n")}
window.__remixRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});`;
    return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("script", _extends({}, props, {
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: createHtml(contextScript),
      type: void 0
    })), /* @__PURE__ */ React2.createElement("script", _extends({}, props, {
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: createHtml(routeModulesScript),
      type: "module",
      async: true
    })));
  }, []);
  if (!isStatic && typeof __remixContext === "object" && __remixContext.a) {
    for (let i = 0; i < __remixContext.a; i++) {
      deferredScripts.push(/* @__PURE__ */ React2.createElement(DeferredHydrationScript, {
        key: i,
        scriptProps: props,
        serializeData: serializeDataImp,
        serializeError: serializeErrorImp
      }));
    }
  }
  let nextMatches = React2.useMemo(() => {
    if (navigation.location) {
      let matches2 = (0, import_react_router_dom2.matchRoutes)(router2.routes, navigation.location, router2.basename);
      invariant(matches2, `No routes match path "${navigation.location.pathname}"`);
      return matches2;
    }
    return [];
  }, [navigation.location, router2.routes, router2.basename]);
  let routePreloads = matches.concat(nextMatches).map((match) => {
    let route = manifest.routes[match.route.id];
    return (route.imports || []).concat([route.module]);
  }).flat(1);
  let preloads = isHydrated ? [] : manifest.entry.imports.concat(routePreloads);
  return isHydrated ? null : /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("link", {
    rel: "modulepreload",
    href: manifest.url,
    crossOrigin: props.crossOrigin
  }), /* @__PURE__ */ React2.createElement("link", {
    rel: "modulepreload",
    href: manifest.entry.module,
    crossOrigin: props.crossOrigin
  }), dedupe(preloads).map((path) => /* @__PURE__ */ React2.createElement("link", {
    key: path,
    rel: "modulepreload",
    href: path,
    crossOrigin: props.crossOrigin
  })), initialScripts, deferredScripts);
}
function DeferredHydrationScript({
  dataKey,
  deferredData,
  routeId,
  scriptProps,
  serializeData,
  serializeError
}) {
  if (typeof document === "undefined" && deferredData && dataKey && routeId) {
    invariant(deferredData.pendingKeys.includes(dataKey), `Deferred data for route ${routeId} with key ${dataKey} was not pending but tried to render a script for it.`);
  }
  return /* @__PURE__ */ React2.createElement(React2.Suspense, {
    fallback: (
      // This makes absolutely no sense. The server renders null as a fallback,
      // but when hydrating, we need to render a script tag to avoid a hydration issue.
      // To reproduce a hydration mismatch, just render null as a fallback.
      typeof document === "undefined" && deferredData && dataKey && routeId ? null : /* @__PURE__ */ React2.createElement("script", _extends({}, scriptProps, {
        async: true,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: " "
        }
      }))
    )
  }, typeof document === "undefined" && deferredData && dataKey && routeId ? /* @__PURE__ */ React2.createElement(Await, {
    resolve: deferredData.data[dataKey],
    errorElement: /* @__PURE__ */ React2.createElement(ErrorDeferredHydrationScript, {
      dataKey,
      routeId,
      scriptProps,
      serializeError
    }),
    children: (data) => {
      return /* @__PURE__ */ React2.createElement("script", _extends({}, scriptProps, {
        async: true,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: serializeData(routeId, dataKey, data)
        }
      }));
    }
  }) : /* @__PURE__ */ React2.createElement("script", _extends({}, scriptProps, {
    async: true,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: " "
    }
  })));
}
function ErrorDeferredHydrationScript({
  dataKey,
  routeId,
  scriptProps,
  serializeError
}) {
  let error = (0, import_react_router_dom2.useAsyncError)();
  return /* @__PURE__ */ React2.createElement("script", _extends({}, scriptProps, {
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: serializeError(routeId, dataKey, error)
    }
  }));
}
function dedupe(array) {
  return [...new Set(array)];
}
function useMatches() {
  return (0, import_react_router_dom2.useMatches)();
}
function useLoaderData() {
  return (0, import_react_router_dom2.useLoaderData)();
}
function useRouteLoaderData(routeId) {
  return (0, import_react_router_dom2.useRouteLoaderData)(routeId);
}
function useActionData() {
  return (0, import_react_router_dom2.useActionData)();
}
function useFetcher(opts = {}) {
  return (0, import_react_router_dom2.useFetcher)(opts);
}
var LiveReload = (
  // Dead Code Elimination magic for production builds.
  // This way devs don't have to worry about doing the NODE_ENV check themselves.
  false ? () => null : function LiveReload2({
    origin,
    port,
    timeoutMs = 1e3,
    nonce = void 0
  }) {
    let isViteClient = import.meta && import.meta.env !== void 0;
    if (isViteClient) {
      console.warn(["`<LiveReload />` is obsolete when using Vite and can conflict with Vite's built-in HMR runtime.", "", "Remove `<LiveReload />` from your code and instead only use `<Scripts />`.", "Then refresh the page to remove lingering scripts from `<LiveReload />`."].join("\n"));
      return null;
    }
    origin ?? (origin = process.env.REMIX_DEV_ORIGIN);
    let js = String.raw;
    return /* @__PURE__ */ React2.createElement("script", {
      nonce,
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: {
        __html: js`
                function remixLiveReloadConnect(config) {
                  let LIVE_RELOAD_ORIGIN = ${JSON.stringify(origin)};
                  let protocol =
                    LIVE_RELOAD_ORIGIN ? new URL(LIVE_RELOAD_ORIGIN).protocol.replace(/^http/, "ws") :
                    location.protocol === "https:" ? "wss:" : "ws:"; // remove in v2?
                  let hostname = LIVE_RELOAD_ORIGIN ? new URL(LIVE_RELOAD_ORIGIN).hostname : location.hostname;
                  let url = new URL(protocol + "//" + hostname + "/socket");

                  url.port =
                    ${port} ||
                    (LIVE_RELOAD_ORIGIN ? new URL(LIVE_RELOAD_ORIGIN).port : 8002);

                  let ws = new WebSocket(url.href);
                  ws.onmessage = async (message) => {
                    let event = JSON.parse(message.data);
                    if (event.type === "LOG") {
                      console.log(event.message);
                    }
                    if (event.type === "RELOAD") {
                      console.log("💿 Reloading window ...");
                      window.location.reload();
                    }
                    if (event.type === "HMR") {
                      if (!window.__hmr__ || !window.__hmr__.contexts) {
                        console.log("💿 [HMR] No HMR context, reloading window ...");
                        window.location.reload();
                        return;
                      }
                      if (!event.updates || !event.updates.length) return;
                      let updateAccepted = false;
                      let needsRevalidation = new Set();
                      for (let update of event.updates) {
                        console.log("[HMR] " + update.reason + " [" + update.id +"]")
                        if (update.revalidate) {
                          needsRevalidation.add(update.routeId);
                          console.log("[HMR] Revalidating [" + update.routeId + "]");
                        }
                        let imported = await import(update.url +  '?t=' + event.assetsManifest.hmr.timestamp);
                        if (window.__hmr__.contexts[update.id]) {
                          let accepted = window.__hmr__.contexts[update.id].emit(
                            imported
                          );
                          if (accepted) {
                            console.log("[HMR] Update accepted by", update.id);
                            updateAccepted = true;
                          }
                        }
                      }
                      if (event.assetsManifest && window.__hmr__.contexts["remix:manifest"]) {
                        let accepted = window.__hmr__.contexts["remix:manifest"].emit(
                          { needsRevalidation, assetsManifest: event.assetsManifest }
                        );
                        if (accepted) {
                          console.log("[HMR] Update accepted by", "remix:manifest");
                          updateAccepted = true;
                        }
                      }
                      if (!updateAccepted) {
                        console.log("[HMR] Update rejected, reloading...");
                        window.location.reload();
                      }
                    }
                  };
                  ws.onopen = () => {
                    if (config && typeof config.onOpen === "function") {
                      config.onOpen();
                    }
                  };
                  ws.onclose = (event) => {
                    if (event.code === 1006) {
                      console.log("Remix dev asset server web socket closed. Reconnecting...");
                      setTimeout(
                        () =>
                          remixLiveReloadConnect({
                            onOpen: () => window.location.reload(),
                          }),
                      ${String(timeoutMs)}
                      );
                    }
                  };
                  ws.onerror = (error) => {
                    console.log("Remix dev asset server web socket error:");
                    console.error(error);
                  };
                }
                remixLiveReloadConnect();
              `
      }
    });
  }
);
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

// node_modules/@remix-run/react/dist/esm/errorBoundaries.js
var React3 = __toESM(require_react());
var import_react_router_dom3 = __toESM(require_main2());
var RemixErrorBoundary = class extends React3.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: props.error || null,
      location: props.location
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return {
        error: props.error || null,
        location: props.location
      };
    }
    return {
      error: props.error || state.error,
      location: state.location
    };
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ React3.createElement(RemixRootDefaultErrorBoundary, {
        error: this.state.error
      });
    } else {
      return this.props.children;
    }
  }
};
function RemixRootDefaultErrorBoundary({
  error
}) {
  console.error(error);
  let heyDeveloper = /* @__PURE__ */ React3.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
        console.log(
          "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
        );
      `
    }
  });
  if ((0, import_react_router_dom3.isRouteErrorResponse)(error)) {
    return /* @__PURE__ */ React3.createElement(BoundaryShell, {
      title: "Unhandled Thrown Response!"
    }, /* @__PURE__ */ React3.createElement("h1", {
      style: {
        fontSize: "24px"
      }
    }, error.status, " ", error.statusText), heyDeveloper);
  }
  let errorInstance;
  if (error instanceof Error) {
    errorInstance = error;
  } else {
    let errorString = error == null ? "Unknown Error" : typeof error === "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ React3.createElement(BoundaryShell, {
    title: "Application Error!"
  }, /* @__PURE__ */ React3.createElement("h1", {
    style: {
      fontSize: "24px"
    }
  }, "Application Error"), /* @__PURE__ */ React3.createElement("pre", {
    style: {
      padding: "2rem",
      background: "hsla(10, 50%, 50%, 0.1)",
      color: "red",
      overflow: "auto"
    }
  }, errorInstance.stack), heyDeveloper);
}
function BoundaryShell({
  title,
  renderScripts,
  children
}) {
  var _routeModules$root;
  let {
    routeModules
  } = useRemixContext();
  if ((_routeModules$root = routeModules.root) !== null && _routeModules$root !== void 0 && _routeModules$root.Layout) {
    return children;
  }
  return /* @__PURE__ */ React3.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React3.createElement("head", null, /* @__PURE__ */ React3.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React3.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  }), /* @__PURE__ */ React3.createElement("title", null, title)), /* @__PURE__ */ React3.createElement("body", null, /* @__PURE__ */ React3.createElement("main", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, children, renderScripts ? /* @__PURE__ */ React3.createElement(Scripts, null) : null)));
}

// node_modules/@remix-run/react/dist/esm/errors.js
var import_router4 = __toESM(require_router_cjs());
function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new import_router4.UNSAFE_ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
    } else if (val && val.__type === "Error") {
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor === "function") {
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = val.stack;
            serialized[key] = error;
          } catch (e) {
          }
        }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        error.stack = val.stack;
        serialized[key] = error;
      }
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}

// node_modules/@remix-run/react/dist/esm/routes.js
var React5 = __toESM(require_react());
var import_router5 = __toESM(require_router_cjs());
var import_react_router_dom4 = __toESM(require_main2());

// node_modules/@remix-run/react/dist/esm/fallback.js
var React4 = __toESM(require_react());
function RemixRootDefaultHydrateFallback() {
  return /* @__PURE__ */ React4.createElement(BoundaryShell, {
    title: "Loading...",
    renderScripts: true
  }, /* @__PURE__ */ React4.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer \u{1F44B}. You can provide a way better UX than this " +
                "when your app is running \`clientLoader\` functions on hydration. " +
                "Check out https://remix.run/route/hydrate-fallback for more information."
              );
            `
    }
  }));
}

// node_modules/@remix-run/react/dist/esm/routes.js
function groupRoutesByParentId(manifest) {
  let routes = {};
  Object.values(manifest).forEach((route) => {
    let parentId = route.parentId || "";
    if (!routes[parentId]) {
      routes[parentId] = [];
    }
    routes[parentId].push(route);
  });
  return routes;
}
function getRouteComponents(route, routeModule, isSpaMode) {
  let Component2 = getRouteModuleComponent(routeModule);
  let HydrateFallback = routeModule.HydrateFallback && (!isSpaMode || route.id === "root") ? routeModule.HydrateFallback : route.id === "root" ? RemixRootDefaultHydrateFallback : void 0;
  let ErrorBoundary = routeModule.ErrorBoundary ? routeModule.ErrorBoundary : route.id === "root" ? () => /* @__PURE__ */ React5.createElement(RemixRootDefaultErrorBoundary, {
    error: (0, import_react_router_dom4.useRouteError)()
  }) : void 0;
  if (route.id === "root" && routeModule.Layout) {
    return {
      ...Component2 ? {
        element: /* @__PURE__ */ React5.createElement(routeModule.Layout, null, /* @__PURE__ */ React5.createElement(Component2, null))
      } : {
        Component: Component2
      },
      ...ErrorBoundary ? {
        errorElement: /* @__PURE__ */ React5.createElement(routeModule.Layout, null, /* @__PURE__ */ React5.createElement(ErrorBoundary, null))
      } : {
        ErrorBoundary
      },
      ...HydrateFallback ? {
        hydrateFallbackElement: /* @__PURE__ */ React5.createElement(routeModule.Layout, null, /* @__PURE__ */ React5.createElement(HydrateFallback, null))
      } : {
        HydrateFallback
      }
    };
  }
  return {
    Component: Component2,
    ErrorBoundary,
    HydrateFallback
  };
}
function createServerRoutes(manifest, routeModules, future, isSpaMode, parentId = "", routesByParentId = groupRoutesByParentId(manifest), spaModeLazyPromise = Promise.resolve({
  Component: () => null
})) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModules[route.id];
    invariant(routeModule, "No `routeModule` available to create server routes");
    let dataRoute = {
      ...getRouteComponents(route, routeModule, isSpaMode),
      caseSensitive: route.caseSensitive,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModule.handle,
      // For SPA Mode, all routes are lazy except root.  However we tell the
      // router root is also lazy here too since we don't need a full
      // implementation - we just need a `lazy` prop to tell the RR rendering
      // where to stop which is always at the root route in SPA mode
      lazy: isSpaMode ? () => spaModeLazyPromise : void 0,
      // For partial hydration rendering, we need to indicate when the route
      // has a loader/clientLoader, but it won't ever be called during the static
      // render, so just give it a no-op function so we can render down to the
      // proper fallback
      loader: route.hasLoader || route.hasClientLoader ? () => null : void 0
      // We don't need action/shouldRevalidate on these routes since they're
      // for a static render
    };
    let children = createServerRoutes(manifest, routeModules, future, isSpaMode, route.id, routesByParentId, spaModeLazyPromise);
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function createClientRoutesWithHMRRevalidationOptOut(needsRevalidation, manifest, routeModulesCache, initialState, future, isSpaMode) {
  return createClientRoutes(manifest, routeModulesCache, initialState, future, isSpaMode, "", groupRoutesByParentId(manifest), needsRevalidation);
}
function preventInvalidServerHandlerCall(type, route, isSpaMode) {
  if (isSpaMode) {
    let fn2 = type === "action" ? "serverAction()" : "serverLoader()";
    let msg2 = `You cannot call ${fn2} in SPA Mode (routeId: "${route.id}")`;
    console.error(msg2);
    throw new import_router5.UNSAFE_ErrorResponseImpl(400, "Bad Request", new Error(msg2), true);
  }
  let fn = type === "action" ? "serverAction()" : "serverLoader()";
  let msg = `You are trying to call ${fn} on a route that does not have a server ${type} (routeId: "${route.id}")`;
  if (type === "loader" && !route.hasLoader || type === "action" && !route.hasAction) {
    console.error(msg);
    throw new import_router5.UNSAFE_ErrorResponseImpl(400, "Bad Request", new Error(msg), true);
  }
}
function noActionDefinedError(type, routeId) {
  let article = type === "clientAction" ? "a" : "an";
  let msg = `Route "${routeId}" does not have ${article} ${type}, but you are trying to submit to it. To fix this, please add ${article} \`${type}\` function to the route`;
  console.error(msg);
  throw new import_router5.UNSAFE_ErrorResponseImpl(405, "Method Not Allowed", new Error(msg), true);
}
function createClientRoutes(manifest, routeModulesCache, initialState, future, isSpaMode, parentId = "", routesByParentId = groupRoutesByParentId(manifest), needsRevalidation) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModulesCache[route.id];
    async function fetchServerHandlerAndMaybeUnwrap(request, unwrap, singleFetch) {
      if (typeof singleFetch === "function") {
        let result2 = await singleFetch();
        return result2;
      }
      let result = await fetchServerHandler(request, route);
      return unwrap ? unwrapServerResponse(result) : result;
    }
    function fetchServerLoader(request, unwrap, singleFetch) {
      if (!route.hasLoader) return Promise.resolve(null);
      return fetchServerHandlerAndMaybeUnwrap(request, unwrap, singleFetch);
    }
    function fetchServerAction(request, unwrap, singleFetch) {
      if (!route.hasAction) {
        throw noActionDefinedError("action", route.id);
      }
      return fetchServerHandlerAndMaybeUnwrap(request, unwrap, singleFetch);
    }
    async function prefetchStylesAndCallHandler(handler) {
      let cachedModule = routeModulesCache[route.id];
      let linkPrefetchPromise = cachedModule ? prefetchStyleLinks(route, cachedModule) : Promise.resolve();
      try {
        return handler();
      } finally {
        await linkPrefetchPromise;
      }
    }
    let dataRoute = {
      id: route.id,
      index: route.index,
      path: route.path
    };
    if (routeModule) {
      var _initialState$loaderD, _initialState$errors, _routeModule$clientLo;
      Object.assign(dataRoute, {
        ...dataRoute,
        ...getRouteComponents(route, routeModule, isSpaMode),
        handle: routeModule.handle,
        shouldRevalidate: needsRevalidation ? wrapShouldRevalidateForHdr(route.id, routeModule.shouldRevalidate, needsRevalidation) : routeModule.shouldRevalidate
      });
      let initialData = initialState === null || initialState === void 0 ? void 0 : (_initialState$loaderD = initialState.loaderData) === null || _initialState$loaderD === void 0 ? void 0 : _initialState$loaderD[route.id];
      let initialError = initialState === null || initialState === void 0 ? void 0 : (_initialState$errors = initialState.errors) === null || _initialState$errors === void 0 ? void 0 : _initialState$errors[route.id];
      let isHydrationRequest = needsRevalidation == null && (((_routeModule$clientLo = routeModule.clientLoader) === null || _routeModule$clientLo === void 0 ? void 0 : _routeModule$clientLo.hydrate) === true || !route.hasLoader);
      dataRoute.loader = async ({
        request,
        params
      }, singleFetch) => {
        try {
          let result = await prefetchStylesAndCallHandler(async () => {
            invariant(routeModule, "No `routeModule` available for critical-route loader");
            if (!routeModule.clientLoader) {
              if (isSpaMode) return null;
              return fetchServerLoader(request, false, singleFetch);
            }
            return routeModule.clientLoader({
              request,
              params,
              async serverLoader() {
                preventInvalidServerHandlerCall("loader", route, isSpaMode);
                if (isHydrationRequest) {
                  if (initialError !== void 0) {
                    throw initialError;
                  }
                  return initialData;
                }
                return fetchServerLoader(request, true, singleFetch);
              }
            });
          });
          return result;
        } finally {
          isHydrationRequest = false;
        }
      };
      dataRoute.loader.hydrate = shouldHydrateRouteLoader(route, routeModule, isSpaMode);
      dataRoute.action = ({
        request,
        params
      }, singleFetch) => {
        return prefetchStylesAndCallHandler(async () => {
          invariant(routeModule, "No `routeModule` available for critical-route action");
          if (!routeModule.clientAction) {
            if (isSpaMode) {
              throw noActionDefinedError("clientAction", route.id);
            }
            return fetchServerAction(request, false, singleFetch);
          }
          return routeModule.clientAction({
            request,
            params,
            async serverAction() {
              preventInvalidServerHandlerCall("action", route, isSpaMode);
              return fetchServerAction(request, true, singleFetch);
            }
          });
        });
      };
    } else {
      if (!route.hasClientLoader) {
        dataRoute.loader = ({
          request
        }, singleFetch) => prefetchStylesAndCallHandler(() => {
          if (isSpaMode) return Promise.resolve(null);
          return fetchServerLoader(request, false, singleFetch);
        });
      }
      if (!route.hasClientAction) {
        dataRoute.action = ({
          request
        }, singleFetch) => prefetchStylesAndCallHandler(() => {
          if (isSpaMode) {
            throw noActionDefinedError("clientAction", route.id);
          }
          return fetchServerAction(request, false, singleFetch);
        });
      }
      dataRoute.lazy = async () => {
        let mod = await loadRouteModuleWithBlockingLinks(route, routeModulesCache);
        let lazyRoute = {
          ...mod
        };
        if (mod.clientLoader) {
          let clientLoader = mod.clientLoader;
          lazyRoute.loader = (args, singleFetch) => clientLoader({
            ...args,
            async serverLoader() {
              preventInvalidServerHandlerCall("loader", route, isSpaMode);
              return fetchServerLoader(args.request, true, singleFetch);
            }
          });
        }
        if (mod.clientAction) {
          let clientAction = mod.clientAction;
          lazyRoute.action = (args, singleFetch) => clientAction({
            ...args,
            async serverAction() {
              preventInvalidServerHandlerCall("action", route, isSpaMode);
              return fetchServerAction(args.request, true, singleFetch);
            }
          });
        }
        if (needsRevalidation) {
          lazyRoute.shouldRevalidate = wrapShouldRevalidateForHdr(route.id, mod.shouldRevalidate, needsRevalidation);
        }
        return {
          ...lazyRoute.loader ? {
            loader: lazyRoute.loader
          } : {},
          ...lazyRoute.action ? {
            action: lazyRoute.action
          } : {},
          hasErrorBoundary: lazyRoute.hasErrorBoundary,
          shouldRevalidate: lazyRoute.shouldRevalidate,
          handle: lazyRoute.handle,
          // No need to wrap these in layout since the root route is never
          // loaded via route.lazy()
          Component: lazyRoute.Component,
          ErrorBoundary: lazyRoute.ErrorBoundary
        };
      };
    }
    let children = createClientRoutes(manifest, routeModulesCache, initialState, future, isSpaMode, route.id, routesByParentId, needsRevalidation);
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function wrapShouldRevalidateForHdr(routeId, routeShouldRevalidate, needsRevalidation) {
  let handledRevalidation = false;
  return (arg) => {
    if (!handledRevalidation) {
      handledRevalidation = true;
      return needsRevalidation.has(routeId);
    }
    return routeShouldRevalidate ? routeShouldRevalidate(arg) : arg.defaultShouldRevalidate;
  };
}
async function loadRouteModuleWithBlockingLinks(route, routeModules) {
  let routeModule = await loadRouteModule(route, routeModules);
  await prefetchStyleLinks(route, routeModule);
  return {
    Component: getRouteModuleComponent(routeModule),
    ErrorBoundary: routeModule.ErrorBoundary,
    clientAction: routeModule.clientAction,
    clientLoader: routeModule.clientLoader,
    handle: routeModule.handle,
    links: routeModule.links,
    meta: routeModule.meta,
    shouldRevalidate: routeModule.shouldRevalidate
  };
}
async function fetchServerHandler(request, route) {
  let result = await fetchData(request, route.id);
  if (result instanceof Error) {
    throw result;
  }
  if (isRedirectResponse(result)) {
    throw getRedirect(result);
  }
  if (isCatchResponse(result)) {
    throw result;
  }
  if (isDeferredResponse(result) && result.body) {
    return await parseDeferredReadableStream(result.body);
  }
  return result;
}
function unwrapServerResponse(result) {
  if (isDeferredData(result)) {
    return result.data;
  }
  if (isResponse(result)) {
    let contentType = result.headers.get("Content-Type");
    if (contentType && /\bapplication\/json\b/.test(contentType)) {
      return result.json();
    } else {
      return result.text();
    }
  }
  return result;
}
function getRedirect(response) {
  let status = parseInt(response.headers.get("X-Remix-Status"), 10) || 302;
  let url = response.headers.get("X-Remix-Redirect");
  let headers = {};
  let revalidate = response.headers.get("X-Remix-Revalidate");
  if (revalidate) {
    headers["X-Remix-Revalidate"] = revalidate;
  }
  let reloadDocument = response.headers.get("X-Remix-Reload-Document");
  if (reloadDocument) {
    headers["X-Remix-Reload-Document"] = reloadDocument;
  }
  return (0, import_react_router_dom4.redirect)(url, {
    status,
    headers
  });
}
function getRouteModuleComponent(routeModule) {
  if (routeModule.default == null) return void 0;
  let isEmptyObject = typeof routeModule.default === "object" && Object.keys(routeModule.default).length === 0;
  if (!isEmptyObject) {
    return routeModule.default;
  }
}
function shouldHydrateRouteLoader(route, routeModule, isSpaMode) {
  return isSpaMode && route.id !== "root" || routeModule.clientLoader != null && (routeModule.clientLoader.hydrate === true || route.hasLoader !== true);
}

// node_modules/@remix-run/react/dist/esm/browser.js
var stateDecodingPromise;
var router;
var routerInitialized = false;
var hmrAbortController;
var hmrRouterReadyResolve;
var hmrRouterReadyPromise = new Promise((resolve) => {
  hmrRouterReadyResolve = resolve;
}).catch(() => {
  return void 0;
});
if (import.meta && import.meta.hot) {
  import.meta.hot.accept("remix:manifest", async ({
    assetsManifest,
    needsRevalidation
  }) => {
    let router2 = await hmrRouterReadyPromise;
    if (!router2) {
      console.error("Failed to accept HMR update because the router was not ready.");
      return;
    }
    let routeIds = [...new Set(router2.state.matches.map((m) => m.route.id).concat(Object.keys(window.__remixRouteModules)))];
    if (hmrAbortController) {
      hmrAbortController.abort();
    }
    hmrAbortController = new AbortController();
    let signal = hmrAbortController.signal;
    let newRouteModules = Object.assign({}, window.__remixRouteModules, Object.fromEntries((await Promise.all(routeIds.map(async (id) => {
      var _assetsManifest$hmr, _window$__remixRouteM, _window$__remixRouteM2, _window$__remixRouteM3;
      if (!assetsManifest.routes[id]) {
        return null;
      }
      let imported = await import(assetsManifest.routes[id].module + `?t=${(_assetsManifest$hmr = assetsManifest.hmr) === null || _assetsManifest$hmr === void 0 ? void 0 : _assetsManifest$hmr.timestamp}`);
      return [id, {
        ...imported,
        // react-refresh takes care of updating these in-place,
        // if we don't preserve existing values we'll loose state.
        default: imported.default ? ((_window$__remixRouteM = window.__remixRouteModules[id]) === null || _window$__remixRouteM === void 0 ? void 0 : _window$__remixRouteM.default) ?? imported.default : imported.default,
        ErrorBoundary: imported.ErrorBoundary ? ((_window$__remixRouteM2 = window.__remixRouteModules[id]) === null || _window$__remixRouteM2 === void 0 ? void 0 : _window$__remixRouteM2.ErrorBoundary) ?? imported.ErrorBoundary : imported.ErrorBoundary,
        HydrateFallback: imported.HydrateFallback ? ((_window$__remixRouteM3 = window.__remixRouteModules[id]) === null || _window$__remixRouteM3 === void 0 ? void 0 : _window$__remixRouteM3.HydrateFallback) ?? imported.HydrateFallback : imported.HydrateFallback
      }];
    }))).filter(Boolean)));
    Object.assign(window.__remixRouteModules, newRouteModules);
    let routes = createClientRoutesWithHMRRevalidationOptOut(needsRevalidation, assetsManifest.routes, window.__remixRouteModules, window.__remixContext.state, window.__remixContext.future, window.__remixContext.isSpaMode);
    router2._internalSetRoutes(routes);
    let unsub = router2.subscribe((state) => {
      if (state.revalidation === "idle") {
        unsub();
        if (signal.aborted) return;
        setTimeout(() => {
          Object.assign(window.__remixManifest, assetsManifest);
          window.$RefreshRuntime$.performReactRefresh();
        }, 1);
      }
    });
    window.__remixRevalidation = (window.__remixRevalidation || 0) + 1;
    router2.revalidate();
  });
}
function RemixBrowser(_props) {
  if (!router) {
    let initialPathname = window.__remixContext.url;
    let hydratedPathname = window.location.pathname;
    if (initialPathname !== hydratedPathname && !window.__remixContext.isSpaMode) {
      let errorMsg = `Initial URL (${initialPathname}) does not match URL at time of hydration (${hydratedPathname}), reloading page...`;
      console.error(errorMsg);
      window.location.reload();
      return /* @__PURE__ */ React6.createElement(React6.Fragment, null);
    }
    if (window.__remixContext.future.unstable_singleFetch) {
      if (!stateDecodingPromise) {
        let stream = window.__remixContext.stream;
        invariant(stream, "No stream found for single fetch decoding");
        window.__remixContext.stream = void 0;
        stateDecodingPromise = decodeViaTurboStream(stream, window).then((value) => {
          window.__remixContext.state = value.value;
          stateDecodingPromise.value = true;
        }).catch((e) => {
          stateDecodingPromise.error = e;
        });
      }
      if (stateDecodingPromise.error) {
        throw stateDecodingPromise.error;
      }
      if (!stateDecodingPromise.value) {
        throw stateDecodingPromise;
      }
    }
    let routes = createClientRoutes(window.__remixManifest.routes, window.__remixRouteModules, window.__remixContext.state, window.__remixContext.future, window.__remixContext.isSpaMode);
    let hydrationData = void 0;
    if (!window.__remixContext.isSpaMode) {
      hydrationData = {
        ...window.__remixContext.state,
        loaderData: {
          ...window.__remixContext.state.loaderData
        }
      };
      let initialMatches = (0, import_react_router_dom5.matchRoutes)(routes, window.location);
      if (initialMatches) {
        for (let match of initialMatches) {
          let routeId = match.route.id;
          let route = window.__remixRouteModules[routeId];
          let manifestRoute = window.__remixManifest.routes[routeId];
          if (route && shouldHydrateRouteLoader(manifestRoute, route, window.__remixContext.isSpaMode) && (route.HydrateFallback || !manifestRoute.hasLoader)) {
            hydrationData.loaderData[routeId] = void 0;
          } else if (manifestRoute && !manifestRoute.hasLoader) {
            hydrationData.loaderData[routeId] = null;
          }
        }
      }
      if (hydrationData && hydrationData.errors) {
        hydrationData.errors = deserializeErrors(hydrationData.errors);
      }
    }
    router = (0, import_router6.createRouter)({
      routes,
      history: (0, import_router6.createBrowserHistory)(),
      basename: window.__remixContext.basename,
      future: {
        v7_normalizeFormMethod: true,
        v7_fetcherPersist: window.__remixContext.future.v3_fetcherPersist,
        v7_partialHydration: true,
        v7_prependBasename: true,
        v7_relativeSplatPath: window.__remixContext.future.v3_relativeSplatPath,
        // Single fetch enables this underlying behavior
        unstable_skipActionErrorRevalidation: window.__remixContext.future.unstable_singleFetch === true
      },
      hydrationData,
      mapRouteProperties: import_react_router.UNSAFE_mapRouteProperties,
      unstable_dataStrategy: window.__remixContext.future.unstable_singleFetch ? getSingleFetchDataStrategy(window.__remixManifest, window.__remixRouteModules) : void 0
    });
    if (router.state.initialized) {
      routerInitialized = true;
      router.initialize();
    }
    router.createRoutesForHMR = createClientRoutesWithHMRRevalidationOptOut;
    window.__remixRouter = router;
    if (hmrRouterReadyResolve) {
      hmrRouterReadyResolve(router);
    }
  }
  let [criticalCss, setCriticalCss] = React6.useState(true ? window.__remixContext.criticalCss : void 0);
  if (true) {
    window.__remixClearCriticalCss = () => setCriticalCss(void 0);
  }
  let [location, setLocation] = React6.useState(router.state.location);
  React6.useLayoutEffect(() => {
    if (!routerInitialized) {
      routerInitialized = true;
      router.initialize();
    }
  }, []);
  React6.useLayoutEffect(() => {
    return router.subscribe((newState) => {
      if (newState.location !== location) {
        setLocation(newState.location);
      }
    });
  }, [location]);
  return (
    // This fragment is important to ensure we match the <RemixServer> JSX
    // structure so that useId values hydrate correctly
    /* @__PURE__ */ React6.createElement(React6.Fragment, null, /* @__PURE__ */ React6.createElement(RemixContext.Provider, {
      value: {
        manifest: window.__remixManifest,
        routeModules: window.__remixRouteModules,
        future: window.__remixContext.future,
        criticalCss,
        isSpaMode: window.__remixContext.isSpaMode
      }
    }, /* @__PURE__ */ React6.createElement(RemixErrorBoundary, {
      location
    }, /* @__PURE__ */ React6.createElement(import_react_router_dom5.RouterProvider, {
      router,
      fallbackElement: null,
      future: {
        v7_startTransition: true
      }
    }))), window.__remixContext.future.unstable_singleFetch ? /* @__PURE__ */ React6.createElement(React6.Fragment, null) : null)
  );
}

// node_modules/@remix-run/react/dist/esm/scroll-restoration.js
var React7 = __toESM(require_react());
var import_react_router_dom6 = __toESM(require_main2());
var STORAGE_KEY = "positions";
function ScrollRestoration({
  getKey,
  ...props
}) {
  let {
    isSpaMode
  } = useRemixContext();
  let location = (0, import_react_router_dom6.useLocation)();
  let matches = (0, import_react_router_dom6.useMatches)();
  (0, import_react_router_dom6.UNSAFE_useScrollRestoration)({
    getKey,
    storageKey: STORAGE_KEY
  });
  let key = React7.useMemo(
    () => {
      if (!getKey) return null;
      let userKey = getKey(location, matches);
      return userKey !== location.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (isSpaMode) {
    return null;
  }
  let restoreScroll = ((STORAGE_KEY2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key2 = Math.random().toString(32).slice(2);
      window.history.replaceState({
        key: key2
      }, "");
    }
    try {
      let positions = JSON.parse(sessionStorage.getItem(STORAGE_KEY2) || "{}");
      let storedY = positions[restoreKey || window.history.state.key];
      if (typeof storedY === "number") {
        window.scrollTo(0, storedY);
      }
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(STORAGE_KEY2);
    }
  }).toString();
  return /* @__PURE__ */ React7.createElement("script", _extends({}, props, {
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: `(${restoreScroll})(${JSON.stringify(STORAGE_KEY)}, ${JSON.stringify(key)})`
    }
  }));
}

// node_modules/@remix-run/react/dist/esm/server.js
var React8 = __toESM(require_react());
var import_server = __toESM(require_server());
function RemixServer({
  context,
  url,
  abortDelay,
  nonce
}) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  let {
    manifest,
    routeModules,
    criticalCss,
    serverHandoffString
  } = context;
  let routes = createServerRoutes(manifest.routes, routeModules, context.future, context.isSpaMode);
  context.staticHandlerContext.loaderData = {
    ...context.staticHandlerContext.loaderData
  };
  for (let match of context.staticHandlerContext.matches) {
    let routeId = match.route.id;
    let route = routeModules[routeId];
    let manifestRoute = context.manifest.routes[routeId];
    if (route && shouldHydrateRouteLoader(manifestRoute, route, context.isSpaMode) && (route.HydrateFallback || !manifestRoute.hasLoader)) {
      context.staticHandlerContext.loaderData[routeId] = void 0;
    }
  }
  let router2 = (0, import_server.createStaticRouter)(routes, context.staticHandlerContext, {
    future: {
      v7_partialHydration: true,
      v7_relativeSplatPath: context.future.v3_relativeSplatPath
    }
  });
  return /* @__PURE__ */ React8.createElement(React8.Fragment, null, /* @__PURE__ */ React8.createElement(RemixContext.Provider, {
    value: {
      manifest,
      routeModules,
      criticalCss,
      serverHandoffString,
      future: context.future,
      isSpaMode: context.isSpaMode,
      serializeError: context.serializeError,
      abortDelay,
      renderMeta: context.renderMeta
    }
  }, /* @__PURE__ */ React8.createElement(RemixErrorBoundary, {
    location: router2.state.location
  }, /* @__PURE__ */ React8.createElement(import_server.StaticRouterProvider, {
    router: router2,
    context: context.staticHandlerContext,
    hydrate: false
  }))), context.future.unstable_singleFetch && context.serverHandoffStream ? /* @__PURE__ */ React8.createElement(React8.Suspense, null, /* @__PURE__ */ React8.createElement(StreamTransfer, {
    context,
    identifier: 0,
    reader: context.serverHandoffStream.getReader(),
    textDecoder: new TextDecoder(),
    nonce
  })) : null);
}
var export_Form = import_react_router_dom7.Form;
var export_Navigate = import_react_router_dom7.Navigate;
var export_NavigationType = import_react_router_dom7.NavigationType;
var export_Outlet = import_react_router_dom7.Outlet;
var export_Route = import_react_router_dom7.Route;
var export_Routes = import_react_router_dom7.Routes;
var export_createPath = import_react_router_dom7.createPath;
var export_createRoutesFromChildren = import_react_router_dom7.createRoutesFromChildren;
var export_createRoutesFromElements = import_react_router_dom7.createRoutesFromElements;
var export_createSearchParams = import_react_router_dom7.createSearchParams;
var export_generatePath = import_react_router_dom7.generatePath;
var export_isRouteErrorResponse = import_react_router_dom7.isRouteErrorResponse;
var export_matchPath = import_react_router_dom7.matchPath;
var export_matchRoutes = import_react_router_dom7.matchRoutes;
var export_parsePath = import_react_router_dom7.parsePath;
var export_renderMatches = import_react_router_dom7.renderMatches;
var export_resolvePath = import_react_router_dom7.resolvePath;
var export_unstable_usePrompt = import_react_router_dom7.unstable_usePrompt;
var export_unstable_useViewTransitionState = import_react_router_dom7.unstable_useViewTransitionState;
var export_useAsyncError = import_react_router_dom7.useAsyncError;
var export_useAsyncValue = import_react_router_dom7.useAsyncValue;
var export_useBeforeUnload = import_react_router_dom7.useBeforeUnload;
var export_useBlocker = import_react_router_dom7.useBlocker;
var export_useFetchers = import_react_router_dom7.useFetchers;
var export_useFormAction = import_react_router_dom7.useFormAction;
var export_useHref = import_react_router_dom7.useHref;
var export_useInRouterContext = import_react_router_dom7.useInRouterContext;
var export_useLinkClickHandler = import_react_router_dom7.useLinkClickHandler;
var export_useLocation = import_react_router_dom7.useLocation;
var export_useMatch = import_react_router_dom7.useMatch;
var export_useNavigate = import_react_router_dom7.useNavigate;
var export_useNavigation = import_react_router_dom7.useNavigation;
var export_useNavigationType = import_react_router_dom7.useNavigationType;
var export_useOutlet = import_react_router_dom7.useOutlet;
var export_useOutletContext = import_react_router_dom7.useOutletContext;
var export_useParams = import_react_router_dom7.useParams;
var export_useResolvedPath = import_react_router_dom7.useResolvedPath;
var export_useRevalidator = import_react_router_dom7.useRevalidator;
var export_useRouteError = import_react_router_dom7.useRouteError;
var export_useRoutes = import_react_router_dom7.useRoutes;
var export_useSearchParams = import_react_router_dom7.useSearchParams;
var export_useSubmit = import_react_router_dom7.useSubmit;
export {
  Await,
  export_Form as Form,
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  export_Navigate as Navigate,
  export_NavigationType as NavigationType,
  export_Outlet as Outlet,
  PrefetchPageLinks,
  RemixBrowser,
  RemixServer,
  export_Route as Route,
  export_Routes as Routes,
  Scripts,
  ScrollRestoration,
  RemixContext as UNSAFE_RemixContext,
  export_createPath as createPath,
  export_createRoutesFromChildren as createRoutesFromChildren,
  export_createRoutesFromElements as createRoutesFromElements,
  export_createSearchParams as createSearchParams,
  defer,
  export_generatePath as generatePath,
  export_isRouteErrorResponse as isRouteErrorResponse,
  json,
  export_matchPath as matchPath,
  export_matchRoutes as matchRoutes,
  export_parsePath as parsePath,
  redirect,
  redirectDocument,
  export_renderMatches as renderMatches,
  export_resolvePath as resolvePath,
  defineClientAction as unstable_defineClientAction,
  defineClientLoader as unstable_defineClientLoader,
  export_unstable_usePrompt as unstable_usePrompt,
  export_unstable_useViewTransitionState as unstable_useViewTransitionState,
  useActionData,
  export_useAsyncError as useAsyncError,
  export_useAsyncValue as useAsyncValue,
  export_useBeforeUnload as useBeforeUnload,
  export_useBlocker as useBlocker,
  useFetcher,
  export_useFetchers as useFetchers,
  export_useFormAction as useFormAction,
  export_useHref as useHref,
  export_useInRouterContext as useInRouterContext,
  export_useLinkClickHandler as useLinkClickHandler,
  useLoaderData,
  export_useLocation as useLocation,
  export_useMatch as useMatch,
  useMatches,
  export_useNavigate as useNavigate,
  export_useNavigation as useNavigation,
  export_useNavigationType as useNavigationType,
  export_useOutlet as useOutlet,
  export_useOutletContext as useOutletContext,
  export_useParams as useParams,
  export_useResolvedPath as useResolvedPath,
  export_useRevalidator as useRevalidator,
  export_useRouteError as useRouteError,
  useRouteLoaderData,
  export_useRoutes as useRoutes,
  export_useSearchParams as useSearchParams,
  export_useSubmit as useSubmit
};
/*! Bundled license information:

react-router-dom/dist/umd/react-router-dom.development.js:
react-router-dom/dist/main.js:
  (**
   * React Router DOM v6.23.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/responses.js:
@remix-run/server-runtime/dist/esm/single-fetch.js:
@remix-run/server-runtime/dist/esm/index.js:
  (**
   * @remix-run/server-runtime v2.9.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js:
@remix-run/react/dist/esm/invariant.js:
@remix-run/react/dist/esm/routeModules.js:
@remix-run/react/dist/esm/links.js:
@remix-run/react/dist/esm/markup.js:
@remix-run/react/dist/esm/data.js:
@remix-run/react/dist/esm/single-fetch.js:
@remix-run/react/dist/esm/components.js:
@remix-run/react/dist/esm/errorBoundaries.js:
@remix-run/react/dist/esm/errors.js:
@remix-run/react/dist/esm/fallback.js:
@remix-run/react/dist/esm/routes.js:
@remix-run/react/dist/esm/browser.js:
@remix-run/react/dist/esm/scroll-restoration.js:
@remix-run/react/dist/esm/server.js:
@remix-run/react/dist/esm/index.js:
  (**
   * @remix-run/react v2.9.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=_remix-run_react.js.map
