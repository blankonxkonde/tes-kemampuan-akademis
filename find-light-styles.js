const fs = require('fs');
const path = require('path');

const directory = __dirname;

function findHtmlFiles(dir, filelist = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findHtmlFiles(filePath, filelist);
        } else if (path.extname(file) === '.html') {
            filelist.push(filePath);
        }
    });
    return filelist;
}

const htmlFiles = findHtmlFiles(directory);
const styleIssues = {};

// Regex to find style blocks
const styleRegex = /<style>([\s\S]*?)<\/style>/i;
// Regex to find selectors with background properties. It captures the selector group.
const backgroundRegex = /([^{}]+)\s*\{[^}]*?(background|background-color)\s*:[^;}]+;[^}]*\}/g;

console.log('Scanning HTML files for custom background styles...');

htmlFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const styleMatch = content.match(styleRegex);

        if (styleMatch && styleMatch[1]) {
            const styleContent = styleMatch[1];
            let match;
            const selectorsInFile = new Set(); // Use a Set to store unique selectors

            while ((match = backgroundRegex.exec(styleContent)) !== null) {
                const selector = match[1].trim();
                // Filter out selectors that we don't need to override
                if (selector !== 'body' && !selector.includes('dark-mode') && !selector.startsWith('th')) {
                   selectorsInFile.add(selector);
                }
            }
            
            if (selectorsInFile.size > 0) {
                styleIssues[path.relative(directory, file)] = Array.from(selectorsInFile);
            }
        }
    } catch (error) {
        console.error(`Failed to process ${file}:`, error);
    }
});

if (Object.keys(styleIssues).length > 0) {
    console.log('\n--- Scan Complete ---');
    console.log('Found selectors with background styles that need dark mode overrides:');
    for (const file in styleIssues) {
        console.log(`\n- In file: ${file.replace(/\\/g, '/')}`);
        styleIssues[file].forEach(selector => {
            console.log(`  - Selector: ${selector}`);
        });
    }
    console.log('\nUse this list to update dark-mode.css');
} else {
    console.log('\n--- Scan Complete ---');
    console.log('No new custom background styles found that need overrides.');
}
