(function () { const e = document.createElement("link").relList; if (e && e.supports && e.supports("modulepreload")) return; for (const s of document.querySelectorAll('link[rel="modulepreload"]')) n(s); new MutationObserver(s => { for (const r of s) if (r.type === "childList") for (const o of r.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && n(o) }).observe(document, { childList: !0, subtree: !0 }); function t(s) { const r = {}; return s.integrity && (r.integrity = s.integrity), s.referrerPolicy && (r.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? r.credentials = "include" : s.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r } function n(s) { if (s.ep) return; s.ep = !0; const r = t(s); fetch(s.href, r) } })();/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ec(i, e) { const t = new Set(i.split(",")); return n => t.has(n) } const rt = {}, Rs = [], rn = () => { }, Rp = () => !1, ea = i => i.charCodeAt(0) === 111 && i.charCodeAt(1) === 110 && (i.charCodeAt(2) > 122 || i.charCodeAt(2) < 97), tc = i => i.startsWith("onUpdate:"), gt = Object.assign, nc = (i, e) => { const t = i.indexOf(e); t > -1 && i.splice(t, 1) }, Cp = Object.prototype.hasOwnProperty, $e = (i, e) => Cp.call(i, e), Ie = Array.isArray, Cs = i => ta(i) === "[object Map]", Lf = i => ta(i) === "[object Set]", He = i => typeof i == "function", _t = i => typeof i == "string", Ys = i => typeof i == "symbol", ut = i => i !== null && typeof i == "object", If = i => (ut(i) || He(i)) && He(i.then) && He(i.catch), Df = Object.prototype.toString, ta = i => Df.call(i), Pp = i => ta(i).slice(8, -1), Nf = i => ta(i) === "[object Object]", ic = i => _t(i) && i !== "NaN" && i[0] !== "-" && "" + parseInt(i, 10) === i, _r = ec(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), na = i => { const e = Object.create(null); return t => e[t] || (e[t] = i(t)) }, Lp = /-(\w)/g, Os = na(i => i.replace(Lp, (e, t) => t ? t.toUpperCase() : "")), Ip = /\B([A-Z])/g, qs = na(i => i.replace(Ip, "-$1").toLowerCase()), Uf = na(i => i.charAt(0).toUpperCase() + i.slice(1)), ba = na(i => i ? `on${Uf(i)}` : ""), Ti = (i, e) => !Object.is(i, e), Aa = (i, e) => { for (let t = 0; t < i.length; t++)i[t](e) }, Ho = (i, e, t) => { Object.defineProperty(i, e, { configurable: !0, enumerable: !1, value: t }) }, Dp = i => { const e = parseFloat(i); return isNaN(e) ? i : e }, Np = i => { const e = _t(i) ? Number(i) : NaN; return isNaN(e) ? i : e }; let jc; const Of = () => jc || (jc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}); function sc(i) { if (Ie(i)) { const e = {}; for (let t = 0; t < i.length; t++) { const n = i[t], s = _t(n) ? Bp(n) : sc(n); if (s) for (const r in s) e[r] = s[r] } return e } else if (_t(i) || ut(i)) return i } const Up = /;(?![^(]*\))/g, Op = /:([^]+)/, Fp = /\/\*[^]*?\*\//g; function Bp(i) { const e = {}; return i.replace(Fp, "").split(Up).forEach(t => { if (t) { const n = t.split(Op); n.length > 1 && (e[n[0].trim()] = n[1].trim()) } }), e } function rc(i) { let e = ""; if (_t(i)) e = i; else if (Ie(i)) for (let t = 0; t < i.length; t++) { const n = rc(i[t]); n && (e += n + " ") } else if (ut(i)) for (const t in i) i[t] && (e += t + " "); return e.trim() } const kp = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Hp = ec(kp); function Ff(i) { return !!i || i === "" } const zo = i => _t(i) ? i : i == null ? "" : Ie(i) || ut(i) && (i.toString === Df || !He(i.toString)) ? JSON.stringify(i, Bf, 2) : String(i), Bf = (i, e) => e && e.__v_isRef ? Bf(i, e.value) : Cs(e) ? { [`Map(${e.size})`]: [...e.entries()].reduce((t, [n, s], r) => (t[wa(n, r) + " =>"] = s, t), {}) } : Lf(e) ? { [`Set(${e.size})`]: [...e.values()].map(t => wa(t)) } : Ys(e) ? wa(e) : ut(e) && !Ie(e) && !Nf(e) ? String(e) : e, wa = (i, e = "") => { var t; return Ys(i) ? `Symbol(${(t = i.description) != null ? t : e})` : i };/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let hn; class zp { constructor(e = !1) { this.detached = e, this._active = !0, this.effects = [], this.cleanups = [], this.parent = hn, !e && hn && (this.index = (hn.scopes || (hn.scopes = [])).push(this) - 1) } get active() { return this._active } run(e) { if (this._active) { const t = hn; try { return hn = this, e() } finally { hn = t } } } on() { hn = this } off() { hn = this.parent } stop(e) { if (this._active) { let t, n; for (t = 0, n = this.effects.length; t < n; t++)this.effects[t].stop(); for (t = 0, n = this.cleanups.length; t < n; t++)this.cleanups[t](); if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++)this.scopes[t].stop(!0); if (!this.detached && this.parent && !e) { const s = this.parent.scopes.pop(); s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index) } this.parent = void 0, this._active = !1 } } } function Vp(i, e = hn) { e && e.active && e.effects.push(i) } function Gp() { return hn } let qi; class oc { constructor(e, t, n, s) { this.fn = e, this.trigger = t, this.scheduler = n, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Vp(this, s) } get dirty() { if (this._dirtyLevel === 2 || this._dirtyLevel === 3) { this._dirtyLevel = 1, Zi(); for (let e = 0; e < this._depsLength; e++) { const t = this.deps[e]; if (t.computed && (Wp(t.computed), this._dirtyLevel >= 4)) break } this._dirtyLevel === 1 && (this._dirtyLevel = 0), Ji() } return this._dirtyLevel >= 4 } set dirty(e) { this._dirtyLevel = e ? 4 : 0 } run() { if (this._dirtyLevel = 0, !this.active) return this.fn(); let e = vi, t = qi; try { return vi = !0, qi = this, this._runnings++, Yc(this), this.fn() } finally { qc(this), this._runnings--, qi = t, vi = e } } stop() { var e; this.active && (Yc(this), qc(this), (e = this.onStop) == null || e.call(this), this.active = !1) } } function Wp(i) { return i.value } function Yc(i) { i._trackId++, i._depsLength = 0 } function qc(i) { if (i.deps.length > i._depsLength) { for (let e = i._depsLength; e < i.deps.length; e++)kf(i.deps[e], i); i.deps.length = i._depsLength } } function kf(i, e) { const t = i.get(e); t !== void 0 && e._trackId !== t && (i.delete(e), i.size === 0 && i.cleanup()) } let vi = !0, Tl = 0; const Hf = []; function Zi() { Hf.push(vi), vi = !1 } function Ji() { const i = Hf.pop(); vi = i === void 0 ? !0 : i } function ac() { Tl++ } function lc() { for (Tl--; !Tl && bl.length;)bl.shift()() } function zf(i, e, t) { if (e.get(i) !== i._trackId) { e.set(i, i._trackId); const n = i.deps[i._depsLength]; n !== e ? (n && kf(n, i), i.deps[i._depsLength++] = e) : i._depsLength++ } } const bl = []; function Vf(i, e, t) { ac(); for (const n of i.keys()) { let s; n._dirtyLevel < e && (s ?? (s = i.get(n) === n._trackId)) && (n._shouldSchedule || (n._shouldSchedule = n._dirtyLevel === 0), n._dirtyLevel = e), n._shouldSchedule && (s ?? (s = i.get(n) === n._trackId)) && (n.trigger(), (!n._runnings || n.allowRecurse) && n._dirtyLevel !== 2 && (n._shouldSchedule = !1, n.scheduler && bl.push(n.scheduler))) } lc() } const Gf = (i, e) => { const t = new Map; return t.cleanup = i, t.computed = e, t }, Al = new WeakMap, Ki = Symbol(""), wl = Symbol(""); function jt(i, e, t) { if (vi && qi) { let n = Al.get(i); n || Al.set(i, n = new Map); let s = n.get(t); s || n.set(t, s = Gf(() => n.delete(t))), zf(qi, s) } } function jn(i, e, t, n, s, r) { const o = Al.get(i); if (!o) return; let a = []; if (e === "clear") a = [...o.values()]; else if (t === "length" && Ie(i)) { const l = Number(n); o.forEach((c, u) => { (u === "length" || !Ys(u) && u >= l) && a.push(c) }) } else switch (t !== void 0 && a.push(o.get(t)), e) { case "add": Ie(i) ? ic(t) && a.push(o.get("length")) : (a.push(o.get(Ki)), Cs(i) && a.push(o.get(wl))); break; case "delete": Ie(i) || (a.push(o.get(Ki)), Cs(i) && a.push(o.get(wl))); break; case "set": Cs(i) && a.push(o.get(Ki)); break }ac(); for (const l of a) l && Vf(l, 4); lc() } const Xp = ec("__proto__,__v_isRef,__isVue"), Wf = new Set(Object.getOwnPropertyNames(Symbol).filter(i => i !== "arguments" && i !== "caller").map(i => Symbol[i]).filter(Ys)), Kc = jp(); function jp() { const i = {}; return ["includes", "indexOf", "lastIndexOf"].forEach(e => { i[e] = function (...t) { const n = Ze(this); for (let r = 0, o = this.length; r < o; r++)jt(n, "get", r + ""); const s = n[e](...t); return s === -1 || s === !1 ? n[e](...t.map(Ze)) : s } }), ["push", "pop", "shift", "unshift", "splice"].forEach(e => { i[e] = function (...t) { Zi(), ac(); const n = Ze(this)[e].apply(this, t); return lc(), Ji(), n } }), i } function Yp(i) { const e = Ze(this); return jt(e, "has", i), e.hasOwnProperty(i) } class Xf { constructor(e = !1, t = !1) { this._isReadonly = e, this._isShallow = t } get(e, t, n) { const s = this._isReadonly, r = this._isShallow; if (t === "__v_isReactive") return !s; if (t === "__v_isReadonly") return s; if (t === "__v_isShallow") return r; if (t === "__v_raw") return n === (s ? r ? om : Kf : r ? qf : Yf).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0; const o = Ie(e); if (!s) { if (o && $e(Kc, t)) return Reflect.get(Kc, t, n); if (t === "hasOwnProperty") return Yp } const a = Reflect.get(e, t, n); return (Ys(t) ? Wf.has(t) : Xp(t)) || (s || jt(e, "get", t), r) ? a : Yt(a) ? o && ic(t) ? a : a.value : ut(a) ? s ? $f(a) : hc(a) : a } } class jf extends Xf { constructor(e = !1) { super(!1, e) } set(e, t, n, s) { let r = e[t]; if (!this._isShallow) { const l = Fs(r); if (!Vo(n) && !Fs(n) && (r = Ze(r), n = Ze(n)), !Ie(e) && Yt(r) && !Yt(n)) return l ? !1 : (r.value = n, !0) } const o = Ie(e) && ic(t) ? Number(t) < e.length : $e(e, t), a = Reflect.set(e, t, n, s); return e === Ze(s) && (o ? Ti(n, r) && jn(e, "set", t, n) : jn(e, "add", t, n)), a } deleteProperty(e, t) { const n = $e(e, t); e[t]; const s = Reflect.deleteProperty(e, t); return s && n && jn(e, "delete", t, void 0), s } has(e, t) { const n = Reflect.has(e, t); return (!Ys(t) || !Wf.has(t)) && jt(e, "has", t), n } ownKeys(e) { return jt(e, "iterate", Ie(e) ? "length" : Ki), Reflect.ownKeys(e) } } class qp extends Xf { constructor(e = !1) { super(!0, e) } set(e, t) { return !0 } deleteProperty(e, t) { return !0 } } const Kp = new jf, $p = new qp, Zp = new jf(!0), cc = i => i, ia = i => Reflect.getPrototypeOf(i); function Gr(i, e, t = !1, n = !1) { i = i.__v_raw; const s = Ze(i), r = Ze(e); t || (Ti(e, r) && jt(s, "get", e), jt(s, "get", r)); const { has: o } = ia(s), a = n ? cc : t ? dc : Tr; if (o.call(s, e)) return a(i.get(e)); if (o.call(s, r)) return a(i.get(r)); i !== s && i.get(e) } function Wr(i, e = !1) { const t = this.__v_raw, n = Ze(t), s = Ze(i); return e || (Ti(i, s) && jt(n, "has", i), jt(n, "has", s)), i === s ? t.has(i) : t.has(i) || t.has(s) } function Xr(i, e = !1) { return i = i.__v_raw, !e && jt(Ze(i), "iterate", Ki), Reflect.get(i, "size", i) } function $c(i) { i = Ze(i); const e = Ze(this); return ia(e).has.call(e, i) || (e.add(i), jn(e, "add", i, i)), this } function Zc(i, e) { e = Ze(e); const t = Ze(this), { has: n, get: s } = ia(t); let r = n.call(t, i); r || (i = Ze(i), r = n.call(t, i)); const o = s.call(t, i); return t.set(i, e), r ? Ti(e, o) && jn(t, "set", i, e) : jn(t, "add", i, e), this } function Jc(i) { const e = Ze(this), { has: t, get: n } = ia(e); let s = t.call(e, i); s || (i = Ze(i), s = t.call(e, i)), n && n.call(e, i); const r = e.delete(i); return s && jn(e, "delete", i, void 0), r } function Qc() { const i = Ze(this), e = i.size !== 0, t = i.clear(); return e && jn(i, "clear", void 0, void 0), t } function jr(i, e) { return function (n, s) { const r = this, o = r.__v_raw, a = Ze(o), l = e ? cc : i ? dc : Tr; return !i && jt(a, "iterate", Ki), o.forEach((c, u) => n.call(s, l(c), l(u), r)) } } function Yr(i, e, t) { return function (...n) { const s = this.__v_raw, r = Ze(s), o = Cs(r), a = i === "entries" || i === Symbol.iterator && o, l = i === "keys" && o, c = s[i](...n), u = t ? cc : e ? dc : Tr; return !e && jt(r, "iterate", l ? wl : Ki), { next() { const { value: h, done: f } = c.next(); return f ? { value: h, done: f } : { value: a ? [u(h[0]), u(h[1])] : u(h), done: f } }, [Symbol.iterator]() { return this } } } } function Qn(i) { return function (...e) { return i === "delete" ? !1 : i === "clear" ? void 0 : this } } function Jp() { const i = { get(r) { return Gr(this, r) }, get size() { return Xr(this) }, has: Wr, add: $c, set: Zc, delete: Jc, clear: Qc, forEach: jr(!1, !1) }, e = { get(r) { return Gr(this, r, !1, !0) }, get size() { return Xr(this) }, has: Wr, add: $c, set: Zc, delete: Jc, clear: Qc, forEach: jr(!1, !0) }, t = { get(r) { return Gr(this, r, !0) }, get size() { return Xr(this, !0) }, has(r) { return Wr.call(this, r, !0) }, add: Qn("add"), set: Qn("set"), delete: Qn("delete"), clear: Qn("clear"), forEach: jr(!0, !1) }, n = { get(r) { return Gr(this, r, !0, !0) }, get size() { return Xr(this, !0) }, has(r) { return Wr.call(this, r, !0) }, add: Qn("add"), set: Qn("set"), delete: Qn("delete"), clear: Qn("clear"), forEach: jr(!0, !0) }; return ["keys", "values", "entries", Symbol.iterator].forEach(r => { i[r] = Yr(r, !1, !1), t[r] = Yr(r, !0, !1), e[r] = Yr(r, !1, !0), n[r] = Yr(r, !0, !0) }), [i, t, e, n] } const [Qp, em, tm, nm] = Jp(); function uc(i, e) { const t = e ? i ? nm : tm : i ? em : Qp; return (n, s, r) => s === "__v_isReactive" ? !i : s === "__v_isReadonly" ? i : s === "__v_raw" ? n : Reflect.get($e(t, s) && s in n ? t : n, s, r) } const im = { get: uc(!1, !1) }, sm = { get: uc(!1, !0) }, rm = { get: uc(!0, !1) }, Yf = new WeakMap, qf = new WeakMap, Kf = new WeakMap, om = new WeakMap; function am(i) { switch (i) { case "Object": case "Array": return 1; case "Map": case "Set": case "WeakMap": case "WeakSet": return 2; default: return 0 } } function lm(i) { return i.__v_skip || !Object.isExtensible(i) ? 0 : am(Pp(i)) } function hc(i) { return Fs(i) ? i : fc(i, !1, Kp, im, Yf) } function cm(i) { return fc(i, !1, Zp, sm, qf) } function $f(i) { return fc(i, !0, $p, rm, Kf) } function fc(i, e, t, n, s) { if (!ut(i) || i.__v_raw && !(e && i.__v_isReactive)) return i; const r = s.get(i); if (r) return r; const o = lm(i); if (o === 0) return i; const a = new Proxy(i, o === 2 ? n : t); return s.set(i, a), a } function Ps(i) { return Fs(i) ? Ps(i.__v_raw) : !!(i && i.__v_isReactive) } function Fs(i) { return !!(i && i.__v_isReadonly) } function Vo(i) { return !!(i && i.__v_isShallow) } function Zf(i) { return Ps(i) || Fs(i) } function Ze(i) { const e = i && i.__v_raw; return e ? Ze(e) : i } function Jf(i) { return Object.isExtensible(i) && Ho(i, "__v_skip", !0), i } const Tr = i => ut(i) ? hc(i) : i, dc = i => ut(i) ? $f(i) : i; class Qf { constructor(e, t, n, s) { this.getter = e, this._setter = t, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new oc(() => e(this._value), () => Io(this, this.effect._dirtyLevel === 2 ? 2 : 3)), this.effect.computed = this, this.effect.active = this._cacheable = !s, this.__v_isReadonly = n } get value() { const e = Ze(this); return (!e._cacheable || e.effect.dirty) && Ti(e._value, e._value = e.effect.run()) && Io(e, 4), ed(e), e.effect._dirtyLevel >= 2 && Io(e, 2), e._value } set value(e) { this._setter(e) } get _dirty() { return this.effect.dirty } set _dirty(e) { this.effect.dirty = e } } function um(i, e, t = !1) { let n, s; const r = He(i); return r ? (n = i, s = rn) : (n = i.get, s = i.set), new Qf(n, s, r || !s, t) } function ed(i) { var e; vi && qi && (i = Ze(i), zf(qi, (e = i.dep) != null ? e : i.dep = Gf(() => i.dep = void 0, i instanceof Qf ? i : void 0))) } function Io(i, e = 4, t) { i = Ze(i); const n = i.dep; n && Vf(n, e) } function Yt(i) { return !!(i && i.__v_isRef === !0) } function br(i) { return hm(i, !1) } function hm(i, e) { return Yt(i) ? i : new fm(i, e) } class fm { constructor(e, t) { this.__v_isShallow = t, this.dep = void 0, this.__v_isRef = !0, this._rawValue = t ? e : Ze(e), this._value = t ? e : Tr(e) } get value() { return ed(this), this._value } set value(e) { const t = this.__v_isShallow || Vo(e) || Fs(e); e = t ? e : Ze(e), Ti(e, this._rawValue) && (this._rawValue = e, this._value = t ? e : Tr(e), Io(this, 4)) } } function Go(i) { return Yt(i) ? i.value : i } const dm = { get: (i, e, t) => Go(Reflect.get(i, e, t)), set: (i, e, t, n) => { const s = i[e]; return Yt(s) && !Yt(t) ? (s.value = t, !0) : Reflect.set(i, e, t, n) } }; function td(i) { return Ps(i) ? i : new Proxy(i, dm) }/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Mi(i, e, t, n) { try { return n ? i(...n) : i() } catch (s) { sa(s, e, t) } } function on(i, e, t, n) { if (He(i)) { const r = Mi(i, e, t, n); return r && If(r) && r.catch(o => { sa(o, e, t) }), r } const s = []; for (let r = 0; r < i.length; r++)s.push(on(i[r], e, t, n)); return s } function sa(i, e, t, n = !0) { const s = e ? e.vnode : null; if (e) { let r = e.parent; const o = e.proxy, a = `https://vuejs.org/error-reference/#runtime-${t}`; for (; r;) { const c = r.ec; if (c) { for (let u = 0; u < c.length; u++)if (c[u](i, o, a) === !1) return } r = r.parent } const l = e.appContext.config.errorHandler; if (l) { Mi(l, null, 10, [i, o, a]); return } } pm(i, t, s, n) } function pm(i, e, t, n = !0) { console.error(i) } let Ar = !1, Rl = !1; const Nt = []; let Tn = 0; const Ls = []; let ci = null, Vi = 0; const nd = Promise.resolve(); let pc = null; function mm(i) { const e = pc || nd; return i ? e.then(this ? i.bind(this) : i) : e } function gm(i) { let e = Tn + 1, t = Nt.length; for (; e < t;) { const n = e + t >>> 1, s = Nt[n], r = wr(s); r < i || r === i && s.pre ? e = n + 1 : t = n } return e } function mc(i) { (!Nt.length || !Nt.includes(i, Ar && i.allowRecurse ? Tn + 1 : Tn)) && (i.id == null ? Nt.push(i) : Nt.splice(gm(i.id), 0, i), id()) } function id() { !Ar && !Rl && (Rl = !0, pc = nd.then(rd)) } function _m(i) { const e = Nt.indexOf(i); e > Tn && Nt.splice(e, 1) } function xm(i) { Ie(i) ? Ls.push(...i) : (!ci || !ci.includes(i, i.allowRecurse ? Vi + 1 : Vi)) && Ls.push(i), id() } function eu(i, e, t = Ar ? Tn + 1 : 0) { for (; t < Nt.length; t++) { const n = Nt[t]; if (n && n.pre) { if (i && n.id !== i.uid) continue; Nt.splice(t, 1), t--, n() } } } function sd(i) { if (Ls.length) { const e = [...new Set(Ls)].sort((t, n) => wr(t) - wr(n)); if (Ls.length = 0, ci) { ci.push(...e); return } for (ci = e, Vi = 0; Vi < ci.length; Vi++)ci[Vi](); ci = null, Vi = 0 } } const wr = i => i.id == null ? 1 / 0 : i.id, vm = (i, e) => { const t = wr(i) - wr(e); if (t === 0) { if (i.pre && !e.pre) return -1; if (e.pre && !i.pre) return 1 } return t }; function rd(i) { Rl = !1, Ar = !0, Nt.sort(vm); try { for (Tn = 0; Tn < Nt.length; Tn++) { const e = Nt[Tn]; e && e.active !== !1 && Mi(e, null, 14) } } finally { Tn = 0, Nt.length = 0, sd(), Ar = !1, pc = null, (Nt.length || Ls.length) && rd() } } function Mm(i, e, ...t) { if (i.isUnmounted) return; const n = i.vnode.props || rt; let s = t; const r = e.startsWith("update:"), o = r && e.slice(7); if (o && o in n) { const u = `${o === "modelValue" ? "model" : o}Modifiers`, { number: h, trim: f } = n[u] || rt; f && (s = t.map(d => _t(d) ? d.trim() : d)), h && (s = t.map(Dp)) } let a, l = n[a = ba(e)] || n[a = ba(Os(e))]; !l && r && (l = n[a = ba(qs(e))]), l && on(l, i, 6, s); const c = n[a + "Once"]; if (c) { if (!i.emitted) i.emitted = {}; else if (i.emitted[a]) return; i.emitted[a] = !0, on(c, i, 6, s) } } function od(i, e, t = !1) { const n = e.emitsCache, s = n.get(i); if (s !== void 0) return s; const r = i.emits; let o = {}, a = !1; if (!He(i)) { const l = c => { const u = od(c, e, !0); u && (a = !0, gt(o, u)) }; !t && e.mixins.length && e.mixins.forEach(l), i.extends && l(i.extends), i.mixins && i.mixins.forEach(l) } return !r && !a ? (ut(i) && n.set(i, null), null) : (Ie(r) ? r.forEach(l => o[l] = null) : gt(o, r), ut(i) && n.set(i, o), o) } function ra(i, e) { return !i || !ea(e) ? !1 : (e = e.slice(2).replace(/Once$/, ""), $e(i, e[0].toLowerCase() + e.slice(1)) || $e(i, qs(e)) || $e(i, e)) } let zt = null, oa = null; function Wo(i) { const e = zt; return zt = i, oa = i && i.type.__scopeId || null, e } function ym(i) { oa = i } function Sm() { oa = null } function _i(i, e = zt, t) { if (!e || i._n) return i; const n = (...s) => { n._d && hu(-1); const r = Wo(e); let o; try { o = i(...s) } finally { Wo(r), n._d && hu(1) } return o }; return n._n = !0, n._c = !0, n._d = !0, n } function Ra(i) { const { type: e, vnode: t, proxy: n, withProxy: s, props: r, propsOptions: [o], slots: a, attrs: l, emit: c, render: u, renderCache: h, data: f, setupState: d, ctx: _, inheritAttrs: v } = i; let p, m; const b = Wo(i); try { if (t.shapeFlag & 4) { const A = s || n, O = A; p = Sn(u.call(O, A, h, r, d, f, _)), m = l } else { const A = e; p = Sn(A.length > 1 ? A(r, { attrs: l, slots: a, emit: c }) : A(r, null)), m = e.props ? l : Em(l) } } catch (A) { Mr.length = 0, sa(A, i, 1), p = nt(xn) } let y = p; if (m && v !== !1) { const A = Object.keys(m), { shapeFlag: O } = y; A.length && O & 7 && (o && A.some(tc) && (m = Tm(m, o)), y = bi(y, m)) } return t.dirs && (y = bi(y), y.dirs = y.dirs ? y.dirs.concat(t.dirs) : t.dirs), t.transition && (y.transition = t.transition), p = y, Wo(b), p } const Em = i => { let e; for (const t in i) (t === "class" || t === "style" || ea(t)) && ((e || (e = {}))[t] = i[t]); return e }, Tm = (i, e) => { const t = {}; for (const n in i) (!tc(n) || !(n.slice(9) in e)) && (t[n] = i[n]); return t }; function bm(i, e, t) { const { props: n, children: s, component: r } = i, { props: o, children: a, patchFlag: l } = e, c = r.emitsOptions; if (e.dirs || e.transition) return !0; if (t && l >= 0) { if (l & 1024) return !0; if (l & 16) return n ? tu(n, o, c) : !!o; if (l & 8) { const u = e.dynamicProps; for (let h = 0; h < u.length; h++) { const f = u[h]; if (o[f] !== n[f] && !ra(c, f)) return !0 } } } else return (s || a) && (!a || !a.$stable) ? !0 : n === o ? !1 : n ? o ? tu(n, o, c) : !0 : !!o; return !1 } function tu(i, e, t) { const n = Object.keys(e); if (n.length !== Object.keys(i).length) return !0; for (let s = 0; s < n.length; s++) { const r = n[s]; if (e[r] !== i[r] && !ra(t, r)) return !0 } return !1 } function Am({ vnode: i, parent: e }, t) { for (; e;) { const n = e.subTree; if (n.suspense && n.suspense.activeBranch === i && (n.el = i.el), n === i) (i = e.vnode).el = t, e = e.parent; else break } } const wm = Symbol.for("v-ndc"), Rm = i => i.__isSuspense; function Cm(i, e) { e && e.pendingBranch ? Ie(i) ? e.effects.push(...i) : e.effects.push(i) : xm(i) } const Pm = Symbol.for("v-scx"), Lm = () => yi(Pm), qr = {}; function Ca(i, e, t) { return ad(i, e, t) } function ad(i, e, { immediate: t, deep: n, flush: s, once: r, onTrack: o, onTrigger: a } = rt) { if (e && r) { const P = e; e = (...R) => { P(...R), O() } } const l = Ut, c = P => n === !0 ? P : Xi(P, n === !1 ? 1 : void 0); let u, h = !1, f = !1; if (Yt(i) ? (u = () => i.value, h = Vo(i)) : Ps(i) ? (u = () => c(i), h = !0) : Ie(i) ? (f = !0, h = i.some(P => Ps(P) || Vo(P)), u = () => i.map(P => { if (Yt(P)) return P.value; if (Ps(P)) return c(P); if (He(P)) return Mi(P, l, 2) })) : He(i) ? e ? u = () => Mi(i, l, 2) : u = () => (d && d(), on(i, l, 3, [_])) : u = rn, e && n) { const P = u; u = () => Xi(P()) } let d, _ = P => { d = y.onStop = () => { Mi(P, l, 4), d = y.onStop = void 0 } }, v; if (ha) if (_ = rn, e ? t && on(e, l, 3, [u(), f ? [] : void 0, _]) : u(), s === "sync") { const P = Lm(); v = P.__watcherHandles || (P.__watcherHandles = []) } else return rn; let p = f ? new Array(i.length).fill(qr) : qr; const m = () => { if (!(!y.active || !y.dirty)) if (e) { const P = y.run(); (n || h || (f ? P.some((R, L) => Ti(R, p[L])) : Ti(P, p))) && (d && d(), on(e, l, 3, [P, p === qr ? void 0 : f && p[0] === qr ? [] : p, _]), p = P) } else y.run() }; m.allowRecurse = !!e; let b; s === "sync" ? b = m : s === "post" ? b = () => Ht(m, l && l.suspense) : (m.pre = !0, l && (m.id = l.uid), b = () => mc(m)); const y = new oc(u, rn, b), A = Gp(), O = () => { y.stop(), A && nc(A.effects, y) }; return e ? t ? m() : p = y.run() : s === "post" ? Ht(y.run.bind(y), l && l.suspense) : y.run(), v && v.push(O), O } function Im(i, e, t) { const n = this.proxy, s = _t(i) ? i.includes(".") ? ld(n, i) : () => n[i] : i.bind(n, n); let r; He(e) ? r = e : (r = e.handler, t = e); const o = Fr(this), a = ad(s, r.bind(n), t); return o(), a } function ld(i, e) { const t = e.split("."); return () => { let n = i; for (let s = 0; s < t.length && n; s++)n = n[t[s]]; return n } } function Xi(i, e, t = 0, n) { if (!ut(i) || i.__v_skip) return i; if (e && e > 0) { if (t >= e) return i; t++ } if (n = n || new Set, n.has(i)) return i; if (n.add(i), Yt(i)) Xi(i.value, e, t, n); else if (Ie(i)) for (let s = 0; s < i.length; s++)Xi(i[s], e, t, n); else if (Lf(i) || Cs(i)) i.forEach(s => { Xi(s, e, t, n) }); else if (Nf(i)) for (const s in i) Xi(i[s], e, t, n); return i } function Rr(i, e) { if (zt === null) return i; const t = fa(zt) || zt.proxy, n = i.dirs || (i.dirs = []); for (let s = 0; s < e.length; s++) { let [r, o, a, l = rt] = e[s]; r && (He(r) && (r = { mounted: r, updated: r }), r.deep && Xi(o), n.push({ dir: r, instance: t, value: o, oldValue: void 0, arg: a, modifiers: l })) } return i } function Pi(i, e, t, n) { const s = i.dirs, r = e && e.dirs; for (let o = 0; o < s.length; o++) { const a = s[o]; r && (a.oldValue = r[o].value); let l = a.dir[n]; l && (Zi(), on(l, t, 8, [i.el, a, i, e]), Ji()) } } const ui = Symbol("_leaveCb"), Kr = Symbol("_enterCb"); function Dm() { const i = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map }; return Or(() => { i.isMounted = !0 }), gc(() => { i.isUnmounting = !0 }), i } const tn = [Function, Array], cd = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: tn, onEnter: tn, onAfterEnter: tn, onEnterCancelled: tn, onBeforeLeave: tn, onLeave: tn, onAfterLeave: tn, onLeaveCancelled: tn, onBeforeAppear: tn, onAppear: tn, onAfterAppear: tn, onAppearCancelled: tn }, Nm = { name: "BaseTransition", props: cd, setup(i, { slots: e }) { const t = yg(), n = Dm(); return () => { const s = e.default && hd(e.default(), !0); if (!s || !s.length) return; let r = s[0]; if (s.length > 1) { for (const f of s) if (f.type !== xn) { r = f; break } } const o = Ze(i), { mode: a } = o; if (n.isLeaving) return Pa(r); const l = nu(r); if (!l) return Pa(r); const c = Cl(l, o, n, t); Pl(l, c); const u = t.subTree, h = u && nu(u); if (h && h.type !== xn && !Gi(l, h)) { const f = Cl(h, o, n, t); if (Pl(h, f), a === "out-in") return n.isLeaving = !0, f.afterLeave = () => { n.isLeaving = !1, t.update.active !== !1 && (t.effect.dirty = !0, t.update()) }, Pa(r); a === "in-out" && l.type !== xn && (f.delayLeave = (d, _, v) => { const p = ud(n, h); p[String(h.key)] = h, d[ui] = () => { _(), d[ui] = void 0, delete c.delayedLeave }, c.delayedLeave = v }) } return r } } }, Um = Nm; function ud(i, e) { const { leavingVNodes: t } = i; let n = t.get(e.type); return n || (n = Object.create(null), t.set(e.type, n)), n } function Cl(i, e, t, n) { const { appear: s, mode: r, persisted: o = !1, onBeforeEnter: a, onEnter: l, onAfterEnter: c, onEnterCancelled: u, onBeforeLeave: h, onLeave: f, onAfterLeave: d, onLeaveCancelled: _, onBeforeAppear: v, onAppear: p, onAfterAppear: m, onAppearCancelled: b } = e, y = String(i.key), A = ud(t, i), O = (L, S) => { L && on(L, n, 9, S) }, P = (L, S) => { const M = S[1]; O(L, S), Ie(L) ? L.every(D => D.length <= 1) && M() : L.length <= 1 && M() }, R = { mode: r, persisted: o, beforeEnter(L) { let S = a; if (!t.isMounted) if (s) S = v || a; else return; L[ui] && L[ui](!0); const M = A[y]; M && Gi(i, M) && M.el[ui] && M.el[ui](), O(S, [L]) }, enter(L) { let S = l, M = c, D = u; if (!t.isMounted) if (s) S = p || l, M = m || c, D = b || u; else return; let I = !1; const C = L[Kr] = z => { I || (I = !0, z ? O(D, [L]) : O(M, [L]), R.delayedLeave && R.delayedLeave(), L[Kr] = void 0) }; S ? P(S, [L, C]) : C() }, leave(L, S) { const M = String(i.key); if (L[Kr] && L[Kr](!0), t.isUnmounting) return S(); O(h, [L]); let D = !1; const I = L[ui] = C => { D || (D = !0, S(), C ? O(_, [L]) : O(d, [L]), L[ui] = void 0, A[M] === i && delete A[M]) }; A[M] = i, f ? P(f, [L, I]) : I() }, clone(L) { return Cl(L, e, t, n) } }; return R } function Pa(i) { if (aa(i)) return i = bi(i), i.children = null, i } function nu(i) { return aa(i) ? i.children ? i.children[0] : void 0 : i } function Pl(i, e) { i.shapeFlag & 6 && i.component ? Pl(i.component.subTree, e) : i.shapeFlag & 128 ? (i.ssContent.transition = e.clone(i.ssContent), i.ssFallback.transition = e.clone(i.ssFallback)) : i.transition = e } function hd(i, e = !1, t) { let n = [], s = 0; for (let r = 0; r < i.length; r++) { let o = i[r]; const a = t == null ? o.key : String(t) + String(o.key != null ? o.key : r); o.type === fn ? (o.patchFlag & 128 && s++, n = n.concat(hd(o.children, e, a))) : (e || o.type !== xn) && n.push(a != null ? bi(o, { key: a }) : o) } if (s > 1) for (let r = 0; r < n.length; r++)n[r].patchFlag = -2; return n }/*! #__NO_SIDE_EFFECTS__ */function Om(i, e) { return He(i) ? gt({ name: i.name }, e, { setup: i }) : i } const Do = i => !!i.type.__asyncLoader, aa = i => i.type.__isKeepAlive; function Fm(i, e) { fd(i, "a", e) } function Bm(i, e) { fd(i, "da", e) } function fd(i, e, t = Ut) { const n = i.__wdc || (i.__wdc = () => { let s = t; for (; s;) { if (s.isDeactivated) return; s = s.parent } return i() }); if (la(e, n, t), t) { let s = t.parent; for (; s && s.parent;)aa(s.parent.vnode) && km(n, e, t, s), s = s.parent } } function km(i, e, t, n) { const s = la(e, i, n, !0); _c(() => { nc(n[e], s) }, t) } function la(i, e, t = Ut, n = !1) { if (t) { const s = t[i] || (t[i] = []), r = e.__weh || (e.__weh = (...o) => { if (t.isUnmounted) return; Zi(); const a = Fr(t), l = on(e, t, i, o); return a(), Ji(), l }); return n ? s.unshift(r) : s.push(r), r } } const qn = i => (e, t = Ut) => (!ha || i === "sp") && la(i, (...n) => e(...n), t), Hm = qn("bm"), Or = qn("m"), zm = qn("bu"), Vm = qn("u"), gc = qn("bum"), _c = qn("um"), Gm = qn("sp"), Wm = qn("rtg"), Xm = qn("rtc"); function jm(i, e = Ut) { la("ec", i, e) } const Ll = i => i ? bd(i) ? fa(i) || i.proxy : Ll(i.parent) : null, xr = gt(Object.create(null), { $: i => i, $el: i => i.vnode.el, $data: i => i.data, $props: i => i.props, $attrs: i => i.attrs, $slots: i => i.slots, $refs: i => i.refs, $parent: i => Ll(i.parent), $root: i => Ll(i.root), $emit: i => i.emit, $options: i => xc(i), $forceUpdate: i => i.f || (i.f = () => { i.effect.dirty = !0, mc(i.update) }), $nextTick: i => i.n || (i.n = mm.bind(i.proxy)), $watch: i => Im.bind(i) }), La = (i, e) => i !== rt && !i.__isScriptSetup && $e(i, e), Ym = { get({ _: i }, e) { const { ctx: t, setupState: n, data: s, props: r, accessCache: o, type: a, appContext: l } = i; let c; if (e[0] !== "$") { const d = o[e]; if (d !== void 0) switch (d) { case 1: return n[e]; case 2: return s[e]; case 4: return t[e]; case 3: return r[e] } else { if (La(n, e)) return o[e] = 1, n[e]; if (s !== rt && $e(s, e)) return o[e] = 2, s[e]; if ((c = i.propsOptions[0]) && $e(c, e)) return o[e] = 3, r[e]; if (t !== rt && $e(t, e)) return o[e] = 4, t[e]; Il && (o[e] = 0) } } const u = xr[e]; let h, f; if (u) return e === "$attrs" && jt(i, "get", e), u(i); if ((h = a.__cssModules) && (h = h[e])) return h; if (t !== rt && $e(t, e)) return o[e] = 4, t[e]; if (f = l.config.globalProperties, $e(f, e)) return f[e] }, set({ _: i }, e, t) { const { data: n, setupState: s, ctx: r } = i; return La(s, e) ? (s[e] = t, !0) : n !== rt && $e(n, e) ? (n[e] = t, !0) : $e(i.props, e) || e[0] === "$" && e.slice(1) in i ? !1 : (r[e] = t, !0) }, has({ _: { data: i, setupState: e, accessCache: t, ctx: n, appContext: s, propsOptions: r } }, o) { let a; return !!t[o] || i !== rt && $e(i, o) || La(e, o) || (a = r[0]) && $e(a, o) || $e(n, o) || $e(xr, o) || $e(s.config.globalProperties, o) }, defineProperty(i, e, t) { return t.get != null ? i._.accessCache[e] = 0 : $e(t, "value") && this.set(i, e, t.value, null), Reflect.defineProperty(i, e, t) } }; function iu(i) { return Ie(i) ? i.reduce((e, t) => (e[t] = null, e), {}) : i } let Il = !0; function qm(i) { const e = xc(i), t = i.proxy, n = i.ctx; Il = !1, e.beforeCreate && su(e.beforeCreate, i, "bc"); const { data: s, computed: r, methods: o, watch: a, provide: l, inject: c, created: u, beforeMount: h, mounted: f, beforeUpdate: d, updated: _, activated: v, deactivated: p, beforeDestroy: m, beforeUnmount: b, destroyed: y, unmounted: A, render: O, renderTracked: P, renderTriggered: R, errorCaptured: L, serverPrefetch: S, expose: M, inheritAttrs: D, components: I, directives: C, filters: z } = e; if (c && Km(c, n, null), o) for (const ee in o) { const G = o[ee]; He(G) && (n[ee] = G.bind(t)) } if (s) { const ee = s.call(t, t); ut(ee) && (i.data = hc(ee)) } if (Il = !0, r) for (const ee in r) { const G = r[ee], ne = He(G) ? G.bind(t, t) : He(G.get) ? G.get.bind(t, t) : rn, oe = !He(G) && He(G.set) ? G.set.bind(t) : rn, pe = yc({ get: ne, set: oe }); Object.defineProperty(n, ee, { enumerable: !0, configurable: !0, get: () => pe.value, set: ye => pe.value = ye }) } if (a) for (const ee in a) dd(a[ee], n, t, ee); if (l) { const ee = He(l) ? l.call(t) : l; Reflect.ownKeys(ee).forEach(G => { md(G, ee[G]) }) } u && su(u, i, "c"); function X(ee, G) { Ie(G) ? G.forEach(ne => ee(ne.bind(t))) : G && ee(G.bind(t)) } if (X(Hm, h), X(Or, f), X(zm, d), X(Vm, _), X(Fm, v), X(Bm, p), X(jm, L), X(Xm, P), X(Wm, R), X(gc, b), X(_c, A), X(Gm, S), Ie(M)) if (M.length) { const ee = i.exposed || (i.exposed = {}); M.forEach(G => { Object.defineProperty(ee, G, { get: () => t[G], set: ne => t[G] = ne }) }) } else i.exposed || (i.exposed = {}); O && i.render === rn && (i.render = O), D != null && (i.inheritAttrs = D), I && (i.components = I), C && (i.directives = C) } function Km(i, e, t = rn) { Ie(i) && (i = Dl(i)); for (const n in i) { const s = i[n]; let r; ut(s) ? "default" in s ? r = yi(s.from || n, s.default, !0) : r = yi(s.from || n) : r = yi(s), Yt(r) ? Object.defineProperty(e, n, { enumerable: !0, configurable: !0, get: () => r.value, set: o => r.value = o }) : e[n] = r } } function su(i, e, t) { on(Ie(i) ? i.map(n => n.bind(e.proxy)) : i.bind(e.proxy), e, t) } function dd(i, e, t, n) { const s = n.includes(".") ? ld(t, n) : () => t[n]; if (_t(i)) { const r = e[i]; He(r) && Ca(s, r) } else if (He(i)) Ca(s, i.bind(t)); else if (ut(i)) if (Ie(i)) i.forEach(r => dd(r, e, t, n)); else { const r = He(i.handler) ? i.handler.bind(t) : e[i.handler]; He(r) && Ca(s, r, i) } } function xc(i) { const e = i.type, { mixins: t, extends: n } = e, { mixins: s, optionsCache: r, config: { optionMergeStrategies: o } } = i.appContext, a = r.get(e); let l; return a ? l = a : !s.length && !t && !n ? l = e : (l = {}, s.length && s.forEach(c => Xo(l, c, o, !0)), Xo(l, e, o)), ut(e) && r.set(e, l), l } function Xo(i, e, t, n = !1) { const { mixins: s, extends: r } = e; r && Xo(i, r, t, !0), s && s.forEach(o => Xo(i, o, t, !0)); for (const o in e) if (!(n && o === "expose")) { const a = $m[o] || t && t[o]; i[o] = a ? a(i[o], e[o]) : e[o] } return i } const $m = { data: ru, props: ou, emits: ou, methods: pr, computed: pr, beforeCreate: Ft, created: Ft, beforeMount: Ft, mounted: Ft, beforeUpdate: Ft, updated: Ft, beforeDestroy: Ft, beforeUnmount: Ft, destroyed: Ft, unmounted: Ft, activated: Ft, deactivated: Ft, errorCaptured: Ft, serverPrefetch: Ft, components: pr, directives: pr, watch: Jm, provide: ru, inject: Zm }; function ru(i, e) { return e ? i ? function () { return gt(He(i) ? i.call(this, this) : i, He(e) ? e.call(this, this) : e) } : e : i } function Zm(i, e) { return pr(Dl(i), Dl(e)) } function Dl(i) { if (Ie(i)) { const e = {}; for (let t = 0; t < i.length; t++)e[i[t]] = i[t]; return e } return i } function Ft(i, e) { return i ? [...new Set([].concat(i, e))] : e } function pr(i, e) { return i ? gt(Object.create(null), i, e) : e } function ou(i, e) { return i ? Ie(i) && Ie(e) ? [...new Set([...i, ...e])] : gt(Object.create(null), iu(i), iu(e ?? {})) : e } function Jm(i, e) { if (!i) return e; if (!e) return i; const t = gt(Object.create(null), i); for (const n in e) t[n] = Ft(i[n], e[n]); return t } function pd() { return { app: null, config: { isNativeTag: Rp, performance: !1, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: Object.create(null), optionsCache: new WeakMap, propsCache: new WeakMap, emitsCache: new WeakMap } } let Qm = 0; function eg(i, e) { return function (n, s = null) { He(n) || (n = gt({}, n)), s != null && !ut(s) && (s = null); const r = pd(), o = new WeakSet; let a = !1; const l = r.app = { _uid: Qm++, _component: n, _props: s, _container: null, _context: r, _instance: null, version: Rg, get config() { return r.config }, set config(c) { }, use(c, ...u) { return o.has(c) || (c && He(c.install) ? (o.add(c), c.install(l, ...u)) : He(c) && (o.add(c), c(l, ...u))), l }, mixin(c) { return r.mixins.includes(c) || r.mixins.push(c), l }, component(c, u) { return u ? (r.components[c] = u, l) : r.components[c] }, directive(c, u) { return u ? (r.directives[c] = u, l) : r.directives[c] }, mount(c, u, h) { if (!a) { const f = nt(n, s); return f.appContext = r, h === !0 ? h = "svg" : h === !1 && (h = void 0), u && e ? e(f, c) : i(f, c, h), a = !0, l._container = c, c.__vue_app__ = l, fa(f.component) || f.component.proxy } }, unmount() { a && (i(null, l._container), delete l._container.__vue_app__) }, provide(c, u) { return r.provides[c] = u, l }, runWithContext(c) { const u = vr; vr = l; try { return c() } finally { vr = u } } }; return l } } let vr = null; function md(i, e) { if (Ut) { let t = Ut.provides; const n = Ut.parent && Ut.parent.provides; n === t && (t = Ut.provides = Object.create(n)), t[i] = e } } function yi(i, e, t = !1) { const n = Ut || zt; if (n || vr) { const s = n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : vr._context.provides; if (s && i in s) return s[i]; if (arguments.length > 1) return t && He(e) ? e.call(n && n.proxy) : e } } function tg(i, e, t, n = !1) { const s = {}, r = {}; Ho(r, ua, 1), i.propsDefaults = Object.create(null), gd(i, e, s, r); for (const o in i.propsOptions[0]) o in s || (s[o] = void 0); t ? i.props = n ? s : cm(s) : i.type.props ? i.props = s : i.props = r, i.attrs = r } function ng(i, e, t, n) { const { props: s, attrs: r, vnode: { patchFlag: o } } = i, a = Ze(s), [l] = i.propsOptions; let c = !1; if ((n || o > 0) && !(o & 16)) { if (o & 8) { const u = i.vnode.dynamicProps; for (let h = 0; h < u.length; h++) { let f = u[h]; if (ra(i.emitsOptions, f)) continue; const d = e[f]; if (l) if ($e(r, f)) d !== r[f] && (r[f] = d, c = !0); else { const _ = Os(f); s[_] = Nl(l, a, _, d, i, !1) } else d !== r[f] && (r[f] = d, c = !0) } } } else { gd(i, e, s, r) && (c = !0); let u; for (const h in a) (!e || !$e(e, h) && ((u = qs(h)) === h || !$e(e, u))) && (l ? t && (t[h] !== void 0 || t[u] !== void 0) && (s[h] = Nl(l, a, h, void 0, i, !0)) : delete s[h]); if (r !== a) for (const h in r) (!e || !$e(e, h)) && (delete r[h], c = !0) } c && jn(i, "set", "$attrs") } function gd(i, e, t, n) { const [s, r] = i.propsOptions; let o = !1, a; if (e) for (let l in e) { if (_r(l)) continue; const c = e[l]; let u; s && $e(s, u = Os(l)) ? !r || !r.includes(u) ? t[u] = c : (a || (a = {}))[u] = c : ra(i.emitsOptions, l) || (!(l in n) || c !== n[l]) && (n[l] = c, o = !0) } if (r) { const l = Ze(t), c = a || rt; for (let u = 0; u < r.length; u++) { const h = r[u]; t[h] = Nl(s, l, h, c[h], i, !$e(c, h)) } } return o } function Nl(i, e, t, n, s, r) { const o = i[t]; if (o != null) { const a = $e(o, "default"); if (a && n === void 0) { const l = o.default; if (o.type !== Function && !o.skipFactory && He(l)) { const { propsDefaults: c } = s; if (t in c) n = c[t]; else { const u = Fr(s); n = c[t] = l.call(null, e), u() } } else n = l } o[0] && (r && !a ? n = !1 : o[1] && (n === "" || n === qs(t)) && (n = !0)) } return n } function _d(i, e, t = !1) { const n = e.propsCache, s = n.get(i); if (s) return s; const r = i.props, o = {}, a = []; let l = !1; if (!He(i)) { const u = h => { l = !0; const [f, d] = _d(h, e, !0); gt(o, f), d && a.push(...d) }; !t && e.mixins.length && e.mixins.forEach(u), i.extends && u(i.extends), i.mixins && i.mixins.forEach(u) } if (!r && !l) return ut(i) && n.set(i, Rs), Rs; if (Ie(r)) for (let u = 0; u < r.length; u++) { const h = Os(r[u]); au(h) && (o[h] = rt) } else if (r) for (const u in r) { const h = Os(u); if (au(h)) { const f = r[u], d = o[h] = Ie(f) || He(f) ? { type: f } : gt({}, f); if (d) { const _ = uu(Boolean, d.type), v = uu(String, d.type); d[0] = _ > -1, d[1] = v < 0 || _ < v, (_ > -1 || $e(d, "default")) && a.push(h) } } } const c = [o, a]; return ut(i) && n.set(i, c), c } function au(i) { return i[0] !== "$" && !_r(i) } function lu(i) { return i === null ? "null" : typeof i == "function" ? i.name || "" : typeof i == "object" && i.constructor && i.constructor.name || "" } function cu(i, e) { return lu(i) === lu(e) } function uu(i, e) { return Ie(e) ? e.findIndex(t => cu(t, i)) : He(e) && cu(e, i) ? 0 : -1 } const xd = i => i[0] === "_" || i === "$stable", vc = i => Ie(i) ? i.map(Sn) : [Sn(i)], ig = (i, e, t) => { if (e._n) return e; const n = _i((...s) => vc(e(...s)), t); return n._c = !1, n }, vd = (i, e, t) => { const n = i._ctx; for (const s in i) { if (xd(s)) continue; const r = i[s]; if (He(r)) e[s] = ig(s, r, n); else if (r != null) { const o = vc(r); e[s] = () => o } } }, Md = (i, e) => { const t = vc(e); i.slots.default = () => t }, sg = (i, e) => { if (i.vnode.shapeFlag & 32) { const t = e._; t ? (i.slots = Ze(e), Ho(e, "_", t)) : vd(e, i.slots = {}) } else i.slots = {}, e && Md(i, e); Ho(i.slots, ua, 1) }, rg = (i, e, t) => { const { vnode: n, slots: s } = i; let r = !0, o = rt; if (n.shapeFlag & 32) { const a = e._; a ? t && a === 1 ? r = !1 : (gt(s, e), !t && a === 1 && delete s._) : (r = !e.$stable, vd(e, s)), o = e } else e && (Md(i, e), o = { default: 1 }); if (r) for (const a in s) !xd(a) && o[a] == null && delete s[a] }; function Ul(i, e, t, n, s = !1) { if (Ie(i)) { i.forEach((f, d) => Ul(f, e && (Ie(e) ? e[d] : e), t, n, s)); return } if (Do(n) && !s) return; const r = n.shapeFlag & 4 ? fa(n.component) || n.component.proxy : n.el, o = s ? null : r, { i: a, r: l } = i, c = e && e.r, u = a.refs === rt ? a.refs = {} : a.refs, h = a.setupState; if (c != null && c !== l && (_t(c) ? (u[c] = null, $e(h, c) && (h[c] = null)) : Yt(c) && (c.value = null)), He(l)) Mi(l, a, 12, [o, u]); else { const f = _t(l), d = Yt(l); if (f || d) { const _ = () => { if (i.f) { const v = f ? $e(h, l) ? h[l] : u[l] : l.value; s ? Ie(v) && nc(v, r) : Ie(v) ? v.includes(r) || v.push(r) : f ? (u[l] = [r], $e(h, l) && (h[l] = u[l])) : (l.value = [r], i.k && (u[i.k] = l.value)) } else f ? (u[l] = o, $e(h, l) && (h[l] = o)) : d && (l.value = o, i.k && (u[i.k] = o)) }; o ? (_.id = -1, Ht(_, t)) : _() } } } const Ht = Cm; function og(i) { return ag(i) } function ag(i, e) { const t = Of(); t.__VUE__ = !0; const { insert: n, remove: s, patchProp: r, createElement: o, createText: a, createComment: l, setText: c, setElementText: u, parentNode: h, nextSibling: f, setScopeId: d = rn, insertStaticContent: _ } = i, v = (w, U, V, J = null, E = null, x = null, N = void 0, F = null, H = !!U.dynamicChildren) => { if (w === U) return; w && !Gi(w, U) && (J = fe(w), ye(w, E, x, !0), w = null), U.patchFlag === -2 && (H = !1, U.dynamicChildren = null); const { type: k, ref: se, shapeFlag: K } = U; switch (k) { case ca: p(w, U, V, J); break; case xn: m(w, U, V, J); break; case No: w == null && b(U, V, J, N); break; case fn: I(w, U, V, J, E, x, N, F, H); break; default: K & 1 ? O(w, U, V, J, E, x, N, F, H) : K & 6 ? C(w, U, V, J, E, x, N, F, H) : (K & 64 || K & 128) && k.process(w, U, V, J, E, x, N, F, H, we) }se != null && E && Ul(se, w && w.ref, x, U || w, !U) }, p = (w, U, V, J) => { if (w == null) n(U.el = a(U.children), V, J); else { const E = U.el = w.el; U.children !== w.children && c(E, U.children) } }, m = (w, U, V, J) => { w == null ? n(U.el = l(U.children || ""), V, J) : U.el = w.el }, b = (w, U, V, J) => { [w.el, w.anchor] = _(w.children, U, V, J, w.el, w.anchor) }, y = ({ el: w, anchor: U }, V, J) => { let E; for (; w && w !== U;)E = f(w), n(w, V, J), w = E; n(U, V, J) }, A = ({ el: w, anchor: U }) => { let V; for (; w && w !== U;)V = f(w), s(w), w = V; s(U) }, O = (w, U, V, J, E, x, N, F, H) => { U.type === "svg" ? N = "svg" : U.type === "math" && (N = "mathml"), w == null ? P(U, V, J, E, x, N, F, H) : S(w, U, E, x, N, F, H) }, P = (w, U, V, J, E, x, N, F) => { let H, k; const { props: se, shapeFlag: K, transition: ae, dirs: ce } = w; if (H = w.el = o(w.type, x, se && se.is, se), K & 8 ? u(H, w.children) : K & 16 && L(w.children, H, null, J, E, Ia(w, x), N, F), ce && Pi(w, null, J, "created"), R(H, w, w.scopeId, N, J), se) { for (const le in se) le !== "value" && !_r(le) && r(H, le, null, se[le], x, w.children, J, E, ge); "value" in se && r(H, "value", null, se.value, x), (k = se.onVnodeBeforeMount) && yn(k, J, w) } ce && Pi(w, null, J, "beforeMount"); const re = lg(E, ae); re && ae.beforeEnter(H), n(H, U, V), ((k = se && se.onVnodeMounted) || re || ce) && Ht(() => { k && yn(k, J, w), re && ae.enter(H), ce && Pi(w, null, J, "mounted") }, E) }, R = (w, U, V, J, E) => { if (V && d(w, V), J) for (let x = 0; x < J.length; x++)d(w, J[x]); if (E) { let x = E.subTree; if (U === x) { const N = E.vnode; R(w, N, N.scopeId, N.slotScopeIds, E.parent) } } }, L = (w, U, V, J, E, x, N, F, H = 0) => { for (let k = H; k < w.length; k++) { const se = w[k] = F ? hi(w[k]) : Sn(w[k]); v(null, se, U, V, J, E, x, N, F) } }, S = (w, U, V, J, E, x, N) => { const F = U.el = w.el; let { patchFlag: H, dynamicChildren: k, dirs: se } = U; H |= w.patchFlag & 16; const K = w.props || rt, ae = U.props || rt; let ce; if (V && Li(V, !1), (ce = ae.onVnodeBeforeUpdate) && yn(ce, V, U, w), se && Pi(U, w, V, "beforeUpdate"), V && Li(V, !0), k ? M(w.dynamicChildren, k, F, V, J, Ia(U, E), x) : N || G(w, U, F, null, V, J, Ia(U, E), x, !1), H > 0) { if (H & 16) D(F, U, K, ae, V, J, E); else if (H & 2 && K.class !== ae.class && r(F, "class", null, ae.class, E), H & 4 && r(F, "style", K.style, ae.style, E), H & 8) { const re = U.dynamicProps; for (let le = 0; le < re.length; le++) { const _e = re[le], de = K[_e], me = ae[_e]; (me !== de || _e === "value") && r(F, _e, de, me, E, w.children, V, J, ge) } } H & 1 && w.children !== U.children && u(F, U.children) } else !N && k == null && D(F, U, K, ae, V, J, E); ((ce = ae.onVnodeUpdated) || se) && Ht(() => { ce && yn(ce, V, U, w), se && Pi(U, w, V, "updated") }, J) }, M = (w, U, V, J, E, x, N) => { for (let F = 0; F < U.length; F++) { const H = w[F], k = U[F], se = H.el && (H.type === fn || !Gi(H, k) || H.shapeFlag & 70) ? h(H.el) : V; v(H, k, se, null, J, E, x, N, !0) } }, D = (w, U, V, J, E, x, N) => { if (V !== J) { if (V !== rt) for (const F in V) !_r(F) && !(F in J) && r(w, F, V[F], null, N, U.children, E, x, ge); for (const F in J) { if (_r(F)) continue; const H = J[F], k = V[F]; H !== k && F !== "value" && r(w, F, k, H, N, U.children, E, x, ge) } "value" in J && r(w, "value", V.value, J.value, N) } }, I = (w, U, V, J, E, x, N, F, H) => { const k = U.el = w ? w.el : a(""), se = U.anchor = w ? w.anchor : a(""); let { patchFlag: K, dynamicChildren: ae, slotScopeIds: ce } = U; ce && (F = F ? F.concat(ce) : ce), w == null ? (n(k, V, J), n(se, V, J), L(U.children || [], V, se, E, x, N, F, H)) : K > 0 && K & 64 && ae && w.dynamicChildren ? (M(w.dynamicChildren, ae, V, E, x, N, F), (U.key != null || E && U === E.subTree) && yd(w, U, !0)) : G(w, U, V, se, E, x, N, F, H) }, C = (w, U, V, J, E, x, N, F, H) => { U.slotScopeIds = F, w == null ? U.shapeFlag & 512 ? E.ctx.activate(U, V, J, N, H) : z(U, V, J, E, x, N, H) : Y(w, U, H) }, z = (w, U, V, J, E, x, N) => { const F = w.component = Mg(w, J, E); if (aa(w) && (F.ctx.renderer = we), Sg(F), F.asyncDep) { if (E && E.registerDep(F, X), !w.el) { const H = F.subTree = nt(xn); m(null, H, U, V) } } else X(F, w, U, V, E, x, N) }, Y = (w, U, V) => { const J = U.component = w.component; if (bm(w, U, V)) if (J.asyncDep && !J.asyncResolved) { ee(J, U, V); return } else J.next = U, _m(J.update), J.effect.dirty = !0, J.update(); else U.el = w.el, J.vnode = U }, X = (w, U, V, J, E, x, N) => { const F = () => { if (w.isMounted) { let { next: se, bu: K, u: ae, parent: ce, vnode: re } = w; { const Ne = Sd(w); if (Ne) { se && (se.el = re.el, ee(w, se, N)), Ne.asyncDep.then(() => { w.isUnmounted || F() }); return } } let le = se, _e; Li(w, !1), se ? (se.el = re.el, ee(w, se, N)) : se = re, K && Aa(K), (_e = se.props && se.props.onVnodeBeforeUpdate) && yn(_e, ce, se, re), Li(w, !0); const de = Ra(w), me = w.subTree; w.subTree = de, v(me, de, h(me.el), fe(me), w, E, x), se.el = de.el, le === null && Am(w, de.el), ae && Ht(ae, E), (_e = se.props && se.props.onVnodeUpdated) && Ht(() => yn(_e, ce, se, re), E) } else { let se; const { el: K, props: ae } = U, { bm: ce, m: re, parent: le } = w, _e = Do(U); if (Li(w, !1), ce && Aa(ce), !_e && (se = ae && ae.onVnodeBeforeMount) && yn(se, le, U), Li(w, !0), K && De) { const de = () => { w.subTree = Ra(w), De(K, w.subTree, w, E, null) }; _e ? U.type.__asyncLoader().then(() => !w.isUnmounted && de()) : de() } else { const de = w.subTree = Ra(w); v(null, de, V, J, w, E, x), U.el = de.el } if (re && Ht(re, E), !_e && (se = ae && ae.onVnodeMounted)) { const de = U; Ht(() => yn(se, le, de), E) } (U.shapeFlag & 256 || le && Do(le.vnode) && le.vnode.shapeFlag & 256) && w.a && Ht(w.a, E), w.isMounted = !0, U = V = J = null } }, H = w.effect = new oc(F, rn, () => mc(k), w.scope), k = w.update = () => { H.dirty && H.run() }; k.id = w.uid, Li(w, !0), k() }, ee = (w, U, V) => { U.component = w; const J = w.vnode.props; w.vnode = U, w.next = null, ng(w, U.props, J, V), rg(w, U.children, V), Zi(), eu(w), Ji() }, G = (w, U, V, J, E, x, N, F, H = !1) => { const k = w && w.children, se = w ? w.shapeFlag : 0, K = U.children, { patchFlag: ae, shapeFlag: ce } = U; if (ae > 0) { if (ae & 128) { oe(k, K, V, J, E, x, N, F, H); return } else if (ae & 256) { ne(k, K, V, J, E, x, N, F, H); return } } ce & 8 ? (se & 16 && ge(k, E, x), K !== k && u(V, K)) : se & 16 ? ce & 16 ? oe(k, K, V, J, E, x, N, F, H) : ge(k, E, x, !0) : (se & 8 && u(V, ""), ce & 16 && L(K, V, J, E, x, N, F, H)) }, ne = (w, U, V, J, E, x, N, F, H) => { w = w || Rs, U = U || Rs; const k = w.length, se = U.length, K = Math.min(k, se); let ae; for (ae = 0; ae < K; ae++) { const ce = U[ae] = H ? hi(U[ae]) : Sn(U[ae]); v(w[ae], ce, V, null, E, x, N, F, H) } k > se ? ge(w, E, x, !0, !1, K) : L(U, V, J, E, x, N, F, H, K) }, oe = (w, U, V, J, E, x, N, F, H) => { let k = 0; const se = U.length; let K = w.length - 1, ae = se - 1; for (; k <= K && k <= ae;) { const ce = w[k], re = U[k] = H ? hi(U[k]) : Sn(U[k]); if (Gi(ce, re)) v(ce, re, V, null, E, x, N, F, H); else break; k++ } for (; k <= K && k <= ae;) { const ce = w[K], re = U[ae] = H ? hi(U[ae]) : Sn(U[ae]); if (Gi(ce, re)) v(ce, re, V, null, E, x, N, F, H); else break; K--, ae-- } if (k > K) { if (k <= ae) { const ce = ae + 1, re = ce < se ? U[ce].el : J; for (; k <= ae;)v(null, U[k] = H ? hi(U[k]) : Sn(U[k]), V, re, E, x, N, F, H), k++ } } else if (k > ae) for (; k <= K;)ye(w[k], E, x, !0), k++; else { const ce = k, re = k, le = new Map; for (k = re; k <= ae; k++) { const Le = U[k] = H ? hi(U[k]) : Sn(U[k]); Le.key != null && le.set(Le.key, k) } let _e, de = 0; const me = ae - re + 1; let Ne = !1, ze = 0; const Xe = new Array(me); for (k = 0; k < me; k++)Xe[k] = 0; for (k = ce; k <= K; k++) { const Le = w[k]; if (de >= me) { ye(Le, E, x, !0); continue } let ve; if (Le.key != null) ve = le.get(Le.key); else for (_e = re; _e <= ae; _e++)if (Xe[_e - re] === 0 && Gi(Le, U[_e])) { ve = _e; break } ve === void 0 ? ye(Le, E, x, !0) : (Xe[ve - re] = k + 1, ve >= ze ? ze = ve : Ne = !0, v(Le, U[ve], V, null, E, x, N, F, H), de++) } const je = Ne ? cg(Xe) : Rs; for (_e = je.length - 1, k = me - 1; k >= 0; k--) { const Le = re + k, ve = U[Le], g = Le + 1 < se ? U[Le + 1].el : J; Xe[k] === 0 ? v(null, ve, V, g, E, x, N, F, H) : Ne && (_e < 0 || k !== je[_e] ? pe(ve, V, g, 2) : _e--) } } }, pe = (w, U, V, J, E = null) => { const { el: x, type: N, transition: F, children: H, shapeFlag: k } = w; if (k & 6) { pe(w.component.subTree, U, V, J); return } if (k & 128) { w.suspense.move(U, V, J); return } if (k & 64) { N.move(w, U, V, we); return } if (N === fn) { n(x, U, V); for (let K = 0; K < H.length; K++)pe(H[K], U, V, J); n(w.anchor, U, V); return } if (N === No) { y(w, U, V); return } if (J !== 2 && k & 1 && F) if (J === 0) F.beforeEnter(x), n(x, U, V), Ht(() => F.enter(x), E); else { const { leave: K, delayLeave: ae, afterLeave: ce } = F, re = () => n(x, U, V), le = () => { K(x, () => { re(), ce && ce() }) }; ae ? ae(x, re, le) : le() } else n(x, U, V) }, ye = (w, U, V, J = !1, E = !1) => { const { type: x, props: N, ref: F, children: H, dynamicChildren: k, shapeFlag: se, patchFlag: K, dirs: ae } = w; if (F != null && Ul(F, null, V, w, !0), se & 256) { U.ctx.deactivate(w); return } const ce = se & 1 && ae, re = !Do(w); let le; if (re && (le = N && N.onVnodeBeforeUnmount) && yn(le, U, w), se & 6) ue(w.component, V, J); else { if (se & 128) { w.suspense.unmount(V, J); return } ce && Pi(w, null, U, "beforeUnmount"), se & 64 ? w.type.remove(w, U, V, E, we, J) : k && (x !== fn || K > 0 && K & 64) ? ge(k, U, V, !1, !0) : (x === fn && K & 384 || !E && se & 16) && ge(H, U, V), J && Pe(w) } (re && (le = N && N.onVnodeUnmounted) || ce) && Ht(() => { le && yn(le, U, w), ce && Pi(w, null, U, "unmounted") }, V) }, Pe = w => { const { type: U, el: V, anchor: J, transition: E } = w; if (U === fn) { te(V, J); return } if (U === No) { A(w); return } const x = () => { s(V), E && !E.persisted && E.afterLeave && E.afterLeave() }; if (w.shapeFlag & 1 && E && !E.persisted) { const { leave: N, delayLeave: F } = E, H = () => N(V, x); F ? F(w.el, x, H) : H() } else x() }, te = (w, U) => { let V; for (; w !== U;)V = f(w), s(w), w = V; s(U) }, ue = (w, U, V) => { const { bum: J, scope: E, update: x, subTree: N, um: F } = w; J && Aa(J), E.stop(), x && (x.active = !1, ye(N, w, U, V)), F && Ht(F, U), Ht(() => { w.isUnmounted = !0 }, U), U && U.pendingBranch && !U.isUnmounted && w.asyncDep && !w.asyncResolved && w.suspenseId === U.pendingId && (U.deps--, U.deps === 0 && U.resolve()) }, ge = (w, U, V, J = !1, E = !1, x = 0) => { for (let N = x; N < w.length; N++)ye(w[N], U, V, J, E) }, fe = w => w.shapeFlag & 6 ? fe(w.component.subTree) : w.shapeFlag & 128 ? w.suspense.next() : f(w.anchor || w.el); let Te = !1; const Ae = (w, U, V) => { w == null ? U._vnode && ye(U._vnode, null, null, !0) : v(U._vnode || null, w, U, null, null, null, V), Te || (Te = !0, eu(), sd(), Te = !1), U._vnode = w }, we = { p: v, um: ye, m: pe, r: Pe, mt: z, mc: L, pc: G, pbc: M, n: fe, o: i }; let j, De; return { render: Ae, hydrate: j, createApp: eg(Ae, j) } } function Ia({ type: i, props: e }, t) { return t === "svg" && i === "foreignObject" || t === "mathml" && i === "annotation-xml" && e && e.encoding && e.encoding.includes("html") ? void 0 : t } function Li({ effect: i, update: e }, t) { i.allowRecurse = e.allowRecurse = t } function lg(i, e) { return (!i || i && !i.pendingBranch) && e && !e.persisted } function yd(i, e, t = !1) { const n = i.children, s = e.children; if (Ie(n) && Ie(s)) for (let r = 0; r < n.length; r++) { const o = n[r]; let a = s[r]; a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = s[r] = hi(s[r]), a.el = o.el), t || yd(o, a)), a.type === ca && (a.el = o.el) } } function cg(i) { const e = i.slice(), t = [0]; let n, s, r, o, a; const l = i.length; for (n = 0; n < l; n++) { const c = i[n]; if (c !== 0) { if (s = t[t.length - 1], i[s] < c) { e[n] = s, t.push(n); continue } for (r = 0, o = t.length - 1; r < o;)a = r + o >> 1, i[t[a]] < c ? r = a + 1 : o = a; c < i[t[r]] && (r > 0 && (e[n] = t[r - 1]), t[r] = n) } } for (r = t.length, o = t[r - 1]; r-- > 0;)t[r] = o, o = e[o]; return t } function Sd(i) { const e = i.subTree.component; if (e) return e.asyncDep && !e.asyncResolved ? e : Sd(e) } const ug = i => i.__isTeleport, fn = Symbol.for("v-fgt"), ca = Symbol.for("v-txt"), xn = Symbol.for("v-cmt"), No = Symbol.for("v-stc"), Mr = []; let mn = null; function Rn(i = !1) { Mr.push(mn = i ? null : []) } function hg() { Mr.pop(), mn = Mr[Mr.length - 1] || null } let Cr = 1; function hu(i) { Cr += i } function Ed(i) { return i.dynamicChildren = Cr > 0 ? mn || Rs : null, hg(), Cr > 0 && mn && mn.push(i), i } function Qi(i, e, t, n, s, r) { return Ed(ct(i, e, t, n, s, r, !0)) } function Ol(i, e, t, n, s) { return Ed(nt(i, e, t, n, s, !0)) } function Fl(i) { return i ? i.__v_isVNode === !0 : !1 } function Gi(i, e) { return i.type === e.type && i.key === e.key } const ua = "__vInternal", Td = ({ key: i }) => i ?? null, Uo = ({ ref: i, ref_key: e, ref_for: t }) => (typeof i == "number" && (i = "" + i), i != null ? _t(i) || Yt(i) || He(i) ? { i: zt, r: i, k: e, f: !!t } : i : null); function ct(i, e = null, t = null, n = 0, s = null, r = i === fn ? 0 : 1, o = !1, a = !1) { const l = { __v_isVNode: !0, __v_skip: !0, type: i, props: e, key: e && Td(e), ref: e && Uo(e), scopeId: oa, slotScopeIds: null, children: t, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetAnchor: null, staticCount: 0, shapeFlag: r, patchFlag: n, dynamicProps: s, dynamicChildren: null, appContext: null, ctx: zt }; return a ? (Mc(l, t), r & 128 && i.normalize(l)) : t && (l.shapeFlag |= _t(t) ? 8 : 16), Cr > 0 && !o && mn && (l.patchFlag > 0 || r & 6) && l.patchFlag !== 32 && mn.push(l), l } const nt = fg; function fg(i, e = null, t = null, n = 0, s = null, r = !1) { if ((!i || i === wm) && (i = xn), Fl(i)) { const a = bi(i, e, !0); return t && Mc(a, t), Cr > 0 && !r && mn && (a.shapeFlag & 6 ? mn[mn.indexOf(i)] = a : mn.push(a)), a.patchFlag |= -2, a } if (Ag(i) && (i = i.__vccOpts), e) { e = dg(e); let { class: a, style: l } = e; a && !_t(a) && (e.class = rc(a)), ut(l) && (Zf(l) && !Ie(l) && (l = gt({}, l)), e.style = sc(l)) } const o = _t(i) ? 1 : Rm(i) ? 128 : ug(i) ? 64 : ut(i) ? 4 : He(i) ? 2 : 0; return ct(i, e, t, n, s, o, r, !0) } function dg(i) { return i ? Zf(i) || ua in i ? gt({}, i) : i : null } function bi(i, e, t = !1) { const { props: n, ref: s, patchFlag: r, children: o } = i, a = e ? _g(n || {}, e) : n; return { __v_isVNode: !0, __v_skip: !0, type: i.type, props: a, key: a && Td(a), ref: e && e.ref ? t && s ? Ie(s) ? s.concat(Uo(e)) : [s, Uo(e)] : Uo(e) : s, scopeId: i.scopeId, slotScopeIds: i.slotScopeIds, children: o, target: i.target, targetAnchor: i.targetAnchor, staticCount: i.staticCount, shapeFlag: i.shapeFlag, patchFlag: e && i.type !== fn ? r === -1 ? 16 : r | 16 : r, dynamicProps: i.dynamicProps, dynamicChildren: i.dynamicChildren, appContext: i.appContext, dirs: i.dirs, transition: i.transition, component: i.component, suspense: i.suspense, ssContent: i.ssContent && bi(i.ssContent), ssFallback: i.ssFallback && bi(i.ssFallback), el: i.el, anchor: i.anchor, ctx: i.ctx, ce: i.ce } } function pg(i = " ", e = 0) { return nt(ca, null, i, e) } function mg(i, e) { const t = nt(No, null, i); return t.staticCount = e, t } function gg(i = "", e = !1) { return e ? (Rn(), Ol(xn, null, i)) : nt(xn, null, i) } function Sn(i) { return i == null || typeof i == "boolean" ? nt(xn) : Ie(i) ? nt(fn, null, i.slice()) : typeof i == "object" ? hi(i) : nt(ca, null, String(i)) } function hi(i) { return i.el === null && i.patchFlag !== -1 || i.memo ? i : bi(i) } function Mc(i, e) { let t = 0; const { shapeFlag: n } = i; if (e == null) e = null; else if (Ie(e)) t = 16; else if (typeof e == "object") if (n & 65) { const s = e.default; s && (s._c && (s._d = !1), Mc(i, s()), s._c && (s._d = !0)); return } else { t = 32; const s = e._; !s && !(ua in e) ? e._ctx = zt : s === 3 && zt && (zt.slots._ === 1 ? e._ = 1 : (e._ = 2, i.patchFlag |= 1024)) } else He(e) ? (e = { default: e, _ctx: zt }, t = 32) : (e = String(e), n & 64 ? (t = 16, e = [pg(e)]) : t = 8); i.children = e, i.shapeFlag |= t } function _g(...i) { const e = {}; for (let t = 0; t < i.length; t++) { const n = i[t]; for (const s in n) if (s === "class") e.class !== n.class && (e.class = rc([e.class, n.class])); else if (s === "style") e.style = sc([e.style, n.style]); else if (ea(s)) { const r = e[s], o = n[s]; o && r !== o && !(Ie(r) && r.includes(o)) && (e[s] = r ? [].concat(r, o) : o) } else s !== "" && (e[s] = n[s]) } return e } function yn(i, e, t, n = null) { on(i, e, 7, [t, n]) } const xg = pd(); let vg = 0; function Mg(i, e, t) { const n = i.type, s = (e ? e.appContext : i.appContext) || xg, r = { uid: vg++, vnode: i, type: n, parent: e, appContext: s, root: null, next: null, subTree: null, effect: null, update: null, scope: new zp(!0), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: e ? e.provides : Object.create(s.provides), accessCache: null, renderCache: [], components: null, directives: null, propsOptions: _d(n, s), emitsOptions: od(n, s), emit: null, emitted: null, propsDefaults: rt, inheritAttrs: n.inheritAttrs, ctx: rt, data: rt, props: rt, attrs: rt, slots: rt, refs: rt, setupState: rt, setupContext: null, attrsProxy: null, slotsProxy: null, suspense: t, suspenseId: t ? t.pendingId : 0, asyncDep: null, asyncResolved: !1, isMounted: !1, isUnmounted: !1, isDeactivated: !1, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null }; return r.ctx = { _: r }, r.root = e ? e.root : r, r.emit = Mm.bind(null, r), i.ce && i.ce(r), r } let Ut = null; const yg = () => Ut || zt; let jo, Bl; { const i = Of(), e = (t, n) => { let s; return (s = i[t]) || (s = i[t] = []), s.push(n), r => { s.length > 1 ? s.forEach(o => o(r)) : s[0](r) } }; jo = e("__VUE_INSTANCE_SETTERS__", t => Ut = t), Bl = e("__VUE_SSR_SETTERS__", t => ha = t) } const Fr = i => { const e = Ut; return jo(i), i.scope.on(), () => { i.scope.off(), jo(e) } }, fu = () => { Ut && Ut.scope.off(), jo(null) }; function bd(i) { return i.vnode.shapeFlag & 4 } let ha = !1; function Sg(i, e = !1) { e && Bl(e); const { props: t, children: n } = i.vnode, s = bd(i); tg(i, t, s, e), sg(i, n); const r = s ? Eg(i, e) : void 0; return e && Bl(!1), r } function Eg(i, e) { const t = i.type; i.accessCache = Object.create(null), i.proxy = Jf(new Proxy(i.ctx, Ym)); const { setup: n } = t; if (n) { const s = i.setupContext = n.length > 1 ? bg(i) : null, r = Fr(i); Zi(); const o = Mi(n, i, 0, [i.props, s]); if (Ji(), r(), If(o)) { if (o.then(fu, fu), e) return o.then(a => { du(i, a, e) }).catch(a => { sa(a, i, 0) }); i.asyncDep = o } else du(i, o, e) } else Ad(i, e) } function du(i, e, t) { He(e) ? i.type.__ssrInlineRender ? i.ssrRender = e : i.render = e : ut(e) && (i.setupState = td(e)), Ad(i, t) } let pu; function Ad(i, e, t) { const n = i.type; if (!i.render) { if (!e && pu && !n.render) { const s = n.template || xc(i).template; if (s) { const { isCustomElement: r, compilerOptions: o } = i.appContext.config, { delimiters: a, compilerOptions: l } = n, c = gt(gt({ isCustomElement: r, delimiters: a }, o), l); n.render = pu(s, c) } } i.render = n.render || rn } { const s = Fr(i); Zi(); try { qm(i) } finally { Ji(), s() } } } function Tg(i) { return i.attrsProxy || (i.attrsProxy = new Proxy(i.attrs, { get(e, t) { return jt(i, "get", "$attrs"), e[t] } })) } function bg(i) { const e = t => { i.exposed = t || {} }; return { get attrs() { return Tg(i) }, slots: i.slots, emit: i.emit, expose: e } } function fa(i) { if (i.exposed) return i.exposeProxy || (i.exposeProxy = new Proxy(td(Jf(i.exposed)), { get(e, t) { if (t in e) return e[t]; if (t in xr) return xr[t](i) }, has(e, t) { return t in e || t in xr } })) } function Ag(i) { return He(i) && "__vccOpts" in i } const yc = (i, e) => um(i, e, ha); function wg(i, e, t) { const n = arguments.length; return n === 2 ? ut(e) && !Ie(e) ? Fl(e) ? nt(i, null, [e]) : nt(i, e) : nt(i, null, e) : (n > 3 ? t = Array.prototype.slice.call(arguments, 2) : n === 3 && Fl(t) && (t = [t]), nt(i, e, t)) } const Rg = "3.4.21";/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const Cg = "http://www.w3.org/2000/svg", Pg = "http://www.w3.org/1998/Math/MathML", fi = typeof document < "u" ? document : null, mu = fi && fi.createElement("template"), Lg = { insert: (i, e, t) => { e.insertBefore(i, t || null) }, remove: i => { const e = i.parentNode; e && e.removeChild(i) }, createElement: (i, e, t, n) => { const s = e === "svg" ? fi.createElementNS(Cg, i) : e === "mathml" ? fi.createElementNS(Pg, i) : fi.createElement(i, t ? { is: t } : void 0); return i === "select" && n && n.multiple != null && s.setAttribute("multiple", n.multiple), s }, createText: i => fi.createTextNode(i), createComment: i => fi.createComment(i), setText: (i, e) => { i.nodeValue = e }, setElementText: (i, e) => { i.textContent = e }, parentNode: i => i.parentNode, nextSibling: i => i.nextSibling, querySelector: i => fi.querySelector(i), setScopeId(i, e) { i.setAttribute(e, "") }, insertStaticContent(i, e, t, n, s, r) { const o = t ? t.previousSibling : e.lastChild; if (s && (s === r || s.nextSibling)) for (; e.insertBefore(s.cloneNode(!0), t), !(s === r || !(s = s.nextSibling));); else { mu.innerHTML = n === "svg" ? `<svg>${i}</svg>` : n === "mathml" ? `<math>${i}</math>` : i; const a = mu.content; if (n === "svg" || n === "mathml") { const l = a.firstChild; for (; l.firstChild;)a.appendChild(l.firstChild); a.removeChild(l) } e.insertBefore(a, t) } return [o ? o.nextSibling : e.firstChild, t ? t.previousSibling : e.lastChild] } }, ei = "transition", tr = "animation", Pr = Symbol("_vtc"), Wn = (i, { slots: e }) => wg(Um, Ig(i), e); Wn.displayName = "Transition"; const wd = { name: String, type: String, css: { type: Boolean, default: !0 }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String }; Wn.props = gt({}, cd, wd); const Ii = (i, e = []) => { Ie(i) ? i.forEach(t => t(...e)) : i && i(...e) }, gu = i => i ? Ie(i) ? i.some(e => e.length > 1) : i.length > 1 : !1; function Ig(i) { const e = {}; for (const I in i) I in wd || (e[I] = i[I]); if (i.css === !1) return e; const { name: t = "v", type: n, duration: s, enterFromClass: r = `${t}-enter-from`, enterActiveClass: o = `${t}-enter-active`, enterToClass: a = `${t}-enter-to`, appearFromClass: l = r, appearActiveClass: c = o, appearToClass: u = a, leaveFromClass: h = `${t}-leave-from`, leaveActiveClass: f = `${t}-leave-active`, leaveToClass: d = `${t}-leave-to` } = i, _ = Dg(s), v = _ && _[0], p = _ && _[1], { onBeforeEnter: m, onEnter: b, onEnterCancelled: y, onLeave: A, onLeaveCancelled: O, onBeforeAppear: P = m, onAppear: R = b, onAppearCancelled: L = y } = e, S = (I, C, z) => { Di(I, C ? u : a), Di(I, C ? c : o), z && z() }, M = (I, C) => { I._isLeaving = !1, Di(I, h), Di(I, d), Di(I, f), C && C() }, D = I => (C, z) => { const Y = I ? R : b, X = () => S(C, I, z); Ii(Y, [C, X]), _u(() => { Di(C, I ? l : r), ti(C, I ? u : a), gu(Y) || xu(C, n, v, X) }) }; return gt(e, { onBeforeEnter(I) { Ii(m, [I]), ti(I, r), ti(I, o) }, onBeforeAppear(I) { Ii(P, [I]), ti(I, l), ti(I, c) }, onEnter: D(!1), onAppear: D(!0), onLeave(I, C) { I._isLeaving = !0; const z = () => M(I, C); ti(I, h), Og(), ti(I, f), _u(() => { I._isLeaving && (Di(I, h), ti(I, d), gu(A) || xu(I, n, p, z)) }), Ii(A, [I, z]) }, onEnterCancelled(I) { S(I, !1), Ii(y, [I]) }, onAppearCancelled(I) { S(I, !0), Ii(L, [I]) }, onLeaveCancelled(I) { M(I), Ii(O, [I]) } }) } function Dg(i) { if (i == null) return null; if (ut(i)) return [Da(i.enter), Da(i.leave)]; { const e = Da(i); return [e, e] } } function Da(i) { return Np(i) } function ti(i, e) { e.split(/\s+/).forEach(t => t && i.classList.add(t)), (i[Pr] || (i[Pr] = new Set)).add(e) } function Di(i, e) { e.split(/\s+/).forEach(n => n && i.classList.remove(n)); const t = i[Pr]; t && (t.delete(e), t.size || (i[Pr] = void 0)) } function _u(i) { requestAnimationFrame(() => { requestAnimationFrame(i) }) } let Ng = 0; function xu(i, e, t, n) { const s = i._endId = ++Ng, r = () => { s === i._endId && n() }; if (t) return setTimeout(r, t); const { type: o, timeout: a, propCount: l } = Ug(i, e); if (!o) return n(); const c = o + "end"; let u = 0; const h = () => { i.removeEventListener(c, f), r() }, f = d => { d.target === i && ++u >= l && h() }; setTimeout(() => { u < l && h() }, a + 1), i.addEventListener(c, f) } function Ug(i, e) { const t = window.getComputedStyle(i), n = _ => (t[_] || "").split(", "), s = n(`${ei}Delay`), r = n(`${ei}Duration`), o = vu(s, r), a = n(`${tr}Delay`), l = n(`${tr}Duration`), c = vu(a, l); let u = null, h = 0, f = 0; e === ei ? o > 0 && (u = ei, h = o, f = r.length) : e === tr ? c > 0 && (u = tr, h = c, f = l.length) : (h = Math.max(o, c), u = h > 0 ? o > c ? ei : tr : null, f = u ? u === ei ? r.length : l.length : 0); const d = u === ei && /\b(transform|all)(,|$)/.test(n(`${ei}Property`).toString()); return { type: u, timeout: h, propCount: f, hasTransform: d } } function vu(i, e) { for (; i.length < e.length;)i = i.concat(i); return Math.max(...e.map((t, n) => Mu(t) + Mu(i[n]))) } function Mu(i) { return i === "auto" ? 0 : Number(i.slice(0, -1).replace(",", ".")) * 1e3 } function Og() { return document.body.offsetHeight } function Fg(i, e, t) { const n = i[Pr]; n && (e = (e ? [e, ...n] : [...n]).join(" ")), e == null ? i.removeAttribute("class") : t ? i.setAttribute("class", e) : i.className = e } const Yo = Symbol("_vod"), Rd = Symbol("_vsh"), Lr = { beforeMount(i, { value: e }, { transition: t }) { i[Yo] = i.style.display === "none" ? "" : i.style.display, t && e ? t.beforeEnter(i) : nr(i, e) }, mounted(i, { value: e }, { transition: t }) { t && e && t.enter(i) }, updated(i, { value: e, oldValue: t }, { transition: n }) { !e != !t && (n ? e ? (n.beforeEnter(i), nr(i, !0), n.enter(i)) : n.leave(i, () => { nr(i, !1) }) : nr(i, e)) }, beforeUnmount(i, { value: e }) { nr(i, e) } }; function nr(i, e) { i.style.display = e ? i[Yo] : "none", i[Rd] = !e } const Bg = Symbol(""), kg = /(^|;)\s*display\s*:/; function Hg(i, e, t) { const n = i.style, s = _t(t); let r = !1; if (t && !s) { if (e) if (_t(e)) for (const o of e.split(";")) { const a = o.slice(0, o.indexOf(":")).trim(); t[a] == null && Oo(n, a, "") } else for (const o in e) t[o] == null && Oo(n, o, ""); for (const o in t) o === "display" && (r = !0), Oo(n, o, t[o]) } else if (s) { if (e !== t) { const o = n[Bg]; o && (t += ";" + o), n.cssText = t, r = kg.test(t) } } else e && i.removeAttribute("style"); Yo in i && (i[Yo] = r ? n.display : "", i[Rd] && (n.display = "none")) } const yu = /\s*!important$/; function Oo(i, e, t) { if (Ie(t)) t.forEach(n => Oo(i, e, n)); else if (t == null && (t = ""), e.startsWith("--")) i.setProperty(e, t); else { const n = zg(i, e); yu.test(t) ? i.setProperty(qs(n), t.replace(yu, ""), "important") : i[n] = t } } const Su = ["Webkit", "Moz", "ms"], Na = {}; function zg(i, e) { const t = Na[e]; if (t) return t; let n = Os(e); if (n !== "filter" && n in i) return Na[e] = n; n = Uf(n); for (let s = 0; s < Su.length; s++) { const r = Su[s] + n; if (r in i) return Na[e] = r } return e } const Eu = "http://www.w3.org/1999/xlink"; function Vg(i, e, t, n, s) { if (n && e.startsWith("xlink:")) t == null ? i.removeAttributeNS(Eu, e.slice(6, e.length)) : i.setAttributeNS(Eu, e, t); else { const r = Hp(e); t == null || r && !Ff(t) ? i.removeAttribute(e) : i.setAttribute(e, r ? "" : t) } } function Gg(i, e, t, n, s, r, o) { if (e === "innerHTML" || e === "textContent") { n && o(n, s, r), i[e] = t ?? ""; return } const a = i.tagName; if (e === "value" && a !== "PROGRESS" && !a.includes("-")) { const c = a === "OPTION" ? i.getAttribute("value") || "" : i.value, u = t ?? ""; (c !== u || !("_value" in i)) && (i.value = u), t == null && i.removeAttribute(e), i._value = t; return } let l = !1; if (t === "" || t == null) { const c = typeof i[e]; c === "boolean" ? t = Ff(t) : t == null && c === "string" ? (t = "", l = !0) : c === "number" && (t = 0, l = !0) } try { i[e] = t } catch { } l && i.removeAttribute(e) } function Wg(i, e, t, n) { i.addEventListener(e, t, n) } function Xg(i, e, t, n) { i.removeEventListener(e, t, n) } const Tu = Symbol("_vei"); function jg(i, e, t, n, s = null) { const r = i[Tu] || (i[Tu] = {}), o = r[e]; if (n && o) o.value = n; else { const [a, l] = Yg(e); if (n) { const c = r[e] = $g(n, s); Wg(i, a, c, l) } else o && (Xg(i, a, o, l), r[e] = void 0) } } const bu = /(?:Once|Passive|Capture)$/; function Yg(i) { let e; if (bu.test(i)) { e = {}; let n; for (; n = i.match(bu);)i = i.slice(0, i.length - n[0].length), e[n[0].toLowerCase()] = !0 } return [i[2] === ":" ? i.slice(3) : qs(i.slice(2)), e] } let Ua = 0; const qg = Promise.resolve(), Kg = () => Ua || (qg.then(() => Ua = 0), Ua = Date.now()); function $g(i, e) { const t = n => { if (!n._vts) n._vts = Date.now(); else if (n._vts <= t.attached) return; on(Zg(n, t.value), e, 5, [n]) }; return t.value = i, t.attached = Kg(), t } function Zg(i, e) { if (Ie(e)) { const t = i.stopImmediatePropagation; return i.stopImmediatePropagation = () => { t.call(i), i._stopped = !0 }, e.map(n => s => !s._stopped && n && n(s)) } else return e } const Au = i => i.charCodeAt(0) === 111 && i.charCodeAt(1) === 110 && i.charCodeAt(2) > 96 && i.charCodeAt(2) < 123, Jg = (i, e, t, n, s, r, o, a, l) => { const c = s === "svg"; e === "class" ? Fg(i, n, c) : e === "style" ? Hg(i, t, n) : ea(e) ? tc(e) || jg(i, e, t, n, o) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : Qg(i, e, n, c)) ? Gg(i, e, n, r, o, a, l) : (e === "true-value" ? i._trueValue = n : e === "false-value" && (i._falseValue = n), Vg(i, e, n, c)) }; function Qg(i, e, t, n) { if (n) return !!(e === "innerHTML" || e === "textContent" || e in i && Au(e) && He(t)); if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "form" || e === "list" && i.tagName === "INPUT" || e === "type" && i.tagName === "TEXTAREA") return !1; if (e === "width" || e === "height") { const s = i.tagName; if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1 } return Au(e) && _t(t) ? !1 : e in i } const e_ = gt({ patchProp: Jg }, Lg); let wu; function t_() { return wu || (wu = og(e_)) } const n_ = (...i) => { const e = t_().createApp(...i), { mount: t } = e; return e.mount = n => { const s = s_(n); if (!s) return; const r = e._component; !He(r) && !r.render && !r.template && (r.template = s.innerHTML), s.innerHTML = ""; const o = t(s, !1, i_(s)); return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o }, e }; function i_(i) { if (i instanceof SVGElement) return "svg"; if (typeof MathMLElement == "function" && i instanceof MathMLElement) return "mathml" } function s_(i) { return _t(i) ? document.querySelector(i) : i }/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sc = "163", ns = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 }, is = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, r_ = 0, Ru = 1, o_ = 2, Cd = 1, Pd = 2, zn = 3, Yn = 0, Xt = 1, bn = 2, Dt = 0, Is = 1, Cu = 2, Pu = 3, Lu = 4, Ld = 5, Vn = 100, a_ = 101, l_ = 102, c_ = 103, u_ = 104, kl = 200, h_ = 201, f_ = 202, d_ = 203, Hl = 204, zl = 205, Id = 206, p_ = 207, Dd = 208, m_ = 209, g_ = 210, __ = 211, x_ = 212, v_ = 213, M_ = 214, y_ = 0, S_ = 1, E_ = 2, qo = 3, T_ = 4, b_ = 5, A_ = 6, w_ = 7, Nd = 0, R_ = 1, C_ = 2, Si = 0, P_ = 1, L_ = 2, I_ = 3, D_ = 4, N_ = 5, U_ = 6, O_ = 7, Iu = "attached", F_ = "detached", Ud = 300, Bs = 301, ks = 302, Vl = 303, Gl = 304, da = 306, Ai = 1e3, An = 1001, Ko = 1002, Rt = 1003, Od = 1004, mr = 1005, At = 1006, Fo = 1007, wn = 1008, Ei = 1009, B_ = 1010, k_ = 1011, Fd = 1012, Bd = 1013, Hs = 1014, Vt = 1015, gn = 1016, kd = 1017, Hd = 1018, Ks = 1020, H_ = 35902, z_ = 1021, V_ = 1022, _n = 1023, G_ = 1024, W_ = 1025, Ds = 1026, zs = 1027, Ec = 1028, zd = 1029, X_ = 1030, Vd = 1031, Gd = 1033, Oa = 33776, Fa = 33777, Ba = 33778, ka = 33779, Du = 35840, Nu = 35841, Uu = 35842, Ou = 35843, Wd = 36196, Fu = 37492, Bu = 37496, ku = 37808, Hu = 37809, zu = 37810, Vu = 37811, Gu = 37812, Wu = 37813, Xu = 37814, ju = 37815, Yu = 37816, qu = 37817, Ku = 37818, $u = 37819, Zu = 37820, Ju = 37821, Ha = 36492, Qu = 36494, eh = 36495, j_ = 36283, th = 36284, nh = 36285, ih = 36286, Ir = 2300, Vs = 2301, za = 2302, sh = 2400, rh = 2401, oh = 2402, Y_ = 2500, q_ = 0, Xd = 1, Wl = 2, K_ = 3200, $_ = 3201, Tc = 0, Z_ = 1, mi = "", Tt = "srgb", xt = "srgb-linear", bc = "display-p3", pa = "display-p3-linear", $o = "linear", st = "srgb", Zo = "rec709", Jo = "p3", ss = 7680, ah = 519, J_ = 512, Q_ = 513, e0 = 514, jd = 515, t0 = 516, n0 = 517, i0 = 518, s0 = 519, Xl = 35044, lh = "300 es", Xn = 2e3, Qo = 2001; class es { addEventListener(e, t) { this._listeners === void 0 && (this._listeners = {}); const n = this._listeners; n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t) } hasEventListener(e, t) { if (this._listeners === void 0) return !1; const n = this._listeners; return n[e] !== void 0 && n[e].indexOf(t) !== -1 } removeEventListener(e, t) { if (this._listeners === void 0) return; const s = this._listeners[e]; if (s !== void 0) { const r = s.indexOf(t); r !== -1 && s.splice(r, 1) } } dispatchEvent(e) { if (this._listeners === void 0) return; const n = this._listeners[e.type]; if (n !== void 0) { e.target = this; const s = n.slice(0); for (let r = 0, o = s.length; r < o; r++)s[r].call(this, e); e.target = null } } } const Lt = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"]; let ch = 1234567; const yr = Math.PI / 180, Gs = 180 / Math.PI; function vn() { const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0; return (Lt[i & 255] + Lt[i >> 8 & 255] + Lt[i >> 16 & 255] + Lt[i >> 24 & 255] + "-" + Lt[e & 255] + Lt[e >> 8 & 255] + "-" + Lt[e >> 16 & 15 | 64] + Lt[e >> 24 & 255] + "-" + Lt[t & 63 | 128] + Lt[t >> 8 & 255] + "-" + Lt[t >> 16 & 255] + Lt[t >> 24 & 255] + Lt[n & 255] + Lt[n >> 8 & 255] + Lt[n >> 16 & 255] + Lt[n >> 24 & 255]).toLowerCase() } function bt(i, e, t) { return Math.max(e, Math.min(t, i)) } function Ac(i, e) { return (i % e + e) % e } function r0(i, e, t, n, s) { return n + (i - e) * (s - n) / (t - e) } function o0(i, e, t) { return i !== e ? (t - i) / (e - i) : 0 } function Sr(i, e, t) { return (1 - t) * i + t * e } function a0(i, e, t, n) { return Sr(i, e, 1 - Math.exp(-t * n)) } function l0(i, e = 1) { return e - Math.abs(Ac(i, e * 2) - e) } function c0(i, e, t) { return i <= e ? 0 : i >= t ? 1 : (i = (i - e) / (t - e), i * i * (3 - 2 * i)) } function u0(i, e, t) { return i <= e ? 0 : i >= t ? 1 : (i = (i - e) / (t - e), i * i * i * (i * (i * 6 - 15) + 10)) } function h0(i, e) { return i + Math.floor(Math.random() * (e - i + 1)) } function f0(i, e) { return i + Math.random() * (e - i) } function d0(i) { return i * (.5 - Math.random()) } function p0(i) { i !== void 0 && (ch = i); let e = ch += 1831565813; return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296 } function m0(i) { return i * yr } function g0(i) { return i * Gs } function _0(i) { return (i & i - 1) === 0 && i !== 0 } function x0(i) { return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2)) } function v0(i) { return Math.pow(2, Math.floor(Math.log(i) / Math.LN2)) } function M0(i, e, t, n, s) { const r = Math.cos, o = Math.sin, a = r(t / 2), l = o(t / 2), c = r((e + n) / 2), u = o((e + n) / 2), h = r((e - n) / 2), f = o((e - n) / 2), d = r((n - e) / 2), _ = o((n - e) / 2); switch (s) { case "XYX": i.set(a * u, l * h, l * f, a * c); break; case "YZY": i.set(l * f, a * u, l * h, a * c); break; case "ZXZ": i.set(l * h, l * f, a * u, a * c); break; case "XZX": i.set(a * u, l * _, l * d, a * c); break; case "YXY": i.set(l * d, a * u, l * _, a * c); break; case "ZYZ": i.set(l * _, l * d, a * u, a * c); break; default: console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + s) } } function dn(i, e) { switch (e.constructor) { case Float32Array: return i; case Uint32Array: return i / 4294967295; case Uint16Array: return i / 65535; case Uint8Array: return i / 255; case Int32Array: return Math.max(i / 2147483647, -1); case Int16Array: return Math.max(i / 32767, -1); case Int8Array: return Math.max(i / 127, -1); default: throw new Error("Invalid component type.") } } function Qe(i, e) { switch (e.constructor) { case Float32Array: return i; case Uint32Array: return Math.round(i * 4294967295); case Uint16Array: return Math.round(i * 65535); case Uint8Array: return Math.round(i * 255); case Int32Array: return Math.round(i * 2147483647); case Int16Array: return Math.round(i * 32767); case Int8Array: return Math.round(i * 127); default: throw new Error("Invalid component type.") } } const wc = { DEG2RAD: yr, RAD2DEG: Gs, generateUUID: vn, clamp: bt, euclideanModulo: Ac, mapLinear: r0, inverseLerp: o0, lerp: Sr, damp: a0, pingpong: l0, smoothstep: c0, smootherstep: u0, randInt: h0, randFloat: f0, randFloatSpread: d0, seededRandom: p0, degToRad: m0, radToDeg: g0, isPowerOfTwo: _0, ceilPowerOfTwo: x0, floorPowerOfTwo: v0, setQuaternionFromProperEuler: M0, normalize: Qe, denormalize: dn }; class Ee { constructor(e = 0, t = 0) { Ee.prototype.isVector2 = !0, this.x = e, this.y = t } get width() { return this.x } set width(e) { this.x = e } get height() { return this.y } set height(e) { this.y = e } set(e, t) { return this.x = e, this.y = t, this } setScalar(e) { return this.x = e, this.y = e, this } setX(e) { return this.x = e, this } setY(e) { return this.y = e, this } setComponent(e, t) { switch (e) { case 0: this.x = t; break; case 1: this.y = t; break; default: throw new Error("index is out of range: " + e) }return this } getComponent(e) { switch (e) { case 0: return this.x; case 1: return this.y; default: throw new Error("index is out of range: " + e) } } clone() { return new this.constructor(this.x, this.y) } copy(e) { return this.x = e.x, this.y = e.y, this } add(e) { return this.x += e.x, this.y += e.y, this } addScalar(e) { return this.x += e, this.y += e, this } addVectors(e, t) { return this.x = e.x + t.x, this.y = e.y + t.y, this } addScaledVector(e, t) { return this.x += e.x * t, this.y += e.y * t, this } sub(e) { return this.x -= e.x, this.y -= e.y, this } subScalar(e) { return this.x -= e, this.y -= e, this } subVectors(e, t) { return this.x = e.x - t.x, this.y = e.y - t.y, this } multiply(e) { return this.x *= e.x, this.y *= e.y, this } multiplyScalar(e) { return this.x *= e, this.y *= e, this } divide(e) { return this.x /= e.x, this.y /= e.y, this } divideScalar(e) { return this.multiplyScalar(1 / e) } applyMatrix3(e) { const t = this.x, n = this.y, s = e.elements; return this.x = s[0] * t + s[3] * n + s[6], this.y = s[1] * t + s[4] * n + s[7], this } min(e) { return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this } max(e) { return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this } clamp(e, t) { return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this } clampScalar(e, t) { return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this } clampLength(e, t) { const n = this.length(); return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n))) } floor() { return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this } ceil() { return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this } round() { return this.x = Math.round(this.x), this.y = Math.round(this.y), this } roundToZero() { return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this } negate() { return this.x = -this.x, this.y = -this.y, this } dot(e) { return this.x * e.x + this.y * e.y } cross(e) { return this.x * e.y - this.y * e.x } lengthSq() { return this.x * this.x + this.y * this.y } length() { return Math.sqrt(this.x * this.x + this.y * this.y) } manhattanLength() { return Math.abs(this.x) + Math.abs(this.y) } normalize() { return this.divideScalar(this.length() || 1) } angle() { return Math.atan2(-this.y, -this.x) + Math.PI } angleTo(e) { const t = Math.sqrt(this.lengthSq() * e.lengthSq()); if (t === 0) return Math.PI / 2; const n = this.dot(e) / t; return Math.acos(bt(n, -1, 1)) } distanceTo(e) { return Math.sqrt(this.distanceToSquared(e)) } distanceToSquared(e) { const t = this.x - e.x, n = this.y - e.y; return t * t + n * n } manhattanDistanceTo(e) { return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) } setLength(e) { return this.normalize().multiplyScalar(e) } lerp(e, t) { return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this } lerpVectors(e, t, n) { return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this } equals(e) { return e.x === this.x && e.y === this.y } fromArray(e, t = 0) { return this.x = e[t], this.y = e[t + 1], this } toArray(e = [], t = 0) { return e[t] = this.x, e[t + 1] = this.y, e } fromBufferAttribute(e, t) { return this.x = e.getX(t), this.y = e.getY(t), this } rotateAround(e, t) { const n = Math.cos(t), s = Math.sin(t), r = this.x - e.x, o = this.y - e.y; return this.x = r * n - o * s + e.x, this.y = r * s + o * n + e.y, this } random() { return this.x = Math.random(), this.y = Math.random(), this } *[Symbol.iterator]() { yield this.x, yield this.y } } class We { constructor(e, t, n, s, r, o, a, l, c) { We.prototype.isMatrix3 = !0, this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], e !== void 0 && this.set(e, t, n, s, r, o, a, l, c) } set(e, t, n, s, r, o, a, l, c) { const u = this.elements; return u[0] = e, u[1] = s, u[2] = a, u[3] = t, u[4] = r, u[5] = l, u[6] = n, u[7] = o, u[8] = c, this } identity() { return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this } copy(e) { const t = this.elements, n = e.elements; return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this } extractBasis(e, t, n) { return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this } setFromMatrix4(e) { const t = e.elements; return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this } multiply(e) { return this.multiplyMatrices(this, e) } premultiply(e) { return this.multiplyMatrices(e, this) } multiplyMatrices(e, t) { const n = e.elements, s = t.elements, r = this.elements, o = n[0], a = n[3], l = n[6], c = n[1], u = n[4], h = n[7], f = n[2], d = n[5], _ = n[8], v = s[0], p = s[3], m = s[6], b = s[1], y = s[4], A = s[7], O = s[2], P = s[5], R = s[8]; return r[0] = o * v + a * b + l * O, r[3] = o * p + a * y + l * P, r[6] = o * m + a * A + l * R, r[1] = c * v + u * b + h * O, r[4] = c * p + u * y + h * P, r[7] = c * m + u * A + h * R, r[2] = f * v + d * b + _ * O, r[5] = f * p + d * y + _ * P, r[8] = f * m + d * A + _ * R, this } multiplyScalar(e) { const t = this.elements; return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this } determinant() { const e = this.elements, t = e[0], n = e[1], s = e[2], r = e[3], o = e[4], a = e[5], l = e[6], c = e[7], u = e[8]; return t * o * u - t * a * c - n * r * u + n * a * l + s * r * c - s * o * l } invert() { const e = this.elements, t = e[0], n = e[1], s = e[2], r = e[3], o = e[4], a = e[5], l = e[6], c = e[7], u = e[8], h = u * o - a * c, f = a * l - u * r, d = c * r - o * l, _ = t * h + n * f + s * d; if (_ === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0); const v = 1 / _; return e[0] = h * v, e[1] = (s * c - u * n) * v, e[2] = (a * n - s * o) * v, e[3] = f * v, e[4] = (u * t - s * l) * v, e[5] = (s * r - a * t) * v, e[6] = d * v, e[7] = (n * l - c * t) * v, e[8] = (o * t - n * r) * v, this } transpose() { let e; const t = this.elements; return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this } getNormalMatrix(e) { return this.setFromMatrix4(e).invert().transpose() } transposeIntoArray(e) { const t = this.elements; return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this } setUvTransform(e, t, n, s, r, o, a) { const l = Math.cos(r), c = Math.sin(r); return this.set(n * l, n * c, -n * (l * o + c * a) + o + e, -s * c, s * l, -s * (-c * o + l * a) + a + t, 0, 0, 1), this } scale(e, t) { return this.premultiply(Va.makeScale(e, t)), this } rotate(e) { return this.premultiply(Va.makeRotation(-e)), this } translate(e, t) { return this.premultiply(Va.makeTranslation(e, t)), this } makeTranslation(e, t) { return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this } makeRotation(e) { const t = Math.cos(e), n = Math.sin(e); return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this } makeScale(e, t) { return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this } equals(e) { const t = this.elements, n = e.elements; for (let s = 0; s < 9; s++)if (t[s] !== n[s]) return !1; return !0 } fromArray(e, t = 0) { for (let n = 0; n < 9; n++)this.elements[n] = e[n + t]; return this } toArray(e = [], t = 0) { const n = this.elements; return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e } clone() { return new this.constructor().fromArray(this.elements) } } const Va = new We; function Yd(i) { for (let e = i.length - 1; e >= 0; --e)if (i[e] >= 65535) return !0; return !1 } function Dr(i) { return document.createElementNS("http://www.w3.org/1999/xhtml", i) } function y0() { const i = Dr("canvas"); return i.style.display = "block", i } const uh = {}; function qd(i) { i in uh || (uh[i] = !0, console.warn(i)) } const hh = new We().set(.8224621, .177538, 0, .0331941, .9668058, 0, .0170827, .0723974, .9105199), fh = new We().set(1.2249401, -.2249404, 0, -.0420569, 1.0420571, 0, -.0196376, -.0786361, 1.0982735), $r = { [xt]: { transfer: $o, primaries: Zo, toReference: i => i, fromReference: i => i }, [Tt]: { transfer: st, primaries: Zo, toReference: i => i.convertSRGBToLinear(), fromReference: i => i.convertLinearToSRGB() }, [pa]: { transfer: $o, primaries: Jo, toReference: i => i.applyMatrix3(fh), fromReference: i => i.applyMatrix3(hh) }, [bc]: { transfer: st, primaries: Jo, toReference: i => i.convertSRGBToLinear().applyMatrix3(fh), fromReference: i => i.applyMatrix3(hh).convertLinearToSRGB() } }, S0 = new Set([xt, pa]), Je = { enabled: !0, _workingColorSpace: xt, get workingColorSpace() { return this._workingColorSpace }, set workingColorSpace(i) { if (!S0.has(i)) throw new Error(`Unsupported working color space, "${i}".`); this._workingColorSpace = i }, convert: function (i, e, t) { if (this.enabled === !1 || e === t || !e || !t) return i; const n = $r[e].toReference, s = $r[t].fromReference; return s(n(i)) }, fromWorkingColorSpace: function (i, e) { return this.convert(i, this._workingColorSpace, e) }, toWorkingColorSpace: function (i, e) { return this.convert(i, e, this._workingColorSpace) }, getPrimaries: function (i) { return $r[i].primaries }, getTransfer: function (i) { return i === mi ? $o : $r[i].transfer } }; function Ns(i) { return i < .04045 ? i * .0773993808 : Math.pow(i * .9478672986 + .0521327014, 2.4) } function Ga(i) { return i < .0031308 ? i * 12.92 : 1.055 * Math.pow(i, .41666) - .055 } let rs; class E0 { static getDataURL(e) { if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src; let t; if (e instanceof HTMLCanvasElement) t = e; else { rs === void 0 && (rs = Dr("canvas")), rs.width = e.width, rs.height = e.height; const n = rs.getContext("2d"); e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = rs } return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", .6)) : t.toDataURL("image/png") } static sRGBToLinear(e) { if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) { const t = Dr("canvas"); t.width = e.width, t.height = e.height; const n = t.getContext("2d"); n.drawImage(e, 0, 0, e.width, e.height); const s = n.getImageData(0, 0, e.width, e.height), r = s.data; for (let o = 0; o < r.length; o++)r[o] = Ns(r[o] / 255) * 255; return n.putImageData(s, 0, 0), t } else if (e.data) { const t = e.data.slice(0); for (let n = 0; n < t.length; n++)t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(Ns(t[n] / 255) * 255) : t[n] = Ns(t[n]); return { data: t, width: e.width, height: e.height } } else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e } } let T0 = 0; class Kd { constructor(e = null) { this.isSource = !0, Object.defineProperty(this, "id", { value: T0++ }), this.uuid = vn(), this.data = e, this.dataReady = !0, this.version = 0 } set needsUpdate(e) { e === !0 && this.version++ } toJSON(e) { const t = e === void 0 || typeof e == "string"; if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid]; const n = { uuid: this.uuid, url: "" }, s = this.data; if (s !== null) { let r; if (Array.isArray(s)) { r = []; for (let o = 0, a = s.length; o < a; o++)s[o].isDataTexture ? r.push(Wa(s[o].image)) : r.push(Wa(s[o])) } else r = Wa(s); n.url = r } return t || (e.images[this.uuid] = n), n } } function Wa(i) { return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? E0.getDataURL(i) : i.data ? { data: Array.from(i.data), width: i.width, height: i.height, type: i.data.constructor.name } : (console.warn("THREE.Texture: Unable to serialize Texture."), {}) } let b0 = 0; class wt extends es { constructor(e = wt.DEFAULT_IMAGE, t = wt.DEFAULT_MAPPING, n = An, s = An, r = At, o = wn, a = _n, l = Ei, c = wt.DEFAULT_ANISOTROPY, u = mi) { super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: b0++ }), this.uuid = vn(), this.name = "", this.source = new Kd(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = s, this.magFilter = r, this.minFilter = o, this.anisotropy = c, this.format = a, this.internalFormat = null, this.type = l, this.offset = new Ee(0, 0), this.repeat = new Ee(1, 1), this.center = new Ee(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new We, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = u, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0 } get image() { return this.source.data } set image(e = null) { this.source.data = e } updateMatrix() { this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y) } clone() { return new this.constructor().copy(this) } copy(e) { return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this } toJSON(e) { const t = e === void 0 || typeof e == "string"; if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid]; const n = { metadata: { version: 4.6, type: "Texture", generator: "Texture.toJSON" }, uuid: this.uuid, name: this.name, image: this.source.toJSON(e).uuid, mapping: this.mapping, channel: this.channel, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], center: [this.center.x, this.center.y], rotation: this.rotation, wrap: [this.wrapS, this.wrapT], format: this.format, internalFormat: this.internalFormat, type: this.type, colorSpace: this.colorSpace, minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY, generateMipmaps: this.generateMipmaps, premultiplyAlpha: this.premultiplyAlpha, unpackAlignment: this.unpackAlignment }; return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n } dispose() { this.dispatchEvent({ type: "dispose" }) } transformUv(e) { if (this.mapping !== Ud) return e; if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) { case Ai: e.x = e.x - Math.floor(e.x); break; case An: e.x = e.x < 0 ? 0 : 1; break; case Ko: Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x); break }if (e.y < 0 || e.y > 1) switch (this.wrapT) { case Ai: e.y = e.y - Math.floor(e.y); break; case An: e.y = e.y < 0 ? 0 : 1; break; case Ko: Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y); break }return this.flipY && (e.y = 1 - e.y), e } set needsUpdate(e) { e === !0 && (this.version++, this.source.needsUpdate = !0) } set needsPMREMUpdate(e) { e === !0 && this.pmremVersion++ } } wt.DEFAULT_IMAGE = null; wt.DEFAULT_MAPPING = Ud; wt.DEFAULT_ANISOTROPY = 1; class it { constructor(e = 0, t = 0, n = 0, s = 1) { it.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = n, this.w = s } get width() { return this.z } set width(e) { this.z = e } get height() { return this.w } set height(e) { this.w = e } set(e, t, n, s) { return this.x = e, this.y = t, this.z = n, this.w = s, this } setScalar(e) { return this.x = e, this.y = e, this.z = e, this.w = e, this } setX(e) { return this.x = e, this } setY(e) { return this.y = e, this } setZ(e) { return this.z = e, this } setW(e) { return this.w = e, this } setComponent(e, t) { switch (e) { case 0: this.x = t; break; case 1: this.y = t; break; case 2: this.z = t; break; case 3: this.w = t; break; default: throw new Error("index is out of range: " + e) }return this } getComponent(e) { switch (e) { case 0: return this.x; case 1: return this.y; case 2: return this.z; case 3: return this.w; default: throw new Error("index is out of range: " + e) } } clone() { return new this.constructor(this.x, this.y, this.z, this.w) } copy(e) { return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this } add(e) { return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this } addScalar(e) { return this.x += e, this.y += e, this.z += e, this.w += e, this } addVectors(e, t) { return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this } addScaledVector(e, t) { return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this } sub(e) { return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this } subScalar(e) { return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this } subVectors(e, t) { return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this } multiply(e) { return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this } multiplyScalar(e) { return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this } applyMatrix4(e) { const t = this.x, n = this.y, s = this.z, r = this.w, o = e.elements; return this.x = o[0] * t + o[4] * n + o[8] * s + o[12] * r, this.y = o[1] * t + o[5] * n + o[9] * s + o[13] * r, this.z = o[2] * t + o[6] * n + o[10] * s + o[14] * r, this.w = o[3] * t + o[7] * n + o[11] * s + o[15] * r, this } divideScalar(e) { return this.multiplyScalar(1 / e) } setAxisAngleFromQuaternion(e) { this.w = 2 * Math.acos(e.w); const t = Math.sqrt(1 - e.w * e.w); return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this } setAxisAngleFromRotationMatrix(e) { let t, n, s, r; const l = e.elements, c = l[0], u = l[4], h = l[8], f = l[1], d = l[5], _ = l[9], v = l[2], p = l[6], m = l[10]; if (Math.abs(u - f) < .01 && Math.abs(h - v) < .01 && Math.abs(_ - p) < .01) { if (Math.abs(u + f) < .1 && Math.abs(h + v) < .1 && Math.abs(_ + p) < .1 && Math.abs(c + d + m - 3) < .1) return this.set(1, 0, 0, 0), this; t = Math.PI; const y = (c + 1) / 2, A = (d + 1) / 2, O = (m + 1) / 2, P = (u + f) / 4, R = (h + v) / 4, L = (_ + p) / 4; return y > A && y > O ? y < .01 ? (n = 0, s = .707106781, r = .707106781) : (n = Math.sqrt(y), s = P / n, r = R / n) : A > O ? A < .01 ? (n = .707106781, s = 0, r = .707106781) : (s = Math.sqrt(A), n = P / s, r = L / s) : O < .01 ? (n = .707106781, s = .707106781, r = 0) : (r = Math.sqrt(O), n = R / r, s = L / r), this.set(n, s, r, t), this } let b = Math.sqrt((p - _) * (p - _) + (h - v) * (h - v) + (f - u) * (f - u)); return Math.abs(b) < .001 && (b = 1), this.x = (p - _) / b, this.y = (h - v) / b, this.z = (f - u) / b, this.w = Math.acos((c + d + m - 1) / 2), this } min(e) { return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this } max(e) { return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this } clamp(e, t) { return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this } clampScalar(e, t) { return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this } clampLength(e, t) { const n = this.length(); return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n))) } floor() { return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this } ceil() { return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this } round() { return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this } roundToZero() { return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this } negate() { return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this } dot(e) { return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w } lengthSq() { return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w } length() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w) } manhattanLength() { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w) } normalize() { return this.divideScalar(this.length() || 1) } setLength(e) { return this.normalize().multiplyScalar(e) } lerp(e, t) { return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this } lerpVectors(e, t, n) { return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this } equals(e) { return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w } fromArray(e, t = 0) { return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this } toArray(e = [], t = 0) { return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e } fromBufferAttribute(e, t) { return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this } random() { return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this } *[Symbol.iterator]() { yield this.x, yield this.y, yield this.z, yield this.w } } class A0 extends es { constructor(e = 1, t = 1, n = {}) { super(), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new it(0, 0, e, t), this.scissorTest = !1, this.viewport = new it(0, 0, e, t); const s = { width: e, height: t, depth: 1 }; n = Object.assign({ generateMipmaps: !1, internalFormat: null, minFilter: At, depthBuffer: !0, stencilBuffer: !1, depthTexture: null, samples: 0, count: 1 }, n); const r = new wt(s, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace); r.flipY = !1, r.generateMipmaps = n.generateMipmaps, r.internalFormat = n.internalFormat, this.textures = []; const o = n.count; for (let a = 0; a < o; a++)this.textures[a] = r.clone(), this.textures[a].isRenderTargetTexture = !0; this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples } get texture() { return this.textures[0] } set texture(e) { this.textures[0] = e } setSize(e, t, n = 1) { if (this.width !== e || this.height !== t || this.depth !== n) { this.width = e, this.height = t, this.depth = n; for (let s = 0, r = this.textures.length; s < r; s++)this.textures[s].image.width = e, this.textures[s].image.height = t, this.textures[s].image.depth = n; this.dispose() } this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t) } clone() { return new this.constructor().copy(this) } copy(e) { this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0; for (let n = 0, s = e.textures.length; n < s; n++)this.textures[n] = e.textures[n].clone(), this.textures[n].isRenderTargetTexture = !0; const t = Object.assign({}, e.texture.image); return this.texture.source = new Kd(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this } dispose() { this.dispatchEvent({ type: "dispose" }) } } class Cn extends A0 { constructor(e = 1, t = 1, n = {}) { super(e, t, n), this.isWebGLRenderTarget = !0 } } class $d extends wt { constructor(e = null, t = 1, n = 1, s = 1) { super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: s }, this.magFilter = Rt, this.minFilter = Rt, this.wrapR = An, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1 } } class w0 extends wt { constructor(e = null, t = 1, n = 1, s = 1) { super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: s }, this.magFilter = Rt, this.minFilter = Rt, this.wrapR = An, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1 } } class Pn { constructor(e = 0, t = 0, n = 0, s = 1) { this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = s } static slerpFlat(e, t, n, s, r, o, a) { let l = n[s + 0], c = n[s + 1], u = n[s + 2], h = n[s + 3]; const f = r[o + 0], d = r[o + 1], _ = r[o + 2], v = r[o + 3]; if (a === 0) { e[t + 0] = l, e[t + 1] = c, e[t + 2] = u, e[t + 3] = h; return } if (a === 1) { e[t + 0] = f, e[t + 1] = d, e[t + 2] = _, e[t + 3] = v; return } if (h !== v || l !== f || c !== d || u !== _) { let p = 1 - a; const m = l * f + c * d + u * _ + h * v, b = m >= 0 ? 1 : -1, y = 1 - m * m; if (y > Number.EPSILON) { const O = Math.sqrt(y), P = Math.atan2(O, m * b); p = Math.sin(p * P) / O, a = Math.sin(a * P) / O } const A = a * b; if (l = l * p + f * A, c = c * p + d * A, u = u * p + _ * A, h = h * p + v * A, p === 1 - a) { const O = 1 / Math.sqrt(l * l + c * c + u * u + h * h); l *= O, c *= O, u *= O, h *= O } } e[t] = l, e[t + 1] = c, e[t + 2] = u, e[t + 3] = h } static multiplyQuaternionsFlat(e, t, n, s, r, o) { const a = n[s], l = n[s + 1], c = n[s + 2], u = n[s + 3], h = r[o], f = r[o + 1], d = r[o + 2], _ = r[o + 3]; return e[t] = a * _ + u * h + l * d - c * f, e[t + 1] = l * _ + u * f + c * h - a * d, e[t + 2] = c * _ + u * d + a * f - l * h, e[t + 3] = u * _ - a * h - l * f - c * d, e } get x() { return this._x } set x(e) { this._x = e, this._onChangeCallback() } get y() { return this._y } set y(e) { this._y = e, this._onChangeCallback() } get z() { return this._z } set z(e) { this._z = e, this._onChangeCallback() } get w() { return this._w } set w(e) { this._w = e, this._onChangeCallback() } set(e, t, n, s) { return this._x = e, this._y = t, this._z = n, this._w = s, this._onChangeCallback(), this } clone() { return new this.constructor(this._x, this._y, this._z, this._w) } copy(e) { return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this } setFromEuler(e, t = !0) { const n = e._x, s = e._y, r = e._z, o = e._order, a = Math.cos, l = Math.sin, c = a(n / 2), u = a(s / 2), h = a(r / 2), f = l(n / 2), d = l(s / 2), _ = l(r / 2); switch (o) { case "XYZ": this._x = f * u * h + c * d * _, this._y = c * d * h - f * u * _, this._z = c * u * _ + f * d * h, this._w = c * u * h - f * d * _; break; case "YXZ": this._x = f * u * h + c * d * _, this._y = c * d * h - f * u * _, this._z = c * u * _ - f * d * h, this._w = c * u * h + f * d * _; break; case "ZXY": this._x = f * u * h - c * d * _, this._y = c * d * h + f * u * _, this._z = c * u * _ + f * d * h, this._w = c * u * h - f * d * _; break; case "ZYX": this._x = f * u * h - c * d * _, this._y = c * d * h + f * u * _, this._z = c * u * _ - f * d * h, this._w = c * u * h + f * d * _; break; case "YZX": this._x = f * u * h + c * d * _, this._y = c * d * h + f * u * _, this._z = c * u * _ - f * d * h, this._w = c * u * h - f * d * _; break; case "XZY": this._x = f * u * h - c * d * _, this._y = c * d * h - f * u * _, this._z = c * u * _ + f * d * h, this._w = c * u * h + f * d * _; break; default: console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o) }return t === !0 && this._onChangeCallback(), this } setFromAxisAngle(e, t) { const n = t / 2, s = Math.sin(n); return this._x = e.x * s, this._y = e.y * s, this._z = e.z * s, this._w = Math.cos(n), this._onChangeCallback(), this } setFromRotationMatrix(e) { const t = e.elements, n = t[0], s = t[4], r = t[8], o = t[1], a = t[5], l = t[9], c = t[2], u = t[6], h = t[10], f = n + a + h; if (f > 0) { const d = .5 / Math.sqrt(f + 1); this._w = .25 / d, this._x = (u - l) * d, this._y = (r - c) * d, this._z = (o - s) * d } else if (n > a && n > h) { const d = 2 * Math.sqrt(1 + n - a - h); this._w = (u - l) / d, this._x = .25 * d, this._y = (s + o) / d, this._z = (r + c) / d } else if (a > h) { const d = 2 * Math.sqrt(1 + a - n - h); this._w = (r - c) / d, this._x = (s + o) / d, this._y = .25 * d, this._z = (l + u) / d } else { const d = 2 * Math.sqrt(1 + h - n - a); this._w = (o - s) / d, this._x = (r + c) / d, this._y = (l + u) / d, this._z = .25 * d } return this._onChangeCallback(), this } setFromUnitVectors(e, t) { let n = e.dot(t) + 1; return n < Number.EPSILON ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize() } angleTo(e) { return 2 * Math.acos(Math.abs(bt(this.dot(e), -1, 1))) } rotateTowards(e, t) { const n = this.angleTo(e); if (n === 0) return this; const s = Math.min(1, t / n); return this.slerp(e, s), this } identity() { return this.set(0, 0, 0, 1) } invert() { return this.conjugate() } conjugate() { return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this } dot(e) { return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w } lengthSq() { return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w } length() { return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w) } normalize() { let e = this.length(); return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this } multiply(e) { return this.multiplyQuaternions(this, e) } premultiply(e) { return this.multiplyQuaternions(e, this) } multiplyQuaternions(e, t) { const n = e._x, s = e._y, r = e._z, o = e._w, a = t._x, l = t._y, c = t._z, u = t._w; return this._x = n * u + o * a + s * c - r * l, this._y = s * u + o * l + r * a - n * c, this._z = r * u + o * c + n * l - s * a, this._w = o * u - n * a - s * l - r * c, this._onChangeCallback(), this } slerp(e, t) { if (t === 0) return this; if (t === 1) return this.copy(e); const n = this._x, s = this._y, r = this._z, o = this._w; let a = o * e._w + n * e._x + s * e._y + r * e._z; if (a < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, a = -a) : this.copy(e), a >= 1) return this._w = o, this._x = n, this._y = s, this._z = r, this; const l = 1 - a * a; if (l <= Number.EPSILON) { const d = 1 - t; return this._w = d * o + t * this._w, this._x = d * n + t * this._x, this._y = d * s + t * this._y, this._z = d * r + t * this._z, this.normalize(), this } const c = Math.sqrt(l), u = Math.atan2(c, a), h = Math.sin((1 - t) * u) / c, f = Math.sin(t * u) / c; return this._w = o * h + this._w * f, this._x = n * h + this._x * f, this._y = s * h + this._y * f, this._z = r * h + this._z * f, this._onChangeCallback(), this } slerpQuaternions(e, t, n) { return this.copy(e).slerp(t, n) } random() { const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), s = Math.sqrt(1 - n), r = Math.sqrt(n); return this.set(s * Math.sin(e), s * Math.cos(e), r * Math.sin(t), r * Math.cos(t)) } equals(e) { return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w } fromArray(e, t = 0) { return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this } toArray(e = [], t = 0) { return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e } fromBufferAttribute(e, t) { return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this } toJSON() { return this.toArray() } _onChange(e) { return this._onChangeCallback = e, this } _onChangeCallback() { } *[Symbol.iterator]() { yield this._x, yield this._y, yield this._z, yield this._w } } class B { constructor(e = 0, t = 0, n = 0) { B.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = n } set(e, t, n) { return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this } setScalar(e) { return this.x = e, this.y = e, this.z = e, this } setX(e) { return this.x = e, this } setY(e) { return this.y = e, this } setZ(e) { return this.z = e, this } setComponent(e, t) { switch (e) { case 0: this.x = t; break; case 1: this.y = t; break; case 2: this.z = t; break; default: throw new Error("index is out of range: " + e) }return this } getComponent(e) { switch (e) { case 0: return this.x; case 1: return this.y; case 2: return this.z; default: throw new Error("index is out of range: " + e) } } clone() { return new this.constructor(this.x, this.y, this.z) } copy(e) { return this.x = e.x, this.y = e.y, this.z = e.z, this } add(e) { return this.x += e.x, this.y += e.y, this.z += e.z, this } addScalar(e) { return this.x += e, this.y += e, this.z += e, this } addVectors(e, t) { return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this } addScaledVector(e, t) { return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this } sub(e) { return this.x -= e.x, this.y -= e.y, this.z -= e.z, this } subScalar(e) { return this.x -= e, this.y -= e, this.z -= e, this } subVectors(e, t) { return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this } multiply(e) { return this.x *= e.x, this.y *= e.y, this.z *= e.z, this } multiplyScalar(e) { return this.x *= e, this.y *= e, this.z *= e, this } multiplyVectors(e, t) { return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this } applyEuler(e) { return this.applyQuaternion(dh.setFromEuler(e)) } applyAxisAngle(e, t) { return this.applyQuaternion(dh.setFromAxisAngle(e, t)) } applyMatrix3(e) { const t = this.x, n = this.y, s = this.z, r = e.elements; return this.x = r[0] * t + r[3] * n + r[6] * s, this.y = r[1] * t + r[4] * n + r[7] * s, this.z = r[2] * t + r[5] * n + r[8] * s, this } applyNormalMatrix(e) { return this.applyMatrix3(e).normalize() } applyMatrix4(e) { const t = this.x, n = this.y, s = this.z, r = e.elements, o = 1 / (r[3] * t + r[7] * n + r[11] * s + r[15]); return this.x = (r[0] * t + r[4] * n + r[8] * s + r[12]) * o, this.y = (r[1] * t + r[5] * n + r[9] * s + r[13]) * o, this.z = (r[2] * t + r[6] * n + r[10] * s + r[14]) * o, this } applyQuaternion(e) { const t = this.x, n = this.y, s = this.z, r = e.x, o = e.y, a = e.z, l = e.w, c = 2 * (o * s - a * n), u = 2 * (a * t - r * s), h = 2 * (r * n - o * t); return this.x = t + l * c + o * h - a * u, this.y = n + l * u + a * c - r * h, this.z = s + l * h + r * u - o * c, this } project(e) { return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix) } unproject(e) { return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld) } transformDirection(e) { const t = this.x, n = this.y, s = this.z, r = e.elements; return this.x = r[0] * t + r[4] * n + r[8] * s, this.y = r[1] * t + r[5] * n + r[9] * s, this.z = r[2] * t + r[6] * n + r[10] * s, this.normalize() } divide(e) { return this.x /= e.x, this.y /= e.y, this.z /= e.z, this } divideScalar(e) { return this.multiplyScalar(1 / e) } min(e) { return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this } max(e) { return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this } clamp(e, t) { return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this } clampScalar(e, t) { return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this } clampLength(e, t) { const n = this.length(); return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n))) } floor() { return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this } ceil() { return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this } round() { return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this } roundToZero() { return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this } negate() { return this.x = -this.x, this.y = -this.y, this.z = -this.z, this } dot(e) { return this.x * e.x + this.y * e.y + this.z * e.z } lengthSq() { return this.x * this.x + this.y * this.y + this.z * this.z } length() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z) } manhattanLength() { return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) } normalize() { return this.divideScalar(this.length() || 1) } setLength(e) { return this.normalize().multiplyScalar(e) } lerp(e, t) { return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this } lerpVectors(e, t, n) { return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this } cross(e) { return this.crossVectors(this, e) } crossVectors(e, t) { const n = e.x, s = e.y, r = e.z, o = t.x, a = t.y, l = t.z; return this.x = s * l - r * a, this.y = r * o - n * l, this.z = n * a - s * o, this } projectOnVector(e) { const t = e.lengthSq(); if (t === 0) return this.set(0, 0, 0); const n = e.dot(this) / t; return this.copy(e).multiplyScalar(n) } projectOnPlane(e) { return Xa.copy(this).projectOnVector(e), this.sub(Xa) } reflect(e) { return this.sub(Xa.copy(e).multiplyScalar(2 * this.dot(e))) } angleTo(e) { const t = Math.sqrt(this.lengthSq() * e.lengthSq()); if (t === 0) return Math.PI / 2; const n = this.dot(e) / t; return Math.acos(bt(n, -1, 1)) } distanceTo(e) { return Math.sqrt(this.distanceToSquared(e)) } distanceToSquared(e) { const t = this.x - e.x, n = this.y - e.y, s = this.z - e.z; return t * t + n * n + s * s } manhattanDistanceTo(e) { return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z) } setFromSpherical(e) { return this.setFromSphericalCoords(e.radius, e.phi, e.theta) } setFromSphericalCoords(e, t, n) { const s = Math.sin(t) * e; return this.x = s * Math.sin(n), this.y = Math.cos(t) * e, this.z = s * Math.cos(n), this } setFromCylindrical(e) { return this.setFromCylindricalCoords(e.radius, e.theta, e.y) } setFromCylindricalCoords(e, t, n) { return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this } setFromMatrixPosition(e) { const t = e.elements; return this.x = t[12], this.y = t[13], this.z = t[14], this } setFromMatrixScale(e) { const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), s = this.setFromMatrixColumn(e, 2).length(); return this.x = t, this.y = n, this.z = s, this } setFromMatrixColumn(e, t) { return this.fromArray(e.elements, t * 4) } setFromMatrix3Column(e, t) { return this.fromArray(e.elements, t * 3) } setFromEuler(e) { return this.x = e._x, this.y = e._y, this.z = e._z, this } setFromColor(e) { return this.x = e.r, this.y = e.g, this.z = e.b, this } equals(e) { return e.x === this.x && e.y === this.y && e.z === this.z } fromArray(e, t = 0) { return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this } toArray(e = [], t = 0) { return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e } fromBufferAttribute(e, t) { return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this } random() { return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this } randomDirection() { const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t); return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this } *[Symbol.iterator]() { yield this.x, yield this.y, yield this.z } } const Xa = new B, dh = new Pn; class Kn { constructor(e = new B(1 / 0, 1 / 0, 1 / 0), t = new B(-1 / 0, -1 / 0, -1 / 0)) { this.isBox3 = !0, this.min = e, this.max = t } set(e, t) { return this.min.copy(e), this.max.copy(t), this } setFromArray(e) { this.makeEmpty(); for (let t = 0, n = e.length; t < n; t += 3)this.expandByPoint(ln.fromArray(e, t)); return this } setFromBufferAttribute(e) { this.makeEmpty(); for (let t = 0, n = e.count; t < n; t++)this.expandByPoint(ln.fromBufferAttribute(e, t)); return this } setFromPoints(e) { this.makeEmpty(); for (let t = 0, n = e.length; t < n; t++)this.expandByPoint(e[t]); return this } setFromCenterAndSize(e, t) { const n = ln.copy(t).multiplyScalar(.5); return this.min.copy(e).sub(n), this.max.copy(e).add(n), this } setFromObject(e, t = !1) { return this.makeEmpty(), this.expandByObject(e, t) } clone() { return new this.constructor().copy(this) } copy(e) { return this.min.copy(e.min), this.max.copy(e.max), this } makeEmpty() { return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this } isEmpty() { return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z } getCenter(e) { return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5) } getSize(e) { return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min) } expandByPoint(e) { return this.min.min(e), this.max.max(e), this } expandByVector(e) { return this.min.sub(e), this.max.add(e), this } expandByScalar(e) { return this.min.addScalar(-e), this.max.addScalar(e), this } expandByObject(e, t = !1) { e.updateWorldMatrix(!1, !1); const n = e.geometry; if (n !== void 0) { const r = n.getAttribute("position"); if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0) for (let o = 0, a = r.count; o < a; o++)e.isMesh === !0 ? e.getVertexPosition(o, ln) : ln.fromBufferAttribute(r, o), ln.applyMatrix4(e.matrixWorld), this.expandByPoint(ln); else e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), Zr.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Zr.copy(n.boundingBox)), Zr.applyMatrix4(e.matrixWorld), this.union(Zr) } const s = e.children; for (let r = 0, o = s.length; r < o; r++)this.expandByObject(s[r], t); return this } containsPoint(e) { return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z) } containsBox(e) { return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z } getParameter(e, t) { return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z)) } intersectsBox(e) { return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z) } intersectsSphere(e) { return this.clampPoint(e.center, ln), ln.distanceToSquared(e.center) <= e.radius * e.radius } intersectsPlane(e) { let t, n; return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant } intersectsTriangle(e) { if (this.isEmpty()) return !1; this.getCenter(ir), Jr.subVectors(this.max, ir), os.subVectors(e.a, ir), as.subVectors(e.b, ir), ls.subVectors(e.c, ir), ni.subVectors(as, os), ii.subVectors(ls, as), Ni.subVectors(os, ls); let t = [0, -ni.z, ni.y, 0, -ii.z, ii.y, 0, -Ni.z, Ni.y, ni.z, 0, -ni.x, ii.z, 0, -ii.x, Ni.z, 0, -Ni.x, -ni.y, ni.x, 0, -ii.y, ii.x, 0, -Ni.y, Ni.x, 0]; return !ja(t, os, as, ls, Jr) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !ja(t, os, as, ls, Jr)) ? !1 : (Qr.crossVectors(ni, ii), t = [Qr.x, Qr.y, Qr.z], ja(t, os, as, ls, Jr)) } clampPoint(e, t) { return t.copy(e).clamp(this.min, this.max) } distanceToPoint(e) { return this.clampPoint(e, ln).distanceTo(e) } getBoundingSphere(e) { return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(ln).length() * .5), e } intersect(e) { return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this } union(e) { return this.min.min(e.min), this.max.max(e.max), this } applyMatrix4(e) { return this.isEmpty() ? this : (Un[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Un[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Un[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Un[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Un[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Un[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Un[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Un[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Un), this) } translate(e) { return this.min.add(e), this.max.add(e), this } equals(e) { return e.min.equals(this.min) && e.max.equals(this.max) } } const Un = [new B, new B, new B, new B, new B, new B, new B, new B], ln = new B, Zr = new Kn, os = new B, as = new B, ls = new B, ni = new B, ii = new B, Ni = new B, ir = new B, Jr = new B, Qr = new B, Ui = new B; function ja(i, e, t, n, s) { for (let r = 0, o = i.length - 3; r <= o; r += 3) { Ui.fromArray(i, r); const a = s.x * Math.abs(Ui.x) + s.y * Math.abs(Ui.y) + s.z * Math.abs(Ui.z), l = e.dot(Ui), c = t.dot(Ui), u = n.dot(Ui); if (Math.max(-Math.max(l, c, u), Math.min(l, c, u)) > a) return !1 } return !0 } const R0 = new Kn, sr = new B, Ya = new B; class In { constructor(e = new B, t = -1) { this.isSphere = !0, this.center = e, this.radius = t } set(e, t) { return this.center.copy(e), this.radius = t, this } setFromPoints(e, t) { const n = this.center; t !== void 0 ? n.copy(t) : R0.setFromPoints(e).getCenter(n); let s = 0; for (let r = 0, o = e.length; r < o; r++)s = Math.max(s, n.distanceToSquared(e[r])); return this.radius = Math.sqrt(s), this } copy(e) { return this.center.copy(e.center), this.radius = e.radius, this } isEmpty() { return this.radius < 0 } makeEmpty() { return this.center.set(0, 0, 0), this.radius = -1, this } containsPoint(e) { return e.distanceToSquared(this.center) <= this.radius * this.radius } distanceToPoint(e) { return e.distanceTo(this.center) - this.radius } intersectsSphere(e) { const t = this.radius + e.radius; return e.center.distanceToSquared(this.center) <= t * t } intersectsBox(e) { return e.intersectsSphere(this) } intersectsPlane(e) { return Math.abs(e.distanceToPoint(this.center)) <= this.radius } clampPoint(e, t) { const n = this.center.distanceToSquared(e); return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t } getBoundingBox(e) { return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e) } applyMatrix4(e) { return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this } translate(e) { return this.center.add(e), this } expandByPoint(e) { if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this; sr.subVectors(e, this.center); const t = sr.lengthSq(); if (t > this.radius * this.radius) { const n = Math.sqrt(t), s = (n - this.radius) * .5; this.center.addScaledVector(sr, s / n), this.radius += s } return this } union(e) { return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Ya.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(sr.copy(e.center).add(Ya)), this.expandByPoint(sr.copy(e.center).sub(Ya))), this) } equals(e) { return e.center.equals(this.center) && e.radius === this.radius } clone() { return new this.constructor().copy(this) } } const On = new B, qa = new B, eo = new B, si = new B, Ka = new B, to = new B, $a = new B; class $s { constructor(e = new B, t = new B(0, 0, -1)) { this.origin = e, this.direction = t } set(e, t) { return this.origin.copy(e), this.direction.copy(t), this } copy(e) { return this.origin.copy(e.origin), this.direction.copy(e.direction), this } at(e, t) { return t.copy(this.origin).addScaledVector(this.direction, e) } lookAt(e) { return this.direction.copy(e).sub(this.origin).normalize(), this } recast(e) { return this.origin.copy(this.at(e, On)), this } closestPointToPoint(e, t) { t.subVectors(e, this.origin); const n = t.dot(this.direction); return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n) } distanceToPoint(e) { return Math.sqrt(this.distanceSqToPoint(e)) } distanceSqToPoint(e) { const t = On.subVectors(e, this.origin).dot(this.direction); return t < 0 ? this.origin.distanceToSquared(e) : (On.copy(this.origin).addScaledVector(this.direction, t), On.distanceToSquared(e)) } distanceSqToSegment(e, t, n, s) { qa.copy(e).add(t).multiplyScalar(.5), eo.copy(t).sub(e).normalize(), si.copy(this.origin).sub(qa); const r = e.distanceTo(t) * .5, o = -this.direction.dot(eo), a = si.dot(this.direction), l = -si.dot(eo), c = si.lengthSq(), u = Math.abs(1 - o * o); let h, f, d, _; if (u > 0) if (h = o * l - a, f = o * a - l, _ = r * u, h >= 0) if (f >= -_) if (f <= _) { const v = 1 / u; h *= v, f *= v, d = h * (h + o * f + 2 * a) + f * (o * h + f + 2 * l) + c } else f = r, h = Math.max(0, -(o * f + a)), d = -h * h + f * (f + 2 * l) + c; else f = -r, h = Math.max(0, -(o * f + a)), d = -h * h + f * (f + 2 * l) + c; else f <= -_ ? (h = Math.max(0, -(-o * r + a)), f = h > 0 ? -r : Math.min(Math.max(-r, -l), r), d = -h * h + f * (f + 2 * l) + c) : f <= _ ? (h = 0, f = Math.min(Math.max(-r, -l), r), d = f * (f + 2 * l) + c) : (h = Math.max(0, -(o * r + a)), f = h > 0 ? r : Math.min(Math.max(-r, -l), r), d = -h * h + f * (f + 2 * l) + c); else f = o > 0 ? -r : r, h = Math.max(0, -(o * f + a)), d = -h * h + f * (f + 2 * l) + c; return n && n.copy(this.origin).addScaledVector(this.direction, h), s && s.copy(qa).addScaledVector(eo, f), d } intersectSphere(e, t) { On.subVectors(e.center, this.origin); const n = On.dot(this.direction), s = On.dot(On) - n * n, r = e.radius * e.radius; if (s > r) return null; const o = Math.sqrt(r - s), a = n - o, l = n + o; return l < 0 ? null : a < 0 ? this.at(l, t) : this.at(a, t) } intersectsSphere(e) { return this.distanceSqToPoint(e.center) <= e.radius * e.radius } distanceToPlane(e) { const t = e.normal.dot(this.direction); if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null; const n = -(this.origin.dot(e.normal) + e.constant) / t; return n >= 0 ? n : null } intersectPlane(e, t) { const n = this.distanceToPlane(e); return n === null ? null : this.at(n, t) } intersectsPlane(e) { const t = e.distanceToPoint(this.origin); return t === 0 || e.normal.dot(this.direction) * t < 0 } intersectBox(e, t) { let n, s, r, o, a, l; const c = 1 / this.direction.x, u = 1 / this.direction.y, h = 1 / this.direction.z, f = this.origin; return c >= 0 ? (n = (e.min.x - f.x) * c, s = (e.max.x - f.x) * c) : (n = (e.max.x - f.x) * c, s = (e.min.x - f.x) * c), u >= 0 ? (r = (e.min.y - f.y) * u, o = (e.max.y - f.y) * u) : (r = (e.max.y - f.y) * u, o = (e.min.y - f.y) * u), n > o || r > s || ((r > n || isNaN(n)) && (n = r), (o < s || isNaN(s)) && (s = o), h >= 0 ? (a = (e.min.z - f.z) * h, l = (e.max.z - f.z) * h) : (a = (e.max.z - f.z) * h, l = (e.min.z - f.z) * h), n > l || a > s) || ((a > n || n !== n) && (n = a), (l < s || s !== s) && (s = l), s < 0) ? null : this.at(n >= 0 ? n : s, t) } intersectsBox(e) { return this.intersectBox(e, On) !== null } intersectTriangle(e, t, n, s, r) { Ka.subVectors(t, e), to.subVectors(n, e), $a.crossVectors(Ka, to); let o = this.direction.dot($a), a; if (o > 0) { if (s) return null; a = 1 } else if (o < 0) a = -1, o = -o; else return null; si.subVectors(this.origin, e); const l = a * this.direction.dot(to.crossVectors(si, to)); if (l < 0) return null; const c = a * this.direction.dot(Ka.cross(si)); if (c < 0 || l + c > o) return null; const u = -a * si.dot($a); return u < 0 ? null : this.at(u / o, r) } applyMatrix4(e) { return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this } equals(e) { return e.origin.equals(this.origin) && e.direction.equals(this.direction) } clone() { return new this.constructor().copy(this) } } class Oe { constructor(e, t, n, s, r, o, a, l, c, u, h, f, d, _, v, p) { Oe.prototype.isMatrix4 = !0, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], e !== void 0 && this.set(e, t, n, s, r, o, a, l, c, u, h, f, d, _, v, p) } set(e, t, n, s, r, o, a, l, c, u, h, f, d, _, v, p) { const m = this.elements; return m[0] = e, m[4] = t, m[8] = n, m[12] = s, m[1] = r, m[5] = o, m[9] = a, m[13] = l, m[2] = c, m[6] = u, m[10] = h, m[14] = f, m[3] = d, m[7] = _, m[11] = v, m[15] = p, this } identity() { return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this } clone() { return new Oe().fromArray(this.elements) } copy(e) { const t = this.elements, n = e.elements; return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this } copyPosition(e) { const t = this.elements, n = e.elements; return t[12] = n[12], t[13] = n[13], t[14] = n[14], this } setFromMatrix3(e) { const t = e.elements; return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this } extractBasis(e, t, n) { return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this } makeBasis(e, t, n) { return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this } extractRotation(e) { const t = this.elements, n = e.elements, s = 1 / cs.setFromMatrixColumn(e, 0).length(), r = 1 / cs.setFromMatrixColumn(e, 1).length(), o = 1 / cs.setFromMatrixColumn(e, 2).length(); return t[0] = n[0] * s, t[1] = n[1] * s, t[2] = n[2] * s, t[3] = 0, t[4] = n[4] * r, t[5] = n[5] * r, t[6] = n[6] * r, t[7] = 0, t[8] = n[8] * o, t[9] = n[9] * o, t[10] = n[10] * o, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this } makeRotationFromEuler(e) { const t = this.elements, n = e.x, s = e.y, r = e.z, o = Math.cos(n), a = Math.sin(n), l = Math.cos(s), c = Math.sin(s), u = Math.cos(r), h = Math.sin(r); if (e.order === "XYZ") { const f = o * u, d = o * h, _ = a * u, v = a * h; t[0] = l * u, t[4] = -l * h, t[8] = c, t[1] = d + _ * c, t[5] = f - v * c, t[9] = -a * l, t[2] = v - f * c, t[6] = _ + d * c, t[10] = o * l } else if (e.order === "YXZ") { const f = l * u, d = l * h, _ = c * u, v = c * h; t[0] = f + v * a, t[4] = _ * a - d, t[8] = o * c, t[1] = o * h, t[5] = o * u, t[9] = -a, t[2] = d * a - _, t[6] = v + f * a, t[10] = o * l } else if (e.order === "ZXY") { const f = l * u, d = l * h, _ = c * u, v = c * h; t[0] = f - v * a, t[4] = -o * h, t[8] = _ + d * a, t[1] = d + _ * a, t[5] = o * u, t[9] = v - f * a, t[2] = -o * c, t[6] = a, t[10] = o * l } else if (e.order === "ZYX") { const f = o * u, d = o * h, _ = a * u, v = a * h; t[0] = l * u, t[4] = _ * c - d, t[8] = f * c + v, t[1] = l * h, t[5] = v * c + f, t[9] = d * c - _, t[2] = -c, t[6] = a * l, t[10] = o * l } else if (e.order === "YZX") { const f = o * l, d = o * c, _ = a * l, v = a * c; t[0] = l * u, t[4] = v - f * h, t[8] = _ * h + d, t[1] = h, t[5] = o * u, t[9] = -a * u, t[2] = -c * u, t[6] = d * h + _, t[10] = f - v * h } else if (e.order === "XZY") { const f = o * l, d = o * c, _ = a * l, v = a * c; t[0] = l * u, t[4] = -h, t[8] = c * u, t[1] = f * h + v, t[5] = o * u, t[9] = d * h - _, t[2] = _ * h - d, t[6] = a * u, t[10] = v * h + f } return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this } makeRotationFromQuaternion(e) { return this.compose(C0, e, P0) } lookAt(e, t, n) { const s = this.elements; return $t.subVectors(e, t), $t.lengthSq() === 0 && ($t.z = 1), $t.normalize(), ri.crossVectors(n, $t), ri.lengthSq() === 0 && (Math.abs(n.z) === 1 ? $t.x += 1e-4 : $t.z += 1e-4, $t.normalize(), ri.crossVectors(n, $t)), ri.normalize(), no.crossVectors($t, ri), s[0] = ri.x, s[4] = no.x, s[8] = $t.x, s[1] = ri.y, s[5] = no.y, s[9] = $t.y, s[2] = ri.z, s[6] = no.z, s[10] = $t.z, this } multiply(e) { return this.multiplyMatrices(this, e) } premultiply(e) { return this.multiplyMatrices(e, this) } multiplyMatrices(e, t) { const n = e.elements, s = t.elements, r = this.elements, o = n[0], a = n[4], l = n[8], c = n[12], u = n[1], h = n[5], f = n[9], d = n[13], _ = n[2], v = n[6], p = n[10], m = n[14], b = n[3], y = n[7], A = n[11], O = n[15], P = s[0], R = s[4], L = s[8], S = s[12], M = s[1], D = s[5], I = s[9], C = s[13], z = s[2], Y = s[6], X = s[10], ee = s[14], G = s[3], ne = s[7], oe = s[11], pe = s[15]; return r[0] = o * P + a * M + l * z + c * G, r[4] = o * R + a * D + l * Y + c * ne, r[8] = o * L + a * I + l * X + c * oe, r[12] = o * S + a * C + l * ee + c * pe, r[1] = u * P + h * M + f * z + d * G, r[5] = u * R + h * D + f * Y + d * ne, r[9] = u * L + h * I + f * X + d * oe, r[13] = u * S + h * C + f * ee + d * pe, r[2] = _ * P + v * M + p * z + m * G, r[6] = _ * R + v * D + p * Y + m * ne, r[10] = _ * L + v * I + p * X + m * oe, r[14] = _ * S + v * C + p * ee + m * pe, r[3] = b * P + y * M + A * z + O * G, r[7] = b * R + y * D + A * Y + O * ne, r[11] = b * L + y * I + A * X + O * oe, r[15] = b * S + y * C + A * ee + O * pe, this } multiplyScalar(e) { const t = this.elements; return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this } determinant() { const e = this.elements, t = e[0], n = e[4], s = e[8], r = e[12], o = e[1], a = e[5], l = e[9], c = e[13], u = e[2], h = e[6], f = e[10], d = e[14], _ = e[3], v = e[7], p = e[11], m = e[15]; return _ * (+r * l * h - s * c * h - r * a * f + n * c * f + s * a * d - n * l * d) + v * (+t * l * d - t * c * f + r * o * f - s * o * d + s * c * u - r * l * u) + p * (+t * c * h - t * a * d - r * o * h + n * o * d + r * a * u - n * c * u) + m * (-s * a * u - t * l * h + t * a * f + s * o * h - n * o * f + n * l * u) } transpose() { const e = this.elements; let t; return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this } setPosition(e, t, n) { const s = this.elements; return e.isVector3 ? (s[12] = e.x, s[13] = e.y, s[14] = e.z) : (s[12] = e, s[13] = t, s[14] = n), this } invert() { const e = this.elements, t = e[0], n = e[1], s = e[2], r = e[3], o = e[4], a = e[5], l = e[6], c = e[7], u = e[8], h = e[9], f = e[10], d = e[11], _ = e[12], v = e[13], p = e[14], m = e[15], b = h * p * c - v * f * c + v * l * d - a * p * d - h * l * m + a * f * m, y = _ * f * c - u * p * c - _ * l * d + o * p * d + u * l * m - o * f * m, A = u * v * c - _ * h * c + _ * a * d - o * v * d - u * a * m + o * h * m, O = _ * h * l - u * v * l - _ * a * f + o * v * f + u * a * p - o * h * p, P = t * b + n * y + s * A + r * O; if (P === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0); const R = 1 / P; return e[0] = b * R, e[1] = (v * f * r - h * p * r - v * s * d + n * p * d + h * s * m - n * f * m) * R, e[2] = (a * p * r - v * l * r + v * s * c - n * p * c - a * s * m + n * l * m) * R, e[3] = (h * l * r - a * f * r - h * s * c + n * f * c + a * s * d - n * l * d) * R, e[4] = y * R, e[5] = (u * p * r - _ * f * r + _ * s * d - t * p * d - u * s * m + t * f * m) * R, e[6] = (_ * l * r - o * p * r - _ * s * c + t * p * c + o * s * m - t * l * m) * R, e[7] = (o * f * r - u * l * r + u * s * c - t * f * c - o * s * d + t * l * d) * R, e[8] = A * R, e[9] = (_ * h * r - u * v * r - _ * n * d + t * v * d + u * n * m - t * h * m) * R, e[10] = (o * v * r - _ * a * r + _ * n * c - t * v * c - o * n * m + t * a * m) * R, e[11] = (u * a * r - o * h * r - u * n * c + t * h * c + o * n * d - t * a * d) * R, e[12] = O * R, e[13] = (u * v * s - _ * h * s + _ * n * f - t * v * f - u * n * p + t * h * p) * R, e[14] = (_ * a * s - o * v * s - _ * n * l + t * v * l + o * n * p - t * a * p) * R, e[15] = (o * h * s - u * a * s + u * n * l - t * h * l - o * n * f + t * a * f) * R, this } scale(e) { const t = this.elements, n = e.x, s = e.y, r = e.z; return t[0] *= n, t[4] *= s, t[8] *= r, t[1] *= n, t[5] *= s, t[9] *= r, t[2] *= n, t[6] *= s, t[10] *= r, t[3] *= n, t[7] *= s, t[11] *= r, this } getMaxScaleOnAxis() { const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], s = e[8] * e[8] + e[9] * e[9] + e[10] * e[10]; return Math.sqrt(Math.max(t, n, s)) } makeTranslation(e, t, n) { return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this } makeRotationX(e) { const t = Math.cos(e), n = Math.sin(e); return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this } makeRotationY(e) { const t = Math.cos(e), n = Math.sin(e); return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this } makeRotationZ(e) { const t = Math.cos(e), n = Math.sin(e); return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this } makeRotationAxis(e, t) { const n = Math.cos(t), s = Math.sin(t), r = 1 - n, o = e.x, a = e.y, l = e.z, c = r * o, u = r * a; return this.set(c * o + n, c * a - s * l, c * l + s * a, 0, c * a + s * l, u * a + n, u * l - s * o, 0, c * l - s * a, u * l + s * o, r * l * l + n, 0, 0, 0, 0, 1), this } makeScale(e, t, n) { return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this } makeShear(e, t, n, s, r, o) { return this.set(1, n, r, 0, e, 1, o, 0, t, s, 1, 0, 0, 0, 0, 1), this } compose(e, t, n) { const s = this.elements, r = t._x, o = t._y, a = t._z, l = t._w, c = r + r, u = o + o, h = a + a, f = r * c, d = r * u, _ = r * h, v = o * u, p = o * h, m = a * h, b = l * c, y = l * u, A = l * h, O = n.x, P = n.y, R = n.z; return s[0] = (1 - (v + m)) * O, s[1] = (d + A) * O, s[2] = (_ - y) * O, s[3] = 0, s[4] = (d - A) * P, s[5] = (1 - (f + m)) * P, s[6] = (p + b) * P, s[7] = 0, s[8] = (_ + y) * R, s[9] = (p - b) * R, s[10] = (1 - (f + v)) * R, s[11] = 0, s[12] = e.x, s[13] = e.y, s[14] = e.z, s[15] = 1, this } decompose(e, t, n) { const s = this.elements; let r = cs.set(s[0], s[1], s[2]).length(); const o = cs.set(s[4], s[5], s[6]).length(), a = cs.set(s[8], s[9], s[10]).length(); this.determinant() < 0 && (r = -r), e.x = s[12], e.y = s[13], e.z = s[14], cn.copy(this); const c = 1 / r, u = 1 / o, h = 1 / a; return cn.elements[0] *= c, cn.elements[1] *= c, cn.elements[2] *= c, cn.elements[4] *= u, cn.elements[5] *= u, cn.elements[6] *= u, cn.elements[8] *= h, cn.elements[9] *= h, cn.elements[10] *= h, t.setFromRotationMatrix(cn), n.x = r, n.y = o, n.z = a, this } makePerspective(e, t, n, s, r, o, a = Xn) { const l = this.elements, c = 2 * r / (t - e), u = 2 * r / (n - s), h = (t + e) / (t - e), f = (n + s) / (n - s); let d, _; if (a === Xn) d = -(o + r) / (o - r), _ = -2 * o * r / (o - r); else if (a === Qo) d = -o / (o - r), _ = -o * r / (o - r); else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a); return l[0] = c, l[4] = 0, l[8] = h, l[12] = 0, l[1] = 0, l[5] = u, l[9] = f, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = d, l[14] = _, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this } makeOrthographic(e, t, n, s, r, o, a = Xn) { const l = this.elements, c = 1 / (t - e), u = 1 / (n - s), h = 1 / (o - r), f = (t + e) * c, d = (n + s) * u; let _, v; if (a === Xn) _ = (o + r) * h, v = -2 * h; else if (a === Qo) _ = r * h, v = -1 * h; else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a); return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -f, l[1] = 0, l[5] = 2 * u, l[9] = 0, l[13] = -d, l[2] = 0, l[6] = 0, l[10] = v, l[14] = -_, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this } equals(e) { const t = this.elements, n = e.elements; for (let s = 0; s < 16; s++)if (t[s] !== n[s]) return !1; return !0 } fromArray(e, t = 0) { for (let n = 0; n < 16; n++)this.elements[n] = e[n + t]; return this } toArray(e = [], t = 0) { const n = this.elements; return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e } } const cs = new B, cn = new Oe, C0 = new B(0, 0, 0), P0 = new B(1, 1, 1), ri = new B, no = new B, $t = new B, ph = new Oe, mh = new Pn; class Ln { constructor(e = 0, t = 0, n = 0, s = Ln.DEFAULT_ORDER) { this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = s } get x() { return this._x } set x(e) { this._x = e, this._onChangeCallback() } get y() { return this._y } set y(e) { this._y = e, this._onChangeCallback() } get z() { return this._z } set z(e) { this._z = e, this._onChangeCallback() } get order() { return this._order } set order(e) { this._order = e, this._onChangeCallback() } set(e, t, n, s = this._order) { return this._x = e, this._y = t, this._z = n, this._order = s, this._onChangeCallback(), this } clone() { return new this.constructor(this._x, this._y, this._z, this._order) } copy(e) { return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this } setFromRotationMatrix(e, t = this._order, n = !0) { const s = e.elements, r = s[0], o = s[4], a = s[8], l = s[1], c = s[5], u = s[9], h = s[2], f = s[6], d = s[10]; switch (t) { case "XYZ": this._y = Math.asin(bt(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(-u, d), this._z = Math.atan2(-o, r)) : (this._x = Math.atan2(f, c), this._z = 0); break; case "YXZ": this._x = Math.asin(-bt(u, -1, 1)), Math.abs(u) < .9999999 ? (this._y = Math.atan2(a, d), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-h, r), this._z = 0); break; case "ZXY": this._x = Math.asin(bt(f, -1, 1)), Math.abs(f) < .9999999 ? (this._y = Math.atan2(-h, d), this._z = Math.atan2(-o, c)) : (this._y = 0, this._z = Math.atan2(l, r)); break; case "ZYX": this._y = Math.asin(-bt(h, -1, 1)), Math.abs(h) < .9999999 ? (this._x = Math.atan2(f, d), this._z = Math.atan2(l, r)) : (this._x = 0, this._z = Math.atan2(-o, c)); break; case "YZX": this._z = Math.asin(bt(l, -1, 1)), Math.abs(l) < .9999999 ? (this._x = Math.atan2(-u, c), this._y = Math.atan2(-h, r)) : (this._x = 0, this._y = Math.atan2(a, d)); break; case "XZY": this._z = Math.asin(-bt(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(f, c), this._y = Math.atan2(a, r)) : (this._x = Math.atan2(-u, d), this._y = 0); break; default: console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t) }return this._order = t, n === !0 && this._onChangeCallback(), this } setFromQuaternion(e, t, n) { return ph.makeRotationFromQuaternion(e), this.setFromRotationMatrix(ph, t, n) } setFromVector3(e, t = this._order) { return this.set(e.x, e.y, e.z, t) } reorder(e) { return mh.setFromEuler(this), this.setFromQuaternion(mh, e) } equals(e) { return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order } fromArray(e) { return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this } toArray(e = [], t = 0) { return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e } _onChange(e) { return this._onChangeCallback = e, this } _onChangeCallback() { } *[Symbol.iterator]() { yield this._x, yield this._y, yield this._z, yield this._order } } Ln.DEFAULT_ORDER = "XYZ"; class Rc { constructor() { this.mask = 1 } set(e) { this.mask = (1 << e | 0) >>> 0 } enable(e) { this.mask |= 1 << e | 0 } enableAll() { this.mask = -1 } toggle(e) { this.mask ^= 1 << e | 0 } disable(e) { this.mask &= ~(1 << e | 0) } disableAll() { this.mask = 0 } test(e) { return (this.mask & e.mask) !== 0 } isEnabled(e) { return (this.mask & (1 << e | 0)) !== 0 } } let L0 = 0; const gh = new B, us = new Pn, Fn = new Oe, io = new B, rr = new B, I0 = new B, D0 = new Pn, _h = new B(1, 0, 0), xh = new B(0, 1, 0), vh = new B(0, 0, 1), Mh = { type: "added" }, N0 = { type: "removed" }, hs = { type: "childadded", child: null }, Za = { type: "childremoved", child: null }; class ot extends es { constructor() { super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: L0++ }), this.uuid = vn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ot.DEFAULT_UP.clone(); const e = new B, t = new Ln, n = new Pn, s = new B(1, 1, 1); function r() { n.setFromEuler(t, !1) } function o() { t.setFromQuaternion(n, void 0, !1) } t._onChange(r), n._onChange(o), Object.defineProperties(this, { position: { configurable: !0, enumerable: !0, value: e }, rotation: { configurable: !0, enumerable: !0, value: t }, quaternion: { configurable: !0, enumerable: !0, value: n }, scale: { configurable: !0, enumerable: !0, value: s }, modelViewMatrix: { value: new Oe }, normalMatrix: { value: new We } }), this.matrix = new Oe, this.matrixWorld = new Oe, this.matrixAutoUpdate = ot.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Rc, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {} } onBeforeShadow() { } onAfterShadow() { } onBeforeRender() { } onAfterRender() { } applyMatrix4(e) { this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale) } applyQuaternion(e) { return this.quaternion.premultiply(e), this } setRotationFromAxisAngle(e, t) { this.quaternion.setFromAxisAngle(e, t) } setRotationFromEuler(e) { this.quaternion.setFromEuler(e, !0) } setRotationFromMatrix(e) { this.quaternion.setFromRotationMatrix(e) } setRotationFromQuaternion(e) { this.quaternion.copy(e) } rotateOnAxis(e, t) { return us.setFromAxisAngle(e, t), this.quaternion.multiply(us), this } rotateOnWorldAxis(e, t) { return us.setFromAxisAngle(e, t), this.quaternion.premultiply(us), this } rotateX(e) { return this.rotateOnAxis(_h, e) } rotateY(e) { return this.rotateOnAxis(xh, e) } rotateZ(e) { return this.rotateOnAxis(vh, e) } translateOnAxis(e, t) { return gh.copy(e).applyQuaternion(this.quaternion), this.position.add(gh.multiplyScalar(t)), this } translateX(e) { return this.translateOnAxis(_h, e) } translateY(e) { return this.translateOnAxis(xh, e) } translateZ(e) { return this.translateOnAxis(vh, e) } localToWorld(e) { return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld) } worldToLocal(e) { return this.updateWorldMatrix(!0, !1), e.applyMatrix4(Fn.copy(this.matrixWorld).invert()) } lookAt(e, t, n) { e.isVector3 ? io.copy(e) : io.set(e, t, n); const s = this.parent; this.updateWorldMatrix(!0, !1), rr.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Fn.lookAt(rr, io, this.up) : Fn.lookAt(io, rr, this.up), this.quaternion.setFromRotationMatrix(Fn), s && (Fn.extractRotation(s.matrixWorld), us.setFromRotationMatrix(Fn), this.quaternion.premultiply(us.invert())) } add(e) { if (arguments.length > 1) { for (let t = 0; t < arguments.length; t++)this.add(arguments[t]); return this } return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(Mh), hs.child = e, this.dispatchEvent(hs), hs.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this) } remove(e) { if (arguments.length > 1) { for (let n = 0; n < arguments.length; n++)this.remove(arguments[n]); return this } const t = this.children.indexOf(e); return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(N0), Za.child = e, this.dispatchEvent(Za), Za.child = null), this } removeFromParent() { const e = this.parent; return e !== null && e.remove(this), this } clear() { return this.remove(...this.children) } attach(e) { return this.updateWorldMatrix(!0, !1), Fn.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Fn.multiply(e.parent.matrixWorld)), e.applyMatrix4(Fn), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(Mh), hs.child = e, this.dispatchEvent(hs), hs.child = null, this } getObjectById(e) { return this.getObjectByProperty("id", e) } getObjectByName(e) { return this.getObjectByProperty("name", e) } getObjectByProperty(e, t) { if (this[e] === t) return this; for (let n = 0, s = this.children.length; n < s; n++) { const o = this.children[n].getObjectByProperty(e, t); if (o !== void 0) return o } } getObjectsByProperty(e, t, n = []) { this[e] === t && n.push(this); const s = this.children; for (let r = 0, o = s.length; r < o; r++)s[r].getObjectsByProperty(e, t, n); return n } getWorldPosition(e) { return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld) } getWorldQuaternion(e) { return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(rr, e, I0), e } getWorldScale(e) { return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(rr, D0, e), e } getWorldDirection(e) { this.updateWorldMatrix(!0, !1); const t = this.matrixWorld.elements; return e.set(t[8], t[9], t[10]).normalize() } raycast() { } traverse(e) { e(this); const t = this.children; for (let n = 0, s = t.length; n < s; n++)t[n].traverse(e) } traverseVisible(e) { if (this.visible === !1) return; e(this); const t = this.children; for (let n = 0, s = t.length; n < s; n++)t[n].traverseVisible(e) } traverseAncestors(e) { const t = this.parent; t !== null && (e(t), t.traverseAncestors(e)) } updateMatrix() { this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0 } updateMatrixWorld(e) { this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0); const t = this.children; for (let n = 0, s = t.length; n < s; n++) { const r = t[n]; (r.matrixWorldAutoUpdate === !0 || e === !0) && r.updateMatrixWorld(e) } } updateWorldMatrix(e, t) { const n = this.parent; if (e === !0 && n !== null && n.matrixWorldAutoUpdate === !0 && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), t === !0) { const s = this.children; for (let r = 0, o = s.length; r < o; r++) { const a = s[r]; a.matrixWorldAutoUpdate === !0 && a.updateWorldMatrix(!1, !0) } } } toJSON(e) { const t = e === void 0 || typeof e == "string", n = {}; t && (e = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {}, skeletons: {}, animations: {}, nodes: {} }, n.metadata = { version: 4.6, type: "Object", generator: "Object3D.toJSON" }); const s = {}; s.uuid = this.uuid, s.type = this.type, this.name !== "" && (s.name = this.name), this.castShadow === !0 && (s.castShadow = !0), this.receiveShadow === !0 && (s.receiveShadow = !0), this.visible === !1 && (s.visible = !1), this.frustumCulled === !1 && (s.frustumCulled = !1), this.renderOrder !== 0 && (s.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (s.userData = this.userData), s.layers = this.layers.mask, s.matrix = this.matrix.toArray(), s.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (s.matrixAutoUpdate = !1), this.isInstancedMesh && (s.type = "InstancedMesh", s.count = this.count, s.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (s.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (s.type = "BatchedMesh", s.perObjectFrustumCulled = this.perObjectFrustumCulled, s.sortObjects = this.sortObjects, s.drawRanges = this._drawRanges, s.reservedRanges = this._reservedRanges, s.visibility = this._visibility, s.active = this._active, s.bounds = this._bounds.map(a => ({ boxInitialized: a.boxInitialized, boxMin: a.box.min.toArray(), boxMax: a.box.max.toArray(), sphereInitialized: a.sphereInitialized, sphereRadius: a.sphere.radius, sphereCenter: a.sphere.center.toArray() })), s.maxGeometryCount = this._maxGeometryCount, s.maxVertexCount = this._maxVertexCount, s.maxIndexCount = this._maxIndexCount, s.geometryInitialized = this._geometryInitialized, s.geometryCount = this._geometryCount, s.matricesTexture = this._matricesTexture.toJSON(e), this.boundingSphere !== null && (s.boundingSphere = { center: s.boundingSphere.center.toArray(), radius: s.boundingSphere.radius }), this.boundingBox !== null && (s.boundingBox = { min: s.boundingBox.min.toArray(), max: s.boundingBox.max.toArray() })); function r(a, l) { return a[l.uuid] === void 0 && (a[l.uuid] = l.toJSON(e)), l.uuid } if (this.isScene) this.background && (this.background.isColor ? s.background = this.background.toJSON() : this.background.isTexture && (s.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (s.environment = this.environment.toJSON(e).uuid); else if (this.isMesh || this.isLine || this.isPoints) { s.geometry = r(e.geometries, this.geometry); const a = this.geometry.parameters; if (a !== void 0 && a.shapes !== void 0) { const l = a.shapes; if (Array.isArray(l)) for (let c = 0, u = l.length; c < u; c++) { const h = l[c]; r(e.shapes, h) } else r(e.shapes, l) } } if (this.isSkinnedMesh && (s.bindMode = this.bindMode, s.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(e.skeletons, this.skeleton), s.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) { const a = []; for (let l = 0, c = this.material.length; l < c; l++)a.push(r(e.materials, this.material[l])); s.material = a } else s.material = r(e.materials, this.material); if (this.children.length > 0) { s.children = []; for (let a = 0; a < this.children.length; a++)s.children.push(this.children[a].toJSON(e).object) } if (this.animations.length > 0) { s.animations = []; for (let a = 0; a < this.animations.length; a++) { const l = this.animations[a]; s.animations.push(r(e.animations, l)) } } if (t) { const a = o(e.geometries), l = o(e.materials), c = o(e.textures), u = o(e.images), h = o(e.shapes), f = o(e.skeletons), d = o(e.animations), _ = o(e.nodes); a.length > 0 && (n.geometries = a), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), u.length > 0 && (n.images = u), h.length > 0 && (n.shapes = h), f.length > 0 && (n.skeletons = f), d.length > 0 && (n.animations = d), _.length > 0 && (n.nodes = _) } return n.object = s, n; function o(a) { const l = []; for (const c in a) { const u = a[c]; delete u.metadata, l.push(u) } return l } } clone(e) { return new this.constructor().copy(this, e) } copy(e, t = !0) { if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0) for (let n = 0; n < e.children.length; n++) { const s = e.children[n]; this.add(s.clone()) } return this } } ot.DEFAULT_UP = new B(0, 1, 0); ot.DEFAULT_MATRIX_AUTO_UPDATE = !0; ot.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0; const un = new B, Bn = new B, Ja = new B, kn = new B, fs = new B, ds = new B, yh = new B, Qa = new B, el = new B, tl = new B; class pn { constructor(e = new B, t = new B, n = new B) { this.a = e, this.b = t, this.c = n } static getNormal(e, t, n, s) { s.subVectors(n, t), un.subVectors(e, t), s.cross(un); const r = s.lengthSq(); return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0) } static getBarycoord(e, t, n, s, r) { un.subVectors(s, t), Bn.subVectors(n, t), Ja.subVectors(e, t); const o = un.dot(un), a = un.dot(Bn), l = un.dot(Ja), c = Bn.dot(Bn), u = Bn.dot(Ja), h = o * c - a * a; if (h === 0) return r.set(0, 0, 0), null; const f = 1 / h, d = (c * l - a * u) * f, _ = (o * u - a * l) * f; return r.set(1 - d - _, _, d) } static containsPoint(e, t, n, s) { return this.getBarycoord(e, t, n, s, kn) === null ? !1 : kn.x >= 0 && kn.y >= 0 && kn.x + kn.y <= 1 } static getInterpolation(e, t, n, s, r, o, a, l) { return this.getBarycoord(e, t, n, s, kn) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(r, kn.x), l.addScaledVector(o, kn.y), l.addScaledVector(a, kn.z), l) } static isFrontFacing(e, t, n, s) { return un.subVectors(n, t), Bn.subVectors(e, t), un.cross(Bn).dot(s) < 0 } set(e, t, n) { return this.a.copy(e), this.b.copy(t), this.c.copy(n), this } setFromPointsAndIndices(e, t, n, s) { return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[s]), this } setFromAttributeAndIndices(e, t, n, s) { return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, s), this } clone() { return new this.constructor().copy(this) } copy(e) { return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this } getArea() { return un.subVectors(this.c, this.b), Bn.subVectors(this.a, this.b), un.cross(Bn).length() * .5 } getMidpoint(e) { return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3) } getNormal(e) { return pn.getNormal(this.a, this.b, this.c, e) } getPlane(e) { return e.setFromCoplanarPoints(this.a, this.b, this.c) } getBarycoord(e, t) { return pn.getBarycoord(e, this.a, this.b, this.c, t) } getInterpolation(e, t, n, s, r) { return pn.getInterpolation(e, this.a, this.b, this.c, t, n, s, r) } containsPoint(e) { return pn.containsPoint(e, this.a, this.b, this.c) } isFrontFacing(e) { return pn.isFrontFacing(this.a, this.b, this.c, e) } intersectsBox(e) { return e.intersectsTriangle(this) } closestPointToPoint(e, t) { const n = this.a, s = this.b, r = this.c; let o, a; fs.subVectors(s, n), ds.subVectors(r, n), Qa.subVectors(e, n); const l = fs.dot(Qa), c = ds.dot(Qa); if (l <= 0 && c <= 0) return t.copy(n); el.subVectors(e, s); const u = fs.dot(el), h = ds.dot(el); if (u >= 0 && h <= u) return t.copy(s); const f = l * h - u * c; if (f <= 0 && l >= 0 && u <= 0) return o = l / (l - u), t.copy(n).addScaledVector(fs, o); tl.subVectors(e, r); const d = fs.dot(tl), _ = ds.dot(tl); if (_ >= 0 && d <= _) return t.copy(r); const v = d * c - l * _; if (v <= 0 && c >= 0 && _ <= 0) return a = c / (c - _), t.copy(n).addScaledVector(ds, a); const p = u * _ - d * h; if (p <= 0 && h - u >= 0 && d - _ >= 0) return yh.subVectors(r, s), a = (h - u) / (h - u + (d - _)), t.copy(s).addScaledVector(yh, a); const m = 1 / (p + v + f); return o = v * m, a = f * m, t.copy(n).addScaledVector(fs, o).addScaledVector(ds, a) } equals(e) { return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c) } } const Zd = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 }, oi = { h: 0, s: 0, l: 0 }, so = { h: 0, s: 0, l: 0 }; function nl(i, e, t) { return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i } class Re { constructor(e, t, n) { return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n) } set(e, t, n) { if (t === void 0 && n === void 0) { const s = e; s && s.isColor ? this.copy(s) : typeof s == "number" ? this.setHex(s) : typeof s == "string" && this.setStyle(s) } else this.setRGB(e, t, n); return this } setScalar(e) { return this.r = e, this.g = e, this.b = e, this } setHex(e, t = Tt) { return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Je.toWorkingColorSpace(this, t), this } setRGB(e, t, n, s = Je.workingColorSpace) { return this.r = e, this.g = t, this.b = n, Je.toWorkingColorSpace(this, s), this } setHSL(e, t, n, s = Je.workingColorSpace) { if (e = Ac(e, 1), t = bt(t, 0, 1), n = bt(n, 0, 1), t === 0) this.r = this.g = this.b = n; else { const r = n <= .5 ? n * (1 + t) : n + t - n * t, o = 2 * n - r; this.r = nl(o, r, e + 1 / 3), this.g = nl(o, r, e), this.b = nl(o, r, e - 1 / 3) } return Je.toWorkingColorSpace(this, s), this } setStyle(e, t = Tt) { function n(r) { r !== void 0 && parseFloat(r) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.") } let s; if (s = /^(\w+)\(([^\)]*)\)/.exec(e)) { let r; const o = s[1], a = s[2]; switch (o) { case "rgb": case "rgba": if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) return n(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, t); if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) return n(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, t); break; case "hsl": case "hsla": if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)) return n(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, t); break; default: console.warn("THREE.Color: Unknown color model " + e) } } else if (s = /^\#([A-Fa-f\d]+)$/.exec(e)) { const r = s[1], o = r.length; if (o === 3) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, t); if (o === 6) return this.setHex(parseInt(r, 16), t); console.warn("THREE.Color: Invalid hex color " + e) } else if (e && e.length > 0) return this.setColorName(e, t); return this } setColorName(e, t = Tt) { const n = Zd[e.toLowerCase()]; return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this } clone() { return new this.constructor(this.r, this.g, this.b) } copy(e) { return this.r = e.r, this.g = e.g, this.b = e.b, this } copySRGBToLinear(e) { return this.r = Ns(e.r), this.g = Ns(e.g), this.b = Ns(e.b), this } copyLinearToSRGB(e) { return this.r = Ga(e.r), this.g = Ga(e.g), this.b = Ga(e.b), this } convertSRGBToLinear() { return this.copySRGBToLinear(this), this } convertLinearToSRGB() { return this.copyLinearToSRGB(this), this } getHex(e = Tt) { return Je.fromWorkingColorSpace(It.copy(this), e), Math.round(bt(It.r * 255, 0, 255)) * 65536 + Math.round(bt(It.g * 255, 0, 255)) * 256 + Math.round(bt(It.b * 255, 0, 255)) } getHexString(e = Tt) { return ("000000" + this.getHex(e).toString(16)).slice(-6) } getHSL(e, t = Je.workingColorSpace) { Je.fromWorkingColorSpace(It.copy(this), t); const n = It.r, s = It.g, r = It.b, o = Math.max(n, s, r), a = Math.min(n, s, r); let l, c; const u = (a + o) / 2; if (a === o) l = 0, c = 0; else { const h = o - a; switch (c = u <= .5 ? h / (o + a) : h / (2 - o - a), o) { case n: l = (s - r) / h + (s < r ? 6 : 0); break; case s: l = (r - n) / h + 2; break; case r: l = (n - s) / h + 4; break }l /= 6 } return e.h = l, e.s = c, e.l = u, e } getRGB(e, t = Je.workingColorSpace) { return Je.fromWorkingColorSpace(It.copy(this), t), e.r = It.r, e.g = It.g, e.b = It.b, e } getStyle(e = Tt) { Je.fromWorkingColorSpace(It.copy(this), e); const t = It.r, n = It.g, s = It.b; return e !== Tt ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(s * 255)})` } offsetHSL(e, t, n) { return this.getHSL(oi), this.setHSL(oi.h + e, oi.s + t, oi.l + n) } add(e) { return this.r += e.r, this.g += e.g, this.b += e.b, this } addColors(e, t) { return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this } addScalar(e) { return this.r += e, this.g += e, this.b += e, this } sub(e) { return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this } multiply(e) { return this.r *= e.r, this.g *= e.g, this.b *= e.b, this } multiplyScalar(e) { return this.r *= e, this.g *= e, this.b *= e, this } lerp(e, t) { return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this } lerpColors(e, t, n) { return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this } lerpHSL(e, t) { this.getHSL(oi), e.getHSL(so); const n = Sr(oi.h, so.h, t), s = Sr(oi.s, so.s, t), r = Sr(oi.l, so.l, t); return this.setHSL(n, s, r), this } setFromVector3(e) { return this.r = e.x, this.g = e.y, this.b = e.z, this } applyMatrix3(e) { const t = this.r, n = this.g, s = this.b, r = e.elements; return this.r = r[0] * t + r[3] * n + r[6] * s, this.g = r[1] * t + r[4] * n + r[7] * s, this.b = r[2] * t + r[5] * n + r[8] * s, this } equals(e) { return e.r === this.r && e.g === this.g && e.b === this.b } fromArray(e, t = 0) { return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this } toArray(e = [], t = 0) { return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e } fromBufferAttribute(e, t) { return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this } toJSON() { return this.getHex() } *[Symbol.iterator]() { yield this.r, yield this.g, yield this.b } } const It = new Re; Re.NAMES = Zd; let U0 = 0; class an extends es { constructor() { super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: U0++ }), this.uuid = vn(), this.name = "", this.type = "Material", this.blending = Is, this.side = Yn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = Hl, this.blendDst = zl, this.blendEquation = Vn, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Re(0, 0, 0), this.blendAlpha = 0, this.depthFunc = qo, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = ah, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = ss, this.stencilZFail = ss, this.stencilZPass = ss, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0 } get alphaTest() { return this._alphaTest } set alphaTest(e) { this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e } onBuild() { } onBeforeRender() { } onBeforeCompile() { } customProgramCacheKey() { return this.onBeforeCompile.toString() } setValues(e) { if (e !== void 0) for (const t in e) { const n = e[t]; if (n === void 0) { console.warn(`THREE.Material: parameter '${t}' has value of undefined.`); continue } const s = this[t]; if (s === void 0) { console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`); continue } s && s.isColor ? s.set(n) : s && s.isVector3 && n && n.isVector3 ? s.copy(n) : this[t] = n } } toJSON(e) { const t = e === void 0 || typeof e == "string"; t && (e = { textures: {}, images: {} }); const n = { metadata: { version: 4.6, type: "Material", generator: "Material.toJSON" } }; n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== Is && (n.blending = this.blending), this.side !== Yn && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== Hl && (n.blendSrc = this.blendSrc), this.blendDst !== zl && (n.blendDst = this.blendDst), this.blendEquation !== Vn && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== qo && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== ah && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== ss && (n.stencilFail = this.stencilFail), this.stencilZFail !== ss && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== ss && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData); function s(r) { const o = []; for (const a in r) { const l = r[a]; delete l.metadata, o.push(l) } return o } if (t) { const r = s(e.textures), o = s(e.images); r.length > 0 && (n.textures = r), o.length > 0 && (n.images = o) } return n } clone() { return new this.constructor().copy(this) } copy(e) { this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite; const t = e.clippingPlanes; let n = null; if (t !== null) { const s = t.length; n = new Array(s); for (let r = 0; r !== s; ++r)n[r] = t[r].clone() } return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this } dispose() { this.dispatchEvent({ type: "dispose" }) } set needsUpdate(e) { e === !0 && this.version++ } } class ji extends an { constructor(e) { super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Re(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Ln, this.combine = Nd, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this } } const Gn = O0(); function O0() { const i = new ArrayBuffer(4), e = new Float32Array(i), t = new Uint32Array(i), n = new Uint32Array(512), s = new Uint32Array(512); for (let l = 0; l < 256; ++l) { const c = l - 127; c < -27 ? (n[l] = 0, n[l | 256] = 32768, s[l] = 24, s[l | 256] = 24) : c < -14 ? (n[l] = 1024 >> -c - 14, n[l | 256] = 1024 >> -c - 14 | 32768, s[l] = -c - 1, s[l | 256] = -c - 1) : c <= 15 ? (n[l] = c + 15 << 10, n[l | 256] = c + 15 << 10 | 32768, s[l] = 13, s[l | 256] = 13) : c < 128 ? (n[l] = 31744, n[l | 256] = 64512, s[l] = 24, s[l | 256] = 24) : (n[l] = 31744, n[l | 256] = 64512, s[l] = 13, s[l | 256] = 13) } const r = new Uint32Array(2048), o = new Uint32Array(64), a = new Uint32Array(64); for (let l = 1; l < 1024; ++l) { let c = l << 13, u = 0; for (; !(c & 8388608);)c <<= 1, u -= 8388608; c &= -8388609, u += 947912704, r[l] = c | u } for (let l = 1024; l < 2048; ++l)r[l] = 939524096 + (l - 1024 << 13); for (let l = 1; l < 31; ++l)o[l] = l << 23; o[31] = 1199570944, o[32] = 2147483648; for (let l = 33; l < 63; ++l)o[l] = 2147483648 + (l - 32 << 23); o[63] = 3347054592; for (let l = 1; l < 64; ++l)l !== 32 && (a[l] = 1024); return { floatView: e, uint32View: t, baseTable: n, shiftTable: s, mantissaTable: r, exponentTable: o, offsetTable: a } } function F0(i) { Math.abs(i) > 65504 && console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."), i = bt(i, -65504, 65504), Gn.floatView[0] = i; const e = Gn.uint32View[0], t = e >> 23 & 511; return Gn.baseTable[t] + ((e & 8388607) >> Gn.shiftTable[t]) } function B0(i) { const e = i >> 10; return Gn.uint32View[0] = Gn.mantissaTable[Gn.offsetTable[e] + (i & 1023)] + Gn.exponentTable[e], Gn.floatView[0] } const ro = { toHalfFloat: F0, fromHalfFloat: B0 }, mt = new B, oo = new Ee; class Ct { constructor(e, t, n = !1) { if (Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array."); this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = Xl, this._updateRange = { offset: 0, count: -1 }, this.updateRanges = [], this.gpuType = Vt, this.version = 0 } onUploadCallback() { } set needsUpdate(e) { e === !0 && this.version++ } get updateRange() { return qd("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."), this._updateRange } setUsage(e) { return this.usage = e, this } addUpdateRange(e, t) { this.updateRanges.push({ start: e, count: t }) } clearUpdateRanges() { this.updateRanges.length = 0 } copy(e) { return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this } copyAt(e, t, n) { e *= this.itemSize, n *= t.itemSize; for (let s = 0, r = this.itemSize; s < r; s++)this.array[e + s] = t.array[n + s]; return this } copyArray(e) { return this.array.set(e), this } applyMatrix3(e) { if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++)oo.fromBufferAttribute(this, t), oo.applyMatrix3(e), this.setXY(t, oo.x, oo.y); else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++)mt.fromBufferAttribute(this, t), mt.applyMatrix3(e), this.setXYZ(t, mt.x, mt.y, mt.z); return this } applyMatrix4(e) { for (let t = 0, n = this.count; t < n; t++)mt.fromBufferAttribute(this, t), mt.applyMatrix4(e), this.setXYZ(t, mt.x, mt.y, mt.z); return this } applyNormalMatrix(e) { for (let t = 0, n = this.count; t < n; t++)mt.fromBufferAttribute(this, t), mt.applyNormalMatrix(e), this.setXYZ(t, mt.x, mt.y, mt.z); return this } transformDirection(e) { for (let t = 0, n = this.count; t < n; t++)mt.fromBufferAttribute(this, t), mt.transformDirection(e), this.setXYZ(t, mt.x, mt.y, mt.z); return this } set(e, t = 0) { return this.array.set(e, t), this } getComponent(e, t) { let n = this.array[e * this.itemSize + t]; return this.normalized && (n = dn(n, this.array)), n } setComponent(e, t, n) { return this.normalized && (n = Qe(n, this.array)), this.array[e * this.itemSize + t] = n, this } getX(e) { let t = this.array[e * this.itemSize]; return this.normalized && (t = dn(t, this.array)), t } setX(e, t) { return this.normalized && (t = Qe(t, this.array)), this.array[e * this.itemSize] = t, this } getY(e) { let t = this.array[e * this.itemSize + 1]; return this.normalized && (t = dn(t, this.array)), t } setY(e, t) { return this.normalized && (t = Qe(t, this.array)), this.array[e * this.itemSize + 1] = t, this } getZ(e) { let t = this.array[e * this.itemSize + 2]; return this.normalized && (t = dn(t, this.array)), t } setZ(e, t) { return this.normalized && (t = Qe(t, this.array)), this.array[e * this.itemSize + 2] = t, this } getW(e) { let t = this.array[e * this.itemSize + 3]; return this.normalized && (t = dn(t, this.array)), t } setW(e, t) { return this.normalized && (t = Qe(t, this.array)), this.array[e * this.itemSize + 3] = t, this } setXY(e, t, n) { return e *= this.itemSize, this.normalized && (t = Qe(t, this.array), n = Qe(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this } setXYZ(e, t, n, s) { return e *= this.itemSize, this.normalized && (t = Qe(t, this.array), n = Qe(n, this.array), s = Qe(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = s, this } setXYZW(e, t, n, s, r) { return e *= this.itemSize, this.normalized && (t = Qe(t, this.array), n = Qe(n, this.array), s = Qe(s, this.array), r = Qe(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = s, this.array[e + 3] = r, this } onUpload(e) { return this.onUploadCallback = e, this } clone() { return new this.constructor(this.array, this.itemSize).copy(this) } toJSON() { const e = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized }; return this.name !== "" && (e.name = this.name), this.usage !== Xl && (e.usage = this.usage), e } } class Jd extends Ct { constructor(e, t, n) { super(new Uint16Array(e), t, n) } } class Qd extends Ct { constructor(e, t, n) { super(new Uint32Array(e), t, n) } } class Mn extends Ct { constructor(e, t, n) { super(new Float32Array(e), t, n) } } let k0 = 0; const nn = new Oe, il = new ot, ps = new B, Zt = new Kn, or = new Kn, Et = new B; class Jt extends es { constructor() { super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: k0++ }), this.uuid = vn(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {} } getIndex() { return this.index } setIndex(e) { return Array.isArray(e) ? this.index = new (Yd(e) ? Qd : Jd)(e, 1) : this.index = e, this } getAttribute(e) { return this.attributes[e] } setAttribute(e, t) { return this.attributes[e] = t, this } deleteAttribute(e) { return delete this.attributes[e], this } hasAttribute(e) { return this.attributes[e] !== void 0 } addGroup(e, t, n = 0) { this.groups.push({ start: e, count: t, materialIndex: n }) } clearGroups() { this.groups = [] } setDrawRange(e, t) { this.drawRange.start = e, this.drawRange.count = t } applyMatrix4(e) { const t = this.attributes.position; t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0); const n = this.attributes.normal; if (n !== void 0) { const r = new We().getNormalMatrix(e); n.applyNormalMatrix(r), n.needsUpdate = !0 } const s = this.attributes.tangent; return s !== void 0 && (s.transformDirection(e), s.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this } applyQuaternion(e) { return nn.makeRotationFromQuaternion(e), this.applyMatrix4(nn), this } rotateX(e) { return nn.makeRotationX(e), this.applyMatrix4(nn), this } rotateY(e) { return nn.makeRotationY(e), this.applyMatrix4(nn), this } rotateZ(e) { return nn.makeRotationZ(e), this.applyMatrix4(nn), this } translate(e, t, n) { return nn.makeTranslation(e, t, n), this.applyMatrix4(nn), this } scale(e, t, n) { return nn.makeScale(e, t, n), this.applyMatrix4(nn), this } lookAt(e) { return il.lookAt(e), il.updateMatrix(), this.applyMatrix4(il.matrix), this } center() { return this.computeBoundingBox(), this.boundingBox.getCenter(ps).negate(), this.translate(ps.x, ps.y, ps.z), this } setFromPoints(e) { const t = []; for (let n = 0, s = e.length; n < s; n++) { const r = e[n]; t.push(r.x, r.y, r.z || 0) } return this.setAttribute("position", new Mn(t, 3)), this } computeBoundingBox() { this.boundingBox === null && (this.boundingBox = new Kn); const e = this.attributes.position, t = this.morphAttributes.position; if (e && e.isGLBufferAttribute) { console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new B(-1 / 0, -1 / 0, -1 / 0), new B(1 / 0, 1 / 0, 1 / 0)); return } if (e !== void 0) { if (this.boundingBox.setFromBufferAttribute(e), t) for (let n = 0, s = t.length; n < s; n++) { const r = t[n]; Zt.setFromBufferAttribute(r), this.morphTargetsRelative ? (Et.addVectors(this.boundingBox.min, Zt.min), this.boundingBox.expandByPoint(Et), Et.addVectors(this.boundingBox.max, Zt.max), this.boundingBox.expandByPoint(Et)) : (this.boundingBox.expandByPoint(Zt.min), this.boundingBox.expandByPoint(Zt.max)) } } else this.boundingBox.makeEmpty(); (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this) } computeBoundingSphere() { this.boundingSphere === null && (this.boundingSphere = new In); const e = this.attributes.position, t = this.morphAttributes.position; if (e && e.isGLBufferAttribute) { console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new B, 1 / 0); return } if (e) { const n = this.boundingSphere.center; if (Zt.setFromBufferAttribute(e), t) for (let r = 0, o = t.length; r < o; r++) { const a = t[r]; or.setFromBufferAttribute(a), this.morphTargetsRelative ? (Et.addVectors(Zt.min, or.min), Zt.expandByPoint(Et), Et.addVectors(Zt.max, or.max), Zt.expandByPoint(Et)) : (Zt.expandByPoint(or.min), Zt.expandByPoint(or.max)) } Zt.getCenter(n); let s = 0; for (let r = 0, o = e.count; r < o; r++)Et.fromBufferAttribute(e, r), s = Math.max(s, n.distanceToSquared(Et)); if (t) for (let r = 0, o = t.length; r < o; r++) { const a = t[r], l = this.morphTargetsRelative; for (let c = 0, u = a.count; c < u; c++)Et.fromBufferAttribute(a, c), l && (ps.fromBufferAttribute(e, c), Et.add(ps)), s = Math.max(s, n.distanceToSquared(Et)) } this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this) } } computeTangents() { const e = this.index, t = this.attributes; if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) { console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)"); return } const n = t.position, s = t.normal, r = t.uv; this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Ct(new Float32Array(4 * n.count), 4)); const o = this.getAttribute("tangent"), a = [], l = []; for (let L = 0; L < n.count; L++)a[L] = new B, l[L] = new B; const c = new B, u = new B, h = new B, f = new Ee, d = new Ee, _ = new Ee, v = new B, p = new B; function m(L, S, M) { c.fromBufferAttribute(n, L), u.fromBufferAttribute(n, S), h.fromBufferAttribute(n, M), f.fromBufferAttribute(r, L), d.fromBufferAttribute(r, S), _.fromBufferAttribute(r, M), u.sub(c), h.sub(c), d.sub(f), _.sub(f); const D = 1 / (d.x * _.y - _.x * d.y); isFinite(D) && (v.copy(u).multiplyScalar(_.y).addScaledVector(h, -d.y).multiplyScalar(D), p.copy(h).multiplyScalar(d.x).addScaledVector(u, -_.x).multiplyScalar(D), a[L].add(v), a[S].add(v), a[M].add(v), l[L].add(p), l[S].add(p), l[M].add(p)) } let b = this.groups; b.length === 0 && (b = [{ start: 0, count: e.count }]); for (let L = 0, S = b.length; L < S; ++L) { const M = b[L], D = M.start, I = M.count; for (let C = D, z = D + I; C < z; C += 3)m(e.getX(C + 0), e.getX(C + 1), e.getX(C + 2)) } const y = new B, A = new B, O = new B, P = new B; function R(L) { O.fromBufferAttribute(s, L), P.copy(O); const S = a[L]; y.copy(S), y.sub(O.multiplyScalar(O.dot(S))).normalize(), A.crossVectors(P, S); const D = A.dot(l[L]) < 0 ? -1 : 1; o.setXYZW(L, y.x, y.y, y.z, D) } for (let L = 0, S = b.length; L < S; ++L) { const M = b[L], D = M.start, I = M.count; for (let C = D, z = D + I; C < z; C += 3)R(e.getX(C + 0)), R(e.getX(C + 1)), R(e.getX(C + 2)) } } computeVertexNormals() { const e = this.index, t = this.getAttribute("position"); if (t !== void 0) { let n = this.getAttribute("normal"); if (n === void 0) n = new Ct(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n); else for (let f = 0, d = n.count; f < d; f++)n.setXYZ(f, 0, 0, 0); const s = new B, r = new B, o = new B, a = new B, l = new B, c = new B, u = new B, h = new B; if (e) for (let f = 0, d = e.count; f < d; f += 3) { const _ = e.getX(f + 0), v = e.getX(f + 1), p = e.getX(f + 2); s.fromBufferAttribute(t, _), r.fromBufferAttribute(t, v), o.fromBufferAttribute(t, p), u.subVectors(o, r), h.subVectors(s, r), u.cross(h), a.fromBufferAttribute(n, _), l.fromBufferAttribute(n, v), c.fromBufferAttribute(n, p), a.add(u), l.add(u), c.add(u), n.setXYZ(_, a.x, a.y, a.z), n.setXYZ(v, l.x, l.y, l.z), n.setXYZ(p, c.x, c.y, c.z) } else for (let f = 0, d = t.count; f < d; f += 3)s.fromBufferAttribute(t, f + 0), r.fromBufferAttribute(t, f + 1), o.fromBufferAttribute(t, f + 2), u.subVectors(o, r), h.subVectors(s, r), u.cross(h), n.setXYZ(f + 0, u.x, u.y, u.z), n.setXYZ(f + 1, u.x, u.y, u.z), n.setXYZ(f + 2, u.x, u.y, u.z); this.normalizeNormals(), n.needsUpdate = !0 } } normalizeNormals() { const e = this.attributes.normal; for (let t = 0, n = e.count; t < n; t++)Et.fromBufferAttribute(e, t), Et.normalize(), e.setXYZ(t, Et.x, Et.y, Et.z) } toNonIndexed() { function e(a, l) { const c = a.array, u = a.itemSize, h = a.normalized, f = new c.constructor(l.length * u); let d = 0, _ = 0; for (let v = 0, p = l.length; v < p; v++) { a.isInterleavedBufferAttribute ? d = l[v] * a.data.stride + a.offset : d = l[v] * u; for (let m = 0; m < u; m++)f[_++] = c[d++] } return new Ct(f, u, h) } if (this.index === null) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this; const t = new Jt, n = this.index.array, s = this.attributes; for (const a in s) { const l = s[a], c = e(l, n); t.setAttribute(a, c) } const r = this.morphAttributes; for (const a in r) { const l = [], c = r[a]; for (let u = 0, h = c.length; u < h; u++) { const f = c[u], d = e(f, n); l.push(d) } t.morphAttributes[a] = l } t.morphTargetsRelative = this.morphTargetsRelative; const o = this.groups; for (let a = 0, l = o.length; a < l; a++) { const c = o[a]; t.addGroup(c.start, c.count, c.materialIndex) } return t } toJSON() { const e = { metadata: { version: 4.6, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } }; if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) { const l = this.parameters; for (const c in l) l[c] !== void 0 && (e[c] = l[c]); return e } e.data = { attributes: {} }; const t = this.index; t !== null && (e.data.index = { type: t.array.constructor.name, array: Array.prototype.slice.call(t.array) }); const n = this.attributes; for (const l in n) { const c = n[l]; e.data.attributes[l] = c.toJSON(e.data) } const s = {}; let r = !1; for (const l in this.morphAttributes) { const c = this.morphAttributes[l], u = []; for (let h = 0, f = c.length; h < f; h++) { const d = c[h]; u.push(d.toJSON(e.data)) } u.length > 0 && (s[l] = u, r = !0) } r && (e.data.morphAttributes = s, e.data.morphTargetsRelative = this.morphTargetsRelative); const o = this.groups; o.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(o))); const a = this.boundingSphere; return a !== null && (e.data.boundingSphere = { center: a.center.toArray(), radius: a.radius }), e } clone() { return new this.constructor().copy(this) } copy(e) { this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null; const t = {}; this.name = e.name; const n = e.index; n !== null && this.setIndex(n.clone(t)); const s = e.attributes; for (const c in s) { const u = s[c]; this.setAttribute(c, u.clone(t)) } const r = e.morphAttributes; for (const c in r) { const u = [], h = r[c]; for (let f = 0, d = h.length; f < d; f++)u.push(h[f].clone(t)); this.morphAttributes[c] = u } this.morphTargetsRelative = e.morphTargetsRelative; const o = e.groups; for (let c = 0, u = o.length; c < u; c++) { const h = o[c]; this.addGroup(h.start, h.count, h.materialIndex) } const a = e.boundingBox; a !== null && (this.boundingBox = a.clone()); const l = e.boundingSphere; return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this } dispose() { this.dispatchEvent({ type: "dispose" }) } } const Sh = new Oe, Oi = new $s, ao = new In, Eh = new B, ms = new B, gs = new B, _s = new B, sl = new B, lo = new B, co = new Ee, uo = new Ee, ho = new Ee, Th = new B, bh = new B, Ah = new B, fo = new B, po = new B; class Gt extends ot { constructor(e = new Jt, t = new ji) { super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets() } copy(e, t) { return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this } updateMorphTargets() { const t = this.geometry.morphAttributes, n = Object.keys(t); if (n.length > 0) { const s = t[n[0]]; if (s !== void 0) { this.morphTargetInfluences = [], this.morphTargetDictionary = {}; for (let r = 0, o = s.length; r < o; r++) { const a = s[r].name || String(r); this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = r } } } } getVertexPosition(e, t) { const n = this.geometry, s = n.attributes.position, r = n.morphAttributes.position, o = n.morphTargetsRelative; t.fromBufferAttribute(s, e); const a = this.morphTargetInfluences; if (r && a) { lo.set(0, 0, 0); for (let l = 0, c = r.length; l < c; l++) { const u = a[l], h = r[l]; u !== 0 && (sl.fromBufferAttribute(h, e), o ? lo.addScaledVector(sl, u) : lo.addScaledVector(sl.sub(t), u)) } t.add(lo) } return t } raycast(e, t) { const n = this.geometry, s = this.material, r = this.matrixWorld; s !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), ao.copy(n.boundingSphere), ao.applyMatrix4(r), Oi.copy(e.ray).recast(e.near), !(ao.containsPoint(Oi.origin) === !1 && (Oi.intersectSphere(ao, Eh) === null || Oi.origin.distanceToSquared(Eh) > (e.far - e.near) ** 2)) && (Sh.copy(r).invert(), Oi.copy(e.ray).applyMatrix4(Sh), !(n.boundingBox !== null && Oi.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, Oi))) } _computeIntersections(e, t, n) { let s; const r = this.geometry, o = this.material, a = r.index, l = r.attributes.position, c = r.attributes.uv, u = r.attributes.uv1, h = r.attributes.normal, f = r.groups, d = r.drawRange; if (a !== null) if (Array.isArray(o)) for (let _ = 0, v = f.length; _ < v; _++) { const p = f[_], m = o[p.materialIndex], b = Math.max(p.start, d.start), y = Math.min(a.count, Math.min(p.start + p.count, d.start + d.count)); for (let A = b, O = y; A < O; A += 3) { const P = a.getX(A), R = a.getX(A + 1), L = a.getX(A + 2); s = mo(this, m, e, n, c, u, h, P, R, L), s && (s.faceIndex = Math.floor(A / 3), s.face.materialIndex = p.materialIndex, t.push(s)) } } else { const _ = Math.max(0, d.start), v = Math.min(a.count, d.start + d.count); for (let p = _, m = v; p < m; p += 3) { const b = a.getX(p), y = a.getX(p + 1), A = a.getX(p + 2); s = mo(this, o, e, n, c, u, h, b, y, A), s && (s.faceIndex = Math.floor(p / 3), t.push(s)) } } else if (l !== void 0) if (Array.isArray(o)) for (let _ = 0, v = f.length; _ < v; _++) { const p = f[_], m = o[p.materialIndex], b = Math.max(p.start, d.start), y = Math.min(l.count, Math.min(p.start + p.count, d.start + d.count)); for (let A = b, O = y; A < O; A += 3) { const P = A, R = A + 1, L = A + 2; s = mo(this, m, e, n, c, u, h, P, R, L), s && (s.faceIndex = Math.floor(A / 3), s.face.materialIndex = p.materialIndex, t.push(s)) } } else { const _ = Math.max(0, d.start), v = Math.min(l.count, d.start + d.count); for (let p = _, m = v; p < m; p += 3) { const b = p, y = p + 1, A = p + 2; s = mo(this, o, e, n, c, u, h, b, y, A), s && (s.faceIndex = Math.floor(p / 3), t.push(s)) } } } } function H0(i, e, t, n, s, r, o, a) { let l; if (e.side === Xt ? l = n.intersectTriangle(o, r, s, !0, a) : l = n.intersectTriangle(s, r, o, e.side === Yn, a), l === null) return null; po.copy(a), po.applyMatrix4(i.matrixWorld); const c = t.ray.origin.distanceTo(po); return c < t.near || c > t.far ? null : { distance: c, point: po.clone(), object: i } } function mo(i, e, t, n, s, r, o, a, l, c) { i.getVertexPosition(a, ms), i.getVertexPosition(l, gs), i.getVertexPosition(c, _s); const u = H0(i, e, t, n, ms, gs, _s, fo); if (u) { s && (co.fromBufferAttribute(s, a), uo.fromBufferAttribute(s, l), ho.fromBufferAttribute(s, c), u.uv = pn.getInterpolation(fo, ms, gs, _s, co, uo, ho, new Ee)), r && (co.fromBufferAttribute(r, a), uo.fromBufferAttribute(r, l), ho.fromBufferAttribute(r, c), u.uv1 = pn.getInterpolation(fo, ms, gs, _s, co, uo, ho, new Ee)), o && (Th.fromBufferAttribute(o, a), bh.fromBufferAttribute(o, l), Ah.fromBufferAttribute(o, c), u.normal = pn.getInterpolation(fo, ms, gs, _s, Th, bh, Ah, new B), u.normal.dot(n.direction) > 0 && u.normal.multiplyScalar(-1)); const h = { a, b: l, c, normal: new B, materialIndex: 0 }; pn.getNormal(ms, gs, _s, h.normal), u.face = h } return u } class Br extends Jt { constructor(e = 1, t = 1, n = 1, s = 1, r = 1, o = 1) { super(), this.type = "BoxGeometry", this.parameters = { width: e, height: t, depth: n, widthSegments: s, heightSegments: r, depthSegments: o }; const a = this; s = Math.floor(s), r = Math.floor(r), o = Math.floor(o); const l = [], c = [], u = [], h = []; let f = 0, d = 0; _("z", "y", "x", -1, -1, n, t, e, o, r, 0), _("z", "y", "x", 1, -1, n, t, -e, o, r, 1), _("x", "z", "y", 1, 1, e, n, t, s, o, 2), _("x", "z", "y", 1, -1, e, n, -t, s, o, 3), _("x", "y", "z", 1, -1, e, t, n, s, r, 4), _("x", "y", "z", -1, -1, e, t, -n, s, r, 5), this.setIndex(l), this.setAttribute("position", new Mn(c, 3)), this.setAttribute("normal", new Mn(u, 3)), this.setAttribute("uv", new Mn(h, 2)); function _(v, p, m, b, y, A, O, P, R, L, S) { const M = A / R, D = O / L, I = A / 2, C = O / 2, z = P / 2, Y = R + 1, X = L + 1; let ee = 0, G = 0; const ne = new B; for (let oe = 0; oe < X; oe++) { const pe = oe * D - C; for (let ye = 0; ye < Y; ye++) { const Pe = ye * M - I; ne[v] = Pe * b, ne[p] = pe * y, ne[m] = z, c.push(ne.x, ne.y, ne.z), ne[v] = 0, ne[p] = 0, ne[m] = P > 0 ? 1 : -1, u.push(ne.x, ne.y, ne.z), h.push(ye / R), h.push(1 - oe / L), ee += 1 } } for (let oe = 0; oe < L; oe++)for (let pe = 0; pe < R; pe++) { const ye = f + pe + Y * oe, Pe = f + pe + Y * (oe + 1), te = f + (pe + 1) + Y * (oe + 1), ue = f + (pe + 1) + Y * oe; l.push(ye, Pe, ue), l.push(Pe, te, ue), G += 6 } a.addGroup(d, G, S), d += G, f += ee } } copy(e) { return super.copy(e), this.parameters = Object.assign({}, e.parameters), this } static fromJSON(e) { return new Br(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments) } } function Ws(i) { const e = {}; for (const t in i) { e[t] = {}; for (const n in i[t]) { const s = i[t][n]; s && (s.isColor || s.isMatrix3 || s.isMatrix4 || s.isVector2 || s.isVector3 || s.isVector4 || s.isTexture || s.isQuaternion) ? s.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = s.clone() : Array.isArray(s) ? e[t][n] = s.slice() : e[t][n] = s } } return e } function Bt(i) { const e = {}; for (let t = 0; t < i.length; t++) { const n = Ws(i[t]); for (const s in n) e[s] = n[s] } return e } function z0(i) { const e = []; for (let t = 0; t < i.length; t++)e.push(i[t].clone()); return e } function ep(i) { const e = i.getRenderTarget(); return e === null ? i.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : Je.workingColorSpace } const As = { clone: Ws, merge: Bt }; var V0 = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, G0 = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`; class Wt extends an { constructor(e) { super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = V0, this.fragmentShader = G0, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = { clipCullDistance: !1, multiDraw: !1 }, this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv1: [0, 0] }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e) } copy(e) { return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Ws(e.uniforms), this.uniformsGroups = z0(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this } toJSON(e) { const t = super.toJSON(e); t.glslVersion = this.glslVersion, t.uniforms = {}; for (const s in this.uniforms) { const o = this.uniforms[s].value; o && o.isTexture ? t.uniforms[s] = { type: "t", value: o.toJSON(e).uuid } : o && o.isColor ? t.uniforms[s] = { type: "c", value: o.getHex() } : o && o.isVector2 ? t.uniforms[s] = { type: "v2", value: o.toArray() } : o && o.isVector3 ? t.uniforms[s] = { type: "v3", value: o.toArray() } : o && o.isVector4 ? t.uniforms[s] = { type: "v4", value: o.toArray() } : o && o.isMatrix3 ? t.uniforms[s] = { type: "m3", value: o.toArray() } : o && o.isMatrix4 ? t.uniforms[s] = { type: "m4", value: o.toArray() } : t.uniforms[s] = { value: o } } Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping; const n = {}; for (const s in this.extensions) this.extensions[s] === !0 && (n[s] = !0); return Object.keys(n).length > 0 && (t.extensions = n), t } } class tp extends ot { constructor() { super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Oe, this.projectionMatrix = new Oe, this.projectionMatrixInverse = new Oe, this.coordinateSystem = Xn } copy(e, t) { return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this } getWorldDirection(e) { return super.getWorldDirection(e).negate() } updateMatrixWorld(e) { super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert() } updateWorldMatrix(e, t) { super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert() } clone() { return new this.constructor().copy(this) } } const ai = new B, wh = new Ee, Rh = new Ee; class kt extends tp { constructor(e = 50, t = 1, n = .1, s = 2e3) { super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = s, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix() } copy(e, t) { return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this } setFocalLength(e) { const t = .5 * this.getFilmHeight() / e; this.fov = Gs * 2 * Math.atan(t), this.updateProjectionMatrix() } getFocalLength() { const e = Math.tan(yr * .5 * this.fov); return .5 * this.getFilmHeight() / e } getEffectiveFOV() { return Gs * 2 * Math.atan(Math.tan(yr * .5 * this.fov) / this.zoom) } getFilmWidth() { return this.filmGauge * Math.min(this.aspect, 1) } getFilmHeight() { return this.filmGauge / Math.max(this.aspect, 1) } getViewBounds(e, t, n) { ai.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), t.set(ai.x, ai.y).multiplyScalar(-e / ai.z), ai.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(ai.x, ai.y).multiplyScalar(-e / ai.z) } getViewSize(e, t) { return this.getViewBounds(e, wh, Rh), t.subVectors(Rh, wh) } setViewOffset(e, t, n, s, r, o) { this.aspect = e / t, this.view === null && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = o, this.updateProjectionMatrix() } clearViewOffset() { this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix() } updateProjectionMatrix() { const e = this.near; let t = e * Math.tan(yr * .5 * this.fov) / this.zoom, n = 2 * t, s = this.aspect * n, r = -.5 * s; const o = this.view; if (this.view !== null && this.view.enabled) { const l = o.fullWidth, c = o.fullHeight; r += o.offsetX * s / l, t -= o.offsetY * n / c, s *= o.width / l, n *= o.height / c } const a = this.filmOffset; a !== 0 && (r += e * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + s, t, t - n, e, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert() } toJSON(e) { const t = super.toJSON(e); return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t } } const xs = -90, vs = 1; class W0 extends ot { constructor(e, t, n) { super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0; const s = new kt(xs, vs, e, t); s.layers = this.layers, this.add(s); const r = new kt(xs, vs, e, t); r.layers = this.layers, this.add(r); const o = new kt(xs, vs, e, t); o.layers = this.layers, this.add(o); const a = new kt(xs, vs, e, t); a.layers = this.layers, this.add(a); const l = new kt(xs, vs, e, t); l.layers = this.layers, this.add(l); const c = new kt(xs, vs, e, t); c.layers = this.layers, this.add(c) } updateCoordinateSystem() { const e = this.coordinateSystem, t = this.children.concat(), [n, s, r, o, a, l] = t; for (const c of t) this.remove(c); if (e === Xn) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), s.up.set(0, 1, 0), s.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1); else if (e === Qo) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), s.up.set(0, -1, 0), s.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), o.up.set(0, 0, -1), o.lookAt(0, -1, 0), a.up.set(0, -1, 0), a.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1); else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e); for (const c of t) this.add(c), c.updateMatrixWorld() } update(e, t) { this.parent === null && this.updateMatrixWorld(); const { renderTarget: n, activeMipmapLevel: s } = this; this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem()); const [r, o, a, l, c, u] = this.children, h = e.getRenderTarget(), f = e.getActiveCubeFace(), d = e.getActiveMipmapLevel(), _ = e.xr.enabled; e.xr.enabled = !1; const v = n.texture.generateMipmaps; n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, s), e.render(t, r), e.setRenderTarget(n, 1, s), e.render(t, o), e.setRenderTarget(n, 2, s), e.render(t, a), e.setRenderTarget(n, 3, s), e.render(t, l), e.setRenderTarget(n, 4, s), e.render(t, c), n.texture.generateMipmaps = v, e.setRenderTarget(n, 5, s), e.render(t, u), e.setRenderTarget(h, f, d), e.xr.enabled = _, n.texture.needsPMREMUpdate = !0 } } class np extends wt { constructor(e, t, n, s, r, o, a, l, c, u) { e = e !== void 0 ? e : [], t = t !== void 0 ? t : Bs, super(e, t, n, s, r, o, a, l, c, u), this.isCubeTexture = !0, this.flipY = !1 } get images() { return this.image } set images(e) { this.image = e } } class X0 extends Cn {
	constructor(e = 1, t = {}) { super(e, e, t), this.isWebGLCubeRenderTarget = !0; const n = { width: e, height: e, depth: 1 }, s = [n, n, n, n, n, n]; this.texture = new np(s, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : At } fromEquirectangularTexture(e, t) {
		this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter; const n = {
			uniforms: { tEquirect: { value: null } }, vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`, fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`}, s = new Br(5, 5, 5), r = new Wt({ name: "CubemapFromEquirect", uniforms: Ws(n.uniforms), vertexShader: n.vertexShader, fragmentShader: n.fragmentShader, side: Xt, blending: Dt }); r.uniforms.tEquirect.value = t; const o = new Gt(s, r), a = t.minFilter; return t.minFilter === wn && (t.minFilter = At), new W0(1, 10, this).update(e, o), t.minFilter = a, o.geometry.dispose(), o.material.dispose(), this
	} clear(e, t, n, s) { const r = e.getRenderTarget(); for (let o = 0; o < 6; o++)e.setRenderTarget(this, o), e.clear(t, n, s); e.setRenderTarget(r) }
} const rl = new B, j0 = new B, Y0 = new We; class di { constructor(e = new B(1, 0, 0), t = 0) { this.isPlane = !0, this.normal = e, this.constant = t } set(e, t) { return this.normal.copy(e), this.constant = t, this } setComponents(e, t, n, s) { return this.normal.set(e, t, n), this.constant = s, this } setFromNormalAndCoplanarPoint(e, t) { return this.normal.copy(e), this.constant = -t.dot(this.normal), this } setFromCoplanarPoints(e, t, n) { const s = rl.subVectors(n, t).cross(j0.subVectors(e, t)).normalize(); return this.setFromNormalAndCoplanarPoint(s, e), this } copy(e) { return this.normal.copy(e.normal), this.constant = e.constant, this } normalize() { const e = 1 / this.normal.length(); return this.normal.multiplyScalar(e), this.constant *= e, this } negate() { return this.constant *= -1, this.normal.negate(), this } distanceToPoint(e) { return this.normal.dot(e) + this.constant } distanceToSphere(e) { return this.distanceToPoint(e.center) - e.radius } projectPoint(e, t) { return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e)) } intersectLine(e, t) { const n = e.delta(rl), s = this.normal.dot(n); if (s === 0) return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null; const r = -(e.start.dot(this.normal) + this.constant) / s; return r < 0 || r > 1 ? null : t.copy(e.start).addScaledVector(n, r) } intersectsLine(e) { const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end); return t < 0 && n > 0 || n < 0 && t > 0 } intersectsBox(e) { return e.intersectsPlane(this) } intersectsSphere(e) { return e.intersectsPlane(this) } coplanarPoint(e) { return e.copy(this.normal).multiplyScalar(-this.constant) } applyMatrix4(e, t) { const n = t || Y0.getNormalMatrix(e), s = this.coplanarPoint(rl).applyMatrix4(e), r = this.normal.applyMatrix3(n).normalize(); return this.constant = -s.dot(r), this } translate(e) { return this.constant -= e.dot(this.normal), this } equals(e) { return e.normal.equals(this.normal) && e.constant === this.constant } clone() { return new this.constructor().copy(this) } } const Fi = new In, go = new B; class Cc { constructor(e = new di, t = new di, n = new di, s = new di, r = new di, o = new di) { this.planes = [e, t, n, s, r, o] } set(e, t, n, s, r, o) { const a = this.planes; return a[0].copy(e), a[1].copy(t), a[2].copy(n), a[3].copy(s), a[4].copy(r), a[5].copy(o), this } copy(e) { const t = this.planes; for (let n = 0; n < 6; n++)t[n].copy(e.planes[n]); return this } setFromProjectionMatrix(e, t = Xn) { const n = this.planes, s = e.elements, r = s[0], o = s[1], a = s[2], l = s[3], c = s[4], u = s[5], h = s[6], f = s[7], d = s[8], _ = s[9], v = s[10], p = s[11], m = s[12], b = s[13], y = s[14], A = s[15]; if (n[0].setComponents(l - r, f - c, p - d, A - m).normalize(), n[1].setComponents(l + r, f + c, p + d, A + m).normalize(), n[2].setComponents(l + o, f + u, p + _, A + b).normalize(), n[3].setComponents(l - o, f - u, p - _, A - b).normalize(), n[4].setComponents(l - a, f - h, p - v, A - y).normalize(), t === Xn) n[5].setComponents(l + a, f + h, p + v, A + y).normalize(); else if (t === Qo) n[5].setComponents(a, h, v, y).normalize(); else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t); return this } intersectsObject(e) { if (e.boundingSphere !== void 0) e.boundingSphere === null && e.computeBoundingSphere(), Fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld); else { const t = e.geometry; t.boundingSphere === null && t.computeBoundingSphere(), Fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld) } return this.intersectsSphere(Fi) } intersectsSprite(e) { return Fi.center.set(0, 0, 0), Fi.radius = .7071067811865476, Fi.applyMatrix4(e.matrixWorld), this.intersectsSphere(Fi) } intersectsSphere(e) { const t = this.planes, n = e.center, s = -e.radius; for (let r = 0; r < 6; r++)if (t[r].distanceToPoint(n) < s) return !1; return !0 } intersectsBox(e) { const t = this.planes; for (let n = 0; n < 6; n++) { const s = t[n]; if (go.x = s.normal.x > 0 ? e.max.x : e.min.x, go.y = s.normal.y > 0 ? e.max.y : e.min.y, go.z = s.normal.z > 0 ? e.max.z : e.min.z, s.distanceToPoint(go) < 0) return !1 } return !0 } containsPoint(e) { const t = this.planes; for (let n = 0; n < 6; n++)if (t[n].distanceToPoint(e) < 0) return !1; return !0 } clone() { return new this.constructor().copy(this) } } function ip() { let i = null, e = !1, t = null, n = null; function s(r, o) { t(r, o), n = i.requestAnimationFrame(s) } return { start: function () { e !== !0 && t !== null && (n = i.requestAnimationFrame(s), e = !0) }, stop: function () { i.cancelAnimationFrame(n), e = !1 }, setAnimationLoop: function (r) { t = r }, setContext: function (r) { i = r } } } function q0(i) { const e = new WeakMap; function t(a, l) { const c = a.array, u = a.usage, h = c.byteLength, f = i.createBuffer(); i.bindBuffer(l, f), i.bufferData(l, c, u), a.onUploadCallback(); let d; if (c instanceof Float32Array) d = i.FLOAT; else if (c instanceof Uint16Array) a.isFloat16BufferAttribute ? d = i.HALF_FLOAT : d = i.UNSIGNED_SHORT; else if (c instanceof Int16Array) d = i.SHORT; else if (c instanceof Uint32Array) d = i.UNSIGNED_INT; else if (c instanceof Int32Array) d = i.INT; else if (c instanceof Int8Array) d = i.BYTE; else if (c instanceof Uint8Array) d = i.UNSIGNED_BYTE; else if (c instanceof Uint8ClampedArray) d = i.UNSIGNED_BYTE; else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c); return { buffer: f, type: d, bytesPerElement: c.BYTES_PER_ELEMENT, version: a.version, size: h } } function n(a, l, c) { const u = l.array, h = l._updateRange, f = l.updateRanges; if (i.bindBuffer(c, a), h.count === -1 && f.length === 0 && i.bufferSubData(c, 0, u), f.length !== 0) { for (let d = 0, _ = f.length; d < _; d++) { const v = f[d]; i.bufferSubData(c, v.start * u.BYTES_PER_ELEMENT, u, v.start, v.count) } l.clearUpdateRanges() } h.count !== -1 && (i.bufferSubData(c, h.offset * u.BYTES_PER_ELEMENT, u, h.offset, h.count), h.count = -1), l.onUploadCallback() } function s(a) { return a.isInterleavedBufferAttribute && (a = a.data), e.get(a) } function r(a) { a.isInterleavedBufferAttribute && (a = a.data); const l = e.get(a); l && (i.deleteBuffer(l.buffer), e.delete(a)) } function o(a, l) { if (a.isGLBufferAttribute) { const u = e.get(a); (!u || u.version < a.version) && e.set(a, { buffer: a.buffer, type: a.type, bytesPerElement: a.elementSize, version: a.version }); return } a.isInterleavedBufferAttribute && (a = a.data); const c = e.get(a); if (c === void 0) e.set(a, t(a, l)); else if (c.version < a.version) { if (c.size !== a.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported."); n(c.buffer, a, l), c.version = a.version } } return { get: s, remove: r, update: o } } class ma extends Jt { constructor(e = 1, t = 1, n = 1, s = 1) { super(), this.type = "PlaneGeometry", this.parameters = { width: e, height: t, widthSegments: n, heightSegments: s }; const r = e / 2, o = t / 2, a = Math.floor(n), l = Math.floor(s), c = a + 1, u = l + 1, h = e / a, f = t / l, d = [], _ = [], v = [], p = []; for (let m = 0; m < u; m++) { const b = m * f - o; for (let y = 0; y < c; y++) { const A = y * h - r; _.push(A, -b, 0), v.push(0, 0, 1), p.push(y / a), p.push(1 - m / l) } } for (let m = 0; m < l; m++)for (let b = 0; b < a; b++) { const y = b + c * m, A = b + c * (m + 1), O = b + 1 + c * (m + 1), P = b + 1 + c * m; d.push(y, A, P), d.push(A, O, P) } this.setIndex(d), this.setAttribute("position", new Mn(_, 3)), this.setAttribute("normal", new Mn(v, 3)), this.setAttribute("uv", new Mn(p, 2)) } copy(e) { return super.copy(e), this.parameters = Object.assign({}, e.parameters), this } static fromJSON(e) { return new ma(e.width, e.height, e.widthSegments, e.heightSegments) } } var K0 = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, $0 = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, Z0 = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, J0 = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Q0 = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, ex = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, tx = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, nx = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, ix = `#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, sx = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`, rx = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, ox = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, ax = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, lx = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, cx = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, ux = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, hx = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, fx = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, dx = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, px = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, mx = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, gx = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`, _x = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`, xx = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, vx = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Mx = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, yx = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Sx = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Ex = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Tx = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, bx = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Ax = `
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`, wx = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, Rx = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Cx = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, Px = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Lx = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Ix = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Dx = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Nx = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Ux = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Ox = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, Fx = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`, Bx = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, kx = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Hx = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, zx = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, Vx = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, Gx = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, Wx = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Xx = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, jx = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Yx = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, qx = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, Kx = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, $x = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, Zx = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Jx = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Qx = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, ev = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, tv = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, nv = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, iv = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, sv = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, rv = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, ov = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, av = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, lv = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, cv = `#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, uv = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`, hv = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`, fv = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`, dv = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, pv = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, mv = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, gv = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, _v = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, xv = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, vv = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Mv = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, yv = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Sv = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Ev = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Tv = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, bv = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Av = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, wv = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Rv = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Cv = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Pv = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Lv = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`, Iv = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Dv = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Nv = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Uv = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Ov = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Fv = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Bv = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, kv = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Hv = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, zv = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Vv = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, newPeak * vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, Gv = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, Wv = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, Xv = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, jv = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Yv = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, qv = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`; const Kv = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, $v = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Zv = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Jv = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Qv = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, eM = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, tM = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, nM = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`, iM = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, sM = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, rM = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, oM = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, aM = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, lM = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, cM = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, uM = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, hM = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, fM = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, dM = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, pM = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, mM = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, gM = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, _M = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, xM = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, vM = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, MM = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, yM = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, SM = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, EM = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, TM = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, bM = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, AM = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, wM = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, RM = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Ge = { alphahash_fragment: K0, alphahash_pars_fragment: $0, alphamap_fragment: Z0, alphamap_pars_fragment: J0, alphatest_fragment: Q0, alphatest_pars_fragment: ex, aomap_fragment: tx, aomap_pars_fragment: nx, batching_pars_vertex: ix, batching_vertex: sx, begin_vertex: rx, beginnormal_vertex: ox, bsdfs: ax, iridescence_fragment: lx, bumpmap_pars_fragment: cx, clipping_planes_fragment: ux, clipping_planes_pars_fragment: hx, clipping_planes_pars_vertex: fx, clipping_planes_vertex: dx, color_fragment: px, color_pars_fragment: mx, color_pars_vertex: gx, color_vertex: _x, common: xx, cube_uv_reflection_fragment: vx, defaultnormal_vertex: Mx, displacementmap_pars_vertex: yx, displacementmap_vertex: Sx, emissivemap_fragment: Ex, emissivemap_pars_fragment: Tx, colorspace_fragment: bx, colorspace_pars_fragment: Ax, envmap_fragment: wx, envmap_common_pars_fragment: Rx, envmap_pars_fragment: Cx, envmap_pars_vertex: Px, envmap_physical_pars_fragment: Vx, envmap_vertex: Lx, fog_vertex: Ix, fog_pars_vertex: Dx, fog_fragment: Nx, fog_pars_fragment: Ux, gradientmap_pars_fragment: Ox, lightmap_fragment: Fx, lightmap_pars_fragment: Bx, lights_lambert_fragment: kx, lights_lambert_pars_fragment: Hx, lights_pars_begin: zx, lights_toon_fragment: Gx, lights_toon_pars_fragment: Wx, lights_phong_fragment: Xx, lights_phong_pars_fragment: jx, lights_physical_fragment: Yx, lights_physical_pars_fragment: qx, lights_fragment_begin: Kx, lights_fragment_maps: $x, lights_fragment_end: Zx, logdepthbuf_fragment: Jx, logdepthbuf_pars_fragment: Qx, logdepthbuf_pars_vertex: ev, logdepthbuf_vertex: tv, map_fragment: nv, map_pars_fragment: iv, map_particle_fragment: sv, map_particle_pars_fragment: rv, metalnessmap_fragment: ov, metalnessmap_pars_fragment: av, morphinstance_vertex: lv, morphcolor_vertex: cv, morphnormal_vertex: uv, morphtarget_pars_vertex: hv, morphtarget_vertex: fv, normal_fragment_begin: dv, normal_fragment_maps: pv, normal_pars_fragment: mv, normal_pars_vertex: gv, normal_vertex: _v, normalmap_pars_fragment: xv, clearcoat_normal_fragment_begin: vv, clearcoat_normal_fragment_maps: Mv, clearcoat_pars_fragment: yv, iridescence_pars_fragment: Sv, opaque_fragment: Ev, packing: Tv, premultiplied_alpha_fragment: bv, project_vertex: Av, dithering_fragment: wv, dithering_pars_fragment: Rv, roughnessmap_fragment: Cv, roughnessmap_pars_fragment: Pv, shadowmap_pars_fragment: Lv, shadowmap_pars_vertex: Iv, shadowmap_vertex: Dv, shadowmask_pars_fragment: Nv, skinbase_vertex: Uv, skinning_pars_vertex: Ov, skinning_vertex: Fv, skinnormal_vertex: Bv, specularmap_fragment: kv, specularmap_pars_fragment: Hv, tonemapping_fragment: zv, tonemapping_pars_fragment: Vv, transmission_fragment: Gv, transmission_pars_fragment: Wv, uv_pars_fragment: Xv, uv_pars_vertex: jv, uv_vertex: Yv, worldpos_vertex: qv, background_vert: Kv, background_frag: $v, backgroundCube_vert: Zv, backgroundCube_frag: Jv, cube_vert: Qv, cube_frag: eM, depth_vert: tM, depth_frag: nM, distanceRGBA_vert: iM, distanceRGBA_frag: sM, equirect_vert: rM, equirect_frag: oM, linedashed_vert: aM, linedashed_frag: lM, meshbasic_vert: cM, meshbasic_frag: uM, meshlambert_vert: hM, meshlambert_frag: fM, meshmatcap_vert: dM, meshmatcap_frag: pM, meshnormal_vert: mM, meshnormal_frag: gM, meshphong_vert: _M, meshphong_frag: xM, meshphysical_vert: vM, meshphysical_frag: MM, meshtoon_vert: yM, meshtoon_frag: SM, points_vert: EM, points_frag: TM, shadow_vert: bM, shadow_frag: AM, sprite_vert: wM, sprite_frag: RM }, xe = { common: { diffuse: { value: new Re(16777215) }, opacity: { value: 1 }, map: { value: null }, mapTransform: { value: new We }, alphaMap: { value: null }, alphaMapTransform: { value: new We }, alphaTest: { value: 0 } }, specularmap: { specularMap: { value: null }, specularMapTransform: { value: new We } }, envmap: { envMap: { value: null }, envMapRotation: { value: new We }, flipEnvMap: { value: -1 }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: .98 } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new We } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new We } }, bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new We }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalMapTransform: { value: new We }, normalScale: { value: new Ee(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementMapTransform: { value: new We }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new We } }, metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new We } }, roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new We } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new Re(16777215) } }, lights: { ambientLightColor: { value: [] }, lightProbe: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {} } }, directionalLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMap: { value: [] }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } }, spotLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotLightMap: { value: [] }, spotShadowMap: { value: [] }, spotLightMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } }, pointLightShadows: { value: [], properties: { shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } }, pointShadowMap: { value: [] }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } }, ltc_1: { value: null }, ltc_2: { value: null } }, points: { diffuse: { value: new Re(16777215) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, alphaMapTransform: { value: new We }, alphaTest: { value: 0 }, uvTransform: { value: new We } }, sprite: { diffuse: { value: new Re(16777215) }, opacity: { value: 1 }, center: { value: new Ee(.5, .5) }, rotation: { value: 0 }, map: { value: null }, mapTransform: { value: new We }, alphaMap: { value: null }, alphaMapTransform: { value: new We }, alphaTest: { value: 0 } } }, En = { basic: { uniforms: Bt([xe.common, xe.specularmap, xe.envmap, xe.aomap, xe.lightmap, xe.fog]), vertexShader: Ge.meshbasic_vert, fragmentShader: Ge.meshbasic_frag }, lambert: { uniforms: Bt([xe.common, xe.specularmap, xe.envmap, xe.aomap, xe.lightmap, xe.emissivemap, xe.bumpmap, xe.normalmap, xe.displacementmap, xe.fog, xe.lights, { emissive: { value: new Re(0) } }]), vertexShader: Ge.meshlambert_vert, fragmentShader: Ge.meshlambert_frag }, phong: { uniforms: Bt([xe.common, xe.specularmap, xe.envmap, xe.aomap, xe.lightmap, xe.emissivemap, xe.bumpmap, xe.normalmap, xe.displacementmap, xe.fog, xe.lights, { emissive: { value: new Re(0) }, specular: { value: new Re(1118481) }, shininess: { value: 30 } }]), vertexShader: Ge.meshphong_vert, fragmentShader: Ge.meshphong_frag }, standard: { uniforms: Bt([xe.common, xe.envmap, xe.aomap, xe.lightmap, xe.emissivemap, xe.bumpmap, xe.normalmap, xe.displacementmap, xe.roughnessmap, xe.metalnessmap, xe.fog, xe.lights, { emissive: { value: new Re(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } }]), vertexShader: Ge.meshphysical_vert, fragmentShader: Ge.meshphysical_frag }, toon: { uniforms: Bt([xe.common, xe.aomap, xe.lightmap, xe.emissivemap, xe.bumpmap, xe.normalmap, xe.displacementmap, xe.gradientmap, xe.fog, xe.lights, { emissive: { value: new Re(0) } }]), vertexShader: Ge.meshtoon_vert, fragmentShader: Ge.meshtoon_frag }, matcap: { uniforms: Bt([xe.common, xe.bumpmap, xe.normalmap, xe.displacementmap, xe.fog, { matcap: { value: null } }]), vertexShader: Ge.meshmatcap_vert, fragmentShader: Ge.meshmatcap_frag }, points: { uniforms: Bt([xe.points, xe.fog]), vertexShader: Ge.points_vert, fragmentShader: Ge.points_frag }, dashed: { uniforms: Bt([xe.common, xe.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: Ge.linedashed_vert, fragmentShader: Ge.linedashed_frag }, depth: { uniforms: Bt([xe.common, xe.displacementmap]), vertexShader: Ge.depth_vert, fragmentShader: Ge.depth_frag }, normal: { uniforms: Bt([xe.common, xe.bumpmap, xe.normalmap, xe.displacementmap, { opacity: { value: 1 } }]), vertexShader: Ge.meshnormal_vert, fragmentShader: Ge.meshnormal_frag }, sprite: { uniforms: Bt([xe.sprite, xe.fog]), vertexShader: Ge.sprite_vert, fragmentShader: Ge.sprite_frag }, background: { uniforms: { uvTransform: { value: new We }, t2D: { value: null }, backgroundIntensity: { value: 1 } }, vertexShader: Ge.background_vert, fragmentShader: Ge.background_frag }, backgroundCube: { uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 }, backgroundBlurriness: { value: 0 }, backgroundIntensity: { value: 1 }, backgroundRotation: { value: new We } }, vertexShader: Ge.backgroundCube_vert, fragmentShader: Ge.backgroundCube_frag }, cube: { uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } }, vertexShader: Ge.cube_vert, fragmentShader: Ge.cube_frag }, equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: Ge.equirect_vert, fragmentShader: Ge.equirect_frag }, distanceRGBA: { uniforms: Bt([xe.common, xe.displacementmap, { referencePosition: { value: new B }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]), vertexShader: Ge.distanceRGBA_vert, fragmentShader: Ge.distanceRGBA_frag }, shadow: { uniforms: Bt([xe.lights, xe.fog, { color: { value: new Re(0) }, opacity: { value: 1 } }]), vertexShader: Ge.shadow_vert, fragmentShader: Ge.shadow_frag } }; En.physical = { uniforms: Bt([En.standard.uniforms, { clearcoat: { value: 0 }, clearcoatMap: { value: null }, clearcoatMapTransform: { value: new We }, clearcoatNormalMap: { value: null }, clearcoatNormalMapTransform: { value: new We }, clearcoatNormalScale: { value: new Ee(1, 1) }, clearcoatRoughness: { value: 0 }, clearcoatRoughnessMap: { value: null }, clearcoatRoughnessMapTransform: { value: new We }, iridescence: { value: 0 }, iridescenceMap: { value: null }, iridescenceMapTransform: { value: new We }, iridescenceIOR: { value: 1.3 }, iridescenceThicknessMinimum: { value: 100 }, iridescenceThicknessMaximum: { value: 400 }, iridescenceThicknessMap: { value: null }, iridescenceThicknessMapTransform: { value: new We }, sheen: { value: 0 }, sheenColor: { value: new Re(0) }, sheenColorMap: { value: null }, sheenColorMapTransform: { value: new We }, sheenRoughness: { value: 1 }, sheenRoughnessMap: { value: null }, sheenRoughnessMapTransform: { value: new We }, transmission: { value: 0 }, transmissionMap: { value: null }, transmissionMapTransform: { value: new We }, transmissionSamplerSize: { value: new Ee }, transmissionSamplerMap: { value: null }, thickness: { value: 0 }, thicknessMap: { value: null }, thicknessMapTransform: { value: new We }, attenuationDistance: { value: 0 }, attenuationColor: { value: new Re(0) }, specularColor: { value: new Re(1, 1, 1) }, specularColorMap: { value: null }, specularColorMapTransform: { value: new We }, specularIntensity: { value: 1 }, specularIntensityMap: { value: null }, specularIntensityMapTransform: { value: new We }, anisotropyVector: { value: new Ee }, anisotropyMap: { value: null }, anisotropyMapTransform: { value: new We } }]), vertexShader: Ge.meshphysical_vert, fragmentShader: Ge.meshphysical_frag }; const _o = { r: 0, b: 0, g: 0 }, Bi = new Ln, CM = new Oe; function PM(i, e, t, n, s, r, o) { const a = new Re(0); let l = r === !0 ? 0 : 1, c, u, h = null, f = 0, d = null; function _(p, m) { let b = !1, y = m.isScene === !0 ? m.background : null; y && y.isTexture && (y = (m.backgroundBlurriness > 0 ? t : e).get(y)), y === null ? v(a, l) : y && y.isColor && (v(y, 1), b = !0); const A = i.xr.getEnvironmentBlendMode(); A === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, o) : A === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, o), (i.autoClear || b) && i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil), y && (y.isCubeTexture || y.mapping === da) ? (u === void 0 && (u = new Gt(new Br(1, 1, 1), new Wt({ name: "BackgroundCubeMaterial", uniforms: Ws(En.backgroundCube.uniforms), vertexShader: En.backgroundCube.vertexShader, fragmentShader: En.backgroundCube.fragmentShader, side: Xt, depthTest: !1, depthWrite: !1, fog: !1 })), u.geometry.deleteAttribute("normal"), u.geometry.deleteAttribute("uv"), u.onBeforeRender = function (O, P, R) { this.matrixWorld.copyPosition(R.matrixWorld) }, Object.defineProperty(u.material, "envMap", { get: function () { return this.uniforms.envMap.value } }), s.update(u)), Bi.copy(m.backgroundRotation), Bi.x *= -1, Bi.y *= -1, Bi.z *= -1, y.isCubeTexture && y.isRenderTargetTexture === !1 && (Bi.y *= -1, Bi.z *= -1), u.material.uniforms.envMap.value = y, u.material.uniforms.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, u.material.uniforms.backgroundBlurriness.value = m.backgroundBlurriness, u.material.uniforms.backgroundIntensity.value = m.backgroundIntensity, u.material.uniforms.backgroundRotation.value.setFromMatrix4(CM.makeRotationFromEuler(Bi)), u.material.toneMapped = Je.getTransfer(y.colorSpace) !== st, (h !== y || f !== y.version || d !== i.toneMapping) && (u.material.needsUpdate = !0, h = y, f = y.version, d = i.toneMapping), u.layers.enableAll(), p.unshift(u, u.geometry, u.material, 0, 0, null)) : y && y.isTexture && (c === void 0 && (c = new Gt(new ma(2, 2), new Wt({ name: "BackgroundMaterial", uniforms: Ws(En.background.uniforms), vertexShader: En.background.vertexShader, fragmentShader: En.background.fragmentShader, side: Yn, depthTest: !1, depthWrite: !1, fog: !1 })), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function () { return this.uniforms.t2D.value } }), s.update(c)), c.material.uniforms.t2D.value = y, c.material.uniforms.backgroundIntensity.value = m.backgroundIntensity, c.material.toneMapped = Je.getTransfer(y.colorSpace) !== st, y.matrixAutoUpdate === !0 && y.updateMatrix(), c.material.uniforms.uvTransform.value.copy(y.matrix), (h !== y || f !== y.version || d !== i.toneMapping) && (c.material.needsUpdate = !0, h = y, f = y.version, d = i.toneMapping), c.layers.enableAll(), p.unshift(c, c.geometry, c.material, 0, 0, null)) } function v(p, m) { p.getRGB(_o, ep(i)), n.buffers.color.setClear(_o.r, _o.g, _o.b, m, o) } return { getClearColor: function () { return a }, setClearColor: function (p, m = 1) { a.set(p), l = m, v(a, l) }, getClearAlpha: function () { return l }, setClearAlpha: function (p) { l = p, v(a, l) }, render: _ } } function LM(i, e) { const t = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, s = f(null); let r = s, o = !1; function a(M, D, I, C, z) { let Y = !1; const X = h(C, I, D); r !== X && (r = X, c(r.object)), Y = d(M, C, I, z), Y && _(M, C, I, z), z !== null && e.update(z, i.ELEMENT_ARRAY_BUFFER), (Y || o) && (o = !1, A(M, D, I, C), z !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(z).buffer)) } function l() { return i.createVertexArray() } function c(M) { return i.bindVertexArray(M) } function u(M) { return i.deleteVertexArray(M) } function h(M, D, I) { const C = I.wireframe === !0; let z = n[M.id]; z === void 0 && (z = {}, n[M.id] = z); let Y = z[D.id]; Y === void 0 && (Y = {}, z[D.id] = Y); let X = Y[C]; return X === void 0 && (X = f(l()), Y[C] = X), X } function f(M) { const D = [], I = [], C = []; for (let z = 0; z < t; z++)D[z] = 0, I[z] = 0, C[z] = 0; return { geometry: null, program: null, wireframe: !1, newAttributes: D, enabledAttributes: I, attributeDivisors: C, object: M, attributes: {}, index: null } } function d(M, D, I, C) { const z = r.attributes, Y = D.attributes; let X = 0; const ee = I.getAttributes(); for (const G in ee) if (ee[G].location >= 0) { const oe = z[G]; let pe = Y[G]; if (pe === void 0 && (G === "instanceMatrix" && M.instanceMatrix && (pe = M.instanceMatrix), G === "instanceColor" && M.instanceColor && (pe = M.instanceColor)), oe === void 0 || oe.attribute !== pe || pe && oe.data !== pe.data) return !0; X++ } return r.attributesNum !== X || r.index !== C } function _(M, D, I, C) { const z = {}, Y = D.attributes; let X = 0; const ee = I.getAttributes(); for (const G in ee) if (ee[G].location >= 0) { let oe = Y[G]; oe === void 0 && (G === "instanceMatrix" && M.instanceMatrix && (oe = M.instanceMatrix), G === "instanceColor" && M.instanceColor && (oe = M.instanceColor)); const pe = {}; pe.attribute = oe, oe && oe.data && (pe.data = oe.data), z[G] = pe, X++ } r.attributes = z, r.attributesNum = X, r.index = C } function v() { const M = r.newAttributes; for (let D = 0, I = M.length; D < I; D++)M[D] = 0 } function p(M) { m(M, 0) } function m(M, D) { const I = r.newAttributes, C = r.enabledAttributes, z = r.attributeDivisors; I[M] = 1, C[M] === 0 && (i.enableVertexAttribArray(M), C[M] = 1), z[M] !== D && (i.vertexAttribDivisor(M, D), z[M] = D) } function b() { const M = r.newAttributes, D = r.enabledAttributes; for (let I = 0, C = D.length; I < C; I++)D[I] !== M[I] && (i.disableVertexAttribArray(I), D[I] = 0) } function y(M, D, I, C, z, Y, X) { X === !0 ? i.vertexAttribIPointer(M, D, I, z, Y) : i.vertexAttribPointer(M, D, I, C, z, Y) } function A(M, D, I, C) { v(); const z = C.attributes, Y = I.getAttributes(), X = D.defaultAttributeValues; for (const ee in Y) { const G = Y[ee]; if (G.location >= 0) { let ne = z[ee]; if (ne === void 0 && (ee === "instanceMatrix" && M.instanceMatrix && (ne = M.instanceMatrix), ee === "instanceColor" && M.instanceColor && (ne = M.instanceColor)), ne !== void 0) { const oe = ne.normalized, pe = ne.itemSize, ye = e.get(ne); if (ye === void 0) continue; const Pe = ye.buffer, te = ye.type, ue = ye.bytesPerElement, ge = te === i.INT || te === i.UNSIGNED_INT || ne.gpuType === Bd; if (ne.isInterleavedBufferAttribute) { const fe = ne.data, Te = fe.stride, Ae = ne.offset; if (fe.isInstancedInterleavedBuffer) { for (let we = 0; we < G.locationSize; we++)m(G.location + we, fe.meshPerAttribute); M.isInstancedMesh !== !0 && C._maxInstanceCount === void 0 && (C._maxInstanceCount = fe.meshPerAttribute * fe.count) } else for (let we = 0; we < G.locationSize; we++)p(G.location + we); i.bindBuffer(i.ARRAY_BUFFER, Pe); for (let we = 0; we < G.locationSize; we++)y(G.location + we, pe / G.locationSize, te, oe, Te * ue, (Ae + pe / G.locationSize * we) * ue, ge) } else { if (ne.isInstancedBufferAttribute) { for (let fe = 0; fe < G.locationSize; fe++)m(G.location + fe, ne.meshPerAttribute); M.isInstancedMesh !== !0 && C._maxInstanceCount === void 0 && (C._maxInstanceCount = ne.meshPerAttribute * ne.count) } else for (let fe = 0; fe < G.locationSize; fe++)p(G.location + fe); i.bindBuffer(i.ARRAY_BUFFER, Pe); for (let fe = 0; fe < G.locationSize; fe++)y(G.location + fe, pe / G.locationSize, te, oe, pe * ue, pe / G.locationSize * fe * ue, ge) } } else if (X !== void 0) { const oe = X[ee]; if (oe !== void 0) switch (oe.length) { case 2: i.vertexAttrib2fv(G.location, oe); break; case 3: i.vertexAttrib3fv(G.location, oe); break; case 4: i.vertexAttrib4fv(G.location, oe); break; default: i.vertexAttrib1fv(G.location, oe) } } } } b() } function O() { L(); for (const M in n) { const D = n[M]; for (const I in D) { const C = D[I]; for (const z in C) u(C[z].object), delete C[z]; delete D[I] } delete n[M] } } function P(M) { if (n[M.id] === void 0) return; const D = n[M.id]; for (const I in D) { const C = D[I]; for (const z in C) u(C[z].object), delete C[z]; delete D[I] } delete n[M.id] } function R(M) { for (const D in n) { const I = n[D]; if (I[M.id] === void 0) continue; const C = I[M.id]; for (const z in C) u(C[z].object), delete C[z]; delete I[M.id] } } function L() { S(), o = !0, r !== s && (r = s, c(r.object)) } function S() { s.geometry = null, s.program = null, s.wireframe = !1 } return { setup: a, reset: L, resetDefaultState: S, dispose: O, releaseStatesOfGeometry: P, releaseStatesOfProgram: R, initAttributes: v, enableAttribute: p, disableUnusedAttributes: b } } function IM(i, e, t) { let n; function s(l) { n = l } function r(l, c) { i.drawArrays(n, l, c), t.update(c, n, 1) } function o(l, c, u) { u !== 0 && (i.drawArraysInstanced(n, l, c, u), t.update(c, n, u)) } function a(l, c, u) { if (u === 0) return; const h = e.get("WEBGL_multi_draw"); if (h === null) for (let f = 0; f < u; f++)this.render(l[f], c[f]); else { h.multiDrawArraysWEBGL(n, l, 0, c, 0, u); let f = 0; for (let d = 0; d < u; d++)f += c[d]; t.update(f, n, 1) } } this.setMode = s, this.render = r, this.renderInstances = o, this.renderMultiDraw = a } function DM(i, e, t) { let n; function s() { if (n !== void 0) return n; if (e.has("EXT_texture_filter_anisotropic") === !0) { const y = e.get("EXT_texture_filter_anisotropic"); n = i.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT) } else n = 0; return n } function r(y) { if (y === "highp") { if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0) return "highp"; y = "mediump" } return y === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp" } let o = t.precision !== void 0 ? t.precision : "highp"; const a = r(o); a !== o && (console.warn("THREE.WebGLRenderer:", o, "not supported, using", a, "instead."), o = a); const l = t.logarithmicDepthBuffer === !0, c = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), u = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), h = i.getParameter(i.MAX_TEXTURE_SIZE), f = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), d = i.getParameter(i.MAX_VERTEX_ATTRIBS), _ = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), v = i.getParameter(i.MAX_VARYING_VECTORS), p = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), m = u > 0, b = i.getParameter(i.MAX_SAMPLES); return { isWebGL2: !0, getMaxAnisotropy: s, getMaxPrecision: r, precision: o, logarithmicDepthBuffer: l, maxTextures: c, maxVertexTextures: u, maxTextureSize: h, maxCubemapSize: f, maxAttributes: d, maxVertexUniforms: _, maxVaryings: v, maxFragmentUniforms: p, vertexTextures: m, maxSamples: b } } function NM(i) { const e = this; let t = null, n = 0, s = !1, r = !1; const o = new di, a = new We, l = { value: null, needsUpdate: !1 }; this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function (h, f) { const d = h.length !== 0 || f || n !== 0 || s; return s = f, n = h.length, d }, this.beginShadows = function () { r = !0, u(null) }, this.endShadows = function () { r = !1 }, this.setGlobalState = function (h, f) { t = u(h, f, 0) }, this.setState = function (h, f, d) { const _ = h.clippingPlanes, v = h.clipIntersection, p = h.clipShadows, m = i.get(h); if (!s || _ === null || _.length === 0 || r && !p) r ? u(null) : c(); else { const b = r ? 0 : n, y = b * 4; let A = m.clippingState || null; l.value = A, A = u(_, f, y, d); for (let O = 0; O !== y; ++O)A[O] = t[O]; m.clippingState = A, this.numIntersection = v ? this.numPlanes : 0, this.numPlanes += b } }; function c() { l.value !== t && (l.value = t, l.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0 } function u(h, f, d, _) { const v = h !== null ? h.length : 0; let p = null; if (v !== 0) { if (p = l.value, _ !== !0 || p === null) { const m = d + v * 4, b = f.matrixWorldInverse; a.getNormalMatrix(b), (p === null || p.length < m) && (p = new Float32Array(m)); for (let y = 0, A = d; y !== v; ++y, A += 4)o.copy(h[y]).applyMatrix4(b, a), o.normal.toArray(p, A), p[A + 3] = o.constant } l.value = p, l.needsUpdate = !0 } return e.numPlanes = v, e.numIntersection = 0, p } } function UM(i) { let e = new WeakMap; function t(o, a) { return a === Vl ? o.mapping = Bs : a === Gl && (o.mapping = ks), o } function n(o) { if (o && o.isTexture) { const a = o.mapping; if (a === Vl || a === Gl) if (e.has(o)) { const l = e.get(o).texture; return t(l, o.mapping) } else { const l = o.image; if (l && l.height > 0) { const c = new X0(l.height); return c.fromEquirectangularTexture(i, o), e.set(o, c), o.addEventListener("dispose", s), t(c.texture, o.mapping) } else return null } } return o } function s(o) { const a = o.target; a.removeEventListener("dispose", s); const l = e.get(a); l !== void 0 && (e.delete(a), l.dispose()) } function r() { e = new WeakMap } return { get: n, dispose: r } } class ga extends tp { constructor(e = -1, t = 1, n = 1, s = -1, r = .1, o = 2e3) { super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = s, this.near = r, this.far = o, this.updateProjectionMatrix() } copy(e, t) { return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this } setViewOffset(e, t, n, s, r, o) { this.view === null && (this.view = { enabled: !0, fullWidth: 1, fullHeight: 1, offsetX: 0, offsetY: 0, width: 1, height: 1 }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = o, this.updateProjectionMatrix() } clearViewOffset() { this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix() } updateProjectionMatrix() { const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, s = (this.top + this.bottom) / 2; let r = n - e, o = n + e, a = s + t, l = s - t; if (this.view !== null && this.view.enabled) { const c = (this.right - this.left) / this.view.fullWidth / this.zoom, u = (this.top - this.bottom) / this.view.fullHeight / this.zoom; r += c * this.view.offsetX, o = r + c * this.view.width, a -= u * this.view.offsetY, l = a - u * this.view.height } this.projectionMatrix.makeOrthographic(r, o, a, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert() } toJSON(e) { const t = super.toJSON(e); return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t } } const ws = 4, Ch = [.125, .215, .35, .446, .526, .582], Wi = 20, ol = new ga, Ph = new Re; let al = null, ll = 0, cl = 0, ul = !1; const zi = (1 + Math.sqrt(5)) / 2, Ms = 1 / zi, Lh = [new B(1, 1, 1), new B(-1, 1, 1), new B(1, 1, -1), new B(-1, 1, -1), new B(0, zi, Ms), new B(0, zi, -Ms), new B(Ms, 0, zi), new B(-Ms, 0, zi), new B(zi, Ms, 0), new B(-zi, Ms, 0)]; class jl { constructor(e) { this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial) } fromScene(e, t = 0, n = .1, s = 100) { al = this._renderer.getRenderTarget(), ll = this._renderer.getActiveCubeFace(), cl = this._renderer.getActiveMipmapLevel(), ul = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256); const r = this._allocateTargets(); return r.depthBuffer = !0, this._sceneToCubeUV(e, n, s, r), t > 0 && this._blur(r, 0, 0, t), this._applyPMREM(r), this._cleanup(r), r } fromEquirectangular(e, t = null) { return this._fromTexture(e, t) } fromCubemap(e, t = null) { return this._fromTexture(e, t) } compileCubemapShader() { this._cubemapMaterial === null && (this._cubemapMaterial = Nh(), this._compileMaterial(this._cubemapMaterial)) } compileEquirectangularShader() { this._equirectMaterial === null && (this._equirectMaterial = Dh(), this._compileMaterial(this._equirectMaterial)) } dispose() { this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose() } _setSize(e) { this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax) } _dispose() { this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose(); for (let e = 0; e < this._lodPlanes.length; e++)this._lodPlanes[e].dispose() } _cleanup(e) { this._renderer.setRenderTarget(al, ll, cl), this._renderer.xr.enabled = ul, e.scissorTest = !1, xo(e, 0, 0, e.width, e.height) } _fromTexture(e, t) { e.mapping === Bs || e.mapping === ks ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), al = this._renderer.getRenderTarget(), ll = this._renderer.getActiveCubeFace(), cl = this._renderer.getActiveMipmapLevel(), ul = this._renderer.xr.enabled, this._renderer.xr.enabled = !1; const n = t || this._allocateTargets(); return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n } _allocateTargets() { const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = { magFilter: At, minFilter: At, generateMipmaps: !1, type: gn, format: _n, colorSpace: xt, depthBuffer: !1 }, s = Ih(e, t, n); if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) { this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Ih(e, t, n); const { _lodMax: r } = this; ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = OM(r)), this._blurMaterial = FM(r, e, t) } return s } _compileMaterial(e) { const t = new Gt(this._lodPlanes[0], e); this._renderer.compile(t, ol) } _sceneToCubeUV(e, t, n, s) { const a = new kt(90, 1, t, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], u = this._renderer, h = u.autoClear, f = u.toneMapping; u.getClearColor(Ph), u.toneMapping = Si, u.autoClear = !1; const d = new ji({ name: "PMREM.Background", side: Xt, depthWrite: !1, depthTest: !1 }), _ = new Gt(new Br, d); let v = !1; const p = e.background; p ? p.isColor && (d.color.copy(p), e.background = null, v = !0) : (d.color.copy(Ph), v = !0); for (let m = 0; m < 6; m++) { const b = m % 3; b === 0 ? (a.up.set(0, l[m], 0), a.lookAt(c[m], 0, 0)) : b === 1 ? (a.up.set(0, 0, l[m]), a.lookAt(0, c[m], 0)) : (a.up.set(0, l[m], 0), a.lookAt(0, 0, c[m])); const y = this._cubeSize; xo(s, b * y, m > 2 ? y : 0, y, y), u.setRenderTarget(s), v && u.render(_, a), u.render(e, a) } _.geometry.dispose(), _.material.dispose(), u.toneMapping = f, u.autoClear = h, e.background = p } _textureToCubeUV(e, t) { const n = this._renderer, s = e.mapping === Bs || e.mapping === ks; s ? (this._cubemapMaterial === null && (this._cubemapMaterial = Nh()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Dh()); const r = s ? this._cubemapMaterial : this._equirectMaterial, o = new Gt(this._lodPlanes[0], r), a = r.uniforms; a.envMap.value = e; const l = this._cubeSize; xo(t, 0, 0, 3 * l, 2 * l), n.setRenderTarget(t), n.render(o, ol) } _applyPMREM(e) { const t = this._renderer, n = t.autoClear; t.autoClear = !1; for (let s = 1; s < this._lodPlanes.length; s++) { const r = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]), o = Lh[(s - 1) % Lh.length]; this._blur(e, s - 1, s, r, o) } t.autoClear = n } _blur(e, t, n, s, r) { const o = this._pingPongRenderTarget; this._halfBlur(e, o, t, n, s, "latitudinal", r), this._halfBlur(o, e, n, n, s, "longitudinal", r) } _halfBlur(e, t, n, s, r, o, a) { const l = this._renderer, c = this._blurMaterial; o !== "latitudinal" && o !== "longitudinal" && console.error("blur direction must be either latitudinal or longitudinal!"); const u = 3, h = new Gt(this._lodPlanes[s], c), f = c.uniforms, d = this._sizeLods[n] - 1, _ = isFinite(r) ? Math.PI / (2 * d) : 2 * Math.PI / (2 * Wi - 1), v = r / _, p = isFinite(r) ? 1 + Math.floor(u * v) : Wi; p > Wi && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Wi}`); const m = []; let b = 0; for (let R = 0; R < Wi; ++R) { const L = R / v, S = Math.exp(-L * L / 2); m.push(S), R === 0 ? b += S : R < p && (b += 2 * S) } for (let R = 0; R < m.length; R++)m[R] = m[R] / b; f.envMap.value = e.texture, f.samples.value = p, f.weights.value = m, f.latitudinal.value = o === "latitudinal", a && (f.poleAxis.value = a); const { _lodMax: y } = this; f.dTheta.value = _, f.mipInt.value = y - n; const A = this._sizeLods[s], O = 3 * A * (s > y - ws ? s - y + ws : 0), P = 4 * (this._cubeSize - A); xo(t, O, P, 3 * A, 2 * A), l.setRenderTarget(t), l.render(h, ol) } } function OM(i) { const e = [], t = [], n = []; let s = i; const r = i - ws + 1 + Ch.length; for (let o = 0; o < r; o++) { const a = Math.pow(2, s); t.push(a); let l = 1 / a; o > i - ws ? l = Ch[o - i + ws - 1] : o === 0 && (l = 0), n.push(l); const c = 1 / (a - 2), u = -c, h = 1 + c, f = [u, u, h, u, h, h, u, u, h, h, u, h], d = 6, _ = 6, v = 3, p = 2, m = 1, b = new Float32Array(v * _ * d), y = new Float32Array(p * _ * d), A = new Float32Array(m * _ * d); for (let P = 0; P < d; P++) { const R = P % 3 * 2 / 3 - 1, L = P > 2 ? 0 : -1, S = [R, L, 0, R + 2 / 3, L, 0, R + 2 / 3, L + 1, 0, R, L, 0, R + 2 / 3, L + 1, 0, R, L + 1, 0]; b.set(S, v * _ * P), y.set(f, p * _ * P); const M = [P, P, P, P, P, P]; A.set(M, m * _ * P) } const O = new Jt; O.setAttribute("position", new Ct(b, v)), O.setAttribute("uv", new Ct(y, p)), O.setAttribute("faceIndex", new Ct(A, m)), e.push(O), s > ws && s-- } return { lodPlanes: e, sizeLods: t, sigmas: n } } function Ih(i, e, t) { const n = new Cn(i, e, t); return n.texture.mapping = da, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n } function xo(i, e, t, n, s) { i.viewport.set(e, t, n, s), i.scissor.set(e, t, n, s) } function FM(i, e, t) {
	const n = new Float32Array(Wi), s = new B(0, 1, 0); return new Wt({
		name: "SphericalGaussianBlur", defines: { n: Wi, CUBEUV_TEXEL_WIDTH: 1 / e, CUBEUV_TEXEL_HEIGHT: 1 / t, CUBEUV_MAX_MIP: `${i}.0` }, uniforms: { envMap: { value: null }, samples: { value: 1 }, weights: { value: n }, latitudinal: { value: !1 }, dTheta: { value: 0 }, mipInt: { value: 0 }, poleAxis: { value: s } }, vertexShader: Pc(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`, blending: Dt, depthTest: !1, depthWrite: !1
	})
} function Dh() {
	return new Wt({
		name: "EquirectangularToCubeUV", uniforms: { envMap: { value: null } }, vertexShader: Pc(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`, blending: Dt, depthTest: !1, depthWrite: !1
	})
} function Nh() {
	return new Wt({
		name: "CubemapToCubeUV", uniforms: { envMap: { value: null }, flipEnvMap: { value: -1 } }, vertexShader: Pc(), fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`, blending: Dt, depthTest: !1, depthWrite: !1
	})
} function Pc() {
	return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`} function BM(i) { let e = new WeakMap, t = null; function n(a) { if (a && a.isTexture) { const l = a.mapping, c = l === Vl || l === Gl, u = l === Bs || l === ks; if (c || u) { let h = e.get(a); const f = h !== void 0 ? h.texture.pmremVersion : 0; if (a.isRenderTargetTexture && a.pmremVersion !== f) return t === null && (t = new jl(i)), h = c ? t.fromEquirectangular(a, h) : t.fromCubemap(a, h), h.texture.pmremVersion = a.pmremVersion, e.set(a, h), h.texture; if (h !== void 0) return h.texture; { const d = a.image; return c && d && d.height > 0 || u && d && s(d) ? (t === null && (t = new jl(i)), h = c ? t.fromEquirectangular(a) : t.fromCubemap(a), h.texture.pmremVersion = a.pmremVersion, e.set(a, h), a.addEventListener("dispose", r), h.texture) : null } } } return a } function s(a) { let l = 0; const c = 6; for (let u = 0; u < c; u++)a[u] !== void 0 && l++; return l === c } function r(a) { const l = a.target; l.removeEventListener("dispose", r); const c = e.get(l); c !== void 0 && (e.delete(l), c.dispose()) } function o() { e = new WeakMap, t !== null && (t.dispose(), t = null) } return { get: n, dispose: o } } function kM(i) { const e = {}; function t(n) { if (e[n] !== void 0) return e[n]; let s; switch (n) { case "WEBGL_depth_texture": s = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture"); break; case "EXT_texture_filter_anisotropic": s = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic"); break; case "WEBGL_compressed_texture_s3tc": s = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc"); break; case "WEBGL_compressed_texture_pvrtc": s = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"); break; default: s = i.getExtension(n) }return e[n] = s, s } return { has: function (n) { return t(n) !== null }, init: function () { t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent") }, get: function (n) { const s = t(n); return s === null && console.warn("THREE.WebGLRenderer: " + n + " extension not supported."), s } } } function HM(i, e, t, n) { const s = {}, r = new WeakMap; function o(h) { const f = h.target; f.index !== null && e.remove(f.index); for (const _ in f.attributes) e.remove(f.attributes[_]); for (const _ in f.morphAttributes) { const v = f.morphAttributes[_]; for (let p = 0, m = v.length; p < m; p++)e.remove(v[p]) } f.removeEventListener("dispose", o), delete s[f.id]; const d = r.get(f); d && (e.remove(d), r.delete(f)), n.releaseStatesOfGeometry(f), f.isInstancedBufferGeometry === !0 && delete f._maxInstanceCount, t.memory.geometries-- } function a(h, f) { return s[f.id] === !0 || (f.addEventListener("dispose", o), s[f.id] = !0, t.memory.geometries++), f } function l(h) { const f = h.attributes; for (const _ in f) e.update(f[_], i.ARRAY_BUFFER); const d = h.morphAttributes; for (const _ in d) { const v = d[_]; for (let p = 0, m = v.length; p < m; p++)e.update(v[p], i.ARRAY_BUFFER) } } function c(h) { const f = [], d = h.index, _ = h.attributes.position; let v = 0; if (d !== null) { const b = d.array; v = d.version; for (let y = 0, A = b.length; y < A; y += 3) { const O = b[y + 0], P = b[y + 1], R = b[y + 2]; f.push(O, P, P, R, R, O) } } else if (_ !== void 0) { const b = _.array; v = _.version; for (let y = 0, A = b.length / 3 - 1; y < A; y += 3) { const O = y + 0, P = y + 1, R = y + 2; f.push(O, P, P, R, R, O) } } else return; const p = new (Yd(f) ? Qd : Jd)(f, 1); p.version = v; const m = r.get(h); m && e.remove(m), r.set(h, p) } function u(h) { const f = r.get(h); if (f) { const d = h.index; d !== null && f.version < d.version && c(h) } else c(h); return r.get(h) } return { get: a, update: l, getWireframeAttribute: u } } function zM(i, e, t) { let n; function s(h) { n = h } let r, o; function a(h) { r = h.type, o = h.bytesPerElement } function l(h, f) { i.drawElements(n, f, r, h * o), t.update(f, n, 1) } function c(h, f, d) { d !== 0 && (i.drawElementsInstanced(n, f, r, h * o, d), t.update(f, n, d)) } function u(h, f, d) { if (d === 0) return; const _ = e.get("WEBGL_multi_draw"); if (_ === null) for (let v = 0; v < d; v++)this.render(h[v] / o, f[v]); else { _.multiDrawElementsWEBGL(n, f, 0, r, h, 0, d); let v = 0; for (let p = 0; p < d; p++)v += f[p]; t.update(v, n, 1) } } this.setMode = s, this.setIndex = a, this.render = l, this.renderInstances = c, this.renderMultiDraw = u } function VM(i) { const e = { geometries: 0, textures: 0 }, t = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 }; function n(r, o, a) { switch (t.calls++, o) { case i.TRIANGLES: t.triangles += a * (r / 3); break; case i.LINES: t.lines += a * (r / 2); break; case i.LINE_STRIP: t.lines += a * (r - 1); break; case i.LINE_LOOP: t.lines += a * r; break; case i.POINTS: t.points += a * r; break; default: console.error("THREE.WebGLInfo: Unknown draw mode:", o); break } } function s() { t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0 } return { memory: e, render: t, programs: null, autoReset: !0, reset: s, update: n } } function GM(i, e, t) { const n = new WeakMap, s = new it; function r(o, a, l) { const c = o.morphTargetInfluences, u = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, h = u !== void 0 ? u.length : 0; let f = n.get(a); if (f === void 0 || f.count !== h) { let M = function () { L.dispose(), n.delete(a), a.removeEventListener("dispose", M) }; var d = M; f !== void 0 && f.texture.dispose(); const _ = a.morphAttributes.position !== void 0, v = a.morphAttributes.normal !== void 0, p = a.morphAttributes.color !== void 0, m = a.morphAttributes.position || [], b = a.morphAttributes.normal || [], y = a.morphAttributes.color || []; let A = 0; _ === !0 && (A = 1), v === !0 && (A = 2), p === !0 && (A = 3); let O = a.attributes.position.count * A, P = 1; O > e.maxTextureSize && (P = Math.ceil(O / e.maxTextureSize), O = e.maxTextureSize); const R = new Float32Array(O * P * 4 * h), L = new $d(R, O, P, h); L.type = Vt, L.needsUpdate = !0; const S = A * 4; for (let D = 0; D < h; D++) { const I = m[D], C = b[D], z = y[D], Y = O * P * 4 * D; for (let X = 0; X < I.count; X++) { const ee = X * S; _ === !0 && (s.fromBufferAttribute(I, X), R[Y + ee + 0] = s.x, R[Y + ee + 1] = s.y, R[Y + ee + 2] = s.z, R[Y + ee + 3] = 0), v === !0 && (s.fromBufferAttribute(C, X), R[Y + ee + 4] = s.x, R[Y + ee + 5] = s.y, R[Y + ee + 6] = s.z, R[Y + ee + 7] = 0), p === !0 && (s.fromBufferAttribute(z, X), R[Y + ee + 8] = s.x, R[Y + ee + 9] = s.y, R[Y + ee + 10] = s.z, R[Y + ee + 11] = z.itemSize === 4 ? s.w : 1) } } f = { count: h, texture: L, size: new Ee(O, P) }, n.set(a, f), a.addEventListener("dispose", M) } if (o.isInstancedMesh === !0 && o.morphTexture !== null) l.getUniforms().setValue(i, "morphTexture", o.morphTexture, t); else { let _ = 0; for (let p = 0; p < c.length; p++)_ += c[p]; const v = a.morphTargetsRelative ? 1 : 1 - _; l.getUniforms().setValue(i, "morphTargetBaseInfluence", v), l.getUniforms().setValue(i, "morphTargetInfluences", c) } l.getUniforms().setValue(i, "morphTargetsTexture", f.texture, t), l.getUniforms().setValue(i, "morphTargetsTextureSize", f.size) } return { update: r } } function WM(i, e, t, n) { let s = new WeakMap; function r(l) { const c = n.render.frame, u = l.geometry, h = e.get(l, u); if (s.get(h) !== c && (e.update(h), s.set(h, c)), l.isInstancedMesh && (l.hasEventListener("dispose", a) === !1 && l.addEventListener("dispose", a), s.get(l) !== c && (t.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, i.ARRAY_BUFFER), s.set(l, c))), l.isSkinnedMesh) { const f = l.skeleton; s.get(f) !== c && (f.update(), s.set(f, c)) } return h } function o() { s = new WeakMap } function a(l) { const c = l.target; c.removeEventListener("dispose", a), t.remove(c.instanceMatrix), c.instanceColor !== null && t.remove(c.instanceColor) } return { update: r, dispose: o } } class Lc extends wt { constructor(e, t, n, s, r, o, a, l, c, u) { if (u = u !== void 0 ? u : Ds, u !== Ds && u !== zs) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat"); n === void 0 && u === Ds && (n = Hs), n === void 0 && u === zs && (n = Ks), super(null, s, r, o, a, l, u, n, c), this.isDepthTexture = !0, this.image = { width: e, height: t }, this.magFilter = a !== void 0 ? a : Rt, this.minFilter = l !== void 0 ? l : Rt, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null } copy(e) { return super.copy(e), this.compareFunction = e.compareFunction, this } toJSON(e) { const t = super.toJSON(e); return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t } } const sp = new wt, rp = new Lc(1, 1); rp.compareFunction = jd; const op = new $d, ap = new w0, lp = new np, Uh = [], Oh = [], Fh = new Float32Array(16), Bh = new Float32Array(9), kh = new Float32Array(4); function Zs(i, e, t) { const n = i[0]; if (n <= 0 || n > 0) return i; const s = e * t; let r = Uh[s]; if (r === void 0 && (r = new Float32Array(s), Uh[s] = r), e !== 0) { n.toArray(r, 0); for (let o = 1, a = 0; o !== e; ++o)a += t, i[o].toArray(r, a) } return r } function vt(i, e) { if (i.length !== e.length) return !1; for (let t = 0, n = i.length; t < n; t++)if (i[t] !== e[t]) return !1; return !0 } function Mt(i, e) { for (let t = 0, n = e.length; t < n; t++)i[t] = e[t] } function _a(i, e) { let t = Oh[e]; t === void 0 && (t = new Int32Array(e), Oh[e] = t); for (let n = 0; n !== e; ++n)t[n] = i.allocateTextureUnit(); return t } function XM(i, e) { const t = this.cache; t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e) } function jM(i, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y); else { if (vt(t, e)) return; i.uniform2fv(this.addr, e), Mt(t, e) } } function YM(i, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z); else if (e.r !== void 0) (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b); else { if (vt(t, e)) return; i.uniform3fv(this.addr, e), Mt(t, e) } } function qM(i, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w); else { if (vt(t, e)) return; i.uniform4fv(this.addr, e), Mt(t, e) } } function KM(i, e) { const t = this.cache, n = e.elements; if (n === void 0) { if (vt(t, e)) return; i.uniformMatrix2fv(this.addr, !1, e), Mt(t, e) } else { if (vt(t, n)) return; kh.set(n), i.uniformMatrix2fv(this.addr, !1, kh), Mt(t, n) } } function $M(i, e) { const t = this.cache, n = e.elements; if (n === void 0) { if (vt(t, e)) return; i.uniformMatrix3fv(this.addr, !1, e), Mt(t, e) } else { if (vt(t, n)) return; Bh.set(n), i.uniformMatrix3fv(this.addr, !1, Bh), Mt(t, n) } } function ZM(i, e) { const t = this.cache, n = e.elements; if (n === void 0) { if (vt(t, e)) return; i.uniformMatrix4fv(this.addr, !1, e), Mt(t, e) } else { if (vt(t, n)) return; Fh.set(n), i.uniformMatrix4fv(this.addr, !1, Fh), Mt(t, n) } } function JM(i, e) { const t = this.cache; t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e) } function QM(i, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y); else { if (vt(t, e)) return; i.uniform2iv(this.addr, e), Mt(t, e) } } function ey(i, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z); else { if (vt(t, e)) return; i.uniform3iv(this.addr, e), Mt(t, e) } } function ty(i, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w); else { if (vt(t, e)) return; i.uniform4iv(this.addr, e), Mt(t, e) } } function ny(i, e) { const t = this.cache; t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e) } function iy(i, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y); else { if (vt(t, e)) return; i.uniform2uiv(this.addr, e), Mt(t, e) } } function sy(i, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z); else { if (vt(t, e)) return; i.uniform3uiv(this.addr, e), Mt(t, e) } } function ry(i, e) { const t = this.cache; if (e.x !== void 0) (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w); else { if (vt(t, e)) return; i.uniform4uiv(this.addr, e), Mt(t, e) } } function oy(i, e, t) { const n = this.cache, s = t.allocateTextureUnit(); n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s); const r = this.type === i.SAMPLER_2D_SHADOW ? rp : sp; t.setTexture2D(e || r, s) } function ay(i, e, t) { const n = this.cache, s = t.allocateTextureUnit(); n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), t.setTexture3D(e || ap, s) } function ly(i, e, t) { const n = this.cache, s = t.allocateTextureUnit(); n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), t.setTextureCube(e || lp, s) } function cy(i, e, t) { const n = this.cache, s = t.allocateTextureUnit(); n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), t.setTexture2DArray(e || op, s) } function uy(i) { switch (i) { case 5126: return XM; case 35664: return jM; case 35665: return YM; case 35666: return qM; case 35674: return KM; case 35675: return $M; case 35676: return ZM; case 5124: case 35670: return JM; case 35667: case 35671: return QM; case 35668: case 35672: return ey; case 35669: case 35673: return ty; case 5125: return ny; case 36294: return iy; case 36295: return sy; case 36296: return ry; case 35678: case 36198: case 36298: case 36306: case 35682: return oy; case 35679: case 36299: case 36307: return ay; case 35680: case 36300: case 36308: case 36293: return ly; case 36289: case 36303: case 36311: case 36292: return cy } } function hy(i, e) { i.uniform1fv(this.addr, e) } function fy(i, e) { const t = Zs(e, this.size, 2); i.uniform2fv(this.addr, t) } function dy(i, e) { const t = Zs(e, this.size, 3); i.uniform3fv(this.addr, t) } function py(i, e) { const t = Zs(e, this.size, 4); i.uniform4fv(this.addr, t) } function my(i, e) { const t = Zs(e, this.size, 4); i.uniformMatrix2fv(this.addr, !1, t) } function gy(i, e) { const t = Zs(e, this.size, 9); i.uniformMatrix3fv(this.addr, !1, t) } function _y(i, e) { const t = Zs(e, this.size, 16); i.uniformMatrix4fv(this.addr, !1, t) } function xy(i, e) { i.uniform1iv(this.addr, e) } function vy(i, e) { i.uniform2iv(this.addr, e) } function My(i, e) { i.uniform3iv(this.addr, e) } function yy(i, e) { i.uniform4iv(this.addr, e) } function Sy(i, e) { i.uniform1uiv(this.addr, e) } function Ey(i, e) { i.uniform2uiv(this.addr, e) } function Ty(i, e) { i.uniform3uiv(this.addr, e) } function by(i, e) { i.uniform4uiv(this.addr, e) } function Ay(i, e, t) { const n = this.cache, s = e.length, r = _a(t, s); vt(n, r) || (i.uniform1iv(this.addr, r), Mt(n, r)); for (let o = 0; o !== s; ++o)t.setTexture2D(e[o] || sp, r[o]) } function wy(i, e, t) { const n = this.cache, s = e.length, r = _a(t, s); vt(n, r) || (i.uniform1iv(this.addr, r), Mt(n, r)); for (let o = 0; o !== s; ++o)t.setTexture3D(e[o] || ap, r[o]) } function Ry(i, e, t) { const n = this.cache, s = e.length, r = _a(t, s); vt(n, r) || (i.uniform1iv(this.addr, r), Mt(n, r)); for (let o = 0; o !== s; ++o)t.setTextureCube(e[o] || lp, r[o]) } function Cy(i, e, t) { const n = this.cache, s = e.length, r = _a(t, s); vt(n, r) || (i.uniform1iv(this.addr, r), Mt(n, r)); for (let o = 0; o !== s; ++o)t.setTexture2DArray(e[o] || op, r[o]) } function Py(i) { switch (i) { case 5126: return hy; case 35664: return fy; case 35665: return dy; case 35666: return py; case 35674: return my; case 35675: return gy; case 35676: return _y; case 5124: case 35670: return xy; case 35667: case 35671: return vy; case 35668: case 35672: return My; case 35669: case 35673: return yy; case 5125: return Sy; case 36294: return Ey; case 36295: return Ty; case 36296: return by; case 35678: case 36198: case 36298: case 36306: case 35682: return Ay; case 35679: case 36299: case 36307: return wy; case 35680: case 36300: case 36308: case 36293: return Ry; case 36289: case 36303: case 36311: case 36292: return Cy } } class Ly { constructor(e, t, n) { this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = uy(t.type) } } class Iy { constructor(e, t, n) { this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Py(t.type) } } class Dy { constructor(e) { this.id = e, this.seq = [], this.map = {} } setValue(e, t, n) { const s = this.seq; for (let r = 0, o = s.length; r !== o; ++r) { const a = s[r]; a.setValue(e, t[a.id], n) } } } const hl = /(\w+)(\])?(\[|\.)?/g; function Hh(i, e) { i.seq.push(e), i.map[e.id] = e } function Ny(i, e, t) { const n = i.name, s = n.length; for (hl.lastIndex = 0; ;) { const r = hl.exec(n), o = hl.lastIndex; let a = r[1]; const l = r[2] === "]", c = r[3]; if (l && (a = a | 0), c === void 0 || c === "[" && o + 2 === s) { Hh(t, c === void 0 ? new Ly(a, i, e) : new Iy(a, i, e)); break } else { let h = t.map[a]; h === void 0 && (h = new Dy(a), Hh(t, h)), t = h } } } class Bo { constructor(e, t) { this.seq = [], this.map = {}; const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS); for (let s = 0; s < n; ++s) { const r = e.getActiveUniform(t, s), o = e.getUniformLocation(t, r.name); Ny(r, o, this) } } setValue(e, t, n, s) { const r = this.map[t]; r !== void 0 && r.setValue(e, n, s) } setOptional(e, t, n) { const s = t[n]; s !== void 0 && this.setValue(e, n, s) } static upload(e, t, n, s) { for (let r = 0, o = t.length; r !== o; ++r) { const a = t[r], l = n[a.id]; l.needsUpdate !== !1 && a.setValue(e, l.value, s) } } static seqWithValue(e, t) { const n = []; for (let s = 0, r = e.length; s !== r; ++s) { const o = e[s]; o.id in t && n.push(o) } return n } } function zh(i, e, t) { const n = i.createShader(e); return i.shaderSource(n, t), i.compileShader(n), n } const Uy = 37297; let Oy = 0; function Fy(i, e) {
	const t = i.split(`
`), n = [], s = Math.max(e - 6, 0), r = Math.min(e + 6, t.length); for (let o = s; o < r; o++) { const a = o + 1; n.push(`${a === e ? ">" : " "} ${a}: ${t[o]}`) } return n.join(`
`)
} function By(i) { const e = Je.getPrimaries(Je.workingColorSpace), t = Je.getPrimaries(i); let n; switch (e === t ? n = "" : e === Jo && t === Zo ? n = "LinearDisplayP3ToLinearSRGB" : e === Zo && t === Jo && (n = "LinearSRGBToLinearDisplayP3"), i) { case xt: case pa: return [n, "LinearTransferOETF"]; case Tt: case bc: return [n, "sRGBTransferOETF"]; default: return console.warn("THREE.WebGLProgram: Unsupported color space:", i), [n, "LinearTransferOETF"] } } function Vh(i, e, t) {
	const n = i.getShaderParameter(e, i.COMPILE_STATUS), s = i.getShaderInfoLog(e).trim(); if (n && s === "") return ""; const r = /ERROR: 0:(\d+)/.exec(s); if (r) {
		const o = parseInt(r[1]); return t.toUpperCase() + `

`+ s + `

`+ Fy(i.getShaderSource(e), o)
	} else return s
} function ky(i, e) { const t = By(e); return `vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }` } function Hy(i, e) { let t; switch (e) { case P_: t = "Linear"; break; case L_: t = "Reinhard"; break; case I_: t = "OptimizedCineon"; break; case D_: t = "ACESFilmic"; break; case U_: t = "AgX"; break; case O_: t = "Neutral"; break; case N_: t = "Custom"; break; default: console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear" }return "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }" } function zy(i) {
	return [i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(gr).join(`
`)
} function Vy(i) {
	const e = []; for (const t in i) { const n = i[t]; n !== !1 && e.push("#define " + t + " " + n) } return e.join(`
`)
} function Gy(i, e) { const t = {}, n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES); for (let s = 0; s < n; s++) { const r = i.getActiveAttrib(e, s), o = r.name; let a = 1; r.type === i.FLOAT_MAT2 && (a = 2), r.type === i.FLOAT_MAT3 && (a = 3), r.type === i.FLOAT_MAT4 && (a = 4), t[o] = { type: r.type, location: i.getAttribLocation(e, o), locationSize: a } } return t } function gr(i) { return i !== "" } function Gh(i, e) { const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps; return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows) } function Wh(i, e) { return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection) } const Wy = /^[ \t]*#include +<([\w\d./]+)>/gm; function Yl(i) { return i.replace(Wy, jy) } const Xy = new Map([["encodings_fragment", "colorspace_fragment"], ["encodings_pars_fragment", "colorspace_pars_fragment"], ["output_fragment", "opaque_fragment"]]); function jy(i, e) { let t = Ge[e]; if (t === void 0) { const n = Xy.get(e); if (n !== void 0) t = Ge[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n); else throw new Error("Can not resolve #include <" + e + ">") } return Yl(t) } const Yy = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g; function Xh(i) { return i.replace(Yy, qy) } function qy(i, e, t, n) { let s = ""; for (let r = parseInt(e); r < parseInt(t); r++)s += n.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r); return s } function jh(i) {
	let e = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`; return i.precision === "highp" ? e += `
#define HIGH_PRECISION`: i.precision === "mediump" ? e += `
#define MEDIUM_PRECISION`: i.precision === "lowp" && (e += `
#define LOW_PRECISION`), e
} function Ky(i) { let e = "SHADOWMAP_TYPE_BASIC"; return i.shadowMapType === Cd ? e = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === Pd ? e = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === zn && (e = "SHADOWMAP_TYPE_VSM"), e } function $y(i) { let e = "ENVMAP_TYPE_CUBE"; if (i.envMap) switch (i.envMapMode) { case Bs: case ks: e = "ENVMAP_TYPE_CUBE"; break; case da: e = "ENVMAP_TYPE_CUBE_UV"; break }return e } function Zy(i) { let e = "ENVMAP_MODE_REFLECTION"; if (i.envMap) switch (i.envMapMode) { case ks: e = "ENVMAP_MODE_REFRACTION"; break }return e } function Jy(i) { let e = "ENVMAP_BLENDING_NONE"; if (i.envMap) switch (i.combine) { case Nd: e = "ENVMAP_BLENDING_MULTIPLY"; break; case R_: e = "ENVMAP_BLENDING_MIX"; break; case C_: e = "ENVMAP_BLENDING_ADD"; break }return e } function Qy(i) { const e = i.envMapCubeUVHeight; if (e === null) return null; const t = Math.log2(e) - 2, n = 1 / e; return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 7 * 16)), texelHeight: n, maxMip: t } } function eS(i, e, t, n) {
	const s = i.getContext(), r = t.defines; let o = t.vertexShader, a = t.fragmentShader; const l = Ky(t), c = $y(t), u = Zy(t), h = Jy(t), f = Qy(t), d = zy(t), _ = Vy(r), v = s.createProgram(); let p, m, b = t.glslVersion ? "#version " + t.glslVersion + `
`: ""; t.isRawShaderMaterial ? (p = ["#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, _].filter(gr).join(`
`), p.length > 0 && (p += `
`), m = ["#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, _].filter(gr).join(`
`), m.length > 0 && (m += `
`)) : (p = [jh(t), "#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, _, t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", t.batching ? "#define USE_BATCHING" : "", t.instancing ? "#define USE_INSTANCING" : "", t.instancingColor ? "#define USE_INSTANCING_COLOR" : "", t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "", t.useFog && t.fog ? "#define USE_FOG" : "", t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "", t.map ? "#define USE_MAP" : "", t.envMap ? "#define USE_ENVMAP" : "", t.envMap ? "#define " + u : "", t.lightMap ? "#define USE_LIGHTMAP" : "", t.aoMap ? "#define USE_AOMAP" : "", t.bumpMap ? "#define USE_BUMPMAP" : "", t.normalMap ? "#define USE_NORMALMAP" : "", t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", t.emissiveMap ? "#define USE_EMISSIVEMAP" : "", t.anisotropy ? "#define USE_ANISOTROPY" : "", t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", t.specularMap ? "#define USE_SPECULARMAP" : "", t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", t.metalnessMap ? "#define USE_METALNESSMAP" : "", t.alphaMap ? "#define USE_ALPHAMAP" : "", t.alphaHash ? "#define USE_ALPHAHASH" : "", t.transmission ? "#define USE_TRANSMISSION" : "", t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", t.thicknessMap ? "#define USE_THICKNESSMAP" : "", t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", t.mapUv ? "#define MAP_UV " + t.mapUv : "", t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "", t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "", t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "", t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "", t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "", t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "", t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "", t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "", t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "", t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "", t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "", t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "", t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "", t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "", t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "", t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "", t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "", t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "", t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "", t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "", t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "", t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "", t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "", t.vertexColors ? "#define USE_COLOR" : "", t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", t.vertexUv1s ? "#define USE_UV1" : "", t.vertexUv2s ? "#define USE_UV2" : "", t.vertexUv3s ? "#define USE_UV3" : "", t.pointsUvs ? "#define USE_POINTS_UV" : "", t.flatShading ? "#define FLAT_SHADED" : "", t.skinning ? "#define USE_SKINNING" : "", t.morphTargets ? "#define USE_MORPHTARGETS" : "", t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "", t.morphColors ? "#define USE_MORPHCOLORS" : "", t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE" : "", t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "", t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "", t.doubleSided ? "#define DOUBLE_SIDED" : "", t.flipSided ? "#define FLIP_SIDED" : "", t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", t.shadowMapEnabled ? "#define " + l : "", t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", t.useLegacyLights ? "#define LEGACY_LIGHTS" : "", t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "	uniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "	attribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "	attribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "	attribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )", "	attribute vec3 morphTarget0;", "	attribute vec3 morphTarget1;", "	attribute vec3 morphTarget2;", "	attribute vec3 morphTarget3;", "	#ifdef USE_MORPHNORMALS", "		attribute vec3 morphNormal0;", "		attribute vec3 morphNormal1;", "		attribute vec3 morphNormal2;", "		attribute vec3 morphNormal3;", "	#else", "		attribute vec3 morphTarget4;", "		attribute vec3 morphTarget5;", "		attribute vec3 morphTarget6;", "		attribute vec3 morphTarget7;", "	#endif", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", `
`].filter(gr).join(`
`), m = [jh(t), "#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, _, t.useFog && t.fog ? "#define USE_FOG" : "", t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "", t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "", t.map ? "#define USE_MAP" : "", t.matcap ? "#define USE_MATCAP" : "", t.envMap ? "#define USE_ENVMAP" : "", t.envMap ? "#define " + c : "", t.envMap ? "#define " + u : "", t.envMap ? "#define " + h : "", f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "", f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "", f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "", t.lightMap ? "#define USE_LIGHTMAP" : "", t.aoMap ? "#define USE_AOMAP" : "", t.bumpMap ? "#define USE_BUMPMAP" : "", t.normalMap ? "#define USE_NORMALMAP" : "", t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", t.emissiveMap ? "#define USE_EMISSIVEMAP" : "", t.anisotropy ? "#define USE_ANISOTROPY" : "", t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", t.clearcoat ? "#define USE_CLEARCOAT" : "", t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", t.iridescence ? "#define USE_IRIDESCENCE" : "", t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", t.specularMap ? "#define USE_SPECULARMAP" : "", t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", t.metalnessMap ? "#define USE_METALNESSMAP" : "", t.alphaMap ? "#define USE_ALPHAMAP" : "", t.alphaTest ? "#define USE_ALPHATEST" : "", t.alphaHash ? "#define USE_ALPHAHASH" : "", t.sheen ? "#define USE_SHEEN" : "", t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", t.transmission ? "#define USE_TRANSMISSION" : "", t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", t.thicknessMap ? "#define USE_THICKNESSMAP" : "", t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "", t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "", t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", t.vertexUv1s ? "#define USE_UV1" : "", t.vertexUv2s ? "#define USE_UV2" : "", t.vertexUv3s ? "#define USE_UV3" : "", t.pointsUvs ? "#define USE_POINTS_UV" : "", t.gradientMap ? "#define USE_GRADIENTMAP" : "", t.flatShading ? "#define FLAT_SHADED" : "", t.doubleSided ? "#define DOUBLE_SIDED" : "", t.flipSided ? "#define FLIP_SIDED" : "", t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", t.shadowMapEnabled ? "#define " + l : "", t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", t.useLegacyLights ? "#define LEGACY_LIGHTS" : "", t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", t.toneMapping !== Si ? "#define TONE_MAPPING" : "", t.toneMapping !== Si ? Ge.tonemapping_pars_fragment : "", t.toneMapping !== Si ? Hy("toneMapping", t.toneMapping) : "", t.dithering ? "#define DITHERING" : "", t.opaque ? "#define OPAQUE" : "", Ge.colorspace_pars_fragment, ky("linearToOutputTexel", t.outputColorSpace), t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "", `
`].filter(gr).join(`
`)), o = Yl(o), o = Gh(o, t), o = Wh(o, t), a = Yl(a), a = Gh(a, t), a = Wh(a, t), o = Xh(o), a = Xh(a), t.isRawShaderMaterial !== !0 && (b = `#version 300 es
`, p = [d, "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`) + `
`+ p, m = ["#define varying in", t.glslVersion === lh ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", t.glslVersion === lh ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join(`
`) + `
`+ m); const y = b + p + o, A = b + m + a, O = zh(s, s.VERTEX_SHADER, y), P = zh(s, s.FRAGMENT_SHADER, A); s.attachShader(v, O), s.attachShader(v, P), t.index0AttributeName !== void 0 ? s.bindAttribLocation(v, 0, t.index0AttributeName) : t.morphTargets === !0 && s.bindAttribLocation(v, 0, "position"), s.linkProgram(v); function R(D) {
		if (i.debug.checkShaderErrors) {
			const I = s.getProgramInfoLog(v).trim(), C = s.getShaderInfoLog(O).trim(), z = s.getShaderInfoLog(P).trim(); let Y = !0, X = !0; if (s.getProgramParameter(v, s.LINK_STATUS) === !1) if (Y = !1, typeof i.debug.onShaderError == "function") i.debug.onShaderError(s, v, O, P); else {
				const ee = Vh(s, O, "vertex"), G = Vh(s, P, "fragment"); console.error("THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(v, s.VALIDATE_STATUS) + `

Material Name: `+ D.name + `
Material Type: `+ D.type + `

Program Info Log: `+ I + `
`+ ee + `
`+ G)
			} else I !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", I) : (C === "" || z === "") && (X = !1); X && (D.diagnostics = { runnable: Y, programLog: I, vertexShader: { log: C, prefix: p }, fragmentShader: { log: z, prefix: m } })
		} s.deleteShader(O), s.deleteShader(P), L = new Bo(s, v), S = Gy(s, v)
	} let L; this.getUniforms = function () { return L === void 0 && R(this), L }; let S; this.getAttributes = function () { return S === void 0 && R(this), S }; let M = t.rendererExtensionParallelShaderCompile === !1; return this.isReady = function () { return M === !1 && (M = s.getProgramParameter(v, Uy)), M }, this.destroy = function () { n.releaseStatesOfProgram(this), s.deleteProgram(v), this.program = void 0 }, this.type = t.shaderType, this.name = t.shaderName, this.id = Oy++, this.cacheKey = e, this.usedTimes = 1, this.program = v, this.vertexShader = O, this.fragmentShader = P, this
} let tS = 0; class nS { constructor() { this.shaderCache = new Map, this.materialCache = new Map } update(e) { const t = e.vertexShader, n = e.fragmentShader, s = this._getShaderStage(t), r = this._getShaderStage(n), o = this._getShaderCacheForMaterial(e); return o.has(s) === !1 && (o.add(s), s.usedTimes++), o.has(r) === !1 && (o.add(r), r.usedTimes++), this } remove(e) { const t = this.materialCache.get(e); for (const n of t) n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code); return this.materialCache.delete(e), this } getVertexShaderID(e) { return this._getShaderStage(e.vertexShader).id } getFragmentShaderID(e) { return this._getShaderStage(e.fragmentShader).id } dispose() { this.shaderCache.clear(), this.materialCache.clear() } _getShaderCacheForMaterial(e) { const t = this.materialCache; let n = t.get(e); return n === void 0 && (n = new Set, t.set(e, n)), n } _getShaderStage(e) { const t = this.shaderCache; let n = t.get(e); return n === void 0 && (n = new iS(e), t.set(e, n)), n } } class iS { constructor(e) { this.id = tS++, this.code = e, this.usedTimes = 0 } } function sS(i, e, t, n, s, r, o) { const a = new Rc, l = new nS, c = new Set, u = [], h = s.logarithmicDepthBuffer, f = s.vertexTextures; let d = s.precision; const _ = { MeshDepthMaterial: "depth", MeshDistanceMaterial: "distanceRGBA", MeshNormalMaterial: "normal", MeshBasicMaterial: "basic", MeshLambertMaterial: "lambert", MeshPhongMaterial: "phong", MeshToonMaterial: "toon", MeshStandardMaterial: "physical", MeshPhysicalMaterial: "physical", MeshMatcapMaterial: "matcap", LineBasicMaterial: "basic", LineDashedMaterial: "dashed", PointsMaterial: "points", ShadowMaterial: "shadow", SpriteMaterial: "sprite" }; function v(S) { return c.add(S), S === 0 ? "uv" : `uv${S}` } function p(S, M, D, I, C) { const z = I.fog, Y = C.geometry, X = S.isMeshStandardMaterial ? I.environment : null, ee = (S.isMeshStandardMaterial ? t : e).get(S.envMap || X), G = ee && ee.mapping === da ? ee.image.height : null, ne = _[S.type]; S.precision !== null && (d = s.getMaxPrecision(S.precision), d !== S.precision && console.warn("THREE.WebGLProgram.getParameters:", S.precision, "not supported, using", d, "instead.")); const oe = Y.morphAttributes.position || Y.morphAttributes.normal || Y.morphAttributes.color, pe = oe !== void 0 ? oe.length : 0; let ye = 0; Y.morphAttributes.position !== void 0 && (ye = 1), Y.morphAttributes.normal !== void 0 && (ye = 2), Y.morphAttributes.color !== void 0 && (ye = 3); let Pe, te, ue, ge; if (ne) { const yt = En[ne]; Pe = yt.vertexShader, te = yt.fragmentShader } else Pe = S.vertexShader, te = S.fragmentShader, l.update(S), ue = l.getVertexShaderID(S), ge = l.getFragmentShaderID(S); const fe = i.getRenderTarget(), Te = C.isInstancedMesh === !0, Ae = C.isBatchedMesh === !0, we = !!S.map, j = !!S.matcap, De = !!ee, w = !!S.aoMap, U = !!S.lightMap, V = !!S.bumpMap, J = !!S.normalMap, E = !!S.displacementMap, x = !!S.emissiveMap, N = !!S.metalnessMap, F = !!S.roughnessMap, H = S.anisotropy > 0, k = S.clearcoat > 0, se = S.iridescence > 0, K = S.sheen > 0, ae = S.transmission > 0, ce = H && !!S.anisotropyMap, re = k && !!S.clearcoatMap, le = k && !!S.clearcoatNormalMap, _e = k && !!S.clearcoatRoughnessMap, de = se && !!S.iridescenceMap, me = se && !!S.iridescenceThicknessMap, Ne = K && !!S.sheenColorMap, ze = K && !!S.sheenRoughnessMap, Xe = !!S.specularMap, je = !!S.specularColorMap, Le = !!S.specularIntensityMap, ve = ae && !!S.transmissionMap, g = ae && !!S.thicknessMap, q = !!S.gradientMap, ie = !!S.alphaMap, he = S.alphaTest > 0, Se = !!S.alphaHash, Ke = !!S.extensions; let Ye = Si; S.toneMapped && (fe === null || fe.isXRRenderTarget === !0) && (Ye = i.toneMapping); const at = { shaderID: ne, shaderType: S.type, shaderName: S.name, vertexShader: Pe, fragmentShader: te, defines: S.defines, customVertexShaderID: ue, customFragmentShaderID: ge, isRawShaderMaterial: S.isRawShaderMaterial === !0, glslVersion: S.glslVersion, precision: d, batching: Ae, instancing: Te, instancingColor: Te && C.instanceColor !== null, instancingMorph: Te && C.morphTexture !== null, supportsVertexTextures: f, outputColorSpace: fe === null ? i.outputColorSpace : fe.isXRRenderTarget === !0 ? fe.texture.colorSpace : xt, alphaToCoverage: !!S.alphaToCoverage, map: we, matcap: j, envMap: De, envMapMode: De && ee.mapping, envMapCubeUVHeight: G, aoMap: w, lightMap: U, bumpMap: V, normalMap: J, displacementMap: f && E, emissiveMap: x, normalMapObjectSpace: J && S.normalMapType === Z_, normalMapTangentSpace: J && S.normalMapType === Tc, metalnessMap: N, roughnessMap: F, anisotropy: H, anisotropyMap: ce, clearcoat: k, clearcoatMap: re, clearcoatNormalMap: le, clearcoatRoughnessMap: _e, iridescence: se, iridescenceMap: de, iridescenceThicknessMap: me, sheen: K, sheenColorMap: Ne, sheenRoughnessMap: ze, specularMap: Xe, specularColorMap: je, specularIntensityMap: Le, transmission: ae, transmissionMap: ve, thicknessMap: g, gradientMap: q, opaque: S.transparent === !1 && S.blending === Is && S.alphaToCoverage === !1, alphaMap: ie, alphaTest: he, alphaHash: Se, combine: S.combine, mapUv: we && v(S.map.channel), aoMapUv: w && v(S.aoMap.channel), lightMapUv: U && v(S.lightMap.channel), bumpMapUv: V && v(S.bumpMap.channel), normalMapUv: J && v(S.normalMap.channel), displacementMapUv: E && v(S.displacementMap.channel), emissiveMapUv: x && v(S.emissiveMap.channel), metalnessMapUv: N && v(S.metalnessMap.channel), roughnessMapUv: F && v(S.roughnessMap.channel), anisotropyMapUv: ce && v(S.anisotropyMap.channel), clearcoatMapUv: re && v(S.clearcoatMap.channel), clearcoatNormalMapUv: le && v(S.clearcoatNormalMap.channel), clearcoatRoughnessMapUv: _e && v(S.clearcoatRoughnessMap.channel), iridescenceMapUv: de && v(S.iridescenceMap.channel), iridescenceThicknessMapUv: me && v(S.iridescenceThicknessMap.channel), sheenColorMapUv: Ne && v(S.sheenColorMap.channel), sheenRoughnessMapUv: ze && v(S.sheenRoughnessMap.channel), specularMapUv: Xe && v(S.specularMap.channel), specularColorMapUv: je && v(S.specularColorMap.channel), specularIntensityMapUv: Le && v(S.specularIntensityMap.channel), transmissionMapUv: ve && v(S.transmissionMap.channel), thicknessMapUv: g && v(S.thicknessMap.channel), alphaMapUv: ie && v(S.alphaMap.channel), vertexTangents: !!Y.attributes.tangent && (J || H), vertexColors: S.vertexColors, vertexAlphas: S.vertexColors === !0 && !!Y.attributes.color && Y.attributes.color.itemSize === 4, pointsUvs: C.isPoints === !0 && !!Y.attributes.uv && (we || ie), fog: !!z, useFog: S.fog === !0, fogExp2: !!z && z.isFogExp2, flatShading: S.flatShading === !0, sizeAttenuation: S.sizeAttenuation === !0, logarithmicDepthBuffer: h, skinning: C.isSkinnedMesh === !0, morphTargets: Y.morphAttributes.position !== void 0, morphNormals: Y.morphAttributes.normal !== void 0, morphColors: Y.morphAttributes.color !== void 0, morphTargetsCount: pe, morphTextureStride: ye, numDirLights: M.directional.length, numPointLights: M.point.length, numSpotLights: M.spot.length, numSpotLightMaps: M.spotLightMap.length, numRectAreaLights: M.rectArea.length, numHemiLights: M.hemi.length, numDirLightShadows: M.directionalShadowMap.length, numPointLightShadows: M.pointShadowMap.length, numSpotLightShadows: M.spotShadowMap.length, numSpotLightShadowsWithMaps: M.numSpotLightShadowsWithMaps, numLightProbes: M.numLightProbes, numClippingPlanes: o.numPlanes, numClipIntersection: o.numIntersection, dithering: S.dithering, shadowMapEnabled: i.shadowMap.enabled && D.length > 0, shadowMapType: i.shadowMap.type, toneMapping: Ye, useLegacyLights: i._useLegacyLights, decodeVideoTexture: we && S.map.isVideoTexture === !0 && Je.getTransfer(S.map.colorSpace) === st, premultipliedAlpha: S.premultipliedAlpha, doubleSided: S.side === bn, flipSided: S.side === Xt, useDepthPacking: S.depthPacking >= 0, depthPacking: S.depthPacking || 0, index0AttributeName: S.index0AttributeName, extensionClipCullDistance: Ke && S.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"), extensionMultiDraw: Ke && S.extensions.multiDraw === !0 && n.has("WEBGL_multi_draw"), rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"), customProgramCacheKey: S.customProgramCacheKey() }; return at.vertexUv1s = c.has(1), at.vertexUv2s = c.has(2), at.vertexUv3s = c.has(3), c.clear(), at } function m(S) { const M = []; if (S.shaderID ? M.push(S.shaderID) : (M.push(S.customVertexShaderID), M.push(S.customFragmentShaderID)), S.defines !== void 0) for (const D in S.defines) M.push(D), M.push(S.defines[D]); return S.isRawShaderMaterial === !1 && (b(M, S), y(M, S), M.push(i.outputColorSpace)), M.push(S.customProgramCacheKey), M.join() } function b(S, M) { S.push(M.precision), S.push(M.outputColorSpace), S.push(M.envMapMode), S.push(M.envMapCubeUVHeight), S.push(M.mapUv), S.push(M.alphaMapUv), S.push(M.lightMapUv), S.push(M.aoMapUv), S.push(M.bumpMapUv), S.push(M.normalMapUv), S.push(M.displacementMapUv), S.push(M.emissiveMapUv), S.push(M.metalnessMapUv), S.push(M.roughnessMapUv), S.push(M.anisotropyMapUv), S.push(M.clearcoatMapUv), S.push(M.clearcoatNormalMapUv), S.push(M.clearcoatRoughnessMapUv), S.push(M.iridescenceMapUv), S.push(M.iridescenceThicknessMapUv), S.push(M.sheenColorMapUv), S.push(M.sheenRoughnessMapUv), S.push(M.specularMapUv), S.push(M.specularColorMapUv), S.push(M.specularIntensityMapUv), S.push(M.transmissionMapUv), S.push(M.thicknessMapUv), S.push(M.combine), S.push(M.fogExp2), S.push(M.sizeAttenuation), S.push(M.morphTargetsCount), S.push(M.morphAttributeCount), S.push(M.numDirLights), S.push(M.numPointLights), S.push(M.numSpotLights), S.push(M.numSpotLightMaps), S.push(M.numHemiLights), S.push(M.numRectAreaLights), S.push(M.numDirLightShadows), S.push(M.numPointLightShadows), S.push(M.numSpotLightShadows), S.push(M.numSpotLightShadowsWithMaps), S.push(M.numLightProbes), S.push(M.shadowMapType), S.push(M.toneMapping), S.push(M.numClippingPlanes), S.push(M.numClipIntersection), S.push(M.depthPacking) } function y(S, M) { a.disableAll(), M.supportsVertexTextures && a.enable(0), M.instancing && a.enable(1), M.instancingColor && a.enable(2), M.instancingMorph && a.enable(3), M.matcap && a.enable(4), M.envMap && a.enable(5), M.normalMapObjectSpace && a.enable(6), M.normalMapTangentSpace && a.enable(7), M.clearcoat && a.enable(8), M.iridescence && a.enable(9), M.alphaTest && a.enable(10), M.vertexColors && a.enable(11), M.vertexAlphas && a.enable(12), M.vertexUv1s && a.enable(13), M.vertexUv2s && a.enable(14), M.vertexUv3s && a.enable(15), M.vertexTangents && a.enable(16), M.anisotropy && a.enable(17), M.alphaHash && a.enable(18), M.batching && a.enable(19), S.push(a.mask), a.disableAll(), M.fog && a.enable(0), M.useFog && a.enable(1), M.flatShading && a.enable(2), M.logarithmicDepthBuffer && a.enable(3), M.skinning && a.enable(4), M.morphTargets && a.enable(5), M.morphNormals && a.enable(6), M.morphColors && a.enable(7), M.premultipliedAlpha && a.enable(8), M.shadowMapEnabled && a.enable(9), M.useLegacyLights && a.enable(10), M.doubleSided && a.enable(11), M.flipSided && a.enable(12), M.useDepthPacking && a.enable(13), M.dithering && a.enable(14), M.transmission && a.enable(15), M.sheen && a.enable(16), M.opaque && a.enable(17), M.pointsUvs && a.enable(18), M.decodeVideoTexture && a.enable(19), M.alphaToCoverage && a.enable(20), S.push(a.mask) } function A(S) { const M = _[S.type]; let D; if (M) { const I = En[M]; D = As.clone(I.uniforms) } else D = S.uniforms; return D } function O(S, M) { let D; for (let I = 0, C = u.length; I < C; I++) { const z = u[I]; if (z.cacheKey === M) { D = z, ++D.usedTimes; break } } return D === void 0 && (D = new eS(i, M, S, r), u.push(D)), D } function P(S) { if (--S.usedTimes === 0) { const M = u.indexOf(S); u[M] = u[u.length - 1], u.pop(), S.destroy() } } function R(S) { l.remove(S) } function L() { l.dispose() } return { getParameters: p, getProgramCacheKey: m, getUniforms: A, acquireProgram: O, releaseProgram: P, releaseShaderCache: R, programs: u, dispose: L } } function rS() { let i = new WeakMap; function e(r) { let o = i.get(r); return o === void 0 && (o = {}, i.set(r, o)), o } function t(r) { i.delete(r) } function n(r, o, a) { i.get(r)[o] = a } function s() { i = new WeakMap } return { get: e, remove: t, update: n, dispose: s } } function oS(i, e) { return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.z !== e.z ? i.z - e.z : i.id - e.id } function Yh(i, e) { return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id } function qh() { const i = []; let e = 0; const t = [], n = [], s = []; function r() { e = 0, t.length = 0, n.length = 0, s.length = 0 } function o(h, f, d, _, v, p) { let m = i[e]; return m === void 0 ? (m = { id: h.id, object: h, geometry: f, material: d, groupOrder: _, renderOrder: h.renderOrder, z: v, group: p }, i[e] = m) : (m.id = h.id, m.object = h, m.geometry = f, m.material = d, m.groupOrder = _, m.renderOrder = h.renderOrder, m.z = v, m.group = p), e++, m } function a(h, f, d, _, v, p) { const m = o(h, f, d, _, v, p); d.transmission > 0 ? n.push(m) : d.transparent === !0 ? s.push(m) : t.push(m) } function l(h, f, d, _, v, p) { const m = o(h, f, d, _, v, p); d.transmission > 0 ? n.unshift(m) : d.transparent === !0 ? s.unshift(m) : t.unshift(m) } function c(h, f) { t.length > 1 && t.sort(h || oS), n.length > 1 && n.sort(f || Yh), s.length > 1 && s.sort(f || Yh) } function u() { for (let h = e, f = i.length; h < f; h++) { const d = i[h]; if (d.id === null) break; d.id = null, d.object = null, d.geometry = null, d.material = null, d.group = null } } return { opaque: t, transmissive: n, transparent: s, init: r, push: a, unshift: l, finish: u, sort: c } } function aS() { let i = new WeakMap; function e(n, s) { const r = i.get(n); let o; return r === void 0 ? (o = new qh, i.set(n, [o])) : s >= r.length ? (o = new qh, r.push(o)) : o = r[s], o } function t() { i = new WeakMap } return { get: e, dispose: t } } function lS() { const i = {}; return { get: function (e) { if (i[e.id] !== void 0) return i[e.id]; let t; switch (e.type) { case "DirectionalLight": t = { direction: new B, color: new Re }; break; case "SpotLight": t = { position: new B, direction: new B, color: new Re, distance: 0, coneCos: 0, penumbraCos: 0, decay: 0 }; break; case "PointLight": t = { position: new B, color: new Re, distance: 0, decay: 0 }; break; case "HemisphereLight": t = { direction: new B, skyColor: new Re, groundColor: new Re }; break; case "RectAreaLight": t = { color: new Re, position: new B, halfWidth: new B, halfHeight: new B }; break }return i[e.id] = t, t } } } function cS() { const i = {}; return { get: function (e) { if (i[e.id] !== void 0) return i[e.id]; let t; switch (e.type) { case "DirectionalLight": t = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Ee }; break; case "SpotLight": t = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Ee }; break; case "PointLight": t = { shadowBias: 0, shadowNormalBias: 0, shadowRadius: 1, shadowMapSize: new Ee, shadowCameraNear: 1, shadowCameraFar: 1e3 }; break }return i[e.id] = t, t } } } let uS = 0; function hS(i, e) { return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0) } function fS(i) { const e = new lS, t = cS(), n = { version: 0, hash: { directionalLength: -1, pointLength: -1, spotLength: -1, rectAreaLength: -1, hemiLength: -1, numDirectionalShadows: -1, numPointShadows: -1, numSpotShadows: -1, numSpotMaps: -1, numLightProbes: -1 }, ambient: [0, 0, 0], probe: [], directional: [], directionalShadow: [], directionalShadowMap: [], directionalShadowMatrix: [], spot: [], spotLightMap: [], spotShadow: [], spotShadowMap: [], spotLightMatrix: [], rectArea: [], rectAreaLTC1: null, rectAreaLTC2: null, point: [], pointShadow: [], pointShadowMap: [], pointShadowMatrix: [], hemi: [], numSpotLightShadowsWithMaps: 0, numLightProbes: 0 }; for (let c = 0; c < 9; c++)n.probe.push(new B); const s = new B, r = new Oe, o = new Oe; function a(c, u) { let h = 0, f = 0, d = 0; for (let D = 0; D < 9; D++)n.probe[D].set(0, 0, 0); let _ = 0, v = 0, p = 0, m = 0, b = 0, y = 0, A = 0, O = 0, P = 0, R = 0, L = 0; c.sort(hS); const S = u === !0 ? Math.PI : 1; for (let D = 0, I = c.length; D < I; D++) { const C = c[D], z = C.color, Y = C.intensity, X = C.distance, ee = C.shadow && C.shadow.map ? C.shadow.map.texture : null; if (C.isAmbientLight) h += z.r * Y * S, f += z.g * Y * S, d += z.b * Y * S; else if (C.isLightProbe) { for (let G = 0; G < 9; G++)n.probe[G].addScaledVector(C.sh.coefficients[G], Y); L++ } else if (C.isDirectionalLight) { const G = e.get(C); if (G.color.copy(C.color).multiplyScalar(C.intensity * S), C.castShadow) { const ne = C.shadow, oe = t.get(C); oe.shadowBias = ne.bias, oe.shadowNormalBias = ne.normalBias, oe.shadowRadius = ne.radius, oe.shadowMapSize = ne.mapSize, n.directionalShadow[_] = oe, n.directionalShadowMap[_] = ee, n.directionalShadowMatrix[_] = C.shadow.matrix, y++ } n.directional[_] = G, _++ } else if (C.isSpotLight) { const G = e.get(C); G.position.setFromMatrixPosition(C.matrixWorld), G.color.copy(z).multiplyScalar(Y * S), G.distance = X, G.coneCos = Math.cos(C.angle), G.penumbraCos = Math.cos(C.angle * (1 - C.penumbra)), G.decay = C.decay, n.spot[p] = G; const ne = C.shadow; if (C.map && (n.spotLightMap[P] = C.map, P++, ne.updateMatrices(C), C.castShadow && R++), n.spotLightMatrix[p] = ne.matrix, C.castShadow) { const oe = t.get(C); oe.shadowBias = ne.bias, oe.shadowNormalBias = ne.normalBias, oe.shadowRadius = ne.radius, oe.shadowMapSize = ne.mapSize, n.spotShadow[p] = oe, n.spotShadowMap[p] = ee, O++ } p++ } else if (C.isRectAreaLight) { const G = e.get(C); G.color.copy(z).multiplyScalar(Y), G.halfWidth.set(C.width * .5, 0, 0), G.halfHeight.set(0, C.height * .5, 0), n.rectArea[m] = G, m++ } else if (C.isPointLight) { const G = e.get(C); if (G.color.copy(C.color).multiplyScalar(C.intensity * S), G.distance = C.distance, G.decay = C.decay, C.castShadow) { const ne = C.shadow, oe = t.get(C); oe.shadowBias = ne.bias, oe.shadowNormalBias = ne.normalBias, oe.shadowRadius = ne.radius, oe.shadowMapSize = ne.mapSize, oe.shadowCameraNear = ne.camera.near, oe.shadowCameraFar = ne.camera.far, n.pointShadow[v] = oe, n.pointShadowMap[v] = ee, n.pointShadowMatrix[v] = C.shadow.matrix, A++ } n.point[v] = G, v++ } else if (C.isHemisphereLight) { const G = e.get(C); G.skyColor.copy(C.color).multiplyScalar(Y * S), G.groundColor.copy(C.groundColor).multiplyScalar(Y * S), n.hemi[b] = G, b++ } } m > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = xe.LTC_FLOAT_1, n.rectAreaLTC2 = xe.LTC_FLOAT_2) : (n.rectAreaLTC1 = xe.LTC_HALF_1, n.rectAreaLTC2 = xe.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = f, n.ambient[2] = d; const M = n.hash; (M.directionalLength !== _ || M.pointLength !== v || M.spotLength !== p || M.rectAreaLength !== m || M.hemiLength !== b || M.numDirectionalShadows !== y || M.numPointShadows !== A || M.numSpotShadows !== O || M.numSpotMaps !== P || M.numLightProbes !== L) && (n.directional.length = _, n.spot.length = p, n.rectArea.length = m, n.point.length = v, n.hemi.length = b, n.directionalShadow.length = y, n.directionalShadowMap.length = y, n.pointShadow.length = A, n.pointShadowMap.length = A, n.spotShadow.length = O, n.spotShadowMap.length = O, n.directionalShadowMatrix.length = y, n.pointShadowMatrix.length = A, n.spotLightMatrix.length = O + P - R, n.spotLightMap.length = P, n.numSpotLightShadowsWithMaps = R, n.numLightProbes = L, M.directionalLength = _, M.pointLength = v, M.spotLength = p, M.rectAreaLength = m, M.hemiLength = b, M.numDirectionalShadows = y, M.numPointShadows = A, M.numSpotShadows = O, M.numSpotMaps = P, M.numLightProbes = L, n.version = uS++) } function l(c, u) { let h = 0, f = 0, d = 0, _ = 0, v = 0; const p = u.matrixWorldInverse; for (let m = 0, b = c.length; m < b; m++) { const y = c[m]; if (y.isDirectionalLight) { const A = n.directional[h]; A.direction.setFromMatrixPosition(y.matrixWorld), s.setFromMatrixPosition(y.target.matrixWorld), A.direction.sub(s), A.direction.transformDirection(p), h++ } else if (y.isSpotLight) { const A = n.spot[d]; A.position.setFromMatrixPosition(y.matrixWorld), A.position.applyMatrix4(p), A.direction.setFromMatrixPosition(y.matrixWorld), s.setFromMatrixPosition(y.target.matrixWorld), A.direction.sub(s), A.direction.transformDirection(p), d++ } else if (y.isRectAreaLight) { const A = n.rectArea[_]; A.position.setFromMatrixPosition(y.matrixWorld), A.position.applyMatrix4(p), o.identity(), r.copy(y.matrixWorld), r.premultiply(p), o.extractRotation(r), A.halfWidth.set(y.width * .5, 0, 0), A.halfHeight.set(0, y.height * .5, 0), A.halfWidth.applyMatrix4(o), A.halfHeight.applyMatrix4(o), _++ } else if (y.isPointLight) { const A = n.point[f]; A.position.setFromMatrixPosition(y.matrixWorld), A.position.applyMatrix4(p), f++ } else if (y.isHemisphereLight) { const A = n.hemi[v]; A.direction.setFromMatrixPosition(y.matrixWorld), A.direction.transformDirection(p), v++ } } } return { setup: a, setupView: l, state: n } } function Kh(i) { const e = new fS(i), t = [], n = []; function s() { t.length = 0, n.length = 0 } function r(u) { t.push(u) } function o(u) { n.push(u) } function a(u) { e.setup(t, u) } function l(u) { e.setupView(t, u) } return { init: s, state: { lightsArray: t, shadowsArray: n, lights: e, transmissionRenderTarget: null }, setupLights: a, setupLightsView: l, pushLight: r, pushShadow: o } } function dS(i) { let e = new WeakMap; function t(s, r = 0) { const o = e.get(s); let a; return o === void 0 ? (a = new Kh(i), e.set(s, [a])) : r >= o.length ? (a = new Kh(i), o.push(a)) : a = o[r], a } function n() { e = new WeakMap } return { get: t, dispose: n } } class pS extends an { constructor(e) { super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = K_, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e) } copy(e) { return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this } } class mS extends an { constructor(e) { super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e) } copy(e) { return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this } } const gS = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, _S = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`; function xS(i, e, t) { let n = new Cc; const s = new Ee, r = new Ee, o = new it, a = new pS({ depthPacking: $_ }), l = new mS, c = {}, u = t.maxTextureSize, h = { [Yn]: Xt, [Xt]: Yn, [bn]: bn }, f = new Wt({ defines: { VSM_SAMPLES: 8 }, uniforms: { shadow_pass: { value: null }, resolution: { value: new Ee }, radius: { value: 4 } }, vertexShader: gS, fragmentShader: _S }), d = f.clone(); d.defines.HORIZONTAL_PASS = 1; const _ = new Jt; _.setAttribute("position", new Ct(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3)); const v = new Gt(_, f), p = this; this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = Cd; let m = this.type; this.render = function (P, R, L) { if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || P.length === 0) return; const S = i.getRenderTarget(), M = i.getActiveCubeFace(), D = i.getActiveMipmapLevel(), I = i.state; I.setBlending(Dt), I.buffers.color.setClear(1, 1, 1, 1), I.buffers.depth.setTest(!0), I.setScissorTest(!1); const C = m !== zn && this.type === zn, z = m === zn && this.type !== zn; for (let Y = 0, X = P.length; Y < X; Y++) { const ee = P[Y], G = ee.shadow; if (G === void 0) { console.warn("THREE.WebGLShadowMap:", ee, "has no shadow."); continue } if (G.autoUpdate === !1 && G.needsUpdate === !1) continue; s.copy(G.mapSize); const ne = G.getFrameExtents(); if (s.multiply(ne), r.copy(G.mapSize), (s.x > u || s.y > u) && (s.x > u && (r.x = Math.floor(u / ne.x), s.x = r.x * ne.x, G.mapSize.x = r.x), s.y > u && (r.y = Math.floor(u / ne.y), s.y = r.y * ne.y, G.mapSize.y = r.y)), G.map === null || C === !0 || z === !0) { const pe = this.type !== zn ? { minFilter: Rt, magFilter: Rt } : {}; G.map !== null && G.map.dispose(), G.map = new Cn(s.x, s.y, pe), G.map.texture.name = ee.name + ".shadowMap", G.camera.updateProjectionMatrix() } i.setRenderTarget(G.map), i.clear(); const oe = G.getViewportCount(); for (let pe = 0; pe < oe; pe++) { const ye = G.getViewport(pe); o.set(r.x * ye.x, r.y * ye.y, r.x * ye.z, r.y * ye.w), I.viewport(o), G.updateMatrices(ee, pe), n = G.getFrustum(), A(R, L, G.camera, ee, this.type) } G.isPointLightShadow !== !0 && this.type === zn && b(G, L), G.needsUpdate = !1 } m = this.type, p.needsUpdate = !1, i.setRenderTarget(S, M, D) }; function b(P, R) { const L = e.update(v); f.defines.VSM_SAMPLES !== P.blurSamples && (f.defines.VSM_SAMPLES = P.blurSamples, d.defines.VSM_SAMPLES = P.blurSamples, f.needsUpdate = !0, d.needsUpdate = !0), P.mapPass === null && (P.mapPass = new Cn(s.x, s.y)), f.uniforms.shadow_pass.value = P.map.texture, f.uniforms.resolution.value = P.mapSize, f.uniforms.radius.value = P.radius, i.setRenderTarget(P.mapPass), i.clear(), i.renderBufferDirect(R, null, L, f, v, null), d.uniforms.shadow_pass.value = P.mapPass.texture, d.uniforms.resolution.value = P.mapSize, d.uniforms.radius.value = P.radius, i.setRenderTarget(P.map), i.clear(), i.renderBufferDirect(R, null, L, d, v, null) } function y(P, R, L, S) { let M = null; const D = L.isPointLight === !0 ? P.customDistanceMaterial : P.customDepthMaterial; if (D !== void 0) M = D; else if (M = L.isPointLight === !0 ? l : a, i.localClippingEnabled && R.clipShadows === !0 && Array.isArray(R.clippingPlanes) && R.clippingPlanes.length !== 0 || R.displacementMap && R.displacementScale !== 0 || R.alphaMap && R.alphaTest > 0 || R.map && R.alphaTest > 0) { const I = M.uuid, C = R.uuid; let z = c[I]; z === void 0 && (z = {}, c[I] = z); let Y = z[C]; Y === void 0 && (Y = M.clone(), z[C] = Y, R.addEventListener("dispose", O)), M = Y } if (M.visible = R.visible, M.wireframe = R.wireframe, S === zn ? M.side = R.shadowSide !== null ? R.shadowSide : R.side : M.side = R.shadowSide !== null ? R.shadowSide : h[R.side], M.alphaMap = R.alphaMap, M.alphaTest = R.alphaTest, M.map = R.map, M.clipShadows = R.clipShadows, M.clippingPlanes = R.clippingPlanes, M.clipIntersection = R.clipIntersection, M.displacementMap = R.displacementMap, M.displacementScale = R.displacementScale, M.displacementBias = R.displacementBias, M.wireframeLinewidth = R.wireframeLinewidth, M.linewidth = R.linewidth, L.isPointLight === !0 && M.isMeshDistanceMaterial === !0) { const I = i.properties.get(M); I.light = L } return M } function A(P, R, L, S, M) { if (P.visible === !1) return; if (P.layers.test(R.layers) && (P.isMesh || P.isLine || P.isPoints) && (P.castShadow || P.receiveShadow && M === zn) && (!P.frustumCulled || n.intersectsObject(P))) { P.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse, P.matrixWorld); const C = e.update(P), z = P.material; if (Array.isArray(z)) { const Y = C.groups; for (let X = 0, ee = Y.length; X < ee; X++) { const G = Y[X], ne = z[G.materialIndex]; if (ne && ne.visible) { const oe = y(P, ne, S, M); P.onBeforeShadow(i, P, R, L, C, oe, G), i.renderBufferDirect(L, null, C, oe, P, G), P.onAfterShadow(i, P, R, L, C, oe, G) } } } else if (z.visible) { const Y = y(P, z, S, M); P.onBeforeShadow(i, P, R, L, C, Y, null), i.renderBufferDirect(L, null, C, Y, P, null), P.onAfterShadow(i, P, R, L, C, Y, null) } } const I = P.children; for (let C = 0, z = I.length; C < z; C++)A(I[C], R, L, S, M) } function O(P) { P.target.removeEventListener("dispose", O); for (const L in c) { const S = c[L], M = P.target.uuid; M in S && (S[M].dispose(), delete S[M]) } } } function vS(i) { function e() { let g = !1; const q = new it; let ie = null; const he = new it(0, 0, 0, 0); return { setMask: function (Se) { ie !== Se && !g && (i.colorMask(Se, Se, Se, Se), ie = Se) }, setLocked: function (Se) { g = Se }, setClear: function (Se, Ke, Ye, at, yt) { yt === !0 && (Se *= at, Ke *= at, Ye *= at), q.set(Se, Ke, Ye, at), he.equals(q) === !1 && (i.clearColor(Se, Ke, Ye, at), he.copy(q)) }, reset: function () { g = !1, ie = null, he.set(-1, 0, 0, 0) } } } function t() { let g = !1, q = null, ie = null, he = null; return { setTest: function (Se) { Se ? ge(i.DEPTH_TEST) : fe(i.DEPTH_TEST) }, setMask: function (Se) { q !== Se && !g && (i.depthMask(Se), q = Se) }, setFunc: function (Se) { if (ie !== Se) { switch (Se) { case y_: i.depthFunc(i.NEVER); break; case S_: i.depthFunc(i.ALWAYS); break; case E_: i.depthFunc(i.LESS); break; case qo: i.depthFunc(i.LEQUAL); break; case T_: i.depthFunc(i.EQUAL); break; case b_: i.depthFunc(i.GEQUAL); break; case A_: i.depthFunc(i.GREATER); break; case w_: i.depthFunc(i.NOTEQUAL); break; default: i.depthFunc(i.LEQUAL) }ie = Se } }, setLocked: function (Se) { g = Se }, setClear: function (Se) { he !== Se && (i.clearDepth(Se), he = Se) }, reset: function () { g = !1, q = null, ie = null, he = null } } } function n() { let g = !1, q = null, ie = null, he = null, Se = null, Ke = null, Ye = null, at = null, yt = null; return { setTest: function (tt) { g || (tt ? ge(i.STENCIL_TEST) : fe(i.STENCIL_TEST)) }, setMask: function (tt) { q !== tt && !g && (i.stencilMask(tt), q = tt) }, setFunc: function (tt, dt, pt) { (ie !== tt || he !== dt || Se !== pt) && (i.stencilFunc(tt, dt, pt), ie = tt, he = dt, Se = pt) }, setOp: function (tt, dt, pt) { (Ke !== tt || Ye !== dt || at !== pt) && (i.stencilOp(tt, dt, pt), Ke = tt, Ye = dt, at = pt) }, setLocked: function (tt) { g = tt }, setClear: function (tt) { yt !== tt && (i.clearStencil(tt), yt = tt) }, reset: function () { g = !1, q = null, ie = null, he = null, Se = null, Ke = null, Ye = null, at = null, yt = null } } } const s = new e, r = new t, o = new n, a = new WeakMap, l = new WeakMap; let c = {}, u = {}, h = new WeakMap, f = [], d = null, _ = !1, v = null, p = null, m = null, b = null, y = null, A = null, O = null, P = new Re(0, 0, 0), R = 0, L = !1, S = null, M = null, D = null, I = null, C = null; const z = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS); let Y = !1, X = 0; const ee = i.getParameter(i.VERSION); ee.indexOf("WebGL") !== -1 ? (X = parseFloat(/^WebGL (\d)/.exec(ee)[1]), Y = X >= 1) : ee.indexOf("OpenGL ES") !== -1 && (X = parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]), Y = X >= 2); let G = null, ne = {}; const oe = i.getParameter(i.SCISSOR_BOX), pe = i.getParameter(i.VIEWPORT), ye = new it().fromArray(oe), Pe = new it().fromArray(pe); function te(g, q, ie, he) { const Se = new Uint8Array(4), Ke = i.createTexture(); i.bindTexture(g, Ke), i.texParameteri(g, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(g, i.TEXTURE_MAG_FILTER, i.NEAREST); for (let Ye = 0; Ye < ie; Ye++)g === i.TEXTURE_3D || g === i.TEXTURE_2D_ARRAY ? i.texImage3D(q, 0, i.RGBA, 1, 1, he, 0, i.RGBA, i.UNSIGNED_BYTE, Se) : i.texImage2D(q + Ye, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, Se); return Ke } const ue = {}; ue[i.TEXTURE_2D] = te(i.TEXTURE_2D, i.TEXTURE_2D, 1), ue[i.TEXTURE_CUBE_MAP] = te(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), ue[i.TEXTURE_2D_ARRAY] = te(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), ue[i.TEXTURE_3D] = te(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), r.setClear(1), o.setClear(0), ge(i.DEPTH_TEST), r.setFunc(qo), V(!1), J(Ru), ge(i.CULL_FACE), w(Dt); function ge(g) { c[g] !== !0 && (i.enable(g), c[g] = !0) } function fe(g) { c[g] !== !1 && (i.disable(g), c[g] = !1) } function Te(g, q) { return u[g] !== q ? (i.bindFramebuffer(g, q), u[g] = q, g === i.DRAW_FRAMEBUFFER && (u[i.FRAMEBUFFER] = q), g === i.FRAMEBUFFER && (u[i.DRAW_FRAMEBUFFER] = q), !0) : !1 } function Ae(g, q) { let ie = f, he = !1; if (g) { ie = h.get(q), ie === void 0 && (ie = [], h.set(q, ie)); const Se = g.textures; if (ie.length !== Se.length || ie[0] !== i.COLOR_ATTACHMENT0) { for (let Ke = 0, Ye = Se.length; Ke < Ye; Ke++)ie[Ke] = i.COLOR_ATTACHMENT0 + Ke; ie.length = Se.length, he = !0 } } else ie[0] !== i.BACK && (ie[0] = i.BACK, he = !0); he && i.drawBuffers(ie) } function we(g) { return d !== g ? (i.useProgram(g), d = g, !0) : !1 } const j = { [Vn]: i.FUNC_ADD, [a_]: i.FUNC_SUBTRACT, [l_]: i.FUNC_REVERSE_SUBTRACT }; j[c_] = i.MIN, j[u_] = i.MAX; const De = { [kl]: i.ZERO, [h_]: i.ONE, [f_]: i.SRC_COLOR, [Hl]: i.SRC_ALPHA, [g_]: i.SRC_ALPHA_SATURATE, [Dd]: i.DST_COLOR, [Id]: i.DST_ALPHA, [d_]: i.ONE_MINUS_SRC_COLOR, [zl]: i.ONE_MINUS_SRC_ALPHA, [m_]: i.ONE_MINUS_DST_COLOR, [p_]: i.ONE_MINUS_DST_ALPHA, [__]: i.CONSTANT_COLOR, [x_]: i.ONE_MINUS_CONSTANT_COLOR, [v_]: i.CONSTANT_ALPHA, [M_]: i.ONE_MINUS_CONSTANT_ALPHA }; function w(g, q, ie, he, Se, Ke, Ye, at, yt, tt) { if (g === Dt) { _ === !0 && (fe(i.BLEND), _ = !1); return } if (_ === !1 && (ge(i.BLEND), _ = !0), g !== Ld) { if (g !== v || tt !== L) { if ((p !== Vn || y !== Vn) && (i.blendEquation(i.FUNC_ADD), p = Vn, y = Vn), tt) switch (g) { case Is: i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA); break; case Cu: i.blendFunc(i.ONE, i.ONE); break; case Pu: i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE); break; case Lu: i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA); break; default: console.error("THREE.WebGLState: Invalid blending: ", g); break } else switch (g) { case Is: i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA); break; case Cu: i.blendFunc(i.SRC_ALPHA, i.ONE); break; case Pu: i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE); break; case Lu: i.blendFunc(i.ZERO, i.SRC_COLOR); break; default: console.error("THREE.WebGLState: Invalid blending: ", g); break }m = null, b = null, A = null, O = null, P.set(0, 0, 0), R = 0, v = g, L = tt } return } Se = Se || q, Ke = Ke || ie, Ye = Ye || he, (q !== p || Se !== y) && (i.blendEquationSeparate(j[q], j[Se]), p = q, y = Se), (ie !== m || he !== b || Ke !== A || Ye !== O) && (i.blendFuncSeparate(De[ie], De[he], De[Ke], De[Ye]), m = ie, b = he, A = Ke, O = Ye), (at.equals(P) === !1 || yt !== R) && (i.blendColor(at.r, at.g, at.b, yt), P.copy(at), R = yt), v = g, L = !1 } function U(g, q) { g.side === bn ? fe(i.CULL_FACE) : ge(i.CULL_FACE); let ie = g.side === Xt; q && (ie = !ie), V(ie), g.blending === Is && g.transparent === !1 ? w(Dt) : w(g.blending, g.blendEquation, g.blendSrc, g.blendDst, g.blendEquationAlpha, g.blendSrcAlpha, g.blendDstAlpha, g.blendColor, g.blendAlpha, g.premultipliedAlpha), r.setFunc(g.depthFunc), r.setTest(g.depthTest), r.setMask(g.depthWrite), s.setMask(g.colorWrite); const he = g.stencilWrite; o.setTest(he), he && (o.setMask(g.stencilWriteMask), o.setFunc(g.stencilFunc, g.stencilRef, g.stencilFuncMask), o.setOp(g.stencilFail, g.stencilZFail, g.stencilZPass)), x(g.polygonOffset, g.polygonOffsetFactor, g.polygonOffsetUnits), g.alphaToCoverage === !0 ? ge(i.SAMPLE_ALPHA_TO_COVERAGE) : fe(i.SAMPLE_ALPHA_TO_COVERAGE) } function V(g) { S !== g && (g ? i.frontFace(i.CW) : i.frontFace(i.CCW), S = g) } function J(g) { g !== r_ ? (ge(i.CULL_FACE), g !== M && (g === Ru ? i.cullFace(i.BACK) : g === o_ ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : fe(i.CULL_FACE), M = g } function E(g) { g !== D && (Y && i.lineWidth(g), D = g) } function x(g, q, ie) { g ? (ge(i.POLYGON_OFFSET_FILL), (I !== q || C !== ie) && (i.polygonOffset(q, ie), I = q, C = ie)) : fe(i.POLYGON_OFFSET_FILL) } function N(g) { g ? ge(i.SCISSOR_TEST) : fe(i.SCISSOR_TEST) } function F(g) { g === void 0 && (g = i.TEXTURE0 + z - 1), G !== g && (i.activeTexture(g), G = g) } function H(g, q, ie) { ie === void 0 && (G === null ? ie = i.TEXTURE0 + z - 1 : ie = G); let he = ne[ie]; he === void 0 && (he = { type: void 0, texture: void 0 }, ne[ie] = he), (he.type !== g || he.texture !== q) && (G !== ie && (i.activeTexture(ie), G = ie), i.bindTexture(g, q || ue[g]), he.type = g, he.texture = q) } function k() { const g = ne[G]; g !== void 0 && g.type !== void 0 && (i.bindTexture(g.type, null), g.type = void 0, g.texture = void 0) } function se() { try { i.compressedTexImage2D.apply(i, arguments) } catch (g) { console.error("THREE.WebGLState:", g) } } function K() { try { i.compressedTexImage3D.apply(i, arguments) } catch (g) { console.error("THREE.WebGLState:", g) } } function ae() { try { i.texSubImage2D.apply(i, arguments) } catch (g) { console.error("THREE.WebGLState:", g) } } function ce() { try { i.texSubImage3D.apply(i, arguments) } catch (g) { console.error("THREE.WebGLState:", g) } } function re() { try { i.compressedTexSubImage2D.apply(i, arguments) } catch (g) { console.error("THREE.WebGLState:", g) } } function le() { try { i.compressedTexSubImage3D.apply(i, arguments) } catch (g) { console.error("THREE.WebGLState:", g) } } function _e() { try { i.texStorage2D.apply(i, arguments) } catch (g) { console.error("THREE.WebGLState:", g) } } function de() { try { i.texStorage3D.apply(i, arguments) } catch (g) { console.error("THREE.WebGLState:", g) } } function me() { try { i.texImage2D.apply(i, arguments) } catch (g) { console.error("THREE.WebGLState:", g) } } function Ne() { try { i.texImage3D.apply(i, arguments) } catch (g) { console.error("THREE.WebGLState:", g) } } function ze(g) { ye.equals(g) === !1 && (i.scissor(g.x, g.y, g.z, g.w), ye.copy(g)) } function Xe(g) { Pe.equals(g) === !1 && (i.viewport(g.x, g.y, g.z, g.w), Pe.copy(g)) } function je(g, q) { let ie = l.get(q); ie === void 0 && (ie = new WeakMap, l.set(q, ie)); let he = ie.get(g); he === void 0 && (he = i.getUniformBlockIndex(q, g.name), ie.set(g, he)) } function Le(g, q) { const he = l.get(q).get(g); a.get(q) !== he && (i.uniformBlockBinding(q, he, g.__bindingPointIndex), a.set(q, he)) } function ve() { i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), c = {}, G = null, ne = {}, u = {}, h = new WeakMap, f = [], d = null, _ = !1, v = null, p = null, m = null, b = null, y = null, A = null, O = null, P = new Re(0, 0, 0), R = 0, L = !1, S = null, M = null, D = null, I = null, C = null, ye.set(0, 0, i.canvas.width, i.canvas.height), Pe.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), r.reset(), o.reset() } return { buffers: { color: s, depth: r, stencil: o }, enable: ge, disable: fe, bindFramebuffer: Te, drawBuffers: Ae, useProgram: we, setBlending: w, setMaterial: U, setFlipSided: V, setCullFace: J, setLineWidth: E, setPolygonOffset: x, setScissorTest: N, activeTexture: F, bindTexture: H, unbindTexture: k, compressedTexImage2D: se, compressedTexImage3D: K, texImage2D: me, texImage3D: Ne, updateUBOMapping: je, uniformBlockBinding: Le, texStorage2D: _e, texStorage3D: de, texSubImage2D: ae, texSubImage3D: ce, compressedTexSubImage2D: re, compressedTexSubImage3D: le, scissor: ze, viewport: Xe, reset: ve } } function MS(i, e, t, n, s, r, o) { const a = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new Ee, u = new WeakMap; let h; const f = new WeakMap; let d = !1; try { d = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null } catch { } function _(E, x) { return d ? new OffscreenCanvas(E, x) : Dr("canvas") } function v(E, x, N) { let F = 1; const H = J(E); if ((H.width > N || H.height > N) && (F = N / Math.max(H.width, H.height)), F < 1) if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap || typeof VideoFrame < "u" && E instanceof VideoFrame) { const k = Math.floor(F * H.width), se = Math.floor(F * H.height); h === void 0 && (h = _(k, se)); const K = x ? _(k, se) : h; return K.width = k, K.height = se, K.getContext("2d").drawImage(E, 0, 0, k, se), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + H.width + "x" + H.height + ") to (" + k + "x" + se + ")."), K } else return "data" in E && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + H.width + "x" + H.height + ")."), E; return E } function p(E) { return E.generateMipmaps && E.minFilter !== Rt && E.minFilter !== At } function m(E) { i.generateMipmap(E) } function b(E, x, N, F, H = !1) { if (E !== null) { if (i[E] !== void 0) return i[E]; console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'") } let k = x; if (x === i.RED && (N === i.FLOAT && (k = i.R32F), N === i.HALF_FLOAT && (k = i.R16F), N === i.UNSIGNED_BYTE && (k = i.R8)), x === i.RED_INTEGER && (N === i.UNSIGNED_BYTE && (k = i.R8UI), N === i.UNSIGNED_SHORT && (k = i.R16UI), N === i.UNSIGNED_INT && (k = i.R32UI), N === i.BYTE && (k = i.R8I), N === i.SHORT && (k = i.R16I), N === i.INT && (k = i.R32I)), x === i.RG && (N === i.FLOAT && (k = i.RG32F), N === i.HALF_FLOAT && (k = i.RG16F), N === i.UNSIGNED_BYTE && (k = i.RG8)), x === i.RG_INTEGER && (N === i.UNSIGNED_BYTE && (k = i.RG8UI), N === i.UNSIGNED_SHORT && (k = i.RG16UI), N === i.UNSIGNED_INT && (k = i.RG32UI), N === i.BYTE && (k = i.RG8I), N === i.SHORT && (k = i.RG16I), N === i.INT && (k = i.RG32I)), x === i.RGB && N === i.UNSIGNED_INT_5_9_9_9_REV && (k = i.RGB9_E5), x === i.RGBA) { const se = H ? $o : Je.getTransfer(F); N === i.FLOAT && (k = i.RGBA32F), N === i.HALF_FLOAT && (k = i.RGBA16F), N === i.UNSIGNED_BYTE && (k = se === st ? i.SRGB8_ALPHA8 : i.RGBA8), N === i.UNSIGNED_SHORT_4_4_4_4 && (k = i.RGBA4), N === i.UNSIGNED_SHORT_5_5_5_1 && (k = i.RGB5_A1) } return (k === i.R16F || k === i.R32F || k === i.RG16F || k === i.RG32F || k === i.RGBA16F || k === i.RGBA32F) && e.get("EXT_color_buffer_float"), k } function y(E, x) { return p(E) === !0 || E.isFramebufferTexture && E.minFilter !== Rt && E.minFilter !== At ? Math.log2(Math.max(x.width, x.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? x.mipmaps.length : 1 } function A(E) { const x = E.target; x.removeEventListener("dispose", A), P(x), x.isVideoTexture && u.delete(x) } function O(E) { const x = E.target; x.removeEventListener("dispose", O), L(x) } function P(E) { const x = n.get(E); if (x.__webglInit === void 0) return; const N = E.source, F = f.get(N); if (F) { const H = F[x.__cacheKey]; H.usedTimes--, H.usedTimes === 0 && R(E), Object.keys(F).length === 0 && f.delete(N) } n.remove(E) } function R(E) { const x = n.get(E); i.deleteTexture(x.__webglTexture); const N = E.source, F = f.get(N); delete F[x.__cacheKey], o.memory.textures-- } function L(E) { const x = n.get(E); if (E.depthTexture && E.depthTexture.dispose(), E.isWebGLCubeRenderTarget) for (let F = 0; F < 6; F++) { if (Array.isArray(x.__webglFramebuffer[F])) for (let H = 0; H < x.__webglFramebuffer[F].length; H++)i.deleteFramebuffer(x.__webglFramebuffer[F][H]); else i.deleteFramebuffer(x.__webglFramebuffer[F]); x.__webglDepthbuffer && i.deleteRenderbuffer(x.__webglDepthbuffer[F]) } else { if (Array.isArray(x.__webglFramebuffer)) for (let F = 0; F < x.__webglFramebuffer.length; F++)i.deleteFramebuffer(x.__webglFramebuffer[F]); else i.deleteFramebuffer(x.__webglFramebuffer); if (x.__webglDepthbuffer && i.deleteRenderbuffer(x.__webglDepthbuffer), x.__webglMultisampledFramebuffer && i.deleteFramebuffer(x.__webglMultisampledFramebuffer), x.__webglColorRenderbuffer) for (let F = 0; F < x.__webglColorRenderbuffer.length; F++)x.__webglColorRenderbuffer[F] && i.deleteRenderbuffer(x.__webglColorRenderbuffer[F]); x.__webglDepthRenderbuffer && i.deleteRenderbuffer(x.__webglDepthRenderbuffer) } const N = E.textures; for (let F = 0, H = N.length; F < H; F++) { const k = n.get(N[F]); k.__webglTexture && (i.deleteTexture(k.__webglTexture), o.memory.textures--), n.remove(N[F]) } n.remove(E) } let S = 0; function M() { S = 0 } function D() { const E = S; return E >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + s.maxTextures), S += 1, E } function I(E) { const x = []; return x.push(E.wrapS), x.push(E.wrapT), x.push(E.wrapR || 0), x.push(E.magFilter), x.push(E.minFilter), x.push(E.anisotropy), x.push(E.internalFormat), x.push(E.format), x.push(E.type), x.push(E.generateMipmaps), x.push(E.premultiplyAlpha), x.push(E.flipY), x.push(E.unpackAlignment), x.push(E.colorSpace), x.join() } function C(E, x) { const N = n.get(E); if (E.isVideoTexture && U(E), E.isRenderTargetTexture === !1 && E.version > 0 && N.__version !== E.version) { const F = E.image; if (F === null) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found."); else if (F.complete === !1) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete"); else { ye(N, E, x); return } } t.bindTexture(i.TEXTURE_2D, N.__webglTexture, i.TEXTURE0 + x) } function z(E, x) { const N = n.get(E); if (E.version > 0 && N.__version !== E.version) { ye(N, E, x); return } t.bindTexture(i.TEXTURE_2D_ARRAY, N.__webglTexture, i.TEXTURE0 + x) } function Y(E, x) { const N = n.get(E); if (E.version > 0 && N.__version !== E.version) { ye(N, E, x); return } t.bindTexture(i.TEXTURE_3D, N.__webglTexture, i.TEXTURE0 + x) } function X(E, x) { const N = n.get(E); if (E.version > 0 && N.__version !== E.version) { Pe(N, E, x); return } t.bindTexture(i.TEXTURE_CUBE_MAP, N.__webglTexture, i.TEXTURE0 + x) } const ee = { [Ai]: i.REPEAT, [An]: i.CLAMP_TO_EDGE, [Ko]: i.MIRRORED_REPEAT }, G = { [Rt]: i.NEAREST, [Od]: i.NEAREST_MIPMAP_NEAREST, [mr]: i.NEAREST_MIPMAP_LINEAR, [At]: i.LINEAR, [Fo]: i.LINEAR_MIPMAP_NEAREST, [wn]: i.LINEAR_MIPMAP_LINEAR }, ne = { [J_]: i.NEVER, [s0]: i.ALWAYS, [Q_]: i.LESS, [jd]: i.LEQUAL, [e0]: i.EQUAL, [i0]: i.GEQUAL, [t0]: i.GREATER, [n0]: i.NOTEQUAL }; function oe(E, x) { if (x.type === Vt && e.has("OES_texture_float_linear") === !1 && (x.magFilter === At || x.magFilter === Fo || x.magFilter === mr || x.magFilter === wn || x.minFilter === At || x.minFilter === Fo || x.minFilter === mr || x.minFilter === wn) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(E, i.TEXTURE_WRAP_S, ee[x.wrapS]), i.texParameteri(E, i.TEXTURE_WRAP_T, ee[x.wrapT]), (E === i.TEXTURE_3D || E === i.TEXTURE_2D_ARRAY) && i.texParameteri(E, i.TEXTURE_WRAP_R, ee[x.wrapR]), i.texParameteri(E, i.TEXTURE_MAG_FILTER, G[x.magFilter]), i.texParameteri(E, i.TEXTURE_MIN_FILTER, G[x.minFilter]), x.compareFunction && (i.texParameteri(E, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(E, i.TEXTURE_COMPARE_FUNC, ne[x.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) { if (x.magFilter === Rt || x.minFilter !== mr && x.minFilter !== wn || x.type === Vt && e.has("OES_texture_float_linear") === !1) return; if (x.anisotropy > 1 || n.get(x).__currentAnisotropy) { const N = e.get("EXT_texture_filter_anisotropic"); i.texParameterf(E, N.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(x.anisotropy, s.getMaxAnisotropy())), n.get(x).__currentAnisotropy = x.anisotropy } } } function pe(E, x) { let N = !1; E.__webglInit === void 0 && (E.__webglInit = !0, x.addEventListener("dispose", A)); const F = x.source; let H = f.get(F); H === void 0 && (H = {}, f.set(F, H)); const k = I(x); if (k !== E.__cacheKey) { H[k] === void 0 && (H[k] = { texture: i.createTexture(), usedTimes: 0 }, o.memory.textures++, N = !0), H[k].usedTimes++; const se = H[E.__cacheKey]; se !== void 0 && (H[E.__cacheKey].usedTimes--, se.usedTimes === 0 && R(x)), E.__cacheKey = k, E.__webglTexture = H[k].texture } return N } function ye(E, x, N) { let F = i.TEXTURE_2D; (x.isDataArrayTexture || x.isCompressedArrayTexture) && (F = i.TEXTURE_2D_ARRAY), x.isData3DTexture && (F = i.TEXTURE_3D); const H = pe(E, x), k = x.source; t.bindTexture(F, E.__webglTexture, i.TEXTURE0 + N); const se = n.get(k); if (k.version !== se.__version || H === !0) { t.activeTexture(i.TEXTURE0 + N); const K = Je.getPrimaries(Je.workingColorSpace), ae = x.colorSpace === mi ? null : Je.getPrimaries(x.colorSpace), ce = x.colorSpace === mi || K === ae ? i.NONE : i.BROWSER_DEFAULT_WEBGL; i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, ce); let re = v(x.image, !1, s.maxTextureSize); re = V(x, re); const le = r.convert(x.format, x.colorSpace), _e = r.convert(x.type); let de = b(x.internalFormat, le, _e, x.colorSpace, x.isVideoTexture); oe(F, x); let me; const Ne = x.mipmaps, ze = x.isVideoTexture !== !0 && de !== Wd, Xe = se.__version === void 0 || H === !0, je = k.dataReady, Le = y(x, re); if (x.isDepthTexture) de = i.DEPTH_COMPONENT16, x.type === Vt ? de = i.DEPTH_COMPONENT32F : x.type === Hs ? de = i.DEPTH_COMPONENT24 : x.type === Ks && (de = i.DEPTH24_STENCIL8), Xe && (ze ? t.texStorage2D(i.TEXTURE_2D, 1, de, re.width, re.height) : t.texImage2D(i.TEXTURE_2D, 0, de, re.width, re.height, 0, le, _e, null)); else if (x.isDataTexture) if (Ne.length > 0) { ze && Xe && t.texStorage2D(i.TEXTURE_2D, Le, de, Ne[0].width, Ne[0].height); for (let ve = 0, g = Ne.length; ve < g; ve++)me = Ne[ve], ze ? je && t.texSubImage2D(i.TEXTURE_2D, ve, 0, 0, me.width, me.height, le, _e, me.data) : t.texImage2D(i.TEXTURE_2D, ve, de, me.width, me.height, 0, le, _e, me.data); x.generateMipmaps = !1 } else ze ? (Xe && t.texStorage2D(i.TEXTURE_2D, Le, de, re.width, re.height), je && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, re.width, re.height, le, _e, re.data)) : t.texImage2D(i.TEXTURE_2D, 0, de, re.width, re.height, 0, le, _e, re.data); else if (x.isCompressedTexture) if (x.isCompressedArrayTexture) { ze && Xe && t.texStorage3D(i.TEXTURE_2D_ARRAY, Le, de, Ne[0].width, Ne[0].height, re.depth); for (let ve = 0, g = Ne.length; ve < g; ve++)me = Ne[ve], x.format !== _n ? le !== null ? ze ? je && t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, ve, 0, 0, 0, me.width, me.height, re.depth, le, me.data, 0, 0) : t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, ve, de, me.width, me.height, re.depth, 0, me.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : ze ? je && t.texSubImage3D(i.TEXTURE_2D_ARRAY, ve, 0, 0, 0, me.width, me.height, re.depth, le, _e, me.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, ve, de, me.width, me.height, re.depth, 0, le, _e, me.data) } else { ze && Xe && t.texStorage2D(i.TEXTURE_2D, Le, de, Ne[0].width, Ne[0].height); for (let ve = 0, g = Ne.length; ve < g; ve++)me = Ne[ve], x.format !== _n ? le !== null ? ze ? je && t.compressedTexSubImage2D(i.TEXTURE_2D, ve, 0, 0, me.width, me.height, le, me.data) : t.compressedTexImage2D(i.TEXTURE_2D, ve, de, me.width, me.height, 0, me.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : ze ? je && t.texSubImage2D(i.TEXTURE_2D, ve, 0, 0, me.width, me.height, le, _e, me.data) : t.texImage2D(i.TEXTURE_2D, ve, de, me.width, me.height, 0, le, _e, me.data) } else if (x.isDataArrayTexture) ze ? (Xe && t.texStorage3D(i.TEXTURE_2D_ARRAY, Le, de, re.width, re.height, re.depth), je && t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, re.width, re.height, re.depth, le, _e, re.data)) : t.texImage3D(i.TEXTURE_2D_ARRAY, 0, de, re.width, re.height, re.depth, 0, le, _e, re.data); else if (x.isData3DTexture) ze ? (Xe && t.texStorage3D(i.TEXTURE_3D, Le, de, re.width, re.height, re.depth), je && t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, re.width, re.height, re.depth, le, _e, re.data)) : t.texImage3D(i.TEXTURE_3D, 0, de, re.width, re.height, re.depth, 0, le, _e, re.data); else if (x.isFramebufferTexture) { if (Xe) if (ze) t.texStorage2D(i.TEXTURE_2D, Le, de, re.width, re.height); else { let ve = re.width, g = re.height; for (let q = 0; q < Le; q++)t.texImage2D(i.TEXTURE_2D, q, de, ve, g, 0, le, _e, null), ve >>= 1, g >>= 1 } } else if (Ne.length > 0) { if (ze && Xe) { const ve = J(Ne[0]); t.texStorage2D(i.TEXTURE_2D, Le, de, ve.width, ve.height) } for (let ve = 0, g = Ne.length; ve < g; ve++)me = Ne[ve], ze ? je && t.texSubImage2D(i.TEXTURE_2D, ve, 0, 0, le, _e, me) : t.texImage2D(i.TEXTURE_2D, ve, de, le, _e, me); x.generateMipmaps = !1 } else if (ze) { if (Xe) { const ve = J(re); t.texStorage2D(i.TEXTURE_2D, Le, de, ve.width, ve.height) } je && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, le, _e, re) } else t.texImage2D(i.TEXTURE_2D, 0, de, le, _e, re); p(x) && m(F), se.__version = k.version, x.onUpdate && x.onUpdate(x) } E.__version = x.version } function Pe(E, x, N) { if (x.image.length !== 6) return; const F = pe(E, x), H = x.source; t.bindTexture(i.TEXTURE_CUBE_MAP, E.__webglTexture, i.TEXTURE0 + N); const k = n.get(H); if (H.version !== k.__version || F === !0) { t.activeTexture(i.TEXTURE0 + N); const se = Je.getPrimaries(Je.workingColorSpace), K = x.colorSpace === mi ? null : Je.getPrimaries(x.colorSpace), ae = x.colorSpace === mi || se === K ? i.NONE : i.BROWSER_DEFAULT_WEBGL; i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, ae); const ce = x.isCompressedTexture || x.image[0].isCompressedTexture, re = x.image[0] && x.image[0].isDataTexture, le = []; for (let g = 0; g < 6; g++)!ce && !re ? le[g] = v(x.image[g], !0, s.maxCubemapSize) : le[g] = re ? x.image[g].image : x.image[g], le[g] = V(x, le[g]); const _e = le[0], de = r.convert(x.format, x.colorSpace), me = r.convert(x.type), Ne = b(x.internalFormat, de, me, x.colorSpace), ze = x.isVideoTexture !== !0, Xe = k.__version === void 0 || F === !0, je = H.dataReady; let Le = y(x, _e); oe(i.TEXTURE_CUBE_MAP, x); let ve; if (ce) { ze && Xe && t.texStorage2D(i.TEXTURE_CUBE_MAP, Le, Ne, _e.width, _e.height); for (let g = 0; g < 6; g++) { ve = le[g].mipmaps; for (let q = 0; q < ve.length; q++) { const ie = ve[q]; x.format !== _n ? de !== null ? ze ? je && t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + g, q, 0, 0, ie.width, ie.height, de, ie.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + g, q, Ne, ie.width, ie.height, 0, ie.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : ze ? je && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + g, q, 0, 0, ie.width, ie.height, de, me, ie.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + g, q, Ne, ie.width, ie.height, 0, de, me, ie.data) } } } else { if (ve = x.mipmaps, ze && Xe) { ve.length > 0 && Le++; const g = J(le[0]); t.texStorage2D(i.TEXTURE_CUBE_MAP, Le, Ne, g.width, g.height) } for (let g = 0; g < 6; g++)if (re) { ze ? je && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + g, 0, 0, 0, le[g].width, le[g].height, de, me, le[g].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + g, 0, Ne, le[g].width, le[g].height, 0, de, me, le[g].data); for (let q = 0; q < ve.length; q++) { const he = ve[q].image[g].image; ze ? je && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + g, q + 1, 0, 0, he.width, he.height, de, me, he.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + g, q + 1, Ne, he.width, he.height, 0, de, me, he.data) } } else { ze ? je && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + g, 0, 0, 0, de, me, le[g]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + g, 0, Ne, de, me, le[g]); for (let q = 0; q < ve.length; q++) { const ie = ve[q]; ze ? je && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + g, q + 1, 0, 0, de, me, ie.image[g]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + g, q + 1, Ne, de, me, ie.image[g]) } } } p(x) && m(i.TEXTURE_CUBE_MAP), k.__version = H.version, x.onUpdate && x.onUpdate(x) } E.__version = x.version } function te(E, x, N, F, H, k) { const se = r.convert(N.format, N.colorSpace), K = r.convert(N.type), ae = b(N.internalFormat, se, K, N.colorSpace); if (!n.get(x).__hasExternalTextures) { const re = Math.max(1, x.width >> k), le = Math.max(1, x.height >> k); H === i.TEXTURE_3D || H === i.TEXTURE_2D_ARRAY ? t.texImage3D(H, k, ae, re, le, x.depth, 0, se, K, null) : t.texImage2D(H, k, ae, re, le, 0, se, K, null) } t.bindFramebuffer(i.FRAMEBUFFER, E), w(x) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, F, H, n.get(N).__webglTexture, 0, De(x)) : (H === i.TEXTURE_2D || H >= i.TEXTURE_CUBE_MAP_POSITIVE_X && H <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, F, H, n.get(N).__webglTexture, k), t.bindFramebuffer(i.FRAMEBUFFER, null) } function ue(E, x, N) { if (i.bindRenderbuffer(i.RENDERBUFFER, E), x.depthBuffer && !x.stencilBuffer) { let F = i.DEPTH_COMPONENT24; if (N || w(x)) { const H = x.depthTexture; H && H.isDepthTexture && (H.type === Vt ? F = i.DEPTH_COMPONENT32F : H.type === Hs && (F = i.DEPTH_COMPONENT24)); const k = De(x); w(x) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, k, F, x.width, x.height) : i.renderbufferStorageMultisample(i.RENDERBUFFER, k, F, x.width, x.height) } else i.renderbufferStorage(i.RENDERBUFFER, F, x.width, x.height); i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, E) } else if (x.depthBuffer && x.stencilBuffer) { const F = De(x); N && w(x) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, F, i.DEPTH24_STENCIL8, x.width, x.height) : w(x) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, F, i.DEPTH24_STENCIL8, x.width, x.height) : i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, x.width, x.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, E) } else { const F = x.textures; for (let H = 0; H < F.length; H++) { const k = F[H], se = r.convert(k.format, k.colorSpace), K = r.convert(k.type), ae = b(k.internalFormat, se, K, k.colorSpace), ce = De(x); N && w(x) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ce, ae, x.width, x.height) : w(x) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ce, ae, x.width, x.height) : i.renderbufferStorage(i.RENDERBUFFER, ae, x.width, x.height) } } i.bindRenderbuffer(i.RENDERBUFFER, null) } function ge(E, x) { if (x && x.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported"); if (t.bindFramebuffer(i.FRAMEBUFFER, E), !(x.depthTexture && x.depthTexture.isDepthTexture)) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture"); (!n.get(x.depthTexture).__webglTexture || x.depthTexture.image.width !== x.width || x.depthTexture.image.height !== x.height) && (x.depthTexture.image.width = x.width, x.depthTexture.image.height = x.height, x.depthTexture.needsUpdate = !0), C(x.depthTexture, 0); const F = n.get(x.depthTexture).__webglTexture, H = De(x); if (x.depthTexture.format === Ds) w(x) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, F, 0, H) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, F, 0); else if (x.depthTexture.format === zs) w(x) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, F, 0, H) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, F, 0); else throw new Error("Unknown depthTexture format") } function fe(E) { const x = n.get(E), N = E.isWebGLCubeRenderTarget === !0; if (E.depthTexture && !x.__autoAllocateDepthBuffer) { if (N) throw new Error("target.depthTexture not supported in Cube render targets"); ge(x.__webglFramebuffer, E) } else if (N) { x.__webglDepthbuffer = []; for (let F = 0; F < 6; F++)t.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer[F]), x.__webglDepthbuffer[F] = i.createRenderbuffer(), ue(x.__webglDepthbuffer[F], E, !1) } else t.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer), x.__webglDepthbuffer = i.createRenderbuffer(), ue(x.__webglDepthbuffer, E, !1); t.bindFramebuffer(i.FRAMEBUFFER, null) } function Te(E, x, N) { const F = n.get(E); x !== void 0 && te(F.__webglFramebuffer, E, E.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), N !== void 0 && fe(E) } function Ae(E) { const x = E.texture, N = n.get(E), F = n.get(x); E.addEventListener("dispose", O); const H = E.textures, k = E.isWebGLCubeRenderTarget === !0, se = H.length > 1; if (se || (F.__webglTexture === void 0 && (F.__webglTexture = i.createTexture()), F.__version = x.version, o.memory.textures++), k) { N.__webglFramebuffer = []; for (let K = 0; K < 6; K++)if (x.mipmaps && x.mipmaps.length > 0) { N.__webglFramebuffer[K] = []; for (let ae = 0; ae < x.mipmaps.length; ae++)N.__webglFramebuffer[K][ae] = i.createFramebuffer() } else N.__webglFramebuffer[K] = i.createFramebuffer() } else { if (x.mipmaps && x.mipmaps.length > 0) { N.__webglFramebuffer = []; for (let K = 0; K < x.mipmaps.length; K++)N.__webglFramebuffer[K] = i.createFramebuffer() } else N.__webglFramebuffer = i.createFramebuffer(); if (se) for (let K = 0, ae = H.length; K < ae; K++) { const ce = n.get(H[K]); ce.__webglTexture === void 0 && (ce.__webglTexture = i.createTexture(), o.memory.textures++) } if (E.samples > 0 && w(E) === !1) { N.__webglMultisampledFramebuffer = i.createFramebuffer(), N.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, N.__webglMultisampledFramebuffer); for (let K = 0; K < H.length; K++) { const ae = H[K]; N.__webglColorRenderbuffer[K] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, N.__webglColorRenderbuffer[K]); const ce = r.convert(ae.format, ae.colorSpace), re = r.convert(ae.type), le = b(ae.internalFormat, ce, re, ae.colorSpace, E.isXRRenderTarget === !0), _e = De(E); i.renderbufferStorageMultisample(i.RENDERBUFFER, _e, le, E.width, E.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + K, i.RENDERBUFFER, N.__webglColorRenderbuffer[K]) } i.bindRenderbuffer(i.RENDERBUFFER, null), E.depthBuffer && (N.__webglDepthRenderbuffer = i.createRenderbuffer(), ue(N.__webglDepthRenderbuffer, E, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null) } } if (k) { t.bindTexture(i.TEXTURE_CUBE_MAP, F.__webglTexture), oe(i.TEXTURE_CUBE_MAP, x); for (let K = 0; K < 6; K++)if (x.mipmaps && x.mipmaps.length > 0) for (let ae = 0; ae < x.mipmaps.length; ae++)te(N.__webglFramebuffer[K][ae], E, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + K, ae); else te(N.__webglFramebuffer[K], E, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0); p(x) && m(i.TEXTURE_CUBE_MAP), t.unbindTexture() } else if (se) { for (let K = 0, ae = H.length; K < ae; K++) { const ce = H[K], re = n.get(ce); t.bindTexture(i.TEXTURE_2D, re.__webglTexture), oe(i.TEXTURE_2D, ce), te(N.__webglFramebuffer, E, ce, i.COLOR_ATTACHMENT0 + K, i.TEXTURE_2D, 0), p(ce) && m(i.TEXTURE_2D) } t.unbindTexture() } else { let K = i.TEXTURE_2D; if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (K = E.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(K, F.__webglTexture), oe(K, x), x.mipmaps && x.mipmaps.length > 0) for (let ae = 0; ae < x.mipmaps.length; ae++)te(N.__webglFramebuffer[ae], E, x, i.COLOR_ATTACHMENT0, K, ae); else te(N.__webglFramebuffer, E, x, i.COLOR_ATTACHMENT0, K, 0); p(x) && m(K), t.unbindTexture() } E.depthBuffer && fe(E) } function we(E) { const x = E.textures; for (let N = 0, F = x.length; N < F; N++) { const H = x[N]; if (p(H)) { const k = E.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : i.TEXTURE_2D, se = n.get(H).__webglTexture; t.bindTexture(k, se), m(k), t.unbindTexture() } } } function j(E) { if (E.samples > 0 && w(E) === !1) { const x = E.textures, N = E.width, F = E.height; let H = i.COLOR_BUFFER_BIT; const k = [], se = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, K = n.get(E), ae = x.length > 1; if (ae) for (let ce = 0; ce < x.length; ce++)t.bindFramebuffer(i.FRAMEBUFFER, K.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ce, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, K.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ce, i.TEXTURE_2D, null, 0); t.bindFramebuffer(i.READ_FRAMEBUFFER, K.__webglMultisampledFramebuffer), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, K.__webglFramebuffer); for (let ce = 0; ce < x.length; ce++) { k.push(i.COLOR_ATTACHMENT0 + ce), E.depthBuffer && k.push(se); const re = K.__ignoreDepthValues !== void 0 ? K.__ignoreDepthValues : !1; if (re === !1 && (E.depthBuffer && (H |= i.DEPTH_BUFFER_BIT), E.stencilBuffer && K.__isTransmissionRenderTarget !== !0 && (H |= i.STENCIL_BUFFER_BIT)), ae && i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, K.__webglColorRenderbuffer[ce]), re === !0 && (i.invalidateFramebuffer(i.READ_FRAMEBUFFER, [se]), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [se])), ae) { const le = n.get(x[ce]).__webglTexture; i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, le, 0) } i.blitFramebuffer(0, 0, N, F, 0, 0, N, F, H, i.NEAREST), l && i.invalidateFramebuffer(i.READ_FRAMEBUFFER, k) } if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), ae) for (let ce = 0; ce < x.length; ce++) { t.bindFramebuffer(i.FRAMEBUFFER, K.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ce, i.RENDERBUFFER, K.__webglColorRenderbuffer[ce]); const re = n.get(x[ce]).__webglTexture; t.bindFramebuffer(i.FRAMEBUFFER, K.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ce, i.TEXTURE_2D, re, 0) } t.bindFramebuffer(i.DRAW_FRAMEBUFFER, K.__webglMultisampledFramebuffer) } } function De(E) { return Math.min(s.maxSamples, E.samples) } function w(E) { const x = n.get(E); return E.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && x.__useRenderToTexture !== !1 } function U(E) { const x = o.render.frame; u.get(E) !== x && (u.set(E, x), E.update()) } function V(E, x) { const N = E.colorSpace, F = E.format, H = E.type; return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || N !== xt && N !== mi && (Je.getTransfer(N) === st ? (F !== _n || H !== Ei) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", N)), x } function J(E) { return typeof HTMLImageElement < "u" && E instanceof HTMLImageElement ? (c.width = E.naturalWidth || E.width, c.height = E.naturalHeight || E.height) : typeof VideoFrame < "u" && E instanceof VideoFrame ? (c.width = E.displayWidth, c.height = E.displayHeight) : (c.width = E.width, c.height = E.height), c } this.allocateTextureUnit = D, this.resetTextureUnits = M, this.setTexture2D = C, this.setTexture2DArray = z, this.setTexture3D = Y, this.setTextureCube = X, this.rebindTextures = Te, this.setupRenderTarget = Ae, this.updateRenderTargetMipmap = we, this.updateMultisampleRenderTarget = j, this.setupDepthRenderbuffer = fe, this.setupFrameBufferTexture = te, this.useMultisampledRTT = w } function yS(i, e) { function t(n, s = mi) { let r; const o = Je.getTransfer(s); if (n === Ei) return i.UNSIGNED_BYTE; if (n === kd) return i.UNSIGNED_SHORT_4_4_4_4; if (n === Hd) return i.UNSIGNED_SHORT_5_5_5_1; if (n === H_) return i.UNSIGNED_INT_5_9_9_9_REV; if (n === B_) return i.BYTE; if (n === k_) return i.SHORT; if (n === Fd) return i.UNSIGNED_SHORT; if (n === Bd) return i.INT; if (n === Hs) return i.UNSIGNED_INT; if (n === Vt) return i.FLOAT; if (n === gn) return i.HALF_FLOAT; if (n === z_) return i.ALPHA; if (n === V_) return i.RGB; if (n === _n) return i.RGBA; if (n === G_) return i.LUMINANCE; if (n === W_) return i.LUMINANCE_ALPHA; if (n === Ds) return i.DEPTH_COMPONENT; if (n === zs) return i.DEPTH_STENCIL; if (n === Ec) return i.RED; if (n === zd) return i.RED_INTEGER; if (n === X_) return i.RG; if (n === Vd) return i.RG_INTEGER; if (n === Gd) return i.RGBA_INTEGER; if (n === Oa || n === Fa || n === Ba || n === ka) if (o === st) if (r = e.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) { if (n === Oa) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT; if (n === Fa) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT; if (n === Ba) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT; if (n === ka) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT } else return null; else if (r = e.get("WEBGL_compressed_texture_s3tc"), r !== null) { if (n === Oa) return r.COMPRESSED_RGB_S3TC_DXT1_EXT; if (n === Fa) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT; if (n === Ba) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT; if (n === ka) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT } else return null; if (n === Du || n === Nu || n === Uu || n === Ou) if (r = e.get("WEBGL_compressed_texture_pvrtc"), r !== null) { if (n === Du) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG; if (n === Nu) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG; if (n === Uu) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG; if (n === Ou) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG } else return null; if (n === Wd) return r = e.get("WEBGL_compressed_texture_etc1"), r !== null ? r.COMPRESSED_RGB_ETC1_WEBGL : null; if (n === Fu || n === Bu) if (r = e.get("WEBGL_compressed_texture_etc"), r !== null) { if (n === Fu) return o === st ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2; if (n === Bu) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC } else return null; if (n === ku || n === Hu || n === zu || n === Vu || n === Gu || n === Wu || n === Xu || n === ju || n === Yu || n === qu || n === Ku || n === $u || n === Zu || n === Ju) if (r = e.get("WEBGL_compressed_texture_astc"), r !== null) { if (n === ku) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR; if (n === Hu) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR; if (n === zu) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR; if (n === Vu) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR; if (n === Gu) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR; if (n === Wu) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR; if (n === Xu) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR; if (n === ju) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR; if (n === Yu) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR; if (n === qu) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR; if (n === Ku) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR; if (n === $u) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR; if (n === Zu) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR; if (n === Ju) return o === st ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR } else return null; if (n === Ha || n === Qu || n === eh) if (r = e.get("EXT_texture_compression_bptc"), r !== null) { if (n === Ha) return o === st ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT; if (n === Qu) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT; if (n === eh) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT } else return null; if (n === j_ || n === th || n === nh || n === ih) if (r = e.get("EXT_texture_compression_rgtc"), r !== null) { if (n === Ha) return r.COMPRESSED_RED_RGTC1_EXT; if (n === th) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT; if (n === nh) return r.COMPRESSED_RED_GREEN_RGTC2_EXT; if (n === ih) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT } else return null; return n === Ks ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null } return { convert: t } } class SS extends kt { constructor(e = []) { super(), this.isArrayCamera = !0, this.cameras = e } } class Yi extends ot { constructor() { super(), this.isGroup = !0, this.type = "Group" } } const ES = { type: "move" }; class fl { constructor() { this._targetRay = null, this._grip = null, this._hand = null } getHandSpace() { return this._hand === null && (this._hand = new Yi, this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand } getTargetRaySpace() { return this._targetRay === null && (this._targetRay = new Yi, this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new B, this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new B), this._targetRay } getGripSpace() { return this._grip === null && (this._grip = new Yi, this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new B, this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new B), this._grip } dispatchEvent(e) { return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this } connect(e) { if (e && e.hand) { const t = this._hand; if (t) for (const n of e.hand.values()) this._getHandJoint(t, n) } return this.dispatchEvent({ type: "connected", data: e }), this } disconnect(e) { return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this } update(e, t, n) { let s = null, r = null, o = null; const a = this._targetRay, l = this._grip, c = this._hand; if (e && t.session.visibilityState !== "visible-blurred") { if (c && e.hand) { o = !0; for (const v of e.hand.values()) { const p = t.getJointPose(v, n), m = this._getHandJoint(c, v); p !== null && (m.matrix.fromArray(p.transform.matrix), m.matrix.decompose(m.position, m.rotation, m.scale), m.matrixWorldNeedsUpdate = !0, m.jointRadius = p.radius), m.visible = p !== null } const u = c.joints["index-finger-tip"], h = c.joints["thumb-tip"], f = u.position.distanceTo(h.position), d = .02, _ = .005; c.inputState.pinching && f > d + _ ? (c.inputState.pinching = !1, this.dispatchEvent({ type: "pinchend", handedness: e.handedness, target: this })) : !c.inputState.pinching && f <= d - _ && (c.inputState.pinching = !0, this.dispatchEvent({ type: "pinchstart", handedness: e.handedness, target: this })) } else l !== null && e.gripSpace && (r = t.getPose(e.gripSpace, n), r !== null && (l.matrix.fromArray(r.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(r.linearVelocity)) : l.hasLinearVelocity = !1, r.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(r.angularVelocity)) : l.hasAngularVelocity = !1)); a !== null && (s = t.getPose(e.targetRaySpace, n), s === null && r !== null && (s = r), s !== null && (a.matrix.fromArray(s.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(s.linearVelocity)) : a.hasLinearVelocity = !1, s.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(s.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(ES))) } return a !== null && (a.visible = s !== null), l !== null && (l.visible = r !== null), c !== null && (c.visible = o !== null), this } _getHandJoint(e, t) { if (e.joints[t.jointName] === void 0) { const n = new Yi; n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n) } return e.joints[t.jointName] } } const TS = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, bS = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`; class AS { constructor() { this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0 } init(e, t, n) { if (this.texture === null) { const s = new wt, r = e.properties.get(s); r.__webglTexture = t.texture, (t.depthNear != n.depthNear || t.depthFar != n.depthFar) && (this.depthNear = t.depthNear, this.depthFar = t.depthFar), this.texture = s } } render(e, t) { if (this.texture !== null) { if (this.mesh === null) { const n = t.cameras[0].viewport, s = new Wt({ vertexShader: TS, fragmentShader: bS, uniforms: { depthColor: { value: this.texture }, depthWidth: { value: n.z }, depthHeight: { value: n.w } } }); this.mesh = new Gt(new ma(20, 20), s) } e.render(this.mesh, t) } } reset() { this.texture = null, this.mesh = null } } class wS extends es { constructor(e, t) { super(); const n = this; let s = null, r = 1, o = null, a = "local-floor", l = 1, c = null, u = null, h = null, f = null, d = null, _ = null; const v = new AS, p = t.getContextAttributes(); let m = null, b = null; const y = [], A = [], O = new Ee; let P = null; const R = new kt; R.layers.enable(1), R.viewport = new it; const L = new kt; L.layers.enable(2), L.viewport = new it; const S = [R, L], M = new SS; M.layers.enable(1), M.layers.enable(2); let D = null, I = null; this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function (te) { let ue = y[te]; return ue === void 0 && (ue = new fl, y[te] = ue), ue.getTargetRaySpace() }, this.getControllerGrip = function (te) { let ue = y[te]; return ue === void 0 && (ue = new fl, y[te] = ue), ue.getGripSpace() }, this.getHand = function (te) { let ue = y[te]; return ue === void 0 && (ue = new fl, y[te] = ue), ue.getHandSpace() }; function C(te) { const ue = A.indexOf(te.inputSource); if (ue === -1) return; const ge = y[ue]; ge !== void 0 && (ge.update(te.inputSource, te.frame, c || o), ge.dispatchEvent({ type: te.type, data: te.inputSource })) } function z() { s.removeEventListener("select", C), s.removeEventListener("selectstart", C), s.removeEventListener("selectend", C), s.removeEventListener("squeeze", C), s.removeEventListener("squeezestart", C), s.removeEventListener("squeezeend", C), s.removeEventListener("end", z), s.removeEventListener("inputsourceschange", Y); for (let te = 0; te < y.length; te++) { const ue = A[te]; ue !== null && (A[te] = null, y[te].disconnect(ue)) } D = null, I = null, v.reset(), e.setRenderTarget(m), d = null, f = null, h = null, s = null, b = null, Pe.stop(), n.isPresenting = !1, e.setPixelRatio(P), e.setSize(O.width, O.height, !1), n.dispatchEvent({ type: "sessionend" }) } this.setFramebufferScaleFactor = function (te) { r = te, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.") }, this.setReferenceSpaceType = function (te) { a = te, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.") }, this.getReferenceSpace = function () { return c || o }, this.setReferenceSpace = function (te) { c = te }, this.getBaseLayer = function () { return f !== null ? f : d }, this.getBinding = function () { return h }, this.getFrame = function () { return _ }, this.getSession = function () { return s }, this.setSession = async function (te) { if (s = te, s !== null) { if (m = e.getRenderTarget(), s.addEventListener("select", C), s.addEventListener("selectstart", C), s.addEventListener("selectend", C), s.addEventListener("squeeze", C), s.addEventListener("squeezestart", C), s.addEventListener("squeezeend", C), s.addEventListener("end", z), s.addEventListener("inputsourceschange", Y), p.xrCompatible !== !0 && await t.makeXRCompatible(), P = e.getPixelRatio(), e.getSize(O), s.renderState.layers === void 0) { const ue = { antialias: p.antialias, alpha: !0, depth: p.depth, stencil: p.stencil, framebufferScaleFactor: r }; d = new XRWebGLLayer(s, t, ue), s.updateRenderState({ baseLayer: d }), e.setPixelRatio(1), e.setSize(d.framebufferWidth, d.framebufferHeight, !1), b = new Cn(d.framebufferWidth, d.framebufferHeight, { format: _n, type: Ei, colorSpace: e.outputColorSpace, stencilBuffer: p.stencil }) } else { let ue = null, ge = null, fe = null; p.depth && (fe = p.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, ue = p.stencil ? zs : Ds, ge = p.stencil ? Ks : Hs); const Te = { colorFormat: t.RGBA8, depthFormat: fe, scaleFactor: r }; h = new XRWebGLBinding(s, t), f = h.createProjectionLayer(Te), s.updateRenderState({ layers: [f] }), e.setPixelRatio(1), e.setSize(f.textureWidth, f.textureHeight, !1), b = new Cn(f.textureWidth, f.textureHeight, { format: _n, type: Ei, depthTexture: new Lc(f.textureWidth, f.textureHeight, ge, void 0, void 0, void 0, void 0, void 0, void 0, ue), stencilBuffer: p.stencil, colorSpace: e.outputColorSpace, samples: p.antialias ? 4 : 0 }); const Ae = e.properties.get(b); Ae.__ignoreDepthValues = f.ignoreDepthValues } b.isXRRenderTarget = !0, this.setFoveation(l), c = null, o = await s.requestReferenceSpace(a), Pe.setContext(s), Pe.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" }) } }, this.getEnvironmentBlendMode = function () { if (s !== null) return s.environmentBlendMode }; function Y(te) { for (let ue = 0; ue < te.removed.length; ue++) { const ge = te.removed[ue], fe = A.indexOf(ge); fe >= 0 && (A[fe] = null, y[fe].disconnect(ge)) } for (let ue = 0; ue < te.added.length; ue++) { const ge = te.added[ue]; let fe = A.indexOf(ge); if (fe === -1) { for (let Ae = 0; Ae < y.length; Ae++)if (Ae >= A.length) { A.push(ge), fe = Ae; break } else if (A[Ae] === null) { A[Ae] = ge, fe = Ae; break } if (fe === -1) break } const Te = y[fe]; Te && Te.connect(ge) } } const X = new B, ee = new B; function G(te, ue, ge) { X.setFromMatrixPosition(ue.matrixWorld), ee.setFromMatrixPosition(ge.matrixWorld); const fe = X.distanceTo(ee), Te = ue.projectionMatrix.elements, Ae = ge.projectionMatrix.elements, we = Te[14] / (Te[10] - 1), j = Te[14] / (Te[10] + 1), De = (Te[9] + 1) / Te[5], w = (Te[9] - 1) / Te[5], U = (Te[8] - 1) / Te[0], V = (Ae[8] + 1) / Ae[0], J = we * U, E = we * V, x = fe / (-U + V), N = x * -U; ue.matrixWorld.decompose(te.position, te.quaternion, te.scale), te.translateX(N), te.translateZ(x), te.matrixWorld.compose(te.position, te.quaternion, te.scale), te.matrixWorldInverse.copy(te.matrixWorld).invert(); const F = we + x, H = j + x, k = J - N, se = E + (fe - N), K = De * j / H * F, ae = w * j / H * F; te.projectionMatrix.makePerspective(k, se, K, ae, F, H), te.projectionMatrixInverse.copy(te.projectionMatrix).invert() } function ne(te, ue) { ue === null ? te.matrixWorld.copy(te.matrix) : te.matrixWorld.multiplyMatrices(ue.matrixWorld, te.matrix), te.matrixWorldInverse.copy(te.matrixWorld).invert() } this.updateCamera = function (te) { if (s === null) return; v.texture !== null && (te.near = v.depthNear, te.far = v.depthFar), M.near = L.near = R.near = te.near, M.far = L.far = R.far = te.far, (D !== M.near || I !== M.far) && (s.updateRenderState({ depthNear: M.near, depthFar: M.far }), D = M.near, I = M.far, R.near = D, R.far = I, L.near = D, L.far = I, R.updateProjectionMatrix(), L.updateProjectionMatrix(), te.updateProjectionMatrix()); const ue = te.parent, ge = M.cameras; ne(M, ue); for (let fe = 0; fe < ge.length; fe++)ne(ge[fe], ue); ge.length === 2 ? G(M, R, L) : M.projectionMatrix.copy(R.projectionMatrix), oe(te, M, ue) }; function oe(te, ue, ge) { ge === null ? te.matrix.copy(ue.matrixWorld) : (te.matrix.copy(ge.matrixWorld), te.matrix.invert(), te.matrix.multiply(ue.matrixWorld)), te.matrix.decompose(te.position, te.quaternion, te.scale), te.updateMatrixWorld(!0), te.projectionMatrix.copy(ue.projectionMatrix), te.projectionMatrixInverse.copy(ue.projectionMatrixInverse), te.isPerspectiveCamera && (te.fov = Gs * 2 * Math.atan(1 / te.projectionMatrix.elements[5]), te.zoom = 1) } this.getCamera = function () { return M }, this.getFoveation = function () { if (!(f === null && d === null)) return l }, this.setFoveation = function (te) { l = te, f !== null && (f.fixedFoveation = te), d !== null && d.fixedFoveation !== void 0 && (d.fixedFoveation = te) }, this.hasDepthSensing = function () { return v.texture !== null }; let pe = null; function ye(te, ue) { if (u = ue.getViewerPose(c || o), _ = ue, u !== null) { const ge = u.views; d !== null && (e.setRenderTargetFramebuffer(b, d.framebuffer), e.setRenderTarget(b)); let fe = !1; ge.length !== M.cameras.length && (M.cameras.length = 0, fe = !0); for (let Ae = 0; Ae < ge.length; Ae++) { const we = ge[Ae]; let j = null; if (d !== null) j = d.getViewport(we); else { const w = h.getViewSubImage(f, we); j = w.viewport, Ae === 0 && (e.setRenderTargetTextures(b, w.colorTexture, f.ignoreDepthValues ? void 0 : w.depthStencilTexture), e.setRenderTarget(b)) } let De = S[Ae]; De === void 0 && (De = new kt, De.layers.enable(Ae), De.viewport = new it, S[Ae] = De), De.matrix.fromArray(we.transform.matrix), De.matrix.decompose(De.position, De.quaternion, De.scale), De.projectionMatrix.fromArray(we.projectionMatrix), De.projectionMatrixInverse.copy(De.projectionMatrix).invert(), De.viewport.set(j.x, j.y, j.width, j.height), Ae === 0 && (M.matrix.copy(De.matrix), M.matrix.decompose(M.position, M.quaternion, M.scale)), fe === !0 && M.cameras.push(De) } const Te = s.enabledFeatures; if (Te && Te.includes("depth-sensing")) { const Ae = h.getDepthInformation(ge[0]); Ae && Ae.isValid && Ae.texture && v.init(e, Ae, s.renderState) } } for (let ge = 0; ge < y.length; ge++) { const fe = A[ge], Te = y[ge]; fe !== null && Te !== void 0 && Te.update(fe, ue, c || o) } v.render(e, M), pe && pe(te, ue), ue.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: ue }), _ = null } const Pe = new ip; Pe.setAnimationLoop(ye), this.setAnimationLoop = function (te) { pe = te }, this.dispose = function () { } } } const ki = new Ln, RS = new Oe; function CS(i, e) { function t(p, m) { p.matrixAutoUpdate === !0 && p.updateMatrix(), m.value.copy(p.matrix) } function n(p, m) { m.color.getRGB(p.fogColor.value, ep(i)), m.isFog ? (p.fogNear.value = m.near, p.fogFar.value = m.far) : m.isFogExp2 && (p.fogDensity.value = m.density) } function s(p, m, b, y, A) { m.isMeshBasicMaterial || m.isMeshLambertMaterial ? r(p, m) : m.isMeshToonMaterial ? (r(p, m), h(p, m)) : m.isMeshPhongMaterial ? (r(p, m), u(p, m)) : m.isMeshStandardMaterial ? (r(p, m), f(p, m), m.isMeshPhysicalMaterial && d(p, m, A)) : m.isMeshMatcapMaterial ? (r(p, m), _(p, m)) : m.isMeshDepthMaterial ? r(p, m) : m.isMeshDistanceMaterial ? (r(p, m), v(p, m)) : m.isMeshNormalMaterial ? r(p, m) : m.isLineBasicMaterial ? (o(p, m), m.isLineDashedMaterial && a(p, m)) : m.isPointsMaterial ? l(p, m, b, y) : m.isSpriteMaterial ? c(p, m) : m.isShadowMaterial ? (p.color.value.copy(m.color), p.opacity.value = m.opacity) : m.isShaderMaterial && (m.uniformsNeedUpdate = !1) } function r(p, m) { p.opacity.value = m.opacity, m.color && p.diffuse.value.copy(m.color), m.emissive && p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity), m.map && (p.map.value = m.map, t(m.map, p.mapTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, t(m.alphaMap, p.alphaMapTransform)), m.bumpMap && (p.bumpMap.value = m.bumpMap, t(m.bumpMap, p.bumpMapTransform), p.bumpScale.value = m.bumpScale, m.side === Xt && (p.bumpScale.value *= -1)), m.normalMap && (p.normalMap.value = m.normalMap, t(m.normalMap, p.normalMapTransform), p.normalScale.value.copy(m.normalScale), m.side === Xt && p.normalScale.value.negate()), m.displacementMap && (p.displacementMap.value = m.displacementMap, t(m.displacementMap, p.displacementMapTransform), p.displacementScale.value = m.displacementScale, p.displacementBias.value = m.displacementBias), m.emissiveMap && (p.emissiveMap.value = m.emissiveMap, t(m.emissiveMap, p.emissiveMapTransform)), m.specularMap && (p.specularMap.value = m.specularMap, t(m.specularMap, p.specularMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest); const b = e.get(m), y = b.envMap, A = b.envMapRotation; if (y && (p.envMap.value = y, ki.copy(A), ki.x *= -1, ki.y *= -1, ki.z *= -1, y.isCubeTexture && y.isRenderTargetTexture === !1 && (ki.y *= -1, ki.z *= -1), p.envMapRotation.value.setFromMatrix4(RS.makeRotationFromEuler(ki)), p.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = m.reflectivity, p.ior.value = m.ior, p.refractionRatio.value = m.refractionRatio), m.lightMap) { p.lightMap.value = m.lightMap; const O = i._useLegacyLights === !0 ? Math.PI : 1; p.lightMapIntensity.value = m.lightMapIntensity * O, t(m.lightMap, p.lightMapTransform) } m.aoMap && (p.aoMap.value = m.aoMap, p.aoMapIntensity.value = m.aoMapIntensity, t(m.aoMap, p.aoMapTransform)) } function o(p, m) { p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, m.map && (p.map.value = m.map, t(m.map, p.mapTransform)) } function a(p, m) { p.dashSize.value = m.dashSize, p.totalSize.value = m.dashSize + m.gapSize, p.scale.value = m.scale } function l(p, m, b, y) { p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, p.size.value = m.size * b, p.scale.value = y * .5, m.map && (p.map.value = m.map, t(m.map, p.uvTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, t(m.alphaMap, p.alphaMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest) } function c(p, m) { p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, p.rotation.value = m.rotation, m.map && (p.map.value = m.map, t(m.map, p.mapTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, t(m.alphaMap, p.alphaMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest) } function u(p, m) { p.specular.value.copy(m.specular), p.shininess.value = Math.max(m.shininess, 1e-4) } function h(p, m) { m.gradientMap && (p.gradientMap.value = m.gradientMap) } function f(p, m) { p.metalness.value = m.metalness, m.metalnessMap && (p.metalnessMap.value = m.metalnessMap, t(m.metalnessMap, p.metalnessMapTransform)), p.roughness.value = m.roughness, m.roughnessMap && (p.roughnessMap.value = m.roughnessMap, t(m.roughnessMap, p.roughnessMapTransform)), m.envMap && (p.envMapIntensity.value = m.envMapIntensity) } function d(p, m, b) { p.ior.value = m.ior, m.sheen > 0 && (p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen), p.sheenRoughness.value = m.sheenRoughness, m.sheenColorMap && (p.sheenColorMap.value = m.sheenColorMap, t(m.sheenColorMap, p.sheenColorMapTransform)), m.sheenRoughnessMap && (p.sheenRoughnessMap.value = m.sheenRoughnessMap, t(m.sheenRoughnessMap, p.sheenRoughnessMapTransform))), m.clearcoat > 0 && (p.clearcoat.value = m.clearcoat, p.clearcoatRoughness.value = m.clearcoatRoughness, m.clearcoatMap && (p.clearcoatMap.value = m.clearcoatMap, t(m.clearcoatMap, p.clearcoatMapTransform)), m.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = m.clearcoatRoughnessMap, t(m.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), m.clearcoatNormalMap && (p.clearcoatNormalMap.value = m.clearcoatNormalMap, t(m.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale), m.side === Xt && p.clearcoatNormalScale.value.negate())), m.iridescence > 0 && (p.iridescence.value = m.iridescence, p.iridescenceIOR.value = m.iridescenceIOR, p.iridescenceThicknessMinimum.value = m.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = m.iridescenceThicknessRange[1], m.iridescenceMap && (p.iridescenceMap.value = m.iridescenceMap, t(m.iridescenceMap, p.iridescenceMapTransform)), m.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = m.iridescenceThicknessMap, t(m.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), m.transmission > 0 && (p.transmission.value = m.transmission, p.transmissionSamplerMap.value = b.texture, p.transmissionSamplerSize.value.set(b.width, b.height), m.transmissionMap && (p.transmissionMap.value = m.transmissionMap, t(m.transmissionMap, p.transmissionMapTransform)), p.thickness.value = m.thickness, m.thicknessMap && (p.thicknessMap.value = m.thicknessMap, t(m.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = m.attenuationDistance, p.attenuationColor.value.copy(m.attenuationColor)), m.anisotropy > 0 && (p.anisotropyVector.value.set(m.anisotropy * Math.cos(m.anisotropyRotation), m.anisotropy * Math.sin(m.anisotropyRotation)), m.anisotropyMap && (p.anisotropyMap.value = m.anisotropyMap, t(m.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = m.specularIntensity, p.specularColor.value.copy(m.specularColor), m.specularColorMap && (p.specularColorMap.value = m.specularColorMap, t(m.specularColorMap, p.specularColorMapTransform)), m.specularIntensityMap && (p.specularIntensityMap.value = m.specularIntensityMap, t(m.specularIntensityMap, p.specularIntensityMapTransform)) } function _(p, m) { m.matcap && (p.matcap.value = m.matcap) } function v(p, m) { const b = e.get(m).light; p.referencePosition.value.setFromMatrixPosition(b.matrixWorld), p.nearDistance.value = b.shadow.camera.near, p.farDistance.value = b.shadow.camera.far } return { refreshFogUniforms: n, refreshMaterialUniforms: s } } function PS(i, e, t, n) { let s = {}, r = {}, o = []; const a = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS); function l(b, y) { const A = y.program; n.uniformBlockBinding(b, A) } function c(b, y) { let A = s[b.id]; A === void 0 && (_(b), A = u(b), s[b.id] = A, b.addEventListener("dispose", p)); const O = y.program; n.updateUBOMapping(b, O); const P = e.render.frame; r[b.id] !== P && (f(b), r[b.id] = P) } function u(b) { const y = h(); b.__bindingPointIndex = y; const A = i.createBuffer(), O = b.__size, P = b.usage; return i.bindBuffer(i.UNIFORM_BUFFER, A), i.bufferData(i.UNIFORM_BUFFER, O, P), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, y, A), A } function h() { for (let b = 0; b < a; b++)if (o.indexOf(b) === -1) return o.push(b), b; return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0 } function f(b) { const y = s[b.id], A = b.uniforms, O = b.__cache; i.bindBuffer(i.UNIFORM_BUFFER, y); for (let P = 0, R = A.length; P < R; P++) { const L = Array.isArray(A[P]) ? A[P] : [A[P]]; for (let S = 0, M = L.length; S < M; S++) { const D = L[S]; if (d(D, P, S, O) === !0) { const I = D.__offset, C = Array.isArray(D.value) ? D.value : [D.value]; let z = 0; for (let Y = 0; Y < C.length; Y++) { const X = C[Y], ee = v(X); typeof X == "number" || typeof X == "boolean" ? (D.__data[0] = X, i.bufferSubData(i.UNIFORM_BUFFER, I + z, D.__data)) : X.isMatrix3 ? (D.__data[0] = X.elements[0], D.__data[1] = X.elements[1], D.__data[2] = X.elements[2], D.__data[3] = 0, D.__data[4] = X.elements[3], D.__data[5] = X.elements[4], D.__data[6] = X.elements[5], D.__data[7] = 0, D.__data[8] = X.elements[6], D.__data[9] = X.elements[7], D.__data[10] = X.elements[8], D.__data[11] = 0) : (X.toArray(D.__data, z), z += ee.storage / Float32Array.BYTES_PER_ELEMENT) } i.bufferSubData(i.UNIFORM_BUFFER, I, D.__data) } } } i.bindBuffer(i.UNIFORM_BUFFER, null) } function d(b, y, A, O) { const P = b.value, R = y + "_" + A; if (O[R] === void 0) return typeof P == "number" || typeof P == "boolean" ? O[R] = P : O[R] = P.clone(), !0; { const L = O[R]; if (typeof P == "number" || typeof P == "boolean") { if (L !== P) return O[R] = P, !0 } else if (L.equals(P) === !1) return L.copy(P), !0 } return !1 } function _(b) { const y = b.uniforms; let A = 0; const O = 16; for (let R = 0, L = y.length; R < L; R++) { const S = Array.isArray(y[R]) ? y[R] : [y[R]]; for (let M = 0, D = S.length; M < D; M++) { const I = S[M], C = Array.isArray(I.value) ? I.value : [I.value]; for (let z = 0, Y = C.length; z < Y; z++) { const X = C[z], ee = v(X), G = A % O; G !== 0 && O - G < ee.boundary && (A += O - G), I.__data = new Float32Array(ee.storage / Float32Array.BYTES_PER_ELEMENT), I.__offset = A, A += ee.storage } } } const P = A % O; return P > 0 && (A += O - P), b.__size = A, b.__cache = {}, this } function v(b) { const y = { boundary: 0, storage: 0 }; return typeof b == "number" || typeof b == "boolean" ? (y.boundary = 4, y.storage = 4) : b.isVector2 ? (y.boundary = 8, y.storage = 8) : b.isVector3 || b.isColor ? (y.boundary = 16, y.storage = 12) : b.isVector4 ? (y.boundary = 16, y.storage = 16) : b.isMatrix3 ? (y.boundary = 48, y.storage = 48) : b.isMatrix4 ? (y.boundary = 64, y.storage = 64) : b.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", b), y } function p(b) { const y = b.target; y.removeEventListener("dispose", p); const A = o.indexOf(y.__bindingPointIndex); o.splice(A, 1), i.deleteBuffer(s[y.id]), delete s[y.id], delete r[y.id] } function m() { for (const b in s) i.deleteBuffer(s[b]); o = [], s = {}, r = {} } return { bind: l, update: c, dispose: m } } class LS { constructor(e = {}) { const { canvas: t = y0(), context: n = null, depth: s = !0, stencil: r = !1, alpha: o = !1, antialias: a = !1, premultipliedAlpha: l = !0, preserveDrawingBuffer: c = !1, powerPreference: u = "default", failIfMajorPerformanceCaveat: h = !1 } = e; this.isWebGLRenderer = !0; let f; if (n !== null) { if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163."); f = n.getContextAttributes().alpha } else f = o; const d = new Uint32Array(4), _ = new Int32Array(4); let v = null, p = null; const m = [], b = []; this.domElement = t, this.debug = { checkShaderErrors: !0, onShaderError: null }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = Tt, this._useLegacyLights = !1, this.toneMapping = Si, this.toneMappingExposure = 1; const y = this; let A = !1, O = 0, P = 0, R = null, L = -1, S = null; const M = new it, D = new it; let I = null; const C = new Re(0); let z = 0, Y = t.width, X = t.height, ee = 1, G = null, ne = null; const oe = new it(0, 0, Y, X), pe = new it(0, 0, Y, X); let ye = !1; const Pe = new Cc; let te = !1, ue = !1; const ge = new Oe, fe = new Ee, Te = new B, Ae = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 }; function we() { return R === null ? ee : 1 } let j = n; function De(T, W) { const Z = t.getContext(T, W); return Z !== null ? Z : null } try { const T = { alpha: !0, depth: s, stencil: r, antialias: a, premultipliedAlpha: l, preserveDrawingBuffer: c, powerPreference: u, failIfMajorPerformanceCaveat: h }; if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${Sc}`), t.addEventListener("webglcontextlost", q, !1), t.addEventListener("webglcontextrestored", ie, !1), t.addEventListener("webglcontextcreationerror", he, !1), j === null) { const W = "webgl2"; if (j = De(W, T), j === null) throw De(W) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.") } } catch (T) { throw console.error("THREE.WebGLRenderer: " + T.message), T } let w, U, V, J, E, x, N, F, H, k, se, K, ae, ce, re, le, _e, de, me, Ne, ze, Xe, je, Le; function ve() { w = new kM(j), w.init(), U = new DM(j, w, e), Xe = new yS(j, w), V = new vS(j), J = new VM(j), E = new rS, x = new MS(j, w, V, E, U, Xe, J), N = new UM(y), F = new BM(y), H = new q0(j), je = new LM(j, H), k = new HM(j, H, J, je), se = new WM(j, k, H, J), me = new GM(j, U, x), le = new NM(E), K = new sS(y, N, F, w, U, je, le), ae = new CS(y, E), ce = new aS, re = new dS(w), de = new PM(y, N, F, V, se, f, l), _e = new xS(y, se, U), Le = new PS(j, J, U, V), Ne = new IM(j, w, J), ze = new zM(j, w, J), J.programs = K.programs, y.capabilities = U, y.extensions = w, y.properties = E, y.renderLists = ce, y.shadowMap = _e, y.state = V, y.info = J } ve(); const g = new wS(y, j); this.xr = g, this.getContext = function () { return j }, this.getContextAttributes = function () { return j.getContextAttributes() }, this.forceContextLoss = function () { const T = w.get("WEBGL_lose_context"); T && T.loseContext() }, this.forceContextRestore = function () { const T = w.get("WEBGL_lose_context"); T && T.restoreContext() }, this.getPixelRatio = function () { return ee }, this.setPixelRatio = function (T) { T !== void 0 && (ee = T, this.setSize(Y, X, !1)) }, this.getSize = function (T) { return T.set(Y, X) }, this.setSize = function (T, W, Z = !0) { if (g.isPresenting) { console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."); return } Y = T, X = W, t.width = Math.floor(T * ee), t.height = Math.floor(W * ee), Z === !0 && (t.style.width = T + "px", t.style.height = W + "px"), this.setViewport(0, 0, T, W) }, this.getDrawingBufferSize = function (T) { return T.set(Y * ee, X * ee).floor() }, this.setDrawingBufferSize = function (T, W, Z) { Y = T, X = W, ee = Z, t.width = Math.floor(T * Z), t.height = Math.floor(W * Z), this.setViewport(0, 0, T, W) }, this.getCurrentViewport = function (T) { return T.copy(M) }, this.getViewport = function (T) { return T.copy(oe) }, this.setViewport = function (T, W, Z, Q) { T.isVector4 ? oe.set(T.x, T.y, T.z, T.w) : oe.set(T, W, Z, Q), V.viewport(M.copy(oe).multiplyScalar(ee).round()) }, this.getScissor = function (T) { return T.copy(pe) }, this.setScissor = function (T, W, Z, Q) { T.isVector4 ? pe.set(T.x, T.y, T.z, T.w) : pe.set(T, W, Z, Q), V.scissor(D.copy(pe).multiplyScalar(ee).round()) }, this.getScissorTest = function () { return ye }, this.setScissorTest = function (T) { V.setScissorTest(ye = T) }, this.setOpaqueSort = function (T) { G = T }, this.setTransparentSort = function (T) { ne = T }, this.getClearColor = function (T) { return T.copy(de.getClearColor()) }, this.setClearColor = function () { de.setClearColor.apply(de, arguments) }, this.getClearAlpha = function () { return de.getClearAlpha() }, this.setClearAlpha = function () { de.setClearAlpha.apply(de, arguments) }, this.clear = function (T = !0, W = !0, Z = !0) { let Q = 0; if (T) { let $ = !1; if (R !== null) { const Me = R.texture.format; $ = Me === Gd || Me === Vd || Me === zd } if ($) { const Me = R.texture.type, be = Me === Ei || Me === Hs || Me === Fd || Me === Ks || Me === kd || Me === Hd, Ce = de.getClearColor(), Ue = de.getClearAlpha(), Be = Ce.r, Fe = Ce.g, ke = Ce.b; be ? (d[0] = Be, d[1] = Fe, d[2] = ke, d[3] = Ue, j.clearBufferuiv(j.COLOR, 0, d)) : (_[0] = Be, _[1] = Fe, _[2] = ke, _[3] = Ue, j.clearBufferiv(j.COLOR, 0, _)) } else Q |= j.COLOR_BUFFER_BIT } W && (Q |= j.DEPTH_BUFFER_BIT), Z && (Q |= j.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), j.clear(Q) }, this.clearColor = function () { this.clear(!0, !1, !1) }, this.clearDepth = function () { this.clear(!1, !0, !1) }, this.clearStencil = function () { this.clear(!1, !1, !0) }, this.dispose = function () { t.removeEventListener("webglcontextlost", q, !1), t.removeEventListener("webglcontextrestored", ie, !1), t.removeEventListener("webglcontextcreationerror", he, !1), ce.dispose(), re.dispose(), E.dispose(), N.dispose(), F.dispose(), se.dispose(), je.dispose(), Le.dispose(), K.dispose(), g.dispose(), g.removeEventListener("sessionstart", dt), g.removeEventListener("sessionend", pt), qt.stop() }; function q(T) { T.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), A = !0 } function ie() { console.log("THREE.WebGLRenderer: Context Restored."), A = !1; const T = J.autoReset, W = _e.enabled, Z = _e.autoUpdate, Q = _e.needsUpdate, $ = _e.type; ve(), J.autoReset = T, _e.enabled = W, _e.autoUpdate = Z, _e.needsUpdate = Q, _e.type = $ } function he(T) { console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", T.statusMessage) } function Se(T) { const W = T.target; W.removeEventListener("dispose", Se), Ke(W) } function Ke(T) { Ye(T), E.remove(T) } function Ye(T) { const W = E.get(T).programs; W !== void 0 && (W.forEach(function (Z) { K.releaseProgram(Z) }), T.isShaderMaterial && K.releaseShaderCache(T)) } this.renderBufferDirect = function (T, W, Z, Q, $, Me) { W === null && (W = Ae); const be = $.isMesh && $.matrixWorld.determinant() < 0, Ce = Tp(T, W, Z, Q, $); V.setMaterial(Q, be); let Ue = Z.index, Be = 1; if (Q.wireframe === !0) { if (Ue = k.getWireframeAttribute(Z), Ue === void 0) return; Be = 2 } const Fe = Z.drawRange, ke = Z.attributes.position; let ft = Fe.start * Be, Kt = (Fe.start + Fe.count) * Be; Me !== null && (ft = Math.max(ft, Me.start * Be), Kt = Math.min(Kt, (Me.start + Me.count) * Be)), Ue !== null ? (ft = Math.max(ft, 0), Kt = Math.min(Kt, Ue.count)) : ke != null && (ft = Math.max(ft, 0), Kt = Math.min(Kt, ke.count)); const St = Kt - ft; if (St < 0 || St === 1 / 0) return; je.setup($, Q, Ce, Z, Ue); let Nn, ht = Ne; if (Ue !== null && (Nn = H.get(Ue), ht = ze, ht.setIndex(Nn)), $.isMesh) Q.wireframe === !0 ? (V.setLineWidth(Q.wireframeLinewidth * we()), ht.setMode(j.LINES)) : ht.setMode(j.TRIANGLES); else if ($.isLine) { let Ve = Q.linewidth; Ve === void 0 && (Ve = 1), V.setLineWidth(Ve * we()), $.isLineSegments ? ht.setMode(j.LINES) : $.isLineLoop ? ht.setMode(j.LINE_LOOP) : ht.setMode(j.LINE_STRIP) } else $.isPoints ? ht.setMode(j.POINTS) : $.isSprite && ht.setMode(j.TRIANGLES); if ($.isBatchedMesh) ht.renderMultiDraw($._multiDrawStarts, $._multiDrawCounts, $._multiDrawCount); else if ($.isInstancedMesh) ht.renderInstances(ft, St, $.count); else if (Z.isInstancedBufferGeometry) { const Ve = Z._maxInstanceCount !== void 0 ? Z._maxInstanceCount : 1 / 0, ya = Math.min(Z.instanceCount, Ve); ht.renderInstances(ft, St, ya) } else ht.render(ft, St) }; function at(T, W, Z) { T.transparent === !0 && T.side === bn && T.forceSinglePass === !1 ? (T.side = Xt, T.needsUpdate = !0, Vr(T, W, Z), T.side = Yn, T.needsUpdate = !0, Vr(T, W, Z), T.side = bn) : Vr(T, W, Z) } this.compile = function (T, W, Z = null) { Z === null && (Z = T), p = re.get(Z), p.init(), b.push(p), Z.traverseVisible(function ($) { $.isLight && $.layers.test(W.layers) && (p.pushLight($), $.castShadow && p.pushShadow($)) }), T !== Z && T.traverseVisible(function ($) { $.isLight && $.layers.test(W.layers) && (p.pushLight($), $.castShadow && p.pushShadow($)) }), p.setupLights(y._useLegacyLights); const Q = new Set; return T.traverse(function ($) { const Me = $.material; if (Me) if (Array.isArray(Me)) for (let be = 0; be < Me.length; be++) { const Ce = Me[be]; at(Ce, Z, $), Q.add(Ce) } else at(Me, Z, $), Q.add(Me) }), b.pop(), p = null, Q }, this.compileAsync = function (T, W, Z = null) { const Q = this.compile(T, W, Z); return new Promise($ => { function Me() { if (Q.forEach(function (be) { E.get(be).currentProgram.isReady() && Q.delete(be) }), Q.size === 0) { $(T); return } setTimeout(Me, 10) } w.get("KHR_parallel_shader_compile") !== null ? Me() : setTimeout(Me, 10) }) }; let yt = null; function tt(T) { yt && yt(T) } function dt() { qt.stop() } function pt() { qt.start() } const qt = new ip; qt.setAnimationLoop(tt), typeof self < "u" && qt.setContext(self), this.setAnimationLoop = function (T) { yt = T, g.setAnimationLoop(T), T === null ? qt.stop() : qt.start() }, g.addEventListener("sessionstart", dt), g.addEventListener("sessionend", pt), this.render = function (T, W) { if (W !== void 0 && W.isCamera !== !0) { console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."); return } if (A === !0) return; T.matrixWorldAutoUpdate === !0 && T.updateMatrixWorld(), W.parent === null && W.matrixWorldAutoUpdate === !0 && W.updateMatrixWorld(), g.enabled === !0 && g.isPresenting === !0 && (g.cameraAutoUpdate === !0 && g.updateCamera(W), W = g.getCamera()), T.isScene === !0 && T.onBeforeRender(y, T, W, R), p = re.get(T, b.length), p.init(), b.push(p), ge.multiplyMatrices(W.projectionMatrix, W.matrixWorldInverse), Pe.setFromProjectionMatrix(ge), ue = this.localClippingEnabled, te = le.init(this.clippingPlanes, ue), v = ce.get(T, m.length), v.init(), m.push(v), Qt(T, W, 0, y.sortObjects), v.finish(), y.sortObjects === !0 && v.sort(G, ne), this.info.render.frame++, te === !0 && le.beginShadows(); const Z = p.state.shadowsArray; if (_e.render(Z, T, W), te === !0 && le.endShadows(), this.info.autoReset === !0 && this.info.reset(), (g.enabled === !1 || g.isPresenting === !1 || g.hasDepthSensing() === !1) && de.render(v, T), p.setupLights(y._useLegacyLights), W.isArrayCamera) { const Q = W.cameras; for (let $ = 0, Me = Q.length; $ < Me; $++) { const be = Q[$]; Zn(v, T, be, be.viewport) } } else Zn(v, T, W); R !== null && (x.updateMultisampleRenderTarget(R), x.updateRenderTargetMipmap(R)), T.isScene === !0 && T.onAfterRender(y, T, W), je.resetDefaultState(), L = -1, S = null, b.pop(), b.length > 0 ? p = b[b.length - 1] : p = null, m.pop(), m.length > 0 ? v = m[m.length - 1] : v = null }; function Qt(T, W, Z, Q) { if (T.visible === !1) return; if (T.layers.test(W.layers)) { if (T.isGroup) Z = T.renderOrder; else if (T.isLOD) T.autoUpdate === !0 && T.update(W); else if (T.isLight) p.pushLight(T), T.castShadow && p.pushShadow(T); else if (T.isSprite) { if (!T.frustumCulled || Pe.intersectsSprite(T)) { Q && Te.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ge); const be = se.update(T), Ce = T.material; Ce.visible && v.push(T, be, Ce, Z, Te.z, null) } } else if ((T.isMesh || T.isLine || T.isPoints) && (!T.frustumCulled || Pe.intersectsObject(T))) { const be = se.update(T), Ce = T.material; if (Q && (T.boundingSphere !== void 0 ? (T.boundingSphere === null && T.computeBoundingSphere(), Te.copy(T.boundingSphere.center)) : (be.boundingSphere === null && be.computeBoundingSphere(), Te.copy(be.boundingSphere.center)), Te.applyMatrix4(T.matrixWorld).applyMatrix4(ge)), Array.isArray(Ce)) { const Ue = be.groups; for (let Be = 0, Fe = Ue.length; Be < Fe; Be++) { const ke = Ue[Be], ft = Ce[ke.materialIndex]; ft && ft.visible && v.push(T, be, ft, Z, Te.z, ke) } } else Ce.visible && v.push(T, be, Ce, Z, Te.z, null) } } const Me = T.children; for (let be = 0, Ce = Me.length; be < Ce; be++)Qt(Me[be], W, Z, Q) } function Zn(T, W, Z, Q) { const $ = T.opaque, Me = T.transmissive, be = T.transparent; p.setupLightsView(Z), te === !0 && le.setGlobalState(y.clippingPlanes, Z), Me.length > 0 && ts($, Me, W, Z), Q && V.viewport(M.copy(Q)), $.length > 0 && Ri($, W, Z), Me.length > 0 && Ri(Me, W, Z), be.length > 0 && Ri(be, W, Z), V.buffers.depth.setTest(!0), V.buffers.depth.setMask(!0), V.buffers.color.setMask(!0), V.setPolygonOffset(!1) } function ts(T, W, Z, Q) { if ((Z.isScene === !0 ? Z.overrideMaterial : null) !== null) return; if (p.state.transmissionRenderTarget === null) { p.state.transmissionRenderTarget = new Cn(1, 1, { generateMipmaps: !0, type: w.has("EXT_color_buffer_half_float") || w.has("EXT_color_buffer_float") ? gn : Ei, minFilter: wn, samples: 4, stencilBuffer: r }); const Be = E.get(p.state.transmissionRenderTarget); Be.__isTransmissionRenderTarget = !0 } const Me = p.state.transmissionRenderTarget; y.getDrawingBufferSize(fe), Me.setSize(fe.x, fe.y); const be = y.getRenderTarget(); y.setRenderTarget(Me), y.getClearColor(C), z = y.getClearAlpha(), z < 1 && y.setClearColor(16777215, .5), y.clear(); const Ce = y.toneMapping; y.toneMapping = Si, Ri(T, Z, Q), x.updateMultisampleRenderTarget(Me), x.updateRenderTargetMipmap(Me); let Ue = !1; for (let Be = 0, Fe = W.length; Be < Fe; Be++) { const ke = W[Be], ft = ke.object, Kt = ke.geometry, St = ke.material, Nn = ke.group; if (St.side === bn && ft.layers.test(Q.layers)) { const ht = St.side; St.side = Xt, St.needsUpdate = !0, zc(ft, Z, Q, Kt, St, Nn), St.side = ht, St.needsUpdate = !0, Ue = !0 } } Ue === !0 && (x.updateMultisampleRenderTarget(Me), x.updateRenderTargetMipmap(Me)), y.setRenderTarget(be), y.setClearColor(C, z), y.toneMapping = Ce } function Ri(T, W, Z) { const Q = W.isScene === !0 ? W.overrideMaterial : null; for (let $ = 0, Me = T.length; $ < Me; $++) { const be = T[$], Ce = be.object, Ue = be.geometry, Be = Q === null ? be.material : Q, Fe = be.group; Ce.layers.test(Z.layers) && zc(Ce, W, Z, Ue, Be, Fe) } } function zc(T, W, Z, Q, $, Me) { T.onBeforeRender(y, W, Z, Q, $, Me), T.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse, T.matrixWorld), T.normalMatrix.getNormalMatrix(T.modelViewMatrix), $.onBeforeRender(y, W, Z, Q, T, Me), $.transparent === !0 && $.side === bn && $.forceSinglePass === !1 ? ($.side = Xt, $.needsUpdate = !0, y.renderBufferDirect(Z, W, Q, $, T, Me), $.side = Yn, $.needsUpdate = !0, y.renderBufferDirect(Z, W, Q, $, T, Me), $.side = bn) : y.renderBufferDirect(Z, W, Q, $, T, Me), T.onAfterRender(y, W, Z, Q, $, Me) } function Vr(T, W, Z) { W.isScene !== !0 && (W = Ae); const Q = E.get(T), $ = p.state.lights, Me = p.state.shadowsArray, be = $.state.version, Ce = K.getParameters(T, $.state, Me, W, Z), Ue = K.getProgramCacheKey(Ce); let Be = Q.programs; Q.environment = T.isMeshStandardMaterial ? W.environment : null, Q.fog = W.fog, Q.envMap = (T.isMeshStandardMaterial ? F : N).get(T.envMap || Q.environment), Q.envMapRotation = Q.environment !== null && T.envMap === null ? W.environmentRotation : T.envMapRotation, Be === void 0 && (T.addEventListener("dispose", Se), Be = new Map, Q.programs = Be); let Fe = Be.get(Ue); if (Fe !== void 0) { if (Q.currentProgram === Fe && Q.lightsStateVersion === be) return Gc(T, Ce), Fe } else Ce.uniforms = K.getUniforms(T), T.onBuild(Z, Ce, y), T.onBeforeCompile(Ce, y), Fe = K.acquireProgram(Ce, Ue), Be.set(Ue, Fe), Q.uniforms = Ce.uniforms; const ke = Q.uniforms; return (!T.isShaderMaterial && !T.isRawShaderMaterial || T.clipping === !0) && (ke.clippingPlanes = le.uniform), Gc(T, Ce), Q.needsLights = Ap(T), Q.lightsStateVersion = be, Q.needsLights && (ke.ambientLightColor.value = $.state.ambient, ke.lightProbe.value = $.state.probe, ke.directionalLights.value = $.state.directional, ke.directionalLightShadows.value = $.state.directionalShadow, ke.spotLights.value = $.state.spot, ke.spotLightShadows.value = $.state.spotShadow, ke.rectAreaLights.value = $.state.rectArea, ke.ltc_1.value = $.state.rectAreaLTC1, ke.ltc_2.value = $.state.rectAreaLTC2, ke.pointLights.value = $.state.point, ke.pointLightShadows.value = $.state.pointShadow, ke.hemisphereLights.value = $.state.hemi, ke.directionalShadowMap.value = $.state.directionalShadowMap, ke.directionalShadowMatrix.value = $.state.directionalShadowMatrix, ke.spotShadowMap.value = $.state.spotShadowMap, ke.spotLightMatrix.value = $.state.spotLightMatrix, ke.spotLightMap.value = $.state.spotLightMap, ke.pointShadowMap.value = $.state.pointShadowMap, ke.pointShadowMatrix.value = $.state.pointShadowMatrix), Q.currentProgram = Fe, Q.uniformsList = null, Fe } function Vc(T) { if (T.uniformsList === null) { const W = T.currentProgram.getUniforms(); T.uniformsList = Bo.seqWithValue(W.seq, T.uniforms) } return T.uniformsList } function Gc(T, W) { const Z = E.get(T); Z.outputColorSpace = W.outputColorSpace, Z.batching = W.batching, Z.instancing = W.instancing, Z.instancingColor = W.instancingColor, Z.instancingMorph = W.instancingMorph, Z.skinning = W.skinning, Z.morphTargets = W.morphTargets, Z.morphNormals = W.morphNormals, Z.morphColors = W.morphColors, Z.morphTargetsCount = W.morphTargetsCount, Z.numClippingPlanes = W.numClippingPlanes, Z.numIntersection = W.numClipIntersection, Z.vertexAlphas = W.vertexAlphas, Z.vertexTangents = W.vertexTangents, Z.toneMapping = W.toneMapping } function Tp(T, W, Z, Q, $) { W.isScene !== !0 && (W = Ae), x.resetTextureUnits(); const Me = W.fog, be = Q.isMeshStandardMaterial ? W.environment : null, Ce = R === null ? y.outputColorSpace : R.isXRRenderTarget === !0 ? R.texture.colorSpace : xt, Ue = (Q.isMeshStandardMaterial ? F : N).get(Q.envMap || be), Be = Q.vertexColors === !0 && !!Z.attributes.color && Z.attributes.color.itemSize === 4, Fe = !!Z.attributes.tangent && (!!Q.normalMap || Q.anisotropy > 0), ke = !!Z.morphAttributes.position, ft = !!Z.morphAttributes.normal, Kt = !!Z.morphAttributes.color; let St = Si; Q.toneMapped && (R === null || R.isXRRenderTarget === !0) && (St = y.toneMapping); const Nn = Z.morphAttributes.position || Z.morphAttributes.normal || Z.morphAttributes.color, ht = Nn !== void 0 ? Nn.length : 0, Ve = E.get(Q), ya = p.state.lights; if (te === !0 && (ue === !0 || T !== S)) { const en = T === S && Q.id === L; le.setState(Q, T, en) } let lt = !1; Q.version === Ve.__version ? (Ve.needsLights && Ve.lightsStateVersion !== ya.state.version || Ve.outputColorSpace !== Ce || $.isBatchedMesh && Ve.batching === !1 || !$.isBatchedMesh && Ve.batching === !0 || $.isInstancedMesh && Ve.instancing === !1 || !$.isInstancedMesh && Ve.instancing === !0 || $.isSkinnedMesh && Ve.skinning === !1 || !$.isSkinnedMesh && Ve.skinning === !0 || $.isInstancedMesh && Ve.instancingColor === !0 && $.instanceColor === null || $.isInstancedMesh && Ve.instancingColor === !1 && $.instanceColor !== null || $.isInstancedMesh && Ve.instancingMorph === !0 && $.morphTexture === null || $.isInstancedMesh && Ve.instancingMorph === !1 && $.morphTexture !== null || Ve.envMap !== Ue || Q.fog === !0 && Ve.fog !== Me || Ve.numClippingPlanes !== void 0 && (Ve.numClippingPlanes !== le.numPlanes || Ve.numIntersection !== le.numIntersection) || Ve.vertexAlphas !== Be || Ve.vertexTangents !== Fe || Ve.morphTargets !== ke || Ve.morphNormals !== ft || Ve.morphColors !== Kt || Ve.toneMapping !== St || Ve.morphTargetsCount !== ht) && (lt = !0) : (lt = !0, Ve.__version = Q.version); let Ci = Ve.currentProgram; lt === !0 && (Ci = Vr(Q, W, $)); let Wc = !1, er = !1, Sa = !1; const Pt = Ci.getUniforms(), Jn = Ve.uniforms; if (V.useProgram(Ci.program) && (Wc = !0, er = !0, Sa = !0), Q.id !== L && (L = Q.id, er = !0), Wc || S !== T) { Pt.setValue(j, "projectionMatrix", T.projectionMatrix), Pt.setValue(j, "viewMatrix", T.matrixWorldInverse); const en = Pt.map.cameraPosition; en !== void 0 && en.setValue(j, Te.setFromMatrixPosition(T.matrixWorld)), U.logarithmicDepthBuffer && Pt.setValue(j, "logDepthBufFC", 2 / (Math.log(T.far + 1) / Math.LN2)), (Q.isMeshPhongMaterial || Q.isMeshToonMaterial || Q.isMeshLambertMaterial || Q.isMeshBasicMaterial || Q.isMeshStandardMaterial || Q.isShaderMaterial) && Pt.setValue(j, "isOrthographic", T.isOrthographicCamera === !0), S !== T && (S = T, er = !0, Sa = !0) } if ($.isSkinnedMesh) { Pt.setOptional(j, $, "bindMatrix"), Pt.setOptional(j, $, "bindMatrixInverse"); const en = $.skeleton; en && (en.boneTexture === null && en.computeBoneTexture(), Pt.setValue(j, "boneTexture", en.boneTexture, x)) } $.isBatchedMesh && (Pt.setOptional(j, $, "batchingTexture"), Pt.setValue(j, "batchingTexture", $._matricesTexture, x)); const Ea = Z.morphAttributes; if ((Ea.position !== void 0 || Ea.normal !== void 0 || Ea.color !== void 0) && me.update($, Z, Ci), (er || Ve.receiveShadow !== $.receiveShadow) && (Ve.receiveShadow = $.receiveShadow, Pt.setValue(j, "receiveShadow", $.receiveShadow)), Q.isMeshGouraudMaterial && Q.envMap !== null && (Jn.envMap.value = Ue, Jn.flipEnvMap.value = Ue.isCubeTexture && Ue.isRenderTargetTexture === !1 ? -1 : 1), Q.isMeshStandardMaterial && Q.envMap === null && W.environment !== null && (Jn.envMapIntensity.value = W.environmentIntensity), er && (Pt.setValue(j, "toneMappingExposure", y.toneMappingExposure), Ve.needsLights && bp(Jn, Sa), Me && Q.fog === !0 && ae.refreshFogUniforms(Jn, Me), ae.refreshMaterialUniforms(Jn, Q, ee, X, p.state.transmissionRenderTarget), Bo.upload(j, Vc(Ve), Jn, x)), Q.isShaderMaterial && Q.uniformsNeedUpdate === !0 && (Bo.upload(j, Vc(Ve), Jn, x), Q.uniformsNeedUpdate = !1), Q.isSpriteMaterial && Pt.setValue(j, "center", $.center), Pt.setValue(j, "modelViewMatrix", $.modelViewMatrix), Pt.setValue(j, "normalMatrix", $.normalMatrix), Pt.setValue(j, "modelMatrix", $.matrixWorld), Q.isShaderMaterial || Q.isRawShaderMaterial) { const en = Q.uniformsGroups; for (let Ta = 0, wp = en.length; Ta < wp; Ta++) { const Xc = en[Ta]; Le.update(Xc, Ci), Le.bind(Xc, Ci) } } return Ci } function bp(T, W) { T.ambientLightColor.needsUpdate = W, T.lightProbe.needsUpdate = W, T.directionalLights.needsUpdate = W, T.directionalLightShadows.needsUpdate = W, T.pointLights.needsUpdate = W, T.pointLightShadows.needsUpdate = W, T.spotLights.needsUpdate = W, T.spotLightShadows.needsUpdate = W, T.rectAreaLights.needsUpdate = W, T.hemisphereLights.needsUpdate = W } function Ap(T) { return T.isMeshLambertMaterial || T.isMeshToonMaterial || T.isMeshPhongMaterial || T.isMeshStandardMaterial || T.isShadowMaterial || T.isShaderMaterial && T.lights === !0 } this.getActiveCubeFace = function () { return O }, this.getActiveMipmapLevel = function () { return P }, this.getRenderTarget = function () { return R }, this.setRenderTargetTextures = function (T, W, Z) { E.get(T.texture).__webglTexture = W, E.get(T.depthTexture).__webglTexture = Z; const Q = E.get(T); Q.__hasExternalTextures = !0, Q.__autoAllocateDepthBuffer = Z === void 0, Q.__autoAllocateDepthBuffer || w.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), Q.__useRenderToTexture = !1) }, this.setRenderTargetFramebuffer = function (T, W) { const Z = E.get(T); Z.__webglFramebuffer = W, Z.__useDefaultFramebuffer = W === void 0 }, this.setRenderTarget = function (T, W = 0, Z = 0) { R = T, O = W, P = Z; let Q = !0, $ = null, Me = !1, be = !1; if (T) { const Ue = E.get(T); Ue.__useDefaultFramebuffer !== void 0 ? (V.bindFramebuffer(j.FRAMEBUFFER, null), Q = !1) : Ue.__webglFramebuffer === void 0 ? x.setupRenderTarget(T) : Ue.__hasExternalTextures && x.rebindTextures(T, E.get(T.texture).__webglTexture, E.get(T.depthTexture).__webglTexture); const Be = T.texture; (Be.isData3DTexture || Be.isDataArrayTexture || Be.isCompressedArrayTexture) && (be = !0); const Fe = E.get(T).__webglFramebuffer; T.isWebGLCubeRenderTarget ? (Array.isArray(Fe[W]) ? $ = Fe[W][Z] : $ = Fe[W], Me = !0) : T.samples > 0 && x.useMultisampledRTT(T) === !1 ? $ = E.get(T).__webglMultisampledFramebuffer : Array.isArray(Fe) ? $ = Fe[Z] : $ = Fe, M.copy(T.viewport), D.copy(T.scissor), I = T.scissorTest } else M.copy(oe).multiplyScalar(ee).floor(), D.copy(pe).multiplyScalar(ee).floor(), I = ye; if (V.bindFramebuffer(j.FRAMEBUFFER, $) && Q && V.drawBuffers(T, $), V.viewport(M), V.scissor(D), V.setScissorTest(I), Me) { const Ue = E.get(T.texture); j.framebufferTexture2D(j.FRAMEBUFFER, j.COLOR_ATTACHMENT0, j.TEXTURE_CUBE_MAP_POSITIVE_X + W, Ue.__webglTexture, Z) } else if (be) { const Ue = E.get(T.texture), Be = W || 0; j.framebufferTextureLayer(j.FRAMEBUFFER, j.COLOR_ATTACHMENT0, Ue.__webglTexture, Z || 0, Be) } L = -1 }, this.readRenderTargetPixels = function (T, W, Z, Q, $, Me, be) { if (!(T && T.isWebGLRenderTarget)) { console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget."); return } let Ce = E.get(T).__webglFramebuffer; if (T.isWebGLCubeRenderTarget && be !== void 0 && (Ce = Ce[be]), Ce) { V.bindFramebuffer(j.FRAMEBUFFER, Ce); try { const Ue = T.texture, Be = Ue.format, Fe = Ue.type; if (Be !== _n && Xe.convert(Be) !== j.getParameter(j.IMPLEMENTATION_COLOR_READ_FORMAT)) { console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format."); return } const ke = Fe === gn && (w.has("EXT_color_buffer_half_float") || w.has("EXT_color_buffer_float")); if (Fe !== Ei && Xe.convert(Fe) !== j.getParameter(j.IMPLEMENTATION_COLOR_READ_TYPE) && Fe !== Vt && !ke) { console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type."); return } W >= 0 && W <= T.width - Q && Z >= 0 && Z <= T.height - $ && j.readPixels(W, Z, Q, $, Xe.convert(Be), Xe.convert(Fe), Me) } finally { const Ue = R !== null ? E.get(R).__webglFramebuffer : null; V.bindFramebuffer(j.FRAMEBUFFER, Ue) } } }, this.copyFramebufferToTexture = function (T, W, Z = 0) { const Q = Math.pow(2, -Z), $ = Math.floor(W.image.width * Q), Me = Math.floor(W.image.height * Q); x.setTexture2D(W, 0), j.copyTexSubImage2D(j.TEXTURE_2D, Z, 0, 0, T.x, T.y, $, Me), V.unbindTexture() }, this.copyTextureToTexture = function (T, W, Z, Q = 0) { const $ = W.image.width, Me = W.image.height, be = Xe.convert(Z.format), Ce = Xe.convert(Z.type); x.setTexture2D(Z, 0), j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL, Z.flipY), j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL, Z.premultiplyAlpha), j.pixelStorei(j.UNPACK_ALIGNMENT, Z.unpackAlignment), W.isDataTexture ? j.texSubImage2D(j.TEXTURE_2D, Q, T.x, T.y, $, Me, be, Ce, W.image.data) : W.isCompressedTexture ? j.compressedTexSubImage2D(j.TEXTURE_2D, Q, T.x, T.y, W.mipmaps[0].width, W.mipmaps[0].height, be, W.mipmaps[0].data) : j.texSubImage2D(j.TEXTURE_2D, Q, T.x, T.y, be, Ce, W.image), Q === 0 && Z.generateMipmaps && j.generateMipmap(j.TEXTURE_2D), V.unbindTexture() }, this.copyTextureToTexture3D = function (T, W, Z, Q, $ = 0) { const Me = Math.round(T.max.x - T.min.x), be = Math.round(T.max.y - T.min.y), Ce = T.max.z - T.min.z + 1, Ue = Xe.convert(Q.format), Be = Xe.convert(Q.type); let Fe; if (Q.isData3DTexture) x.setTexture3D(Q, 0), Fe = j.TEXTURE_3D; else if (Q.isDataArrayTexture || Q.isCompressedArrayTexture) x.setTexture2DArray(Q, 0), Fe = j.TEXTURE_2D_ARRAY; else { console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray."); return } j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL, Q.flipY), j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL, Q.premultiplyAlpha), j.pixelStorei(j.UNPACK_ALIGNMENT, Q.unpackAlignment); const ke = j.getParameter(j.UNPACK_ROW_LENGTH), ft = j.getParameter(j.UNPACK_IMAGE_HEIGHT), Kt = j.getParameter(j.UNPACK_SKIP_PIXELS), St = j.getParameter(j.UNPACK_SKIP_ROWS), Nn = j.getParameter(j.UNPACK_SKIP_IMAGES), ht = Z.isCompressedTexture ? Z.mipmaps[$] : Z.image; j.pixelStorei(j.UNPACK_ROW_LENGTH, ht.width), j.pixelStorei(j.UNPACK_IMAGE_HEIGHT, ht.height), j.pixelStorei(j.UNPACK_SKIP_PIXELS, T.min.x), j.pixelStorei(j.UNPACK_SKIP_ROWS, T.min.y), j.pixelStorei(j.UNPACK_SKIP_IMAGES, T.min.z), Z.isDataTexture || Z.isData3DTexture ? j.texSubImage3D(Fe, $, W.x, W.y, W.z, Me, be, Ce, Ue, Be, ht.data) : Q.isCompressedArrayTexture ? j.compressedTexSubImage3D(Fe, $, W.x, W.y, W.z, Me, be, Ce, Ue, ht.data) : j.texSubImage3D(Fe, $, W.x, W.y, W.z, Me, be, Ce, Ue, Be, ht), j.pixelStorei(j.UNPACK_ROW_LENGTH, ke), j.pixelStorei(j.UNPACK_IMAGE_HEIGHT, ft), j.pixelStorei(j.UNPACK_SKIP_PIXELS, Kt), j.pixelStorei(j.UNPACK_SKIP_ROWS, St), j.pixelStorei(j.UNPACK_SKIP_IMAGES, Nn), $ === 0 && Q.generateMipmaps && j.generateMipmap(Fe), V.unbindTexture() }, this.initTexture = function (T) { T.isCubeTexture ? x.setTextureCube(T, 0) : T.isData3DTexture ? x.setTexture3D(T, 0) : T.isDataArrayTexture || T.isCompressedArrayTexture ? x.setTexture2DArray(T, 0) : x.setTexture2D(T, 0), V.unbindTexture() }, this.resetState = function () { O = 0, P = 0, R = null, V.reset(), je.reset() }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })) } get coordinateSystem() { return Xn } get outputColorSpace() { return this._outputColorSpace } set outputColorSpace(e) { this._outputColorSpace = e; const t = this.getContext(); t.drawingBufferColorSpace = e === bc ? "display-p3" : "srgb", t.unpackColorSpace = Je.workingColorSpace === pa ? "display-p3" : "srgb" } get useLegacyLights() { return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights } set useLegacyLights(e) { console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights = e } } class Ic { constructor(e, t = 1, n = 1e3) { this.isFog = !0, this.name = "", this.color = new Re(e), this.near = t, this.far = n } clone() { return new Ic(this.color, this.near, this.far) } toJSON() { return { type: "Fog", name: this.name, color: this.color.getHex(), near: this.near, far: this.far } } } class IS extends ot { constructor() { super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Ln, this.environmentIntensity = 1, this.environmentRotation = new Ln, this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this })) } copy(e, t) { return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this } toJSON(e) { const t = super.toJSON(e); return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t } } class cp { constructor(e, t) { this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e !== void 0 ? e.length / t : 0, this.usage = Xl, this._updateRange = { offset: 0, count: -1 }, this.updateRanges = [], this.version = 0, this.uuid = vn() } onUploadCallback() { } set needsUpdate(e) { e === !0 && this.version++ } get updateRange() { return qd("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."), this._updateRange } setUsage(e) { return this.usage = e, this } addUpdateRange(e, t) { this.updateRanges.push({ start: e, count: t }) } clearUpdateRanges() { this.updateRanges.length = 0 } copy(e) { return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this } copyAt(e, t, n) { e *= this.stride, n *= t.stride; for (let s = 0, r = this.stride; s < r; s++)this.array[e + s] = t.array[n + s]; return this } set(e, t = 0) { return this.array.set(e, t), this } clone(e) { e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = vn()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer); const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(t, this.stride); return n.setUsage(this.usage), n } onUpload(e) { return this.onUploadCallback = e, this } toJSON(e) { return e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = vn()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), { uuid: this.uuid, buffer: this.array.buffer._uuid, type: this.array.constructor.name, stride: this.stride } } } const Ot = new B; class Nr { constructor(e, t, n, s = !1) { this.isInterleavedBufferAttribute = !0, this.name = "", this.data = e, this.itemSize = t, this.offset = n, this.normalized = s } get count() { return this.data.count } get array() { return this.data.array } set needsUpdate(e) { this.data.needsUpdate = e } applyMatrix4(e) { for (let t = 0, n = this.data.count; t < n; t++)Ot.fromBufferAttribute(this, t), Ot.applyMatrix4(e), this.setXYZ(t, Ot.x, Ot.y, Ot.z); return this } applyNormalMatrix(e) { for (let t = 0, n = this.count; t < n; t++)Ot.fromBufferAttribute(this, t), Ot.applyNormalMatrix(e), this.setXYZ(t, Ot.x, Ot.y, Ot.z); return this } transformDirection(e) { for (let t = 0, n = this.count; t < n; t++)Ot.fromBufferAttribute(this, t), Ot.transformDirection(e), this.setXYZ(t, Ot.x, Ot.y, Ot.z); return this } getComponent(e, t) { let n = this.array[e * this.data.stride + this.offset + t]; return this.normalized && (n = dn(n, this.array)), n } setComponent(e, t, n) { return this.normalized && (n = Qe(n, this.array)), this.data.array[e * this.data.stride + this.offset + t] = n, this } setX(e, t) { return this.normalized && (t = Qe(t, this.array)), this.data.array[e * this.data.stride + this.offset] = t, this } setY(e, t) { return this.normalized && (t = Qe(t, this.array)), this.data.array[e * this.data.stride + this.offset + 1] = t, this } setZ(e, t) { return this.normalized && (t = Qe(t, this.array)), this.data.array[e * this.data.stride + this.offset + 2] = t, this } setW(e, t) { return this.normalized && (t = Qe(t, this.array)), this.data.array[e * this.data.stride + this.offset + 3] = t, this } getX(e) { let t = this.data.array[e * this.data.stride + this.offset]; return this.normalized && (t = dn(t, this.array)), t } getY(e) { let t = this.data.array[e * this.data.stride + this.offset + 1]; return this.normalized && (t = dn(t, this.array)), t } getZ(e) { let t = this.data.array[e * this.data.stride + this.offset + 2]; return this.normalized && (t = dn(t, this.array)), t } getW(e) { let t = this.data.array[e * this.data.stride + this.offset + 3]; return this.normalized && (t = dn(t, this.array)), t } setXY(e, t, n) { return e = e * this.data.stride + this.offset, this.normalized && (t = Qe(t, this.array), n = Qe(n, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this } setXYZ(e, t, n, s) { return e = e * this.data.stride + this.offset, this.normalized && (t = Qe(t, this.array), n = Qe(n, this.array), s = Qe(s, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = s, this } setXYZW(e, t, n, s, r) { return e = e * this.data.stride + this.offset, this.normalized && (t = Qe(t, this.array), n = Qe(n, this.array), s = Qe(s, this.array), r = Qe(r, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = s, this.data.array[e + 3] = r, this } clone(e) { if (e === void 0) { console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data."); const t = []; for (let n = 0; n < this.count; n++) { const s = n * this.data.stride + this.offset; for (let r = 0; r < this.itemSize; r++)t.push(this.data.array[s + r]) } return new Ct(new this.array.constructor(t), this.itemSize, this.normalized) } else return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)), new Nr(e.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized) } toJSON(e) { if (e === void 0) { console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data."); const t = []; for (let n = 0; n < this.count; n++) { const s = n * this.data.stride + this.offset; for (let r = 0; r < this.itemSize; r++)t.push(this.data.array[s + r]) } return { itemSize: this.itemSize, type: this.array.constructor.name, array: t, normalized: this.normalized } } else return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), { isInterleavedBufferAttribute: !0, itemSize: this.itemSize, data: this.data.uuid, offset: this.offset, normalized: this.normalized } } } class up extends an { constructor(e) { super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new Re(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this } } let ys; const ar = new B, Ss = new B, Es = new B, Ts = new Ee, lr = new Ee, hp = new Oe, vo = new B, cr = new B, Mo = new B, $h = new Ee, dl = new Ee, Zh = new Ee; class DS extends ot { constructor(e = new up) { if (super(), this.isSprite = !0, this.type = "Sprite", ys === void 0) { ys = new Jt; const t = new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1]), n = new cp(t, 5); ys.setIndex([0, 1, 2, 0, 2, 3]), ys.setAttribute("position", new Nr(n, 3, 0, !1)), ys.setAttribute("uv", new Nr(n, 2, 3, !1)) } this.geometry = ys, this.material = e, this.center = new Ee(.5, .5) } raycast(e, t) { e.camera === null && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), Ss.setFromMatrixScale(this.matrixWorld), hp.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), Es.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && Ss.multiplyScalar(-Es.z); const n = this.material.rotation; let s, r; n !== 0 && (r = Math.cos(n), s = Math.sin(n)); const o = this.center; yo(vo.set(-.5, -.5, 0), Es, o, Ss, s, r), yo(cr.set(.5, -.5, 0), Es, o, Ss, s, r), yo(Mo.set(.5, .5, 0), Es, o, Ss, s, r), $h.set(0, 0), dl.set(1, 0), Zh.set(1, 1); let a = e.ray.intersectTriangle(vo, cr, Mo, !1, ar); if (a === null && (yo(cr.set(-.5, .5, 0), Es, o, Ss, s, r), dl.set(0, 1), a = e.ray.intersectTriangle(vo, Mo, cr, !1, ar), a === null)) return; const l = e.ray.origin.distanceTo(ar); l < e.near || l > e.far || t.push({ distance: l, point: ar.clone(), uv: pn.getInterpolation(ar, vo, cr, Mo, $h, dl, Zh, new Ee), face: null, object: this }) } copy(e, t) { return super.copy(e, t), e.center !== void 0 && this.center.copy(e.center), this.material = e.material, this } } function yo(i, e, t, n, s, r) { Ts.subVectors(i, t).addScalar(.5).multiply(n), s !== void 0 ? (lr.x = r * Ts.x - s * Ts.y, lr.y = s * Ts.x + r * Ts.y) : lr.copy(Ts), i.copy(e), i.x += lr.x, i.y += lr.y, i.applyMatrix4(hp) } const Jh = new B, Qh = new it, ef = new it, NS = new B, tf = new Oe, So = new B, pl = new In, nf = new Oe, ml = new $s; class US extends Gt { constructor(e, t) { super(e, t), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = Iu, this.bindMatrix = new Oe, this.bindMatrixInverse = new Oe, this.boundingBox = null, this.boundingSphere = null } computeBoundingBox() { const e = this.geometry; this.boundingBox === null && (this.boundingBox = new Kn), this.boundingBox.makeEmpty(); const t = e.getAttribute("position"); for (let n = 0; n < t.count; n++)this.getVertexPosition(n, So), this.boundingBox.expandByPoint(So) } computeBoundingSphere() { const e = this.geometry; this.boundingSphere === null && (this.boundingSphere = new In), this.boundingSphere.makeEmpty(); const t = e.getAttribute("position"); for (let n = 0; n < t.count; n++)this.getVertexPosition(n, So), this.boundingSphere.expandByPoint(So) } copy(e, t) { return super.copy(e, t), this.bindMode = e.bindMode, this.bindMatrix.copy(e.bindMatrix), this.bindMatrixInverse.copy(e.bindMatrixInverse), this.skeleton = e.skeleton, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this } raycast(e, t) { const n = this.material, s = this.matrixWorld; n !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), pl.copy(this.boundingSphere), pl.applyMatrix4(s), e.ray.intersectsSphere(pl) !== !1 && (nf.copy(s).invert(), ml.copy(e.ray).applyMatrix4(nf), !(this.boundingBox !== null && ml.intersectsBox(this.boundingBox) === !1) && this._computeIntersections(e, t, ml))) } getVertexPosition(e, t) { return super.getVertexPosition(e, t), this.applyBoneTransform(e, t), t } bind(e, t) { this.skeleton = e, t === void 0 && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.copy(t).invert() } pose() { this.skeleton.pose() } normalizeSkinWeights() { const e = new it, t = this.geometry.attributes.skinWeight; for (let n = 0, s = t.count; n < s; n++) { e.fromBufferAttribute(t, n); const r = 1 / e.manhattanLength(); r !== 1 / 0 ? e.multiplyScalar(r) : e.set(1, 0, 0, 0), t.setXYZW(n, e.x, e.y, e.z, e.w) } } updateMatrixWorld(e) { super.updateMatrixWorld(e), this.bindMode === Iu ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === F_ ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode) } applyBoneTransform(e, t) { const n = this.skeleton, s = this.geometry; Qh.fromBufferAttribute(s.attributes.skinIndex, e), ef.fromBufferAttribute(s.attributes.skinWeight, e), Jh.copy(t).applyMatrix4(this.bindMatrix), t.set(0, 0, 0); for (let r = 0; r < 4; r++) { const o = ef.getComponent(r); if (o !== 0) { const a = Qh.getComponent(r); tf.multiplyMatrices(n.bones[a].matrixWorld, n.boneInverses[a]), t.addScaledVector(NS.copy(Jh).applyMatrix4(tf), o) } } return t.applyMatrix4(this.bindMatrixInverse) } } class fp extends ot { constructor() { super(), this.isBone = !0, this.type = "Bone" } } class xa extends wt { constructor(e = null, t = 1, n = 1, s, r, o, a, l, c = Rt, u = Rt, h, f) { super(null, o, a, l, c, u, s, r, h, f), this.isDataTexture = !0, this.image = { data: e, width: t, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1 } } const sf = new Oe, OS = new Oe; class Dc { constructor(e = [], t = []) { this.uuid = vn(), this.bones = e.slice(0), this.boneInverses = t, this.boneMatrices = null, this.boneTexture = null, this.init() } init() { const e = this.bones, t = this.boneInverses; if (this.boneMatrices = new Float32Array(e.length * 16), t.length === 0) this.calculateInverses(); else if (e.length !== t.length) { console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = []; for (let n = 0, s = this.bones.length; n < s; n++)this.boneInverses.push(new Oe) } } calculateInverses() { this.boneInverses.length = 0; for (let e = 0, t = this.bones.length; e < t; e++) { const n = new Oe; this.bones[e] && n.copy(this.bones[e].matrixWorld).invert(), this.boneInverses.push(n) } } pose() { for (let e = 0, t = this.bones.length; e < t; e++) { const n = this.bones[e]; n && n.matrixWorld.copy(this.boneInverses[e]).invert() } for (let e = 0, t = this.bones.length; e < t; e++) { const n = this.bones[e]; n && (n.parent && n.parent.isBone ? (n.matrix.copy(n.parent.matrixWorld).invert(), n.matrix.multiply(n.matrixWorld)) : n.matrix.copy(n.matrixWorld), n.matrix.decompose(n.position, n.quaternion, n.scale)) } } update() { const e = this.bones, t = this.boneInverses, n = this.boneMatrices, s = this.boneTexture; for (let r = 0, o = e.length; r < o; r++) { const a = e[r] ? e[r].matrixWorld : OS; sf.multiplyMatrices(a, t[r]), sf.toArray(n, r * 16) } s !== null && (s.needsUpdate = !0) } clone() { return new Dc(this.bones, this.boneInverses) } computeBoneTexture() { let e = Math.sqrt(this.bones.length * 4); e = Math.ceil(e / 4) * 4, e = Math.max(e, 4); const t = new Float32Array(e * e * 4); t.set(this.boneMatrices); const n = new xa(t, e, e, _n, Vt); return n.needsUpdate = !0, this.boneMatrices = t, this.boneTexture = n, this } getBoneByName(e) { for (let t = 0, n = this.bones.length; t < n; t++) { const s = this.bones[t]; if (s.name === e) return s } } dispose() { this.boneTexture !== null && (this.boneTexture.dispose(), this.boneTexture = null) } fromJSON(e, t) { this.uuid = e.uuid; for (let n = 0, s = e.bones.length; n < s; n++) { const r = e.bones[n]; let o = t[r]; o === void 0 && (console.warn("THREE.Skeleton: No bone found with UUID:", r), o = new fp), this.bones.push(o), this.boneInverses.push(new Oe().fromArray(e.boneInverses[n])) } return this.init(), this } toJSON() { const e = { metadata: { version: 4.6, type: "Skeleton", generator: "Skeleton.toJSON" }, bones: [], boneInverses: [] }; e.uuid = this.uuid; const t = this.bones, n = this.boneInverses; for (let s = 0, r = t.length; s < r; s++) { const o = t[s]; e.bones.push(o.uuid); const a = n[s]; e.boneInverses.push(a.toArray()) } return e } } class ql extends Ct { constructor(e, t, n, s = 1) { super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = s } copy(e) { return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this } toJSON() { const e = super.toJSON(); return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e } } const bs = new Oe, rf = new Oe, Eo = [], of = new Kn, FS = new Oe, ur = new Gt, hr = new In; class BS extends Gt { constructor(e, t, n) { super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new ql(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null; for (let s = 0; s < n; s++)this.setMatrixAt(s, FS) } computeBoundingBox() { const e = this.geometry, t = this.count; this.boundingBox === null && (this.boundingBox = new Kn), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty(); for (let n = 0; n < t; n++)this.getMatrixAt(n, bs), of.copy(e.boundingBox).applyMatrix4(bs), this.boundingBox.union(of) } computeBoundingSphere() { const e = this.geometry, t = this.count; this.boundingSphere === null && (this.boundingSphere = new In), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty(); for (let n = 0; n < t; n++)this.getMatrixAt(n, bs), hr.copy(e.boundingSphere).applyMatrix4(bs), this.boundingSphere.union(hr) } copy(e, t) { return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), e.morphTexture !== null && (this.morphTexture = e.morphTexture.clone()), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this } getColorAt(e, t) { t.fromArray(this.instanceColor.array, e * 3) } getMatrixAt(e, t) { t.fromArray(this.instanceMatrix.array, e * 16) } getMorphAt(e, t) { const n = t.morphTargetInfluences, s = this.morphTexture.source.data.data, r = n.length + 1, o = e * r + 1; for (let a = 0; a < n.length; a++)n[a] = s[o + a] } raycast(e, t) { const n = this.matrixWorld, s = this.count; if (ur.geometry = this.geometry, ur.material = this.material, ur.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), hr.copy(this.boundingSphere), hr.applyMatrix4(n), e.ray.intersectsSphere(hr) !== !1)) for (let r = 0; r < s; r++) { this.getMatrixAt(r, bs), rf.multiplyMatrices(n, bs), ur.matrixWorld = rf, ur.raycast(e, Eo); for (let o = 0, a = Eo.length; o < a; o++) { const l = Eo[o]; l.instanceId = r, l.object = this, t.push(l) } Eo.length = 0 } } setColorAt(e, t) { this.instanceColor === null && (this.instanceColor = new ql(new Float32Array(this.instanceMatrix.count * 3), 3)), t.toArray(this.instanceColor.array, e * 3) } setMatrixAt(e, t) { t.toArray(this.instanceMatrix.array, e * 16) } setMorphAt(e, t) { const n = t.morphTargetInfluences, s = n.length + 1; this.morphTexture === null && (this.morphTexture = new xa(new Float32Array(s * this.count), s, this.count, Ec, Vt)); const r = this.morphTexture.source.data.data; let o = 0; for (let c = 0; c < n.length; c++)o += n[c]; const a = this.geometry.morphTargetsRelative ? 1 : 1 - o, l = s * e; r[l] = a, r.set(n, l + 1) } updateMorphTargets() { } dispose() { return this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null), this } } class dp extends an { constructor(e) { super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Re(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this } } const af = new B, lf = new B, cf = new Oe, gl = new $s, To = new In; class Nc extends ot { constructor(e = new Jt, t = new dp) { super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.updateMorphTargets() } copy(e, t) { return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this } computeLineDistances() { const e = this.geometry; if (e.index === null) { const t = e.attributes.position, n = [0]; for (let s = 1, r = t.count; s < r; s++)af.fromBufferAttribute(t, s - 1), lf.fromBufferAttribute(t, s), n[s] = n[s - 1], n[s] += af.distanceTo(lf); e.setAttribute("lineDistance", new Mn(n, 1)) } else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."); return this } raycast(e, t) { const n = this.geometry, s = this.matrixWorld, r = e.params.Line.threshold, o = n.drawRange; if (n.boundingSphere === null && n.computeBoundingSphere(), To.copy(n.boundingSphere), To.applyMatrix4(s), To.radius += r, e.ray.intersectsSphere(To) === !1) return; cf.copy(s).invert(), gl.copy(e.ray).applyMatrix4(cf); const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = a * a, c = new B, u = new B, h = new B, f = new B, d = this.isLineSegments ? 2 : 1, _ = n.index, p = n.attributes.position; if (_ !== null) { const m = Math.max(0, o.start), b = Math.min(_.count, o.start + o.count); for (let y = m, A = b - 1; y < A; y += d) { const O = _.getX(y), P = _.getX(y + 1); if (c.fromBufferAttribute(p, O), u.fromBufferAttribute(p, P), gl.distanceSqToSegment(c, u, f, h) > l) continue; f.applyMatrix4(this.matrixWorld); const L = e.ray.origin.distanceTo(f); L < e.near || L > e.far || t.push({ distance: L, point: h.clone().applyMatrix4(this.matrixWorld), index: y, face: null, faceIndex: null, object: this }) } } else { const m = Math.max(0, o.start), b = Math.min(p.count, o.start + o.count); for (let y = m, A = b - 1; y < A; y += d) { if (c.fromBufferAttribute(p, y), u.fromBufferAttribute(p, y + 1), gl.distanceSqToSegment(c, u, f, h) > l) continue; f.applyMatrix4(this.matrixWorld); const P = e.ray.origin.distanceTo(f); P < e.near || P > e.far || t.push({ distance: P, point: h.clone().applyMatrix4(this.matrixWorld), index: y, face: null, faceIndex: null, object: this }) } } } updateMorphTargets() { const t = this.geometry.morphAttributes, n = Object.keys(t); if (n.length > 0) { const s = t[n[0]]; if (s !== void 0) { this.morphTargetInfluences = [], this.morphTargetDictionary = {}; for (let r = 0, o = s.length; r < o; r++) { const a = s[r].name || String(r); this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = r } } } } } const uf = new B, hf = new B; class kS extends Nc { constructor(e, t) { super(e, t), this.isLineSegments = !0, this.type = "LineSegments" } computeLineDistances() { const e = this.geometry; if (e.index === null) { const t = e.attributes.position, n = []; for (let s = 0, r = t.count; s < r; s += 2)uf.fromBufferAttribute(t, s), hf.fromBufferAttribute(t, s + 1), n[s] = s === 0 ? 0 : n[s - 1], n[s + 1] = n[s] + uf.distanceTo(hf); e.setAttribute("lineDistance", new Mn(n, 1)) } else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry."); return this } } class HS extends Nc { constructor(e, t) { super(e, t), this.isLineLoop = !0, this.type = "LineLoop" } } class pp extends an { constructor(e) { super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new Re(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this } } const ff = new Oe, Kl = new $s, bo = new In, Ao = new B; class zS extends ot { constructor(e = new Jt, t = new pp) { super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.updateMorphTargets() } copy(e, t) { return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this } raycast(e, t) { const n = this.geometry, s = this.matrixWorld, r = e.params.Points.threshold, o = n.drawRange; if (n.boundingSphere === null && n.computeBoundingSphere(), bo.copy(n.boundingSphere), bo.applyMatrix4(s), bo.radius += r, e.ray.intersectsSphere(bo) === !1) return; ff.copy(s).invert(), Kl.copy(e.ray).applyMatrix4(ff); const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = a * a, c = n.index, h = n.attributes.position; if (c !== null) { const f = Math.max(0, o.start), d = Math.min(c.count, o.start + o.count); for (let _ = f, v = d; _ < v; _++) { const p = c.getX(_); Ao.fromBufferAttribute(h, p), df(Ao, p, l, s, e, t, this) } } else { const f = Math.max(0, o.start), d = Math.min(h.count, o.start + o.count); for (let _ = f, v = d; _ < v; _++)Ao.fromBufferAttribute(h, _), df(Ao, _, l, s, e, t, this) } } updateMorphTargets() { const t = this.geometry.morphAttributes, n = Object.keys(t); if (n.length > 0) { const s = t[n[0]]; if (s !== void 0) { this.morphTargetInfluences = [], this.morphTargetDictionary = {}; for (let r = 0, o = s.length; r < o; r++) { const a = s[r].name || String(r); this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = r } } } } } function df(i, e, t, n, s, r, o) { const a = Kl.distanceSqToPoint(i); if (a < t) { const l = new B; Kl.closestPointToPoint(i, l), l.applyMatrix4(n); const c = s.ray.origin.distanceTo(l); if (c < s.near || c > s.far) return; r.push({ distance: c, distanceToRay: Math.sqrt(a), point: l, index: e, face: null, object: o }) } } class Uc extends an { constructor(e) { super(), this.isMeshStandardMaterial = !0, this.defines = { STANDARD: "" }, this.type = "MeshStandardMaterial", this.color = new Re(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Re(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Tc, this.normalScale = new Ee(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Ln, this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e) } copy(e) { return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this } } class $n extends Uc { constructor(e) { super(), this.isMeshPhysicalMaterial = !0, this.defines = { STANDARD: "", PHYSICAL: "" }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new Ee(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", { get: function () { return bt(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1) }, set: function (t) { this.ior = (1 + .4 * t) / (1 - .4 * t) } }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new Re(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new Re(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new Re(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(e) } get anisotropy() { return this._anisotropy } set anisotropy(e) { this._anisotropy > 0 != e > 0 && this.version++, this._anisotropy = e } get clearcoat() { return this._clearcoat } set clearcoat(e) { this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e } get iridescence() { return this._iridescence } set iridescence(e) { this._iridescence > 0 != e > 0 && this.version++, this._iridescence = e } get sheen() { return this._sheen } set sheen(e) { this._sheen > 0 != e > 0 && this.version++, this._sheen = e } get transmission() { return this._transmission } set transmission(e) { this._transmission > 0 != e > 0 && this.version++, this._transmission = e } copy(e) { return super.copy(e), this.defines = { STANDARD: "", PHYSICAL: "" }, this.anisotropy = e.anisotropy, this.anisotropyRotation = e.anisotropyRotation, this.anisotropyMap = e.anisotropyMap, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessRange = [...e.iridescenceThicknessRange], this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this } } class VS extends an { constructor(e) { super(), this.isMeshNormalMaterial = !0, this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Tc, this.normalScale = new Ee(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.flatShading = !1, this.setValues(e) } copy(e) { return super.copy(e), this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.flatShading = e.flatShading, this } } function wo(i, e, t) { return !i || !t && i.constructor === e ? i : typeof e.BYTES_PER_ELEMENT == "number" ? new e(i) : Array.prototype.slice.call(i) } function GS(i) { return ArrayBuffer.isView(i) && !(i instanceof DataView) } function WS(i) { function e(s, r) { return i[s] - i[r] } const t = i.length, n = new Array(t); for (let s = 0; s !== t; ++s)n[s] = s; return n.sort(e), n } function pf(i, e, t) { const n = i.length, s = new i.constructor(n); for (let r = 0, o = 0; o !== n; ++r) { const a = t[r] * e; for (let l = 0; l !== e; ++l)s[o++] = i[a + l] } return s } function mp(i, e, t, n) { let s = 1, r = i[0]; for (; r !== void 0 && r[n] === void 0;)r = i[s++]; if (r === void 0) return; let o = r[n]; if (o !== void 0) if (Array.isArray(o)) do o = r[n], o !== void 0 && (e.push(r.time), t.push.apply(t, o)), r = i[s++]; while (r !== void 0); else if (o.toArray !== void 0) do o = r[n], o !== void 0 && (e.push(r.time), o.toArray(t, t.length)), r = i[s++]; while (r !== void 0); else do o = r[n], o !== void 0 && (e.push(r.time), t.push(o)), r = i[s++]; while (r !== void 0) } class kr { constructor(e, t, n, s) { this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = s !== void 0 ? s : new t.constructor(n), this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {} } evaluate(e) { const t = this.parameterPositions; let n = this._cachedIndex, s = t[n], r = t[n - 1]; n: { e: { let o; t: { i: if (!(e < s)) { for (let a = n + 2; ;) { if (s === void 0) { if (e < r) break i; return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1) } if (n === a) break; if (r = s, s = t[++n], e < s) break e } o = t.length; break t } if (!(e >= r)) { const a = t[1]; e < a && (n = 2, r = a); for (let l = n - 2; ;) { if (r === void 0) return this._cachedIndex = 0, this.copySampleValue_(0); if (n === l) break; if (s = r, r = t[--n - 1], e >= r) break e } o = n, n = 0; break t } break n } for (; n < o;) { const a = n + o >>> 1; e < t[a] ? o = a : n = a + 1 } if (s = t[n], r = t[n - 1], r === void 0) return this._cachedIndex = 0, this.copySampleValue_(0); if (s === void 0) return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1) } this._cachedIndex = n, this.intervalChanged_(n, r, s) } return this.interpolate_(n, r, e, s) } getSettings_() { return this.settings || this.DefaultSettings_ } copySampleValue_(e) { const t = this.resultBuffer, n = this.sampleValues, s = this.valueSize, r = e * s; for (let o = 0; o !== s; ++o)t[o] = n[r + o]; return t } interpolate_() { throw new Error("call to abstract method") } intervalChanged_() { } } class XS extends kr { constructor(e, t, n, s) { super(e, t, n, s), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = { endingStart: sh, endingEnd: sh } } intervalChanged_(e, t, n) { const s = this.parameterPositions; let r = e - 2, o = e + 1, a = s[r], l = s[o]; if (a === void 0) switch (this.getSettings_().endingStart) { case rh: r = e, a = 2 * t - n; break; case oh: r = s.length - 2, a = t + s[r] - s[r + 1]; break; default: r = e, a = n }if (l === void 0) switch (this.getSettings_().endingEnd) { case rh: o = e, l = 2 * n - t; break; case oh: o = 1, l = n + s[1] - s[0]; break; default: o = e - 1, l = t }const c = (n - t) * .5, u = this.valueSize; this._weightPrev = c / (t - a), this._weightNext = c / (l - n), this._offsetPrev = r * u, this._offsetNext = o * u } interpolate_(e, t, n, s) { const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, l = e * a, c = l - a, u = this._offsetPrev, h = this._offsetNext, f = this._weightPrev, d = this._weightNext, _ = (n - t) / (s - t), v = _ * _, p = v * _, m = -f * p + 2 * f * v - f * _, b = (1 + f) * p + (-1.5 - 2 * f) * v + (-.5 + f) * _ + 1, y = (-1 - d) * p + (1.5 + d) * v + .5 * _, A = d * p - d * v; for (let O = 0; O !== a; ++O)r[O] = m * o[u + O] + b * o[c + O] + y * o[l + O] + A * o[h + O]; return r } } class jS extends kr { constructor(e, t, n, s) { super(e, t, n, s) } interpolate_(e, t, n, s) { const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, l = e * a, c = l - a, u = (n - t) / (s - t), h = 1 - u; for (let f = 0; f !== a; ++f)r[f] = o[c + f] * h + o[l + f] * u; return r } } class YS extends kr { constructor(e, t, n, s) { super(e, t, n, s) } interpolate_(e) { return this.copySampleValue_(e - 1) } } class Dn { constructor(e, t, n, s) { if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined"); if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e); this.name = e, this.times = wo(t, this.TimeBufferType), this.values = wo(n, this.ValueBufferType), this.setInterpolation(s || this.DefaultInterpolation) } static toJSON(e) { const t = e.constructor; let n; if (t.toJSON !== this.toJSON) n = t.toJSON(e); else { n = { name: e.name, times: wo(e.times, Array), values: wo(e.values, Array) }; const s = e.getInterpolation(); s !== e.DefaultInterpolation && (n.interpolation = s) } return n.type = e.ValueTypeName, n } InterpolantFactoryMethodDiscrete(e) { return new YS(this.times, this.values, this.getValueSize(), e) } InterpolantFactoryMethodLinear(e) { return new jS(this.times, this.values, this.getValueSize(), e) } InterpolantFactoryMethodSmooth(e) { return new XS(this.times, this.values, this.getValueSize(), e) } setInterpolation(e) { let t; switch (e) { case Ir: t = this.InterpolantFactoryMethodDiscrete; break; case Vs: t = this.InterpolantFactoryMethodLinear; break; case za: t = this.InterpolantFactoryMethodSmooth; break }if (t === void 0) { const n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name; if (this.createInterpolant === void 0) if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation); else throw new Error(n); return console.warn("THREE.KeyframeTrack:", n), this } return this.createInterpolant = t, this } getInterpolation() { switch (this.createInterpolant) { case this.InterpolantFactoryMethodDiscrete: return Ir; case this.InterpolantFactoryMethodLinear: return Vs; case this.InterpolantFactoryMethodSmooth: return za } } getValueSize() { return this.values.length / this.times.length } shift(e) { if (e !== 0) { const t = this.times; for (let n = 0, s = t.length; n !== s; ++n)t[n] += e } return this } scale(e) { if (e !== 1) { const t = this.times; for (let n = 0, s = t.length; n !== s; ++n)t[n] *= e } return this } trim(e, t) { const n = this.times, s = n.length; let r = 0, o = s - 1; for (; r !== s && n[r] < e;)++r; for (; o !== -1 && n[o] > t;)--o; if (++o, r !== 0 || o !== s) { r >= o && (o = Math.max(o, 1), r = o - 1); const a = this.getValueSize(); this.times = n.slice(r, o), this.values = this.values.slice(r * a, o * a) } return this } validate() { let e = !0; const t = this.getValueSize(); t - Math.floor(t) !== 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), e = !1); const n = this.times, s = this.values, r = n.length; r === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this), e = !1); let o = null; for (let a = 0; a !== r; a++) { const l = n[a]; if (typeof l == "number" && isNaN(l)) { console.error("THREE.KeyframeTrack: Time is not a valid number.", this, a, l), e = !1; break } if (o !== null && o > l) { console.error("THREE.KeyframeTrack: Out of order keys.", this, a, l, o), e = !1; break } o = l } if (s !== void 0 && GS(s)) for (let a = 0, l = s.length; a !== l; ++a) { const c = s[a]; if (isNaN(c)) { console.error("THREE.KeyframeTrack: Value is not a valid number.", this, a, c), e = !1; break } } return e } optimize() { const e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), s = this.getInterpolation() === za, r = e.length - 1; let o = 1; for (let a = 1; a < r; ++a) { let l = !1; const c = e[a], u = e[a + 1]; if (c !== u && (a !== 1 || c !== e[0])) if (s) l = !0; else { const h = a * n, f = h - n, d = h + n; for (let _ = 0; _ !== n; ++_) { const v = t[h + _]; if (v !== t[f + _] || v !== t[d + _]) { l = !0; break } } } if (l) { if (a !== o) { e[o] = e[a]; const h = a * n, f = o * n; for (let d = 0; d !== n; ++d)t[f + d] = t[h + d] } ++o } } if (r > 0) { e[o] = e[r]; for (let a = r * n, l = o * n, c = 0; c !== n; ++c)t[l + c] = t[a + c]; ++o } return o !== e.length ? (this.times = e.slice(0, o), this.values = t.slice(0, o * n)) : (this.times = e, this.values = t), this } clone() { const e = this.times.slice(), t = this.values.slice(), n = this.constructor, s = new n(this.name, e, t); return s.createInterpolant = this.createInterpolant, s } } Dn.prototype.TimeBufferType = Float32Array; Dn.prototype.ValueBufferType = Float32Array; Dn.prototype.DefaultInterpolation = Vs; class Js extends Dn { } Js.prototype.ValueTypeName = "bool"; Js.prototype.ValueBufferType = Array; Js.prototype.DefaultInterpolation = Ir; Js.prototype.InterpolantFactoryMethodLinear = void 0; Js.prototype.InterpolantFactoryMethodSmooth = void 0; class gp extends Dn { } gp.prototype.ValueTypeName = "color"; class Xs extends Dn { } Xs.prototype.ValueTypeName = "number"; class qS extends kr { constructor(e, t, n, s) { super(e, t, n, s) } interpolate_(e, t, n, s) { const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, l = (n - t) / (s - t); let c = e * a; for (let u = c + a; c !== u; c += 4)Pn.slerpFlat(r, 0, o, c - a, o, c, l); return r } } class $i extends Dn { InterpolantFactoryMethodLinear(e) { return new qS(this.times, this.values, this.getValueSize(), e) } } $i.prototype.ValueTypeName = "quaternion"; $i.prototype.DefaultInterpolation = Vs; $i.prototype.InterpolantFactoryMethodSmooth = void 0; class Qs extends Dn { } Qs.prototype.ValueTypeName = "string"; Qs.prototype.ValueBufferType = Array; Qs.prototype.DefaultInterpolation = Ir; Qs.prototype.InterpolantFactoryMethodLinear = void 0; Qs.prototype.InterpolantFactoryMethodSmooth = void 0; class js extends Dn { } js.prototype.ValueTypeName = "vector"; class KS { constructor(e = "", t = -1, n = [], s = Y_) { this.name = e, this.tracks = n, this.duration = t, this.blendMode = s, this.uuid = vn(), this.duration < 0 && this.resetDuration() } static parse(e) { const t = [], n = e.tracks, s = 1 / (e.fps || 1); for (let o = 0, a = n.length; o !== a; ++o)t.push(ZS(n[o]).scale(s)); const r = new this(e.name, e.duration, t, e.blendMode); return r.uuid = e.uuid, r } static toJSON(e) { const t = [], n = e.tracks, s = { name: e.name, duration: e.duration, tracks: t, uuid: e.uuid, blendMode: e.blendMode }; for (let r = 0, o = n.length; r !== o; ++r)t.push(Dn.toJSON(n[r])); return s } static CreateFromMorphTargetSequence(e, t, n, s) { const r = t.length, o = []; for (let a = 0; a < r; a++) { let l = [], c = []; l.push((a + r - 1) % r, a, (a + 1) % r), c.push(0, 1, 0); const u = WS(l); l = pf(l, 1, u), c = pf(c, 1, u), !s && l[0] === 0 && (l.push(r), c.push(c[0])), o.push(new Xs(".morphTargetInfluences[" + t[a].name + "]", l, c).scale(1 / n)) } return new this(e, -1, o) } static findByName(e, t) { let n = e; if (!Array.isArray(e)) { const s = e; n = s.geometry && s.geometry.animations || s.animations } for (let s = 0; s < n.length; s++)if (n[s].name === t) return n[s]; return null } static CreateClipsFromMorphTargetSequences(e, t, n) { const s = {}, r = /^([\w-]*?)([\d]+)$/; for (let a = 0, l = e.length; a < l; a++) { const c = e[a], u = c.name.match(r); if (u && u.length > 1) { const h = u[1]; let f = s[h]; f || (s[h] = f = []), f.push(c) } } const o = []; for (const a in s) o.push(this.CreateFromMorphTargetSequence(a, s[a], t, n)); return o } static parseAnimation(e, t) { if (!e) return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null; const n = function (h, f, d, _, v) { if (d.length !== 0) { const p = [], m = []; mp(d, p, m, _), p.length !== 0 && v.push(new h(f, p, m)) } }, s = [], r = e.name || "default", o = e.fps || 30, a = e.blendMode; let l = e.length || -1; const c = e.hierarchy || []; for (let h = 0; h < c.length; h++) { const f = c[h].keys; if (!(!f || f.length === 0)) if (f[0].morphTargets) { const d = {}; let _; for (_ = 0; _ < f.length; _++)if (f[_].morphTargets) for (let v = 0; v < f[_].morphTargets.length; v++)d[f[_].morphTargets[v]] = -1; for (const v in d) { const p = [], m = []; for (let b = 0; b !== f[_].morphTargets.length; ++b) { const y = f[_]; p.push(y.time), m.push(y.morphTarget === v ? 1 : 0) } s.push(new Xs(".morphTargetInfluence[" + v + "]", p, m)) } l = d.length * o } else { const d = ".bones[" + t[h].name + "]"; n(js, d + ".position", f, "pos", s), n($i, d + ".quaternion", f, "rot", s), n(js, d + ".scale", f, "scl", s) } } return s.length === 0 ? null : new this(r, l, s, a) } resetDuration() { const e = this.tracks; let t = 0; for (let n = 0, s = e.length; n !== s; ++n) { const r = this.tracks[n]; t = Math.max(t, r.times[r.times.length - 1]) } return this.duration = t, this } trim() { for (let e = 0; e < this.tracks.length; e++)this.tracks[e].trim(0, this.duration); return this } validate() { let e = !0; for (let t = 0; t < this.tracks.length; t++)e = e && this.tracks[t].validate(); return e } optimize() { for (let e = 0; e < this.tracks.length; e++)this.tracks[e].optimize(); return this } clone() { const e = []; for (let t = 0; t < this.tracks.length; t++)e.push(this.tracks[t].clone()); return new this.constructor(this.name, this.duration, e, this.blendMode) } toJSON() { return this.constructor.toJSON(this) } } function $S(i) { switch (i.toLowerCase()) { case "scalar": case "double": case "float": case "number": case "integer": return Xs; case "vector": case "vector2": case "vector3": case "vector4": return js; case "color": return gp; case "quaternion": return $i; case "bool": case "boolean": return Js; case "string": return Qs }throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + i) } function ZS(i) { if (i.type === void 0) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse"); const e = $S(i.type); if (i.times === void 0) { const t = [], n = []; mp(i.keys, t, n, "value"), i.times = t, i.values = n } return e.parse !== void 0 ? e.parse(i) : new e(i.name, i.times, i.values, i.interpolation) } const xi = { enabled: !1, files: {}, add: function (i, e) { this.enabled !== !1 && (this.files[i] = e) }, get: function (i) { if (this.enabled !== !1) return this.files[i] }, remove: function (i) { delete this.files[i] }, clear: function () { this.files = {} } }; class JS { constructor(e, t, n) { const s = this; let r = !1, o = 0, a = 0, l; const c = []; this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this.itemStart = function (u) { a++, r === !1 && s.onStart !== void 0 && s.onStart(u, o, a), r = !0 }, this.itemEnd = function (u) { o++, s.onProgress !== void 0 && s.onProgress(u, o, a), o === a && (r = !1, s.onLoad !== void 0 && s.onLoad()) }, this.itemError = function (u) { s.onError !== void 0 && s.onError(u) }, this.resolveURL = function (u) { return l ? l(u) : u }, this.setURLModifier = function (u) { return l = u, this }, this.addHandler = function (u, h) { return c.push(u, h), this }, this.removeHandler = function (u) { const h = c.indexOf(u); return h !== -1 && c.splice(h, 2), this }, this.getHandler = function (u) { for (let h = 0, f = c.length; h < f; h += 2) { const d = c[h], _ = c[h + 1]; if (d.global && (d.lastIndex = 0), d.test(u)) return _ } return null } } } const QS = new JS; class wi { constructor(e) { this.manager = e !== void 0 ? e : QS, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {} } load() { } loadAsync(e, t) { const n = this; return new Promise(function (s, r) { n.load(e, s, t, r) }) } parse() { } setCrossOrigin(e) { return this.crossOrigin = e, this } setWithCredentials(e) { return this.withCredentials = e, this } setPath(e) { return this.path = e, this } setResourcePath(e) { return this.resourcePath = e, this } setRequestHeader(e) { return this.requestHeader = e, this } } wi.DEFAULT_MATERIAL_NAME = "__DEFAULT"; const Hn = {}; class eE extends Error { constructor(e, t) { super(e), this.response = t } } class Ur extends wi { constructor(e) { super(e) } load(e, t, n, s) { e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e); const r = xi.get(e); if (r !== void 0) return this.manager.itemStart(e), setTimeout(() => { t && t(r), this.manager.itemEnd(e) }, 0), r; if (Hn[e] !== void 0) { Hn[e].push({ onLoad: t, onProgress: n, onError: s }); return } Hn[e] = [], Hn[e].push({ onLoad: t, onProgress: n, onError: s }); const o = new Request(e, { headers: new Headers(this.requestHeader), credentials: this.withCredentials ? "include" : "same-origin" }), a = this.mimeType, l = this.responseType; fetch(o).then(c => { if (c.status === 200 || c.status === 0) { if (c.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || c.body === void 0 || c.body.getReader === void 0) return c; const u = Hn[e], h = c.body.getReader(), f = c.headers.get("Content-Length") || c.headers.get("X-File-Size"), d = f ? parseInt(f) : 0, _ = d !== 0; let v = 0; const p = new ReadableStream({ start(m) { b(); function b() { h.read().then(({ done: y, value: A }) => { if (y) m.close(); else { v += A.byteLength; const O = new ProgressEvent("progress", { lengthComputable: _, loaded: v, total: d }); for (let P = 0, R = u.length; P < R; P++) { const L = u[P]; L.onProgress && L.onProgress(O) } m.enqueue(A), b() } }) } } }); return new Response(p) } else throw new eE(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`, c) }).then(c => { switch (l) { case "arraybuffer": return c.arrayBuffer(); case "blob": return c.blob(); case "document": return c.text().then(u => new DOMParser().parseFromString(u, a)); case "json": return c.json(); default: if (a === void 0) return c.text(); { const h = /charset="?([^;"\s]*)"?/i.exec(a), f = h && h[1] ? h[1].toLowerCase() : void 0, d = new TextDecoder(f); return c.arrayBuffer().then(_ => d.decode(_)) } } }).then(c => { xi.add(e, c); const u = Hn[e]; delete Hn[e]; for (let h = 0, f = u.length; h < f; h++) { const d = u[h]; d.onLoad && d.onLoad(c) } }).catch(c => { const u = Hn[e]; if (u === void 0) throw this.manager.itemError(e), c; delete Hn[e]; for (let h = 0, f = u.length; h < f; h++) { const d = u[h]; d.onError && d.onError(c) } this.manager.itemError(e) }).finally(() => { this.manager.itemEnd(e) }), this.manager.itemStart(e) } setResponseType(e) { return this.responseType = e, this } setMimeType(e) { return this.mimeType = e, this } } class tE extends wi { constructor(e) { super(e) } load(e, t, n, s) { this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e); const r = this, o = xi.get(e); if (o !== void 0) return r.manager.itemStart(e), setTimeout(function () { t && t(o), r.manager.itemEnd(e) }, 0), o; const a = Dr("img"); function l() { u(), xi.add(e, this), t && t(this), r.manager.itemEnd(e) } function c(h) { u(), s && s(h), r.manager.itemError(e), r.manager.itemEnd(e) } function u() { a.removeEventListener("load", l, !1), a.removeEventListener("error", c, !1) } return a.addEventListener("load", l, !1), a.addEventListener("error", c, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (a.crossOrigin = this.crossOrigin), r.manager.itemStart(e), a.src = e, a } } class nE extends wi { constructor(e) { super(e) } load(e, t, n, s) { const r = this, o = new xa, a = new Ur(this.manager); return a.setResponseType("arraybuffer"), a.setRequestHeader(this.requestHeader), a.setPath(this.path), a.setWithCredentials(r.withCredentials), a.load(e, function (l) { let c; try { c = r.parse(l) } catch (u) { if (s !== void 0) s(u); else { console.error(u); return } } c.image !== void 0 ? o.image = c.image : c.data !== void 0 && (o.image.width = c.width, o.image.height = c.height, o.image.data = c.data), o.wrapS = c.wrapS !== void 0 ? c.wrapS : An, o.wrapT = c.wrapT !== void 0 ? c.wrapT : An, o.magFilter = c.magFilter !== void 0 ? c.magFilter : At, o.minFilter = c.minFilter !== void 0 ? c.minFilter : At, o.anisotropy = c.anisotropy !== void 0 ? c.anisotropy : 1, c.colorSpace !== void 0 && (o.colorSpace = c.colorSpace), c.flipY !== void 0 && (o.flipY = c.flipY), c.format !== void 0 && (o.format = c.format), c.type !== void 0 && (o.type = c.type), c.mipmaps !== void 0 && (o.mipmaps = c.mipmaps, o.minFilter = wn), c.mipmapCount === 1 && (o.minFilter = At), c.generateMipmaps !== void 0 && (o.generateMipmaps = c.generateMipmaps), o.needsUpdate = !0, t && t(o, c) }, n, s), o } } class _p extends wi { constructor(e) { super(e) } load(e, t, n, s) { const r = new wt, o = new tE(this.manager); return o.setCrossOrigin(this.crossOrigin), o.setPath(this.path), o.load(e, function (a) { r.image = a, r.needsUpdate = !0, t !== void 0 && t(r) }, n, s), r } } class Hr extends ot { constructor(e, t = 1) { super(), this.isLight = !0, this.type = "Light", this.color = new Re(e), this.intensity = t } dispose() { } copy(e, t) { return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this } toJSON(e) { const t = super.toJSON(e); return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, this.groundColor !== void 0 && (t.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (t.object.distance = this.distance), this.angle !== void 0 && (t.object.angle = this.angle), this.decay !== void 0 && (t.object.decay = this.decay), this.penumbra !== void 0 && (t.object.penumbra = this.penumbra), this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()), t } } class iE extends Hr { constructor(e, t, n) { super(e, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(ot.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Re(t) } copy(e, t) { return super.copy(e, t), this.groundColor.copy(e.groundColor), this } } const _l = new Oe, mf = new B, gf = new B; class Oc { constructor(e) { this.camera = e, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Ee(512, 512), this.map = null, this.mapPass = null, this.matrix = new Oe, this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Cc, this._frameExtents = new Ee(1, 1), this._viewportCount = 1, this._viewports = [new it(0, 0, 1, 1)] } getViewportCount() { return this._viewportCount } getFrustum() { return this._frustum } updateMatrices(e) { const t = this.camera, n = this.matrix; mf.setFromMatrixPosition(e.matrixWorld), t.position.copy(mf), gf.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(gf), t.updateMatrixWorld(), _l.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(_l), n.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), n.multiply(_l) } getViewport(e) { return this._viewports[e] } getFrameExtents() { return this._frameExtents } dispose() { this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose() } copy(e) { return this.camera = e.camera.clone(), this.bias = e.bias, this.radius = e.radius, this.mapSize.copy(e.mapSize), this } clone() { return new this.constructor().copy(this) } toJSON() { const e = {}; return this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e } } class sE extends Oc { constructor() { super(new kt(50, 1, .5, 500)), this.isSpotLightShadow = !0, this.focus = 1 } updateMatrices(e) { const t = this.camera, n = Gs * 2 * e.angle * this.focus, s = this.mapSize.width / this.mapSize.height, r = e.distance || t.far; (n !== t.fov || s !== t.aspect || r !== t.far) && (t.fov = n, t.aspect = s, t.far = r, t.updateProjectionMatrix()), super.updateMatrices(e) } copy(e) { return super.copy(e), this.focus = e.focus, this } } class rE extends Hr { constructor(e, t, n = 0, s = Math.PI / 3, r = 0, o = 2) { super(e, t), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(ot.DEFAULT_UP), this.updateMatrix(), this.target = new ot, this.distance = n, this.angle = s, this.penumbra = r, this.decay = o, this.map = null, this.shadow = new sE } get power() { return this.intensity * Math.PI } set power(e) { this.intensity = e / Math.PI } dispose() { this.shadow.dispose() } copy(e, t) { return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.shadow = e.shadow.clone(), this } } const _f = new Oe, fr = new B, xl = new B; class oE extends Oc { constructor() { super(new kt(90, 1, .5, 500)), this.isPointLightShadow = !0, this._frameExtents = new Ee(4, 2), this._viewportCount = 6, this._viewports = [new it(2, 1, 1, 1), new it(0, 1, 1, 1), new it(3, 1, 1, 1), new it(1, 1, 1, 1), new it(3, 0, 1, 1), new it(1, 0, 1, 1)], this._cubeDirections = [new B(1, 0, 0), new B(-1, 0, 0), new B(0, 0, 1), new B(0, 0, -1), new B(0, 1, 0), new B(0, -1, 0)], this._cubeUps = [new B(0, 1, 0), new B(0, 1, 0), new B(0, 1, 0), new B(0, 1, 0), new B(0, 0, 1), new B(0, 0, -1)] } updateMatrices(e, t = 0) { const n = this.camera, s = this.matrix, r = e.distance || n.far; r !== n.far && (n.far = r, n.updateProjectionMatrix()), fr.setFromMatrixPosition(e.matrixWorld), n.position.copy(fr), xl.copy(n.position), xl.add(this._cubeDirections[t]), n.up.copy(this._cubeUps[t]), n.lookAt(xl), n.updateMatrixWorld(), s.makeTranslation(-fr.x, -fr.y, -fr.z), _f.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(_f) } } class aE extends Hr { constructor(e, t, n = 0, s = 2) { super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = s, this.shadow = new oE } get power() { return this.intensity * 4 * Math.PI } set power(e) { this.intensity = e / (4 * Math.PI) } dispose() { this.shadow.dispose() } copy(e, t) { return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this } } class lE extends Oc { constructor() { super(new ga(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = !0 } } class xp extends Hr { constructor(e, t) { super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(ot.DEFAULT_UP), this.updateMatrix(), this.target = new ot, this.shadow = new lE } dispose() { this.shadow.dispose() } copy(e) { return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this } } class cE extends Hr { constructor(e, t) { super(e, t), this.isAmbientLight = !0, this.type = "AmbientLight" } } class Er { static decodeText(e) { if (typeof TextDecoder < "u") return new TextDecoder().decode(e); let t = ""; for (let n = 0, s = e.length; n < s; n++)t += String.fromCharCode(e[n]); try { return decodeURIComponent(escape(t)) } catch { return t } } static extractUrlBase(e) { const t = e.lastIndexOf("/"); return t === -1 ? "./" : e.slice(0, t + 1) } static resolveURL(e, t) { return typeof e != "string" || e === "" ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e) } } class uE extends wi { constructor(e) { super(e), this.isImageBitmapLoader = !0, typeof createImageBitmap > "u" && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), typeof fetch > "u" && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), this.options = { premultiplyAlpha: "none" } } setOptions(e) { return this.options = e, this } load(e, t, n, s) { e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e); const r = this, o = xi.get(e); if (o !== void 0) { if (r.manager.itemStart(e), o.then) { o.then(c => { t && t(c), r.manager.itemEnd(e) }).catch(c => { s && s(c) }); return } return setTimeout(function () { t && t(o), r.manager.itemEnd(e) }, 0), o } const a = {}; a.credentials = this.crossOrigin === "anonymous" ? "same-origin" : "include", a.headers = this.requestHeader; const l = fetch(e, a).then(function (c) { return c.blob() }).then(function (c) { return createImageBitmap(c, Object.assign(r.options, { colorSpaceConversion: "none" })) }).then(function (c) { return xi.add(e, c), t && t(c), r.manager.itemEnd(e), c }).catch(function (c) { s && s(c), xi.remove(e), r.manager.itemError(e), r.manager.itemEnd(e) }); xi.add(e, l), r.manager.itemStart(e) } } class hE { constructor(e = !0) { this.autoStart = e, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1 } start() { this.startTime = xf(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0 } stop() { this.getElapsedTime(), this.running = !1, this.autoStart = !1 } getElapsedTime() { return this.getDelta(), this.elapsedTime } getDelta() { let e = 0; if (this.autoStart && !this.running) return this.start(), 0; if (this.running) { const t = xf(); e = (t - this.oldTime) / 1e3, this.oldTime = t, this.elapsedTime += e } return e } } function xf() { return (typeof performance > "u" ? Date : performance).now() } const Fc = "\\[\\]\\.:\\/", fE = new RegExp("[" + Fc + "]", "g"), Bc = "[^" + Fc + "]", dE = "[^" + Fc.replace("\\.", "") + "]", pE = /((?:WC+[\/:])*)/.source.replace("WC", Bc), mE = /(WCOD+)?/.source.replace("WCOD", dE), gE = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Bc), _E = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Bc), xE = new RegExp("^" + pE + mE + gE + _E + "$"), vE = ["material", "materials", "bones", "map"]; class ME { constructor(e, t, n) { const s = n || et.parseTrackName(t); this._targetGroup = e, this._bindings = e.subscribe_(t, s) } getValue(e, t) { this.bind(); const n = this._targetGroup.nCachedObjects_, s = this._bindings[n]; s !== void 0 && s.getValue(e, t) } setValue(e, t) { const n = this._bindings; for (let s = this._targetGroup.nCachedObjects_, r = n.length; s !== r; ++s)n[s].setValue(e, t) } bind() { const e = this._bindings; for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)e[t].bind() } unbind() { const e = this._bindings; for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)e[t].unbind() } } class et { constructor(e, t, n) { this.path = t, this.parsedPath = n || et.parseTrackName(t), this.node = et.findNode(e, this.parsedPath.nodeName), this.rootNode = e, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound } static create(e, t, n) { return e && e.isAnimationObjectGroup ? new et.Composite(e, t, n) : new et(e, t, n) } static sanitizeNodeName(e) { return e.replace(/\s/g, "_").replace(fE, "") } static parseTrackName(e) { const t = xE.exec(e); if (t === null) throw new Error("PropertyBinding: Cannot parse trackName: " + e); const n = { nodeName: t[2], objectName: t[3], objectIndex: t[4], propertyName: t[5], propertyIndex: t[6] }, s = n.nodeName && n.nodeName.lastIndexOf("."); if (s !== void 0 && s !== -1) { const r = n.nodeName.substring(s + 1); vE.indexOf(r) !== -1 && (n.nodeName = n.nodeName.substring(0, s), n.objectName = r) } if (n.propertyName === null || n.propertyName.length === 0) throw new Error("PropertyBinding: can not parse propertyName from trackName: " + e); return n } static findNode(e, t) { if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e; if (e.skeleton) { const n = e.skeleton.getBoneByName(t); if (n !== void 0) return n } if (e.children) { const n = function (r) { for (let o = 0; o < r.length; o++) { const a = r[o]; if (a.name === t || a.uuid === t) return a; const l = n(a.children); if (l) return l } return null }, s = n(e.children); if (s) return s } return null } _getValue_unavailable() { } _setValue_unavailable() { } _getValue_direct(e, t) { e[t] = this.targetObject[this.propertyName] } _getValue_array(e, t) { const n = this.resolvedProperty; for (let s = 0, r = n.length; s !== r; ++s)e[t++] = n[s] } _getValue_arrayElement(e, t) { e[t] = this.resolvedProperty[this.propertyIndex] } _getValue_toArray(e, t) { this.resolvedProperty.toArray(e, t) } _setValue_direct(e, t) { this.targetObject[this.propertyName] = e[t] } _setValue_direct_setNeedsUpdate(e, t) { this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0 } _setValue_direct_setMatrixWorldNeedsUpdate(e, t) { this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0 } _setValue_array(e, t) { const n = this.resolvedProperty; for (let s = 0, r = n.length; s !== r; ++s)n[s] = e[t++] } _setValue_array_setNeedsUpdate(e, t) { const n = this.resolvedProperty; for (let s = 0, r = n.length; s !== r; ++s)n[s] = e[t++]; this.targetObject.needsUpdate = !0 } _setValue_array_setMatrixWorldNeedsUpdate(e, t) { const n = this.resolvedProperty; for (let s = 0, r = n.length; s !== r; ++s)n[s] = e[t++]; this.targetObject.matrixWorldNeedsUpdate = !0 } _setValue_arrayElement(e, t) { this.resolvedProperty[this.propertyIndex] = e[t] } _setValue_arrayElement_setNeedsUpdate(e, t) { this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0 } _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) { this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0 } _setValue_fromArray(e, t) { this.resolvedProperty.fromArray(e, t) } _setValue_fromArray_setNeedsUpdate(e, t) { this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0 } _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) { this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0 } _getValue_unbound(e, t) { this.bind(), this.getValue(e, t) } _setValue_unbound(e, t) { this.bind(), this.setValue(e, t) } bind() { let e = this.node; const t = this.parsedPath, n = t.objectName, s = t.propertyName; let r = t.propertyIndex; if (e || (e = et.findNode(this.rootNode, t.nodeName), this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e) { console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + "."); return } if (n) { let c = t.objectIndex; switch (n) { case "materials": if (!e.material) { console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this); return } if (!e.material.materials) { console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this); return } e = e.material.materials; break; case "bones": if (!e.skeleton) { console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this); return } e = e.skeleton.bones; for (let u = 0; u < e.length; u++)if (e[u].name === c) { c = u; break } break; case "map": if ("map" in e) { e = e.map; break } if (!e.material) { console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this); return } if (!e.material.map) { console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this); return } e = e.material.map; break; default: if (e[n] === void 0) { console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this); return } e = e[n] }if (c !== void 0) { if (e[c] === void 0) { console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e); return } e = e[c] } } const o = e[s]; if (o === void 0) { const c = t.nodeName; console.error("THREE.PropertyBinding: Trying to update property for track: " + c + "." + s + " but it wasn't found.", e); return } let a = this.Versioning.None; this.targetObject = e, e.needsUpdate !== void 0 ? a = this.Versioning.NeedsUpdate : e.matrixWorldNeedsUpdate !== void 0 && (a = this.Versioning.MatrixWorldNeedsUpdate); let l = this.BindingType.Direct; if (r !== void 0) { if (s === "morphTargetInfluences") { if (!e.geometry) { console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this); return } if (!e.geometry.morphAttributes) { console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this); return } e.morphTargetDictionary[r] !== void 0 && (r = e.morphTargetDictionary[r]) } l = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = r } else o.fromArray !== void 0 && o.toArray !== void 0 ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (l = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = s; this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][a] } unbind() { this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound } } et.Composite = ME; et.prototype.BindingType = { Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3 }; et.prototype.Versioning = { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 }; et.prototype.GetterByBindingType = [et.prototype._getValue_direct, et.prototype._getValue_array, et.prototype._getValue_arrayElement, et.prototype._getValue_toArray]; et.prototype.SetterByBindingTypeAndVersioning = [[et.prototype._setValue_direct, et.prototype._setValue_direct_setNeedsUpdate, et.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [et.prototype._setValue_array, et.prototype._setValue_array_setNeedsUpdate, et.prototype._setValue_array_setMatrixWorldNeedsUpdate], [et.prototype._setValue_arrayElement, et.prototype._setValue_arrayElement_setNeedsUpdate, et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [et.prototype._setValue_fromArray, et.prototype._setValue_fromArray_setNeedsUpdate, et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]]; const vf = new Oe; class yE { constructor(e, t, n = 0, s = 1 / 0) { this.ray = new $s(e, t), this.near = n, this.far = s, this.camera = null, this.layers = new Rc, this.params = { Mesh: {}, Line: { threshold: 1 }, LOD: {}, Points: { threshold: 1 }, Sprite: {} } } set(e, t) { this.ray.set(e, t) } setFromCamera(e, t) { t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(e.x, e.y, .5).unproject(t).sub(this.ray.origin).normalize(), this.camera = t) : t.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, (t.near + t.far) / (t.near - t.far)).unproject(t), this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld), this.camera = t) : console.error("THREE.Raycaster: Unsupported camera type: " + t.type) } setFromXRController(e) { return vf.identity().extractRotation(e.matrixWorld), this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(vf), this } intersectObject(e, t = !0, n = []) { return $l(e, this, n, t), n.sort(Mf), n } intersectObjects(e, t = !0, n = []) { for (let s = 0, r = e.length; s < r; s++)$l(e[s], this, n, t); return n.sort(Mf), n } } function Mf(i, e) { return i.distance - e.distance } function $l(i, e, t, n) { if (i.layers.test(e.layers) && i.raycast(e, t), n === !0) { const s = i.children; for (let r = 0, o = s.length; r < o; r++)$l(s[r], e, t, !0) } } class Zl { constructor(e = 1, t = 0, n = 0) { return this.radius = e, this.phi = t, this.theta = n, this } set(e, t, n) { return this.radius = e, this.phi = t, this.theta = n, this } copy(e) { return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this } makeSafe() { return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this } setFromVector3(e) { return this.setFromCartesianCoords(e.x, e.y, e.z) } setFromCartesianCoords(e, t, n) { return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(bt(t / this.radius, -1, 1))), this } clone() { return new this.constructor().copy(this) } } typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: Sc } })); typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = Sc); const yf = { type: "change" }, vl = { type: "start" }, Sf = { type: "end" }, Ro = new $s, Ef = new di, SE = Math.cos(70 * wc.DEG2RAD); class EE extends es { constructor(e, t) { super(), this.object = e, this.domElement = t, this.domElement.style.touchAction = "none", this.enabled = !0, this.target = new B, this.cursor = new B, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: ns.ROTATE, MIDDLE: ns.DOLLY, RIGHT: ns.PAN }, this.touches = { ONE: is.ROTATE, TWO: is.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this.getPolarAngle = function () { return a.phi }, this.getAzimuthalAngle = function () { return a.theta }, this.getDistance = function () { return this.object.position.distanceTo(this.target) }, this.listenToKeyEvents = function (g) { g.addEventListener("keydown", le), this._domElementKeyEvents = g }, this.stopListenToKeyEvents = function () { this._domElementKeyEvents.removeEventListener("keydown", le), this._domElementKeyEvents = null }, this.saveState = function () { n.target0.copy(n.target), n.position0.copy(n.object.position), n.zoom0 = n.object.zoom }, this.reset = function () { n.target.copy(n.target0), n.object.position.copy(n.position0), n.object.zoom = n.zoom0, n.object.updateProjectionMatrix(), n.dispatchEvent(yf), n.update(), r = s.NONE }, this.update = function () { const g = new B, q = new Pn().setFromUnitVectors(e.up, new B(0, 1, 0)), ie = q.clone().invert(), he = new B, Se = new Pn, Ke = new B, Ye = 2 * Math.PI; return function (yt = null) { const tt = n.object.position; g.copy(tt).sub(n.target), g.applyQuaternion(q), a.setFromVector3(g), n.autoRotate && r === s.NONE && I(M(yt)), n.enableDamping ? (a.theta += l.theta * n.dampingFactor, a.phi += l.phi * n.dampingFactor) : (a.theta += l.theta, a.phi += l.phi); let dt = n.minAzimuthAngle, pt = n.maxAzimuthAngle; isFinite(dt) && isFinite(pt) && (dt < -Math.PI ? dt += Ye : dt > Math.PI && (dt -= Ye), pt < -Math.PI ? pt += Ye : pt > Math.PI && (pt -= Ye), dt <= pt ? a.theta = Math.max(dt, Math.min(pt, a.theta)) : a.theta = a.theta > (dt + pt) / 2 ? Math.max(dt, a.theta) : Math.min(pt, a.theta)), a.phi = Math.max(n.minPolarAngle, Math.min(n.maxPolarAngle, a.phi)), a.makeSafe(), n.enableDamping === !0 ? n.target.addScaledVector(u, n.dampingFactor) : n.target.add(u), n.target.sub(n.cursor), n.target.clampLength(n.minTargetRadius, n.maxTargetRadius), n.target.add(n.cursor); let qt = !1; if (n.zoomToCursor && P || n.object.isOrthographicCamera) a.radius = oe(a.radius); else { const Qt = a.radius; a.radius = oe(a.radius * c), qt = Qt != a.radius } if (g.setFromSpherical(a), g.applyQuaternion(ie), tt.copy(n.target).add(g), n.object.lookAt(n.target), n.enableDamping === !0 ? (l.theta *= 1 - n.dampingFactor, l.phi *= 1 - n.dampingFactor, u.multiplyScalar(1 - n.dampingFactor)) : (l.set(0, 0, 0), u.set(0, 0, 0)), n.zoomToCursor && P) { let Qt = null; if (n.object.isPerspectiveCamera) { const Zn = g.length(); Qt = oe(Zn * c); const ts = Zn - Qt; n.object.position.addScaledVector(A, ts), n.object.updateMatrixWorld(), qt = !!ts } else if (n.object.isOrthographicCamera) { const Zn = new B(O.x, O.y, 0); Zn.unproject(n.object); const ts = n.object.zoom; n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / c)), n.object.updateProjectionMatrix(), qt = ts !== n.object.zoom; const Ri = new B(O.x, O.y, 0); Ri.unproject(n.object), n.object.position.sub(Ri).add(Zn), n.object.updateMatrixWorld(), Qt = g.length() } else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), n.zoomToCursor = !1; Qt !== null && (this.screenSpacePanning ? n.target.set(0, 0, -1).transformDirection(n.object.matrix).multiplyScalar(Qt).add(n.object.position) : (Ro.origin.copy(n.object.position), Ro.direction.set(0, 0, -1).transformDirection(n.object.matrix), Math.abs(n.object.up.dot(Ro.direction)) < SE ? e.lookAt(n.target) : (Ef.setFromNormalAndCoplanarPoint(n.object.up, n.target), Ro.intersectPlane(Ef, n.target)))) } else if (n.object.isOrthographicCamera) { const Qt = n.object.zoom; n.object.zoom = Math.max(n.minZoom, Math.min(n.maxZoom, n.object.zoom / c)), Qt !== n.object.zoom && (n.object.updateProjectionMatrix(), qt = !0) } return c = 1, P = !1, qt || he.distanceToSquared(n.object.position) > o || 8 * (1 - Se.dot(n.object.quaternion)) > o || Ke.distanceToSquared(n.target) > o ? (n.dispatchEvent(yf), he.copy(n.object.position), Se.copy(n.object.quaternion), Ke.copy(n.target), !0) : !1 } }(), this.dispose = function () { n.domElement.removeEventListener("contextmenu", me), n.domElement.removeEventListener("pointerdown", N), n.domElement.removeEventListener("pointercancel", H), n.domElement.removeEventListener("wheel", K), n.domElement.removeEventListener("pointermove", F), n.domElement.removeEventListener("pointerup", H), n.domElement.getRootNode().removeEventListener("keydown", ce, { capture: !0 }), n._domElementKeyEvents !== null && (n._domElementKeyEvents.removeEventListener("keydown", le), n._domElementKeyEvents = null) }; const n = this, s = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 }; let r = s.NONE; const o = 1e-6, a = new Zl, l = new Zl; let c = 1; const u = new B, h = new Ee, f = new Ee, d = new Ee, _ = new Ee, v = new Ee, p = new Ee, m = new Ee, b = new Ee, y = new Ee, A = new B, O = new Ee; let P = !1; const R = [], L = {}; let S = !1; function M(g) { return g !== null ? 2 * Math.PI / 60 * n.autoRotateSpeed * g : 2 * Math.PI / 60 / 60 * n.autoRotateSpeed } function D(g) { const q = Math.abs(g * .01); return Math.pow(.95, n.zoomSpeed * q) } function I(g) { l.theta -= g } function C(g) { l.phi -= g } const z = function () { const g = new B; return function (ie, he) { g.setFromMatrixColumn(he, 0), g.multiplyScalar(-ie), u.add(g) } }(), Y = function () { const g = new B; return function (ie, he) { n.screenSpacePanning === !0 ? g.setFromMatrixColumn(he, 1) : (g.setFromMatrixColumn(he, 0), g.crossVectors(n.object.up, g)), g.multiplyScalar(ie), u.add(g) } }(), X = function () { const g = new B; return function (ie, he) { const Se = n.domElement; if (n.object.isPerspectiveCamera) { const Ke = n.object.position; g.copy(Ke).sub(n.target); let Ye = g.length(); Ye *= Math.tan(n.object.fov / 2 * Math.PI / 180), z(2 * ie * Ye / Se.clientHeight, n.object.matrix), Y(2 * he * Ye / Se.clientHeight, n.object.matrix) } else n.object.isOrthographicCamera ? (z(ie * (n.object.right - n.object.left) / n.object.zoom / Se.clientWidth, n.object.matrix), Y(he * (n.object.top - n.object.bottom) / n.object.zoom / Se.clientHeight, n.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), n.enablePan = !1) } }(); function ee(g) { n.object.isPerspectiveCamera || n.object.isOrthographicCamera ? c /= g : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), n.enableZoom = !1) } function G(g) { n.object.isPerspectiveCamera || n.object.isOrthographicCamera ? c *= g : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), n.enableZoom = !1) } function ne(g, q) { if (!n.zoomToCursor) return; P = !0; const ie = n.domElement.getBoundingClientRect(), he = g - ie.left, Se = q - ie.top, Ke = ie.width, Ye = ie.height; O.x = he / Ke * 2 - 1, O.y = -(Se / Ye) * 2 + 1, A.set(O.x, O.y, 1).unproject(n.object).sub(n.object.position).normalize() } function oe(g) { return Math.max(n.minDistance, Math.min(n.maxDistance, g)) } function pe(g) { h.set(g.clientX, g.clientY) } function ye(g) { ne(g.clientX, g.clientX), m.set(g.clientX, g.clientY) } function Pe(g) { _.set(g.clientX, g.clientY) } function te(g) { f.set(g.clientX, g.clientY), d.subVectors(f, h).multiplyScalar(n.rotateSpeed); const q = n.domElement; I(2 * Math.PI * d.x / q.clientHeight), C(2 * Math.PI * d.y / q.clientHeight), h.copy(f), n.update() } function ue(g) { b.set(g.clientX, g.clientY), y.subVectors(b, m), y.y > 0 ? ee(D(y.y)) : y.y < 0 && G(D(y.y)), m.copy(b), n.update() } function ge(g) { v.set(g.clientX, g.clientY), p.subVectors(v, _).multiplyScalar(n.panSpeed), X(p.x, p.y), _.copy(v), n.update() } function fe(g) { ne(g.clientX, g.clientY), g.deltaY < 0 ? G(D(g.deltaY)) : g.deltaY > 0 && ee(D(g.deltaY)), n.update() } function Te(g) { let q = !1; switch (g.code) { case n.keys.UP: g.ctrlKey || g.metaKey || g.shiftKey ? C(2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : X(0, n.keyPanSpeed), q = !0; break; case n.keys.BOTTOM: g.ctrlKey || g.metaKey || g.shiftKey ? C(-2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : X(0, -n.keyPanSpeed), q = !0; break; case n.keys.LEFT: g.ctrlKey || g.metaKey || g.shiftKey ? I(2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : X(n.keyPanSpeed, 0), q = !0; break; case n.keys.RIGHT: g.ctrlKey || g.metaKey || g.shiftKey ? I(-2 * Math.PI * n.rotateSpeed / n.domElement.clientHeight) : X(-n.keyPanSpeed, 0), q = !0; break }q && (g.preventDefault(), n.update()) } function Ae(g) { if (R.length === 1) h.set(g.pageX, g.pageY); else { const q = Le(g), ie = .5 * (g.pageX + q.x), he = .5 * (g.pageY + q.y); h.set(ie, he) } } function we(g) { if (R.length === 1) _.set(g.pageX, g.pageY); else { const q = Le(g), ie = .5 * (g.pageX + q.x), he = .5 * (g.pageY + q.y); _.set(ie, he) } } function j(g) { const q = Le(g), ie = g.pageX - q.x, he = g.pageY - q.y, Se = Math.sqrt(ie * ie + he * he); m.set(0, Se) } function De(g) { n.enableZoom && j(g), n.enablePan && we(g) } function w(g) { n.enableZoom && j(g), n.enableRotate && Ae(g) } function U(g) { if (R.length == 1) f.set(g.pageX, g.pageY); else { const ie = Le(g), he = .5 * (g.pageX + ie.x), Se = .5 * (g.pageY + ie.y); f.set(he, Se) } d.subVectors(f, h).multiplyScalar(n.rotateSpeed); const q = n.domElement; I(2 * Math.PI * d.x / q.clientHeight), C(2 * Math.PI * d.y / q.clientHeight), h.copy(f) } function V(g) { if (R.length === 1) v.set(g.pageX, g.pageY); else { const q = Le(g), ie = .5 * (g.pageX + q.x), he = .5 * (g.pageY + q.y); v.set(ie, he) } p.subVectors(v, _).multiplyScalar(n.panSpeed), X(p.x, p.y), _.copy(v) } function J(g) { const q = Le(g), ie = g.pageX - q.x, he = g.pageY - q.y, Se = Math.sqrt(ie * ie + he * he); b.set(0, Se), y.set(0, Math.pow(b.y / m.y, n.zoomSpeed)), ee(y.y), m.copy(b); const Ke = (g.pageX + q.x) * .5, Ye = (g.pageY + q.y) * .5; ne(Ke, Ye) } function E(g) { n.enableZoom && J(g), n.enablePan && V(g) } function x(g) { n.enableZoom && J(g), n.enableRotate && U(g) } function N(g) { n.enabled !== !1 && (R.length === 0 && (n.domElement.setPointerCapture(g.pointerId), n.domElement.addEventListener("pointermove", F), n.domElement.addEventListener("pointerup", H)), !Xe(g) && (Ne(g), g.pointerType === "touch" ? _e(g) : k(g))) } function F(g) { n.enabled !== !1 && (g.pointerType === "touch" ? de(g) : se(g)) } function H(g) { switch (ze(g), R.length) { case 0: n.domElement.releasePointerCapture(g.pointerId), n.domElement.removeEventListener("pointermove", F), n.domElement.removeEventListener("pointerup", H), n.dispatchEvent(Sf), r = s.NONE; break; case 1: const q = R[0], ie = L[q]; _e({ pointerId: q, pageX: ie.x, pageY: ie.y }); break } } function k(g) { let q; switch (g.button) { case 0: q = n.mouseButtons.LEFT; break; case 1: q = n.mouseButtons.MIDDLE; break; case 2: q = n.mouseButtons.RIGHT; break; default: q = -1 }switch (q) { case ns.DOLLY: if (n.enableZoom === !1) return; ye(g), r = s.DOLLY; break; case ns.ROTATE: if (g.ctrlKey || g.metaKey || g.shiftKey) { if (n.enablePan === !1) return; Pe(g), r = s.PAN } else { if (n.enableRotate === !1) return; pe(g), r = s.ROTATE } break; case ns.PAN: if (g.ctrlKey || g.metaKey || g.shiftKey) { if (n.enableRotate === !1) return; pe(g), r = s.ROTATE } else { if (n.enablePan === !1) return; Pe(g), r = s.PAN } break; default: r = s.NONE }r !== s.NONE && n.dispatchEvent(vl) } function se(g) { switch (r) { case s.ROTATE: if (n.enableRotate === !1) return; te(g); break; case s.DOLLY: if (n.enableZoom === !1) return; ue(g); break; case s.PAN: if (n.enablePan === !1) return; ge(g); break } } function K(g) { n.enabled === !1 || n.enableZoom === !1 || r !== s.NONE || (g.preventDefault(), n.dispatchEvent(vl), fe(ae(g)), n.dispatchEvent(Sf)) } function ae(g) { const q = g.deltaMode, ie = { clientX: g.clientX, clientY: g.clientY, deltaY: g.deltaY }; switch (q) { case 1: ie.deltaY *= 16; break; case 2: ie.deltaY *= 100; break }return g.ctrlKey && !S && (ie.deltaY *= 10), ie } function ce(g) { g.key === "Control" && (S = !0, n.domElement.getRootNode().addEventListener("keyup", re, { passive: !0, capture: !0 })) } function re(g) { g.key === "Control" && (S = !1, n.domElement.getRootNode().removeEventListener("keyup", re, { passive: !0, capture: !0 })) } function le(g) { n.enabled === !1 || n.enablePan === !1 || Te(g) } function _e(g) { switch (je(g), R.length) { case 1: switch (n.touches.ONE) { case is.ROTATE: if (n.enableRotate === !1) return; Ae(g), r = s.TOUCH_ROTATE; break; case is.PAN: if (n.enablePan === !1) return; we(g), r = s.TOUCH_PAN; break; default: r = s.NONE }break; case 2: switch (n.touches.TWO) { case is.DOLLY_PAN: if (n.enableZoom === !1 && n.enablePan === !1) return; De(g), r = s.TOUCH_DOLLY_PAN; break; case is.DOLLY_ROTATE: if (n.enableZoom === !1 && n.enableRotate === !1) return; w(g), r = s.TOUCH_DOLLY_ROTATE; break; default: r = s.NONE }break; default: r = s.NONE }r !== s.NONE && n.dispatchEvent(vl) } function de(g) { switch (je(g), r) { case s.TOUCH_ROTATE: if (n.enableRotate === !1) return; U(g), n.update(); break; case s.TOUCH_PAN: if (n.enablePan === !1) return; V(g), n.update(); break; case s.TOUCH_DOLLY_PAN: if (n.enableZoom === !1 && n.enablePan === !1) return; E(g), n.update(); break; case s.TOUCH_DOLLY_ROTATE: if (n.enableZoom === !1 && n.enableRotate === !1) return; x(g), n.update(); break; default: r = s.NONE } } function me(g) { n.enabled !== !1 && g.preventDefault() } function Ne(g) { R.push(g.pointerId) } function ze(g) { delete L[g.pointerId]; for (let q = 0; q < R.length; q++)if (R[q] == g.pointerId) { R.splice(q, 1); return } } function Xe(g) { for (let q = 0; q < R.length; q++)if (R[q] == g.pointerId) return !0; return !1 } function je(g) { let q = L[g.pointerId]; q === void 0 && (q = new Ee, L[g.pointerId] = q), q.set(g.pageX, g.pageY) } function Le(g) { const q = g.pointerId === R[0] ? R[1] : R[0]; return L[q] } n.domElement.addEventListener("contextmenu", me), n.domElement.addEventListener("pointerdown", N), n.domElement.addEventListener("pointercancel", H), n.domElement.addEventListener("wheel", K, { passive: !1 }), n.domElement.getRootNode().addEventListener("keydown", ce, { passive: !0, capture: !0 }), this.update() } } function Tf(i, e) { if (e === q_) return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), i; if (e === Wl || e === Xd) { let t = i.getIndex(); if (t === null) { const o = [], a = i.getAttribute("position"); if (a !== void 0) { for (let l = 0; l < a.count; l++)o.push(l); i.setIndex(o), t = i.getIndex() } else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), i } const n = t.count - 2, s = []; if (e === Wl) for (let o = 1; o <= n; o++)s.push(t.getX(0)), s.push(t.getX(o)), s.push(t.getX(o + 1)); else for (let o = 0; o < n; o++)o % 2 === 0 ? (s.push(t.getX(o)), s.push(t.getX(o + 1)), s.push(t.getX(o + 2))) : (s.push(t.getX(o + 2)), s.push(t.getX(o + 1)), s.push(t.getX(o))); s.length / 3 !== n && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."); const r = i.clone(); return r.setIndex(s), r.clearGroups(), r } else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), i } class TE extends wi { constructor(e) { super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function (t) { return new CE(t) }), this.register(function (t) { return new BE(t) }), this.register(function (t) { return new kE(t) }), this.register(function (t) { return new HE(t) }), this.register(function (t) { return new LE(t) }), this.register(function (t) { return new IE(t) }), this.register(function (t) { return new DE(t) }), this.register(function (t) { return new NE(t) }), this.register(function (t) { return new RE(t) }), this.register(function (t) { return new UE(t) }), this.register(function (t) { return new PE(t) }), this.register(function (t) { return new FE(t) }), this.register(function (t) { return new OE(t) }), this.register(function (t) { return new AE(t) }), this.register(function (t) { return new zE(t) }), this.register(function (t) { return new VE(t) }) } load(e, t, n, s) { const r = this; let o; if (this.resourcePath !== "") o = this.resourcePath; else if (this.path !== "") { const c = Er.extractUrlBase(e); o = Er.resolveURL(c, this.path) } else o = Er.extractUrlBase(e); this.manager.itemStart(e); const a = function (c) { s ? s(c) : console.error(c), r.manager.itemError(e), r.manager.itemEnd(e) }, l = new Ur(this.manager); l.setPath(this.path), l.setResponseType("arraybuffer"), l.setRequestHeader(this.requestHeader), l.setWithCredentials(this.withCredentials), l.load(e, function (c) { try { r.parse(c, o, function (u) { t(u), r.manager.itemEnd(e) }, a) } catch (u) { a(u) } }, n, a) } setDRACOLoader(e) { return this.dracoLoader = e, this } setDDSLoader() { throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".') } setKTX2Loader(e) { return this.ktx2Loader = e, this } setMeshoptDecoder(e) { return this.meshoptDecoder = e, this } register(e) { return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this } unregister(e) { return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this } parse(e, t, n, s) { let r; const o = {}, a = {}, l = new TextDecoder; if (typeof e == "string") r = JSON.parse(e); else if (e instanceof ArrayBuffer) if (l.decode(new Uint8Array(e, 0, 4)) === vp) { try { o[qe.KHR_BINARY_GLTF] = new GE(e) } catch (h) { s && s(h); return } r = JSON.parse(o[qe.KHR_BINARY_GLTF].content) } else r = JSON.parse(l.decode(e)); else r = e; if (r.asset === void 0 || r.asset.version[0] < 2) { s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.")); return } const c = new nT(r, { path: t || this.resourcePath || "", crossOrigin: this.crossOrigin, requestHeader: this.requestHeader, manager: this.manager, ktx2Loader: this.ktx2Loader, meshoptDecoder: this.meshoptDecoder }); c.fileLoader.setRequestHeader(this.requestHeader); for (let u = 0; u < this.pluginCallbacks.length; u++) { const h = this.pluginCallbacks[u](c); h.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[h.name] = h, o[h.name] = !0 } if (r.extensionsUsed) for (let u = 0; u < r.extensionsUsed.length; ++u) { const h = r.extensionsUsed[u], f = r.extensionsRequired || []; switch (h) { case qe.KHR_MATERIALS_UNLIT: o[h] = new wE; break; case qe.KHR_DRACO_MESH_COMPRESSION: o[h] = new WE(r, this.dracoLoader); break; case qe.KHR_TEXTURE_TRANSFORM: o[h] = new XE; break; case qe.KHR_MESH_QUANTIZATION: o[h] = new jE; break; default: f.indexOf(h) >= 0 && a[h] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + h + '".') } } c.setExtensions(o), c.setPlugins(a), c.parse(n, s) } parseAsync(e, t) { const n = this; return new Promise(function (s, r) { n.parse(e, t, s, r) }) } } function bE() { let i = {}; return { get: function (e) { return i[e] }, add: function (e, t) { i[e] = t }, remove: function (e) { delete i[e] }, removeAll: function () { i = {} } } } const qe = { KHR_BINARY_GLTF: "KHR_binary_glTF", KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression", KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual", KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat", KHR_MATERIALS_IOR: "KHR_materials_ior", KHR_MATERIALS_SHEEN: "KHR_materials_sheen", KHR_MATERIALS_SPECULAR: "KHR_materials_specular", KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission", KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence", KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy", KHR_MATERIALS_UNLIT: "KHR_materials_unlit", KHR_MATERIALS_VOLUME: "KHR_materials_volume", KHR_TEXTURE_BASISU: "KHR_texture_basisu", KHR_TEXTURE_TRANSFORM: "KHR_texture_transform", KHR_MESH_QUANTIZATION: "KHR_mesh_quantization", KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength", EXT_MATERIALS_BUMP: "EXT_materials_bump", EXT_TEXTURE_WEBP: "EXT_texture_webp", EXT_TEXTURE_AVIF: "EXT_texture_avif", EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression", EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing" }; class AE { constructor(e) { this.parser = e, this.name = qe.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} } } _markDefs() { const e = this.parser, t = this.parser.json.nodes || []; for (let n = 0, s = t.length; n < s; n++) { const r = t[n]; r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, r.extensions[this.name].light) } } _loadLight(e) { const t = this.parser, n = "light:" + e; let s = t.cache.get(n); if (s) return s; const r = t.json, l = ((r.extensions && r.extensions[this.name] || {}).lights || [])[e]; let c; const u = new Re(16777215); l.color !== void 0 && u.setRGB(l.color[0], l.color[1], l.color[2], xt); const h = l.range !== void 0 ? l.range : 0; switch (l.type) { case "directional": c = new xp(u), c.target.position.set(0, 0, -1), c.add(c.target); break; case "point": c = new aE(u), c.distance = h; break; case "spot": c = new rE(u), c.distance = h, l.spot = l.spot || {}, l.spot.innerConeAngle = l.spot.innerConeAngle !== void 0 ? l.spot.innerConeAngle : 0, l.spot.outerConeAngle = l.spot.outerConeAngle !== void 0 ? l.spot.outerConeAngle : Math.PI / 4, c.angle = l.spot.outerConeAngle, c.penumbra = 1 - l.spot.innerConeAngle / l.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target); break; default: throw new Error("THREE.GLTFLoader: Unexpected light type: " + l.type) }return c.position.set(0, 0, 0), c.decay = 2, pi(c, l), l.intensity !== void 0 && (c.intensity = l.intensity), c.name = t.createUniqueName(l.name || "light_" + e), s = Promise.resolve(c), t.cache.add(n, s), s } getDependency(e, t) { if (e === "light") return this._loadLight(t) } createNodeAttachment(e) { const t = this, n = this.parser, r = n.json.nodes[e], a = (r.extensions && r.extensions[this.name] || {}).light; return a === void 0 ? null : this._loadLight(a).then(function (l) { return n._getNodeRef(t.cache, a, l) }) } } class wE { constructor() { this.name = qe.KHR_MATERIALS_UNLIT } getMaterialType() { return ji } extendParams(e, t, n) { const s = []; e.color = new Re(1, 1, 1), e.opacity = 1; const r = t.pbrMetallicRoughness; if (r) { if (Array.isArray(r.baseColorFactor)) { const o = r.baseColorFactor; e.color.setRGB(o[0], o[1], o[2], xt), e.opacity = o[3] } r.baseColorTexture !== void 0 && s.push(n.assignTexture(e, "map", r.baseColorTexture, Tt)) } return Promise.all(s) } } class RE { constructor(e) { this.parser = e, this.name = qe.KHR_MATERIALS_EMISSIVE_STRENGTH } extendMaterialParams(e, t) { const s = this.parser.json.materials[e]; if (!s.extensions || !s.extensions[this.name]) return Promise.resolve(); const r = s.extensions[this.name].emissiveStrength; return r !== void 0 && (t.emissiveIntensity = r), Promise.resolve() } } class CE { constructor(e) { this.parser = e, this.name = qe.KHR_MATERIALS_CLEARCOAT } getMaterialType(e) { const n = this.parser.json.materials[e]; return !n.extensions || !n.extensions[this.name] ? null : $n } extendMaterialParams(e, t) { const n = this.parser, s = n.json.materials[e]; if (!s.extensions || !s.extensions[this.name]) return Promise.resolve(); const r = [], o = s.extensions[this.name]; if (o.clearcoatFactor !== void 0 && (t.clearcoat = o.clearcoatFactor), o.clearcoatTexture !== void 0 && r.push(n.assignTexture(t, "clearcoatMap", o.clearcoatTexture)), o.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = o.clearcoatRoughnessFactor), o.clearcoatRoughnessTexture !== void 0 && r.push(n.assignTexture(t, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture)), o.clearcoatNormalTexture !== void 0 && (r.push(n.assignTexture(t, "clearcoatNormalMap", o.clearcoatNormalTexture)), o.clearcoatNormalTexture.scale !== void 0)) { const a = o.clearcoatNormalTexture.scale; t.clearcoatNormalScale = new Ee(a, a) } return Promise.all(r) } } class PE { constructor(e) { this.parser = e, this.name = qe.KHR_MATERIALS_IRIDESCENCE } getMaterialType(e) { const n = this.parser.json.materials[e]; return !n.extensions || !n.extensions[this.name] ? null : $n } extendMaterialParams(e, t) { const n = this.parser, s = n.json.materials[e]; if (!s.extensions || !s.extensions[this.name]) return Promise.resolve(); const r = [], o = s.extensions[this.name]; return o.iridescenceFactor !== void 0 && (t.iridescence = o.iridescenceFactor), o.iridescenceTexture !== void 0 && r.push(n.assignTexture(t, "iridescenceMap", o.iridescenceTexture)), o.iridescenceIor !== void 0 && (t.iridescenceIOR = o.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), o.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum), o.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum), o.iridescenceThicknessTexture !== void 0 && r.push(n.assignTexture(t, "iridescenceThicknessMap", o.iridescenceThicknessTexture)), Promise.all(r) } } class LE { constructor(e) { this.parser = e, this.name = qe.KHR_MATERIALS_SHEEN } getMaterialType(e) { const n = this.parser.json.materials[e]; return !n.extensions || !n.extensions[this.name] ? null : $n } extendMaterialParams(e, t) { const n = this.parser, s = n.json.materials[e]; if (!s.extensions || !s.extensions[this.name]) return Promise.resolve(); const r = []; t.sheenColor = new Re(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1; const o = s.extensions[this.name]; if (o.sheenColorFactor !== void 0) { const a = o.sheenColorFactor; t.sheenColor.setRGB(a[0], a[1], a[2], xt) } return o.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = o.sheenRoughnessFactor), o.sheenColorTexture !== void 0 && r.push(n.assignTexture(t, "sheenColorMap", o.sheenColorTexture, Tt)), o.sheenRoughnessTexture !== void 0 && r.push(n.assignTexture(t, "sheenRoughnessMap", o.sheenRoughnessTexture)), Promise.all(r) } } class IE { constructor(e) { this.parser = e, this.name = qe.KHR_MATERIALS_TRANSMISSION } getMaterialType(e) { const n = this.parser.json.materials[e]; return !n.extensions || !n.extensions[this.name] ? null : $n } extendMaterialParams(e, t) { const n = this.parser, s = n.json.materials[e]; if (!s.extensions || !s.extensions[this.name]) return Promise.resolve(); const r = [], o = s.extensions[this.name]; return o.transmissionFactor !== void 0 && (t.transmission = o.transmissionFactor), o.transmissionTexture !== void 0 && r.push(n.assignTexture(t, "transmissionMap", o.transmissionTexture)), Promise.all(r) } } class DE { constructor(e) { this.parser = e, this.name = qe.KHR_MATERIALS_VOLUME } getMaterialType(e) { const n = this.parser.json.materials[e]; return !n.extensions || !n.extensions[this.name] ? null : $n } extendMaterialParams(e, t) { const n = this.parser, s = n.json.materials[e]; if (!s.extensions || !s.extensions[this.name]) return Promise.resolve(); const r = [], o = s.extensions[this.name]; t.thickness = o.thicknessFactor !== void 0 ? o.thicknessFactor : 0, o.thicknessTexture !== void 0 && r.push(n.assignTexture(t, "thicknessMap", o.thicknessTexture)), t.attenuationDistance = o.attenuationDistance || 1 / 0; const a = o.attenuationColor || [1, 1, 1]; return t.attenuationColor = new Re().setRGB(a[0], a[1], a[2], xt), Promise.all(r) } } class NE { constructor(e) { this.parser = e, this.name = qe.KHR_MATERIALS_IOR } getMaterialType(e) { const n = this.parser.json.materials[e]; return !n.extensions || !n.extensions[this.name] ? null : $n } extendMaterialParams(e, t) { const s = this.parser.json.materials[e]; if (!s.extensions || !s.extensions[this.name]) return Promise.resolve(); const r = s.extensions[this.name]; return t.ior = r.ior !== void 0 ? r.ior : 1.5, Promise.resolve() } } class UE { constructor(e) { this.parser = e, this.name = qe.KHR_MATERIALS_SPECULAR } getMaterialType(e) { const n = this.parser.json.materials[e]; return !n.extensions || !n.extensions[this.name] ? null : $n } extendMaterialParams(e, t) { const n = this.parser, s = n.json.materials[e]; if (!s.extensions || !s.extensions[this.name]) return Promise.resolve(); const r = [], o = s.extensions[this.name]; t.specularIntensity = o.specularFactor !== void 0 ? o.specularFactor : 1, o.specularTexture !== void 0 && r.push(n.assignTexture(t, "specularIntensityMap", o.specularTexture)); const a = o.specularColorFactor || [1, 1, 1]; return t.specularColor = new Re().setRGB(a[0], a[1], a[2], xt), o.specularColorTexture !== void 0 && r.push(n.assignTexture(t, "specularColorMap", o.specularColorTexture, Tt)), Promise.all(r) } } class OE { constructor(e) { this.parser = e, this.name = qe.EXT_MATERIALS_BUMP } getMaterialType(e) { const n = this.parser.json.materials[e]; return !n.extensions || !n.extensions[this.name] ? null : $n } extendMaterialParams(e, t) { const n = this.parser, s = n.json.materials[e]; if (!s.extensions || !s.extensions[this.name]) return Promise.resolve(); const r = [], o = s.extensions[this.name]; return t.bumpScale = o.bumpFactor !== void 0 ? o.bumpFactor : 1, o.bumpTexture !== void 0 && r.push(n.assignTexture(t, "bumpMap", o.bumpTexture)), Promise.all(r) } } class FE { constructor(e) { this.parser = e, this.name = qe.KHR_MATERIALS_ANISOTROPY } getMaterialType(e) { const n = this.parser.json.materials[e]; return !n.extensions || !n.extensions[this.name] ? null : $n } extendMaterialParams(e, t) { const n = this.parser, s = n.json.materials[e]; if (!s.extensions || !s.extensions[this.name]) return Promise.resolve(); const r = [], o = s.extensions[this.name]; return o.anisotropyStrength !== void 0 && (t.anisotropy = o.anisotropyStrength), o.anisotropyRotation !== void 0 && (t.anisotropyRotation = o.anisotropyRotation), o.anisotropyTexture !== void 0 && r.push(n.assignTexture(t, "anisotropyMap", o.anisotropyTexture)), Promise.all(r) } } class BE { constructor(e) { this.parser = e, this.name = qe.KHR_TEXTURE_BASISU } loadTexture(e) { const t = this.parser, n = t.json, s = n.textures[e]; if (!s.extensions || !s.extensions[this.name]) return null; const r = s.extensions[this.name], o = t.options.ktx2Loader; if (!o) { if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures"); return null } return t.loadTextureImage(e, r.source, o) } } class kE { constructor(e) { this.parser = e, this.name = qe.EXT_TEXTURE_WEBP, this.isSupported = null } loadTexture(e) { const t = this.name, n = this.parser, s = n.json, r = s.textures[e]; if (!r.extensions || !r.extensions[t]) return null; const o = r.extensions[t], a = s.images[o.source]; let l = n.textureLoader; if (a.uri) { const c = n.options.manager.getHandler(a.uri); c !== null && (l = c) } return this.detectSupport().then(function (c) { if (c) return n.loadTextureImage(e, o.source, l); if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0) throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported."); return n.loadTexture(e) }) } detectSupport() { return this.isSupported || (this.isSupported = new Promise(function (e) { const t = new Image; t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function () { e(t.height === 1) } })), this.isSupported } } class HE { constructor(e) { this.parser = e, this.name = qe.EXT_TEXTURE_AVIF, this.isSupported = null } loadTexture(e) { const t = this.name, n = this.parser, s = n.json, r = s.textures[e]; if (!r.extensions || !r.extensions[t]) return null; const o = r.extensions[t], a = s.images[o.source]; let l = n.textureLoader; if (a.uri) { const c = n.options.manager.getHandler(a.uri); c !== null && (l = c) } return this.detectSupport().then(function (c) { if (c) return n.loadTextureImage(e, o.source, l); if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0) throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported."); return n.loadTexture(e) }) } detectSupport() { return this.isSupported || (this.isSupported = new Promise(function (e) { const t = new Image; t.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", t.onload = t.onerror = function () { e(t.height === 1) } })), this.isSupported } } class zE { constructor(e) { this.name = qe.EXT_MESHOPT_COMPRESSION, this.parser = e } loadBufferView(e) { const t = this.parser.json, n = t.bufferViews[e]; if (n.extensions && n.extensions[this.name]) { const s = n.extensions[this.name], r = this.parser.getDependency("buffer", s.buffer), o = this.parser.options.meshoptDecoder; if (!o || !o.supported) { if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0) throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files"); return null } return r.then(function (a) { const l = s.byteOffset || 0, c = s.byteLength || 0, u = s.count, h = s.byteStride, f = new Uint8Array(a, l, c); return o.decodeGltfBufferAsync ? o.decodeGltfBufferAsync(u, h, f, s.mode, s.filter).then(function (d) { return d.buffer }) : o.ready.then(function () { const d = new ArrayBuffer(u * h); return o.decodeGltfBuffer(new Uint8Array(d), u, h, f, s.mode, s.filter), d }) }) } else return null } } class VE { constructor(e) { this.name = qe.EXT_MESH_GPU_INSTANCING, this.parser = e } createNodeMesh(e) { const t = this.parser.json, n = t.nodes[e]; if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0) return null; const s = t.meshes[n.mesh]; for (const c of s.primitives) if (c.mode !== sn.TRIANGLES && c.mode !== sn.TRIANGLE_STRIP && c.mode !== sn.TRIANGLE_FAN && c.mode !== void 0) return null; const o = n.extensions[this.name].attributes, a = [], l = {}; for (const c in o) a.push(this.parser.getDependency("accessor", o[c]).then(u => (l[c] = u, l[c]))); return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then(c => { const u = c.pop(), h = u.isGroup ? u.children : [u], f = c[0].count, d = []; for (const _ of h) { const v = new Oe, p = new B, m = new Pn, b = new B(1, 1, 1), y = new BS(_.geometry, _.material, f); for (let A = 0; A < f; A++)l.TRANSLATION && p.fromBufferAttribute(l.TRANSLATION, A), l.ROTATION && m.fromBufferAttribute(l.ROTATION, A), l.SCALE && b.fromBufferAttribute(l.SCALE, A), y.setMatrixAt(A, v.compose(p, m, b)); for (const A in l) if (A === "_COLOR_0") { const O = l[A]; y.instanceColor = new ql(O.array, O.itemSize, O.normalized) } else A !== "TRANSLATION" && A !== "ROTATION" && A !== "SCALE" && _.geometry.setAttribute(A, l[A]); ot.prototype.copy.call(y, _), this.parser.assignFinalMaterial(y), d.push(y) } return u.isGroup ? (u.clear(), u.add(...d), u) : d[0] })) } } const vp = "glTF", dr = 12, bf = { JSON: 1313821514, BIN: 5130562 }; class GE { constructor(e) { this.name = qe.KHR_BINARY_GLTF, this.content = null, this.body = null; const t = new DataView(e, 0, dr), n = new TextDecoder; if (this.header = { magic: n.decode(new Uint8Array(e.slice(0, 4))), version: t.getUint32(4, !0), length: t.getUint32(8, !0) }, this.header.magic !== vp) throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header."); if (this.header.version < 2) throw new Error("THREE.GLTFLoader: Legacy binary file detected."); const s = this.header.length - dr, r = new DataView(e, dr); let o = 0; for (; o < s;) { const a = r.getUint32(o, !0); o += 4; const l = r.getUint32(o, !0); if (o += 4, l === bf.JSON) { const c = new Uint8Array(e, dr + o, a); this.content = n.decode(c) } else if (l === bf.BIN) { const c = dr + o; this.body = e.slice(c, c + a) } o += a } if (this.content === null) throw new Error("THREE.GLTFLoader: JSON content not found.") } } class WE { constructor(e, t) { if (!t) throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided."); this.name = qe.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload() } decodePrimitive(e, t) { const n = this.json, s = this.dracoLoader, r = e.extensions[this.name].bufferView, o = e.extensions[this.name].attributes, a = {}, l = {}, c = {}; for (const u in o) { const h = Jl[u] || u.toLowerCase(); a[h] = o[u] } for (const u in e.attributes) { const h = Jl[u] || u.toLowerCase(); if (o[u] !== void 0) { const f = n.accessors[e.attributes[u]], d = Us[f.componentType]; c[h] = d.name, l[h] = f.normalized === !0 } } return t.getDependency("bufferView", r).then(function (u) { return new Promise(function (h, f) { s.decodeDracoFile(u, function (d) { for (const _ in d.attributes) { const v = d.attributes[_], p = l[_]; p !== void 0 && (v.normalized = p) } h(d) }, a, c, xt, f) }) }) } } class XE { constructor() { this.name = qe.KHR_TEXTURE_TRANSFORM } extendTexture(e, t) { return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e } } class jE { constructor() { this.name = qe.KHR_MESH_QUANTIZATION } } class Mp extends kr { constructor(e, t, n, s) { super(e, t, n, s) } copySampleValue_(e) { const t = this.resultBuffer, n = this.sampleValues, s = this.valueSize, r = e * s * 3 + s; for (let o = 0; o !== s; o++)t[o] = n[r + o]; return t } interpolate_(e, t, n, s) { const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, l = a * 2, c = a * 3, u = s - t, h = (n - t) / u, f = h * h, d = f * h, _ = e * c, v = _ - c, p = -2 * d + 3 * f, m = d - f, b = 1 - p, y = m - f + h; for (let A = 0; A !== a; A++) { const O = o[v + A + a], P = o[v + A + l] * u, R = o[_ + A + a], L = o[_ + A] * u; r[A] = b * O + y * P + p * R + m * L } return r } } const YE = new Pn; class qE extends Mp { interpolate_(e, t, n, s) { const r = super.interpolate_(e, t, n, s); return YE.fromArray(r).normalize().toArray(r), r } } const sn = { FLOAT: 5126, FLOAT_MAT3: 35675, FLOAT_MAT4: 35676, FLOAT_VEC2: 35664, FLOAT_VEC3: 35665, FLOAT_VEC4: 35666, LINEAR: 9729, REPEAT: 10497, SAMPLER_2D: 35678, POINTS: 0, LINES: 1, LINE_LOOP: 2, LINE_STRIP: 3, TRIANGLES: 4, TRIANGLE_STRIP: 5, TRIANGLE_FAN: 6, UNSIGNED_BYTE: 5121, UNSIGNED_SHORT: 5123 }, Us = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array }, Af = { 9728: Rt, 9729: At, 9984: Od, 9985: Fo, 9986: mr, 9987: wn }, wf = { 33071: An, 33648: Ko, 10497: Ai }, Ml = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 }, Jl = { POSITION: "position", NORMAL: "normal", TANGENT: "tangent", TEXCOORD_0: "uv", TEXCOORD_1: "uv1", TEXCOORD_2: "uv2", TEXCOORD_3: "uv3", COLOR_0: "color", WEIGHTS_0: "skinWeight", JOINTS_0: "skinIndex" }, li = { scale: "scale", translation: "position", rotation: "quaternion", weights: "morphTargetInfluences" }, KE = { CUBICSPLINE: void 0, LINEAR: Vs, STEP: Ir }, yl = { OPAQUE: "OPAQUE", MASK: "MASK", BLEND: "BLEND" }; function $E(i) { return i.DefaultMaterial === void 0 && (i.DefaultMaterial = new Uc({ color: 16777215, emissive: 0, metalness: 1, roughness: 1, transparent: !1, depthTest: !0, side: Yn })), i.DefaultMaterial } function Hi(i, e, t) { for (const n in t.extensions) i[n] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[n] = t.extensions[n]) } function pi(i, e) { e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(i.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras)) } function ZE(i, e, t) { let n = !1, s = !1, r = !1; for (let c = 0, u = e.length; c < u; c++) { const h = e[c]; if (h.POSITION !== void 0 && (n = !0), h.NORMAL !== void 0 && (s = !0), h.COLOR_0 !== void 0 && (r = !0), n && s && r) break } if (!n && !s && !r) return Promise.resolve(i); const o = [], a = [], l = []; for (let c = 0, u = e.length; c < u; c++) { const h = e[c]; if (n) { const f = h.POSITION !== void 0 ? t.getDependency("accessor", h.POSITION) : i.attributes.position; o.push(f) } if (s) { const f = h.NORMAL !== void 0 ? t.getDependency("accessor", h.NORMAL) : i.attributes.normal; a.push(f) } if (r) { const f = h.COLOR_0 !== void 0 ? t.getDependency("accessor", h.COLOR_0) : i.attributes.color; l.push(f) } } return Promise.all([Promise.all(o), Promise.all(a), Promise.all(l)]).then(function (c) { const u = c[0], h = c[1], f = c[2]; return n && (i.morphAttributes.position = u), s && (i.morphAttributes.normal = h), r && (i.morphAttributes.color = f), i.morphTargetsRelative = !0, i }) } function JE(i, e) { if (i.updateMorphTargets(), e.weights !== void 0) for (let t = 0, n = e.weights.length; t < n; t++)i.morphTargetInfluences[t] = e.weights[t]; if (e.extras && Array.isArray(e.extras.targetNames)) { const t = e.extras.targetNames; if (i.morphTargetInfluences.length === t.length) { i.morphTargetDictionary = {}; for (let n = 0, s = t.length; n < s; n++)i.morphTargetDictionary[t[n]] = n } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.") } } function QE(i) { let e; const t = i.extensions && i.extensions[qe.KHR_DRACO_MESH_COMPRESSION]; if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + Sl(t.attributes) : e = i.indices + ":" + Sl(i.attributes) + ":" + i.mode, i.targets !== void 0) for (let n = 0, s = i.targets.length; n < s; n++)e += ":" + Sl(i.targets[n]); return e } function Sl(i) { let e = ""; const t = Object.keys(i).sort(); for (let n = 0, s = t.length; n < s; n++)e += t[n] + ":" + i[t[n]] + ";"; return e } function Ql(i) { switch (i) { case Int8Array: return 1 / 127; case Uint8Array: return 1 / 255; case Int16Array: return 1 / 32767; case Uint16Array: return 1 / 65535; default: throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.") } } function eT(i) { return i.search(/\.jpe?g($|\?)/i) > 0 || i.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : i.search(/\.webp($|\?)/i) > 0 || i.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png" } const tT = new Oe; class nT { constructor(e = {}, t = {}) { this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new bE, this.associations = new Map, this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {}; let n = !1, s = !1, r = -1; typeof navigator < "u" && (n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, s = navigator.userAgent.indexOf("Firefox") > -1, r = s ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || n || s && r < 98 ? this.textureLoader = new _p(this.options.manager) : this.textureLoader = new uE(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Ur(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0) } setExtensions(e) { this.extensions = e } setPlugins(e) { this.plugins = e } parse(e, t) { const n = this, s = this.json, r = this.extensions; this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function (o) { return o._markDefs && o._markDefs() }), Promise.all(this._invokeAll(function (o) { return o.beforeRoot && o.beforeRoot() })).then(function () { return Promise.all([n.getDependencies("scene"), n.getDependencies("animation"), n.getDependencies("camera")]) }).then(function (o) { const a = { scene: o[0][s.scene || 0], scenes: o[0], animations: o[1], cameras: o[2], asset: s.asset, parser: n, userData: {} }; return Hi(r, a, s), pi(a, s), Promise.all(n._invokeAll(function (l) { return l.afterRoot && l.afterRoot(a) })).then(function () { for (const l of a.scenes) l.updateMatrixWorld(); e(a) }) }).catch(t) } _markDefs() { const e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || []; for (let s = 0, r = t.length; s < r; s++) { const o = t[s].joints; for (let a = 0, l = o.length; a < l; a++)e[o[a]].isBone = !0 } for (let s = 0, r = e.length; s < r; s++) { const o = e[s]; o.mesh !== void 0 && (this._addNodeRef(this.meshCache, o.mesh), o.skin !== void 0 && (n[o.mesh].isSkinnedMesh = !0)), o.camera !== void 0 && this._addNodeRef(this.cameraCache, o.camera) } } _addNodeRef(e, t) { t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++) } _getNodeRef(e, t, n) { if (e.refs[t] <= 1) return n; const s = n.clone(), r = (o, a) => { const l = this.associations.get(o); l != null && this.associations.set(a, l); for (const [c, u] of o.children.entries()) r(u, a.children[c]) }; return r(n, s), s.name += "_instance_" + e.uses[t]++, s } _invokeOne(e) { const t = Object.values(this.plugins); t.push(this); for (let n = 0; n < t.length; n++) { const s = e(t[n]); if (s) return s } return null } _invokeAll(e) { const t = Object.values(this.plugins); t.unshift(this); const n = []; for (let s = 0; s < t.length; s++) { const r = e(t[s]); r && n.push(r) } return n } getDependency(e, t) { const n = e + ":" + t; let s = this.cache.get(n); if (!s) { switch (e) { case "scene": s = this.loadScene(t); break; case "node": s = this._invokeOne(function (r) { return r.loadNode && r.loadNode(t) }); break; case "mesh": s = this._invokeOne(function (r) { return r.loadMesh && r.loadMesh(t) }); break; case "accessor": s = this.loadAccessor(t); break; case "bufferView": s = this._invokeOne(function (r) { return r.loadBufferView && r.loadBufferView(t) }); break; case "buffer": s = this.loadBuffer(t); break; case "material": s = this._invokeOne(function (r) { return r.loadMaterial && r.loadMaterial(t) }); break; case "texture": s = this._invokeOne(function (r) { return r.loadTexture && r.loadTexture(t) }); break; case "skin": s = this.loadSkin(t); break; case "animation": s = this._invokeOne(function (r) { return r.loadAnimation && r.loadAnimation(t) }); break; case "camera": s = this.loadCamera(t); break; default: if (s = this._invokeOne(function (r) { return r != this && r.getDependency && r.getDependency(e, t) }), !s) throw new Error("Unknown type: " + e); break }this.cache.add(n, s) } return s } getDependencies(e) { let t = this.cache.get(e); if (!t) { const n = this, s = this.json[e + (e === "mesh" ? "es" : "s")] || []; t = Promise.all(s.map(function (r, o) { return n.getDependency(e, o) })), this.cache.add(e, t) } return t } loadBuffer(e) { const t = this.json.buffers[e], n = this.fileLoader; if (t.type && t.type !== "arraybuffer") throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported."); if (t.uri === void 0 && e === 0) return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body); const s = this.options; return new Promise(function (r, o) { n.load(Er.resolveURL(t.uri, s.path), r, void 0, function () { o(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".')) }) }) } loadBufferView(e) { const t = this.json.bufferViews[e]; return this.getDependency("buffer", t.buffer).then(function (n) { const s = t.byteLength || 0, r = t.byteOffset || 0; return n.slice(r, r + s) }) } loadAccessor(e) { const t = this, n = this.json, s = this.json.accessors[e]; if (s.bufferView === void 0 && s.sparse === void 0) { const o = Ml[s.type], a = Us[s.componentType], l = s.normalized === !0, c = new a(s.count * o); return Promise.resolve(new Ct(c, o, l)) } const r = []; return s.bufferView !== void 0 ? r.push(this.getDependency("bufferView", s.bufferView)) : r.push(null), s.sparse !== void 0 && (r.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(r).then(function (o) { const a = o[0], l = Ml[s.type], c = Us[s.componentType], u = c.BYTES_PER_ELEMENT, h = u * l, f = s.byteOffset || 0, d = s.bufferView !== void 0 ? n.bufferViews[s.bufferView].byteStride : void 0, _ = s.normalized === !0; let v, p; if (d && d !== h) { const m = Math.floor(f / d), b = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + m + ":" + s.count; let y = t.cache.get(b); y || (v = new c(a, m * d, s.count * d / u), y = new cp(v, d / u), t.cache.add(b, y)), p = new Nr(y, l, f % d / u, _) } else a === null ? v = new c(s.count * l) : v = new c(a, f, s.count * l), p = new Ct(v, l, _); if (s.sparse !== void 0) { const m = Ml.SCALAR, b = Us[s.sparse.indices.componentType], y = s.sparse.indices.byteOffset || 0, A = s.sparse.values.byteOffset || 0, O = new b(o[1], y, s.sparse.count * m), P = new c(o[2], A, s.sparse.count * l); a !== null && (p = new Ct(p.array.slice(), p.itemSize, p.normalized)); for (let R = 0, L = O.length; R < L; R++) { const S = O[R]; if (p.setX(S, P[R * l]), l >= 2 && p.setY(S, P[R * l + 1]), l >= 3 && p.setZ(S, P[R * l + 2]), l >= 4 && p.setW(S, P[R * l + 3]), l >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.") } } return p }) } loadTexture(e) { const t = this.json, n = this.options, r = t.textures[e].source, o = t.images[r]; let a = this.textureLoader; if (o.uri) { const l = n.manager.getHandler(o.uri); l !== null && (a = l) } return this.loadTextureImage(e, r, a) } loadTextureImage(e, t, n) { const s = this, r = this.json, o = r.textures[e], a = r.images[t], l = (a.uri || a.bufferView) + ":" + o.sampler; if (this.textureCache[l]) return this.textureCache[l]; const c = this.loadImageSource(t, n).then(function (u) { u.flipY = !1, u.name = o.name || a.name || "", u.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (u.name = a.uri); const f = (r.samplers || {})[o.sampler] || {}; return u.magFilter = Af[f.magFilter] || At, u.minFilter = Af[f.minFilter] || wn, u.wrapS = wf[f.wrapS] || Ai, u.wrapT = wf[f.wrapT] || Ai, s.associations.set(u, { textures: e }), u }).catch(function () { return null }); return this.textureCache[l] = c, c } loadImageSource(e, t) { const n = this, s = this.json, r = this.options; if (this.sourceCache[e] !== void 0) return this.sourceCache[e].then(h => h.clone()); const o = s.images[e], a = self.URL || self.webkitURL; let l = o.uri || "", c = !1; if (o.bufferView !== void 0) l = n.getDependency("bufferView", o.bufferView).then(function (h) { c = !0; const f = new Blob([h], { type: o.mimeType }); return l = a.createObjectURL(f), l }); else if (o.uri === void 0) throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView"); const u = Promise.resolve(l).then(function (h) { return new Promise(function (f, d) { let _ = f; t.isImageBitmapLoader === !0 && (_ = function (v) { const p = new wt(v); p.needsUpdate = !0, f(p) }), t.load(Er.resolveURL(h, r.path), _, void 0, d) }) }).then(function (h) { return c === !0 && a.revokeObjectURL(l), h.userData.mimeType = o.mimeType || eT(o.uri), h }).catch(function (h) { throw console.error("THREE.GLTFLoader: Couldn't load texture", l), h }); return this.sourceCache[e] = u, u } assignTexture(e, t, n, s) { const r = this; return this.getDependency("texture", n.index).then(function (o) { if (!o) return null; if (n.texCoord !== void 0 && n.texCoord > 0 && (o = o.clone(), o.channel = n.texCoord), r.extensions[qe.KHR_TEXTURE_TRANSFORM]) { const a = n.extensions !== void 0 ? n.extensions[qe.KHR_TEXTURE_TRANSFORM] : void 0; if (a) { const l = r.associations.get(o); o = r.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(o, a), r.associations.set(o, l) } } return s !== void 0 && (o.colorSpace = s), e[t] = o, o }) } assignFinalMaterial(e) { const t = e.geometry; let n = e.material; const s = t.attributes.tangent === void 0, r = t.attributes.color !== void 0, o = t.attributes.normal === void 0; if (e.isPoints) { const a = "PointsMaterial:" + n.uuid; let l = this.cache.get(a); l || (l = new pp, an.prototype.copy.call(l, n), l.color.copy(n.color), l.map = n.map, l.sizeAttenuation = !1, this.cache.add(a, l)), n = l } else if (e.isLine) { const a = "LineBasicMaterial:" + n.uuid; let l = this.cache.get(a); l || (l = new dp, an.prototype.copy.call(l, n), l.color.copy(n.color), l.map = n.map, this.cache.add(a, l)), n = l } if (s || r || o) { let a = "ClonedMaterial:" + n.uuid + ":"; s && (a += "derivative-tangents:"), r && (a += "vertex-colors:"), o && (a += "flat-shading:"); let l = this.cache.get(a); l || (l = n.clone(), r && (l.vertexColors = !0), o && (l.flatShading = !0), s && (l.normalScale && (l.normalScale.y *= -1), l.clearcoatNormalScale && (l.clearcoatNormalScale.y *= -1)), this.cache.add(a, l), this.associations.set(l, this.associations.get(n))), n = l } e.material = n } getMaterialType() { return Uc } loadMaterial(e) { const t = this, n = this.json, s = this.extensions, r = n.materials[e]; let o; const a = {}, l = r.extensions || {}, c = []; if (l[qe.KHR_MATERIALS_UNLIT]) { const h = s[qe.KHR_MATERIALS_UNLIT]; o = h.getMaterialType(), c.push(h.extendParams(a, r, t)) } else { const h = r.pbrMetallicRoughness || {}; if (a.color = new Re(1, 1, 1), a.opacity = 1, Array.isArray(h.baseColorFactor)) { const f = h.baseColorFactor; a.color.setRGB(f[0], f[1], f[2], xt), a.opacity = f[3] } h.baseColorTexture !== void 0 && c.push(t.assignTexture(a, "map", h.baseColorTexture, Tt)), a.metalness = h.metallicFactor !== void 0 ? h.metallicFactor : 1, a.roughness = h.roughnessFactor !== void 0 ? h.roughnessFactor : 1, h.metallicRoughnessTexture !== void 0 && (c.push(t.assignTexture(a, "metalnessMap", h.metallicRoughnessTexture)), c.push(t.assignTexture(a, "roughnessMap", h.metallicRoughnessTexture))), o = this._invokeOne(function (f) { return f.getMaterialType && f.getMaterialType(e) }), c.push(Promise.all(this._invokeAll(function (f) { return f.extendMaterialParams && f.extendMaterialParams(e, a) }))) } r.doubleSided === !0 && (a.side = bn); const u = r.alphaMode || yl.OPAQUE; if (u === yl.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, u === yl.MASK && (a.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : .5)), r.normalTexture !== void 0 && o !== ji && (c.push(t.assignTexture(a, "normalMap", r.normalTexture)), a.normalScale = new Ee(1, 1), r.normalTexture.scale !== void 0)) { const h = r.normalTexture.scale; a.normalScale.set(h, h) } if (r.occlusionTexture !== void 0 && o !== ji && (c.push(t.assignTexture(a, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && o !== ji) { const h = r.emissiveFactor; a.emissive = new Re().setRGB(h[0], h[1], h[2], xt) } return r.emissiveTexture !== void 0 && o !== ji && c.push(t.assignTexture(a, "emissiveMap", r.emissiveTexture, Tt)), Promise.all(c).then(function () { const h = new o(a); return r.name && (h.name = r.name), pi(h, r), t.associations.set(h, { materials: e }), r.extensions && Hi(s, h, r), h }) } createUniqueName(e) { const t = et.sanitizeNodeName(e || ""); return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t) } loadGeometries(e) { const t = this, n = this.extensions, s = this.primitiveCache; function r(a) { return n[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function (l) { return Rf(l, a, t) }) } const o = []; for (let a = 0, l = e.length; a < l; a++) { const c = e[a], u = QE(c), h = s[u]; if (h) o.push(h.promise); else { let f; c.extensions && c.extensions[qe.KHR_DRACO_MESH_COMPRESSION] ? f = r(c) : f = Rf(new Jt, c, t), s[u] = { primitive: c, promise: f }, o.push(f) } } return Promise.all(o) } loadMesh(e) { const t = this, n = this.json, s = this.extensions, r = n.meshes[e], o = r.primitives, a = []; for (let l = 0, c = o.length; l < c; l++) { const u = o[l].material === void 0 ? $E(this.cache) : this.getDependency("material", o[l].material); a.push(u) } return a.push(t.loadGeometries(o)), Promise.all(a).then(function (l) { const c = l.slice(0, l.length - 1), u = l[l.length - 1], h = []; for (let d = 0, _ = u.length; d < _; d++) { const v = u[d], p = o[d]; let m; const b = c[d]; if (p.mode === sn.TRIANGLES || p.mode === sn.TRIANGLE_STRIP || p.mode === sn.TRIANGLE_FAN || p.mode === void 0) m = r.isSkinnedMesh === !0 ? new US(v, b) : new Gt(v, b), m.isSkinnedMesh === !0 && m.normalizeSkinWeights(), p.mode === sn.TRIANGLE_STRIP ? m.geometry = Tf(m.geometry, Xd) : p.mode === sn.TRIANGLE_FAN && (m.geometry = Tf(m.geometry, Wl)); else if (p.mode === sn.LINES) m = new kS(v, b); else if (p.mode === sn.LINE_STRIP) m = new Nc(v, b); else if (p.mode === sn.LINE_LOOP) m = new HS(v, b); else if (p.mode === sn.POINTS) m = new zS(v, b); else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + p.mode); Object.keys(m.geometry.morphAttributes).length > 0 && JE(m, r), m.name = t.createUniqueName(r.name || "mesh_" + e), pi(m, r), p.extensions && Hi(s, m, p), t.assignFinalMaterial(m), h.push(m) } for (let d = 0, _ = h.length; d < _; d++)t.associations.set(h[d], { meshes: e, primitives: d }); if (h.length === 1) return r.extensions && Hi(s, h[0], r), h[0]; const f = new Yi; r.extensions && Hi(s, f, r), t.associations.set(f, { meshes: e }); for (let d = 0, _ = h.length; d < _; d++)f.add(h[d]); return f }) } loadCamera(e) { let t; const n = this.json.cameras[e], s = n[n.type]; if (!s) { console.warn("THREE.GLTFLoader: Missing camera parameters."); return } return n.type === "perspective" ? t = new kt(wc.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : n.type === "orthographic" && (t = new ga(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), n.name && (t.name = this.createUniqueName(n.name)), pi(t, n), Promise.resolve(t) } loadSkin(e) { const t = this.json.skins[e], n = []; for (let s = 0, r = t.joints.length; s < r; s++)n.push(this._loadNodeShallow(t.joints[s])); return t.inverseBindMatrices !== void 0 ? n.push(this.getDependency("accessor", t.inverseBindMatrices)) : n.push(null), Promise.all(n).then(function (s) { const r = s.pop(), o = s, a = [], l = []; for (let c = 0, u = o.length; c < u; c++) { const h = o[c]; if (h) { a.push(h); const f = new Oe; r !== null && f.fromArray(r.array, c * 16), l.push(f) } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[c]) } return new Dc(a, l) }) } loadAnimation(e) { const t = this.json, n = this, s = t.animations[e], r = s.name ? s.name : "animation_" + e, o = [], a = [], l = [], c = [], u = []; for (let h = 0, f = s.channels.length; h < f; h++) { const d = s.channels[h], _ = s.samplers[d.sampler], v = d.target, p = v.node, m = s.parameters !== void 0 ? s.parameters[_.input] : _.input, b = s.parameters !== void 0 ? s.parameters[_.output] : _.output; v.node !== void 0 && (o.push(this.getDependency("node", p)), a.push(this.getDependency("accessor", m)), l.push(this.getDependency("accessor", b)), c.push(_), u.push(v)) } return Promise.all([Promise.all(o), Promise.all(a), Promise.all(l), Promise.all(c), Promise.all(u)]).then(function (h) { const f = h[0], d = h[1], _ = h[2], v = h[3], p = h[4], m = []; for (let b = 0, y = f.length; b < y; b++) { const A = f[b], O = d[b], P = _[b], R = v[b], L = p[b]; if (A === void 0) continue; A.updateMatrix && A.updateMatrix(); const S = n._createAnimationTracks(A, O, P, R, L); if (S) for (let M = 0; M < S.length; M++)m.push(S[M]) } return new KS(r, void 0, m) }) } createNodeMesh(e) { const t = this.json, n = this, s = t.nodes[e]; return s.mesh === void 0 ? null : n.getDependency("mesh", s.mesh).then(function (r) { const o = n._getNodeRef(n.meshCache, s.mesh, r); return s.weights !== void 0 && o.traverse(function (a) { if (a.isMesh) for (let l = 0, c = s.weights.length; l < c; l++)a.morphTargetInfluences[l] = s.weights[l] }), o }) } loadNode(e) { const t = this.json, n = this, s = t.nodes[e], r = n._loadNodeShallow(e), o = [], a = s.children || []; for (let c = 0, u = a.length; c < u; c++)o.push(n.getDependency("node", a[c])); const l = s.skin === void 0 ? Promise.resolve(null) : n.getDependency("skin", s.skin); return Promise.all([r, Promise.all(o), l]).then(function (c) { const u = c[0], h = c[1], f = c[2]; f !== null && u.traverse(function (d) { d.isSkinnedMesh && d.bind(f, tT) }); for (let d = 0, _ = h.length; d < _; d++)u.add(h[d]); return u }) } _loadNodeShallow(e) { const t = this.json, n = this.extensions, s = this; if (this.nodeCache[e] !== void 0) return this.nodeCache[e]; const r = t.nodes[e], o = r.name ? s.createUniqueName(r.name) : "", a = [], l = s._invokeOne(function (c) { return c.createNodeMesh && c.createNodeMesh(e) }); return l && a.push(l), r.camera !== void 0 && a.push(s.getDependency("camera", r.camera).then(function (c) { return s._getNodeRef(s.cameraCache, r.camera, c) })), s._invokeAll(function (c) { return c.createNodeAttachment && c.createNodeAttachment(e) }).forEach(function (c) { a.push(c) }), this.nodeCache[e] = Promise.all(a).then(function (c) { let u; if (r.isBone === !0 ? u = new fp : c.length > 1 ? u = new Yi : c.length === 1 ? u = c[0] : u = new ot, u !== c[0]) for (let h = 0, f = c.length; h < f; h++)u.add(c[h]); if (r.name && (u.userData.name = r.name, u.name = o), pi(u, r), r.extensions && Hi(n, u, r), r.matrix !== void 0) { const h = new Oe; h.fromArray(r.matrix), u.applyMatrix4(h) } else r.translation !== void 0 && u.position.fromArray(r.translation), r.rotation !== void 0 && u.quaternion.fromArray(r.rotation), r.scale !== void 0 && u.scale.fromArray(r.scale); return s.associations.has(u) || s.associations.set(u, {}), s.associations.get(u).nodes = e, u }), this.nodeCache[e] } loadScene(e) { const t = this.extensions, n = this.json.scenes[e], s = this, r = new Yi; n.name && (r.name = s.createUniqueName(n.name)), pi(r, n), n.extensions && Hi(t, r, n); const o = n.nodes || [], a = []; for (let l = 0, c = o.length; l < c; l++)a.push(s.getDependency("node", o[l])); return Promise.all(a).then(function (l) { for (let u = 0, h = l.length; u < h; u++)r.add(l[u]); const c = u => { const h = new Map; for (const [f, d] of s.associations) (f instanceof an || f instanceof wt) && h.set(f, d); return u.traverse(f => { const d = s.associations.get(f); d != null && h.set(f, d) }), h }; return s.associations = c(r), r }) } _createAnimationTracks(e, t, n, s, r) { const o = [], a = e.name ? e.name : e.uuid, l = []; li[r.path] === li.weights ? e.traverse(function (f) { f.morphTargetInfluences && l.push(f.name ? f.name : f.uuid) }) : l.push(a); let c; switch (li[r.path]) { case li.weights: c = Xs; break; case li.rotation: c = $i; break; case li.position: case li.scale: c = js; break; default: switch (n.itemSize) { case 1: c = Xs; break; case 2: case 3: default: c = js; break }break }const u = s.interpolation !== void 0 ? KE[s.interpolation] : Vs, h = this._getArrayFromAccessor(n); for (let f = 0, d = l.length; f < d; f++) { const _ = new c(l[f] + "." + li[r.path], t.array, h, u); s.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(_), o.push(_) } return o } _getArrayFromAccessor(e) { let t = e.array; if (e.normalized) { const n = Ql(t.constructor), s = new Float32Array(t.length); for (let r = 0, o = t.length; r < o; r++)s[r] = t[r] * n; t = s } return t } _createCubicSplineTrackInterpolant(e) { e.createInterpolant = function (n) { const s = this instanceof $i ? qE : Mp; return new s(this.times, this.values, this.getValueSize() / 3, n) }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0 } } function iT(i, e, t) { const n = e.attributes, s = new Kn; if (n.POSITION !== void 0) { const a = t.json.accessors[n.POSITION], l = a.min, c = a.max; if (l !== void 0 && c !== void 0) { if (s.set(new B(l[0], l[1], l[2]), new B(c[0], c[1], c[2])), a.normalized) { const u = Ql(Us[a.componentType]); s.min.multiplyScalar(u), s.max.multiplyScalar(u) } } else { console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION."); return } } else return; const r = e.targets; if (r !== void 0) { const a = new B, l = new B; for (let c = 0, u = r.length; c < u; c++) { const h = r[c]; if (h.POSITION !== void 0) { const f = t.json.accessors[h.POSITION], d = f.min, _ = f.max; if (d !== void 0 && _ !== void 0) { if (l.setX(Math.max(Math.abs(d[0]), Math.abs(_[0]))), l.setY(Math.max(Math.abs(d[1]), Math.abs(_[1]))), l.setZ(Math.max(Math.abs(d[2]), Math.abs(_[2]))), f.normalized) { const v = Ql(Us[f.componentType]); l.multiplyScalar(v) } a.max(l) } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.") } } s.expandByVector(a) } i.boundingBox = s; const o = new In; s.getCenter(o.center), o.radius = s.min.distanceTo(s.max) / 2, i.boundingSphere = o } function Rf(i, e, t) { const n = e.attributes, s = []; function r(o, a) { return t.getDependency("accessor", o).then(function (l) { i.setAttribute(a, l) }) } for (const o in n) { const a = Jl[o] || o.toLowerCase(); a in i.attributes || s.push(r(n[o], a)) } if (e.indices !== void 0 && !i.index) { const o = t.getDependency("accessor", e.indices).then(function (a) { i.setIndex(a) }); s.push(o) } return Je.workingColorSpace !== xt && "COLOR_0" in n && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Je.workingColorSpace}" not supported.`), pi(i, e), iT(i, e, t), Promise.all(s).then(function () { return e.targets !== void 0 ? ZE(i, e.targets, t) : i }) } const El = new WeakMap; class sT extends wi {
	constructor(e) { super(e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = { position: "POSITION", normal: "NORMAL", color: "COLOR", uv: "TEX_COORD" }, this.defaultAttributeTypes = { position: "Float32Array", normal: "Float32Array", color: "Float32Array", uv: "Float32Array" } } setDecoderPath(e) { return this.decoderPath = e, this } setDecoderConfig(e) { return this.decoderConfig = e, this } setWorkerLimit(e) { return this.workerLimit = e, this } load(e, t, n, s) { const r = new Ur(this.manager); r.setPath(this.path), r.setResponseType("arraybuffer"), r.setRequestHeader(this.requestHeader), r.setWithCredentials(this.withCredentials), r.load(e, o => { this.parse(o, t, s) }, n, s) } parse(e, t, n = () => { }) { this.decodeDracoFile(e, t, null, null, Tt).catch(n) } decodeDracoFile(e, t, n, s, r = xt, o = () => { }) { const a = { attributeIDs: n || this.defaultAttributeIDs, attributeTypes: s || this.defaultAttributeTypes, useUniqueIDs: !!n, vertexColorSpace: r }; return this.decodeGeometry(e, a).then(t).catch(o) } decodeGeometry(e, t) { const n = JSON.stringify(t); if (El.has(e)) { const l = El.get(e); if (l.key === n) return l.promise; if (e.byteLength === 0) throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.") } let s; const r = this.workerNextTaskID++, o = e.byteLength, a = this._getWorker(r, o).then(l => (s = l, new Promise((c, u) => { s._callbacks[r] = { resolve: c, reject: u }, s.postMessage({ type: "decode", id: r, taskConfig: t, buffer: e }, [e]) }))).then(l => this._createGeometry(l.geometry)); return a.catch(() => !0).then(() => { s && r && this._releaseTask(s, r) }), El.set(e, { key: n, promise: a }), a } _createGeometry(e) { const t = new Jt; e.index && t.setIndex(new Ct(e.index.array, 1)); for (let n = 0; n < e.attributes.length; n++) { const s = e.attributes[n], r = s.name, o = s.array, a = s.itemSize, l = new Ct(o, a); r === "color" && (this._assignVertexColorSpace(l, s.vertexColorSpace), l.normalized = !(o instanceof Float32Array)), t.setAttribute(r, l) } return t } _assignVertexColorSpace(e, t) { if (t !== Tt) return; const n = new Re; for (let s = 0, r = e.count; s < r; s++)n.fromBufferAttribute(e, s).convertSRGBToLinear(), e.setXYZ(s, n.r, n.g, n.b) } _loadLibrary(e, t) { const n = new Ur(this.manager); return n.setPath(this.decoderPath), n.setResponseType(t), n.setWithCredentials(this.withCredentials), new Promise((s, r) => { n.load(e, s, void 0, r) }) } preload() { return this._initDecoder(), this } _initDecoder() {
		if (this.decoderPending) return this.decoderPending; const e = typeof WebAssembly != "object" || this.decoderConfig.type === "js", t = []; return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(t).then(n => {
			const s = n[0]; e || (this.decoderConfig.wasmBinary = n[1]); const r = rT.toString(), o = ["/* draco decoder */", s, "", "/* worker */", r.substring(r.indexOf("{") + 1, r.lastIndexOf("}"))].join(`
`); this.workerSourceURL = URL.createObjectURL(new Blob([o]))
		}), this.decoderPending
	} _getWorker(e, t) { return this._initDecoder().then(() => { if (this.workerPool.length < this.workerLimit) { const s = new Worker(this.workerSourceURL); s._callbacks = {}, s._taskCosts = {}, s._taskLoad = 0, s.postMessage({ type: "init", decoderConfig: this.decoderConfig }), s.onmessage = function (r) { const o = r.data; switch (o.type) { case "decode": s._callbacks[o.id].resolve(o); break; case "error": s._callbacks[o.id].reject(o); break; default: console.error('THREE.DRACOLoader: Unexpected message, "' + o.type + '"') } }, this.workerPool.push(s) } else this.workerPool.sort(function (s, r) { return s._taskLoad > r._taskLoad ? -1 : 1 }); const n = this.workerPool[this.workerPool.length - 1]; return n._taskCosts[e] = t, n._taskLoad += t, n }) } _releaseTask(e, t) { e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t] } debug() { console.log("Task load: ", this.workerPool.map(e => e._taskLoad)) } dispose() { for (let e = 0; e < this.workerPool.length; ++e)this.workerPool[e].terminate(); return this.workerPool.length = 0, this.workerSourceURL !== "" && URL.revokeObjectURL(this.workerSourceURL), this }
} function rT() { let i, e; onmessage = function (o) { const a = o.data; switch (a.type) { case "init": i = a.decoderConfig, e = new Promise(function (u) { i.onModuleLoaded = function (h) { u({ draco: h }) }, DracoDecoderModule(i) }); break; case "decode": const l = a.buffer, c = a.taskConfig; e.then(u => { const h = u.draco, f = new h.Decoder; try { const d = t(h, f, new Int8Array(l), c), _ = d.attributes.map(v => v.array.buffer); d.index && _.push(d.index.array.buffer), self.postMessage({ type: "decode", id: a.id, geometry: d }, _) } catch (d) { console.error(d), self.postMessage({ type: "error", id: a.id, error: d.message }) } finally { h.destroy(f) } }); break } }; function t(o, a, l, c) { const u = c.attributeIDs, h = c.attributeTypes; let f, d; const _ = a.GetEncodedGeometryType(l); if (_ === o.TRIANGULAR_MESH) f = new o.Mesh, d = a.DecodeArrayToMesh(l, l.byteLength, f); else if (_ === o.POINT_CLOUD) f = new o.PointCloud, d = a.DecodeArrayToPointCloud(l, l.byteLength, f); else throw new Error("THREE.DRACOLoader: Unexpected geometry type."); if (!d.ok() || f.ptr === 0) throw new Error("THREE.DRACOLoader: Decoding failed: " + d.error_msg()); const v = { index: null, attributes: [] }; for (const p in u) { const m = self[h[p]]; let b, y; if (c.useUniqueIDs) y = u[p], b = a.GetAttributeByUniqueId(f, y); else { if (y = a.GetAttributeId(f, o[u[p]]), y === -1) continue; b = a.GetAttribute(f, y) } const A = s(o, a, f, p, m, b); p === "color" && (A.vertexColorSpace = c.vertexColorSpace), v.attributes.push(A) } return _ === o.TRIANGULAR_MESH && (v.index = n(o, a, f)), o.destroy(f), v } function n(o, a, l) { const u = l.num_faces() * 3, h = u * 4, f = o._malloc(h); a.GetTrianglesUInt32Array(l, h, f); const d = new Uint32Array(o.HEAPF32.buffer, f, u).slice(); return o._free(f), { array: d, itemSize: 1 } } function s(o, a, l, c, u, h) { const f = h.num_components(), _ = l.num_points() * f, v = _ * u.BYTES_PER_ELEMENT, p = r(o, u), m = o._malloc(v); a.GetAttributeDataArrayForAllPoints(l, h, p, v, m); const b = new u(o.HEAPF32.buffer, m, _).slice(); return o._free(m), { name: c, array: b, itemSize: f } } function r(o, a) { switch (a) { case Float32Array: return o.DT_FLOAT32; case Int8Array: return o.DT_INT8; case Int16Array: return o.DT_INT16; case Int32Array: return o.DT_INT32; case Uint8Array: return o.DT_UINT8; case Uint16Array: return o.DT_UINT16; case Uint32Array: return o.DT_UINT32 } } } class oT extends nE {
	constructor(e) { super(e), this.type = gn } parse(e) {
		const o = function (L, S) { switch (L) { case 1: throw new Error("THREE.RGBELoader: Read Error: " + (S || "")); case 2: throw new Error("THREE.RGBELoader: Write Error: " + (S || "")); case 3: throw new Error("THREE.RGBELoader: Bad File Format: " + (S || "")); default: case 4: throw new Error("THREE.RGBELoader: Memory Error: " + (S || "")) } }, u = `
`, h = function (L, S, M) { S = S || 1024; let I = L.pos, C = -1, z = 0, Y = "", X = String.fromCharCode.apply(null, new Uint16Array(L.subarray(I, I + 128))); for (; 0 > (C = X.indexOf(u)) && z < S && I < L.byteLength;)Y += X, z += X.length, I += 128, X += String.fromCharCode.apply(null, new Uint16Array(L.subarray(I, I + 128))); return -1 < C ? (L.pos += z + C + 1, Y + X.slice(0, C)) : !1 }, f = function (L) {
			const S = /^#\?(\S+)/, M = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, D = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, I = /^\s*FORMAT=(\S+)\s*$/, C = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, z = { valid: 0, string: "", comments: "", programtype: "RGBE", format: "", gamma: 1, exposure: 1, width: 0, height: 0 }; let Y, X; for ((L.pos >= L.byteLength || !(Y = h(L))) && o(1, "no header found"), (X = Y.match(S)) || o(3, "bad initial token"), z.valid |= 1, z.programtype = X[1], z.string += Y + `
`; Y = h(L), Y !== !1;) {
				if (z.string += Y + `
`, Y.charAt(0) === "#") {
					z.comments += Y + `
`; continue
				} if ((X = Y.match(M)) && (z.gamma = parseFloat(X[1])), (X = Y.match(D)) && (z.exposure = parseFloat(X[1])), (X = Y.match(I)) && (z.valid |= 2, z.format = X[1]), (X = Y.match(C)) && (z.valid |= 4, z.height = parseInt(X[1], 10), z.width = parseInt(X[2], 10)), z.valid & 2 && z.valid & 4) break
			} return z.valid & 2 || o(3, "missing format specifier"), z.valid & 4 || o(3, "missing image size specifier"), z
		}, d = function (L, S, M) { const D = S; if (D < 8 || D > 32767 || L[0] !== 2 || L[1] !== 2 || L[2] & 128) return new Uint8Array(L); D !== (L[2] << 8 | L[3]) && o(3, "wrong scanline width"); const I = new Uint8Array(4 * S * M); I.length || o(4, "unable to allocate buffer space"); let C = 0, z = 0; const Y = 4 * D, X = new Uint8Array(4), ee = new Uint8Array(Y); let G = M; for (; G > 0 && z < L.byteLength;) { z + 4 > L.byteLength && o(1), X[0] = L[z++], X[1] = L[z++], X[2] = L[z++], X[3] = L[z++], (X[0] != 2 || X[1] != 2 || (X[2] << 8 | X[3]) != D) && o(3, "bad rgbe scanline format"); let ne = 0, oe; for (; ne < Y && z < L.byteLength;) { oe = L[z++]; const ye = oe > 128; if (ye && (oe -= 128), (oe === 0 || ne + oe > Y) && o(3, "bad scanline data"), ye) { const Pe = L[z++]; for (let te = 0; te < oe; te++)ee[ne++] = Pe } else ee.set(L.subarray(z, z + oe), ne), ne += oe, z += oe } const pe = D; for (let ye = 0; ye < pe; ye++) { let Pe = 0; I[C] = ee[ye + Pe], Pe += D, I[C + 1] = ee[ye + Pe], Pe += D, I[C + 2] = ee[ye + Pe], Pe += D, I[C + 3] = ee[ye + Pe], C += 4 } G-- } return I }, _ = function (L, S, M, D) { const I = L[S + 3], C = Math.pow(2, I - 128) / 255; M[D + 0] = L[S + 0] * C, M[D + 1] = L[S + 1] * C, M[D + 2] = L[S + 2] * C, M[D + 3] = 1 }, v = function (L, S, M, D) { const I = L[S + 3], C = Math.pow(2, I - 128) / 255; M[D + 0] = ro.toHalfFloat(Math.min(L[S + 0] * C, 65504)), M[D + 1] = ro.toHalfFloat(Math.min(L[S + 1] * C, 65504)), M[D + 2] = ro.toHalfFloat(Math.min(L[S + 2] * C, 65504)), M[D + 3] = ro.toHalfFloat(1) }, p = new Uint8Array(e); p.pos = 0; const m = f(p), b = m.width, y = m.height, A = d(p.subarray(p.pos), b, y); let O, P, R; switch (this.type) { case Vt: R = A.length / 4; const L = new Float32Array(R * 4); for (let M = 0; M < R; M++)_(A, M * 4, L, M * 4); O = L, P = Vt; break; case gn: R = A.length / 4; const S = new Uint16Array(R * 4); for (let M = 0; M < R; M++)v(A, M * 4, S, M * 4); O = S, P = gn; break; default: throw new Error("THREE.RGBELoader: Unsupported type: " + this.type) }return { width: b, height: y, data: O, header: m.string, gamma: m.gamma, exposure: m.exposure, type: P }
	} setDataType(e) { return this.type = e, this } load(e, t, n, s) { function r(o, a) { switch (o.type) { case Vt: case gn: o.colorSpace = xt, o.minFilter = At, o.magFilter = At, o.generateMipmaps = !1, o.flipY = !0; break }t && t(o, a) } return super.load(e, r, n, s) }
} const ko = {
	name: "CopyShader", uniforms: { tDiffuse: { value: null }, opacity: { value: 1 } }, vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`, fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`}; class zr { constructor() { this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1 } setSize() { } render() { console.error("THREE.Pass: .render() must be implemented in derived pass.") } dispose() { } } const aT = new ga(-1, 1, 1, -1, 0, 1); class lT extends Jt { constructor() { super(), this.setAttribute("position", new Mn([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new Mn([0, 2, 0, 0, 2, 0], 2)) } } const cT = new lT; class yp { constructor(e) { this._mesh = new Gt(cT, e) } dispose() { this._mesh.geometry.dispose() } render(e) { e.render(this._mesh, aT) } get material() { return this._mesh.material } set material(e) { this._mesh.material = e } } class Sp extends zr { constructor(e, t) { super(), this.textureID = t !== void 0 ? t : "tDiffuse", e instanceof Wt ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = As.clone(e.uniforms), this.material = new Wt({ name: e.name !== void 0 ? e.name : "unspecified", defines: Object.assign({}, e.defines), uniforms: this.uniforms, vertexShader: e.vertexShader, fragmentShader: e.fragmentShader })), this.fsQuad = new yp(this.material) } render(e, t, n) { this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture), this.fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e)) } dispose() { this.material.dispose(), this.fsQuad.dispose() } } class Cf extends zr { constructor(e, t) { super(), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1 } render(e, t, n) { const s = e.getContext(), r = e.state; r.buffers.color.setMask(!1), r.buffers.depth.setMask(!1), r.buffers.color.setLocked(!0), r.buffers.depth.setLocked(!0); let o, a; this.inverse ? (o = 0, a = 1) : (o = 1, a = 0), r.buffers.stencil.setTest(!0), r.buffers.stencil.setOp(s.REPLACE, s.REPLACE, s.REPLACE), r.buffers.stencil.setFunc(s.ALWAYS, o, 4294967295), r.buffers.stencil.setClear(a), r.buffers.stencil.setLocked(!0), e.setRenderTarget(n), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), r.buffers.color.setLocked(!1), r.buffers.depth.setLocked(!1), r.buffers.color.setMask(!0), r.buffers.depth.setMask(!0), r.buffers.stencil.setLocked(!1), r.buffers.stencil.setFunc(s.EQUAL, 1, 4294967295), r.buffers.stencil.setOp(s.KEEP, s.KEEP, s.KEEP), r.buffers.stencil.setLocked(!0) } } class uT extends zr { constructor() { super(), this.needsSwap = !1 } render(e) { e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1) } } class hT { constructor(e, t) { if (this.renderer = e, this._pixelRatio = e.getPixelRatio(), t === void 0) { const n = e.getSize(new Ee); this._width = n.width, this._height = n.height, t = new Cn(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: gn }), t.texture.name = "EffectComposer.rt1" } else this._width = t.width, this._height = t.height; this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new Sp(ko), this.copyPass.material.blending = Dt, this.clock = new hE } swapBuffers() { const e = this.readBuffer; this.readBuffer = this.writeBuffer, this.writeBuffer = e } addPass(e) { this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio) } insertPass(e, t) { this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio) } removePass(e) { const t = this.passes.indexOf(e); t !== -1 && this.passes.splice(t, 1) } isLastEnabledPass(e) { for (let t = e + 1; t < this.passes.length; t++)if (this.passes[t].enabled) return !1; return !0 } render(e) { e === void 0 && (e = this.clock.getDelta()); const t = this.renderer.getRenderTarget(); let n = !1; for (let s = 0, r = this.passes.length; s < r; s++) { const o = this.passes[s]; if (o.enabled !== !1) { if (o.renderToScreen = this.renderToScreen && this.isLastEnabledPass(s), o.render(this.renderer, this.writeBuffer, this.readBuffer, e, n), o.needsSwap) { if (n) { const a = this.renderer.getContext(), l = this.renderer.state.buffers.stencil; l.setFunc(a.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), l.setFunc(a.EQUAL, 1, 4294967295) } this.swapBuffers() } Cf !== void 0 && (o instanceof Cf ? n = !0 : o instanceof uT && (n = !1)) } } this.renderer.setRenderTarget(t) } reset(e) { if (e === void 0) { const t = this.renderer.getSize(new Ee); this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, e = this.renderTarget1.clone(), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio) } this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2 } setSize(e, t) { this._width = e, this._height = t; const n = this._width * this._pixelRatio, s = this._height * this._pixelRatio; this.renderTarget1.setSize(n, s), this.renderTarget2.setSize(n, s); for (let r = 0; r < this.passes.length; r++)this.passes[r].setSize(n, s) } setPixelRatio(e) { this._pixelRatio = e, this.setSize(this._width, this._height) } dispose() { this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose() } } class fT extends zr { constructor(e, t, n = null, s = null, r = null) { super(), this.scene = e, this.camera = t, this.overrideMaterial = n, this.clearColor = s, this.clearAlpha = r, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new Re } render(e, t, n) { const s = e.autoClear; e.autoClear = !1; let r, o; this.overrideMaterial !== null && (o = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor !== null && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor)), this.clearAlpha !== null && (r = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), this.clearDepth == !0 && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : n), this.clear === !0 && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), this.clearColor !== null && e.setClearColor(this._oldClearColor), this.clearAlpha !== null && e.setClearAlpha(r), this.overrideMaterial !== null && (this.scene.overrideMaterial = o), e.autoClear = s } } class dT { constructor(e = Math) { this.grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]], this.grad4 = [[0, 1, 1, 1], [0, 1, 1, -1], [0, 1, -1, 1], [0, 1, -1, -1], [0, -1, 1, 1], [0, -1, 1, -1], [0, -1, -1, 1], [0, -1, -1, -1], [1, 0, 1, 1], [1, 0, 1, -1], [1, 0, -1, 1], [1, 0, -1, -1], [-1, 0, 1, 1], [-1, 0, 1, -1], [-1, 0, -1, 1], [-1, 0, -1, -1], [1, 1, 0, 1], [1, 1, 0, -1], [1, -1, 0, 1], [1, -1, 0, -1], [-1, 1, 0, 1], [-1, 1, 0, -1], [-1, -1, 0, 1], [-1, -1, 0, -1], [1, 1, 1, 0], [1, 1, -1, 0], [1, -1, 1, 0], [1, -1, -1, 0], [-1, 1, 1, 0], [-1, 1, -1, 0], [-1, -1, 1, 0], [-1, -1, -1, 0]], this.p = []; for (let t = 0; t < 256; t++)this.p[t] = Math.floor(e.random() * 256); this.perm = []; for (let t = 0; t < 512; t++)this.perm[t] = this.p[t & 255]; this.simplex = [[0, 1, 2, 3], [0, 1, 3, 2], [0, 0, 0, 0], [0, 2, 3, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 2, 3, 0], [0, 2, 1, 3], [0, 0, 0, 0], [0, 3, 1, 2], [0, 3, 2, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 3, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 2, 0, 3], [0, 0, 0, 0], [1, 3, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 3, 0, 1], [2, 3, 1, 0], [1, 0, 2, 3], [1, 0, 3, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 0, 3, 1], [0, 0, 0, 0], [2, 1, 3, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [2, 0, 1, 3], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [3, 0, 1, 2], [3, 0, 2, 1], [0, 0, 0, 0], [3, 1, 2, 0], [2, 1, 0, 3], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [3, 1, 0, 2], [0, 0, 0, 0], [3, 2, 0, 1], [3, 2, 1, 0]] } dot(e, t, n) { return e[0] * t + e[1] * n } dot3(e, t, n, s) { return e[0] * t + e[1] * n + e[2] * s } dot4(e, t, n, s, r) { return e[0] * t + e[1] * n + e[2] * s + e[3] * r } noise(e, t) { let n, s, r; const o = .5 * (Math.sqrt(3) - 1), a = (e + t) * o, l = Math.floor(e + a), c = Math.floor(t + a), u = (3 - Math.sqrt(3)) / 6, h = (l + c) * u, f = l - h, d = c - h, _ = e - f, v = t - d; let p, m; _ > v ? (p = 1, m = 0) : (p = 0, m = 1); const b = _ - p + u, y = v - m + u, A = _ - 1 + 2 * u, O = v - 1 + 2 * u, P = l & 255, R = c & 255, L = this.perm[P + this.perm[R]] % 12, S = this.perm[P + p + this.perm[R + m]] % 12, M = this.perm[P + 1 + this.perm[R + 1]] % 12; let D = .5 - _ * _ - v * v; D < 0 ? n = 0 : (D *= D, n = D * D * this.dot(this.grad3[L], _, v)); let I = .5 - b * b - y * y; I < 0 ? s = 0 : (I *= I, s = I * I * this.dot(this.grad3[S], b, y)); let C = .5 - A * A - O * O; return C < 0 ? r = 0 : (C *= C, r = C * C * this.dot(this.grad3[M], A, O)), 70 * (n + s + r) } noise3d(e, t, n) { let s, r, o, a; const c = (e + t + n) * .3333333333333333, u = Math.floor(e + c), h = Math.floor(t + c), f = Math.floor(n + c), d = 1 / 6, _ = (u + h + f) * d, v = u - _, p = h - _, m = f - _, b = e - v, y = t - p, A = n - m; let O, P, R, L, S, M; b >= y ? y >= A ? (O = 1, P = 0, R = 0, L = 1, S = 1, M = 0) : b >= A ? (O = 1, P = 0, R = 0, L = 1, S = 0, M = 1) : (O = 0, P = 0, R = 1, L = 1, S = 0, M = 1) : y < A ? (O = 0, P = 0, R = 1, L = 0, S = 1, M = 1) : b < A ? (O = 0, P = 1, R = 0, L = 0, S = 1, M = 1) : (O = 0, P = 1, R = 0, L = 1, S = 1, M = 0); const D = b - O + d, I = y - P + d, C = A - R + d, z = b - L + 2 * d, Y = y - S + 2 * d, X = A - M + 2 * d, ee = b - 1 + 3 * d, G = y - 1 + 3 * d, ne = A - 1 + 3 * d, oe = u & 255, pe = h & 255, ye = f & 255, Pe = this.perm[oe + this.perm[pe + this.perm[ye]]] % 12, te = this.perm[oe + O + this.perm[pe + P + this.perm[ye + R]]] % 12, ue = this.perm[oe + L + this.perm[pe + S + this.perm[ye + M]]] % 12, ge = this.perm[oe + 1 + this.perm[pe + 1 + this.perm[ye + 1]]] % 12; let fe = .6 - b * b - y * y - A * A; fe < 0 ? s = 0 : (fe *= fe, s = fe * fe * this.dot3(this.grad3[Pe], b, y, A)); let Te = .6 - D * D - I * I - C * C; Te < 0 ? r = 0 : (Te *= Te, r = Te * Te * this.dot3(this.grad3[te], D, I, C)); let Ae = .6 - z * z - Y * Y - X * X; Ae < 0 ? o = 0 : (Ae *= Ae, o = Ae * Ae * this.dot3(this.grad3[ue], z, Y, X)); let we = .6 - ee * ee - G * G - ne * ne; return we < 0 ? a = 0 : (we *= we, a = we * we * this.dot3(this.grad3[ge], ee, G, ne)), 32 * (s + r + o + a) } noise4d(e, t, n, s) { const r = this.grad4, o = this.simplex, a = this.perm, l = (Math.sqrt(5) - 1) / 4, c = (5 - Math.sqrt(5)) / 20; let u, h, f, d, _; const v = (e + t + n + s) * l, p = Math.floor(e + v), m = Math.floor(t + v), b = Math.floor(n + v), y = Math.floor(s + v), A = (p + m + b + y) * c, O = p - A, P = m - A, R = b - A, L = y - A, S = e - O, M = t - P, D = n - R, I = s - L, C = S > M ? 32 : 0, z = S > D ? 16 : 0, Y = M > D ? 8 : 0, X = S > I ? 4 : 0, ee = M > I ? 2 : 0, G = D > I ? 1 : 0, ne = C + z + Y + X + ee + G, oe = o[ne][0] >= 3 ? 1 : 0, pe = o[ne][1] >= 3 ? 1 : 0, ye = o[ne][2] >= 3 ? 1 : 0, Pe = o[ne][3] >= 3 ? 1 : 0, te = o[ne][0] >= 2 ? 1 : 0, ue = o[ne][1] >= 2 ? 1 : 0, ge = o[ne][2] >= 2 ? 1 : 0, fe = o[ne][3] >= 2 ? 1 : 0, Te = o[ne][0] >= 1 ? 1 : 0, Ae = o[ne][1] >= 1 ? 1 : 0, we = o[ne][2] >= 1 ? 1 : 0, j = o[ne][3] >= 1 ? 1 : 0, De = S - oe + c, w = M - pe + c, U = D - ye + c, V = I - Pe + c, J = S - te + 2 * c, E = M - ue + 2 * c, x = D - ge + 2 * c, N = I - fe + 2 * c, F = S - Te + 3 * c, H = M - Ae + 3 * c, k = D - we + 3 * c, se = I - j + 3 * c, K = S - 1 + 4 * c, ae = M - 1 + 4 * c, ce = D - 1 + 4 * c, re = I - 1 + 4 * c, le = p & 255, _e = m & 255, de = b & 255, me = y & 255, Ne = a[le + a[_e + a[de + a[me]]]] % 32, ze = a[le + oe + a[_e + pe + a[de + ye + a[me + Pe]]]] % 32, Xe = a[le + te + a[_e + ue + a[de + ge + a[me + fe]]]] % 32, je = a[le + Te + a[_e + Ae + a[de + we + a[me + j]]]] % 32, Le = a[le + 1 + a[_e + 1 + a[de + 1 + a[me + 1]]]] % 32; let ve = .6 - S * S - M * M - D * D - I * I; ve < 0 ? u = 0 : (ve *= ve, u = ve * ve * this.dot4(r[Ne], S, M, D, I)); let g = .6 - De * De - w * w - U * U - V * V; g < 0 ? h = 0 : (g *= g, h = g * g * this.dot4(r[ze], De, w, U, V)); let q = .6 - J * J - E * E - x * x - N * N; q < 0 ? f = 0 : (q *= q, f = q * q * this.dot4(r[Xe], J, E, x, N)); let ie = .6 - F * F - H * H - k * k - se * se; ie < 0 ? d = 0 : (ie *= ie, d = ie * ie * this.dot4(r[je], F, H, k, se)); let he = .6 - K * K - ae * ae - ce * ce - re * re; return he < 0 ? _ = 0 : (he *= he, _ = he * he * this.dot4(r[Le], K, ae, ce, re)), 27 * (u + h + f + d + _) } } const Co = {
	name: "SSAOShader", defines: { PERSPECTIVE_CAMERA: 1, KERNEL_SIZE: 32 }, uniforms: { tNormal: { value: null }, tDepth: { value: null }, tNoise: { value: null }, kernel: { value: null }, cameraNear: { value: null }, cameraFar: { value: null }, resolution: { value: new Ee }, cameraProjectionMatrix: { value: new Oe }, cameraInverseProjectionMatrix: { value: new Oe }, kernelRadius: { value: 8 }, minDistance: { value: .005 }, maxDistance: { value: .05 } }, vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`, fragmentShader: `
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );

			if ( depth == 1.0 ) {

				gl_FragColor = vec4( 1.0 ); // don't influence background
				
			} else {

				float viewZ = getViewZ( depth );

				vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
				vec3 viewNormal = getViewNormal( vUv );

				vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
				vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

				// compute matrix used to reorient a kernel vector

				vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
				vec3 bitangent = cross( viewNormal, tangent );
				mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

				float occlusion = 0.0;

				for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

					vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
					vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

					vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
					samplePointNDC /= samplePointNDC.w;

					vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

					float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
					float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
					float delta = sampleDepth - realDepth;

					if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

						occlusion += 1.0;

					}

				}

				occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

				gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

			}

		}`}, Po = {
		name: "SSAODepthShader", defines: { PERSPECTIVE_CAMERA: 1 }, uniforms: { tDepth: { value: null }, cameraNear: { value: null }, cameraFar: { value: null } }, vertexShader: `varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`, fragmentShader: `uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`}, Lo = {
		name: "SSAOBlurShader", uniforms: { tDiffuse: { value: null }, resolution: { value: new Ee } }, vertexShader: `varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`, fragmentShader: `uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`}; class gi extends zr { constructor(e, t, n, s, r = 32) { super(), this.width = n !== void 0 ? n : 512, this.height = s !== void 0 ? s : 512, this.clear = !0, this.camera = t, this.scene = e, this.kernelRadius = 8, this.kernel = [], this.noiseTexture = null, this.output = 0, this.minDistance = .005, this.maxDistance = .1, this._visibilityCache = new Map, this.generateSampleKernel(r), this.generateRandomKernelRotations(); const o = new Lc; o.format = zs, o.type = Ks, this.normalRenderTarget = new Cn(this.width, this.height, { minFilter: Rt, magFilter: Rt, type: gn, depthTexture: o }), this.ssaoRenderTarget = new Cn(this.width, this.height, { type: gn }), this.blurRenderTarget = this.ssaoRenderTarget.clone(), this.ssaoMaterial = new Wt({ defines: Object.assign({}, Co.defines), uniforms: As.clone(Co.uniforms), vertexShader: Co.vertexShader, fragmentShader: Co.fragmentShader, blending: Dt }), this.ssaoMaterial.defines.KERNEL_SIZE = r, this.ssaoMaterial.uniforms.tNormal.value = this.normalRenderTarget.texture, this.ssaoMaterial.uniforms.tDepth.value = this.normalRenderTarget.depthTexture, this.ssaoMaterial.uniforms.tNoise.value = this.noiseTexture, this.ssaoMaterial.uniforms.kernel.value = this.kernel, this.ssaoMaterial.uniforms.cameraNear.value = this.camera.near, this.ssaoMaterial.uniforms.cameraFar.value = this.camera.far, this.ssaoMaterial.uniforms.resolution.value.set(this.width, this.height), this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix), this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse), this.normalMaterial = new VS, this.normalMaterial.blending = Dt, this.blurMaterial = new Wt({ defines: Object.assign({}, Lo.defines), uniforms: As.clone(Lo.uniforms), vertexShader: Lo.vertexShader, fragmentShader: Lo.fragmentShader }), this.blurMaterial.uniforms.tDiffuse.value = this.ssaoRenderTarget.texture, this.blurMaterial.uniforms.resolution.value.set(this.width, this.height), this.depthRenderMaterial = new Wt({ defines: Object.assign({}, Po.defines), uniforms: As.clone(Po.uniforms), vertexShader: Po.vertexShader, fragmentShader: Po.fragmentShader, blending: Dt }), this.depthRenderMaterial.uniforms.tDepth.value = this.normalRenderTarget.depthTexture, this.depthRenderMaterial.uniforms.cameraNear.value = this.camera.near, this.depthRenderMaterial.uniforms.cameraFar.value = this.camera.far, this.copyMaterial = new Wt({ uniforms: As.clone(ko.uniforms), vertexShader: ko.vertexShader, fragmentShader: ko.fragmentShader, transparent: !0, depthTest: !1, depthWrite: !1, blendSrc: Dd, blendDst: kl, blendEquation: Vn, blendSrcAlpha: Id, blendDstAlpha: kl, blendEquationAlpha: Vn }), this.fsQuad = new yp(null), this.originalClearColor = new Re } dispose() { this.normalRenderTarget.dispose(), this.ssaoRenderTarget.dispose(), this.blurRenderTarget.dispose(), this.normalMaterial.dispose(), this.blurMaterial.dispose(), this.copyMaterial.dispose(), this.depthRenderMaterial.dispose(), this.fsQuad.dispose() } render(e, t, n) { switch (this.overrideVisibility(), this.renderOverride(e, this.normalMaterial, this.normalRenderTarget, 7829503, 1), this.restoreVisibility(), this.ssaoMaterial.uniforms.kernelRadius.value = this.kernelRadius, this.ssaoMaterial.uniforms.minDistance.value = this.minDistance, this.ssaoMaterial.uniforms.maxDistance.value = this.maxDistance, this.renderPass(e, this.ssaoMaterial, this.ssaoRenderTarget), this.renderPass(e, this.blurMaterial, this.blurRenderTarget), this.output) { case gi.OUTPUT.SSAO: this.copyMaterial.uniforms.tDiffuse.value = this.ssaoRenderTarget.texture, this.copyMaterial.blending = Dt, this.renderPass(e, this.copyMaterial, this.renderToScreen ? null : t); break; case gi.OUTPUT.Blur: this.copyMaterial.uniforms.tDiffuse.value = this.blurRenderTarget.texture, this.copyMaterial.blending = Dt, this.renderPass(e, this.copyMaterial, this.renderToScreen ? null : t); break; case gi.OUTPUT.Depth: this.renderPass(e, this.depthRenderMaterial, this.renderToScreen ? null : t); break; case gi.OUTPUT.Normal: this.copyMaterial.uniforms.tDiffuse.value = this.normalRenderTarget.texture, this.copyMaterial.blending = Dt, this.renderPass(e, this.copyMaterial, this.renderToScreen ? null : t); break; case gi.OUTPUT.Default: this.copyMaterial.uniforms.tDiffuse.value = n.texture, this.copyMaterial.blending = Dt, this.renderPass(e, this.copyMaterial, this.renderToScreen ? null : t), this.copyMaterial.uniforms.tDiffuse.value = this.blurRenderTarget.texture, this.copyMaterial.blending = Ld, this.renderPass(e, this.copyMaterial, this.renderToScreen ? null : t); break; default: console.warn("THREE.SSAOPass: Unknown output type.") } } renderPass(e, t, n, s, r) { e.getClearColor(this.originalClearColor); const o = e.getClearAlpha(), a = e.autoClear; e.setRenderTarget(n), e.autoClear = !1, s != null && (e.setClearColor(s), e.setClearAlpha(r || 0), e.clear()), this.fsQuad.material = t, this.fsQuad.render(e), e.autoClear = a, e.setClearColor(this.originalClearColor), e.setClearAlpha(o) } renderOverride(e, t, n, s, r) { e.getClearColor(this.originalClearColor); const o = e.getClearAlpha(), a = e.autoClear; e.setRenderTarget(n), e.autoClear = !1, s = t.clearColor || s, r = t.clearAlpha || r, s != null && (e.setClearColor(s), e.setClearAlpha(r || 0), e.clear()), this.scene.overrideMaterial = t, e.render(this.scene, this.camera), this.scene.overrideMaterial = null, e.autoClear = a, e.setClearColor(this.originalClearColor), e.setClearAlpha(o) } setSize(e, t) { this.width = e, this.height = t, this.ssaoRenderTarget.setSize(e, t), this.normalRenderTarget.setSize(e, t), this.blurRenderTarget.setSize(e, t), this.ssaoMaterial.uniforms.resolution.value.set(e, t), this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix), this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse), this.blurMaterial.uniforms.resolution.value.set(e, t) } generateSampleKernel(e) { const t = this.kernel; for (let n = 0; n < e; n++) { const s = new B; s.x = Math.random() * 2 - 1, s.y = Math.random() * 2 - 1, s.z = Math.random(), s.normalize(); let r = n / e; r = wc.lerp(.1, 1, r * r), s.multiplyScalar(r), t.push(s) } } generateRandomKernelRotations() { const n = new dT, s = 4 * 4, r = new Float32Array(s); for (let o = 0; o < s; o++) { const a = Math.random() * 2 - 1, l = Math.random() * 2 - 1, c = 0; r[o] = n.noise3d(a, l, c) } this.noiseTexture = new xa(r, 4, 4, Ec, Vt), this.noiseTexture.wrapS = Ai, this.noiseTexture.wrapT = Ai, this.noiseTexture.needsUpdate = !0 } overrideVisibility() { const e = this.scene, t = this._visibilityCache; e.traverse(function (n) { t.set(n, n.visible), (n.isPoints || n.isLine) && (n.visible = !1) }) } restoreVisibility() { const e = this.scene, t = this._visibilityCache; e.traverse(function (n) { const s = t.get(n); n.visible = s }), t.clear() } } gi.OUTPUT = { Default: 0, SSAO: 1, Blur: 2, Depth: 3, Normal: 4 }; const pT = {
	name: "FXAAShader", uniforms: { tDiffuse: { value: null }, resolution: { value: new Ee(1 / 1024, 1 / 512) } }, vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`, fragmentShader: `
		precision highp float;

		uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)

		//----------------------------------------------------------------------------------
		// File:        es3-keplerFXAAassetsshaders/FXAA_DefaultES.frag
		// SDK Version: v3.00
		// Email:       gameworks@nvidia.com
		// Site:        http://developer.nvidia.com/
		//
		// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.
		//
		// Redistribution and use in source and binary forms, with or without
		// modification, are permitted provided that the following conditions
		// are met:
		//  * Redistributions of source code must retain the above copyright
		//    notice, this list of conditions and the following disclaimer.
		//  * Redistributions in binary form must reproduce the above copyright
		//    notice, this list of conditions and the following disclaimer in the
		//    documentation and/or other materials provided with the distribution.
		//  * Neither the name of NVIDIA CORPORATION nor the names of its
		//    contributors may be used to endorse or promote products derived
		//    from this software without specific prior written permission.
		//
		// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ''AS IS'' AND ANY
		// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
		// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
		// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
		// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
		// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
		// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
		// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
		// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
		// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
		// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		//
		//----------------------------------------------------------------------------------

		#ifndef FXAA_DISCARD
			//
			// Only valid for PC OpenGL currently.
			// Probably will not work when FXAA_GREEN_AS_LUMA = 1.
			//
			// 1 = Use discard on pixels which don't need AA.
			//     For APIs which enable concurrent TEX+ROP from same surface.
			// 0 = Return unchanged color on pixels which don't need AA.
			//
			#define FXAA_DISCARD 0
		#endif

		/*--------------------------------------------------------------------------*/
		#define FxaaTexTop(t, p) texture2D(t, p, -100.0)
		#define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), -100.0)
		/*--------------------------------------------------------------------------*/

		#define NUM_SAMPLES 5

		// assumes colors have premultipliedAlpha, so that the calculated color contrast is scaled by alpha
		float contrast( vec4 a, vec4 b ) {
			vec4 diff = abs( a - b );
			return max( max( max( diff.r, diff.g ), diff.b ), diff.a );
		}

		/*============================================================================

									FXAA3 QUALITY - PC

		============================================================================*/

		/*--------------------------------------------------------------------------*/
		vec4 FxaaPixelShader(
			vec2 posM,
			sampler2D tex,
			vec2 fxaaQualityRcpFrame,
			float fxaaQualityEdgeThreshold,
			float fxaaQualityinvEdgeThreshold
		) {
			vec4 rgbaM = FxaaTexTop(tex, posM);
			vec4 rgbaS = FxaaTexOff(tex, posM, vec2( 0.0, 1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaE = FxaaTexOff(tex, posM, vec2( 1.0, 0.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaN = FxaaTexOff(tex, posM, vec2( 0.0,-1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaW = FxaaTexOff(tex, posM, vec2(-1.0, 0.0), fxaaQualityRcpFrame.xy);
			// . S .
			// W M E
			// . N .

			bool earlyExit = max( max( max(
					contrast( rgbaM, rgbaN ),
					contrast( rgbaM, rgbaS ) ),
					contrast( rgbaM, rgbaE ) ),
					contrast( rgbaM, rgbaW ) )
					< fxaaQualityEdgeThreshold;
			// . 0 .
			// 0 0 0
			// . 0 .

			#if (FXAA_DISCARD == 1)
				if(earlyExit) FxaaDiscard;
			#else
				if(earlyExit) return rgbaM;
			#endif

			float contrastN = contrast( rgbaM, rgbaN );
			float contrastS = contrast( rgbaM, rgbaS );
			float contrastE = contrast( rgbaM, rgbaE );
			float contrastW = contrast( rgbaM, rgbaW );

			float relativeVContrast = ( contrastN + contrastS ) - ( contrastE + contrastW );
			relativeVContrast *= fxaaQualityinvEdgeThreshold;

			bool horzSpan = relativeVContrast > 0.;
			// . 1 .
			// 0 0 0
			// . 1 .

			// 45 deg edge detection and corners of objects, aka V/H contrast is too similar
			if( abs( relativeVContrast ) < .3 ) {
				// locate the edge
				vec2 dirToEdge;
				dirToEdge.x = contrastE > contrastW ? 1. : -1.;
				dirToEdge.y = contrastS > contrastN ? 1. : -1.;
				// . 2 .      . 1 .
				// 1 0 2  ~=  0 0 1
				// . 1 .      . 0 .

				// tap 2 pixels and see which ones are "outside" the edge, to
				// determine if the edge is vertical or horizontal

				vec4 rgbaAlongH = FxaaTexOff(tex, posM, vec2( dirToEdge.x, -dirToEdge.y ), fxaaQualityRcpFrame.xy);
				float matchAlongH = contrast( rgbaM, rgbaAlongH );
				// . 1 .
				// 0 0 1
				// . 0 H

				vec4 rgbaAlongV = FxaaTexOff(tex, posM, vec2( -dirToEdge.x, dirToEdge.y ), fxaaQualityRcpFrame.xy);
				float matchAlongV = contrast( rgbaM, rgbaAlongV );
				// V 1 .
				// 0 0 1
				// . 0 .

				relativeVContrast = matchAlongV - matchAlongH;
				relativeVContrast *= fxaaQualityinvEdgeThreshold;

				if( abs( relativeVContrast ) < .3 ) { // 45 deg edge
					// 1 1 .
					// 0 0 1
					// . 0 1

					// do a simple blur
					return mix(
						rgbaM,
						(rgbaN + rgbaS + rgbaE + rgbaW) * .25,
						.4
					);
				}

				horzSpan = relativeVContrast > 0.;
			}

			if(!horzSpan) rgbaN = rgbaW;
			if(!horzSpan) rgbaS = rgbaE;
			// . 0 .      1
			// 1 0 1  ->  0
			// . 0 .      1

			bool pairN = contrast( rgbaM, rgbaN ) > contrast( rgbaM, rgbaS );
			if(!pairN) rgbaN = rgbaS;

			vec2 offNP;
			offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;
			offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;

			bool doneN = false;
			bool doneP = false;

			float nDist = 0.;
			float pDist = 0.;

			vec2 posN = posM;
			vec2 posP = posM;

			int iterationsUsed = 0;
			int iterationsUsedN = 0;
			int iterationsUsedP = 0;
			for( int i = 0; i < NUM_SAMPLES; i++ ) {
				iterationsUsed = i;

				float increment = float(i + 1);

				if(!doneN) {
					nDist += increment;
					posN = posM + offNP * nDist;
					vec4 rgbaEndN = FxaaTexTop(tex, posN.xy);
					doneN = contrast( rgbaEndN, rgbaM ) > contrast( rgbaEndN, rgbaN );
					iterationsUsedN = i;
				}

				if(!doneP) {
					pDist += increment;
					posP = posM - offNP * pDist;
					vec4 rgbaEndP = FxaaTexTop(tex, posP.xy);
					doneP = contrast( rgbaEndP, rgbaM ) > contrast( rgbaEndP, rgbaN );
					iterationsUsedP = i;
				}

				if(doneN || doneP) break;
			}


			if ( !doneP && !doneN ) return rgbaM; // failed to find end of edge

			float dist = min(
				doneN ? float( iterationsUsedN ) / float( NUM_SAMPLES - 1 ) : 1.,
				doneP ? float( iterationsUsedP ) / float( NUM_SAMPLES - 1 ) : 1.
			);

			// hacky way of reduces blurriness of mostly diagonal edges
			// but reduces AA quality
			dist = pow(dist, .5);

			dist = 1. - dist;

			return mix(
				rgbaM,
				rgbaN,
				dist * .5
			);
		}

		void main() {
			const float edgeDetectionQuality = .2;
			const float invEdgeDetectionQuality = 1. / edgeDetectionQuality;

			gl_FragColor = FxaaPixelShader(
				vUv,
				tDiffuse,
				resolution,
				edgeDetectionQuality, // [0,1] contrast needed, otherwise early discard
				invEdgeDetectionQuality
			);

		}
	`}; function mT(i) { return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i } var va = { exports: {} }; va.exports = kc; var gT = va.exports.isMobile = kc; va.exports.default = kc; const _T = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i, xT = /CrOS/, vT = /android|ipad|playbook|silk/i; function kc(i) { i || (i = {}); let e = i.ua; if (!e && typeof navigator < "u" && (e = navigator.userAgent), e && e.headers && typeof e.headers["user-agent"] == "string" && (e = e.headers["user-agent"]), typeof e != "string") return !1; let t = _T.test(e) && !xT.test(e) || !!i.tablet && vT.test(e); return !t && i.tablet && i.featureDetect && navigator && navigator.maxTouchPoints > 1 && e.indexOf("Macintosh") !== -1 && e.indexOf("Safari") !== -1 && (t = !0), t } var MT = va.exports; const Pf = mT(MT), Hc = {
	Spain: {
		link: "https://r.mail.ru/n412299999", position: [-3.393347, 48.603829], flag: "Spain_flag.png", flag_active: "Spain_flag_active.png", popup: {
			title: "ИСПАНИЯ", image: "images/spain_flag_image.png", content: `Крупнейшая в мире лотерея проводится здесь каждый год 22 декабря. Именно в этот день для миллионов испанцев стартуют рождественские гуляния. Люди садятся у телевизоров, чтобы наблюдать в прямом эфире за розыгрышем. Все особенно ждут момента, когда вытянут главный приз. Его из-за крупной суммы называют El gordo, что переводится как «толстяк». 

Для испанцев лотерея — это коллективная игра, которая сближает. Все потому, что каждый билет делится на 10 частей по 20 евро, и как правило, испанцы — даже те, кто не участвует в розыгрышах в остальное время, —  на Рождество покупают себе десятую долю. Поскольку одна и та же комбинация может продаваться в одном районе или даже в одном киоске, нередко победителями становятся соседи.`}
	}, France: {
		link: "https://r.mail.ru/n412299866", position: [6.394015, 53.939563], flag: "France_flag.png", flag_active: "France_flag_active.png", popup: {
			title: "ФРАНЦИЯ", image: "images/france_flag_image.png", content: `В стране любви и романтики лотерейные билеты наряду с цветами и духами принято дарить на День святого Валентина. Также 14 февраля проводятся розыгрыши — причем уже не одно десятилетие. К примеру, сохранились лотерейные билеты, выпущенные в 70-е годы, и постеры, призывающие подарить возлюбленной возможность попытать удачу и выиграть денежный приз.

Один из рекордных выигрышей в День всех влюбленных составил 13 миллионов евро, они достались мужчине из департамента Сона и Луара. Ну а в этом году джекпот никто не сорвал, но трое участников ушли с выигрышем по 100 тысяч евро.`}
	}, Canada: {
		link: "https://r.mail.ru/n412299862", position: [-148.731992, 52], flag: "Canada_flag.png", flag_active: "Canada_flag_active.png", popup: {
			title: "КАНАДА", image: "images/canada_flag_image.png", content: `Здесь победители розыгрышей, чтобы получить приз, решают математическую задачу. Не потому, что они должны доказать, что могут распорядиться выигрышем с умом, а потому что так устроено канадское законодательство. Лотереи и любые формы азартных игр были запрещены в 1892 году. Спустя несколько лет правительство все же разрешило проводить их в благотворительных целях, а еще позже — на ярмарках и выставках, а также в провинциях. 

По закону, если для получения приза у претендентов проверяют и оценивают те или иные навыки, то подобное мероприятие уже не считается азартной игрой. Так и появился специальный тест для победителей. Конечно, это просто формальность, и вопросы достаточно легкие: чаще всего это несложный математический пример уровня 5-го класса школы.`}
	}, Khimki: {
		link: "https://r.mail.ru/n412299884", position: [30, 52], flag: "Khimki_NewYearTree.png", flag_active: "Khimki_NewYearTree_active.png", popup: {
			title: "ХИМКИ", image: "images/khimki_newyear_tree_image.png", content: `Для Павла из Химок выигрыш в лотерею стал подарком на Новый год. Мужчина перед праздником купил 7 билетов. Те, что не выиграли, автоматически попали в акцию «Рождественская сказка». По ней с помощью рандомайзера раздавали 300 призов по 50 тысяч рублей, и Павел стал одним из победителей. Когда пришло сообщение с результатом розыгрыша – мужчина очень удивился и обрадовался. 

Неожиданный успех вдохновил Павла – он решил, что продолжит участвовать в лотереях. Возможно, удача улыбнется ему снова, и он выиграет еще более внушительный приз.`}
	}, Likhoslavl: {
		link: "https://r.mail.ru/n412299888", position: [18.078209, 56.48575], flag: "Likhoslavl_ring.png", flag_active: "Likhoslavl_ring_active.png", popup: {
			title: "ЛИХОСЛАВЛЬ", image: "images/likhoslavl_ring_image.png", content: `Николай из Лихославля купил билеты «Мечталлион» спонтанно – увидел их на кассе в супермаркете. До этого он пробовал играть в лотерею только один раз – 7 лет назад, и тогда особого результата не было. В этот раз предчувствие не подвело: из четырех билетов два оказались счастливыми. Один принес 200 рублей, другой – 3,8 миллиона. Николай был настолько поражен, что даже не сразу поверил в такой огромный выигрыш. 

Пока любимец фортуны не решил, на что потратить деньги. Раздумывает вместе с невестой над самыми разными вариантами, ведь на такую сумму можно и машину купить, и бизнес открыть, и свадьбу устроить.`}
	}, Russia_clock: {
		link: "https://r.mail.ru/n412299891", position: [80, 53], flag: "Russia_clock.png", flag_active: "Russia_clock_active.png", popup: {
			title: "РОССИя", image: "images/russia_clocks_image.png", content: `Первое упоминание о лотерее в России относится ко времени правления Петра I. В 1699 году придворный часовщик Яков Гассениус получил от царя разрешение организовать иноземное развлечение — розыгрыш. Участвовать мог любой желающий, заплативший 10 копеек за билет. Затем из барабана доставали счастливые номера, и организатор сразу отдавал призы любимцам фортуны. 

Максимальный выигрыш мог составить тысячу рублей. Это были большие по тем временам деньги: к примеру, дворянину на учебу за границей тогда требовалось порядка 300 рублей. Победители лотереи, получившие по 20 рублей, могли купить целый дом или открыть торговую лавку в центре Москвы.`}
	}, Russia_magicsphere: {
		link: "https://r.mail.ru/n412299892", position: [62, 60], flag: "Russia_magicsphere.png", flag_active: "Russia_magicsphere_active.png", popup: {
			title: "РОССИя", image: "images/russia_magic_sphere_image.png", content: `Если в других странах ищут знаки судьбы или стараются разузнать счастливые комбинации у победителей, то россияне руководствуются прежде всего своими предпочтениями. 24% участвующих в розыгрышах покупают тот билет, в котором есть любимые числа. Среди молодых людей от 18 до 25 лет, согласно опросу, проведенному «Национальной лотереей», 12% выбирают комбинации только с четными или нечетными числами, а 9% проверяют благосклонность фортуны исключительно в «счастливые» для них дни. 

При этом в помощь астрологов и тарологов верят немногие. На предсказания опираются меньше 4% опрошенных.`}
	}, Russia_oldpaper: {
		link: "https://r.mail.ru/n412299893", position: [100, 65], flag: "Russia_oldpaper.png", flag_active: "Russia_oldpaper_active.png", popup: {
			title: "РОССИя", image: "images/russia_old_paper_image.png", content: `В России расцвет частных лотерей пришелся на середину XVIII века, когда в дворянской среде стало модно заниматься благотворительностью. Деньги собирали на содержание больниц, помощь пострадавшим от неурожая и другие нужды. Розыгрыши быстро стали элементом светской жизни, поэтому тема счастливых билетов и капризов фортуны присутствует в произведениях многих русских писателей, например у Салтыкова-Щедрина, Куприна, Чехова. 

Позже лотереи начали проводить под контролем государства, они стали массовыми и доступными всем. Поймать удачу за хвост можно было в праздники, на ярмарках, на балу — или приняв участие в государственном розыгрыше. Традиция благотворительных лотерей сохранилась, в наши дни их проводят в поддержку социально значимых проектов.`}
	}, Saint_Petersburg_house: {
		link: "https://r.mail.ru/n412299968", position: [34.768279, 66.541868], flag: "Saint-Petersburg_house.png", flag_active: "Saint-Petersburg_house_active.png", popup: {
			title: "САНКТ-ПЕТЕРБУРГ", image: "images/saint_petersburg_house_image.png", content: `Жительница Петербурга Яна время от времени покупала лотерейные билеты и верила, что однажды выиграет. Но она и представить не могла, что станет обладательницей самого крупного за всю историю игры суперприза лотереи «Топ 12» и получит 33 миллиона рублей. Увидев результат, Яна не поверила своим глазам – никто из знакомых раньше не выигрывал большие суммы. Ее молодой человек тоже отнесся к новости скептически и предположил, что никаких денег победительница не увидит. Все оказалось иначе. 

Теперь Яна точно знает, что все возможно. Она решила и дальше покупать билеты, ведь фортуна любит везучих, а значит, удача может улыбнуться ей снова. Ну а пока на выигранные деньги планирует исполнить мечту – закрыть ипотеку.`}
	}, Saint_Petersburg_lion: {
		link: "https://r.mail.ru/n412299992", position: [27.113763, 60.902129], flag: "Saint-Petersburg_lion.png", flag_active: "Saint-Petersburg_lion_active.png", popup: {
			title: "САНКТ-ПЕТЕРБУРГ", image: "images/saint_petersburg_lion_image.png", content: `Для дрессировщика тигров из Санкт-Петербурга Рустама с выигрыша в лотерею начался год. Он купил билеты в магазине: просто взял на кассе оставшиеся четыре, на цифры даже не посмотрел. Утром 1 января Рустаму пришло сообщение – оказалось, что он выиграл 25 миллионов рублей. Мужчина долго не мог поверить в это, думал, что это реклама очередной лотереи. 

Рустам уже решил, что будет делать с деньгами. Он планирует потратить часть суммы на уход за своими подопечными – тиграми. Победитель хочет также осуществить давнюю мечту и открыть небольшой бизнес после выхода на пенсию.`}
	}, Saratov_workingman: {
		link: "https://r.mail.ru/n412299997", position: [43.249433, 48.174366], flag: "Saratov_workingman.png", flag_active: "Saratov_workingman_active.png", popup: {
			title: "САРАТОВ", image: "images/saratov_working_man_image.png", content: `В коллективе Валерия, директора строительной компании, игра в лотерею – это уже традиция. Каждый раз после сдачи нового объекта сотрудники всей бригадой пробуют поймать удачу за хвост. Они заходят в мобильное приложение «Национальная Лотерея», выбирают розыгрыш и отмечают каждый свои цифры. За несколько лет фортуна нередко улыбалась компании: они два раза становились обладателями 30 тысяч рублей. Теперь наконец Валерию попался крупный выигрыш – 3,6 миллионов рублей.

На полученные деньги победитель собирается купить мотоцикл и поехать вдвоем с женой на юг. Что касается участия в новых лотереях, то Валерий не собирается отказываться от счастливой традиции – вдруг еще раз повезет?!`}
	}, Thailand: {
		link: "https://r.mail.ru/n412300009", position: [77, 15], flag: "Thailand_flag.png", flag_active: "Thailand_flag_active.png", popup: {
			title: "ТАИЛАНД", image: "images/thailand_flag_image.png", content: `Для тайцев лотерея — национальное развлечение. Два раза в месяц они замирают в ожидании розыгрыша, чтобы проверить, удалось ли им составить счастливую комбинацию. К выбору чисел подходят очень ответственно: ищут подсказки в снах и жизненных происшествиях. Например, номер встретившегося автомобиля вполне может быть заветным числом. 

Популярностью в Таиланде пользуются газеты и журналы с прогнозами и советами по составлению комбинаций. Многие стараются заручиться поддержкой богов: идут в храмы и совершают специальные обряды. Именно молитвы, утверждает победитель лотереи в 2023 году, помогли ему сорвать куш в 116 миллионов бат (около 290 миллионов рублей).`}
	}, Ugra_family: {
		link: "https://r.mail.ru/n412300019", position: [58, 50], flag: "Ugra_family.png", flag_active: "Ugra_family_active.png", popup: {
			title: "ЮГРА", image: "images/ugra_family_image.png", content: `У Анастасии из Югры получилось, что называется, взять количеством. Она приобрела в общей сложности 300 билетов на новогодний «Мечталлион». Покупала онлайн и в разных точках продаж. В итоге часть билетов принесла небольшие суммы, а один, купленный на сайте, стал счастливым. Анастасия выиграла 1 миллион рублей и останавливаться не планирует, ведь участие в розыгрыше всегда приносит яркие эмоции: волнение, интерес, радость. 

Традицию покупать лотерейные билеты придумал отец Анастасии, а уже она заразила своей любовью к розыгрышам друзей и родственников. Увидев, что действительно можно стать обладателем солидного приза, они тоже стали покупать билеты и получать неплохие суммы.`}
	}
}, Ma = (i, e) => { const t = i.__vccOpts || i; for (const [n, s] of e) t[n] = s; return t }, yT = {}, ST = { class: "w-64 select-none h-14 px-4 py-2.5 bg-neutral-100/opacity-60 rounded-3xl backdrop-blur-lg justify-start items-center gap-2.5 inline-flex" }, ET = mg('<div class="w-9 h-9 relative"><div class="w-9 h-9 left-0 top-0 absolute bg-blue-600 rounded-full"><svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="icon"><circle id="Ellipse 10" cx="18" cy="18.5476" r="18" fill="#007AFF"></circle><path id="Ellipse 11 (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M18.0009 10.6199C13.6221 10.6199 10.0723 14.1697 10.0723 18.5485C10.0723 22.9273 13.6221 26.4771 18.0009 26.4771C20.5944 26.4771 22.8971 25.2325 24.3447 23.3053L25.3727 24.0775C23.6927 26.3141 21.0159 27.7628 18.0009 27.7628C12.912 27.7628 8.78662 23.6374 8.78662 18.5485C8.78662 13.4596 12.912 9.33423 18.0009 9.33423C20.7024 9.33423 23.1327 10.4975 24.8173 12.3485L27.8965 11.2445L26.5723 18.5485L20.909 13.7497L23.4878 12.8251C22.0629 11.4586 20.13 10.6199 18.0009 10.6199Z" fill="#F5F5F8"></path></g></svg></div></div><div class="w-44 h-9 text-neutral-700 text-base font-normal font-Circe leading-tight">Вращай Землю и кликай на картинки историй</div>', 2), TT = [ET]; function bT(i, e) { return Rn(), Qi("div", ST, TT) } const AT = Ma(yT, [["render", bT]]), wT = { __name: "Globe", setup(i) { const e = br(null), t = yi("context"), n = br(!1); let s, r, o, a, l, c, u, h = null; const f = new Ee; let d = null, _ = [], v, p; Pf() ? (v = 0, p = 200) : (v = -150, p = 0); const m = () => { s = new IS, s.fog = new Ic(16121824, 15, 35), o = new kt(45, window.innerWidth / window.innerHeight, .1, 1e3), o.position.set(0, 6, 24); const D = new cE(16777184, 2); s.add(D); const I = new iE(4294967295, 16777215, 1); I.color.setHSL(.6, 1, .9), I.groundColor.setHSL(.095, 1, .75), I.position.set(0, -50, 0), s.add(I); const C = new xp(16777215, 1); C.position.set(0, 50, -50), C.castShadow = !0, C.color.setHSL(.1, 1, .95), C.shadow.mapSize.width = 4096, C.shadow.mapSize.height = 4096, C.shadow.camera.near = .5, C.shadow.camera.far = 500; const z = 50; C.shadow.camera.left = -z, C.shadow.camera.right = z, C.shadow.camera.top = z, C.shadow.camera.bottom = -z, C.shadow.radius = 10, C.shadow.bias = -1e-4, s.add(C), r = new LS({ antialias: !0, alpha: !0 }), r.setPixelRatio(Math.min(window.devicePixelRatio, 2)), r.setSize(window.innerWidth, window.innerHeight), r.setClearColor(0, 0), r.shadowMap.enabled = !0, r.shadowMap.type = Pd, r.domElement.style.transform = `translate(${-v}px, ${p}px)`, window.addEventListener("resize", () => { console.log("run"), o.aspect = window.innerWidth / window.innerHeight, o.updateProjectionMatrix(), r.setSize(window.innerWidth, window.innerHeight), r.setPixelRatio(Math.min(window.devicePixelRatio, 2)) }), l = new hT(r); const Y = new fT(s, o); l.addPass(Y), c = new gi(s, o, window.innerWidth, window.innerHeight), c.kernelRadius = 16, l.addPass(c), u = new Sp(pT); const X = r.getPixelRatio(); u.material.uniforms.resolution.value.set(1 / (window.innerWidth * X), 1 / (window.innerHeight * X)), l.addPass(u), new oT().load("/mud_road_puresky_2k.hdr", ne => { const oe = new jl(r), pe = oe.fromEquirectangular(ne).texture; s.environment = pe, ne.dispose(), oe.dispose() }), e.value.appendChild(r.domElement), a = new EE(o, r.domElement), a.enableDamping = !0, a.enableZoom = !1, a.enablePan = !1; const ee = new TE; let G = new sT; G.setDecoderPath("draco/"), G.setDecoderConfig({ type: "js" }), G.preload(), ee.setDRACOLoader(G), ee.load("e3.glb", ne => { d = ne.scene, d.traverse(oe => { oe.castShadow = !0, oe.receiveShadow = !0 }), d.addEventListener("added", () => { _ = b() }), s.add(d) }), s.rotation.y = Math.PI + .5, s.rotation.x = .3, O(), h = new yE, document.addEventListener("click", P), document.addEventListener("pointerdown", () => { n.value || (n.value = !0) }), document.addEventListener("pointermove", M) }; function b() { const D = []; return Object.entries(Hc).map(([I, C]) => { const z = y(C.position), Y = A(z, C.flag, I), X = A(z, C.flag_active, `${I}_active`); X.visible = !1, D.push(Y, X) }), D } function y(D) { let I = new Zl; I.radius = 7.3; const C = D[0], z = D[1], Y = (C + 90) * (Math.PI / 180), X = (90 - z) * (Math.PI / 180); I.phi = X, I.theta = Y; let ee = new B; return ee.setFromSpherical(I), ee } function A(D, I, C) { let z = new _p().load(I); z.colorSpace = Tt; let Y = new up({ map: z }), X = new DS(Y); return X.scale.set(1.428571428571429, 1, 1), X.position.copy(D), X.lookAt(new B(0, 0, 0)), s.add(X), X.name = C, X } function O() { d && (s.rotation.y += .001), a.update(), requestAnimationFrame(O), r.render(s, o), setTimeout(() => { t.value.doneRender = !0 }, 1500) } const P = D => { if (t.value.activeCountry && Pf) return; f.x = (D.clientX + v) / window.innerWidth * 2 - 1, f.y = -((D.clientY - p) / window.innerHeight) * 2 + 1, h.setFromCamera(f, o); const I = h.intersectObjects(_); if (I.length === 0) return; const C = I[0].object; if (!(C.type !== "Sprite" || C.name === t.value.activeCountry)) { t.value.activeCountry = C.name; try { window.snitch("pinClick", { pin: C.name }) } catch (z) { console.log(z == null ? void 0 : z.message) } } }; let R, L, S; const M = D => { f.x = (D.clientX + v) / window.innerWidth * 2 - 1, f.y = -((D.clientY - p) / window.innerHeight) * 2 + 1, h.setFromCamera(f, o); const I = h.intersectObjects(_); I.length > 0 ? (R && R !== I[0].object.name && (S.visible = !0, L.visible = !1), I[0].object.type === "Sprite" && (S = I[0].object, S.visible = !1, R = S.name, L = s.getObjectByName(S.name + "_active"), L.visible = !0)) : S && (S.visible = !0, L.visible = !1), r.render(s, o) }; return Or(m), (D, I) => (Rn(), Ol(Wn, { name: "fade", appear: "" }, { default: _i(() => [Rr(ct("div", { ref_key: "cameraDiv", ref: e, class: "relative" }, [n.value ? gg("", !0) : (Rn(), Ol(AT, { key: 0, class: "absolute top-[calc(50%+200px)] md:top-1/2 left-1/2 md:left-[calc(50%+150px)] -translate-x-1/2 -translate-y-1/2 z-50" }))], 512), [[Lr, Go(t).doneRender]])]), _: 1 })) } }, RT = Ma(wT, [["__scopeId", "data-v-ad071721"]]), CT = "/assets/header-desktop-DPUwpysD.png", PT = "/assets/header-mobile-Iwi8yxj-.png", LT = ct("img", { src: CT, class: "hidden md:block header-img" }, null, -1), IT = ct("img", { src: PT, class: "md:hidden" }, null, -1), DT = [LT, IT], NT = Om({ __name: "Header", setup(i) { const e = s => s < .2 ? .5 * Math.pow(s, 4) : s < .5 ? Math.pow(s, 2) : 1 - Math.pow(-2 * s + 2, 3) / 2; let t; const n = s => { const r = window.innerHeight, o = 200; let l = (r - o) / (900 - o); l = Math.min(Math.max(l, 0), 1); const u = 200 + 70 * e(l); s && (s.style.height = `${u}px`) }; return Or(() => { t = document.querySelector(".header-img"), n(t), window.addEventListener("resize", () => n(t)) }), _c(() => { window.removeEventListener("resize", () => n(t)) }), (s, r) => (Rn(), Qi("div", null, DT)) } }), UT = ["href"], OT = ct("p", { class: "text-center text-sm md:text-base font-normal font-Circe uppercase" }, " Испытать удачу ", -1), FT = ct("svg", { xmlns: "http://www.w3.org/2000/svg", class: "h-4 mb-1 fill-current", viewBox: "0 0 22 22" }, [ct("path", { d: "M9.07387 2.04873C9.78471 0.486463 12.0039 0.486463 12.7147 2.04873L14.3286 5.59561C14.6197 6.23542 15.2253 6.67543 15.9237 6.75459L19.7957 7.1934C21.5012 7.38668 22.187 9.49722 20.9208 10.656L18.0462 13.2869C17.5277 13.7615 17.2964 14.4735 17.4369 15.1622L18.2161 18.9803C18.5593 20.662 16.764 21.9664 15.2706 21.1203L11.8802 19.1994C11.2686 18.8529 10.52 18.8529 9.9084 19.1994L6.51797 21.1203C5.02461 21.9664 3.22928 20.662 3.57247 18.9803L4.35165 15.1622C4.4922 14.4735 4.26087 13.7615 3.74233 13.2869L0.867761 10.656C-0.398384 9.49722 0.287372 7.38668 1.99284 7.1934L5.86482 6.75459C6.56328 6.67543 7.16891 6.23542 7.46002 5.59561L9.07387 2.04873Z" })], -1), BT = [OT, FT], Ep = { __name: "LinkButton", setup(i) { const e = yi("context"), t = yc(() => e.value.activeCountry ? Hc[e.value.activeCountry].link : "https://r.mail.ru/n412299829", [e.value.activeCountry]); return (n, s) => (Rn(), Qi("a", { href: t.value, target: "_blank", class: "text-white hover:text-neutral-700 active:text-neutral-700 duration-200 bg-blue-600 hover:bg-transparent active:bg-transparent hover:ring-2 active:ring-2 ring-inset ring-neutral-700 rounded-[60px] justify-center items-center flex py-4 px-6 gap-3" }, BT, 8, UT)) } }, kT = { class: "w-11/12 max-h-[95%] h-fit md:w-5/12 px-5 py-8 bg-white rounded-[30px] border border-neutral-100 backdrop-blur-[20px] flex-col justify-between items-start inline-flex" }, HT = ct("svg", { xmlns: "http://www.w3.org/2000/svg", class: "stroke-current", width: "42", height: "42", viewBox: "0 0 38 38", fill: "none" }, [ct("path", { d: "M13.2998 13.3L24.6996 24.7", "stroke-width": "2" }), ct("path", { d: "M24.7002 13.3002L13.3004 24.7002", "stroke-width": "2" })], -1), zT = [HT], VT = { class: "text-neutral-700 text-7xl font-Sansterdam uppercase shrink-0 mb-2" }, GT = { class: "w-36 aspect-square rounded-xl bg-zinc-100 shrink-0 overflow-hidden" }, WT = ["src", "alt"], XT = { class: "relative w-full md:w-11/12 overflow-y-auto my-4" }, jT = ct("div", { class: "sticky top-0 inset-x-0 h-4 bg-gradient-to-t from-transparent to-white" }, null, -1), YT = { class: "text-neutral-700 text-xs md:text-base font-normal font-Circe leading-tight whitespace-pre-wrap" }, qT = ct("div", { class: "sticky bottom-0 inset-x-0 h-4 bg-gradient-to-b from-transparent to-white" }, null, -1), KT = { __name: "Popup", setup(i) { const e = yi("context"), t = yc(() => e.value.activeCountry ? Hc[e.value.activeCountry].popup : {}, [e.value.activeCountry]); function n() { e.value.activeCountry = "" } return (s, r) => (Rn(), Qi("div", kT, [ct("button", { onClick: n, class: "group rounded-full absolute right-5 top-8 bg-blue-600 text-white hover:bg-transparent hover:text-neutral-700 hover:ring-2 ring-neutral-700 ring-inset duration-200" }, zT), ct("div", VT, zo(t.value.title), 1), ct("div", GT, [ct("img", { src: t.value.image, alt: s.title, class: "size-full" }, null, 8, WT)]), ct("div", XT, [jT, ct("p", YT, zo(t.value.content), 1), qT]), nt(Ep, { class: "shrink-0" })])) } }, $T = { class: "hidden md:block text-left text-white/60 text-xs font-normal font-Circe whitespace-pre-wrap" }, ZT = { class: "md:hidden text-center text-white/60 text-xs font-normal font-Circe whitespace-pre-wrap" }, JT = {
	__name: "Footer", setup(i) {
		const e = {
			desktop: `Реклама. ООО «Спортивные Лотереи» ИНН
5003133760 ОГРН 1195027010386
erid: 2VtzqwfFJgf`, mobile: `Реклама. ООО «Спортивные Лотереи» ИНН 5003133760 ОГРН 1195027010386
erid: 2VtzqwfFJgf`}; return (t, n) => (Rn(), Qi("div", null, [ct("p", $T, zo(e.desktop), 1), ct("p", ZT, zo(e.mobile), 1)]))
	}
}, QT = "/assets/cloud-left-B31yK3sH.png", eb = "/assets/cloud-right-Duzohvlp.png", tb = { class: "size-full" }, nb = { src: eb, class: "w-96 absolute -right-20 top-80 md:top-48" }, ib = { __name: "Clouds", setup(i) { const e = yi("context"), t = br(null), n = br(window.innerHeight), s = () => { if (gT()) return; const r = window.innerHeight; n.value - r, t.value }; return Or(() => { window.addEventListener("resize", s) }), gc(() => { window.removeEventListener("resize", s) }), (r, o) => (Rn(), Qi("div", tb, [nt(Wn, { appear: "", name: "cloud-left" }, { default: _i(() => [Rr(ct("img", { ref_key: "cloud_left", ref: t, src: QT, class: "w-[30rem] absolute -bottom-40 left-28 cloud-left" }, null, 512), [[Lr, Go(e).doneRender]])]), _: 1 }), nt(Wn, { appear: "", name: "cloud-right" }, { default: _i(() => [Rr(ct("img", nb, null, 512), [[Lr, Go(e).doneRender]])]), _: 1 })])) } }, sb = Ma(ib, [["__scopeId", "data-v-bae3ceb3"]]), rb = i => (ym("data-v-85fb38de"), i = i(), Sm(), i), ob = rb(() => ct("div", { class: "stamp-bg size-40 md:size-56 shrink-0 absolute -top-20 left-3 md:-top-28 md:left-24" }, null, -1)), ab = { __name: "App", setup(i) { const e = br({ activeCountry: "", doneRender: !1 }); return md("context", e), (t, n) => (Rn(), Qi(fn, null, [nt(Wn, { name: "slide-down-slow", appear: "" }, { default: _i(() => [ob]), _: 1 }), nt(Wn, { name: "slide-right-slow", appear: "" }, { default: _i(() => [nt(NT, { class: "absolute top-20 w-full p-4 pt-5 md:w-[28rem] md:left-24 header" })]), _: 1 }), nt(sb, { class: "fixed inset-0 pointer-events-none" }), nt(RT), nt(JT, { class: "absolute bottom-6 inset-x-0 md:bottom-20 md:-mt-4 md:right-24 md:left-auto" }), nt(Wn, { name: "fade" }, { default: _i(() => [Rr(nt(Ep, { class: "absolute top-3 right-3 md:right-auto md:top-auto md:bottom-20 md:left-24" }, null, 512), [[Lr, !e.value.activeCountry]])]), _: 1 }), nt(Wn, { name: "slide-up" }, { default: _i(() => [Rr(nt(KT, { class: "absolute top-0 left-0 right-0 bottom-0 md:right-10 md:top-10 md:left-auto md:bottom-10 m-auto" }, null, 512), [[Lr, e.value.activeCountry]])]), _: 1 })], 64)) } }, lb = Ma(ab, [["__scopeId", "data-v-85fb38de"]]); n_(lb).mount("#app");
