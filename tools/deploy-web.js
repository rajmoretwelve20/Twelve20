#!/usr/bin/env node
const { execSync } = require('child_process');

function run(cmd) {
  console.log('> ' + cmd);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  run('git add -A');

  const msg = `site: deploy ${new Date().toISOString()}`;
  try {
    run(`git commit -m "${msg}"`);
  } catch (e) {
    console.log('No changes to commit. Continuing.');
  }

  try {
    run('git push');
  } catch (e) {
    console.log('Git push failed. Continuing to Firebase deploy.');
  }

  run('firebase deploy --only hosting');
  console.log('\nDeployment complete.');
} catch (err) {
  console.error('Deploy script failed:', err.message);
  process.exit(1);
}
