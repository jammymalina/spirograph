define(["require","exports","./math2d","./math","./colour"],function(t,e,n,r,i){var o=function(){function t(t,e,r,i,o,s,a){void 0===i&&(i=!1),void 0===o&&(o=new n.vec3(8,8,20)),void 0===s&&(s={colour:{r:0,g:0,b:0},line_width:1}),void 0===a&&(a=null),this.annulus=i,this._center=new n.vec2(t.x,t.y),this.teeth=e,this.radius=r,this._radius_offset=new n.vec3(Math.abs(o.x),Math.abs(o.y),Math.abs(o.z)),this.stroke_style={colour:{r:0,g:0,b:0},line_width:1},this.stroke_colour=s.colour,this.stroke_width=s.line_width,this.fill_colour=a,this.generate_gear()}return t.prototype.reload=function(){this.generate_gear()},t.prototype.generate_gear=function(){var t=this.teeth,e=Math.abs(this.radius),n=e-this.radius_offset.x,i=e+this.radius_offset.y,o=this.radius-this.radius_offset.z;if(this.annulus){var s=n;n=i,i=s,o=e+this.radius_offset.z}for(var a=Math.PI/t,u=-r.MATH_PI_HALF+(this.annulus?a:0),h="\n            M "+n*Math.cos(u)+", "+n*Math.sin(u)+"\n        ",l=0;l<t;l++)h+="\n                A "+n+", "+n+" 0 0, 1 "+n*Math.cos(u+=a)+", "+n*Math.sin(u)+"\n                L "+e*Math.cos(u)+", "+e*Math.sin(u)+"\n                L "+i*Math.cos(u+=a/3)+", "+i*Math.sin(u)+"\n                A "+i+", "+i+" 0 0,1 "+i*Math.cos(u+=a/3)+", "+i*Math.sin(u)+"\n                L "+e*Math.cos(u+=a/3)+", "+e*Math.sin(u)+"\n                L "+n*Math.cos(u)+", "+n*Math.sin(u)+"\n            ";h+="\n            M0 "+-o+" A "+o+", "+o+" 0 0, 0 0, "+o+" A "+o+", "+o+" 0 0, 0 0, "+-o+" Z\n        ",this.gear=new Path2D(h)},t.prototype.draw=function(t,e,n){void 0===n&&(n="tr"),t.save(),"tr"==n?(t.translate(this.x,this.y),t.rotate(e)):"rt"==n&&(t.translate(this.x,this.y),t.rotate(e)),t.beginPath(),this.fill_colour&&(t.fillStyle=i.colour_to_ctx_style(this.fill_colour),t.fill(this.gear)),this.stroke_style&&this.stroke_colour&&(t.strokeStyle=i.colour_to_ctx_style(this.stroke_colour),t.lineWidth=this.stroke_width,t.stroke(this.gear)),t.restore()},Object.defineProperty(t.prototype,"center",{get:function(){return this._center},set:function(t){this._center.set(t.x,t.y)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"x",{get:function(){return this.center.x},set:function(t){this.center.x=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this.center.y},set:function(t){this.center.y=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"teeth",{get:function(){return this._teeth},set:function(t){this._teeth=Math.round(Math.abs(t))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"radius",{get:function(){return this._radius},set:function(t){this._radius=Math.abs(t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"radius_offset",{get:function(){return this._radius_offset},set:function(t){this._radius_offset=new n.vec3(Math.abs(t.x),Math.abs(t.y),Math.abs(t.z))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"stroke_colour",{get:function(){return this.stroke_style.colour},set:function(t){t&&i.colour_clamp(t),this.stroke_style.colour=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"stroke_width",{get:function(){return this.stroke_style.line_width},set:function(t){this.stroke_style.line_width=Math.abs(t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fill_colour",{get:function(){return this.fill_style},set:function(t){t&&i.colour_clamp(t),this.fill_style=t},enumerable:!0,configurable:!0}),t}();e.Gear=o;var s=function(){function t(t){var e=void 0===t?{center:new n.vec2(0,0),annulus:new o(new n.vec2(0,0),80,300,!0,new n.vec3(8,8,20),{colour:{r:104,g:59,b:183},line_width:1}),planet:new o(new n.vec2(0,0),32,100,!1,new n.vec3(8,8,15),{colour:{r:255,g:152,b:0},line_width:1}),planet_rotation:0}:t,r=e.center,i=e.annulus,s=e.planet,a=e.planet_rotation;this.annulus=i,this.annulus.center=r,this.planet=s,this.planet.center=r,this.planet_rotation=a}return t.prototype.draw=function(t){this.annulus.draw(t,0),this.planet.draw(t,this.planet_rotation)},t}();e.GearSystem=s});