import {
  __commonJS,
  require_react
} from "./chunk-2DZYPUER.js";

// node_modules/@remix-run/router/dist/router.cjs.js
var require_router_cjs = __commonJS({
  "node_modules/@remix-run/router/dist/router.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    var Action = /* @__PURE__ */ (function(Action2) {
      Action2["Pop"] = "POP";
      Action2["Push"] = "PUSH";
      Action2["Replace"] = "REPLACE";
      return Action2;
    })({});
    var PopStateEventType = "popstate";
    function createMemoryHistory(options) {
      if (options === void 0) {
        options = {};
      }
      let {
        initialEntries = ["/"],
        initialIndex,
        v5Compat = false
      } = options;
      let entries;
      entries = initialEntries.map((entry, index2) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index2 === 0 ? "default" : void 0));
      let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
      let action = Action.Pop;
      let listener = null;
      function clampIndex(n) {
        return Math.min(Math.max(n, 0), entries.length - 1);
      }
      function getCurrentLocation() {
        return entries[index];
      }
      function createMemoryLocation(to, state, key) {
        if (state === void 0) {
          state = null;
        }
        let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
        warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
        return location;
      }
      function createHref(to) {
        return typeof to === "string" ? to : createPath(to);
      }
      let history = {
        get index() {
          return index;
        },
        get action() {
          return action;
        },
        get location() {
          return getCurrentLocation();
        },
        createHref,
        createURL(to) {
          return new URL(createHref(to), "http://localhost");
        },
        encodeLocation(to) {
          let path = typeof to === "string" ? parsePath(to) : to;
          return {
            pathname: path.pathname || "",
            search: path.search || "",
            hash: path.hash || ""
          };
        },
        push(to, state) {
          action = Action.Push;
          let nextLocation = createMemoryLocation(to, state);
          index += 1;
          entries.splice(index, entries.length, nextLocation);
          if (v5Compat && listener) {
            listener({
              action,
              location: nextLocation,
              delta: 1
            });
          }
        },
        replace(to, state) {
          action = Action.Replace;
          let nextLocation = createMemoryLocation(to, state);
          entries[index] = nextLocation;
          if (v5Compat && listener) {
            listener({
              action,
              location: nextLocation,
              delta: 0
            });
          }
        },
        go(delta) {
          action = Action.Pop;
          let nextIndex = clampIndex(index + delta);
          let nextLocation = entries[nextIndex];
          index = nextIndex;
          if (listener) {
            listener({
              action,
              location: nextLocation,
              delta
            });
          }
        },
        listen(fn) {
          listener = fn;
          return () => {
            listener = null;
          };
        }
      };
      return history;
    }
    function createBrowserHistory(options) {
      if (options === void 0) {
        options = {};
      }
      function createBrowserLocation(window2, globalHistory) {
        let {
          pathname,
          search,
          hash
        } = window2.location;
        return createLocation(
          "",
          {
            pathname,
            search,
            hash
          },
          // state defaults to `null` because `window.history.state` does
          globalHistory.state && globalHistory.state.usr || null,
          globalHistory.state && globalHistory.state.key || "default"
        );
      }
      function createBrowserHref(window2, to) {
        return typeof to === "string" ? to : createPath(to);
      }
      return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
    }
    function createHashHistory(options) {
      if (options === void 0) {
        options = {};
      }
      function createHashLocation(window2, globalHistory) {
        let {
          pathname = "/",
          search = "",
          hash = ""
        } = parsePath(window2.location.hash.substr(1));
        if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
          pathname = "/" + pathname;
        }
        return createLocation(
          "",
          {
            pathname,
            search,
            hash
          },
          // state defaults to `null` because `window.history.state` does
          globalHistory.state && globalHistory.state.usr || null,
          globalHistory.state && globalHistory.state.key || "default"
        );
      }
      function createHashHref(window2, to) {
        let base = window2.document.querySelector("base");
        let href = "";
        if (base && base.getAttribute("href")) {
          let url = window2.location.href;
          let hashIndex = url.indexOf("#");
          href = hashIndex === -1 ? url : url.slice(0, hashIndex);
        }
        return href + "#" + (typeof to === "string" ? to : createPath(to));
      }
      function validateHashLocation(location, to) {
        warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
      }
      return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
    }
    function invariant(value, message) {
      if (value === false || value === null || typeof value === "undefined") {
        throw new Error(message);
      }
    }
    function warning(cond, message) {
      if (!cond) {
        if (typeof console !== "undefined") console.warn(message);
        try {
          throw new Error(message);
        } catch (e) {
        }
      }
    }
    function createKey() {
      return Math.random().toString(36).substr(2, 8);
    }
    function getHistoryState(location, index) {
      return {
        usr: location.state,
        key: location.key,
        idx: index
      };
    }
    function createLocation(current, to, state, key) {
      if (state === void 0) {
        state = null;
      }
      let location = _extends({
        pathname: typeof current === "string" ? current : current.pathname,
        search: "",
        hash: ""
      }, typeof to === "string" ? parsePath(to) : to, {
        state,
        // TODO: This could be cleaned up.  push/replace should probably just take
        // full Locations now and avoid the need to run through this flow at all
        // But that's a pretty big refactor to the current test suite so going to
        // keep as is for the time being and just let any incoming keys take precedence
        key: to && to.key || key || createKey()
      });
      return location;
    }
    function createPath(_ref) {
      let {
        pathname = "/",
        search = "",
        hash = ""
      } = _ref;
      if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
      if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
      return pathname;
    }
    function parsePath(path) {
      let parsedPath = {};
      if (path) {
        let hashIndex = path.indexOf("#");
        if (hashIndex >= 0) {
          parsedPath.hash = path.substr(hashIndex);
          path = path.substr(0, hashIndex);
        }
        let searchIndex = path.indexOf("?");
        if (searchIndex >= 0) {
          parsedPath.search = path.substr(searchIndex);
          path = path.substr(0, searchIndex);
        }
        if (path) {
          parsedPath.pathname = path;
        }
      }
      return parsedPath;
    }
    function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
      if (options === void 0) {
        options = {};
      }
      let {
        window: window2 = document.defaultView,
        v5Compat = false
      } = options;
      let globalHistory = window2.history;
      let action = Action.Pop;
      let listener = null;
      let index = getIndex();
      if (index == null) {
        index = 0;
        globalHistory.replaceState(_extends({}, globalHistory.state, {
          idx: index
        }), "");
      }
      function getIndex() {
        let state = globalHistory.state || {
          idx: null
        };
        return state.idx;
      }
      function handlePop() {
        action = Action.Pop;
        let nextIndex = getIndex();
        let delta = nextIndex == null ? null : nextIndex - index;
        index = nextIndex;
        if (listener) {
          listener({
            action,
            location: history.location,
            delta
          });
        }
      }
      function push(to, state) {
        action = Action.Push;
        let location = createLocation(history.location, to, state);
        if (validateLocation) validateLocation(location, to);
        index = getIndex() + 1;
        let historyState = getHistoryState(location, index);
        let url = history.createHref(location);
        try {
          globalHistory.pushState(historyState, "", url);
        } catch (error) {
          if (error instanceof DOMException && error.name === "DataCloneError") {
            throw error;
          }
          window2.location.assign(url);
        }
        if (v5Compat && listener) {
          listener({
            action,
            location: history.location,
            delta: 1
          });
        }
      }
      function replace(to, state) {
        action = Action.Replace;
        let location = createLocation(history.location, to, state);
        if (validateLocation) validateLocation(location, to);
        index = getIndex();
        let historyState = getHistoryState(location, index);
        let url = history.createHref(location);
        globalHistory.replaceState(historyState, "", url);
        if (v5Compat && listener) {
          listener({
            action,
            location: history.location,
            delta: 0
          });
        }
      }
      function createURL(to) {
        let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
        let href = typeof to === "string" ? to : createPath(to);
        href = href.replace(/ $/, "%20");
        invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
        return new URL(href, base);
      }
      let history = {
        get action() {
          return action;
        },
        get location() {
          return getLocation(window2, globalHistory);
        },
        listen(fn) {
          if (listener) {
            throw new Error("A history only accepts one active listener");
          }
          window2.addEventListener(PopStateEventType, handlePop);
          listener = fn;
          return () => {
            window2.removeEventListener(PopStateEventType, handlePop);
            listener = null;
          };
        },
        createHref(to) {
          return createHref(window2, to);
        },
        createURL,
        encodeLocation(to) {
          let url = createURL(to);
          return {
            pathname: url.pathname,
            search: url.search,
            hash: url.hash
          };
        },
        push,
        replace,
        go(n) {
          return globalHistory.go(n);
        }
      };
      return history;
    }
    var ResultType = /* @__PURE__ */ (function(ResultType2) {
      ResultType2["data"] = "data";
      ResultType2["deferred"] = "deferred";
      ResultType2["redirect"] = "redirect";
      ResultType2["error"] = "error";
      return ResultType2;
    })({});
    var immutableRouteKeys = /* @__PURE__ */ new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
    function isIndexRoute(route) {
      return route.index === true;
    }
    function convertRoutesToDataRoutes(routes, mapRouteProperties, parentPath, manifest) {
      if (parentPath === void 0) {
        parentPath = [];
      }
      if (manifest === void 0) {
        manifest = {};
      }
      return routes.map((route, index) => {
        let treePath = [...parentPath, index];
        let id = typeof route.id === "string" ? route.id : treePath.join("-");
        invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
        invariant(!manifest[id], 'Found a route id collision on id "' + id + `".  Route id's must be globally unique within Data Router usages`);
        if (isIndexRoute(route)) {
          let indexRoute = _extends({}, route, mapRouteProperties(route), {
            id
          });
          manifest[id] = indexRoute;
          return indexRoute;
        } else {
          let pathOrLayoutRoute = _extends({}, route, mapRouteProperties(route), {
            id,
            children: void 0
          });
          manifest[id] = pathOrLayoutRoute;
          if (route.children) {
            pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties, treePath, manifest);
          }
          return pathOrLayoutRoute;
        }
      });
    }
    function matchRoutes(routes, locationArg, basename) {
      if (basename === void 0) {
        basename = "/";
      }
      let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
      let pathname = stripBasename(location.pathname || "/", basename);
      if (pathname == null) {
        return null;
      }
      let branches = flattenRoutes(routes);
      rankRouteBranches(branches);
      let matches = null;
      for (let i = 0; matches == null && i < branches.length; ++i) {
        let decoded = decodePath(pathname);
        matches = matchRouteBranch(branches[i], decoded);
      }
      return matches;
    }
    function convertRouteMatchToUiMatch(match, loaderData) {
      let {
        route,
        pathname,
        params
      } = match;
      return {
        id: route.id,
        pathname,
        params,
        data: loaderData[route.id],
        handle: route.handle
      };
    }
    function flattenRoutes(routes, branches, parentsMeta, parentPath) {
      if (branches === void 0) {
        branches = [];
      }
      if (parentsMeta === void 0) {
        parentsMeta = [];
      }
      if (parentPath === void 0) {
        parentPath = "";
      }
      let flattenRoute = (route, index, relativePath) => {
        let meta = {
          relativePath: relativePath === void 0 ? route.path || "" : relativePath,
          caseSensitive: route.caseSensitive === true,
          childrenIndex: index,
          route
        };
        if (meta.relativePath.startsWith("/")) {
          invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
          meta.relativePath = meta.relativePath.slice(parentPath.length);
        }
        let path = joinPaths([parentPath, meta.relativePath]);
        let routesMeta = parentsMeta.concat(meta);
        if (route.children && route.children.length > 0) {
          invariant(
            // Our types know better, but runtime JS may not!
            // @ts-expect-error
            route.index !== true,
            "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
          );
          flattenRoutes(route.children, branches, routesMeta, path);
        }
        if (route.path == null && !route.index) {
          return;
        }
        branches.push({
          path,
          score: computeScore(path, route.index),
          routesMeta
        });
      };
      routes.forEach((route, index) => {
        var _route$path;
        if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
          flattenRoute(route, index);
        } else {
          for (let exploded of explodeOptionalSegments(route.path)) {
            flattenRoute(route, index, exploded);
          }
        }
      });
      return branches;
    }
    function explodeOptionalSegments(path) {
      let segments = path.split("/");
      if (segments.length === 0) return [];
      let [first, ...rest] = segments;
      let isOptional = first.endsWith("?");
      let required = first.replace(/\?$/, "");
      if (rest.length === 0) {
        return isOptional ? [required, ""] : [required];
      }
      let restExploded = explodeOptionalSegments(rest.join("/"));
      let result = [];
      result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
      if (isOptional) {
        result.push(...restExploded);
      }
      return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
    }
    function rankRouteBranches(branches) {
      branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
    }
    var paramRe = /^:[\w-]+$/;
    var dynamicSegmentValue = 3;
    var indexRouteValue = 2;
    var emptySegmentValue = 1;
    var staticSegmentValue = 10;
    var splatPenalty = -2;
    var isSplat = (s) => s === "*";
    function computeScore(path, index) {
      let segments = path.split("/");
      let initialScore = segments.length;
      if (segments.some(isSplat)) {
        initialScore += splatPenalty;
      }
      if (index) {
        initialScore += indexRouteValue;
      }
      return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
    }
    function compareIndexes(a, b) {
      let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
      return siblings ? (
        // If two routes are siblings, we should try to match the earlier sibling
        // first. This allows people to have fine-grained control over the matching
        // behavior by simply putting routes with identical paths in the order they
        // want them tried.
        a[a.length - 1] - b[b.length - 1]
      ) : (
        // Otherwise, it doesn't really make sense to rank non-siblings by index,
        // so they sort equally.
        0
      );
    }
    function matchRouteBranch(branch, pathname) {
      let {
        routesMeta
      } = branch;
      let matchedParams = {};
      let matchedPathname = "/";
      let matches = [];
      for (let i = 0; i < routesMeta.length; ++i) {
        let meta = routesMeta[i];
        let end = i === routesMeta.length - 1;
        let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
        let match = matchPath({
          path: meta.relativePath,
          caseSensitive: meta.caseSensitive,
          end
        }, remainingPathname);
        if (!match) return null;
        Object.assign(matchedParams, match.params);
        let route = meta.route;
        matches.push({
          // TODO: Can this as be avoided?
          params: matchedParams,
          pathname: joinPaths([matchedPathname, match.pathname]),
          pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
          route
        });
        if (match.pathnameBase !== "/") {
          matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
        }
      }
      return matches;
    }
    function generatePath(originalPath, params) {
      if (params === void 0) {
        params = {};
      }
      let path = originalPath;
      if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
        warning(false, 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
        path = path.replace(/\*$/, "/*");
      }
      const prefix = path.startsWith("/") ? "/" : "";
      const stringify = (p) => p == null ? "" : typeof p === "string" ? p : String(p);
      const segments = path.split(/\/+/).map((segment, index, array) => {
        const isLastSegment = index === array.length - 1;
        if (isLastSegment && segment === "*") {
          const star = "*";
          return stringify(params[star]);
        }
        const keyMatch = segment.match(/^:([\w-]+)(\??)$/);
        if (keyMatch) {
          const [, key, optional] = keyMatch;
          let param = params[key];
          invariant(optional === "?" || param != null, 'Missing ":' + key + '" param');
          return stringify(param);
        }
        return segment.replace(/\?$/g, "");
      }).filter((segment) => !!segment);
      return prefix + segments.join("/");
    }
    function matchPath(pattern, pathname) {
      if (typeof pattern === "string") {
        pattern = {
          path: pattern,
          caseSensitive: false,
          end: true
        };
      }
      let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
      let match = pathname.match(matcher);
      if (!match) return null;
      let matchedPathname = match[0];
      let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
      let captureGroups = match.slice(1);
      let params = compiledParams.reduce((memo, _ref, index) => {
        let {
          paramName,
          isOptional
        } = _ref;
        if (paramName === "*") {
          let splatValue = captureGroups[index] || "";
          pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
        }
        const value = captureGroups[index];
        if (isOptional && !value) {
          memo[paramName] = void 0;
        } else {
          memo[paramName] = (value || "").replace(/%2F/g, "/");
        }
        return memo;
      }, {});
      return {
        params,
        pathname: matchedPathname,
        pathnameBase,
        pattern
      };
    }
    function compilePath(path, caseSensitive, end) {
      if (caseSensitive === void 0) {
        caseSensitive = false;
      }
      if (end === void 0) {
        end = true;
      }
      warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
      let params = [];
      let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
        params.push({
          paramName,
          isOptional: isOptional != null
        });
        return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
      });
      if (path.endsWith("*")) {
        params.push({
          paramName: "*"
        });
        regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
      } else if (end) {
        regexpSource += "\\/*$";
      } else if (path !== "" && path !== "/") {
        regexpSource += "(?:(?=\\/|$))";
      } else ;
      let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
      return [matcher, params];
    }
    function decodePath(value) {
      try {
        return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
      } catch (error) {
        warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
        return value;
      }
    }
    function stripBasename(pathname, basename) {
      if (basename === "/") return pathname;
      if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
        return null;
      }
      let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
      let nextChar = pathname.charAt(startIndex);
      if (nextChar && nextChar !== "/") {
        return null;
      }
      return pathname.slice(startIndex) || "/";
    }
    function resolvePath(to, fromPathname) {
      if (fromPathname === void 0) {
        fromPathname = "/";
      }
      let {
        pathname: toPathname,
        search = "",
        hash = ""
      } = typeof to === "string" ? parsePath(to) : to;
      let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
      return {
        pathname,
        search: normalizeSearch(search),
        hash: normalizeHash(hash)
      };
    }
    function resolvePathname(relativePath, fromPathname) {
      let segments = fromPathname.replace(/\/+$/, "").split("/");
      let relativeSegments = relativePath.split("/");
      relativeSegments.forEach((segment) => {
        if (segment === "..") {
          if (segments.length > 1) segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });
      return segments.length > 1 ? segments.join("/") : "/";
    }
    function getInvalidPathError(char, field, dest, path) {
      return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
    }
    function getPathContributingMatches(matches) {
      return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
    }
    function getResolveToMatches(matches, v7_relativeSplatPath) {
      let pathMatches = getPathContributingMatches(matches);
      if (v7_relativeSplatPath) {
        return pathMatches.map((match, idx) => idx === matches.length - 1 ? match.pathname : match.pathnameBase);
      }
      return pathMatches.map((match) => match.pathnameBase);
    }
    function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
      if (isPathRelative === void 0) {
        isPathRelative = false;
      }
      let to;
      if (typeof toArg === "string") {
        to = parsePath(toArg);
      } else {
        to = _extends({}, toArg);
        invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
        invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
        invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
      }
      let isEmptyPath = toArg === "" || to.pathname === "";
      let toPathname = isEmptyPath ? "/" : to.pathname;
      let from;
      if (toPathname == null) {
        from = locationPathname;
      } else {
        let routePathnameIndex = routePathnames.length - 1;
        if (!isPathRelative && toPathname.startsWith("..")) {
          let toSegments = toPathname.split("/");
          while (toSegments[0] === "..") {
            toSegments.shift();
            routePathnameIndex -= 1;
          }
          to.pathname = toSegments.join("/");
        }
        from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
      }
      let path = resolvePath(to, from);
      let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
      let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
      if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
        path.pathname += "/";
      }
      return path;
    }
    function getToPathname(to) {
      return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
    }
    var joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
    var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
    var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
    var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
    var json = function json2(data, init) {
      if (init === void 0) {
        init = {};
      }
      let responseInit = typeof init === "number" ? {
        status: init
      } : init;
      let headers = new Headers(responseInit.headers);
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json; charset=utf-8");
      }
      return new Response(JSON.stringify(data), _extends({}, responseInit, {
        headers
      }));
    };
    var AbortedDeferredError = class extends Error {
    };
    var DeferredData = class {
      constructor(data, responseInit) {
        this.pendingKeysSet = /* @__PURE__ */ new Set();
        this.subscribers = /* @__PURE__ */ new Set();
        this.deferredKeys = [];
        invariant(data && typeof data === "object" && !Array.isArray(data), "defer() only accepts plain objects");
        let reject;
        this.abortPromise = new Promise((_, r) => reject = r);
        this.controller = new AbortController();
        let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
        this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort);
        this.controller.signal.addEventListener("abort", onAbort);
        this.data = Object.entries(data).reduce((acc, _ref2) => {
          let [key, value] = _ref2;
          return Object.assign(acc, {
            [key]: this.trackPromise(key, value)
          });
        }, {});
        if (this.done) {
          this.unlistenAbortSignal();
        }
        this.init = responseInit;
      }
      trackPromise(key, value) {
        if (!(value instanceof Promise)) {
          return value;
        }
        this.deferredKeys.push(key);
        this.pendingKeysSet.add(key);
        let promise = Promise.race([value, this.abortPromise]).then((data) => this.onSettle(promise, key, void 0, data), (error) => this.onSettle(promise, key, error));
        promise.catch(() => {
        });
        Object.defineProperty(promise, "_tracked", {
          get: () => true
        });
        return promise;
      }
      onSettle(promise, key, error, data) {
        if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
          this.unlistenAbortSignal();
          Object.defineProperty(promise, "_error", {
            get: () => error
          });
          return Promise.reject(error);
        }
        this.pendingKeysSet.delete(key);
        if (this.done) {
          this.unlistenAbortSignal();
        }
        if (error === void 0 && data === void 0) {
          let undefinedError = new Error('Deferred data for key "' + key + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
          Object.defineProperty(promise, "_error", {
            get: () => undefinedError
          });
          this.emit(false, key);
          return Promise.reject(undefinedError);
        }
        if (data === void 0) {
          Object.defineProperty(promise, "_error", {
            get: () => error
          });
          this.emit(false, key);
          return Promise.reject(error);
        }
        Object.defineProperty(promise, "_data", {
          get: () => data
        });
        this.emit(false, key);
        return data;
      }
      emit(aborted, settledKey) {
        this.subscribers.forEach((subscriber) => subscriber(aborted, settledKey));
      }
      subscribe(fn) {
        this.subscribers.add(fn);
        return () => this.subscribers.delete(fn);
      }
      cancel() {
        this.controller.abort();
        this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k));
        this.emit(true);
      }
      async resolveData(signal) {
        let aborted = false;
        if (!this.done) {
          let onAbort = () => this.cancel();
          signal.addEventListener("abort", onAbort);
          aborted = await new Promise((resolve) => {
            this.subscribe((aborted2) => {
              signal.removeEventListener("abort", onAbort);
              if (aborted2 || this.done) {
                resolve(aborted2);
              }
            });
          });
        }
        return aborted;
      }
      get done() {
        return this.pendingKeysSet.size === 0;
      }
      get unwrappedData() {
        invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
        return Object.entries(this.data).reduce((acc, _ref3) => {
          let [key, value] = _ref3;
          return Object.assign(acc, {
            [key]: unwrapTrackedPromise(value)
          });
        }, {});
      }
      get pendingKeys() {
        return Array.from(this.pendingKeysSet);
      }
    };
    function isTrackedPromise(value) {
      return value instanceof Promise && value._tracked === true;
    }
    function unwrapTrackedPromise(value) {
      if (!isTrackedPromise(value)) {
        return value;
      }
      if (value._error) {
        throw value._error;
      }
      return value._data;
    }
    var defer = function defer2(data, init) {
      if (init === void 0) {
        init = {};
      }
      let responseInit = typeof init === "number" ? {
        status: init
      } : init;
      return new DeferredData(data, responseInit);
    };
    var redirect = function redirect2(url, init) {
      if (init === void 0) {
        init = 302;
      }
      let responseInit = init;
      if (typeof responseInit === "number") {
        responseInit = {
          status: responseInit
        };
      } else if (typeof responseInit.status === "undefined") {
        responseInit.status = 302;
      }
      let headers = new Headers(responseInit.headers);
      headers.set("Location", url);
      return new Response(null, _extends({}, responseInit, {
        headers
      }));
    };
    var redirectDocument = (url, init) => {
      let response = redirect(url, init);
      response.headers.set("X-Remix-Reload-Document", "true");
      return response;
    };
    var ErrorResponseImpl = class {
      constructor(status, statusText, data, internal) {
        if (internal === void 0) {
          internal = false;
        }
        this.status = status;
        this.statusText = statusText || "";
        this.internal = internal;
        if (data instanceof Error) {
          this.data = data.toString();
          this.error = data;
        } else {
          this.data = data;
        }
      }
    };
    function isRouteErrorResponse(error) {
      return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
    }
    var validMutationMethodsArr = ["post", "put", "patch", "delete"];
    var validMutationMethods = new Set(validMutationMethodsArr);
    var validRequestMethodsArr = ["get", ...validMutationMethodsArr];
    var validRequestMethods = new Set(validRequestMethodsArr);
    var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    var redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
    var IDLE_NAVIGATION = {
      state: "idle",
      location: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    var IDLE_FETCHER = {
      state: "idle",
      data: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    };
    var IDLE_BLOCKER = {
      state: "unblocked",
      proceed: void 0,
      reset: void 0,
      location: void 0
    };
    var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
    var defaultMapRouteProperties = (route) => ({
      hasErrorBoundary: Boolean(route.hasErrorBoundary)
    });
    var TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
    function createRouter(init) {
      const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
      const isBrowser = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
      const isServer = !isBrowser;
      invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
      let mapRouteProperties;
      if (init.mapRouteProperties) {
        mapRouteProperties = init.mapRouteProperties;
      } else if (init.detectErrorBoundary) {
        let detectErrorBoundary = init.detectErrorBoundary;
        mapRouteProperties = (route) => ({
          hasErrorBoundary: detectErrorBoundary(route)
        });
      } else {
        mapRouteProperties = defaultMapRouteProperties;
      }
      let manifest = {};
      let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties, void 0, manifest);
      let inFlightDataRoutes;
      let basename = init.basename || "/";
      let dataStrategyImpl = init.unstable_dataStrategy || defaultDataStrategy;
      let future = _extends({
        v7_fetcherPersist: false,
        v7_normalizeFormMethod: false,
        v7_partialHydration: false,
        v7_prependBasename: false,
        v7_relativeSplatPath: false,
        unstable_skipActionErrorRevalidation: false
      }, init.future);
      let unlistenHistory = null;
      let subscribers = /* @__PURE__ */ new Set();
      let savedScrollPositions = null;
      let getScrollRestorationKey = null;
      let getScrollPosition = null;
      let initialScrollRestored = init.hydrationData != null;
      let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
      let initialErrors = null;
      if (initialMatches == null) {
        let error = getInternalRouterError(404, {
          pathname: init.history.location.pathname
        });
        let {
          matches,
          route
        } = getShortCircuitMatches(dataRoutes);
        initialMatches = matches;
        initialErrors = {
          [route.id]: error
        };
      }
      let initialized;
      let hasLazyRoutes = initialMatches.some((m) => m.route.lazy);
      let hasLoaders = initialMatches.some((m) => m.route.loader);
      if (hasLazyRoutes) {
        initialized = false;
      } else if (!hasLoaders) {
        initialized = true;
      } else if (future.v7_partialHydration) {
        let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
        let errors = init.hydrationData ? init.hydrationData.errors : null;
        let isRouteInitialized = (m) => {
          if (!m.route.loader) {
            return true;
          }
          if (typeof m.route.loader === "function" && m.route.loader.hydrate === true) {
            return false;
          }
          return loaderData && loaderData[m.route.id] !== void 0 || errors && errors[m.route.id] !== void 0;
        };
        if (errors) {
          let idx = initialMatches.findIndex((m) => errors[m.route.id] !== void 0);
          initialized = initialMatches.slice(0, idx + 1).every(isRouteInitialized);
        } else {
          initialized = initialMatches.every(isRouteInitialized);
        }
      } else {
        initialized = init.hydrationData != null;
      }
      let router;
      let state = {
        historyAction: init.history.action,
        location: init.history.location,
        matches: initialMatches,
        initialized,
        navigation: IDLE_NAVIGATION,
        // Don't restore on initial updateState() if we were SSR'd
        restoreScrollPosition: init.hydrationData != null ? false : null,
        preventScrollReset: false,
        revalidation: "idle",
        loaderData: init.hydrationData && init.hydrationData.loaderData || {},
        actionData: init.hydrationData && init.hydrationData.actionData || null,
        errors: init.hydrationData && init.hydrationData.errors || initialErrors,
        fetchers: /* @__PURE__ */ new Map(),
        blockers: /* @__PURE__ */ new Map()
      };
      let pendingAction = Action.Pop;
      let pendingPreventScrollReset = false;
      let pendingNavigationController;
      let pendingViewTransitionEnabled = false;
      let appliedViewTransitions = /* @__PURE__ */ new Map();
      let removePageHideEventListener = null;
      let isUninterruptedRevalidation = false;
      let isRevalidationRequired = false;
      let cancelledDeferredRoutes = [];
      let cancelledFetcherLoads = [];
      let fetchControllers = /* @__PURE__ */ new Map();
      let incrementingLoadId = 0;
      let pendingNavigationLoadId = -1;
      let fetchReloadIds = /* @__PURE__ */ new Map();
      let fetchRedirectIds = /* @__PURE__ */ new Set();
      let fetchLoadMatches = /* @__PURE__ */ new Map();
      let activeFetchers = /* @__PURE__ */ new Map();
      let deletedFetchers = /* @__PURE__ */ new Set();
      let activeDeferreds = /* @__PURE__ */ new Map();
      let blockerFunctions = /* @__PURE__ */ new Map();
      let ignoreNextHistoryUpdate = false;
      function initialize() {
        unlistenHistory = init.history.listen((_ref) => {
          let {
            action: historyAction,
            location,
            delta
          } = _ref;
          if (ignoreNextHistoryUpdate) {
            ignoreNextHistoryUpdate = false;
            return;
          }
          warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
          let blockerKey = shouldBlockNavigation({
            currentLocation: state.location,
            nextLocation: location,
            historyAction
          });
          if (blockerKey && delta != null) {
            ignoreNextHistoryUpdate = true;
            init.history.go(delta * -1);
            updateBlocker(blockerKey, {
              state: "blocked",
              location,
              proceed() {
                updateBlocker(blockerKey, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location
                });
                init.history.go(delta);
              },
              reset() {
                let blockers = new Map(state.blockers);
                blockers.set(blockerKey, IDLE_BLOCKER);
                updateState({
                  blockers
                });
              }
            });
            return;
          }
          return startNavigation(historyAction, location);
        });
        if (isBrowser) {
          restoreAppliedTransitions(routerWindow, appliedViewTransitions);
          let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
          routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
          removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
        }
        if (!state.initialized) {
          startNavigation(Action.Pop, state.location, {
            initialHydration: true
          });
        }
        return router;
      }
      function dispose() {
        if (unlistenHistory) {
          unlistenHistory();
        }
        if (removePageHideEventListener) {
          removePageHideEventListener();
        }
        subscribers.clear();
        pendingNavigationController && pendingNavigationController.abort();
        state.fetchers.forEach((_, key) => deleteFetcher(key));
        state.blockers.forEach((_, key) => deleteBlocker(key));
      }
      function subscribe(fn) {
        subscribers.add(fn);
        return () => subscribers.delete(fn);
      }
      function updateState(newState, opts) {
        if (opts === void 0) {
          opts = {};
        }
        state = _extends({}, state, newState);
        let completedFetchers = [];
        let deletedFetchersKeys = [];
        if (future.v7_fetcherPersist) {
          state.fetchers.forEach((fetcher, key) => {
            if (fetcher.state === "idle") {
              if (deletedFetchers.has(key)) {
                deletedFetchersKeys.push(key);
              } else {
                completedFetchers.push(key);
              }
            }
          });
        }
        [...subscribers].forEach((subscriber) => subscriber(state, {
          deletedFetchers: deletedFetchersKeys,
          unstable_viewTransitionOpts: opts.viewTransitionOpts,
          unstable_flushSync: opts.flushSync === true
        }));
        if (future.v7_fetcherPersist) {
          completedFetchers.forEach((key) => state.fetchers.delete(key));
          deletedFetchersKeys.forEach((key) => deleteFetcher(key));
        }
      }
      function completeNavigation(location, newState, _temp) {
        var _location$state, _location$state2;
        let {
          flushSync
        } = _temp === void 0 ? {} : _temp;
        let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
        let actionData;
        if (newState.actionData) {
          if (Object.keys(newState.actionData).length > 0) {
            actionData = newState.actionData;
          } else {
            actionData = null;
          }
        } else if (isActionReload) {
          actionData = state.actionData;
        } else {
          actionData = null;
        }
        let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
        let blockers = state.blockers;
        if (blockers.size > 0) {
          blockers = new Map(blockers);
          blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
        }
        let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
        if (inFlightDataRoutes) {
          dataRoutes = inFlightDataRoutes;
          inFlightDataRoutes = void 0;
        }
        if (isUninterruptedRevalidation) ;
        else if (pendingAction === Action.Pop) ;
        else if (pendingAction === Action.Push) {
          init.history.push(location, location.state);
        } else if (pendingAction === Action.Replace) {
          init.history.replace(location, location.state);
        }
        let viewTransitionOpts;
        if (pendingAction === Action.Pop) {
          let priorPaths = appliedViewTransitions.get(state.location.pathname);
          if (priorPaths && priorPaths.has(location.pathname)) {
            viewTransitionOpts = {
              currentLocation: state.location,
              nextLocation: location
            };
          } else if (appliedViewTransitions.has(location.pathname)) {
            viewTransitionOpts = {
              currentLocation: location,
              nextLocation: state.location
            };
          }
        } else if (pendingViewTransitionEnabled) {
          let toPaths = appliedViewTransitions.get(state.location.pathname);
          if (toPaths) {
            toPaths.add(location.pathname);
          } else {
            toPaths = /* @__PURE__ */ new Set([location.pathname]);
            appliedViewTransitions.set(state.location.pathname, toPaths);
          }
          viewTransitionOpts = {
            currentLocation: state.location,
            nextLocation: location
          };
        }
        updateState(_extends({}, newState, {
          // matches, errors, fetchers go through as-is
          actionData,
          loaderData,
          historyAction: pendingAction,
          location,
          initialized: true,
          navigation: IDLE_NAVIGATION,
          revalidation: "idle",
          restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
          preventScrollReset,
          blockers
        }), {
          viewTransitionOpts,
          flushSync: flushSync === true
        });
        pendingAction = Action.Pop;
        pendingPreventScrollReset = false;
        pendingViewTransitionEnabled = false;
        isUninterruptedRevalidation = false;
        isRevalidationRequired = false;
        cancelledDeferredRoutes = [];
        cancelledFetcherLoads = [];
      }
      async function navigate(to, opts) {
        if (typeof to === "number") {
          init.history.go(to);
          return;
        }
        let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, future.v7_relativeSplatPath, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
        let {
          path,
          submission,
          error
        } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
        let currentLocation = state.location;
        let nextLocation = createLocation(state.location, path, opts && opts.state);
        nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
        let userReplace = opts && opts.replace != null ? opts.replace : void 0;
        let historyAction = Action.Push;
        if (userReplace === true) {
          historyAction = Action.Replace;
        } else if (userReplace === false) ;
        else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
          historyAction = Action.Replace;
        }
        let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
        let flushSync = (opts && opts.unstable_flushSync) === true;
        let blockerKey = shouldBlockNavigation({
          currentLocation,
          nextLocation,
          historyAction
        });
        if (blockerKey) {
          updateBlocker(blockerKey, {
            state: "blocked",
            location: nextLocation,
            proceed() {
              updateBlocker(blockerKey, {
                state: "proceeding",
                proceed: void 0,
                reset: void 0,
                location: nextLocation
              });
              navigate(to, opts);
            },
            reset() {
              let blockers = new Map(state.blockers);
              blockers.set(blockerKey, IDLE_BLOCKER);
              updateState({
                blockers
              });
            }
          });
          return;
        }
        return await startNavigation(historyAction, nextLocation, {
          submission,
          // Send through the formData serialization error if we have one so we can
          // render at the right error boundary after we match routes
          pendingError: error,
          preventScrollReset,
          replace: opts && opts.replace,
          enableViewTransition: opts && opts.unstable_viewTransition,
          flushSync
        });
      }
      function revalidate() {
        interruptActiveLoads();
        updateState({
          revalidation: "loading"
        });
        if (state.navigation.state === "submitting") {
          return;
        }
        if (state.navigation.state === "idle") {
          startNavigation(state.historyAction, state.location, {
            startUninterruptedRevalidation: true
          });
          return;
        }
        startNavigation(pendingAction || state.historyAction, state.navigation.location, {
          overrideNavigation: state.navigation
        });
      }
      async function startNavigation(historyAction, location, opts) {
        pendingNavigationController && pendingNavigationController.abort();
        pendingNavigationController = null;
        pendingAction = historyAction;
        isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
        saveScrollPosition(state.location, state.matches);
        pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
        pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
        let routesToUse = inFlightDataRoutes || dataRoutes;
        let loadingNavigation = opts && opts.overrideNavigation;
        let matches = matchRoutes(routesToUse, location, basename);
        let flushSync = (opts && opts.flushSync) === true;
        if (!matches) {
          let error = getInternalRouterError(404, {
            pathname: location.pathname
          });
          let {
            matches: notFoundMatches,
            route
          } = getShortCircuitMatches(routesToUse);
          cancelActiveDeferreds();
          completeNavigation(location, {
            matches: notFoundMatches,
            loaderData: {},
            errors: {
              [route.id]: error
            }
          }, {
            flushSync
          });
          return;
        }
        if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
          completeNavigation(location, {
            matches
          }, {
            flushSync
          });
          return;
        }
        pendingNavigationController = new AbortController();
        let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
        let pendingActionResult;
        if (opts && opts.pendingError) {
          pendingActionResult = [findNearestBoundary(matches).route.id, {
            type: ResultType.error,
            error: opts.pendingError
          }];
        } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
          let actionResult = await handleAction(request, location, opts.submission, matches, {
            replace: opts.replace,
            flushSync
          });
          if (actionResult.shortCircuited) {
            return;
          }
          pendingActionResult = actionResult.pendingActionResult;
          loadingNavigation = getLoadingNavigation(location, opts.submission);
          flushSync = false;
          request = createClientSideRequest(init.history, request.url, request.signal);
        }
        let {
          shortCircuited,
          loaderData,
          errors
        } = await handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && opts.initialHydration === true, flushSync, pendingActionResult);
        if (shortCircuited) {
          return;
        }
        pendingNavigationController = null;
        completeNavigation(location, _extends({
          matches
        }, getActionDataForCommit(pendingActionResult), {
          loaderData,
          errors
        }));
      }
      async function handleAction(request, location, submission, matches, opts) {
        if (opts === void 0) {
          opts = {};
        }
        interruptActiveLoads();
        let navigation = getSubmittingNavigation(location, submission);
        updateState({
          navigation
        }, {
          flushSync: opts.flushSync === true
        });
        let result;
        let actionMatch = getTargetMatch(matches, location);
        if (!actionMatch.route.action && !actionMatch.route.lazy) {
          result = {
            type: ResultType.error,
            error: getInternalRouterError(405, {
              method: request.method,
              pathname: location.pathname,
              routeId: actionMatch.route.id
            })
          };
        } else {
          let results = await callDataStrategy("action", request, [actionMatch], matches);
          result = results[0];
          if (request.signal.aborted) {
            return {
              shortCircuited: true
            };
          }
        }
        if (isRedirectResult(result)) {
          let replace;
          if (opts && opts.replace != null) {
            replace = opts.replace;
          } else {
            let location2 = normalizeRedirectLocation(result.response.headers.get("Location"), new URL(request.url), basename);
            replace = location2 === state.location.pathname + state.location.search;
          }
          await startRedirectNavigation(request, result, {
            submission,
            replace
          });
          return {
            shortCircuited: true
          };
        }
        if (isDeferredResult(result)) {
          throw getInternalRouterError(400, {
            type: "defer-action"
          });
        }
        if (isErrorResult(result)) {
          let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
          if ((opts && opts.replace) !== true) {
            pendingAction = Action.Push;
          }
          return {
            pendingActionResult: [boundaryMatch.route.id, result]
          };
        }
        return {
          pendingActionResult: [actionMatch.route.id, result]
        };
      }
      async function handleLoaders(request, location, matches, overrideNavigation, submission, fetcherSubmission, replace, initialHydration, flushSync, pendingActionResult) {
        let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
        let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
        let routesToUse = inFlightDataRoutes || dataRoutes;
        let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, future.v7_partialHydration && initialHydration === true, future.unstable_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult);
        cancelActiveDeferreds((routeId) => !(matches && matches.some((m) => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m) => m.route.id === routeId));
        pendingNavigationLoadId = ++incrementingLoadId;
        if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
          let updatedFetchers2 = markFetchRedirectsDone();
          completeNavigation(location, _extends({
            matches,
            loaderData: {},
            // Commit pending error if we're short circuiting
            errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
              [pendingActionResult[0]]: pendingActionResult[1].error
            } : null
          }, getActionDataForCommit(pendingActionResult), updatedFetchers2 ? {
            fetchers: new Map(state.fetchers)
          } : {}), {
            flushSync
          });
          return {
            shortCircuited: true
          };
        }
        if (!isUninterruptedRevalidation && (!future.v7_partialHydration || !initialHydration)) {
          revalidatingFetchers.forEach((rf) => {
            let fetcher = state.fetchers.get(rf.key);
            let revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
            state.fetchers.set(rf.key, revalidatingFetcher);
          });
          let actionData;
          if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
            actionData = {
              [pendingActionResult[0]]: pendingActionResult[1].data
            };
          } else if (state.actionData) {
            if (Object.keys(state.actionData).length === 0) {
              actionData = null;
            } else {
              actionData = state.actionData;
            }
          }
          updateState(_extends({
            navigation: loadingNavigation
          }, actionData !== void 0 ? {
            actionData
          } : {}, revalidatingFetchers.length > 0 ? {
            fetchers: new Map(state.fetchers)
          } : {}), {
            flushSync
          });
        }
        revalidatingFetchers.forEach((rf) => {
          if (fetchControllers.has(rf.key)) {
            abortFetcher(rf.key);
          }
          if (rf.controller) {
            fetchControllers.set(rf.key, rf.controller);
          }
        });
        let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
        if (pendingNavigationController) {
          pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
        }
        let {
          loaderResults,
          fetcherResults
        } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
        if (request.signal.aborted) {
          return {
            shortCircuited: true
          };
        }
        if (pendingNavigationController) {
          pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
        }
        revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
        let redirect2 = findRedirect([...loaderResults, ...fetcherResults]);
        if (redirect2) {
          if (redirect2.idx >= matchesToLoad.length) {
            let fetcherKey = revalidatingFetchers[redirect2.idx - matchesToLoad.length].key;
            fetchRedirectIds.add(fetcherKey);
          }
          await startRedirectNavigation(request, redirect2.result, {
            replace
          });
          return {
            shortCircuited: true
          };
        }
        let {
          loaderData,
          errors
        } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds);
        activeDeferreds.forEach((deferredData, routeId) => {
          deferredData.subscribe((aborted) => {
            if (aborted || deferredData.done) {
              activeDeferreds.delete(routeId);
            }
          });
        });
        if (future.v7_partialHydration && initialHydration && state.errors) {
          Object.entries(state.errors).filter((_ref2) => {
            let [id] = _ref2;
            return !matchesToLoad.some((m) => m.route.id === id);
          }).forEach((_ref3) => {
            let [routeId, error] = _ref3;
            errors = Object.assign(errors || {}, {
              [routeId]: error
            });
          });
        }
        let updatedFetchers = markFetchRedirectsDone();
        let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
        let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
        return _extends({
          loaderData,
          errors
        }, shouldUpdateFetchers ? {
          fetchers: new Map(state.fetchers)
        } : {});
      }
      function fetch(key, routeId, href, opts) {
        if (isServer) {
          throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
        }
        if (fetchControllers.has(key)) abortFetcher(key);
        let flushSync = (opts && opts.unstable_flushSync) === true;
        let routesToUse = inFlightDataRoutes || dataRoutes;
        let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, future.v7_relativeSplatPath, routeId, opts == null ? void 0 : opts.relative);
        let matches = matchRoutes(routesToUse, normalizedPath, basename);
        if (!matches) {
          setFetcherError(key, routeId, getInternalRouterError(404, {
            pathname: normalizedPath
          }), {
            flushSync
          });
          return;
        }
        let {
          path,
          submission,
          error
        } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
        if (error) {
          setFetcherError(key, routeId, error, {
            flushSync
          });
          return;
        }
        let match = getTargetMatch(matches, path);
        pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
        if (submission && isMutationMethod(submission.formMethod)) {
          handleFetcherAction(key, routeId, path, match, matches, flushSync, submission);
          return;
        }
        fetchLoadMatches.set(key, {
          routeId,
          path
        });
        handleFetcherLoader(key, routeId, path, match, matches, flushSync, submission);
      }
      async function handleFetcherAction(key, routeId, path, match, requestMatches, flushSync, submission) {
        interruptActiveLoads();
        fetchLoadMatches.delete(key);
        if (!match.route.action && !match.route.lazy) {
          let error = getInternalRouterError(405, {
            method: submission.formMethod,
            pathname: path,
            routeId
          });
          setFetcherError(key, routeId, error, {
            flushSync
          });
          return;
        }
        let existingFetcher = state.fetchers.get(key);
        updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
          flushSync
        });
        let abortController = new AbortController();
        let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
        fetchControllers.set(key, abortController);
        let originatingLoadId = incrementingLoadId;
        let actionResults = await callDataStrategy("action", fetchRequest, [match], requestMatches);
        let actionResult = actionResults[0];
        if (fetchRequest.signal.aborted) {
          if (fetchControllers.get(key) === abortController) {
            fetchControllers.delete(key);
          }
          return;
        }
        if (future.v7_fetcherPersist && deletedFetchers.has(key)) {
          if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
            updateFetcherState(key, getDoneFetcher(void 0));
            return;
          }
        } else {
          if (isRedirectResult(actionResult)) {
            fetchControllers.delete(key);
            if (pendingNavigationLoadId > originatingLoadId) {
              updateFetcherState(key, getDoneFetcher(void 0));
              return;
            } else {
              fetchRedirectIds.add(key);
              updateFetcherState(key, getLoadingFetcher(submission));
              return startRedirectNavigation(fetchRequest, actionResult, {
                fetcherSubmission: submission
              });
            }
          }
          if (isErrorResult(actionResult)) {
            setFetcherError(key, routeId, actionResult.error);
            return;
          }
        }
        if (isDeferredResult(actionResult)) {
          throw getInternalRouterError(400, {
            type: "defer-action"
          });
        }
        let nextLocation = state.navigation.location || state.location;
        let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
        let routesToUse = inFlightDataRoutes || dataRoutes;
        let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
        invariant(matches, "Didn't find any matches after fetcher action");
        let loadId = ++incrementingLoadId;
        fetchReloadIds.set(key, loadId);
        let loadFetcher = getLoadingFetcher(submission, actionResult.data);
        state.fetchers.set(key, loadFetcher);
        let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, false, future.unstable_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, [match.route.id, actionResult]);
        revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
          let staleKey = rf.key;
          let existingFetcher2 = state.fetchers.get(staleKey);
          let revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher2 ? existingFetcher2.data : void 0);
          state.fetchers.set(staleKey, revalidatingFetcher);
          if (fetchControllers.has(staleKey)) {
            abortFetcher(staleKey);
          }
          if (rf.controller) {
            fetchControllers.set(staleKey, rf.controller);
          }
        });
        updateState({
          fetchers: new Map(state.fetchers)
        });
        let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
        abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
        let {
          loaderResults,
          fetcherResults
        } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
        if (abortController.signal.aborted) {
          return;
        }
        abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
        fetchReloadIds.delete(key);
        fetchControllers.delete(key);
        revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
        let redirect2 = findRedirect([...loaderResults, ...fetcherResults]);
        if (redirect2) {
          if (redirect2.idx >= matchesToLoad.length) {
            let fetcherKey = revalidatingFetchers[redirect2.idx - matchesToLoad.length].key;
            fetchRedirectIds.add(fetcherKey);
          }
          return startRedirectNavigation(revalidationRequest, redirect2.result);
        }
        let {
          loaderData,
          errors
        } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
        if (state.fetchers.has(key)) {
          let doneFetcher = getDoneFetcher(actionResult.data);
          state.fetchers.set(key, doneFetcher);
        }
        abortStaleFetchLoads(loadId);
        if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
          invariant(pendingAction, "Expected pending action");
          pendingNavigationController && pendingNavigationController.abort();
          completeNavigation(state.navigation.location, {
            matches,
            loaderData,
            errors,
            fetchers: new Map(state.fetchers)
          });
        } else {
          updateState({
            errors,
            loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
            fetchers: new Map(state.fetchers)
          });
          isRevalidationRequired = false;
        }
      }
      async function handleFetcherLoader(key, routeId, path, match, matches, flushSync, submission) {
        let existingFetcher = state.fetchers.get(key);
        updateFetcherState(key, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0), {
          flushSync
        });
        let abortController = new AbortController();
        let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
        fetchControllers.set(key, abortController);
        let originatingLoadId = incrementingLoadId;
        let results = await callDataStrategy("loader", fetchRequest, [match], matches);
        let result = results[0];
        if (isDeferredResult(result)) {
          result = await resolveDeferredData(result, fetchRequest.signal, true) || result;
        }
        if (fetchControllers.get(key) === abortController) {
          fetchControllers.delete(key);
        }
        if (fetchRequest.signal.aborted) {
          return;
        }
        if (deletedFetchers.has(key)) {
          updateFetcherState(key, getDoneFetcher(void 0));
          return;
        }
        if (isRedirectResult(result)) {
          if (pendingNavigationLoadId > originatingLoadId) {
            updateFetcherState(key, getDoneFetcher(void 0));
            return;
          } else {
            fetchRedirectIds.add(key);
            await startRedirectNavigation(fetchRequest, result);
            return;
          }
        }
        if (isErrorResult(result)) {
          setFetcherError(key, routeId, result.error);
          return;
        }
        invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
        updateFetcherState(key, getDoneFetcher(result.data));
      }
      async function startRedirectNavigation(request, redirect2, _temp2) {
        let {
          submission,
          fetcherSubmission,
          replace
        } = _temp2 === void 0 ? {} : _temp2;
        if (redirect2.response.headers.has("X-Remix-Revalidate")) {
          isRevalidationRequired = true;
        }
        let location = redirect2.response.headers.get("Location");
        invariant(location, "Expected a Location header on the redirect Response");
        location = normalizeRedirectLocation(location, new URL(request.url), basename);
        let redirectLocation = createLocation(state.location, location, {
          _isRedirect: true
        });
        if (isBrowser) {
          let isDocumentReload = false;
          if (redirect2.response.headers.has("X-Remix-Reload-Document")) {
            isDocumentReload = true;
          } else if (ABSOLUTE_URL_REGEX.test(location)) {
            const url = init.history.createURL(location);
            isDocumentReload = // Hard reload if it's an absolute URL to a new origin
            url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
            stripBasename(url.pathname, basename) == null;
          }
          if (isDocumentReload) {
            if (replace) {
              routerWindow.location.replace(location);
            } else {
              routerWindow.location.assign(location);
            }
            return;
          }
        }
        pendingNavigationController = null;
        let redirectHistoryAction = replace === true ? Action.Replace : Action.Push;
        let {
          formMethod,
          formAction,
          formEncType
        } = state.navigation;
        if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
          submission = getSubmissionFromNavigation(state.navigation);
        }
        let activeSubmission = submission || fetcherSubmission;
        if (redirectPreserveMethodStatusCodes.has(redirect2.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) {
          await startNavigation(redirectHistoryAction, redirectLocation, {
            submission: _extends({}, activeSubmission, {
              formAction: location
            }),
            // Preserve this flag across redirects
            preventScrollReset: pendingPreventScrollReset
          });
        } else {
          let overrideNavigation = getLoadingNavigation(redirectLocation, submission);
          await startNavigation(redirectHistoryAction, redirectLocation, {
            overrideNavigation,
            // Send fetcher submissions through for shouldRevalidate
            fetcherSubmission,
            // Preserve this flag across redirects
            preventScrollReset: pendingPreventScrollReset
          });
        }
      }
      async function callDataStrategy(type, request, matchesToLoad, matches) {
        try {
          let results = await callDataStrategyImpl(dataStrategyImpl, type, request, matchesToLoad, matches, manifest, mapRouteProperties);
          return await Promise.all(results.map((result, i) => {
            if (isRedirectHandlerResult(result)) {
              let response = result.result;
              return {
                type: ResultType.redirect,
                response: normalizeRelativeRoutingRedirectResponse(response, request, matchesToLoad[i].route.id, matches, basename, future.v7_relativeSplatPath)
              };
            }
            return convertHandlerResultToDataResult(result);
          }));
        } catch (e) {
          return matchesToLoad.map(() => ({
            type: ResultType.error,
            error: e
          }));
        }
      }
      async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
        let [loaderResults, ...fetcherResults] = await Promise.all([matchesToLoad.length ? callDataStrategy("loader", request, matchesToLoad, matches) : [], ...fetchersToLoad.map((f) => {
          if (f.matches && f.match && f.controller) {
            let fetcherRequest = createClientSideRequest(init.history, f.path, f.controller.signal);
            return callDataStrategy("loader", fetcherRequest, [f.match], f.matches).then((r) => r[0]);
          } else {
            return Promise.resolve({
              type: ResultType.error,
              error: getInternalRouterError(404, {
                pathname: f.path
              })
            });
          }
        })]);
        await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, loaderResults.map(() => request.signal), false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map((f) => f.match), fetcherResults, fetchersToLoad.map((f) => f.controller ? f.controller.signal : null), true)]);
        return {
          loaderResults,
          fetcherResults
        };
      }
      function interruptActiveLoads() {
        isRevalidationRequired = true;
        cancelledDeferredRoutes.push(...cancelActiveDeferreds());
        fetchLoadMatches.forEach((_, key) => {
          if (fetchControllers.has(key)) {
            cancelledFetcherLoads.push(key);
            abortFetcher(key);
          }
        });
      }
      function updateFetcherState(key, fetcher, opts) {
        if (opts === void 0) {
          opts = {};
        }
        state.fetchers.set(key, fetcher);
        updateState({
          fetchers: new Map(state.fetchers)
        }, {
          flushSync: (opts && opts.flushSync) === true
        });
      }
      function setFetcherError(key, routeId, error, opts) {
        if (opts === void 0) {
          opts = {};
        }
        let boundaryMatch = findNearestBoundary(state.matches, routeId);
        deleteFetcher(key);
        updateState({
          errors: {
            [boundaryMatch.route.id]: error
          },
          fetchers: new Map(state.fetchers)
        }, {
          flushSync: (opts && opts.flushSync) === true
        });
      }
      function getFetcher(key) {
        if (future.v7_fetcherPersist) {
          activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
          if (deletedFetchers.has(key)) {
            deletedFetchers.delete(key);
          }
        }
        return state.fetchers.get(key) || IDLE_FETCHER;
      }
      function deleteFetcher(key) {
        let fetcher = state.fetchers.get(key);
        if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
          abortFetcher(key);
        }
        fetchLoadMatches.delete(key);
        fetchReloadIds.delete(key);
        fetchRedirectIds.delete(key);
        deletedFetchers.delete(key);
        state.fetchers.delete(key);
      }
      function deleteFetcherAndUpdateState(key) {
        if (future.v7_fetcherPersist) {
          let count = (activeFetchers.get(key) || 0) - 1;
          if (count <= 0) {
            activeFetchers.delete(key);
            deletedFetchers.add(key);
          } else {
            activeFetchers.set(key, count);
          }
        } else {
          deleteFetcher(key);
        }
        updateState({
          fetchers: new Map(state.fetchers)
        });
      }
      function abortFetcher(key) {
        let controller = fetchControllers.get(key);
        invariant(controller, "Expected fetch controller: " + key);
        controller.abort();
        fetchControllers.delete(key);
      }
      function markFetchersDone(keys) {
        for (let key of keys) {
          let fetcher = getFetcher(key);
          let doneFetcher = getDoneFetcher(fetcher.data);
          state.fetchers.set(key, doneFetcher);
        }
      }
      function markFetchRedirectsDone() {
        let doneKeys = [];
        let updatedFetchers = false;
        for (let key of fetchRedirectIds) {
          let fetcher = state.fetchers.get(key);
          invariant(fetcher, "Expected fetcher: " + key);
          if (fetcher.state === "loading") {
            fetchRedirectIds.delete(key);
            doneKeys.push(key);
            updatedFetchers = true;
          }
        }
        markFetchersDone(doneKeys);
        return updatedFetchers;
      }
      function abortStaleFetchLoads(landedId) {
        let yeetedKeys = [];
        for (let [key, id] of fetchReloadIds) {
          if (id < landedId) {
            let fetcher = state.fetchers.get(key);
            invariant(fetcher, "Expected fetcher: " + key);
            if (fetcher.state === "loading") {
              abortFetcher(key);
              fetchReloadIds.delete(key);
              yeetedKeys.push(key);
            }
          }
        }
        markFetchersDone(yeetedKeys);
        return yeetedKeys.length > 0;
      }
      function getBlocker(key, fn) {
        let blocker = state.blockers.get(key) || IDLE_BLOCKER;
        if (blockerFunctions.get(key) !== fn) {
          blockerFunctions.set(key, fn);
        }
        return blocker;
      }
      function deleteBlocker(key) {
        state.blockers.delete(key);
        blockerFunctions.delete(key);
      }
      function updateBlocker(key, newBlocker) {
        let blocker = state.blockers.get(key) || IDLE_BLOCKER;
        invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
        let blockers = new Map(state.blockers);
        blockers.set(key, newBlocker);
        updateState({
          blockers
        });
      }
      function shouldBlockNavigation(_ref4) {
        let {
          currentLocation,
          nextLocation,
          historyAction
        } = _ref4;
        if (blockerFunctions.size === 0) {
          return;
        }
        if (blockerFunctions.size > 1) {
          warning(false, "A router only supports one blocker at a time");
        }
        let entries = Array.from(blockerFunctions.entries());
        let [blockerKey, blockerFunction] = entries[entries.length - 1];
        let blocker = state.blockers.get(blockerKey);
        if (blocker && blocker.state === "proceeding") {
          return;
        }
        if (blockerFunction({
          currentLocation,
          nextLocation,
          historyAction
        })) {
          return blockerKey;
        }
      }
      function cancelActiveDeferreds(predicate) {
        let cancelledRouteIds = [];
        activeDeferreds.forEach((dfd, routeId) => {
          if (!predicate || predicate(routeId)) {
            dfd.cancel();
            cancelledRouteIds.push(routeId);
            activeDeferreds.delete(routeId);
          }
        });
        return cancelledRouteIds;
      }
      function enableScrollRestoration(positions, getPosition, getKey) {
        savedScrollPositions = positions;
        getScrollPosition = getPosition;
        getScrollRestorationKey = getKey || null;
        if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
          initialScrollRestored = true;
          let y = getSavedScrollPosition(state.location, state.matches);
          if (y != null) {
            updateState({
              restoreScrollPosition: y
            });
          }
        }
        return () => {
          savedScrollPositions = null;
          getScrollPosition = null;
          getScrollRestorationKey = null;
        };
      }
      function getScrollKey(location, matches) {
        if (getScrollRestorationKey) {
          let key = getScrollRestorationKey(location, matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData)));
          return key || location.key;
        }
        return location.key;
      }
      function saveScrollPosition(location, matches) {
        if (savedScrollPositions && getScrollPosition) {
          let key = getScrollKey(location, matches);
          savedScrollPositions[key] = getScrollPosition();
        }
      }
      function getSavedScrollPosition(location, matches) {
        if (savedScrollPositions) {
          let key = getScrollKey(location, matches);
          let y = savedScrollPositions[key];
          if (typeof y === "number") {
            return y;
          }
        }
        return null;
      }
      function _internalSetRoutes(newRoutes) {
        manifest = {};
        inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties, void 0, manifest);
      }
      router = {
        get basename() {
          return basename;
        },
        get future() {
          return future;
        },
        get state() {
          return state;
        },
        get routes() {
          return dataRoutes;
        },
        get window() {
          return routerWindow;
        },
        initialize,
        subscribe,
        enableScrollRestoration,
        navigate,
        fetch,
        revalidate,
        // Passthrough to history-aware createHref used by useHref so we get proper
        // hash-aware URLs in DOM paths
        createHref: (to) => init.history.createHref(to),
        encodeLocation: (to) => init.history.encodeLocation(to),
        getFetcher,
        deleteFetcher: deleteFetcherAndUpdateState,
        dispose,
        getBlocker,
        deleteBlocker,
        _internalFetchControllers: fetchControllers,
        _internalActiveDeferreds: activeDeferreds,
        // TODO: Remove setRoutes, it's temporary to avoid dealing with
        // updating the tree while validating the update algorithm.
        _internalSetRoutes
      };
      return router;
    }
    var UNSAFE_DEFERRED_SYMBOL = /* @__PURE__ */ Symbol("deferred");
    function createStaticHandler(routes, opts) {
      invariant(routes.length > 0, "You must provide a non-empty routes array to createStaticHandler");
      let manifest = {};
      let basename = (opts ? opts.basename : null) || "/";
      let mapRouteProperties;
      if (opts != null && opts.mapRouteProperties) {
        mapRouteProperties = opts.mapRouteProperties;
      } else if (opts != null && opts.detectErrorBoundary) {
        let detectErrorBoundary = opts.detectErrorBoundary;
        mapRouteProperties = (route) => ({
          hasErrorBoundary: detectErrorBoundary(route)
        });
      } else {
        mapRouteProperties = defaultMapRouteProperties;
      }
      let future = _extends({
        v7_relativeSplatPath: false,
        v7_throwAbortReason: false
      }, opts ? opts.future : null);
      let dataRoutes = convertRoutesToDataRoutes(routes, mapRouteProperties, void 0, manifest);
      async function query(request, _temp3) {
        let {
          requestContext,
          skipLoaderErrorBubbling,
          unstable_dataStrategy
        } = _temp3 === void 0 ? {} : _temp3;
        let url = new URL(request.url);
        let method = request.method;
        let location = createLocation("", createPath(url), null, "default");
        let matches = matchRoutes(dataRoutes, location, basename);
        if (!isValidMethod(method) && method !== "HEAD") {
          let error = getInternalRouterError(405, {
            method
          });
          let {
            matches: methodNotAllowedMatches,
            route
          } = getShortCircuitMatches(dataRoutes);
          return {
            basename,
            location,
            matches: methodNotAllowedMatches,
            loaderData: {},
            actionData: null,
            errors: {
              [route.id]: error
            },
            statusCode: error.status,
            loaderHeaders: {},
            actionHeaders: {},
            activeDeferreds: null
          };
        } else if (!matches) {
          let error = getInternalRouterError(404, {
            pathname: location.pathname
          });
          let {
            matches: notFoundMatches,
            route
          } = getShortCircuitMatches(dataRoutes);
          return {
            basename,
            location,
            matches: notFoundMatches,
            loaderData: {},
            actionData: null,
            errors: {
              [route.id]: error
            },
            statusCode: error.status,
            loaderHeaders: {},
            actionHeaders: {},
            activeDeferreds: null
          };
        }
        let result = await queryImpl(request, location, matches, requestContext, unstable_dataStrategy || null, skipLoaderErrorBubbling === true, null);
        if (isResponse(result)) {
          return result;
        }
        return _extends({
          location,
          basename
        }, result);
      }
      async function queryRoute(request, _temp4) {
        let {
          routeId,
          requestContext,
          unstable_dataStrategy
        } = _temp4 === void 0 ? {} : _temp4;
        let url = new URL(request.url);
        let method = request.method;
        let location = createLocation("", createPath(url), null, "default");
        let matches = matchRoutes(dataRoutes, location, basename);
        if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
          throw getInternalRouterError(405, {
            method
          });
        } else if (!matches) {
          throw getInternalRouterError(404, {
            pathname: location.pathname
          });
        }
        let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
        if (routeId && !match) {
          throw getInternalRouterError(403, {
            pathname: location.pathname,
            routeId
          });
        } else if (!match) {
          throw getInternalRouterError(404, {
            pathname: location.pathname
          });
        }
        let result = await queryImpl(request, location, matches, requestContext, unstable_dataStrategy || null, false, match);
        if (isResponse(result)) {
          return result;
        }
        let error = result.errors ? Object.values(result.errors)[0] : void 0;
        if (error !== void 0) {
          throw error;
        }
        if (result.actionData) {
          return Object.values(result.actionData)[0];
        }
        if (result.loaderData) {
          var _result$activeDeferre;
          let data = Object.values(result.loaderData)[0];
          if ((_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id]) {
            data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id];
          }
          return data;
        }
        return void 0;
      }
      async function queryImpl(request, location, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch) {
        invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
        try {
          if (isMutationMethod(request.method.toLowerCase())) {
            let result2 = await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch != null);
            return result2;
          }
          let result = await loadRouteData(request, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch);
          return isResponse(result) ? result : _extends({}, result, {
            actionData: null,
            actionHeaders: {}
          });
        } catch (e) {
          if (isHandlerResult(e) && isResponse(e.result)) {
            if (e.type === ResultType.error) {
              throw e.result;
            }
            return e.result;
          }
          if (isRedirectResponse(e)) {
            return e;
          }
          throw e;
        }
      }
      async function submit(request, matches, actionMatch, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, isRouteRequest) {
        let result;
        if (!actionMatch.route.action && !actionMatch.route.lazy) {
          let error = getInternalRouterError(405, {
            method: request.method,
            pathname: new URL(request.url).pathname,
            routeId: actionMatch.route.id
          });
          if (isRouteRequest) {
            throw error;
          }
          result = {
            type: ResultType.error,
            error
          };
        } else {
          let results = await callDataStrategy("action", request, [actionMatch], matches, isRouteRequest, requestContext, unstable_dataStrategy);
          result = results[0];
          if (request.signal.aborted) {
            throwStaticHandlerAbortedError(request, isRouteRequest, future);
          }
        }
        if (isRedirectResult(result)) {
          throw new Response(null, {
            status: result.response.status,
            headers: {
              Location: result.response.headers.get("Location")
            }
          });
        }
        if (isDeferredResult(result)) {
          let error = getInternalRouterError(400, {
            type: "defer-action"
          });
          if (isRouteRequest) {
            throw error;
          }
          result = {
            type: ResultType.error,
            error
          };
        }
        if (isRouteRequest) {
          if (isErrorResult(result)) {
            throw result.error;
          }
          return {
            matches: [actionMatch],
            loaderData: {},
            actionData: {
              [actionMatch.route.id]: result.data
            },
            errors: null,
            // Note: statusCode + headers are unused here since queryRoute will
            // return the raw Response or value
            statusCode: 200,
            loaderHeaders: {},
            actionHeaders: {},
            activeDeferreds: null
          };
        }
        let loaderRequest = new Request(request.url, {
          headers: request.headers,
          redirect: request.redirect,
          signal: request.signal
        });
        if (isErrorResult(result)) {
          let boundaryMatch = skipLoaderErrorBubbling ? actionMatch : findNearestBoundary(matches, actionMatch.route.id);
          let context2 = await loadRouteData(loaderRequest, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, null, [boundaryMatch.route.id, result]);
          return _extends({}, context2, {
            statusCode: isRouteErrorResponse(result.error) ? result.error.status : result.statusCode != null ? result.statusCode : 500,
            actionData: null,
            actionHeaders: _extends({}, result.headers ? {
              [actionMatch.route.id]: result.headers
            } : {})
          });
        }
        let context = await loadRouteData(loaderRequest, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, null);
        return _extends({}, context, {
          actionData: {
            [actionMatch.route.id]: result.data
          }
        }, result.statusCode ? {
          statusCode: result.statusCode
        } : {}, {
          actionHeaders: result.headers ? {
            [actionMatch.route.id]: result.headers
          } : {}
        });
      }
      async function loadRouteData(request, matches, requestContext, unstable_dataStrategy, skipLoaderErrorBubbling, routeMatch, pendingActionResult) {
        let isRouteRequest = routeMatch != null;
        if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy)) {
          throw getInternalRouterError(400, {
            method: request.method,
            pathname: new URL(request.url).pathname,
            routeId: routeMatch == null ? void 0 : routeMatch.route.id
          });
        }
        let requestMatches = routeMatch ? [routeMatch] : pendingActionResult && isErrorResult(pendingActionResult[1]) ? getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]) : matches;
        let matchesToLoad = requestMatches.filter((m) => m.route.loader || m.route.lazy);
        if (matchesToLoad.length === 0) {
          return {
            matches,
            // Add a null for all matched routes for proper revalidation on the client
            loaderData: matches.reduce((acc, m) => Object.assign(acc, {
              [m.route.id]: null
            }), {}),
            errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? {
              [pendingActionResult[0]]: pendingActionResult[1].error
            } : null,
            statusCode: 200,
            loaderHeaders: {},
            activeDeferreds: null
          };
        }
        let results = await callDataStrategy("loader", request, matchesToLoad, matches, isRouteRequest, requestContext, unstable_dataStrategy);
        if (request.signal.aborted) {
          throwStaticHandlerAbortedError(request, isRouteRequest, future);
        }
        let activeDeferreds = /* @__PURE__ */ new Map();
        let context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling);
        let executedLoaders = new Set(matchesToLoad.map((match) => match.route.id));
        matches.forEach((match) => {
          if (!executedLoaders.has(match.route.id)) {
            context.loaderData[match.route.id] = null;
          }
        });
        return _extends({}, context, {
          matches,
          activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
        });
      }
      async function callDataStrategy(type, request, matchesToLoad, matches, isRouteRequest, requestContext, unstable_dataStrategy) {
        let results = await callDataStrategyImpl(unstable_dataStrategy || defaultDataStrategy, type, request, matchesToLoad, matches, manifest, mapRouteProperties, requestContext);
        return await Promise.all(results.map((result, i) => {
          if (isRedirectHandlerResult(result)) {
            let response = result.result;
            throw normalizeRelativeRoutingRedirectResponse(response, request, matchesToLoad[i].route.id, matches, basename, future.v7_relativeSplatPath);
          }
          if (isResponse(result.result) && isRouteRequest) {
            throw result;
          }
          return convertHandlerResultToDataResult(result);
        }));
      }
      return {
        dataRoutes,
        query,
        queryRoute
      };
    }
    function getStaticContextFromError(routes, context, error) {
      let newContext = _extends({}, context, {
        statusCode: isRouteErrorResponse(error) ? error.status : 500,
        errors: {
          [context._deepestRenderedBoundaryId || routes[0].id]: error
        }
      });
      return newContext;
    }
    function throwStaticHandlerAbortedError(request, isRouteRequest, future) {
      if (future.v7_throwAbortReason && request.signal.reason !== void 0) {
        throw request.signal.reason;
      }
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted: " + request.method + " " + request.url);
    }
    function isSubmissionNavigation(opts) {
      return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
    }
    function normalizeTo(location, matches, basename, prependBasename, to, v7_relativeSplatPath, fromRouteId, relative) {
      let contextualMatches;
      let activeRouteMatch;
      if (fromRouteId) {
        contextualMatches = [];
        for (let match of matches) {
          contextualMatches.push(match);
          if (match.route.id === fromRouteId) {
            activeRouteMatch = match;
            break;
          }
        }
      } else {
        contextualMatches = matches;
        activeRouteMatch = matches[matches.length - 1];
      }
      let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches, v7_relativeSplatPath), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
      if (to == null) {
        path.search = location.search;
        path.hash = location.hash;
      }
      if ((to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path.search)) {
        path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
      }
      if (prependBasename && basename !== "/") {
        path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
      }
      return createPath(path);
    }
    function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
      if (!opts || !isSubmissionNavigation(opts)) {
        return {
          path
        };
      }
      if (opts.formMethod && !isValidMethod(opts.formMethod)) {
        return {
          path,
          error: getInternalRouterError(405, {
            method: opts.formMethod
          })
        };
      }
      let getInvalidBodyError = () => ({
        path,
        error: getInternalRouterError(400, {
          type: "invalid-body"
        })
      });
      let rawFormMethod = opts.formMethod || "get";
      let formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase();
      let formAction = stripHashFromPath(path);
      if (opts.body !== void 0) {
        if (opts.formEncType === "text/plain") {
          if (!isMutationMethod(formMethod)) {
            return getInvalidBodyError();
          }
          let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
            // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
            Array.from(opts.body.entries()).reduce((acc, _ref5) => {
              let [name, value] = _ref5;
              return "" + acc + name + "=" + value + "\n";
            }, "")
          ) : String(opts.body);
          return {
            path,
            submission: {
              formMethod,
              formAction,
              formEncType: opts.formEncType,
              formData: void 0,
              json: void 0,
              text
            }
          };
        } else if (opts.formEncType === "application/json") {
          if (!isMutationMethod(formMethod)) {
            return getInvalidBodyError();
          }
          try {
            let json2 = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
            return {
              path,
              submission: {
                formMethod,
                formAction,
                formEncType: opts.formEncType,
                formData: void 0,
                json: json2,
                text: void 0
              }
            };
          } catch (e) {
            return getInvalidBodyError();
          }
        }
      }
      invariant(typeof FormData === "function", "FormData is not available in this environment");
      let searchParams;
      let formData;
      if (opts.formData) {
        searchParams = convertFormDataToSearchParams(opts.formData);
        formData = opts.formData;
      } else if (opts.body instanceof FormData) {
        searchParams = convertFormDataToSearchParams(opts.body);
        formData = opts.body;
      } else if (opts.body instanceof URLSearchParams) {
        searchParams = opts.body;
        formData = convertSearchParamsToFormData(searchParams);
      } else if (opts.body == null) {
        searchParams = new URLSearchParams();
        formData = new FormData();
      } else {
        try {
          searchParams = new URLSearchParams(opts.body);
          formData = convertSearchParamsToFormData(searchParams);
        } catch (e) {
          return getInvalidBodyError();
        }
      }
      let submission = {
        formMethod,
        formAction,
        formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
        formData,
        json: void 0,
        text: void 0
      };
      if (isMutationMethod(submission.formMethod)) {
        return {
          path,
          submission
        };
      }
      let parsedPath = parsePath(path);
      if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
        searchParams.append("index", "");
      }
      parsedPath.search = "?" + searchParams;
      return {
        path: createPath(parsedPath),
        submission
      };
    }
    function getLoaderMatchesUntilBoundary(matches, boundaryId) {
      let boundaryMatches = matches;
      if (boundaryId) {
        let index = matches.findIndex((m) => m.route.id === boundaryId);
        if (index >= 0) {
          boundaryMatches = matches.slice(0, index);
        }
      }
      return boundaryMatches;
    }
    function getMatchesToLoad(history, state, matches, submission, location, isInitialLoad, skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult) {
      let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
      let currentUrl = history.createURL(state.location);
      let nextUrl = history.createURL(location);
      let boundaryId = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[0] : void 0;
      let boundaryMatches = boundaryId ? getLoaderMatchesUntilBoundary(matches, boundaryId) : matches;
      let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
      let shouldSkipRevalidation = skipActionErrorRevalidation && actionStatus && actionStatus >= 400;
      let navigationMatches = boundaryMatches.filter((match, index) => {
        let {
          route
        } = match;
        if (route.lazy) {
          return true;
        }
        if (route.loader == null) {
          return false;
        }
        if (isInitialLoad) {
          if (typeof route.loader !== "function" || route.loader.hydrate) {
            return true;
          }
          return state.loaderData[route.id] === void 0 && // Don't re-run if the loader ran and threw an error
          (!state.errors || state.errors[route.id] === void 0);
        }
        if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some((id) => id === match.route.id)) {
          return true;
        }
        let currentRouteMatch = state.matches[index];
        let nextRouteMatch = match;
        return shouldRevalidateLoader(match, _extends({
          currentUrl,
          currentParams: currentRouteMatch.params,
          nextUrl,
          nextParams: nextRouteMatch.params
        }, submission, {
          actionResult,
          unstable_actionStatus: actionStatus,
          defaultShouldRevalidate: shouldSkipRevalidation ? false : (
            // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
            isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
            currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
          )
        }));
      });
      let revalidatingFetchers = [];
      fetchLoadMatches.forEach((f, key) => {
        if (isInitialLoad || !matches.some((m) => m.route.id === f.routeId) || deletedFetchers.has(key)) {
          return;
        }
        let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
        if (!fetcherMatches) {
          revalidatingFetchers.push({
            key,
            routeId: f.routeId,
            path: f.path,
            matches: null,
            match: null,
            controller: null
          });
          return;
        }
        let fetcher = state.fetchers.get(key);
        let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
        let shouldRevalidate = false;
        if (fetchRedirectIds.has(key)) {
          shouldRevalidate = false;
        } else if (cancelledFetcherLoads.includes(key)) {
          shouldRevalidate = true;
        } else if (fetcher && fetcher.state !== "idle" && fetcher.data === void 0) {
          shouldRevalidate = isRevalidationRequired;
        } else {
          shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
            currentUrl,
            currentParams: state.matches[state.matches.length - 1].params,
            nextUrl,
            nextParams: matches[matches.length - 1].params
          }, submission, {
            actionResult,
            unstable_actionStatus: actionStatus,
            defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired
          }));
        }
        if (shouldRevalidate) {
          revalidatingFetchers.push({
            key,
            routeId: f.routeId,
            path: f.path,
            matches: fetcherMatches,
            match: fetcherMatch,
            controller: new AbortController()
          });
        }
      });
      return [navigationMatches, revalidatingFetchers];
    }
    function isNewLoader(currentLoaderData, currentMatch, match) {
      let isNew = (
        // [a] -> [a, b]
        !currentMatch || // [a, b] -> [a, c]
        match.route.id !== currentMatch.route.id
      );
      let isMissingData = currentLoaderData[match.route.id] === void 0;
      return isNew || isMissingData;
    }
    function isNewRouteInstance(currentMatch, match) {
      let currentPath = currentMatch.route.path;
      return (
        // param change for this match, /users/123 -> /users/456
        currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
        // e.g. /files/images/avatar.jpg -> files/finances.xls
        currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
      );
    }
    function shouldRevalidateLoader(loaderMatch, arg) {
      if (loaderMatch.route.shouldRevalidate) {
        let routeChoice = loaderMatch.route.shouldRevalidate(arg);
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return arg.defaultShouldRevalidate;
    }
    async function loadLazyRouteModule(route, mapRouteProperties, manifest) {
      if (!route.lazy) {
        return;
      }
      let lazyRoute = await route.lazy();
      if (!route.lazy) {
        return;
      }
      let routeToUpdate = manifest[route.id];
      invariant(routeToUpdate, "No route found in manifest");
      let routeUpdates = {};
      for (let lazyRouteProperty in lazyRoute) {
        let staticRouteValue = routeToUpdate[lazyRouteProperty];
        let isPropertyStaticallyDefined = staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
        // on the route updates
        lazyRouteProperty !== "hasErrorBoundary";
        warning(!isPropertyStaticallyDefined, 'Route "' + routeToUpdate.id + '" has a static property "' + lazyRouteProperty + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + lazyRouteProperty + '" will be ignored.'));
        if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
          routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
        }
      }
      Object.assign(routeToUpdate, routeUpdates);
      Object.assign(routeToUpdate, _extends({}, mapRouteProperties(routeToUpdate), {
        lazy: void 0
      }));
    }
    function defaultDataStrategy(opts) {
      return Promise.all(opts.matches.map((m) => m.resolve()));
    }
    async function callDataStrategyImpl(dataStrategyImpl, type, request, matchesToLoad, matches, manifest, mapRouteProperties, requestContext) {
      let routeIdsToLoad = matchesToLoad.reduce((acc, m) => acc.add(m.route.id), /* @__PURE__ */ new Set());
      let loadedMatches = /* @__PURE__ */ new Set();
      let results = await dataStrategyImpl({
        matches: matches.map((match) => {
          let shouldLoad = routeIdsToLoad.has(match.route.id);
          let resolve = (handlerOverride) => {
            loadedMatches.add(match.route.id);
            return shouldLoad ? callLoaderOrAction(type, request, match, manifest, mapRouteProperties, handlerOverride, requestContext) : Promise.resolve({
              type: ResultType.data,
              result: void 0
            });
          };
          return _extends({}, match, {
            shouldLoad,
            resolve
          });
        }),
        request,
        params: matches[0].params,
        context: requestContext
      });
      matches.forEach((m) => invariant(loadedMatches.has(m.route.id), '`match.resolve()` was not called for route id "' + m.route.id + '". You must call `match.resolve()` on every match passed to `dataStrategy` to ensure all routes are properly loaded.'));
      return results.filter((_, i) => routeIdsToLoad.has(matches[i].route.id));
    }
    async function callLoaderOrAction(type, request, match, manifest, mapRouteProperties, handlerOverride, staticContext) {
      let result;
      let onReject;
      let runHandler = (handler) => {
        let reject;
        let abortPromise = new Promise((_, r) => reject = r);
        onReject = () => reject();
        request.signal.addEventListener("abort", onReject);
        let actualHandler = (ctx) => {
          if (typeof handler !== "function") {
            return Promise.reject(new Error("You cannot call the handler for a route which defines a boolean " + ('"' + type + '" [routeId: ' + match.route.id + "]")));
          }
          return handler({
            request,
            params: match.params,
            context: staticContext
          }, ...ctx !== void 0 ? [ctx] : []);
        };
        let handlerPromise;
        if (handlerOverride) {
          handlerPromise = handlerOverride((ctx) => actualHandler(ctx));
        } else {
          handlerPromise = (async () => {
            try {
              let val = await actualHandler();
              return {
                type: "data",
                result: val
              };
            } catch (e) {
              return {
                type: "error",
                result: e
              };
            }
          })();
        }
        return Promise.race([handlerPromise, abortPromise]);
      };
      try {
        let handler = match.route[type];
        if (match.route.lazy) {
          if (handler) {
            let handlerError;
            let [value] = await Promise.all([
              // If the handler throws, don't let it immediately bubble out,
              // since we need to let the lazy() execution finish so we know if this
              // route has a boundary that can handle the error
              runHandler(handler).catch((e) => {
                handlerError = e;
              }),
              loadLazyRouteModule(match.route, mapRouteProperties, manifest)
            ]);
            if (handlerError !== void 0) {
              throw handlerError;
            }
            result = value;
          } else {
            await loadLazyRouteModule(match.route, mapRouteProperties, manifest);
            handler = match.route[type];
            if (handler) {
              result = await runHandler(handler);
            } else if (type === "action") {
              let url = new URL(request.url);
              let pathname = url.pathname + url.search;
              throw getInternalRouterError(405, {
                method: request.method,
                pathname,
                routeId: match.route.id
              });
            } else {
              return {
                type: ResultType.data,
                result: void 0
              };
            }
          }
        } else if (!handler) {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(404, {
            pathname
          });
        } else {
          result = await runHandler(handler);
        }
        invariant(result.result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
      } catch (e) {
        return {
          type: ResultType.error,
          result: e
        };
      } finally {
        if (onReject) {
          request.signal.removeEventListener("abort", onReject);
        }
      }
      return result;
    }
    async function convertHandlerResultToDataResult(handlerResult) {
      let {
        result,
        type,
        status
      } = handlerResult;
      if (isResponse(result)) {
        let data;
        try {
          let contentType = result.headers.get("Content-Type");
          if (contentType && /\bapplication\/json\b/.test(contentType)) {
            if (result.body == null) {
              data = null;
            } else {
              data = await result.json();
            }
          } else {
            data = await result.text();
          }
        } catch (e) {
          return {
            type: ResultType.error,
            error: e
          };
        }
        if (type === ResultType.error) {
          return {
            type: ResultType.error,
            error: new ErrorResponseImpl(result.status, result.statusText, data),
            statusCode: result.status,
            headers: result.headers
          };
        }
        return {
          type: ResultType.data,
          data,
          statusCode: result.status,
          headers: result.headers
        };
      }
      if (type === ResultType.error) {
        return {
          type: ResultType.error,
          error: result,
          statusCode: isRouteErrorResponse(result) ? result.status : status
        };
      }
      if (isDeferredData(result)) {
        var _result$init, _result$init2;
        return {
          type: ResultType.deferred,
          deferredData: result,
          statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
          headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
        };
      }
      return {
        type: ResultType.data,
        data: result,
        statusCode: status
      };
    }
    function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, v7_relativeSplatPath) {
      let location = response.headers.get("Location");
      invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
      if (!ABSOLUTE_URL_REGEX.test(location)) {
        let trimmedMatches = matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1);
        location = normalizeTo(new URL(request.url), trimmedMatches, basename, true, location, v7_relativeSplatPath);
        response.headers.set("Location", location);
      }
      return response;
    }
    function normalizeRedirectLocation(location, currentUrl, basename) {
      if (ABSOLUTE_URL_REGEX.test(location)) {
        let normalizedLocation = location;
        let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
        let isSameBasename = stripBasename(url.pathname, basename) != null;
        if (url.origin === currentUrl.origin && isSameBasename) {
          return url.pathname + url.search + url.hash;
        }
      }
      return location;
    }
    function createClientSideRequest(history, location, signal, submission) {
      let url = history.createURL(stripHashFromPath(location)).toString();
      let init = {
        signal
      };
      if (submission && isMutationMethod(submission.formMethod)) {
        let {
          formMethod,
          formEncType
        } = submission;
        init.method = formMethod.toUpperCase();
        if (formEncType === "application/json") {
          init.headers = new Headers({
            "Content-Type": formEncType
          });
          init.body = JSON.stringify(submission.json);
        } else if (formEncType === "text/plain") {
          init.body = submission.text;
        } else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
          init.body = convertFormDataToSearchParams(submission.formData);
        } else {
          init.body = submission.formData;
        }
      }
      return new Request(url, init);
    }
    function convertFormDataToSearchParams(formData) {
      let searchParams = new URLSearchParams();
      for (let [key, value] of formData.entries()) {
        searchParams.append(key, typeof value === "string" ? value : value.name);
      }
      return searchParams;
    }
    function convertSearchParamsToFormData(searchParams) {
      let formData = new FormData();
      for (let [key, value] of searchParams.entries()) {
        formData.append(key, value);
      }
      return formData;
    }
    function processRouteLoaderData(matches, matchesToLoad, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling) {
      let loaderData = {};
      let errors = null;
      let statusCode;
      let foundError = false;
      let loaderHeaders = {};
      let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
      results.forEach((result, index) => {
        let id = matchesToLoad[index].route.id;
        invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
        if (isErrorResult(result)) {
          let error = result.error;
          if (pendingError !== void 0) {
            error = pendingError;
            pendingError = void 0;
          }
          errors = errors || {};
          if (skipLoaderErrorBubbling) {
            errors[id] = error;
          } else {
            let boundaryMatch = findNearestBoundary(matches, id);
            if (errors[boundaryMatch.route.id] == null) {
              errors[boundaryMatch.route.id] = error;
            }
          }
          loaderData[id] = void 0;
          if (!foundError) {
            foundError = true;
            statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
          }
          if (result.headers) {
            loaderHeaders[id] = result.headers;
          }
        } else {
          if (isDeferredResult(result)) {
            activeDeferreds.set(id, result.deferredData);
            loaderData[id] = result.deferredData.data;
            if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
              statusCode = result.statusCode;
            }
            if (result.headers) {
              loaderHeaders[id] = result.headers;
            }
          } else {
            loaderData[id] = result.data;
            if (result.statusCode && result.statusCode !== 200 && !foundError) {
              statusCode = result.statusCode;
            }
            if (result.headers) {
              loaderHeaders[id] = result.headers;
            }
          }
        }
      });
      if (pendingError !== void 0 && pendingActionResult) {
        errors = {
          [pendingActionResult[0]]: pendingError
        };
        loaderData[pendingActionResult[0]] = void 0;
      }
      return {
        loaderData,
        errors,
        statusCode: statusCode || 200,
        loaderHeaders
      };
    }
    function processLoaderData(state, matches, matchesToLoad, results, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds) {
      let {
        loaderData,
        errors
      } = processRouteLoaderData(
        matches,
        matchesToLoad,
        results,
        pendingActionResult,
        activeDeferreds,
        false
        // This method is only called client side so we always want to bubble
      );
      for (let index = 0; index < revalidatingFetchers.length; index++) {
        let {
          key,
          match,
          controller
        } = revalidatingFetchers[index];
        invariant(fetcherResults !== void 0 && fetcherResults[index] !== void 0, "Did not find corresponding fetcher result");
        let result = fetcherResults[index];
        if (controller && controller.signal.aborted) {
          continue;
        } else if (isErrorResult(result)) {
          let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
          if (!(errors && errors[boundaryMatch.route.id])) {
            errors = _extends({}, errors, {
              [boundaryMatch.route.id]: result.error
            });
          }
          state.fetchers.delete(key);
        } else if (isRedirectResult(result)) {
          invariant(false, "Unhandled fetcher revalidation redirect");
        } else if (isDeferredResult(result)) {
          invariant(false, "Unhandled fetcher deferred data");
        } else {
          let doneFetcher = getDoneFetcher(result.data);
          state.fetchers.set(key, doneFetcher);
        }
      }
      return {
        loaderData,
        errors
      };
    }
    function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
      let mergedLoaderData = _extends({}, newLoaderData);
      for (let match of matches) {
        let id = match.route.id;
        if (newLoaderData.hasOwnProperty(id)) {
          if (newLoaderData[id] !== void 0) {
            mergedLoaderData[id] = newLoaderData[id];
          }
        } else if (loaderData[id] !== void 0 && match.route.loader) {
          mergedLoaderData[id] = loaderData[id];
        }
        if (errors && errors.hasOwnProperty(id)) {
          break;
        }
      }
      return mergedLoaderData;
    }
    function getActionDataForCommit(pendingActionResult) {
      if (!pendingActionResult) {
        return {};
      }
      return isErrorResult(pendingActionResult[1]) ? {
        // Clear out prior actionData on errors
        actionData: {}
      } : {
        actionData: {
          [pendingActionResult[0]]: pendingActionResult[1].data
        }
      };
    }
    function findNearestBoundary(matches, routeId) {
      let eligibleMatches = routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches];
      return eligibleMatches.reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
    }
    function getShortCircuitMatches(routes) {
      let route = routes.length === 1 ? routes[0] : routes.find((r) => r.index || !r.path || r.path === "/") || {
        id: "__shim-error-route__"
      };
      return {
        matches: [{
          params: {},
          pathname: "",
          pathnameBase: "",
          route
        }],
        route
      };
    }
    function getInternalRouterError(status, _temp5) {
      let {
        pathname,
        routeId,
        method,
        type
      } = _temp5 === void 0 ? {} : _temp5;
      let statusText = "Unknown Server Error";
      let errorMessage = "Unknown @remix-run/router error";
      if (status === 400) {
        statusText = "Bad Request";
        if (method && pathname && routeId) {
          errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request.";
        } else if (type === "defer-action") {
          errorMessage = "defer() is not supported in actions";
        } else if (type === "invalid-body") {
          errorMessage = "Unable to encode submission body";
        }
      } else if (status === 403) {
        statusText = "Forbidden";
        errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"';
      } else if (status === 404) {
        statusText = "Not Found";
        errorMessage = 'No route matches URL "' + pathname + '"';
      } else if (status === 405) {
        statusText = "Method Not Allowed";
        if (method && pathname && routeId) {
          errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request.";
        } else if (method) {
          errorMessage = 'Invalid request method "' + method.toUpperCase() + '"';
        }
      }
      return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
    }
    function findRedirect(results) {
      for (let i = results.length - 1; i >= 0; i--) {
        let result = results[i];
        if (isRedirectResult(result)) {
          return {
            result,
            idx: i
          };
        }
      }
    }
    function stripHashFromPath(path) {
      let parsedPath = typeof path === "string" ? parsePath(path) : path;
      return createPath(_extends({}, parsedPath, {
        hash: ""
      }));
    }
    function isHashChangeOnly(a, b) {
      if (a.pathname !== b.pathname || a.search !== b.search) {
        return false;
      }
      if (a.hash === "") {
        return b.hash !== "";
      } else if (a.hash === b.hash) {
        return true;
      } else if (b.hash !== "") {
        return true;
      }
      return false;
    }
    function isHandlerResult(result) {
      return result != null && typeof result === "object" && "type" in result && "result" in result && (result.type === ResultType.data || result.type === ResultType.error);
    }
    function isRedirectHandlerResult(result) {
      return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
    }
    function isDeferredResult(result) {
      return result.type === ResultType.deferred;
    }
    function isErrorResult(result) {
      return result.type === ResultType.error;
    }
    function isRedirectResult(result) {
      return (result && result.type) === ResultType.redirect;
    }
    function isDeferredData(value) {
      let deferred = value;
      return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
    }
    function isResponse(value) {
      return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
    }
    function isRedirectResponse(result) {
      if (!isResponse(result)) {
        return false;
      }
      let status = result.status;
      let location = result.headers.get("Location");
      return status >= 300 && status <= 399 && location != null;
    }
    function isValidMethod(method) {
      return validRequestMethods.has(method.toLowerCase());
    }
    function isMutationMethod(method) {
      return validMutationMethods.has(method.toLowerCase());
    }
    async function resolveDeferredResults(currentMatches, matchesToLoad, results, signals, isFetcher, currentLoaderData) {
      for (let index = 0; index < results.length; index++) {
        let result = results[index];
        let match = matchesToLoad[index];
        if (!match) {
          continue;
        }
        let currentMatch = currentMatches.find((m) => m.route.id === match.route.id);
        let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== void 0;
        if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
          let signal = signals[index];
          invariant(signal, "Expected an AbortSignal for revalidating fetcher deferred result");
          await resolveDeferredData(result, signal, isFetcher).then((result2) => {
            if (result2) {
              results[index] = result2 || results[index];
            }
          });
        }
      }
    }
    async function resolveDeferredData(result, signal, unwrap) {
      if (unwrap === void 0) {
        unwrap = false;
      }
      let aborted = await result.deferredData.resolveData(signal);
      if (aborted) {
        return;
      }
      if (unwrap) {
        try {
          return {
            type: ResultType.data,
            data: result.deferredData.unwrappedData
          };
        } catch (e) {
          return {
            type: ResultType.error,
            error: e
          };
        }
      }
      return {
        type: ResultType.data,
        data: result.deferredData.data
      };
    }
    function hasNakedIndexQuery(search) {
      return new URLSearchParams(search).getAll("index").some((v) => v === "");
    }
    function getTargetMatch(matches, location) {
      let search = typeof location === "string" ? parsePath(location).search : location.search;
      if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
        return matches[matches.length - 1];
      }
      let pathMatches = getPathContributingMatches(matches);
      return pathMatches[pathMatches.length - 1];
    }
    function getSubmissionFromNavigation(navigation) {
      let {
        formMethod,
        formAction,
        formEncType,
        text,
        formData,
        json: json2
      } = navigation;
      if (!formMethod || !formAction || !formEncType) {
        return;
      }
      if (text != null) {
        return {
          formMethod,
          formAction,
          formEncType,
          formData: void 0,
          json: void 0,
          text
        };
      } else if (formData != null) {
        return {
          formMethod,
          formAction,
          formEncType,
          formData,
          json: void 0,
          text: void 0
        };
      } else if (json2 !== void 0) {
        return {
          formMethod,
          formAction,
          formEncType,
          formData: void 0,
          json: json2,
          text: void 0
        };
      }
    }
    function getLoadingNavigation(location, submission) {
      if (submission) {
        let navigation = {
          state: "loading",
          location,
          formMethod: submission.formMethod,
          formAction: submission.formAction,
          formEncType: submission.formEncType,
          formData: submission.formData,
          json: submission.json,
          text: submission.text
        };
        return navigation;
      } else {
        let navigation = {
          state: "loading",
          location,
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
          json: void 0,
          text: void 0
        };
        return navigation;
      }
    }
    function getSubmittingNavigation(location, submission) {
      let navigation = {
        state: "submitting",
        location,
        formMethod: submission.formMethod,
        formAction: submission.formAction,
        formEncType: submission.formEncType,
        formData: submission.formData,
        json: submission.json,
        text: submission.text
      };
      return navigation;
    }
    function getLoadingFetcher(submission, data) {
      if (submission) {
        let fetcher = {
          state: "loading",
          formMethod: submission.formMethod,
          formAction: submission.formAction,
          formEncType: submission.formEncType,
          formData: submission.formData,
          json: submission.json,
          text: submission.text,
          data
        };
        return fetcher;
      } else {
        let fetcher = {
          state: "loading",
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
          json: void 0,
          text: void 0,
          data
        };
        return fetcher;
      }
    }
    function getSubmittingFetcher(submission, existingFetcher) {
      let fetcher = {
        state: "submitting",
        formMethod: submission.formMethod,
        formAction: submission.formAction,
        formEncType: submission.formEncType,
        formData: submission.formData,
        json: submission.json,
        text: submission.text,
        data: existingFetcher ? existingFetcher.data : void 0
      };
      return fetcher;
    }
    function getDoneFetcher(data) {
      let fetcher = {
        state: "idle",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data
      };
      return fetcher;
    }
    function restoreAppliedTransitions(_window, transitions) {
      try {
        let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
        if (sessionPositions) {
          let json2 = JSON.parse(sessionPositions);
          for (let [k, v] of Object.entries(json2 || {})) {
            if (v && Array.isArray(v)) {
              transitions.set(k, new Set(v || []));
            }
          }
        }
      } catch (e) {
      }
    }
    function persistAppliedTransitions(_window, transitions) {
      if (transitions.size > 0) {
        let json2 = {};
        for (let [k, v] of transitions) {
          json2[k] = [...v];
        }
        try {
          _window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json2));
        } catch (error) {
          warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
        }
      }
    }
    exports.AbortedDeferredError = AbortedDeferredError;
    exports.Action = Action;
    exports.IDLE_BLOCKER = IDLE_BLOCKER;
    exports.IDLE_FETCHER = IDLE_FETCHER;
    exports.IDLE_NAVIGATION = IDLE_NAVIGATION;
    exports.UNSAFE_DEFERRED_SYMBOL = UNSAFE_DEFERRED_SYMBOL;
    exports.UNSAFE_DeferredData = DeferredData;
    exports.UNSAFE_ErrorResponseImpl = ErrorResponseImpl;
    exports.UNSAFE_convertRouteMatchToUiMatch = convertRouteMatchToUiMatch;
    exports.UNSAFE_convertRoutesToDataRoutes = convertRoutesToDataRoutes;
    exports.UNSAFE_getResolveToMatches = getResolveToMatches;
    exports.UNSAFE_invariant = invariant;
    exports.UNSAFE_warning = warning;
    exports.createBrowserHistory = createBrowserHistory;
    exports.createHashHistory = createHashHistory;
    exports.createMemoryHistory = createMemoryHistory;
    exports.createPath = createPath;
    exports.createRouter = createRouter;
    exports.createStaticHandler = createStaticHandler;
    exports.defer = defer;
    exports.generatePath = generatePath;
    exports.getStaticContextFromError = getStaticContextFromError;
    exports.getToPathname = getToPathname;
    exports.isDeferredData = isDeferredData;
    exports.isRouteErrorResponse = isRouteErrorResponse;
    exports.joinPaths = joinPaths;
    exports.json = json;
    exports.matchPath = matchPath;
    exports.matchRoutes = matchRoutes;
    exports.normalizePathname = normalizePathname;
    exports.parsePath = parsePath;
    exports.redirect = redirect;
    exports.redirectDocument = redirectDocument;
    exports.resolvePath = resolvePath;
    exports.resolveTo = resolveTo;
    exports.stripBasename = stripBasename;
  }
});

