if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const c=e=>s(e,r),a={module:{uri:r},exports:o,require:c};i[r]=Promise.all(n.map((e=>a[e]||c(e)))).then((e=>(t(...e),o)))}}define(["./workbox-30ed6c48"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Dglxf2pP.js",revision:null},{url:"assets/index-DiwrgTda.css",revision:null},{url:"index.html",revision:"aaeb48ba41c1d98de89c35f7a49850a1"},{url:"registerSW.js",revision:"652aa5e3fcfa3c7f23e7e9da98645e90"},{url:"manifest.webmanifest",revision:"da7a878a507dd3eb586fc414f0d2498a"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/my-api\.com\/.*$/,new e.NetworkFirst({cacheName:"api-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:604800})]}),"GET")}));
