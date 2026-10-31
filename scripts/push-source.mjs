import {spawnSync} from 'node:child_process';
import {createInterface} from 'node:readline';
spawnSync('stty',['-echo'],{stdio:['inherit','ignore','ignore']});
process.stdout.write('Ready for source credential JSON (input hidden).\n');
const reader=createInterface({input:process.stdin});let data='';for await(const line of reader){data=line;break}reader.close();const {credential}=JSON.parse(data);
const env={...process.env,GIT_TERMINAL_PROMPT:'0'};
if(credential.auth_mode!=='work_proxy'&&credential.token){env.GIT_CONFIG_COUNT='1';env.GIT_CONFIG_KEY_0='http.extraHeader';env.GIT_CONFIG_VALUE_0='Authorization: Bearer '+credential.token;}
function git(args,auth=false){const r=spawnSync('git',args,{encoding:'utf8',env:auth?env:process.env});if(r.status!==0){process.stderr.write(r.stderr);throw new Error('Git operation failed: '+args[0]);}return r.stdout.trim()}
git(['init','-b','main']);git(['config','user.name','Sites']);git(['config','user.email','sites@local.invalid']);git(['add','.']);git(['commit','-m','Build VR Multimarcas storefront and protected content management']);if(spawnSync('git',['remote','get-url','origin'],{encoding:'utf8'}).status===0)git(['remote','set-url','origin',credential.remote_url]);else git(['remote','add','origin',credential.remote_url]);git(['push','-u','origin','HEAD:'+credential.branch],true);process.stdout.write(JSON.stringify({commit_sha:git(['rev-parse','HEAD'])})+'\n');
