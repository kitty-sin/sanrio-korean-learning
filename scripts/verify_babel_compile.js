const fs = require('fs');

async function check() {
    const html = fs.readFileSync('index.html', 'utf8');
    const scriptMatch = html.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
    if (!scriptMatch) {
        console.error('No babel script found!');
        process.exit(1);
    }
    const code = scriptMatch[1];

    console.log('Fetching @babel/standalone for syntax verification...');
    const res = await fetch('https://unpkg.com/@babel/standalone/babel.min.js');
    const babelCode = await res.text();
    const vm = require('vm');
    vm.runInThisContext(babelCode);
    const BabelObj = global.Babel || Babel;

    console.log('Compiling index.html babel code...');
    try {
        const output = BabelObj.transform(code, {
            presets: ['react']
        });
        console.log('SUCCESS! Babel successfully compiled index.html with 0 errors! Output length:', output.code.length);
    } catch (err) {
        console.error('Babel Compilation ERROR:', err.message);
        if (err.loc) {
            console.error('Location:', err.loc);
            const lines = code.split('\n');
            const lineNum = err.loc.line - 1;
            console.error('Context lines:');
            for (let i = Math.max(0, lineNum - 3); i <= Math.min(lines.length - 1, lineNum + 3); i++) {
                console.error(`${i + 1}: ${lines[i]}`);
            }
        }
        process.exit(1);
    }
}

check();
