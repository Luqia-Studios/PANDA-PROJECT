import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';

const source = await readFile('public/proposta-partner/shared/language.js', 'utf8');
const run = ({saved, languages, blocked = false}) => {
  let language, focus = 0, opens = 0;
  const handlers = {};
  const button = {dataset:{language:'ru'},addEventListener:(name,fn)=>{handlers.choose=fn;}};
  const close = {addEventListener(){},focus(){focus++;}};
  const toggle = {addEventListener:(name,fn)=>{handlers.open=fn;},setAttribute(){},focus(){focus++;}};
  const modal = {dataset:{},open:false,addEventListener:(name,fn)=>{handlers[name]=fn;},querySelector:()=>close,querySelectorAll:()=>[button],showModal(){this.open=true;opens++;},close(){this.open=false;handlers.close();}};
  const storage = {getItem(){if(blocked)throw Error();return saved;},setItem(key,value){if(blocked)throw Error();saved=value;}};
  const context = {document:{readyState:'complete',querySelector:(selector)=>selector.includes('toggle')?toggle:modal},navigator:{languages},localStorage:storage,window:{PANDA_TRANSLATIONS:{languages:{it:{},en:{},ru:{},de:{}}},PANDA_I18N:{apply:(value)=>{language=value;}}}};
  vm.runInNewContext(source,context);
  return {initial:language,focus,opens,choose(){handlers.open();handlers.choose();return {language,saved,closed:!modal.open};}};
};

test('saved preference takes precedence and browser regions resolve in preference order',()=>{
  assert.equal(run({saved:'ru',languages:['en-US']}).initial,'ru');
  const visitor=run({languages:['fr-FR','de-DE','en-US']});
  assert.equal(visitor.initial,'de');
  assert.equal(visitor.focus,0);
  assert.equal(visitor.opens,0);
  assert.equal(run({saved:'invalid',languages:['es-ES']}).initial,'it');
});
test('a choice survives reinitialization, and unavailable storage never prevents applying it',()=>{
  const chosen=run({languages:['en']}).choose();
  assert.deepEqual(chosen,{language:'ru',saved:'ru',closed:true});
  assert.equal(run({saved:chosen.saved,languages:['de']}).initial,'ru');
  const blocked=run({languages:['en-GB'],blocked:true});
  assert.equal(blocked.initial,'en');
  assert.equal(blocked.choose().language,'ru');
});
