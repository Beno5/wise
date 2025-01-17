// Headhesive.js kao ES modul
"use strict";

function _mergeObj(to, from) {
    for (var p in from) {
        if (from.hasOwnProperty(p)) {
            to[p] = typeof from[p] === "object" ? _mergeObj(to[p], from[p]) : from[p];
        }
    }
    return to;
}

function _throttle(func, wait) {
    var _now = Date.now || function() { return new Date().getTime(); };
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function() {
        previous = _now();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
    };
    return function() {
        var now = _now();
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            context = args = null;
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

function _getScrollY() {
    return window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function _getElemY(elem, side) {
    var pos = 0;
    var elemHeight = elem.offsetHeight;
    while (elem) {
        pos += elem.offsetTop;
        elem = elem.offsetParent;
    }
    if (side === "bottom") {
        pos += elemHeight;
    }
    return pos;
}

class Headhesive {
    constructor(elem, options) {
        if (!("querySelector" in document && "addEventListener" in window)) {
            return;
        }
        this.visible = false;
        this.options = {
            offset: 300,
            offsetSide: "top",
            classes: {
                clone: "headhesive",
                stick: "headhesive--stick",
                unstick: "headhesive--unstick"
            },
            throttle: 250,
            onInit: function() {},
            onStick: function() {},
            onUnstick: function() {},
            onDestroy: function() {}
        };
        this.elem = typeof elem === "string" ? document.querySelector(elem) : elem;
        this.options = _mergeObj(this.options, options);
        this.init();
    }

    init() {
        this.clonedElem = this.elem.cloneNode(true);
        this.clonedElem.className += " " + this.options.classes.clone;
        document.body.insertBefore(this.clonedElem, document.body.firstChild);
        this.scrollOffset = (typeof this.options.offset === "number") ? this.options.offset : _getElemY(document.querySelector(this.options.offset), this.options.offsetSide);
        this._throttleUpdate = _throttle(this.update.bind(this), this.options.throttle);
        this._throttleScrollOffset = _throttle(() => {
            if (typeof this.options.offset === "string") {
                this.scrollOffset = _getElemY(document.querySelector(this.options.offset), this.options.offsetSide);
            }
        }, this.options.throttle);
        window.addEventListener("scroll", this._throttleUpdate, false);
        window.addEventListener("resize", this._throttleScrollOffset, false);
        this.options.onInit.call(this);
    }

    destroy() {
        document.body.removeChild(this.clonedElem);
        window.removeEventListener("scroll", this._throttleUpdate);
        window.removeEventListener("resize", this._throttleScrollOffset);
        this.options.onDestroy.call(this);
    }

    stick() {
        if (!this.visible) {
            this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*", "g"), "");
            this.clonedElem.className += " " + this.options.classes.stick;
            this.visible = true;
            this.options.onStick.call(this);
        }
    }

    unstick() {
        if (this.visible) {
            this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.stick + "(\\s|$)*", "g"), "");
            this.clonedElem.className += " " + this.options.classes.unstick;
            this.visible = false;
            this.options.onUnstick.call(this);
        }
    }

    update() {
        if (_getScrollY() > this.scrollOffset) {
            this.stick();
        } else {
            this.unstick();
        }
    }
}

export default Headhesive;
