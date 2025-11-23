const fs = require('fs');
const path = require('path');

const directory = __dirname;

// Check for --force flag
const forceUpdate = process.argv.includes('--force');

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

// Get the correct script tag format
function getScriptTag(relativePath) {
    return `<script src="${relativePath}" defer></script>`;
}

const htmlFiles = findHtmlFiles(directory);

if (htmlFiles.length === 0) {
    console.log('No HTML files found to inject the script into.');
    return;
}

let injectedCount = 0;
let updatedCount = 0;
let skippedCount = 0;

htmlFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        const correctPath = getRelativePath(file);
        const correctScriptTag = getScriptTag(correctPath);
        
        // Match the entire script tag including any attributes
        const scriptPattern = /<script\s+[^>]*src=["']([^"']*dark-mode-toggler\.js[^"']*)["'][^>]*><\/script>/i;
        const match = content.match(scriptPattern);

        if (match) {
            // Script tag exists
            const currentPath = match[1].split('?')[0]; // Remove query params for comparison
            const needsUpdate = forceUpdate || match[0] !== correctScriptTag || currentPath !== correctPath;
            
            if (needsUpdate) {
                // Replace the existing script tag with the correct one
                content = content.replace(scriptPattern, correctScriptTag);
                fs.writeFileSync(file, content, 'utf8');
                console.log(`${forceUpdate ? 'Force updated' : 'Updated'} script in ${file} to ${correctPath}`);
                updatedCount++;
            } else {
                console.log(`Script already exists with correct path in ${file}. Skipping.`);
                skippedCount++;
            }
        } else if (content.includes('dark-mode-toggler.js')) {
            // Script reference exists but not in standard format - try to fix it
            console.log(`Found non-standard script reference in ${file}. Attempting to fix...`);
            // Try to replace any mention with proper script tag
            const anyRefPattern = /[^<]*dark-mode-toggler\.js[^>]*/i;
            if (content.includes('</body>')) {
                content = content.replace('</body>', correctScriptTag + '\n</body>');
                fs.writeFileSync(file, content, 'utf8');
                console.log(`Fixed and injected script into ${file} with path ${correctPath}`);
                injectedCount++;
            } else {
                console.warn(`Could not find </body> tag in ${file}. Skipping.`);
                skippedCount++;
            }
        } else {
            // Script doesn't exist - inject it
            if (content.includes('</body>')) {
                const scriptTag = correctScriptTag + '\n</body>';
                content = content.replace('</body>', scriptTag);
                fs.writeFileSync(file, content, 'utf8');
                console.log(`Successfully injected script into ${file} with path ${correctPath}`);
                injectedCount++;
            } else {
                console.warn(`Could not find </body> tag in ${file}. Skipping.`);
                skippedCount++;
            }
        }
    } catch (error) {
        console.error(`Failed to process ${file}:`, error);
    }
});

console.log(`\nInjection complete. Processed ${htmlFiles.length} HTML files:`);
console.log(`  - Injected script into ${injectedCount} files`);
console.log(`  - Updated script in ${updatedCount} files`);
if (skippedCount > 0) {
    console.log(`  - Skipped ${skippedCount} files (already up-to-date)`);
}
if (forceUpdate) {
    console.log(`\nNote: --force flag was used, all script tags were updated.`);
}
