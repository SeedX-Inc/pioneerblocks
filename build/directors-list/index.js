(()=>{"use strict";var e,t={697:()=>{const e=window.wp.blocks,t=window.wp.blockEditor,r=window.wp.components,i=window.wp.i18n,s=window.ReactJSXRuntime,o=JSON.parse('{"UU":"create-block/directors-list"}');(0,e.registerBlockType)(o.UU,{attributes:{title:{type:"string",default:""},directors:{type:"array",default:[]}},edit:function({attributes:e,setAttributes:o}){const{title:a,directors:l}=e,n=(e,t,r)=>{const i=[...l];i[e][t]=r,o({directors:i})};return(0,s.jsxs)("div",{...(0,t.useBlockProps)({className:"directors-list"}),children:[(0,s.jsx)(t.RichText,{tagName:"h2",value:a,onChange:e=>o({title:e}),placeholder:(0,i.__)("Enter list title...","directors-list"),className:"directors-header"}),(0,s.jsx)(t.InspectorControls,{children:l.map(((e,o)=>(0,s.jsx)("div",{className:"director-inspector",children:(0,s.jsxs)(r.PanelBody,{title:e.name||(0,i.__)("Director Settings","directors-list"),initialOpen:!1,children:[(0,s.jsx)(r.TextControl,{label:(0,i.__)("Director Slug","directors-list"),value:e.slug,onChange:e=>n(o,"slug",e),placeholder:(0,i.__)("Enter slug for the director","directors-list")}),(0,s.jsx)(r.TextControl,{label:(0,i.__)("Description","directors-list"),value:e.descriptionFull,onChange:e=>n(o,"descriptionFull",e),placeholder:(0,i.__)("Enter description for the director","directors-list")}),(0,s.jsx)(r.ToggleControl,{label:(0,i.__)("Show Image in list","directors-list"),checked:e.showImage,onChange:e=>n(o,"showImage",e)}),(0,s.jsx)(t.MediaUpload,{onSelect:e=>n(o,"image",e.url),allowedTypes:["image"],render:({open:e})=>(0,s.jsx)(r.Button,{onClick:e,variant:"secondary",children:(0,i.__)("Choose Image","directors-list")})}),e.image&&(0,s.jsx)("img",{src:e.image,alt:e.name,className:"director-image-preview"}),(0,s.jsx)(r.TextControl,{label:(0,i.__)("Mail","directors-list"),value:e.mail,onChange:e=>n(o,"mail",e),placeholder:(0,i.__)("Enter email","directors-list")}),(0,s.jsx)(r.TextControl,{label:(0,i.__)("Phone","directors-list"),value:e.phone,onChange:e=>n(o,"phone",e),placeholder:(0,i.__)("Enter phone number","directors-list")}),(0,s.jsx)(r.TextControl,{label:(0,i.__)("X (Twitter)","directors-list"),value:e.twitter,onChange:e=>n(o,"twitter",e),placeholder:(0,i.__)("Enter X/Twitter handle","directors-list")})]})},o)))}),(0,s.jsx)("div",{className:"directors-container",children:l.map(((e,a)=>(0,s.jsxs)("div",{className:"director-item",children:[e.image&&e.showImage&&(0,s.jsx)("img",{src:e.image,alt:e.name,className:"director-image-preview"}),(0,s.jsx)(r.TextControl,{value:e.name,onChange:e=>n(a,"name",e),placeholder:(0,i.__)("Director Name","directors-list"),className:"director-name"}),(0,s.jsx)(t.RichText,{tagName:"p",value:e.description,onChange:e=>n(a,"description",e),placeholder:(0,i.__)("Short description (optional)","directors-list"),className:"director-description"}),(0,s.jsx)(r.Button,{isDestructive:!0,onClick:()=>(e=>{const t=l.filter(((t,r)=>r!==e));o({directors:t})})(a),className:"remove-director-btn",children:(0,i.__)("Remove","directors-list")})]},a)))}),(0,s.jsx)(r.Button,{isPrimary:!0,onClick:()=>{o({directors:[...l,{name:"",slug:"",image:null,description:"",descriptionFull:"",showImage:!0,mail:"",phone:"",twitter:""}]})},className:"add-director-btn",children:(0,i.__)("Add Director","directors-list")})]})},save:function({attributes:e}){const{title:r,directors:i}=e,o=JSON.stringify(i).replace(/</g,"\\u003c").replace(/>/g,"\\u003e");return(0,s.jsxs)("div",{...t.useBlockProps.save({className:"directors-list"}),className:"container",children:[r&&(0,s.jsx)(t.RichText.Content,{tagName:"h2",value:r,className:"directors-header"}),(0,s.jsx)("div",{className:"directors-container",children:i.map(((e,r)=>(0,s.jsxs)("div",{className:"director-item d-flex flex-column","data-index":r,children:[e.image&&e.showImage&&(0,s.jsx)("img",{src:e.image,className:"mb-1",alt:e.name,style:{maxHeight:"200px",maxWidth:"200px",objectFit:"contain",borderRadius:"12px"}}),(0,s.jsx)("strong",{className:"director-name",children:e.name}),e.description&&(0,s.jsx)(t.RichText.Content,{tagName:"p",value:e.description,className:"director-description mb-1"}),e.phone&&e.mail&&e.twitter&&(0,s.jsx)("svg",{width:"30",height:"30",viewBox:"0 0 30 30",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M25.5 4H4.5C3.57205 4.00099 2.68238 4.3686 2.02622 5.02217C1.37006 5.67574 1.00099 6.56188 1 7.48617V22.4269C1.00099 23.3512 1.37006 24.2373 2.02622 24.8909C2.68238 25.5444 3.57205 25.9121 4.5 25.913H25.5C26.428 25.9121 27.3176 25.5444 27.9738 24.8909C28.6299 24.2373 28.999 23.3512 29 22.4269V7.48617C28.999 6.56188 28.6299 5.67574 27.9738 5.02217C27.3176 4.3686 26.428 4.00099 25.5 4ZM24.6138 9.76649L15.6138 16.7388C15.4382 16.8747 15.2223 16.9485 15 16.9485C14.7777 16.9485 14.5618 16.8747 14.3862 16.7388L5.38625 9.76649C5.28051 9.68695 5.19169 9.58728 5.12496 9.47325C5.05823 9.35923 5.01491 9.23313 4.99753 9.10229C4.98015 8.97145 4.98905 8.83847 5.02371 8.71108C5.05837 8.5837 5.1181 8.46444 5.19944 8.36025C5.28077 8.25605 5.38208 8.169 5.49749 8.10414C5.61289 8.03929 5.74008 7.99792 5.87168 7.98245C6.00327 7.96698 6.13664 7.97772 6.26403 8.01403C6.39142 8.05034 6.5103 8.11151 6.61375 8.19398L15 14.6907L23.3862 8.19398C23.596 8.03625 23.8596 7.96707 24.1201 8.0014C24.3806 8.03573 24.617 8.17082 24.7783 8.37746C24.9396 8.58409 25.0128 8.84565 24.982 9.10559C24.9512 9.36553 24.8189 9.60294 24.6138 9.76649Z",fill:"#293C5C"})})]},r)))}),(0,s.jsx)("div",{id:"directors-data",style:{display:"none"},"data-json":o}),(0,s.jsxs)("div",{className:"director-details hidden",children:[(0,s.jsx)("button",{className:"back-button",children:"Back"}),(0,s.jsx)("div",{className:"director-content"})]})]})}})}},r={};function i(e){var s=r[e];if(void 0!==s)return s.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,i),o.exports}i.m=t,e=[],i.O=(t,r,s,o)=>{if(!r){var a=1/0;for(d=0;d<e.length;d++){for(var[r,s,o]=e[d],l=!0,n=0;n<r.length;n++)(!1&o||a>=o)&&Object.keys(i.O).every((e=>i.O[e](r[n])))?r.splice(n--,1):(l=!1,o<a&&(a=o));if(l){e.splice(d--,1);var c=s();void 0!==c&&(t=c)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[r,s,o]},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={7182:0,7122:0};i.O.j=t=>0===e[t];var t=(t,r)=>{var s,o,[a,l,n]=r,c=0;if(a.some((t=>0!==e[t]))){for(s in l)i.o(l,s)&&(i.m[s]=l[s]);if(n)var d=n(i)}for(t&&t(r);c<a.length;c++)o=a[c],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(d)},r=globalThis.webpackChunkpioneerblocks=globalThis.webpackChunkpioneerblocks||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var s=i.O(void 0,[7122],(()=>i(697)));s=i.O(s)})();