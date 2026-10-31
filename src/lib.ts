import type {Bike,Settings} from './types';
export const money=(n:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(n);
export const num=(n:number)=>new Intl.NumberFormat('pt-BR').format(n);
export const slugify=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export function message(s:Settings,source:string,b?:Bike){const template=source==='finance'?s.financeMessage:b?s.bikeMessage:s.homeMessage;return template.replaceAll('{marca}',b?.brand??'').replaceAll('{modelo}',b?.model??'').replaceAll('{ano}',String(b?.year??'')).replaceAll('{preco}',b?money(b.price):'');}
export function whatsappUrl(s:Settings,source:string,b?:Bike){const digits=s.whatsapp.replace(/\D/g,'');return digits?'https://wa.me/'+digits+'?text='+encodeURIComponent(message(s,source,b)):'';}
export async function api<T=any>(path:string,init:RequestInit={}):Promise<T>{const res=await fetch('/api'+path,{...init,headers: init.body instanceof FormData?init.headers:{'Content-Type':'application/json',...init.headers}});let data:any;try{data=await res.json()}catch{throw new Error('Não foi possível acessar o servidor. Tente novamente.')}if(!res.ok)throw new Error(data.error||'Não foi possível concluir a operação.');return data;}
