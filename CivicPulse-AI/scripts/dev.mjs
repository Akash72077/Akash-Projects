import { spawn } from 'node:child_process';
import process from 'node:process';

// shell:true deliberately avoids Windows "spawn EINVAL" issues with npm.cmd.
const children = [
  spawn('npm run dev --prefix backend', { stdio: 'inherit', shell: true }),
  spawn('npm run dev --prefix frontend', { stdio: 'inherit', shell: true })
];
function stop(){ for(const child of children) if(!child.killed) child.kill(); }
process.on('SIGINT',()=>{stop();process.exit(0)});
process.on('SIGTERM',()=>{stop();process.exit(0)});
for(const child of children) child.on('exit',(code)=>{ if(code && code!==0) console.error(`A CivicPulse process exited with code ${code}`); });
