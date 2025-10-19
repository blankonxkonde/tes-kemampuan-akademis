const fs = require('fs');
const path = require('path');

const directory = __dirname;
const scriptTag = '<script src="dark-mode-toggler.js" defer></script>\n</body>';

// Find all HTML files recursively
function findHtmlFiles(dir, filelist = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findHtmlFiles(filePath, filelist);
        } else if (path.extname(file) === '.html' && file !== 'index.html') {
            filelist.push(filePath);
        }
    });
    return filelist;
}

const htmlFiles = findHtmlFiles(directory);

if (htmlFiles.length === 0) {
    console.log('No HTML files found to inject the script into.');
    return;
}

let injectedCount = 0;
htmlFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');

        // Check if the script is already there to avoid duplicates
        if (content.includes('dark-mode-toggler.js')) {
            console.log(`Script already exists in ${file}. Skipping.`);
            return;
        }

        // Inject the script before the closing body tag
        if (content.includes('</body>')) {
            content = content.replace('</body>', scriptTag);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Successfully injected script into ${file}`);
            injectedCount++;
        } else {
            console.warn(`Could not find </body> tag in ${file}. Skipping.`);
        }
    } catch (error) {
        console.error(`Failed to process ${file}:`, error);
    }
});

console.log(`\nInjection complete. Processed ${htmlFiles.length} HTML files and injected the script into ${injectedCount} of them.`);
