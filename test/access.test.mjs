import {test} from 'node:test';
import assert from 'node:assert/strict';
import {authorized} from '../lib/access.mjs';
test('generation access denies missing, wrong and short codes',()=>{assert.equal(authorized(undefined,undefined),false);assert.equal(authorized('short','short'),false);assert.equal(authorized('0123456789abcdef','different-value!'),false);assert.equal(authorized('0123456789abcdef','0123456789abcdef'),true);});
