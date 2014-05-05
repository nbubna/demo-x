// alter.js
var A = _.add = {
    create: function(node, tag, ref) {
        return A.insert(node, D.createElement(tag), ref);
    },
    insert: function(node, child, ref) {
        var sibling = A.find(node, ref);
        if (sibling) {
            node.insertBefore(child, sibling);
        } else {
            node.appendChild(child);
        }
        return child;
    },
    find: function(node, ref) {
        switch (typeof ref) {
            case "string": return node[ref+'Child'];
            case "number": return node.children[ref];
            case "object": return ref;
            case "function": return ref.call(node, node);
        }
    }
};

D.extend('add', function(arg, ref) {
    if (typeof arg === "string") {// turn arg into an appendable
        return A.create(this, arg, ref);
    }
    if (_.isList(arg)) {// list of append-ables
        var list = new _.List();
        for (var i=0,m=arg.length; i<m; i++) {
            list.add(this.add(arg[i], ref));
        }
        return list;
    }
    A.insert(this, arg, ref);// arg is an append-able
    return arg;
});

D.extend('remove', function() {
    var parent = this.parentNode;
    if (parent) {
        parent.removeChild(this);
    }
});
// /alter.js
