define(["require","exports"],function(n,r){var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";r.random_int=function(n,r){return void 0===n&&(n=0),void 0===r&&(r=1),Math.floor(Math.random()*(r-n)+n)},r.random_float=function(n,r){return void 0===n&&(n=0),void 0===r&&(r=1),Math.random()*(r-n)+n},r.random_string=function(n){void 0===n&&(n=8);for(var t="",i=0;i<n;i++)t+=o.charAt(r.random_int(0,o.length));return t}});