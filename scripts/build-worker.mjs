import {build} from 'esbuild';
import {mkdir,copyFile,writeFile,readFile,cp,rm} from 'node:fs/promises';
await mkdir('dist/server',{recursive:true});
let shell;try{shell=await readFile('dist/client/index.html','utf8')}catch{shell=await readFile('dist/app-shell.html','utf8')}
await writeFile('dist/app-shell.html',shell);
await build({define:{__APP_SHELL__:JSON.stringify(shell)},entryPoints:['worker/index.ts'],outfile:'dist/server/index.js',bundle:true,format:'esm',platform:'browser',target:'es2022'});
const hosting=JSON.parse(await readFile('.openai/hosting.json','utf8'));
await mkdir('dist/.openai',{recursive:true});
await copyFile('.openai/hosting.json','dist/.openai/hosting.json');
await writeFile('dist/server/wrangler.json',JSON.stringify({name:'vr-multimarcas',main:'index.js',compatibility_date:'2026-05-15',assets:{directory:'../client',binding:'ASSETS',run_worker_first:true},d1_databases:[{binding:'DB',database_name:'vr-multimarcas-db',database_id:'local-preview',migrations_dir:'../drizzle'}],r2_buckets:[{binding:'BUCKET',bucket_name:'vr-multimarcas-images'}]}));

await cp('drizzle','dist/drizzle',{recursive:true});

await rm('dist/client/index.html',{force:true});
