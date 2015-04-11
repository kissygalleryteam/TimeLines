KISSY.add("kg/timelines/3.0.0/index",["base","dom","event","anim","node"],function(e,t,i,a){var n,r=t("base"),o=t("dom"),s=t("event"),d=t("anim"),l=t("node");n=function(t){var i=(l.all,r),a=o,n=s,u=d,p=i.extend({initializer:function(){var e=this;e.el=e.get("container"),a.css(e.el,{position:"relative","padding-top":"10px"}),e.curdate=e.get("curDate")||null;var t=(new Date).getFullYear();e.hashYear={},e.hashYear[t]=!0,e.outerw=a.outerWidth(e.el),e.today=e.get("today")||e.formatDate(new Date,"yyyy-MM-dd"),e.isReToday=e.today===e.curdate,e._initDateGrid(e.get("data"))},_initDateGrid:function(t){var i=this;try{if(!i._typeof(t,"Array")){var n=new Error;throw n.name="类型出错",n.message="传入的data不是数组!",n}var r=i._initTimeNode("wrap",{end:!0});r+=i._initTimeNode("line",{num:3}),i._getTimeMs(i.today)<i._getTimeMs(t[0].date)&&(r=i._addmission(r,{before:null,after:t[0].date})),e.each(t,function(e,a){if(i._isSameYear(e.date)||(r+=i._initTimeNode("dot",{time:i.formatDate(e.date,"yyyy")})),0!==a||i.today!==e.date){var n=i.curdate&&e.date==i.curdate;if(i.today!==e.date||n){var o=n?"cur":"node";r+=i._initTimeNode(o,{time:i.formatDate(e.date,"MM.dd")})}}i.today===e.date&&(i.isReToday=!0),r=i._addmission(r,{before:e.date,after:t[a+1]&&t[a+1].date})}),i.outerw>0&&(r+=i._initTimeNode("line",{num:Math.ceil(i.outerw/16)})),a.append(a.create(r+"</div></div>"),i.el),i.elwrap=a.get(".timeline-wrap",i.el),i._initNodeEvents(t)}catch(o){console.log(o.message)}},_initTimeNode:function(e,t){var i=this,a={wrap:'<div class="timeline-wrap"><div class="timeline-main">',node:'<div class="timeline-node">',line:'<div class="timeline-line">',omission:'<div class="timeline-omission">',shine:'<div class="timeline-node timeline-blue-node">',cur:'<div class="timeline-cur-left"></div><div class="timeline-node timeline-cur">',dot:'<div class="timeline-dot">'},n={node:40,line:16,omission:20,shine:40,cur:120,dot:33};if("wrap"!==e){var r=t&&t.num||1;i.outerw-=n[e]*r}var o=a[e];if(t&&t.time&&(o+="<a>"+t.time+"</a>"),t&&t.end)return o;if("cur"===e&&(o+='</div><div class="timeline-cur-right">'),t&&t.num){o+="</div>";for(var s=0;s<t.num;s++)o+=a[e]+"</div>",i.outerw-=n[e];return o}return o+"</div>"},_addToady:function(e){var t=this;return t.curdate&&t.today!=t.curdate?e+t._initTimeNode("shine",{time:t.formatDate(t.today,"MM.dd")}):e},_addmission:function(e,t){function i(t,i){var a=(i-t)/864e5,n=Math.floor(a/30);switch(n=n>2?2:n,!0){case a>2&&6>a:return e+=r._initTimeNode("dot");case a>6:return e+=r._initTimeNode("omission",{num:n});default:return e}}var a,n,r=this,o=r._getTimeMs(r.today);return!t.before&&t.after?(n=r._getTimeMs(t.after),e=r._addToady(e),e=i(o,n)):(a=r._getTimeMs(t.before),t.after?(n=r._getTimeMs(t.after),o>=a&&n>o?(o!==a&&(e=i(a,o)),e=r._addToady(e),o!==n&&(e=i(o,n))):e=i(a,n),e):(o>a&&(e=i(a,o),e=r._addToady(e)),e))},_getTimeMs:function(e){return new Date(e).getTime()},_typeof:function(e,t){return Object.prototype.toString.call(e)==="[object "+t+"]"},_isSameYear:function(e){var t=this,i=new Date(e).getFullYear();return t.hashYear[i]?!0:(t.hashYear[i]=!0,!1)},_initNodeEvents:function(t){function i(){r.tipsInter=setTimeout(function(){r._tipIndex=r._tipIndex>r._tipQueue.length-1?0:r._tipIndex,r._initTips(r._tipQueue[r._tipIndex++]),i()},1500)}var r=this,o=a.query(".timeline-node",r.el);e.each(o,function(e,t){!r.isReToday&&a.hasClass(e,"timeline-blue-node")&&(a.css(e,{cursor:"default"}),o.splice(t,1))});var s=a.offset(r.elwrap).left,d=[],l={};e.each(o,function(e,i){var o=t[i],u=a.offset(e).left;o.left=u-s+Math.ceil(a.outerWidth(e)/2);var p,m=r._typeof(o.tip,"Array");if(m){for(var c=0,f=o.tip.length;f>c;c++)p={left:o.left,date:o.date,tip:o.tip[c]},d.push(p);l[i]=f}else d.push(o),l[i]=1;var v,_,h;n.on(e,"mouseover",function(){r.anim&&r.anim.stop(),_=m?Math.floor(Math.random()*o.tip.length):0,h=0;for(var e=0;i>e;e++)h+=l[e];r._tipIndex=h+_,v=m?{left:o.left,date:o.date,tip:o.tip[_]}:o,r._initTips(v)})}),n.on(r.elwrap,"mouseover mouseout",function(e){switch(e.type){case"mouseover":r.anim&&r.anim.stop(!0),clearTimeout(r.tipsInter);break;case"mouseout":i()}}),r._tipQueue=d,r._tipIndex=0,r.tipsInter=null,i()},_initTips:function(e){{var t=this,i={left:e.left,tip:t._typeof(e.tip,"Array")?e.tip[0]:e.tip};t._tips}if(t._tips)a.get("span",t._tips).innerHTML=i.tip,t.anim&&t.anim.stop(),e.date===t.curdate?a.addClass(t._tips,"tip-cur"):a.removeClass(t._tips,"tip-cur"),t.anim=new u(t._tips,{left:i.left,marginLeft:-a.outerWidth(t._tips)/2},.5,"easeBoth",!1,function(){}).run();else{var n='<div class="tip" style="left:'+i.left+'px"><div class="arrow-grey"><div class="arrow"></div></div><span>'+i.tip+"</span></div>";t._tips=a.create(n),e.date===t.curdate?a.addClass(t._tips,"tip-cur"):a.removeClass(t._tips,"tip-cur"),a.append(t._tips,t.el),a.css(t._tips,{"margin-left":-a.outerWidth(t._tips)/2})}},formatDate:function(e,t){var i=new Date(e),a={"M+":i.getMonth()+1,"d+":i.getDate(),"h+":i.getHours(),"m+":i.getMinutes(),"s+":i.getSeconds(),"q+":Math.floor((i.getMonth()+3)/3),S:i.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(i.getFullYear()+"").substr(4-RegExp.$1.length)));for(var n in a)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[n]:("00"+a[n]).substr((""+a[n]).length)));return t}});return t=p}(),a.exports=n});