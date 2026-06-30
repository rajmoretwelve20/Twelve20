#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

function run(cmd){
  console.log('> ' + cmd);
  execSync(cmd, {stdio: 'inherit'});
}

try{
  // Stage all changes
  run('git add -A');

  // Commit with a message including timestamp
  const msg = `site: deploy ${new Date().toISOString()}`;
  try {
    run(`git commit -m "${msg}"`);
  } catch(e){
    console.log('No changes to commit. Continuing.');
  }

  // Push to current remote
  run('git push');

  // Deploy to Firebase
  run('firebase deploy --only hosting');

  console.log('\nDeployment complete.');
}catch(err){
  console.error('Deploy script failed:', err.message);
  process.exit(1);
}
