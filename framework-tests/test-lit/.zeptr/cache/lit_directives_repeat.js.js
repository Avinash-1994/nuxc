import {
  e,
  i,
  t
} from "./chunks/chunk-YICWH6OQ.js";
import {
  E,
  j
} from "./chunks/chunk-XUILDXAE.js";

// node_modules/lit-html/directive-helpers.js
var { I: t2 } = j;
var i2 = (o) => o;
var s = () => document.createComment("");
var v = (o, n, e2) => {
  const l = o._$AA.parentNode, d = void 0 === n ? o._$AB : n._$AA;
  if (void 0 === e2) {
    const i3 = l.insertBefore(s(), d), n2 = l.insertBefore(s(), d);
    e2 = new t2(i3, n2, o, o.options);
  } else {
    const t3 = e2._$AB.nextSibling, n2 = e2._$AM, c2 = n2 !== o;
    if (c2) {
      let t4;
      e2._$AQ?.(o), e2._$AM = o, void 0 !== e2._$AP && (t4 = o._$AU) !== n2._$AU && e2._$AP(t4);
    }
    if (t3 !== d || c2) {
      let o2 = e2._$AA;
      for (; o2 !== t3; ) {
        const t4 = i2(o2).nextSibling;
        i2(l).insertBefore(o2, d), o2 = t4;
      }
    }
  }
  return e2;
};
var u = (o, t3, i3 = o) => (o._$AI(t3, i3), o);
var m = {};
var p = (o, t3 = m) => o._$AH = t3;
var M = (o) => o._$AH;
var h = (o) => {
  o._$AR(), o._$AA.remove();
};

// node_modules/lit-html/directives/repeat.js
var u2 = (e2, s2, t3) => {
  const r = /* @__PURE__ */ new Map();
  for (let l = s2; l <= t3; l++) r.set(e2[l], l);
  return r;
};
var c = e(class extends i {
  constructor(e2) {
    if (super(e2), e2.type !== t.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e2, s2, t3) {
    let r;
    void 0 === t3 ? t3 = s2 : void 0 !== s2 && (r = s2);
    const l = [], o = [];
    let i3 = 0;
    for (const s3 of e2) l[i3] = r ? r(s3, i3) : i3, o[i3] = t3(s3, i3), i3++;
    return { values: o, keys: l };
  }
  render(e2, s2, t3) {
    return this.dt(e2, s2, t3).values;
  }
  update(s2, [t3, r, c2]) {
    const d = M(s2), { values: p2, keys: a } = this.dt(t3, r, c2);
    if (!Array.isArray(d)) return this.ut = a, p2;
    const h2 = this.ut ?? (this.ut = []), v2 = [];
    let m2, y, x = 0, j2 = d.length - 1, k = 0, w = p2.length - 1;
    for (; x <= j2 && k <= w; ) if (null === d[x]) x++;
    else if (null === d[j2]) j2--;
    else if (h2[x] === a[k]) v2[k] = u(d[x], p2[k]), x++, k++;
    else if (h2[j2] === a[w]) v2[w] = u(d[j2], p2[w]), j2--, w--;
    else if (h2[x] === a[w]) v2[w] = u(d[x], p2[w]), v(s2, v2[w + 1], d[x]), x++, w--;
    else if (h2[j2] === a[k]) v2[k] = u(d[j2], p2[k]), v(s2, d[x], d[j2]), j2--, k++;
    else if (void 0 === m2 && (m2 = u2(a, k, w), y = u2(h2, x, j2)), m2.has(h2[x])) if (m2.has(h2[j2])) {
      const e2 = y.get(a[k]), t4 = void 0 !== e2 ? d[e2] : null;
      if (null === t4) {
        const e3 = v(s2, d[x]);
        u(e3, p2[k]), v2[k] = e3;
      } else v2[k] = u(t4, p2[k]), v(s2, d[x], t4), d[e2] = null;
      k++;
    } else h(d[j2]), j2--;
    else h(d[x]), x++;
    for (; k <= w; ) {
      const e2 = v(s2, v2[w + 1]);
      u(e2, p2[k]), v2[k++] = e2;
    }
    for (; x <= j2; ) {
      const e2 = d[x++];
      null !== e2 && h(e2);
    }
    return this.ut = a, p(s2, v2), E;
  }
});
export {
  c as repeat
};
/*! Bundled license information:

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=lit_directives_repeat.js.js.map
