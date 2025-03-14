(function(h) {
    var x,
        y = "",
        G = Math.PI,
        E = G / 2,
        q = "Touch" in window,
        I = q ? {
            start: "touchstart",
            move: "touchmove",
            end: "touchend"
        } : {
            start: "mousedown",
            move: "mousemove",
            end: "mouseup"
        },
        J = {
            backward: ["bl", "tl"],
            forward: ["br", "tr"],
            all: ["tl", "bl", "tr", "br"]
        },
        O = ["single", "double"],
        P = {
            page: 1,
            gradients: !0,
            duration: 600,
            acceleration: !0,
            display: "double",
            when: null
        },
        Q = {
            folding: null,
            corners: "forward",
            cornerSize: 100,
            gradients: !0,
            duration: 600,
            acceleration: !0
        },
        K = {
            "0": {
                top: 0,
                left: 0,
                right: "auto",
                bottom: "auto"
            },
            1: {
                top: 0,
                right: 0,
                left: "auto",
                bottom: "auto"
            }
        },
        l = function(a, b, c, d) {
            return {
                css: {
                    position: "absolute",
                    top: a,
                    left: b,
                    overflow: d || "hidden",
                    "z-index": c || "auto"
                }
            }
        },
        L = function(a, b, c, d, e) {
            var f = 1 - e,
                C = f * f * f,
                i = e * e * e;
            return j(Math.round(C * a.x + 3 * e * f * f * b.x + 3 * e * e * f * c.x + i * d.x), Math.round(C * a.y + 3 * e * f * f * b.y + 3 * e * e * f * c.y + i * d.y))
        },
        j = function(a, b) {
            return {
                x: a,
                y: b
            }
        },
        s = function(a, b, c) {
            return x && c ? " translate3d(" + a + "px," + b + "px, 0px) " : " translate(" + a + "px, " + b + "px) "
        },
        t = function(a) {
            return " rotate(" + a + "deg) "
        },
        p = function(a, b) {
            return Object.prototype.hasOwnProperty.call(b,
            a)
        },
        R = function() {
            for (var a = ["Moz", "Webkit", "Khtml", "O", "ms"], b = a.length, c = ""; b--;)
                a[b] + "Transform" in document.body.style && (c = "-" + a[b].toLowerCase() + "-");
            return c
        },
        M = function(a, b, c, d, e) {
            var f,
                C = [];
            if ("-webkit-" == y) {
                for (f = 0; f < e; f++)
                    C.push("color-stop(" + d[f][0] + ", " + d[f][1] + ")");
                a.css({
                    "background-image": "-webkit-gradient(linear, " + b.x + "% " + b.y + "%,  " + c.x + "% " + c.y + "%, " + C.join(",") + " )"
                })
            } else {
                var b = {
                        x: b.x / 100 * a.width(),
                        y: b.y / 100 * a.height()
                    },
                    c = {
                        x: c.x / 100 * a.width(),
                        y: c.y / 100 * a.height()
                    },
                    i = c.x - b.x;
                f = c.y -
                b.y;
                var h = Math.atan2(f, i),
                    g = h - Math.PI / 2,
                    g = Math.abs(a.width() * Math.sin(g)) + Math.abs(a.height() * Math.cos(g)),
                    i = Math.sqrt(f * f + i * i),
                    c = j(c.x < b.x ? a.width() : 0, c.y < b.y ? a.height() : 0),
                    n = Math.tan(h);
                f = -1 / n;
                n = (f * c.x - c.y - n * b.x + b.y) / (f - n);
                c = f * n - f * c.x + c.y;
                b = Math.sqrt(Math.pow(n - b.x, 2) + Math.pow(c - b.y, 2));
                for (f = 0; f < e; f++)
                    C.push(" " + d[f][1] + " " + 100 * (b + i * d[f][0]) / g + "%");
                a.css({
                    "background-image": y + "linear-gradient(" + -h + "rad," + C.join(",") + ")"
                })
            }
        },
        g = {
            init: function(a) {
                void 0 === x && (x = "WebKitCSSMatrix" in window || "MozPerspective" in
                document.body.style, y = R());
                var b,
                    c = this.data(),
                    d = this.children(),
                    a = h.extend({
                        width: this.width(),
                        height: this.height()
                    }, P, a);
                c.opts = a;
                c.pageObjs = {};
                c.pages = {};
                c.pageWrap = {};
                c.pagePlace = {};
                c.pageMv = [];
                c.totalPages = a.pages || 0;
                if (a.when)
                    for (b in a.when)
                        p(b, a.when) && this.bind(b, a.when[b]);
                this.css({
                    position: "relative",
                    width: a.width,
                    height: a.height
                });
                this.turn("display", a.display);
                x && !q && a.acceleration && this.transform(s(0, 0, !0));
                for (b = 0; b < d.length; b++)
                    this.turn("addPage", d[b], b + 1);
                this.turn("page", a.page);
                J = h.extend({}, J, a.corners);
                h(this).bind(I.start, function(a) {
                    for (var b in c.pages)
                        if (p(b, c.pages) && i._eventStart.call(c.pages[b], a) === false)
                            return false
                });
                h(document).bind(I.move, function(a) {
                    for (var b in c.pages)
                        p(b, c.pages) && i._eventMove.call(c.pages[b], a)
                }).bind(I.end, function(a) {
                    for (var b in c.pages)
                        p(b, c.pages) && i._eventEnd.call(c.pages[b], a)
                });
                c.done = !0;
                return this
            },
            addPage: function(a, b) {
                var c = !1,
                    d = this.data(),
                    e = d.totalPages + 1;
                if (b)
                    if (b == e)
                        b = e,
                        c = !0;
                    else {
                        if (b > e)
                            throw Error('It is impossible to add the page "' +
                            b + '", the maximum value is: "' + e + '"');
                    }
                else
                    b = e,
                    c = !0;
                1 <= b && b <= e && (d.done && this.turn("stop"), b in d.pageObjs && g._movePages.call(this, b, 1), c && (d.totalPages = e), d.pageObjs[b] = h(a).addClass("turn-page p" + b), g._addPage.call(this, b), d.done && this.turn("update"), g._removeFromDOM.call(this));
                return this
            },
            _addPage: function(a) {
                var b = this.data(),
                    c = b.pageObjs[a];
                if (c)
                    if (g._necessPage.call(this, a)) {
                        if (!b.pageWrap[a]) {
                            var d = "double" == b.display ? this.width() / 2 : this.width(),
                                e = this.height();
                            c.css({
                                width: d,
                                height: e
                            });
                            b.pagePlace[a] = a;
                            b.pageWrap[a] = h("<div/>", {
                                "class": "turn-page-wrapper",
                                page: a,
                                css: {
                                    position: "absolute",
                                    overflow: "hidden",
                                    width: d,
                                    height: e
                                }
                            }).css(K["double" == b.display ? a % 2 : 0]);
                            this.append(b.pageWrap[a]);
                            b.pageWrap[a].prepend(b.pageObjs[a])
                        }
                        (!a || 1 == g._setPageLoc.call(this, a)) && g._makeFlip.call(this, a)
                    } else
                        b.pagePlace[a] = 0,
                        b.pageObjs[a] && b.pageObjs[a].remove()
            },
            hasPage: function(a) {
                return a in this.data().pageObjs
            },
            _makeFlip: function(a) {
                var b = this.data();
                if (!b.pages[a] && b.pagePlace[a] == a) {
                    var c = "single" ==
                        b.display,
                        d = a % 2;
                    b.pages[a] = b.pageObjs[a].css({
                        width: c ? this.width() : this.width() / 2,
                        height: this.height()
                    }).flip({
                        page: a,
                        next: c && a === b.totalPages ? a - 1 : d || c ? a + 1 : a - 1,
                        turn: this,
                        duration: b.opts.duration,
                        acceleration: b.opts.acceleration,
                        corners: c ? "all" : d ? "forward" : "backward",
                        backGradient: b.opts.gradients,
                        frontGradient: b.opts.gradients
                    }).flip("disable", b.disabled).bind("pressed", g._pressed).bind("released", g._released).bind("start", g._start).bind("end", g._end).bind("flip", g._flip)
                }
                return b.pages[a]
            },
            _makeRange: function() {
                var a;
                this.data();
                var b = this.turn("range");
                for (a = b[0]; a <= b[1]; a++)
                    g._addPage.call(this, a)
            },
            range: function(a) {
                var b,
                    c,
                    d = this.data(),
                    a = a || d.tpage || d.page,
                    e = g._view.call(this, a);
                if (1 > a || a > d.totalPages)
                    throw Error('"' + a + '" is not a page for range');
                e[1] = e[1] || e[0];
                1 <= e[0] && e[1] <= d.totalPages ? (a = Math.floor(2), d.totalPages - e[1] > e[0] ? (b = Math.min(e[0] - 1, a), c = 2 * a - b) : (c = Math.min(d.totalPages - e[1], a), b = 2 * a - c)) : c = b = 5;
                return [Math.max(1, e[0] - b), Math.min(d.totalPages, e[1] + c)]
            },
            _necessPage: function(a) {
                if (0 === a)
                    return !0;
                var b = this.turn("range");
                return a >= b[0] && a <= b[1]
            },
            _removeFromDOM: function() {
                var a,
                    b = this.data();
                for (a in b.pageWrap)
                    p(a, b.pageWrap) && !g._necessPage.call(this, a) && g._removePageFromDOM.call(this, a)
            },
            _removePageFromDOM: function(a) {
                var b = this.data();
                if (b.pages[a]) {
                    var c = b.pages[a].data();
                    c.f && c.f.fwrapper && c.f.fwrapper.remove();
                    b.pages[a].remove();
                    delete b.pages[a]
                }
                b.pageObjs[a] && b.pageObjs[a].remove();
                b.pageWrap[a] && (b.pageWrap[a].remove(), delete b.pageWrap[a]);
                delete b.pagePlace[a]
            },
            removePage: function(a) {
                var b =
                this.data();
                b.pageObjs[a] && (this.turn("stop"), g._removePageFromDOM.call(this, a), delete b.pageObjs[a], g._movePages.call(this, a, -1), b.totalPages -= 1, g._makeRange.call(this), b.page > b.totalPages && this.turn("page", b.totalPages));
                return this
            },
            _movePages: function(a, b) {
                var c,
                    d = this.data(),
                    e = "single" == d.display,
                    f = function(a) {
                        var c = a + b,
                            f = c % 2;
                        d.pageObjs[a] && (d.pageObjs[c] = d.pageObjs[a].removeClass("page" + a).addClass("page" + c));
                        d.pagePlace[a] && d.pageWrap[a] && (d.pagePlace[c] = c, d.pageWrap[c] = d.pageWrap[a].css(K[e ?
                        0 : f]).attr("page", c), d.pages[a] && (d.pages[c] = d.pages[a].flip("options", {
                            page: c,
                            next: e || f ? c + 1 : c - 1,
                            corners: e ? "all" : f ? "forward" : "backward"
                        })), b && (delete d.pages[a], delete d.pagePlace[a], delete d.pageObjs[a], delete d.pageWrap[a], delete d.pageObjs[a]))
                    };
                if (0 < b)
                    for (c = d.totalPages; c >= a; c--)
                        f(c);
                else
                    for (c = a; c <= d.totalPages; c++)
                        f(c)
            },
            display: function(a) {
                var b = this.data(),
                    c = b.display;
                if (a) {
                    if (-1 == h.inArray(a, O))
                        throw Error('"' + a + '" is not a value for display');
                    "single" == a ? b.pageObjs[0] || (this.turn("stop").css({
                        overflow: "hidden"
                    }),
                    b.pageObjs[0] = h("<div />", {
                        "class": "turn-page p-temporal"
                    }).css({
                        width: this.width(),
                        height: this.height()
                    }).appendTo(this)) : b.pageObjs[0] && (this.turn("stop").css({
                        overflow: ""
                    }), b.pageObjs[0].remove(), delete b.pageObjs[0]);
                    b.display = a;
                    c && (a = this.turn("size"), g._movePages.call(this, 1, 0), this.turn("size", a.width, a.height).turn("update"));
                    return this
                }
                return c
            },
            animating: function() {
                return 0 < this.data().pageMv.length
            },
            disable: function(a) {
                var b,
                    c = this.data(),
                    d = this.turn("view");
                c.disabled = void 0 === a || !0 ===
                a;
                for (b in c.pages)
                    p(b, c.pages) && c.pages[b].flip("disable", a ? h.inArray(b, d) : !1);
                return this
            },
            size: function(a, b) {
                if (a && b) {
                    var c = this.data(),
                        d = "double" == c.display ? a / 2 : a,
                        e;
                    this.css({
                        width: a,
                        height: b
                    });
                    c.pageObjs[0] && c.pageObjs[0].css({
                        width: d,
                        height: b
                    });
                    for (e in c.pageWrap)
                        p(e, c.pageWrap) && (c.pageObjs[e].css({
                            width: d,
                            height: b
                        }), c.pageWrap[e].css({
                            width: d,
                            height: b
                        }), c.pages[e] && c.pages[e].css({
                            width: d,
                            height: b
                        }));
                    this.turn("resize");
                    return this
                }
                return {
                    width: this.width(),
                    height: this.height()
                }
            },
            resize: function() {
                var a,
                    b = this.data();
                b.pages[0] && (b.pageWrap[0].css({
                    left: -this.width()
                }), b.pages[0].flip("resize", !0));
                for (a = 1; a <= b.totalPages; a++)
                    b.pages[a] && b.pages[a].flip("resize", !0)
            },
            _removeMv: function(a) {
                var b,
                    c = this.data();
                for (b = 0; b < c.pageMv.length; b++)
                    if (c.pageMv[b] == a)
                        return c.pageMv.splice(b, 1), !0;
                return !1
            },
            _addMv: function(a) {
                var b = this.data();
                g._removeMv.call(this, a);
                b.pageMv.push(a)
            },
            _view: function(a) {
                var b = this.data(),
                    a = a || b.page;
                return "double" == b.display ? a % 2 ? [a - 1, a] : [a, a + 1] : [a]
            },
            view: function(a) {
                var b = this.data(),
                    a = g._view.call(this, a);
                return "double" == b.display ? [0 < a[0] ? a[0] : 0, a[1] <= b.totalPages ? a[1] : 0] : [0 < a[0] && a[0] <= b.totalPages ? a[0] : 0]
            },
            stop: function() {
                var a,
                    b,
                    c = this.data(),
                    d = c.pageMv;
                c.pageMv = [];
                c.tpage && (c.page = c.tpage, delete c.tpage);
                for (a in d)
                    p(a, d) && (b = c.pages[d[a]].data().f.opts, i._moveFoldingPage.call(c.pages[d[a]], null), c.pages[d[a]].flip("hideFoldedPage"), c.pagePlace[b.next] = b.next, b.force && (b.next = 0 === b.page % 2 ? b.page - 1 : b.page + 1, delete b.force));
                this.turn("update");
                return this
            },
            pages: function(a) {
                var b =
                this.data();
                if (a) {
                    if (a < b.totalPages) {
                        for (var c = a + 1; c <= b.totalPages; c++)
                            this.turn("removePage", c);
                        this.turn("page") > a && this.turn("page", a)
                    }
                    b.totalPages = a;
                    return this
                }
                return b.totalPages
            },
            _fitPage: function(a, b) {
                var c = this.data(),
                    d = this.turn("view", a);
                c.page != a && (this.trigger("turning", [a, d]), -1 != h.inArray(1, d) && this.trigger("first"), -1 != h.inArray(c.totalPages, d) && this.trigger("last"));
                c.pageObjs[a] && (c.tpage = a, this.turn("stop", b), g._removeFromDOM.call(this), g._makeRange.call(this), this.trigger("turned",
                [a, d]))
            },
            _turnPage: function(a) {
                var b,
                    c,
                    d = this.data(),
                    e = this.turn("view"),
                    f = this.turn("view", a);
                d.page != a && (this.trigger("turning", [a, f]), -1 != h.inArray(1, f) && this.trigger("first"), -1 != h.inArray(d.totalPages, f) && this.trigger("last"));
                if (d.pageObjs[a] && (d.tpage = a, this.turn("stop"), g._makeRange.call(this), "single" == d.display ? (b = e[0], c = f[0]) : e[1] && a > e[1] ? (b = e[1], c = f[0]) : e[0] && a < e[0] && (b = e[0], c = f[1]), d.pages[b]))
                    a = d.pages[b].data().f.opts,
                    d.tpage = c,
                    a.next != c && (a.next = c, d.pagePlace[c] = a.page, a.force = !0),
                    "single" == d.display ? d.pages[b].flip("turnPage", f[0] > e[0] ? "br" : "bl") : d.pages[b].flip("turnPage")
            },
            page: function(a) {
                var a = parseInt(a, 10),
                    b = this.data();
                return 0 < a && a <= b.totalPages ? (!b.done || -1 != h.inArray(a, this.turn("view")) ? g._fitPage.call(this, a) : g._turnPage.call(this, a), this) : b.page
            },
            next: function() {
                var a = this.data();
                return this.turn("page", g._view.call(this, a.page).pop() + 1)
            },
            previous: function() {
                var a = this.data();
                return this.turn("page", g._view.call(this, a.page).shift() - 1)
            },
            _addMotionPage: function() {
                var a =
                    h(this).data().f.opts,
                    b = a.turn,
                    c = b.data();
                a.pageMv = a.page;
                g._addMv.call(b, a.pageMv);
                c.pagePlace[a.next] = a.page;
                b.turn("update")
            },
            _start: function(a, b, c) {
                var d = b.turn.data(),
                    e = h.Event("start");
                a.stopPropagation();
                b.turn.trigger(e, [b, c]);
                e.isDefaultPrevented() ? a.preventDefault() : ("single" == d.display && (c = "l" == c.charAt(1), 1 == b.page && c || b.page == d.totalPages && !c ? a.preventDefault() : c ? (b.next = b.next < b.page ? b.next : b.page - 1, b.force = !0) : b.next = b.next > b.page ? b.next : b.page + 1), g._addMotionPage.call(this))
            },
            _end: function(a,
            b) {
                var c = h(this).data().f.opts,
                    d = c.turn,
                    e = d.data();
                a.stopPropagation();
                if (b || e.tpage) {
                    if (e.tpage == c.next || e.tpage == c.page)
                        delete e.tpage,
                        g._fitPage.call(d, e.tpage || c.next, !0)
                } else
                    g._removeMv.call(d, c.pageMv),
                    d.turn("update")
            },
            _pressed: function() {
                var a,
                    b = h(this).data().f,
                    c = b.opts.turn.data().pages;
                for (a in c)
                    a != b.opts.page && c[a].flip("disable", !0);
                return b.time = (new Date).getTime()
            },
            _released: function(a, b) {
                var c = h(this),
                    d = c.data().f;
                a.stopPropagation();
                if (200 > (new Date).getTime() - d.time || 0 > b.x || b.x >
                h(this).width())
                    a.preventDefault(),
                    d.opts.turn.data().tpage = d.opts.next,
                    d.opts.turn.turn("update"),
                    h(c).flip("turnPage")
            },
            _flip: function() {
                var a = h(this).data().f.opts;
                a.turn.trigger("turn", [a.next])
            },
            calculateZ: function(a) {
                var b,
                    c,
                    d,
                    e,
                    f = this,
                    i = this.data();
                b = this.turn("view");
                var h = b[0] || b[1],
                    g = {
                        pageZ: {},
                        partZ: {},
                        pageV: {}
                    },
                    j = function(a) {
                        a = f.turn("view", a);
                        a[0] && (g.pageV[a[0]] = !0);
                        a[1] && (g.pageV[a[1]] = !0)
                    };
                for (b = 0; b < a.length; b++)
                    c = a[b],
                    d = i.pages[c].data().f.opts.next,
                    e = i.pagePlace[c],
                    j(c),
                    j(d),
                    c = i.pagePlace[d] ==
                    d ? d : c,
                    g.pageZ[c] = i.totalPages - Math.abs(h - c),
                    g.partZ[e] = 2 * i.totalPages + Math.abs(h - c);
                return g
            },
            update: function() {
                var a,
                    b = this.data();
                if (b.pageMv.length && 0 !== b.pageMv[0]) {
                    var c = this.turn("calculateZ", b.pageMv);
                    this.turn("view", b.tpage);
                    for (a in b.pageWrap)
                        p(a, b.pageWrap) && (b.pageWrap[a].css({
                            display: c.pageV[a] ? "" : "none",
                            "z-index": c.pageZ[a] || 0
                        }), b.pages[a] && (b.pages[a].flip("z", c.partZ[a] || null), c.pageV[a] && b.pages[a].flip("resize"), b.tpage && b.pages[a].flip("disable", !0)))
                } else
                    for (a in b.pageWrap)
                        p(a,
                        b.pageWrap) && (c = g._setPageLoc.call(this, a), b.pages[a] && b.pages[a].flip("disable", b.disabled || 1 != c).flip("z", null))
            },
            _setPageLoc: function(a) {
                var b = this.data(),
                    c = this.turn("view");
                if (a == c[0] || a == c[1])
                    return b.pageWrap[a].css({
                        "z-index": b.totalPages,
                        display: ""
                    }), 1;
                if ("single" == b.display && a == c[0] + 1 || "double" == b.display && a == c[0] - 2 || a == c[1] + 2)
                    return b.pageWrap[a].css({
                        "z-index": b.totalPages - 1,
                        display: ""
                    }), 2;
                b.pageWrap[a].css({
                    "z-index": 0,
                    display: "none"
                });
                return 0
            },
            // CUSTOM CHANGE BEGIN
            destroy: function() {
                turnDestroy(this);
                return this;
            },
            // CUSTOM CHANGE END
            // CUSTOM CHANGE BEGIN
            setZoom: function(newScale) {
                var data = this.data();
                if (!data) return this;

                // We'll store the factor in data
                data.zoomFactor = newScale;

                // Basic approach: scale the .turnjs container
                this.css({
                    transformOrigin: '0 0',
                    transform: 'scale(' + newScale + ')'
                });

                return this;
            },
            // CUSTOM CHANGE END
        },
        i = {
            init: function(a) {
                a.gradients && (a.frontGradient =
                !0, a.backGradient = !0);
                this.data({
                    f: {}
                });
                this.flip("options", a);
                i._addPageWrapper.call(this);
                return this
            },
            setData: function(a) {
                var b = this.data();
                b.f = h.extend(b.f, a);
                return this
            },
            options: function(a) {
                var b = this.data().f;
                return a ? (i.setData.call(this, {
                    opts: h.extend({}, b.opts || Q, a)
                }), this) : b.opts
            },
            z: function(a) {
                var b = this.data().f;
                b.opts["z-index"] = a;
                b.fwrapper.css({
                    "z-index": a || parseInt(b.parent.css("z-index"), 10) || 0
                });
                return this
            },
            _cAllowed: function() {
                return J[this.data().f.opts.corners] || this.data().f.opts.corners
            },
            _cornerActivated: function(a) {
                if (void 0 === a.originalEvent)
                    return !1;
                var a = q ? a.originalEvent.touches : [a],
                    b = this.data().f,
                    c = b.parent.offset(),
                    d = this.width(),
                    e = this.height(),
                    a = {
                        x: Math.max(0, a[0].pageX - c.left),
                        y: Math.max(0, a[0].pageY - c.top)
                    },
                    b = b.opts.cornerSize,
                    c = i._cAllowed.call(this);
                if (0 >= a.x || 0 >= a.y || a.x >= d || a.y >= e)
                    return !1;
                if (a.y < b)
                    a.corner = "t";
                else if (a.y >= e - b)
                    a.corner = "b";
                else
                    return !1;
                if (a.x <= b)
                    a.corner += "l";
                else if (a.x >= d - b)
                    a.corner += "r";
                else
                    return !1;
                return -1 == h.inArray(a.corner, c) ? !1 : a
            },
            _c: function(a,
            b) {
                b = b || 0;
                return {
                    tl: j(b, b),
                    tr: j(this.width() - b, b),
                    bl: j(b, this.height() - b),
                    br: j(this.width() - b, this.height() - b)
                }[a]
            },
            _c2: function(a) {
                return {
                    tl: j(2 * this.width(), 0),
                    tr: j(-this.width(), 0),
                    bl: j(2 * this.width(), this.height()),
                    br: j(-this.width(), this.height())
                }[a]
            },
            _foldingPage: function() {
                var a = this.data().f.opts;
                if (a.folding)
                    return a.folding;
                if (a.turn) {
                    var b = a.turn.data();
                    return "single" == b.display ? b.pageObjs[a.next] ? b.pageObjs[0] : null : b.pageObjs[a.next]
                }
            },
            _backGradient: function() {
                var a = this.data().f,
                    b = a.opts.turn;
                if ((b = a.opts.backGradient && (!b || "single" == b.data().display || 2 != a.opts.page && a.opts.page != b.data().totalPages - 1)) && !a.bshadow)
                    a.bshadow = h("<div/>", l(0, 0, 1)).css({
                        position: "",
                        width: this.width(),
                        height: this.height()
                    }).appendTo(a.parent);
                return b
            },
            resize: function(a) {
                var b = this.data().f,
                    c = this.width(),
                    d = this.height(),
                    e = Math.round(Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2)));
                a && (b.wrapper.css({
                    width: e,
                    height: e
                }), b.fwrapper.css({
                    width: e,
                    height: e
                }).children(":first-child").css({
                    width: c,
                    height: d
                }), b.fpage.css({
                    width: d,
                    height: c
                }), b.opts.frontGradient && b.ashadow.css({
                    width: d,
                    height: c
                }), i._backGradient.call(this) && b.bshadow.css({
                    width: c,
                    height: d
                }));
                b.parent.is(":visible") && (b.fwrapper.css({
                    top: b.parent.offset().top,
                    left: b.parent.offset().left
                }), b.opts.turn && b.fparent.css({
                    top: -b.opts.turn.offset().top,
                    left: -b.opts.turn.offset().left
                }));
                this.flip("z", b.opts["z-index"])
            },
            _addPageWrapper: function() {
                var a = this.data().f,
                    b = this.parent();
                if (!a.wrapper) {
                    this.css("left");
                    this.css("top");
                    var c = this.width(),
                        d = this.height();
                    Math.round(Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2)));
                    a.parent = b;
                    a.fparent = a.opts.turn ? a.opts.turn.data().fparent : h("#turn-fwrappers");
                    a.fparent || (c = h("<div/>", {
                        css: {
                            "pointer-events": "none"
                        }
                    }).hide(), c.data().flips = 0, a.opts.turn ? (c.css(l(-a.opts.turn.offset().top, -a.opts.turn.offset().left, "auto", "visible").css).appendTo(a.opts.turn), a.opts.turn.data().fparent = c) : c.css(l(0, 0, "auto", "visible").css).attr("id", "turn-fwrappers").appendTo(h("body")), a.fparent = c);
                    this.css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: "auto",
                        right: "auto"
                    });
                    a.wrapper = h("<div/>", l(0, 0, this.css("z-index"))).appendTo(b).prepend(this);
                    a.fwrapper = h("<div/>", l(b.offset().top, b.offset().left)).hide().appendTo(a.fparent);
                    a.fpage = h("<div/>", {
                        css: {
                            cursor: "default"
                        }
                    }).appendTo(h("<div/>", l(0, 0, 0, "visible")).appendTo(a.fwrapper));
                    a.opts.frontGradient && (a.ashadow = h("<div/>", l(0, 0, 1)).appendTo(a.fpage));
                    i.setData.call(this, a);
                    i.resize.call(this, !0)
                }
            },
            _fold: function(a) {
                var b = this,
                    c = 0,
                    d = 0,
                    e,
                    f,
                    h,
                    g,
                    v,
                    H,
                    n = j(0, 0),
                    p = j(0, 0),
                    k = j(0, 0),
                    r = this.width(),
                    u = this.height(),
                    l = i._foldingPage.call(this);
                Math.tan(d);
                var o = this.data().f,
                    w = o.opts.acceleration,
                    y = o.wrapper.height(),
                    q = i._c.call(this, a.corner),
                    D = "t" == a.corner.substr(0, 1),
                    A = "l" == a.corner.substr(1, 1),
                    F = function() {
                        var m = j(q.x ? q.x - a.x : a.x, q.y ? q.y - a.y : a.y),
                            B = Math.atan2(m.y, m.x),
                            z;
                        d = E - B;
                        c = 180 * (d / G);
                        z = j(A ? r - m.x / 2 : a.x + m.x / 2, m.y / 2);
                        var l = d - Math.atan2(z.y, z.x),
                            l = Math.max(0, Math.sin(l) * Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2)));
                        k = j(l * Math.sin(d), l * Math.cos(d));
                        if (d > E && (k.x += Math.abs(k.y * Math.tan(B)), k.y =
                        0, Math.round(k.x * Math.tan(G - d)) < u))
                            return a.y = Math.sqrt(Math.pow(u, 2) + 2 * z.x * m.x), D && (a.y = u - a.y), F();
                        if (d > E && (m = G - d, B = y - u / Math.sin(m), n = j(Math.round(B * Math.cos(m)), Math.round(B * Math.sin(m))), A && (n.x = -n.x), D))
                            n.y = -n.y;
                        e = Math.round(k.y / Math.tan(d) + k.x);
                        m = r - e;
                        B = m * Math.cos(2 * d);
                        z = m * Math.sin(2 * d);
                        p = j(Math.round(A ? m - B : e + B), Math.round(D ? z : u - z));
                        v = m * Math.sin(d);
                        m = i._c2.call(b, a.corner);
                        m = Math.sqrt(Math.pow(m.x - a.x, 2) + Math.pow(m.y - a.y, 2));
                        H = m < r ? m / r : 1;
                        if (o.opts.frontGradient && (g = 100 < v ? (v - 100) / v : 0, f = j(100 * (v *
                        Math.sin(E - d) / u), 100 * (v * Math.cos(E - d) / r)), D && (f.y = 100 - f.y), A))
                            f.x = 100 - f.x;
                        if (i._backGradient.call(b) && (h = j(100 * (v * Math.sin(d) / r), 100 * (v * Math.cos(d) / u)), A || (h.x = 100 - h.x), !D))
                            h.y = 100 - h.y;
                        k.x = Math.round(k.x);
                        k.y = Math.round(k.y);
                        return !0
                    },
                    x = function(a, c, e, k) {
                        var l = ["0", "auto"],
                            v = (r - y) * e[0] / 100,
                            q = (u - y) * e[1] / 100,
                            c = {
                                left: l[c[0]],
                                top: l[c[1]],
                                right: l[c[2]],
                                bottom: l[c[3]]
                            },
                            l = 90 != k && -90 != k ? A ? -1 : 1 : 0,
                            e = e[0] + "% " + e[1] + "%";
                        b.css(c).transform(t(k) + s(a.x + l, a.y, w), e);
                        o.fpage.parent().css(c);
                        o.wrapper.transform(s(-a.x +
                        v - l, -a.y + q, w) + t(-k), e);
                        o.fwrapper.transform(s(-a.x + n.x + v, -a.y + n.y + q, w) + t(-k), e);
                        o.fpage.parent().transform(t(k) + s(a.x + p.x - n.x, a.y + p.y - n.y, w), e);
                        o.opts.frontGradient && M(o.ashadow, j(A ? 100 : 0, D ? 100 : 0), j(f.x, f.y), [[g, "rgba(0,0,0,0)"], [0.8 * (1 - g) + g, "rgba(0,0,0," + 0.2 * H + ")"], [1, "rgba(255,255,255," + 0.2 * H + ")"]], 3, d);
                        i._backGradient.call(b) && M(o.bshadow, j(A ? 0 : 100, D ? 0 : 100), j(h.x, h.y), [[0.8, "rgba(0,0,0,0)"], [1, "rgba(0,0,0," + 0.3 * H + ")"], [1, "rgba(0,0,0,0)"]], 3)
                    };
                switch (a.corner) {
                case "tl":
                    a.x = Math.max(a.x, 1);
                    F();
                    x(k, [1, 0, 0, 1], [100, 0], c);
                    o.fpage.transform(s(-u, -r, w) + t(90 - 2 * c), "100% 100%");
                    l.transform(t(90) + s(0, -u, w), "0% 0%");
                    break;
                case "tr":
                    a.x = Math.min(a.x, r - 1);
                    F();
                    x(j(-k.x, k.y), [0, 0, 0, 1], [0, 0], -c);
                    o.fpage.transform(s(0, -r, w) + t(-90 + 2 * c), "0% 100%");
                    l.transform(t(270) + s(-r, 0, w), "0% 0%");
                    break;
                case "bl":
                    a.x = Math.max(a.x, 1);
                    F();
                    x(j(k.x, -k.y), [1, 1, 0, 0], [100, 100], -c);
                    o.fpage.transform(s(-u, 0, w) + t(-90 + 2 * c), "100% 0%");
                    l.transform(t(270) + s(-r, 0, w), "0% 0%");
                    break;
                case "br":
                    a.x = Math.min(a.x, r - 1),
                    F(),
                    x(j(-k.x, -k.y),
                    [0, 1, 1, 0], [0, 100], c),
                    o.fpage.transform(t(90 - 2 * c), "0% 0%"),
                    l.transform(t(90) + s(0, -u, w), "0% 0%")
                }
                o.point = a
            },
            _moveFoldingPage: function(a) {
                var b = this.data().f,
                    c = i._foldingPage.call(this);
                if (c)
                    if (a) {
                        if (!b.fpage.children()[b.ashadow ? "1" : "0"])
                            i.setData.call(this, {
                                backParent: c.parent()
                            }),
                            b.fpage.prepend(c)
                    } else
                        b.backParent && b.backParent.prepend(c)
            },
            _showFoldedPage: function(a, b) {
                var c = i._foldingPage.call(this),
                    d = this.data(),
                    e = d.f;
                if (!e.point || e.point.corner != a.corner) {
                    var f = h.Event("start");
                    this.trigger(f,
                    [e.opts, a.corner]);
                    if (f.isDefaultPrevented())
                        return !1
                }
                if (c) {
                    if (b) {
                        var g = this,
                            c = e.point && e.point.corner == a.corner ? e.point : i._c.call(this, a.corner, 1);
                        this.animatef({
                            from: [c.x, c.y],
                            to: [a.x, a.y],
                            duration: 500,
                            frame: function(b) {
                                a.x = Math.round(b[0]);
                                a.y = Math.round(b[1]);
                                i._fold.call(g, a)
                            }
                        })
                    } else
                        i._fold.call(this, a),
                        d.effect && !d.effect.turning && this.animatef(!1);
                    e.fwrapper.is(":visible") || (e.fparent.show().data().flips++, i._moveFoldingPage.call(this, !0), e.fwrapper.show(), e.bshadow && e.bshadow.show());
                    return !0
                }
                return !1
            },
            hide: function() {
                var a = this.data().f,
                    b = i._foldingPage.call(this);
                0 === --a.fparent.data().flips && a.fparent.hide();
                this.css({
                    left: 0,
                    top: 0,
                    right: "auto",
                    bottom: "auto"
                }).transform("", "0% 100%");
                a.wrapper.transform("", "0% 100%");
                a.fwrapper.hide();
                a.bshadow && a.bshadow.hide();
                b.transform("", "0% 0%");
                return this
            },
            hideFoldedPage: function(a) {
                var b = this.data().f;
                if (b.point) {
                    var c = this,
                        d = b.point,
                        e = function() {
                            b.point = null;
                            c.flip("hide");
                            c.trigger("end", [!1])
                        };
                    if (a) {
                        var f = i._c.call(this, d.corner),
                            a = "t" == d.corner.substr(0,
                            1) ? Math.min(0, d.y - f.y) / 2 : Math.max(0, d.y - f.y) / 2,
                            h = j(d.x, d.y + a),
                            g = j(f.x, f.y - a);
                        this.animatef({
                            from: 0,
                            to: 1,
                            frame: function(a) {
                                a = L(d, h, g, f, a);
                                d.x = a.x;
                                d.y = a.y;
                                i._fold.call(c, d)
                            },
                            complete: e,
                            duration: 800,
                            hiding: !0
                        })
                    } else
                        this.animatef(!1),
                        e()
                }
            },
            turnPage: function(a) {
                var b = this,
                    c = this.data().f,
                    a = {
                        corner: c.corner ? c.corner.corner : a || i._cAllowed.call(this)[0]
                    },
                    d = c.point || i._c.call(this, a.corner, c.opts.turn ? c.opts.turn.data().opts.elevation : 0),
                    e = i._c2.call(this, a.corner);
                this.trigger("flip").animatef({
                    from: 0,
                    to: 1,
                    frame: function(c) {
                        c = L(d, d, e, e, c);
                        a.x = c.x;
                        a.y = c.y;
                        i._showFoldedPage.call(b, a)
                    },
                    complete: function() {
                        b.trigger("end", [!0])
                    },
                    duration: c.opts.duration,
                    turning: !0
                });
                c.corner = null
            },
            moving: function() {
                return "effect" in this.data()
            },
            isTurning: function() {
                return this.flip("moving") && this.data().effect.turning
            },
            _eventStart: function(a) {
                var b = this.data().f;
                if (!b.disabled && !this.flip("isTurning")) {
                    b.corner = i._cornerActivated.call(this, a);
                    if (b.corner && i._foldingPage.call(this, b.corner))
                        return i._moveFoldingPage.call(this,
                        !0), this.trigger("pressed", [b.point]), !1;
                    b.corner = null
                }
            },
            _eventMove: function(a) {
                var b = this.data().f;
                if (!b.disabled)
                    if (a = q ? a.originalEvent.touches : [a], b.corner) {
                        var c = b.parent.offset();
                        b.corner.x = a[0].pageX - c.left;
                        b.corner.y = a[0].pageY - c.top;
                        i._showFoldedPage.call(this, b.corner)
                    } else
                        !this.data().effect && this.is(":visible") && ((a = i._cornerActivated.call(this, a[0])) ? (b = i._c.call(this, a.corner, b.opts.cornerSize / 2), a.x = b.x, a.y = b.y, i._showFoldedPage.call(this, a, !0)) : i.hideFoldedPage.call(this, !0))
            },
            _eventEnd: function() {
                var a =
                this.data().f;
                if (!a.disabled && a.point) {
                    var b = h.Event("released");
                    this.trigger(b, [a.point]);
                    b.isDefaultPrevented() || i.hideFoldedPage.call(this, !0)
                }
                a.corner = null
            },
            disable: function(a) {
                i.setData.call(this, {
                    disabled: a
                });
                return this
            }
        },
        N = function(a, b, c) {
            if (!c[0] || "object" == typeof c[0])
                return b.init.apply(a, c);
            if (b[c[0]] && "_" != c[0].toString().substr(0, 1))
                return b[c[0]].apply(a, Array.prototype.slice.call(c, 1));
            throw c[0] + " is an invalid value";
        };
    h.extend(h.fn, {
        flip: function(a, b) {
            return N(this, i, arguments)
        },
        turn: function(a) {
            return N(this, g, arguments)
        },
        transform: function(a, b) {
            var c = {};
            b && (c[y + "transform-origin"] = b);
            c[y + "transform"] = a;
            return this.css(c)
        },
        animatef: function(a) {
            var b = this.data();
            b.effect && clearInterval(b.effect.handle);
            if (a) {
                a.to.length || (a.to = [a.to]);
                a.from.length || (a.from = [a.from]);
                a.easing || (a.easing = function(a, b, c, d, e) {
                    return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
                });
                var c,
                    d = [],
                    e = a.to.length,
                    f = this,
                    h = a.fps || 30,
                    i = -h,
                    g = function() {
                        var c,
                            g = [];
                        i = Math.min(a.duration, i + h);
                        for (c = 0; c < e; c++)
                            g.push(a.easing(1,
                            i, a.from[c], d[c], a.duration));
                        a.frame(e == 1 ? g[0] : g);
                        if (i == a.duration) {
                            clearInterval(b.effect.handle);
                            delete b.effect;
                            f.data(b);
                            a.complete && a.complete()
                        }
                    };
                for (c = 0; c < e; c++)
                    d.push(a.to[c] - a.from[c]);
                b.effect = a;
                b.effect.handle = setInterval(g, h);
                this.data(b);
                g()
            } else
                delete b.effect
        }
    });
    h.isTouch = q

    // CUSTOM CHANGE BEGIN
    // We'll define a helper for thorough destroy. This helps prevent leftover pages or event references.
    function turnDestroy($this) {
        var data = $this.data();
        if (!data) return;

        // 1) Remove all pages from the DOM
        if (data.pageObjs) {
            $.each(data.pageObjs, function(pageIndex, pageObj) {
                if (pageObj && pageObj.parentNode) {
                    pageObj.flip && $(pageObj).flip('destroy');
                    pageObj.parentNode.removeChild(pageObj);
                }
            });
        }

        // 2) Unbind all turn events
        $this.unbind();
        $this.removeData();
        $this.removeClass('turnjs');

        // 3) Clear references
        data.pageObjs = null;
        data.pages = null;
        data.pageWrap = null;
        data.pagePlace = null;
        data.totalPages = null;
        data.tpage = null;
        data.display = null;
        data.direction = null;
        data.eventHandlers = null;
        // This ensures the element is free of turn references
    }
    // CUSTOM CHANGE END
})(jQuery);