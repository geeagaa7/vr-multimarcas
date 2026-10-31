import {mkdir,readFile,writeFile,rm} from 'node:fs/promises';
await mkdir('server',{recursive:true});
await writeFile('server/app-shell.html',await readFile('dist/client/index.html','utf8'));
// Dynamic routes return this shell with current persisted metadata. Static assets stay on the CDN.
await rm('dist/client/index.html');
