(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{22:function(e,t,n){},23:function(e,t,n){},24:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var o=n(2),a=n.n(o),c=n(17),l=n.n(c),r=(n(22),n(4)),i=n(5),s=n(7),u=n(6),h=(n(23),n(24),n(1)),p=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e="Please wait...";return this.props.profile&&(e=Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{className:"SingerName",children:this.props.profile.name}),Object(h.jsx)("div",{className:"SingerAmazingLevel",children:this.props.profile.amazing_level}),Object(h.jsx)("div",{className:"SingerCountry",children:this.props.profile.country})]})),Object(h.jsx)("div",{className:"SingerProfile",children:e})}}]),n}(a.a.Component),d=n(3),f=n.n(d),g=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var o;return Object(r.a)(this,n),(o=t.call(this,e)).state={all:null,row:null},o}return Object(i.a)(n,[{key:"all",value:function(){var e=this;return f.a.get("https://my-fewp-project.herokuapp.com/data.php").then((function(t){return e.setState({all:t.data.data}),t.data.data})).catch((function(e){return console.log(e),null}))}},{key:"get",value:function(e){var t=this;return f.a.get("".concat("https://my-fewp-project.herokuapp.com","/data.php?id=").concat(e)).then((function(e){return t.setState({row:e.data.data}),e.data.data})).catch((function(e){return console.log(e),null}))}},{key:"update",value:function(e,t,n,o){var a=this,c={name:t,amazing_level:n,country:o};f.a.put("".concat("https://my-fewp-project.herokuapp.com","/data.php?id=").concat(e),c).then((function(c){var l={id:e,name:t,amazing_level:n,country:o};return a.setState({row:l}),l})).catch((function(e){return console.log(e),null}))}},{key:"delete",value:function(e){var t=this;return f.a.delete("".concat("https://my-fewp-project.herokuapp.com","/data.php?id=").concat(e),{}).then((function(e){return t.setState({row:null}),e.data.data})).catch((function(e){return console.log(e),null}))}},{key:"create",value:function(e,t,n){var o=this,a={name:e,amazing_level:t,country:n};return f.a.post("".concat("https://my-fewp-project.herokuapp.com","/data.php"),a).then((function(a){console.log(a);var c={name:e,amazing_level:t,country:n};return o.setState({row:c}),c})).catch((function(e){return console.log(e),null}))}},{key:"runTests",value:function(){console.log("Test: get a single row"),this.get(1).then((function(e){console.table(e)})).catch((function(e){console.log("Failed"),console.table(e)})),console.log("Test: get all rows"),this.all().then((function(e){console.table(e)})).catch((function(e){console.log("Failed"),console.table(e)})),console.log("Test: delete row 1"),this.delete(1).then((function(e){console.table(e)})).catch((function(e){console.log("Failed"),console.table(e)})),console.log("Test: delete a single row"),this.delete(1).then((function(e){console.table(e)})).catch((function(e){console.log("Failed"),console.table(e)})),console.log("Test: create a single row"),this.create("Robyn",10,"Denmark").then((function(e){console.table(e)})).catch((function(e){console.log("Failed"),console.table(e)}))}},{key:"componentDidMount",value:function(){this.runTests()}},{key:"render",value:function(){return Object(h.jsx)("div",{className:"App",children:Object(h.jsx)(p,{profile:this.state.data})})}}]),n}(a.a.Component),v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,45)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,c=t.getLCP,l=t.getTTFB;n(e),o(e),a(e),c(e),l(e)}))};l.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(g,{})}),document.getElementById("root")),v()}},[[44,1,2]]]);
//# sourceMappingURL=main.42040899.chunk.js.map