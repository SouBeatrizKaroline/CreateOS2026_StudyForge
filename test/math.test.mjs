import {test} from 'node:test';import assert from 'node:assert/strict';
import {reference,validateInput,verifyResult} from '../lib/math.mjs';
import {copy} from '../public/i18n.mjs';
test('square derivative and forward differences match known values',()=>{const input={fn:'square',x:2,h:.1,locale:'en'},r=reference(input);assert.equal(r.derivative,4);assert.ok(Math.abs(r.rows[0].slope-4.1)<1e-12);assert.deepEqual(verifyResult(r,input),r);});
test('cubic and sine analytical references',()=>{assert.equal(reference({fn:'cubic',x:2,h:.1,locale:'es'}).derivative,12);assert.equal(reference({fn:'sine',x:0,h:.1,locale:'pt-BR'}).derivative,1);});
test('reject malformed input and prototype function names',()=>{for(const fn of ['__proto__','constructor','eval'])assert.throws(()=>validateInput({fn,x:2,h:.1,locale:'en'}));for(const x of [NaN,Infinity,'2',11])assert.throws(()=>validateInput({fn:'square',x,h:.1,locale:'en'}));});
test('successful code execution with wrong math is rejected',()=>{const input={fn:'square',x:2,h:.1,locale:'en'},r=reference(input);r.rows[1].slope=900;assert.throws(()=>verifyResult(r,input),/INVALID_RESULT/);});
test('locale dictionaries contain the same translated fields',()=>{for(const locale of ['pt-BR','es']){assert.deepEqual(Object.keys(copy[locale]).sort(),Object.keys(copy.en).sort());assert.deepEqual(Object.keys(copy[locale].events).sort(),Object.keys(copy.en.events).sort());assert.equal(copy[locale].questions.length,3);}});
