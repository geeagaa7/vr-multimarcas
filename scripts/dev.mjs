import {spawn} from 'node:child_process';
const env={...process.env,WRANGLER_SEND_METRICS:'false',XDG_CONFIG_HOME:process.env.XDG_CONFIG_HOME||process.cwd()+'/.wrangler/config',WRANGLER_LOG_PATH:process.cwd()+'/.wrangler/logs'};
const api=spawn('node',['node_modules/wrangler/bin/wrangler.js','dev','--local','--ip','127.0.0.1','--port','8787','--persist-to','.wrangler/state'],{stdio:'inherit',env});
const vite=spawn('node',['node_modules/vite/bin/vite.js'],{stdio:'inherit',env});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{api.kill();vite.kill();process.exit()});
