(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{22:function(e,t,n){},23:function(e,t,n){},24:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var a=n(2),o=n.n(a),c=n(17),r=n.n(c),l=(n(22),n(4)),i=n(5),s=n(7),u=n(6),p=(n(23),n(24),n(0)),h=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e="Please wait...";return this.props.profile&&(e=Object(p.jsxs)("div",{className:"SingerProfileData",children:[Object(p.jsx)("div",{className:"SingerName",children:this.props.profile.name}),Object(p.jsx)("div",{className:"SingerAmazingLevel",children:this.props.profile.amazing_level}),Object(p.jsx)("div",{className:"SingerCountry",children:this.props.profile.country})]})),Object(p.jsx)("div",{className:"SingerProfile",children:e})}}]),n}(o.a.Component),d=n(3),f=n.n(d),g=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={all:null,row:null},a}return Object(i.a)(n,[{key:"all",value:function(){var e=this;return f.a.get("https://my-fewp-project.herokuapp.com/data.php").then((function(t){return e.setState({all:t.data.data}),t.data.data})).catch((function(e){return console.log(e),null}))}},{key:"get",value:function(e){var t=this;return f.a.get("".concat("https://my-fewp-project.herokuapp.com","/data.php?id=").concat(e)).then((function(e){return t.setState({row:e.data.data}),e.data.data})).catch((function(e){return console.log(e),null}))}},{key:"update",value:function(e,t,n,a){var o=this,c=new URLSearchParams;return c.append("name",t),c.append("amazing_level",n),c.append("country",a),f.a.post("".concat("https://my-fewp-project.herokuapp.com","/data.php?id=").concat(e),c).then((function(c){var r={id:e,name:t,amazing_level:n,country:a};return o.setState({row:r}),r})).catch((function(e){return console.log(e),null}))}},{key:"delete",value:function(e){var t=this;return f.a.delete("".concat("https://my-fewp-project.herokuapp.com","/data.php?id=").concat(e),{}).then((function(e){return t.setState({row:null}),e.data.data})).catch((function(e){return console.log(e),null}))}},{key:"create",value:function(e,t,n){var a=this,o=new URLSearchParams;return o.append("name",e),o.append("amazing_level",t),o.append("country",n),f.a.post("".concat("https://my-fewp-project.herokuapp.com","/data.php"),o).then((function(o){var c={name:e,amazing_level:t,country:n};return a.setState({row:c}),c})).catch((function(e){return console.log(e),null}))}},{key:"runTests",value:function(){console.log("Test: get a single row"),this.get(3).then((function(e){console.table(e)})).catch((function(e){console.log("Failed"),console.table(e)})),console.log("Test: update a single row"),this.update(3,"Vengaboys",7,"Brazil").then((function(e){console.table(e)})).catch((function(e){console.log("Failed"),console.table(e)})),console.log("Test: get all rows"),this.all().then((function(e){console.table(e)})).catch((function(e){console.log("Failed"),console.table(e)}))}},{key:"componentDidMount",value:function(){this.runTests()}},{key:"render",value:function(){return Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)("h3",{children:"Artist Spotlight"}),Object(p.jsx)(h,{profile:this.state.row})]})}}]),n}(o.a.Component),m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,45)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),a(e),o(e),c(e),r(e)}))};r.a.render(Object(p.jsx)(o.a.StrictMode,{children:Object(p.jsx)(g,{})}),document.getElementById("root")),m()}},[[44,1,2]]]);
//# sourceMappingURL=main.550f336b.chunk.js.map