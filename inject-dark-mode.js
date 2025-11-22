const fs = require('fs');
const path = require('path');

const directory = __dirname;

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

// Calculate relative path from HTML file to dark-mode-toggler.js
function getRelativePath(htmlFilePath) {
    const htmlDir = path.dirname(htmlFilePath);
    const relativePath = path.relative(htmlDir, directory);
    // Convert Windows path separators to forward slashes for HTML
    const normalizedPath = relativePath.split(path.sep).join('/');
    // If file is in root directory, use 'dark-mode-toggler.js', otherwise use '../' prefix
    return normalizedPath === '' ? 'dark-mode-toggler.js' : normalizedPath + '/dark-mode-toggler.js';
}

const htmlFiles = findHtmlFiles(directory);

if (htmlFiles.length === 0) {
    console.log('No HTML files found to inject the script into.');
    return;
}

let injectedCount = 0;
let updatedCount = 0;
htmlFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');

        // Check if the script is already there
        if (content.includes('dark-mode-toggler.js')) {
            // Check if path is correct
            const correctPath = getRelativePath(file);
            // Match the entire script tag including any attributes
            const scriptPattern = /<script\s+[^>]*src=["']([^"']*dark-mode-toggler\.js[^"']*)["'][^>]*><\/script>/i;
            const match = content.match(scriptPattern);
            
            if (match && match[1] !== correctPath) {
                // Path is incorrect, replace the entire script tag
                const newScriptTag = `<script src="${correctPath}" defer></script>`;
                content = content.replace(scriptPattern, newScriptTag);
                fs.writeFileSync(file, content, 'utf8');
                console.log(`Updated script path in ${file} to ${correctPath}`);
                updatedCount++;
            } else if (match) {
                console.log(`Script already exists with correct path in ${file}. Skipping.`);
            } else {
                console.log(`Script already exists in ${file}. Skipping.`);
            }
            return;
        }

        // Inject the script before the closing body tag
        if (content.includes('</body>')) {
            const relativePath = getRelativePath(file);
            const scriptTag = `<script src="${relativePath}" defer></script>\n</body>`;
            content = content.replace('</body>', scriptTag);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Successfully injected script into ${file} with path ${relativePath}`);
            injectedCount++;
        } else {
            console.warn(`Could not find </body> tag in ${file}. Skipping.`);
        }
    } catch (error) {
        console.error(`Failed to process ${file}:`, error);
    }
});

console.log(`\nInjection complete. Processed ${htmlFiles.length} HTML files:`);
console.log(`  - Injected script into ${injectedCount} files`);
console.log(`  - Updated path in ${updatedCount} files`);
