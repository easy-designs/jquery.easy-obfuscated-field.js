/* Easy Obfuscated Field (c) Aaron Gustafson (@AaronGustafson). MIT License. https://github.com/easy-designs/jquery.easy-obfuscated-field.js */
(function(b){var e="easyObfuscatedField",a=e+"-observing",c={visible_suffix:"-visible"};function d(i,h){var g=i.attr("name"),f=i.clone().hide().attr("name",g).removeAttr("id").removeAttr("required");if(f.is("[pattern]")){f.removeAttr("pattern")}i.attr("name",g+h.visible_suffix).after(f)}b.fn.easyObfuscatedField=function(g){g=b.extend(c,g);var j=b(this),f=j.selector,h=b("body"),i=h.data(a)||[];j.each(function(){d(b(this),g)});if(b.inArray(f,i)>-1){return j}i.push(f);h.on("focus",f,function(){var l=b(this),k=l.attr("name"),n,m;if(k.indexOf(g.visible_suffix)<0){d(l)}n=b("input[name="+k.replace(g.visible_suffix,"")+"]");if(n.length&&(m=n.val())!=""){l.val(m)}}).on("blur",f,function(){var l=b(this),m=l.val(),k;b("input[name="+l.attr("name").replace(g.visible_suffix,"")+"]").val(m);if(m.length>3){m=m.split("");k=m.length-3;while(k--){m[k]="*"}l.val(m.join(""))}}).data(a,i);return j}}(jQuery));