import {timingSafeEqual} from 'node:crypto';
export function authorized(provided,expected){
  if(typeof provided!=='string'||typeof expected!=='string'||expected.length<16)return false;
  const a=Buffer.from(provided),b=Buffer.from(expected);
  return a.length===b.length&&timingSafeEqual(a,b);
}
