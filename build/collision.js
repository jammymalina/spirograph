define(["require","exports","./math2d"],function(n,t,i){var e=function(){function n(n,t){void 0===n&&(n=new i.vec2(0,0)),void 0===t&&(t=new i.vec2(1,1)),this._min=n,this._max=t}return n.fromPoints=function(t,i){return new n(t,i)},n.fromEllipse=function(t){var e=t.center,o=t.a,r=t.b;return o=Math.abs(o),r=Math.abs(r),new n(new i.vec2(e.x-o,e.y-r),new i.vec2(e.x+o,e.y+r))},n.fromPolygon=function(t){if(t.length<=0)return new n;var e=i.vec2.min.apply(i.vec2,t),o=i.vec2.max.apply(i.vec2,t);return new n(e,o)},n.prototype.combine=function(n,t){t||this.combine(this,n),this._min=i.vec2.min(n.min_point,t.min_point),this._max=i.vec2.max(n.max_point,t.max_point)},n.prototype.contains=function(n){var t=!0;return t=t&&this.min_point.x<=n.min_point.x,t=t&&this.min_point.y<=n.min_point.y,t=t&&n.max_point.x<=this.max_point.x,t=t&&n.max_point.y<=this.max_point.y},n.prototype.set_min_point=function(){for(var n=[],t=0;t<arguments.length;t++)n[t-0]=arguments[t];1==n.length?(this._min.x=n[0],this._min.y=n[0]):2==n.length&&(this._min.x=n[0],this._min.y=n[1])},n.prototype.set_max_point=function(){for(var n=[],t=0;t<arguments.length;t++)n[t-0]=arguments[t];1==n.length?(this._max.x=n[0],this._max.y=n[0]):2==n.length&&(this._max.x=n[0],this._max.y=n[1])},Object.defineProperty(n.prototype,"min_point",{get:function(){return this._min},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"max_point",{get:function(){return this._max},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"center",{get:function(){return i.multiply_scalar_vec2(.5,i.vec2.add(this.min_point,this.max_point))},enumerable:!0,configurable:!0}),n}();t.AABB=e,t.AABBTREE_NULL_NODE=-1;var o=function(){function n(){this.aabb=new e}return n.prototype.is_leaf=function(){return this.left_child==t.AABBTREE_NULL_NODE},n}();t.AABBTreeNode=o});