(self.webpackChunkhome=self.webpackChunkhome||[]).push([[524],{287:function(e,t,l){"use strict";l.d(t,{Z:function(){return o}});var a=l(18),n=l(7294),r=l(5444);function o(){return n.createElement(r.StaticQuery,{query:"4172131656",render:function(e){var t=Math.max.apply(Math,(0,a.Z)(e.allMarkdownRemark.group.map((function(e){return e.totalCount}))));return e.allMarkdownRemark.group.map((function(e){var l=1===e.totalCount?95:Math.floor(e.totalCount/t*50)+100;return n.createElement("span",{key:e.fieldValue},n.createElement(r.Link,{to:"/tags/"+e.fieldValue,itemProp:"url",style:{paddingRight:"5px",whiteSpace:"nowrap",fontSize:l+"%"}},e.fieldValue)," ")}))}})}},8080:function(e,t,l){"use strict";l.r(t);var a=l(7294),n=l(5444),r=l(3765),o=l(3751),u=l(287);t.default=function(e){var t,l=e.data,i=e.location,c=(null===(t=l.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",m=l.allMarkdownRemark.nodes;return a.createElement(r.Z,{location:i,title:c},a.createElement(o.Z,{title:"Blog"}),a.createElement("div",{className:"row"},a.createElement("div",{className:"col-md-8"},a.createElement("h3",null,"Tags"),a.createElement("p",null,a.createElement(u.Z,null)),a.createElement("h3",null,"Posts"),a.createElement("ol",{className:"list-unstyled"},m.map((function(e){var t=e.frontmatter.title||e.fields.slug;return a.createElement("li",{key:e.fields.slug},a.createElement("small",null,e.frontmatter.date)," ",a.createElement(n.Link,{to:e.fields.slug,itemProp:"url"},a.createElement("span",{itemProp:"headline"},t)))}))))))}}}]);
//# sourceMappingURL=component---src-pages-blog-index-js-f42bf683bd25cb1459a0.js.map