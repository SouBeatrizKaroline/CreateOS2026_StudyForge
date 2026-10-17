import {writeFile} from 'node:fs/promises';
import {runLab} from '../lib/agent.mjs';
process.loadEnvFile('.env');
const events=[];
const result=await runLab({fn:'square',x:2,h:0.1,locale:'en'},{emit:event=>{events.push(event);console.log(event.stage+(event.attempt?' '+event.attempt:''));}});
await writeFile('live-lab-result.json',JSON.stringify({testedAt:new Date().toISOString(),input:{fn:'square',x:2,h:0.1,locale:'en'},events,result},null,2));
console.log(JSON.stringify({mode:result.mode,derivative:result.derivative,firstSlope:result.rows[0].slope,attempts:result.attempts,cleanupConfirmed:events.some(e=>e.stage==='cleanup')}));

