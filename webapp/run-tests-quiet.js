const { spawn } = require('child_process');

const child = spawn('npx', ['react-app-rewired', 'test', '--watchAll=false', '--verbose=false', '--noStackTrace'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true
});

let testOutput = '';

child.stdout.on('data', (data) => {
  const output = data.toString();
  if (output.includes('✅') || output.includes('❌')) {
    testOutput += output;
  }
});

child.stderr.on('data', (data) => {
  const output = data.toString();
  if (output.includes('✅') || output.includes('❌')) {
    testOutput += output;
  }
});

child.on('close', (code) => {
  if (testOutput) {
    process.stdout.write(testOutput);
  }
  process.exit(code);
});