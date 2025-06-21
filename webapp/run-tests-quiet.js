const { spawn } = require('child_process');

const child = spawn('npx', ['react-app-rewired', 'test', '--watchAll=false', '--verbose=false', '--noStackTrace'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true
});

child.stdout.on('data', (data) => {
  const output = data.toString();
  if (!output.includes('Determining test suites to run')) {
    process.stdout.write(output);
  }
});

child.stderr.on('data', (data) => {
  const output = data.toString();
  if (!output.includes('Determining test suites to run')) {
    process.stderr.write(output);
  }
});

child.on('close', (code) => {
  process.exit(code);
});