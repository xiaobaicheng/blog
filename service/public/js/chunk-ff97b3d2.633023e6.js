(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ff97b3d2"],{"4ba8":function(t,n,e){"use strict";e("795d")},"795d":function(t,n,e){},ef85:function(t,n,e){"use strict";e.r(n);e("b0c0");var c=e("7a23"),r=function(t){return Object(c["N"])("data-v-19e2bbc6"),t=t(),Object(c["L"])(),t},a={id:"link"},u={class:"link-template"},i=r((function(){return Object(c["n"])("h2",null,"友链",-1)})),b=Object(c["q"])(" 请在 "),l=Object(c["q"])("留言区"),o=Object(c["q"])(" 按照以下格式申请友链 "),s=r((function(){return Object(c["n"])("p",null,"名称：有头发的帅哥",-1)})),j=r((function(){return Object(c["n"])("p",null,"主页：http://baidu.com",-1)})),O=r((function(){return Object(c["n"])("p",null,"图标：http://baidu.com",-1)})),f=r((function(){return Object(c["n"])("p",null,"描述：一名没脱发的前端工程师😆",-1)})),d={class:"link-content"},p=["href","title"],k=["src"],m={class:"name"};function h(t,n,e,r,h,g){var v=Object(c["T"])("router-link");return Object(c["K"])(),Object(c["m"])("div",a,[Object(c["n"])("article",u,[i,Object(c["n"])("p",null,[b,Object(c["r"])(v,{to:"/message"},{default:Object(c["ib"])((function(){return[l]})),_:1}),o]),s,j,O,f]),Object(c["n"])("article",d,[Object(c["n"])("ul",null,[(Object(c["K"])(!0),Object(c["m"])(c["b"],null,Object(c["R"])(h.linkInfo,(function(t){return Object(c["K"])(),Object(c["m"])("li",{key:t._id},[Object(c["n"])("a",{href:t.home,target:"_blank",title:t.describe},[Object(c["n"])("img",{class:"logo",src:t.logo},null,8,k),Object(c["n"])("p",m,Object(c["X"])(t.name),1)],8,p)])})),128))])])])}var g=e("1da1"),v=(e("96cf"),{name:"Link",data:function(){return{linkInfo:[]}},methods:{getlinkData:function(){var t=this;return Object(g["a"])(regeneratorRuntime.mark((function n(){var e,c;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$axios({method:"GET",url:"/getdata/link"});case 2:e=n.sent,c=e.data,t.linkInfo=c.data;case 5:case"end":return n.stop()}}),n)})))()}},created:function(){this.getlinkData()}}),w=(e("4ba8"),e("6b0d")),_=e.n(w);const I=_()(v,[["render",h],["__scopeId","data-v-19e2bbc6"]]);n["default"]=I}}]);
//# sourceMappingURL=chunk-ff97b3d2.633023e6.js.map