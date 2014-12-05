var DemoXProto,
    DemoX;
if (D.registerElement) {
    DemoXProto = Object.create(HTMLElement.prototype);
    // wait to register until prototype is complete
} else {
    DemoXProto = {};
    DemoX = window.DemoX = function DemoX(el) {
        if (!el.createdCallback) {
            for (var prop in DemoXProto) {
                Object.defineProperty(el, prop,
                    Object.getOwnPropertyDescriptor(DemoXProto, prop));
            }
            el.createdCallback();
        }
    };
    DemoX.prototype = DemoXProto;
    DemoX.load = function() {
        D.queryAll('demo-x').each(DemoX);
    };
    DemoX.load();// early availability
    D.addEventListener('DOMContentLoaded', DemoX.load);// eventual consistency
}


DemoXProto.timing = {
    intent: 1000,
    backspace: 25,
    typing: 50,
    tick: 250,
    minTicks: 8
};

DemoXProto.createdCallback = function() {
    var self = this;
    self.display = self.query('demo-dom');
    self.input = self.query('demo-in');
    self.output = self.query('demo-out');

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
};

DemoXProto.initDisplay = function() {
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
};

DemoXProto.initStory = function() {
    var self = this;
    self._next = function(){ self.next(); };
    self.story = self.input.children.each('textContent');
    self.input.innerHTML = '';
    this._tick = function() {
        if (self.index){ self.execute(); }
        setTimeout(self._next, self.calcPause());
    };
    this._tick();
};

DemoXProto.initControls = function() {
    var self = this,
        stop = self.query('[stop]'),
        start = self.query('[start]');
    self._stop = function() {
        self.stopped = true;
        self.classList.add('stopped');
    };
    self._start = function() {
        self.classList.remove('stopped');
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
};

DemoXProto.next = function() {
    var self = this,
        code = self.story[self.index];
    if (code && !self.stopped) {
        var input = self.input;
        self.animate(self.input.value, code, function(s){ input.value = s; }, self._tick);
        self.index++;
    } else if (!code) {
        self._stop();
    }
};

DemoXProto.calcPause = function() {
    // base pause of current line, not next line
    var code = this.story[this.index-1] || '';
    // first line and comments go instantly
    return !code || (code.indexOf('//') === 0 && code.indexOf('\n') < 0) ? 0 :
        // others default to 250ms per symbol, with a minimum of 2s
        Math.max(code.replace(/\w|\s/g, '').length, this.timing.minTicks) * this.timing.tick;
};

DemoXProto.intent = function(el) {
    var timeout, self = this;
    el.addEventListener("keydown", function() {
        if (timeout){ clearTimeout(timeout); }
        timeout = setTimeout(self._exec, self.timing.intent);
    });
};

DemoXProto.execute = function() {
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
};

DemoXProto.animate = function(text, next, update, finish) {
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
};

DemoXProto.index = 0;

// ok, register now that prototype is complete
if (D.registerElement) {
    DemoX = window.DemoX = D.registerElement('demo-x', {
        prototype: DemoXProto
    });
}


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

// this all hitches on css animations and domx-stringify's _attr support
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
