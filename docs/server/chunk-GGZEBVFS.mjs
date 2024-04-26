import './polyfills.server.mjs';
import{T as e}from"./chunk-NKLVYMZE.mjs";import"./chunk-VVCT4QZE.mjs";function i(t){return t.isActive("bulletList")||t.isActive("orderedList")}var r=e.create({name:"indent",addKeyboardShortcuts(){return{Tab:()=>i(this.editor)?null:this.editor.commands.insertContent("	")}}});export{r as TuiTabExtension,i as tuiIsOrderedOrBulletList};
