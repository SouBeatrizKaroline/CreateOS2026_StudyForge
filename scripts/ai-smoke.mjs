// Manual provider check, excluded from automated tests; never executes generated source.
process.loadEnvFile('.env');
const key=process.env.OPENROUTER_API_KEY||process.env.OPENROUTER_API_API_KEY;
if(!key)throw new Error('Missing OpenRouter credential');
const model='nvidia/nemotron-3-super-120b-a12b:free';
const response=await fetch('https://openrouter.ai/api/v1/chat/completions',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({model,response_format:{type:'json_object'},max_tokens:2000,messages:[{role:'user',content:'Return only JSON with code and explanation strings. code must be a Python program using only math and json. Compute forward differences for f(x)=x*x at x=2 and h=[0.1,0.01,0.001], then print a JSON object with slopes and analytic derivative 4. explanation must briefly explain the result in Brazilian Portuguese. No network or files.'}]}),signal:AbortSignal.timeout(90000)});
console.log('OpenRouter HTTP status:',response.status);
if(!response.ok){console.log('Free model request failed; no paid fallback requested.');process.exit(1);}
const completion=await response.json();
let generated;try{generated=JSON.parse(completion.choices?.[0]?.message?.content);}catch{console.log('Invalid JSON generation');process.exit(1);}
if(typeof generated.code!=='string'||typeof generated.explanation!=='string')throw new Error('Invalid generation schema');
const {writeFile}=await import('node:fs/promises');
await writeFile('ai-generation-check.json',JSON.stringify({model,generated,usage:completion.usage},null,2));
console.log('Generated Python and Portuguese explanation received. Source not executed.');
console.log('Reported cost:',completion.usage?.cost??'unavailable');
