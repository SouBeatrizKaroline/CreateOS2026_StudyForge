export const functions = {
  square: { label: 'x²', f: x => x*x, d: x => 2*x },
  cubic: { label: 'x³', f: x => x*x*x, d: x => 3*x*x },
  sine: { label: 'sin(x)', f: Math.sin, d: Math.cos }
};
export function validateInput(input) {
  if (!input || !Object.hasOwn(functions,input.fn)) throw new Error('INVALID_INPUT');
  if (!['en','pt-BR','es'].includes(input.locale)) throw new Error('INVALID_INPUT');
  if (typeof input.x !== 'number' || !Number.isFinite(input.x) || Math.abs(input.x)>10) throw new Error('INVALID_INPUT');
  if (typeof input.h !== 'number' || !Number.isFinite(input.h) || input.h<0.000001 || input.h>1) throw new Error('INVALID_INPUT');
  return {fn:input.fn,locale:input.locale,x:input.x,h:input.h};
}
export function reference(input) {
  const {fn,x,h}=validateInput(input), {f,d}=functions[fn];
  return {derivative:d(x),rows:[1,0.1,0.01,0.001].map(scale=>{const step=h*scale;const slope=(f(x+step)-f(x))/step;return {h:step,slope,error:Math.abs(slope-d(x))};}),points:Array.from({length:81},(_,i)=>{const t=x-2+i/20;return {x:t,y:f(t)};})};
}
export function verifyResult(result,input) {
  const expected=reference(input);
  const close=(a,b)=>typeof a==='number'&&Number.isFinite(a)&&Math.abs(a-b)<=1e-7*Math.max(1,Math.abs(b));
  if (!result || !close(result.derivative,expected.derivative) || !Array.isArray(result.rows) || result.rows.length!==4 || !Array.isArray(result.points) || result.points.length!==81) throw new Error('INVALID_RESULT');
  for(let i=0;i<4;i++) for(const k of ['h','slope','error']) if(!close(result.rows[i][k],expected.rows[i][k])) throw new Error('INVALID_RESULT');
  for(let i=0;i<81;i++) for(const k of ['x','y']) if(!close(result.points[i][k],expected.points[i][k])) throw new Error('INVALID_RESULT');
  return expected;
}
