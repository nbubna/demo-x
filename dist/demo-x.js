/*! demo-x - v0.1.0 - 2014-12-02
* http://esha.github.io/demo-x/
* Copyright (c) 2014 ESHA Research; Licensed MIT */

(function(window, D) {
    "use strict";

var DemoX = function DemoX(el) {
    if (!(this instanceof DemoX)) {
        return new DemoX(el);
    }
    if (!el.demo) {
        this.init(el);
    }
};
DemoX.prototype = {
    timing: {
        intent: 1000,
        backspace: 25,
        typing: 50,
        tick: 250,
        minTicks: 8
    },
    init: function(el) {
        var self = el.demo = this;
        self.root = el;
        self.display = el.query('demo-dom');
        self.input = el.query('demo-in');
        self.output = el.query('demo-out');

        self.intent(self.input);
        self._exec = function() {
            self.execute();
        };

        if (self.input.children.length) {
            self.initStory();
        }
        if (self.display) {
            self.doc = DemoX.docify(self.display.children);
            for (var i=0; i<self.display.attributes.length; i++) {
                var attr = self.display.attributes[i];
                self.doc.body.setAttribute(attr.name, attr.value);
            }
            self.initDisplay();
        } else {
            // a document w/no body content
            self.doc = DemoX.docify(new DOMxList());
        }
        self.initControls();
    },
    initDisplay: function() {
        var self = this;
        function update() {
            self.display.innerHTML = self.doc.body.stringify(true);
        }
        update();
        self._observer = new MutationObserver(update)
            .observe(self.doc.html, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true
            });
    },
    initStory: function() {
        var self = this;
        self._next = function(){ self.next(); };
        self.story = self.input.children.each('textContent');
        self.input.innerHTML = '';
        this._tick = function() {
            if (self.index){ self.execute(); }
            setTimeout(self._next, self.calcPause());
        };
        this._tick();
    },
    initControls: function() {
        var self = this,
            stop = self.root.query('[stop]'),
            start = self.root.query('[start]');
        self._stop = function() {
            self.stopped = true;
            self.root.classList.add('stopped');
        };
        self._start = function() {
            self.root.classList.remove('stopped');
            if (!(self.index in self.story)) {
                self.index = 0;
            }
            self.stopped = false;
            self.next();
        };
        self.input.addEventListener('keydown', self._stop);
        if (stop) {
            stop.addEventListener('click', self._stop);
        }
        if (start) {
            start.addEventListener('click', self._start);
        }
    },
    next: function() {
        var self = this,
            code = self.story[self.index];
        if (code && !self.stopped) {
            var input = self.input;
            self.animate(self.input.value, code, function(s){ input.value = s; }, self._tick);
            self.index++;
        } else if (!code) {
            self._stop();
        }
    },
    calcPause: function() {
        // base pause of current line, not next line
        var code = this.story[this.index-1] || '';
        // first line and comments go instantly
        return !code || (code.indexOf('//') === 0 && code.indexOf('\n') < 0) ? 0 :
            // others default to 250ms per symbol, with a minimum of 2s
            Math.max(code.replace(/\w|\s/g, '').length, this.timing.minTicks) * this.timing.tick;
    },
    intent: function(el) {
        var timeout, self = this;
        el.addEventListener("keydown", function() {
            if (timeout){ clearTimeout(timeout); }
            timeout = setTimeout(self._exec, self.timing.intent);
        });
    },
    execute: function() {
        var code = this.input.value,
            result;
        if (code && code.indexOf('//') !== 0) {
            try {
                result = eval(code);
                DemoX.flash(result);
            } catch (e) {
                e.code = code;
                result = e;
            }
            if (this.output) {
                var log = this.output.innerHTML;
                this.output.innerHTML = '<p class="line">'+
                    DemoX.describe(result)+'</p>' + log;
            } else {
                console.log(code);
                console.log(result);
            }
        }
    },
    animate: function(text, next, update, finish) {
        var i = text.length, self = this, action = 'typing';
        (function _step() {
            if (!self.stopped) {
                if (next.indexOf(text) < 0) {
                    action = 'backspace';
                    text = text.substr(0, --i);
                } else if (i < next.length) {
                    action = 'typing';
                    text = next.substr(0, ++i);
                } else {
                    return finish();
                }
                update(text);
                setTimeout(_step, self.timing[action]);
            }
        })();
    },
    index: 0
};

DemoX.docify = function(dom) {
    var d = D.createDocumentFragment();
    d.html = d.documentElement = D.createElement('html');
    d.appendChild(d.html);
    d.html.appendChild(d.body = D.createElement('body'));
    dom.each(function(el) {
        el.remove();
        d.body.append(el);
    });
    d.html.dot();
    try {
        delete d.parentNode;
        d.parentNode = window;
    } catch (e) {}
    return d;
};

DemoX.describe = function(el) {
    if (D.x._.isList(el) && el.each) {
        return el.each(DemoX.describe).join(', ');
    }
    if (el instanceof HTMLElement) {
        var id = el.getAttribute('id'),
            classes = el.getAttribute('class');
        return '&lt;'+
            el.tagName.toLowerCase()+
            (id ? '#'+id : '')+
            (classes ? '.'+classes.split(' ').join('.') : '')+
        '&gt;';
    }
    if (el instanceof Node) {
        return el.value;
    }
    if (typeof el === "object") {
        return JSON.stringify(el);
    }
    return el && el.value || (el+'');
};

// this all hitches on css animations and stringify's _attr support
DemoX.highlight = function(el) {
    if (el.setAttribute) {
        el.setAttribute('_highlight', 'true');
    }
};
DemoX.unhighlight = function(el) {
    if (el.removeAttribute) {
        el.removeAttribute('_highlight');
    }
};
var flashTimeout;
DemoX.flash = function(el) {
    if (el && el.each) {
        if (flashTimeout){ clearTimeout(flashTimeout); }
        flashTimeout = setTimeout(function() {
            el.each(DemoX.highlight);
            setTimeout(function() {
                el.each(DemoX.unhighlight);
            }, 1000);
        }, DemoX.flash.time || 100);
    }
};

DemoX.onload = function() {
    D.queryAll('demo-x').each(DemoX);
};

window.DemoX = DemoX;
DemoX.onload();// early availability
D.addEventListener('DOMContentLoaded', DemoX.onload);// eventual consistency


})(window, document);
