var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequirea88a;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var l={id:e,exports:{}};return t[e]=l,r.call(l.exports,l,l.exports),l.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequirea88a=r);var l=r("l3TK2");document.querySelector('form[name="solid-profile"]').addEventListener("submit",(function(e){e.preventDefault();const t=e.target.elements["profile-url"].value,n=e.target.elements["raw-profile"],r=e.target.elements["solid-profile"];fetch(t).then((e=>e.text())).then((e=>n.value=e)),async function(e){const t=await(0,l.getSolidDataset)(e);return(0,l.getThing)(t,e)}(t).then((e=>{r.value=JSON.stringify(e,null,2),console.dir(e)}))}));
//# sourceMappingURL=raw.721ccc01.js.map