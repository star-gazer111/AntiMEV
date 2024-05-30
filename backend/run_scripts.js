const { exec } = require('child_process');

// Function to run a script and return a promise
function runScript(script) {
    return new Promise((resolve, reject) => {
        const process = exec(`node ${script}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });

        process.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        process.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        process.on('close', (code) => {
            console.log(`Script ${script} exited with code ${code}`);
        });
    });
}

// Run the scripts sequentially
async function runScriptsSequentially() {
    try {
        console.log('Minting a PKP!...');
        await runScript('script.js');
        console.log('Node is live now!...');
        await runScript('fetch.js');
    } catch (error) {
        console.error('Error:', error);
    }
}

runScriptsSequentially();