// node_modules/react-router/dist/umd/react-router.development.js
var require_react_router_development = __commonJS({
  "node_modules/react-router/dist/umd/react-router.development.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_react(), require_router_cjs()) : typeof define === "function" && define.amd ? define(["exports", "react", "@remix-run/router"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.ReactRouter = {}, global.React, global.RemixRouter));
    })(exports, (function(exports2, React, router) {
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
      var React__namespace = /* @__PURE__ */ _interopNamespace(React);
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
      const DataRouterContext = /* @__PURE__ */ React__namespace.createContext(null);
      {
        DataRouterContext.displayName = "DataRouter";
      }
      const DataRouterStateContext = /* @__PURE__ */ React__namespace.createContext(null);
      {
        DataRouterStateContext.displayName = "DataRouterState";
      }
      const AwaitContext = /* @__PURE__ */ React__namespace.createContext(null);
      {
        AwaitContext.displayName = "Await";
      }
      const NavigationContext = /* @__PURE__ */ React__namespace.createContext(null);
      {
        NavigationContext.displayName = "Navigation";
      }
      const LocationContext = /* @__PURE__ */ React__namespace.createContext(null);
      {
        LocationContext.displayName = "Location";
      }
      const RouteContext = /* @__PURE__ */ React__namespace.createContext({
        outlet: null,
        matches: [],
        isDataRoute: false
      });
      {
        RouteContext.displayName = "Route";
      }
      const RouteErrorContext = /* @__PURE__ */ React__namespace.createContext(null);
      {
        RouteErrorContext.displayName = "RouteError";
      }
      function useHref(to, _temp) {
        let {
          relative
        } = _temp === void 0 ? {} : _temp;
        !useInRouterContext() ? router.UNSAFE_invariant(
          false,
          // TODO: This error is probably because they somehow have 2 versions of the
          // router loaded. We can help them understand how to avoid that.
          "useHref() may be used only in the context of a <Router> component."
        ) : void 0;
        let {
          basename,
          navigator
        } = React__namespace.useContext(NavigationContext);
        let {
          hash,
          pathname,
          search
        } = useResolvedPath(to, {
          relative
        });
        let joinedPathname = pathname;
        if (basename !== "/") {
          joinedPathname = pathname === "/" ? basename : router.joinPaths([basename, pathname]);
        }
        return navigator.createHref({
          pathname: joinedPathname,
          search,
          hash
        });
      }
      function useInRouterContext() {
        return React__namespace.useContext(LocationContext) != null;
      }
      function useLocation() {
        !useInRouterContext() ? router.UNSAFE_invariant(
          false,
          // TODO: This error is probably because they somehow have 2 versions of the
          // router loaded. We can help them understand how to avoid that.
          "useLocation() may be used only in the context of a <Router> component."
        ) : void 0;
        return React__namespace.useContext(LocationContext).location;
      }
      function useNavigationType() {
        return React__namespace.useContext(LocationContext).navigationType;
      }
      function useMatch(pattern) {
        !useInRouterContext() ? router.UNSAFE_invariant(
          false,
          // TODO: This error is probably because they somehow have 2 versions of the
          // router loaded. We can help them understand how to avoid that.
          "useMatch() may be used only in the context of a <Router> component."
        ) : void 0;
        let {
          pathname
        } = useLocation();
        return React__namespace.useMemo(() => router.matchPath(pattern, pathname), [pathname, pattern]);
      }
      const navigateEffectWarning = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
      function useIsomorphicLayoutEffect(cb) {
        let isStatic = React__namespace.useContext(NavigationContext).static;
        if (!isStatic) {
          React__namespace.useLayoutEffect(cb);
        }
      }
      function useNavigate() {
        let {
          isDataRoute
        } = React__namespace.useContext(RouteContext);
        return isDataRoute ? useNavigateStable() : useNavigateUnstable();
      }
      function useNavigateUnstable() {
        !useInRouterContext() ? router.UNSAFE_invariant(
          false,
          // TODO: This error is probably because they somehow have 2 versions of the
          // router loaded. We can help them understand how to avoid that.
          "useNavigate() may be used only in the context of a <Router> component."
        ) : void 0;
        let dataRouterContext = React__namespace.useContext(DataRouterContext);
        let {
          basename,
          future,
          navigator
        } = React__namespace.useContext(NavigationContext);
        let {
          matches
        } = React__namespace.useContext(RouteContext);
        let {
          pathname: locationPathname
        } = useLocation();
        let routePathnamesJson = JSON.stringify(router.UNSAFE_getResolveToMatches(matches, future.v7_relativeSplatPath));
        let activeRef = React__namespace.useRef(false);
        useIsomorphicLayoutEffect(() => {
          activeRef.current = true;
        });
        let navigate = React__namespace.useCallback(function(to, options) {
          if (options === void 0) {
            options = {};
          }
          router.UNSAFE_warning(activeRef.current, navigateEffectWarning);
          if (!activeRef.current) return;
          if (typeof to === "number") {
            navigator.go(to);
            return;
          }
          let path = router.resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
          if (dataRouterContext == null && basename !== "/") {
            path.pathname = path.pathname === "/" ? basename : router.joinPaths([basename, path.pathname]);
          }
          (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
        }, [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext]);
        return navigate;
      }
      const OutletContext = /* @__PURE__ */ React__namespace.createContext(null);
      function useOutletContext() {
        return React__namespace.useContext(OutletContext);
      }
      function useOutlet(context) {
        let outlet = React__namespace.useContext(RouteContext).outlet;
        if (outlet) {
          return /* @__PURE__ */ React__namespace.createElement(OutletContext.Provider, {
            value: context
          }, outlet);
        }
        return outlet;
      }
      function useParams() {
        let {
          matches
        } = React__namespace.useContext(RouteContext);
        let routeMatch = matches[matches.length - 1];
        return routeMatch ? routeMatch.params : {};
      }
      function useResolvedPath(to, _temp2) {
        let {
          relative
        } = _temp2 === void 0 ? {} : _temp2;
        let {
          future
        } = React__namespace.useContext(NavigationContext);
        let {
          matches
        } = React__namespace.useContext(RouteContext);
        let {
          pathname: locationPathname
        } = useLocation();
        let routePathnamesJson = JSON.stringify(router.UNSAFE_getResolveToMatches(matches, future.v7_relativeSplatPath));
        return React__namespace.useMemo(() => router.resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
      }
      function useRoutes(routes, locationArg) {
        return useRoutesImpl(routes, locationArg);
      }
      function useRoutesImpl(routes, locationArg, dataRouterState, future) {
        !useInRouterContext() ? router.UNSAFE_invariant(
          false,
          // TODO: This error is probably because they somehow have 2 versions of the
          // router loaded. We can help them understand how to avoid that.
          "useRoutes() may be used only in the context of a <Router> component."
        ) : void 0;
        let {
          navigator
        } = React__namespace.useContext(NavigationContext);
        let {
          matches: parentMatches
        } = React__namespace.useContext(RouteContext);
        let routeMatch = parentMatches[parentMatches.length - 1];
        let parentParams = routeMatch ? routeMatch.params : {};
        let parentPathname = routeMatch ? routeMatch.pathname : "/";
        let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
        let parentRoute = routeMatch && routeMatch.route;
        {
          let parentPath = parentRoute && parentRoute.path || "";
          warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + parentPathname + '" (under <Route path="' + parentPath + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + parentPath + '"> to <Route ') + ('path="' + (parentPath === "/" ? "*" : parentPath + "/*") + '">.'));
        }
        let locationFromContext = useLocation();
        let location;
        if (locationArg) {
          var _parsedLocationArg$pa;
          let parsedLocationArg = typeof locationArg === "string" ? router.parsePath(locationArg) : locationArg;
          !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? router.UNSAFE_invariant(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + parentPathnameBase + '" ') + ('but pathname "' + parsedLocationArg.pathname + '" was given in the `location` prop.')) : void 0;
          location = parsedLocationArg;
        } else {
          location = locationFromContext;
        }
        let pathname = location.pathname || "/";
        let remainingPathname = pathname;
        if (parentPathnameBase !== "/") {
          let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
          let segments = pathname.replace(/^\//, "").split("/");
          remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
        }
        let matches = router.matchRoutes(routes, {
          pathname: remainingPathname
        });
        {
          router.UNSAFE_warning(parentRoute || matches != null, 'No routes matched location "' + location.pathname + location.search + location.hash + '" ');
          router.UNSAFE_warning(matches == null || matches[matches.length - 1].route.element !== void 0 || matches[matches.length - 1].route.Component !== void 0 || matches[matches.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + location.pathname + location.search + location.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
        }
        let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
          params: Object.assign({}, parentParams, match.params),
          pathname: router.joinPaths([
            parentPathnameBase,
            // Re-encode pathnames that were decoded inside matchRoutes
            navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname
          ]),
          pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : router.joinPaths([
            parentPathnameBase,
            // Re-encode pathnames that were decoded inside matchRoutes
            navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
          ])
        })), parentMatches, dataRouterState, future);
        if (locationArg && renderedMatches) {
          return /* @__PURE__ */ React__namespace.createElement(LocationContext.Provider, {
            value: {
              location: _extends({
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default"
              }, location),
              navigationType: router.Action.Pop
            }
          }, renderedMatches);
        }
        return renderedMatches;
      }
      function DefaultErrorComponent() {
        let error = useRouteError();
        let message = router.isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
        let stack = error instanceof Error ? error.stack : null;
        let lightgrey = "rgba(200,200,200, 0.5)";
        let preStyles = {
          padding: "0.5rem",
          backgroundColor: lightgrey
        };
        let codeStyles = {
          padding: "2px 4px",
          backgroundColor: lightgrey
        };
        let devInfo = null;
        {
          console.error("Error handled by React Router default ErrorBoundary:", error);
          devInfo = /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("p", null, "\u{1F4BF} Hey developer \u{1F44B}"), /* @__PURE__ */ React__namespace.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ React__namespace.createElement("code", {
            style: codeStyles
          }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ React__namespace.createElement("code", {
            style: codeStyles
          }, "errorElement"), " prop on your route."));
        }
        return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React__namespace.createElement("h3", {
          style: {
            fontStyle: "italic"
          }
        }, message), stack ? /* @__PURE__ */ React__namespace.createElement("pre", {
          style: preStyles
        }, stack) : null, devInfo);
      }
      const defaultErrorElement = /* @__PURE__ */ React__namespace.createElement(DefaultErrorComponent, null);
      class RenderErrorBoundary extends React__namespace.Component {
        constructor(props) {
          super(props);
          this.state = {
            location: props.location,
            revalidation: props.revalidation,
            error: props.error
          };
        }
        static getDerivedStateFromError(error) {
          return {
            error
          };
        }
        static getDerivedStateFromProps(props, state) {
          if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
            return {
              error: props.error,
              location: props.location,
              revalidation: props.revalidation
            };
          }
          return {
            error: props.error !== void 0 ? props.error : state.error,
            location: state.location,
            revalidation: props.revalidation || state.revalidation
          };
        }
        componentDidCatch(error, errorInfo) {
          console.error("React Router caught the following error during render", error, errorInfo);
        }
        render() {
          return this.state.error !== void 0 ? /* @__PURE__ */ React__namespace.createElement(RouteContext.Provider, {
            value: this.props.routeContext
          }, /* @__PURE__ */ React__namespace.createElement(RouteErrorContext.Provider, {
            value: this.state.error,
            children: this.props.component
          })) : this.props.children;
        }
      }
      function RenderedRoute(_ref) {
        let {
          routeContext,
          match,
          children
        } = _ref;
        let dataRouterContext = React__namespace.useContext(DataRouterContext);
        if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
          dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
        }
        return /* @__PURE__ */ React__namespace.createElement(RouteContext.Provider, {
          value: routeContext
        }, children);
      }
      function _renderMatches(matches, parentMatches, dataRouterState, future) {
        var _dataRouterState2;
        if (parentMatches === void 0) {
          parentMatches = [];
        }
        if (dataRouterState === void 0) {
          dataRouterState = null;
        }
        if (future === void 0) {
          future = null;
        }
        if (matches == null) {
          var _dataRouterState;
          if ((_dataRouterState = dataRouterState) != null && _dataRouterState.errors) {
            matches = dataRouterState.matches;
          } else {
            return null;
          }
        }
        let renderedMatches = matches;
        let errors = (_dataRouterState2 = dataRouterState) == null ? void 0 : _dataRouterState2.errors;
        if (errors != null) {
          let errorIndex = renderedMatches.findIndex((m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== void 0);
          !(errorIndex >= 0) ? router.UNSAFE_invariant(false, "Could not find a matching route for errors on route IDs: " + Object.keys(errors).join(",")) : void 0;
          renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
        }
        let renderFallback = false;
        let fallbackIndex = -1;
        if (dataRouterState && future && future.v7_partialHydration) {
          for (let i = 0; i < renderedMatches.length; i++) {
            let match = renderedMatches[i];
            if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
              fallbackIndex = i;
            }
            if (match.route.id) {
              let {
                loaderData,
                errors: errors2
              } = dataRouterState;
              let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
              if (match.route.lazy || needsToRunLoader) {
                renderFallback = true;
                if (fallbackIndex >= 0) {
                  renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
                } else {
                  renderedMatches = [renderedMatches[0]];
                }
                break;
              }
            }
          }
        }
        return renderedMatches.reduceRight((outlet, match, index) => {
          let error;
          let shouldRenderHydrateFallback = false;
          let errorElement = null;
          let hydrateFallbackElement = null;
          if (dataRouterState) {
            error = errors && match.route.id ? errors[match.route.id] : void 0;
            errorElement = match.route.errorElement || defaultErrorElement;
            if (renderFallback) {
              if (fallbackIndex < 0 && index === 0) {
                warningOnce("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration");
                shouldRenderHydrateFallback = true;
                hydrateFallbackElement = null;
              } else if (fallbackIndex === index) {
                shouldRenderHydrateFallback = true;
                hydrateFallbackElement = match.route.hydrateFallbackElement || null;
              }
            }
          }
          let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
          let getChildren = () => {
            let children;
            if (error) {
              children = errorElement;
            } else if (shouldRenderHydrateFallback) {
              children = hydrateFallbackElement;
            } else if (match.route.Component) {
              children = /* @__PURE__ */ React__namespace.createElement(match.route.Component, null);
            } else if (match.route.element) {
              children = match.route.element;
            } else {
              children = outlet;
            }
            return /* @__PURE__ */ React__namespace.createElement(RenderedRoute, {
              match,
              routeContext: {
                outlet,
                matches: matches2,
                isDataRoute: dataRouterState != null
              },
              children
            });
          };
          return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ React__namespace.createElement(RenderErrorBoundary, {
            location: dataRouterState.location,
            revalidation: dataRouterState.revalidation,
            component: errorElement,
            error,
            children: getChildren(),
            routeContext: {
              outlet: null,
              matches: matches2,
              isDataRoute: true
            }
          }) : getChildren();
        }, null);
      }
      var DataRouterHook = /* @__PURE__ */ (function(DataRouterHook2) {
        DataRouterHook2["UseBlocker"] = "useBlocker";
        DataRouterHook2["UseRevalidator"] = "useRevalidator";
        DataRouterHook2["UseNavigateStable"] = "useNavigate";
        return DataRouterHook2;
      })(DataRouterHook || {});
      var DataRouterStateHook = /* @__PURE__ */ (function(DataRouterStateHook2) {
        DataRouterStateHook2["UseBlocker"] = "useBlocker";
        DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
        DataRouterStateHook2["UseActionData"] = "useActionData";
        DataRouterStateHook2["UseRouteError"] = "useRouteError";
        DataRouterStateHook2["UseNavigation"] = "useNavigation";
        DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
        DataRouterStateHook2["UseMatches"] = "useMatches";
        DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
        DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
        DataRouterStateHook2["UseRouteId"] = "useRouteId";
        return DataRouterStateHook2;
      })(DataRouterStateHook || {});
      function getDataRouterConsoleError(hookName) {
        return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
      }
      function useDataRouterContext(hookName) {
        let ctx = React__namespace.useContext(DataRouterContext);
        !ctx ? router.UNSAFE_invariant(false, getDataRouterConsoleError(hookName)) : void 0;
        return ctx;
      }
      function useDataRouterState(hookName) {
        let state = React__namespace.useContext(DataRouterStateContext);
        !state ? router.UNSAFE_invariant(false, getDataRouterConsoleError(hookName)) : void 0;
        return state;
      }
      function useRouteContext(hookName) {
        let route = React__namespace.useContext(RouteContext);
        !route ? router.UNSAFE_invariant(false, getDataRouterConsoleError(hookName)) : void 0;
        return route;
      }
      function useCurrentRouteId(hookName) {
        let route = useRouteContext(hookName);
        let thisRoute = route.matches[route.matches.length - 1];
        !thisRoute.route.id ? router.UNSAFE_invariant(false, hookName + ' can only be used on routes that contain a unique "id"') : void 0;
        return thisRoute.route.id;
      }
      function useRouteId() {
        return useCurrentRouteId(DataRouterStateHook.UseRouteId);
      }
      function useNavigation() {
        let state = useDataRouterState(DataRouterStateHook.UseNavigation);
        return state.navigation;
      }
      function useRevalidator() {
        let dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator);
        let state = useDataRouterState(DataRouterStateHook.UseRevalidator);
        return React__namespace.useMemo(() => ({
          revalidate: dataRouterContext.router.revalidate,
          state: state.revalidation
        }), [dataRouterContext.router.revalidate, state.revalidation]);
      }
      function useMatches() {
        let {
          matches,
          loaderData
        } = useDataRouterState(DataRouterStateHook.UseMatches);
        return React__namespace.useMemo(() => matches.map((m) => router.UNSAFE_convertRouteMatchToUiMatch(m, loaderData)), [matches, loaderData]);
      }
      function useLoaderData() {
        let state = useDataRouterState(DataRouterStateHook.UseLoaderData);
        let routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
        if (state.errors && state.errors[routeId] != null) {
          console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
          return void 0;
        }
        return state.loaderData[routeId];
      }
      function useRouteLoaderData(routeId) {
        let state = useDataRouterState(DataRouterStateHook.UseRouteLoaderData);
        return state.loaderData[routeId];
      }
      function useActionData() {
        let state = useDataRouterState(DataRouterStateHook.UseActionData);
        let routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
        return state.actionData ? state.actionData[routeId] : void 0;
      }
      function useRouteError() {
        var _state$errors;
        let error = React__namespace.useContext(RouteErrorContext);
        let state = useDataRouterState(DataRouterStateHook.UseRouteError);
        let routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError);
        if (error !== void 0) {
          return error;
        }
        return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
      }
      function useAsyncValue() {
        let value = React__namespace.useContext(AwaitContext);
        return value == null ? void 0 : value._data;
      }
      function useAsyncError() {
        let value = React__namespace.useContext(AwaitContext);
        return value == null ? void 0 : value._error;
      }
      let blockerId = 0;
      function useBlocker(shouldBlock) {
        let {
          router: router$1,
          basename
        } = useDataRouterContext(DataRouterHook.UseBlocker);
        let state = useDataRouterState(DataRouterStateHook.UseBlocker);
        let [blockerKey, setBlockerKey] = React__namespace.useState("");
        let blockerFunction = React__namespace.useCallback((arg) => {
          if (typeof shouldBlock !== "function") {
            return !!shouldBlock;
          }
          if (basename === "/") {
            return shouldBlock(arg);
          }
          let {
            currentLocation,
            nextLocation,
            historyAction
          } = arg;
          return shouldBlock({
            currentLocation: _extends({}, currentLocation, {
              pathname: router.stripBasename(currentLocation.pathname, basename) || currentLocation.pathname
            }),
            nextLocation: _extends({}, nextLocation, {
              pathname: router.stripBasename(nextLocation.pathname, basename) || nextLocation.pathname
            }),
            historyAction
          });
        }, [basename, shouldBlock]);
        React__namespace.useEffect(() => {
          let key = String(++blockerId);
          setBlockerKey(key);
          return () => router$1.deleteBlocker(key);
        }, [router$1]);
        React__namespace.useEffect(() => {
          if (blockerKey !== "") {
            router$1.getBlocker(blockerKey, blockerFunction);
          }
        }, [router$1, blockerKey, blockerFunction]);
        return blockerKey && state.blockers.has(blockerKey) ? state.blockers.get(blockerKey) : router.IDLE_BLOCKER;
      }
      function useNavigateStable() {
        let {
          router: router$1
        } = useDataRouterContext(DataRouterHook.UseNavigateStable);
        let id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable);
        let activeRef = React__namespace.useRef(false);
        useIsomorphicLayoutEffect(() => {
          activeRef.current = true;
        });
        let navigate = React__namespace.useCallback(function(to, options) {
          if (options === void 0) {
            options = {};
          }
          router.UNSAFE_warning(activeRef.current, navigateEffectWarning);
          if (!activeRef.current) return;
          if (typeof to === "number") {
            router$1.navigate(to);
          } else {
            router$1.navigate(to, _extends({
              fromRouteId: id
            }, options));
          }
        }, [router$1, id]);
        return navigate;
      }
      const alreadyWarned = {};
      function warningOnce(key, cond, message) {
        if (!cond && !alreadyWarned[key]) {
          alreadyWarned[key] = true;
          router.UNSAFE_warning(false, message);
        }
      }
      const START_TRANSITION = "startTransition";
      const startTransitionImpl = React__namespace[START_TRANSITION];
      function RouterProvider(_ref) {
        let {
          fallbackElement,
          router: router$1,
          future
        } = _ref;
        let [state, setStateImpl] = React__namespace.useState(router$1.state);
        let {
          v7_startTransition
        } = future || {};
        let setState = React__namespace.useCallback((newState) => {
          if (v7_startTransition && startTransitionImpl) {
            startTransitionImpl(() => setStateImpl(newState));
          } else {
            setStateImpl(newState);
          }
        }, [setStateImpl, v7_startTransition]);
        React__namespace.useLayoutEffect(() => router$1.subscribe(setState), [router$1, setState]);
        React__namespace.useEffect(() => {
          router.UNSAFE_warning(fallbackElement == null || !router$1.future.v7_partialHydration, "`<RouterProvider fallbackElement>` is deprecated when using `v7_partialHydration`, use a `HydrateFallback` component instead");
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
        return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(DataRouterContext.Provider, {
          value: dataRouterContext
        }, /* @__PURE__ */ React__namespace.createElement(DataRouterStateContext.Provider, {
          value: state
        }, /* @__PURE__ */ React__namespace.createElement(Router, {
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
        }) : fallbackElement))), null);
      }
      function DataRoutes(_ref2) {
        let {
          routes,
          future,
          state
        } = _ref2;
        return useRoutesImpl(routes, void 0, state, future);
      }
      function MemoryRouter(_ref3) {
        let {
          basename,
          children,
          initialEntries,
          initialIndex,
          future
        } = _ref3;
        let historyRef = React__namespace.useRef();
        if (historyRef.current == null) {
          historyRef.current = router.createMemoryHistory({
            initialEntries,
            initialIndex,
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
        return /* @__PURE__ */ React__namespace.createElement(Router, {
          basename,
          children,
          location: state.location,
          navigationType: state.action,
          navigator: history,
          future
        });
      }
      function Navigate(_ref4) {
        let {
          to,
          replace,
          state,
          relative
        } = _ref4;
        !useInRouterContext() ? router.UNSAFE_invariant(
          false,
          // TODO: This error is probably because they somehow have 2 versions of
          // the router loaded. We can help them understand how to avoid that.
          "<Navigate> may be used only in the context of a <Router> component."
        ) : void 0;
        let {
          future,
          static: isStatic
        } = React__namespace.useContext(NavigationContext);
        router.UNSAFE_warning(!isStatic, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
        let {
          matches
        } = React__namespace.useContext(RouteContext);
        let {
          pathname: locationPathname
        } = useLocation();
        let navigate = useNavigate();
        let path = router.resolveTo(to, router.UNSAFE_getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
        let jsonPath = JSON.stringify(path);
        React__namespace.useEffect(() => navigate(JSON.parse(jsonPath), {
          replace,
          state,
          relative
        }), [navigate, jsonPath, relative, replace, state]);
        return null;
      }
      function Outlet(props) {
        return useOutlet(props.context);
      }
      function Route(_props) {
        router.UNSAFE_invariant(false, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
      }
      function Router(_ref5) {
        let {
          basename: basenameProp = "/",
          children = null,
          location: locationProp,
          navigationType = router.Action.Pop,
          navigator,
          static: staticProp = false,
          future
        } = _ref5;
        !!useInRouterContext() ? router.UNSAFE_invariant(false, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : void 0;
        let basename = basenameProp.replace(/^\/*/, "/");
        let navigationContext = React__namespace.useMemo(() => ({
          basename,
          navigator,
          static: staticProp,
          future: _extends({
            v7_relativeSplatPath: false
          }, future)
        }), [basename, future, navigator, staticProp]);
        if (typeof locationProp === "string") {
          locationProp = router.parsePath(locationProp);
        }
        let {
          pathname = "/",
          search = "",
          hash = "",
          state = null,
          key = "default"
        } = locationProp;
        let locationContext = React__namespace.useMemo(() => {
          let trailingPathname = router.stripBasename(pathname, basename);
          if (trailingPathname == null) {
            return null;
          }
          return {
            location: {
              pathname: trailingPathname,
              search,
              hash,
              state,
              key
            },
            navigationType
          };
        }, [basename, pathname, search, hash, state, key, navigationType]);
        router.UNSAFE_warning(locationContext != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash + '" because it does not start with the ') + "basename, so the <Router> won't render anything.");
        if (locationContext == null) {
          return null;
        }
        return /* @__PURE__ */ React__namespace.createElement(NavigationContext.Provider, {
          value: navigationContext
        }, /* @__PURE__ */ React__namespace.createElement(LocationContext.Provider, {
          children,
          value: locationContext
        }));
      }
      function Routes(_ref6) {
        let {
          children,
          location
        } = _ref6;
        return useRoutes(createRoutesFromChildren(children), location);
      }
      function Await(_ref7) {
        let {
          children,
          errorElement,
          resolve
        } = _ref7;
        return /* @__PURE__ */ React__namespace.createElement(AwaitErrorBoundary, {
          resolve,
          errorElement
        }, /* @__PURE__ */ React__namespace.createElement(ResolveAwait, null, children));
      }
      var AwaitRenderStatus = /* @__PURE__ */ (function(AwaitRenderStatus2) {
        AwaitRenderStatus2[AwaitRenderStatus2["pending"] = 0] = "pending";
        AwaitRenderStatus2[AwaitRenderStatus2["success"] = 1] = "success";
        AwaitRenderStatus2[AwaitRenderStatus2["error"] = 2] = "error";
        return AwaitRenderStatus2;
      })(AwaitRenderStatus || {});
      const neverSettledPromise = new Promise(() => {
      });
      class AwaitErrorBoundary extends React__namespace.Component {
        constructor(props) {
          super(props);
          this.state = {
            error: null
          };
        }
        static getDerivedStateFromError(error) {
          return {
            error
          };
        }
        componentDidCatch(error, errorInfo) {
          console.error("<Await> caught the following error during render", error, errorInfo);
        }
        render() {
          let {
            children,
            errorElement,
            resolve
          } = this.props;
          let promise = null;
          let status = AwaitRenderStatus.pending;
          if (!(resolve instanceof Promise)) {
            status = AwaitRenderStatus.success;
            promise = Promise.resolve();
            Object.defineProperty(promise, "_tracked", {
              get: () => true
            });
            Object.defineProperty(promise, "_data", {
              get: () => resolve
            });
          } else if (this.state.error) {
            status = AwaitRenderStatus.error;
            let renderError = this.state.error;
            promise = Promise.reject().catch(() => {
            });
            Object.defineProperty(promise, "_tracked", {
              get: () => true
            });
            Object.defineProperty(promise, "_error", {
              get: () => renderError
            });
          } else if (resolve._tracked) {
            promise = resolve;
            status = "_error" in promise ? AwaitRenderStatus.error : "_data" in promise ? AwaitRenderStatus.success : AwaitRenderStatus.pending;
          } else {
            status = AwaitRenderStatus.pending;
            Object.defineProperty(resolve, "_tracked", {
              get: () => true
            });
            promise = resolve.then((data) => Object.defineProperty(resolve, "_data", {
              get: () => data
            }), (error) => Object.defineProperty(resolve, "_error", {
              get: () => error
            }));
          }
          if (status === AwaitRenderStatus.error && promise._error instanceof router.AbortedDeferredError) {
            throw neverSettledPromise;
          }
          if (status === AwaitRenderStatus.error && !errorElement) {
            throw promise._error;
          }
          if (status === AwaitRenderStatus.error) {
            return /* @__PURE__ */ React__namespace.createElement(AwaitContext.Provider, {
              value: promise,
              children: errorElement
            });
          }
          if (status === AwaitRenderStatus.success) {
            return /* @__PURE__ */ React__namespace.createElement(AwaitContext.Provider, {
              value: promise,
              children
            });
          }
          throw promise;
        }
      }
      function ResolveAwait(_ref8) {
        let {
          children
        } = _ref8;
        let data = useAsyncValue();
        let toRender = typeof children === "function" ? children(data) : children;
        return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, toRender);
      }
      function createRoutesFromChildren(children, parentPath) {
        if (parentPath === void 0) {
          parentPath = [];
        }
        let routes = [];
        React__namespace.Children.forEach(children, (element, index) => {
          if (!/* @__PURE__ */ React__namespace.isValidElement(element)) {
            return;
          }
          let treePath = [...parentPath, index];
          if (element.type === React__namespace.Fragment) {
            routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
            return;
          }
          !(element.type === Route) ? router.UNSAFE_invariant(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : void 0;
          !(!element.props.index || !element.props.children) ? router.UNSAFE_invariant(false, "An index route cannot have child routes.") : void 0;
          let route = {
            id: element.props.id || treePath.join("-"),
            caseSensitive: element.props.caseSensitive,
            element: element.props.element,
            Component: element.props.Component,
            index: element.props.index,
            path: element.props.path,
            loader: element.props.loader,
            action: element.props.action,
            errorElement: element.props.errorElement,
            ErrorBoundary: element.props.ErrorBoundary,
            hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
            shouldRevalidate: element.props.shouldRevalidate,
            handle: element.props.handle,
            lazy: element.props.lazy
          };
          if (element.props.children) {
            route.children = createRoutesFromChildren(element.props.children, treePath);
          }
          routes.push(route);
        });
        return routes;
      }
      function renderMatches(matches) {
        return _renderMatches(matches);
      }
      function mapRouteProperties(route) {
        let updates = {
          // Note: this check also occurs in createRoutesFromChildren so update
          // there if you change this -- please and thank you!
          hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null
        };
        if (route.Component) {
          {
            if (route.element) {
              router.UNSAFE_warning(false, "You should not include both `Component` and `element` on your route - `Component` will be used.");
            }
          }
          Object.assign(updates, {
            element: /* @__PURE__ */ React__namespace.createElement(route.Component),
            Component: void 0
          });
        }
        if (route.HydrateFallback) {
          {
            if (route.hydrateFallbackElement) {
              router.UNSAFE_warning(false, "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.");
            }
          }
          Object.assign(updates, {
            hydrateFallbackElement: /* @__PURE__ */ React__namespace.createElement(route.HydrateFallback),
            HydrateFallback: void 0
          });
        }
        if (route.ErrorBoundary) {
          {
            if (route.errorElement) {
              router.UNSAFE_warning(false, "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.");
            }
          }
          Object.assign(updates, {
            errorElement: /* @__PURE__ */ React__namespace.createElement(route.ErrorBoundary),
            ErrorBoundary: void 0
          });
        }
        return updates;
      }
      function createMemoryRouter(routes, opts) {
        return router.createRouter({
          basename: opts == null ? void 0 : opts.basename,
          future: _extends({}, opts == null ? void 0 : opts.future, {
            v7_prependBasename: true
          }),
          history: router.createMemoryHistory({
            initialEntries: opts == null ? void 0 : opts.initialEntries,
            initialIndex: opts == null ? void 0 : opts.initialIndex
          }),
          hydrationData: opts == null ? void 0 : opts.hydrationData,
          routes,
          mapRouteProperties,
          unstable_dataStrategy: opts == null ? void 0 : opts.unstable_dataStrategy
        }).initialize();
      }
      Object.defineProperty(exports2, "AbortedDeferredError", {
        enumerable: true,
        get: function() {
          return router.AbortedDeferredError;
        }
      });
      Object.defineProperty(exports2, "NavigationType", {
        enumerable: true,
        get: function() {
          return router.Action;
        }
      });
      Object.defineProperty(exports2, "createPath", {
        enumerable: true,
        get: function() {
          return router.createPath;
        }
      });
      Object.defineProperty(exports2, "defer", {
        enumerable: true,
        get: function() {
          return router.defer;
        }
      });
      Object.defineProperty(exports2, "generatePath", {
        enumerable: true,
        get: function() {
          return router.generatePath;
        }
      });
      Object.defineProperty(exports2, "isRouteErrorResponse", {
        enumerable: true,
        get: function() {
          return router.isRouteErrorResponse;
        }
      });
      Object.defineProperty(exports2, "json", {
        enumerable: true,
        get: function() {
          return router.json;
        }
      });
      Object.defineProperty(exports2, "matchPath", {
        enumerable: true,
        get: function() {
          return router.matchPath;
        }
      });
      Object.defineProperty(exports2, "matchRoutes", {
        enumerable: true,
        get: function() {
          return router.matchRoutes;
        }
      });
      Object.defineProperty(exports2, "parsePath", {
        enumerable: true,
        get: function() {
          return router.parsePath;
        }
      });
      Object.defineProperty(exports2, "redirect", {
        enumerable: true,
        get: function() {
          return router.redirect;
        }
      });
      Object.defineProperty(exports2, "redirectDocument", {
        enumerable: true,
        get: function() {
          return router.redirectDocument;
        }
      });
      Object.defineProperty(exports2, "resolvePath", {
        enumerable: true,
        get: function() {
          return router.resolvePath;
        }
      });
      exports2.Await = Await;
      exports2.MemoryRouter = MemoryRouter;
      exports2.Navigate = Navigate;
      exports2.Outlet = Outlet;
      exports2.Route = Route;
      exports2.Router = Router;
      exports2.RouterProvider = RouterProvider;
      exports2.Routes = Routes;
      exports2.UNSAFE_DataRouterContext = DataRouterContext;
      exports2.UNSAFE_DataRouterStateContext = DataRouterStateContext;
      exports2.UNSAFE_LocationContext = LocationContext;
      exports2.UNSAFE_NavigationContext = NavigationContext;
      exports2.UNSAFE_RouteContext = RouteContext;
      exports2.UNSAFE_mapRouteProperties = mapRouteProperties;
      exports2.UNSAFE_useRouteId = useRouteId;
      exports2.UNSAFE_useRoutesImpl = useRoutesImpl;
      exports2.createMemoryRouter = createMemoryRouter;
      exports2.createRoutesFromChildren = createRoutesFromChildren;
      exports2.createRoutesFromElements = createRoutesFromChildren;
      exports2.renderMatches = renderMatches;
      exports2.useActionData = useActionData;
      exports2.useAsyncError = useAsyncError;
      exports2.useAsyncValue = useAsyncValue;
      exports2.useBlocker = useBlocker;
      exports2.useHref = useHref;
      exports2.useInRouterContext = useInRouterContext;
      exports2.useLoaderData = useLoaderData;
      exports2.useLocation = useLocation;
      exports2.useMatch = useMatch;
      exports2.useMatches = useMatches;
      exports2.useNavigate = useNavigate;
      exports2.useNavigation = useNavigation;
      exports2.useNavigationType = useNavigationType;
      exports2.useOutlet = useOutlet;
      exports2.useOutletContext = useOutletContext;
      exports2.useParams = useParams;
      exports2.useResolvedPath = useResolvedPath;
      exports2.useRevalidator = useRevalidator;
      exports2.useRouteError = useRouteError;
      exports2.useRouteLoaderData = useRouteLoaderData;
      exports2.useRoutes = useRoutes;
      Object.defineProperty(exports2, "__esModule", { value: true });
    }));
  }
});

// node_modules/react-router/dist/main.js
var require_main = __commonJS({
  "node_modules/react-router/dist/main.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_router_development();
    }
  }
});

export {
  require_router_cjs,
  require_main
};
/*! Bundled license information:

@remix-run/router/dist/router.cjs.js:
  (**
   * @remix-run/router v1.16.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/umd/react-router.development.js:
react-router/dist/main.js:
  (**
   * React Router v6.23.1
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=chunk-A2EGYITP.js.map
