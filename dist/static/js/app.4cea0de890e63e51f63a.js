webpackJsonp([1],{"1/oy":function(e,t){},"8eyw":function(e,t){},"9M+g":function(e,t){},GfHa:function(e,t){},Id91:function(e,t){},Jmt5:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.content.length>0?n("div",{staticClass:"container"},[n("table",{attrs:{id:"killfeed-tab"}},e._l(e.content,function(t){return n("tr",{key:t.time+t.eliminated+t.ko},[n("th",{staticClass:"kill"},[e._v(e._s(t.time+" – "+t.eliminator+" "+t.ko+" "+t.eliminated+" with "+t.gun))])])}))]):n("div",{staticClass:"line"})},staticRenderFns:[]};var o=n("VU/8")({name:"killfeed",props:["content"],data:function(){return{}}},a,!1,function(e){n("g6di")},"data-v-35136b02",null).exports,l=(n("Jmt5"),n("9M+g"),n("mtWM")),r=n.n(l),c={name:"reader",data:function(){return{file:null}},methods:{sendFile:function(){var e=this,t=new FormData;t.append("replay",this.file),r.a.post("https://fortnite-analyse-app.herokuapp.com/read",t).then(function(t){e.sendKillfeed(t.data),console.log("file uploaded")}).catch(function(e){console.log(e)})},sendKillfeed:function(e){var t=["Storm","Fall","Pistol","Shotgun","AR","SMG","Sniper"],n=["eliminates","knock out"],i=this,a=[];e.forEach(function(e){if("playerElim\0"===e.data.group){var o={time:i.millisecondsToTime(e.data.time1),eliminator:e.content.eliminator,eliminated:e.content.eliminated,gun:void 0!==t[e.content.gun]?t[e.content.gun]:e.content.gun,ko:n[e.content.ko]};a.push(o)}}),this.$emit("killfeed",a)},millisecondsToTime:function(e){return new Date(e).toISOString().slice(14,-5)}},mounted:function(){new FormData}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("b-form-file",{attrs:{state:Boolean(e.file),placeholder:"Choose a .replay file..."},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}}),e._v(" "),n("b-button",{attrs:{id:"submit-button",size:"lg",variant:"outline-secondary"},on:{click:e.sendFile}},[e._v("\n        Get killfeed\n    ")])],1)},staticRenderFns:[]};var u=n("VU/8")(c,s,!1,function(e){n("8eyw")},"data-v-29effb35",null).exports,d={name:"App",components:{Killfeed:o,Reader:u},data:function(){return{killfeed:[]}},methods:{setKillfeed:function(e){this.killfeed=e}}},f={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("reader",{on:{killfeed:function(t){e.setKillfeed(t)}}}),e._v(" "),n("killfeed",{attrs:{content:e.killfeed}})],1)},staticRenderFns:[]};var p=n("VU/8")(d,f,!1,function(e){n("aEZB")},null,null).exports,m=n("/ocq"),v=n("e6fC");i.a.use(v.a),i.a.use(m.a);var h=new m.a({routes:[{path:"/",name:"ReplayReader",component:u}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:h,components:{App:p},template:"<App/>"})},aEZB:function(e,t){},g6di:function(e,t){},zj2Q:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.4cea0de890e63e51f63a.js.map