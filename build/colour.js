define(["require","exports","./math"],function(a,r,o){r.colour_clamp=function(a){a.r=o.clamp(a.r,0,255),a.g=o.clamp(a.g,0,255),a.b=o.clamp(a.b,0,255),void 0!==a.a&&(a.a=o.clamp(a.a,0,255))},r.colour_to_ctx_style=function(a){return void 0!==a.a?"rgba("+a.r+", "+a.g+", "+a.b+", "+a.a+")":"rgb("+a.r+", "+a.g+", "+a.b+")"};var c=Math.random();r.golden_ratio_colour_generation=function(a,e){return void 0===a&&(a=.99),void 0===e&&(e=.99),c+=o.GOLDEN_RATIO_CONJUGATE,c%=1,r.hsv_to_rgb(c,a,e)},r.hsv_to_rgb=function(a,r,c){var e,t,n,u,b,i,l,_;switch(u=Math.floor(6*a),b=6*a-u,i=c*(1-r),l=c*(1-b*r),_=c*(1-(1-b)*r),u%6){case 0:e=c,t=_,n=i;break;case 1:e=l,t=c,n=i;break;case 2:e=i,t=c,n=_;break;case 3:e=i,t=l,n=c;break;case 4:e=_,t=i,n=c;break;case 5:e=c,t=i,n=l}return{r:o.clamp(Math.round(255*e),0,255),g:o.clamp(Math.round(255*t),0,255),b:o.clamp(Math.round(255*n),0,255)}}});