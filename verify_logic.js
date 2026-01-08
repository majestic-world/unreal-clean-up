const fs = require('fs');
const path = require('path');

function cleanUpDocument(text) {
	// 1. Remove Block Comments /* ... */
	let cleaned = text.replace(/\/\*[\s\S]*?\*\//g, '');

	// 2. Remove Line Comments // ...
	cleaned = cleaned.replace(/\/\/.*/g, '');

	// 3. Trim trailing whitespace from each line
	cleaned = cleaned.replace(/[ \t]+$/gm, '');

	// 4. Determine EOL and Remove duplicate blank lines
    const eol = text.includes('\r\n') ? '\r\n' : '\n';
	cleaned = cleaned.replace(/(\r\n|\r|\n){3,}/g, eol + eol);

    // 5. Trim leading/trailing blank lines from the file
    cleaned = cleaned.trim();

	return cleaned;
}

// Test case with CRLF
const contentCRLF = "function test1(){}\r\n\r\n\r\n\r\nfunction test2(){}";
const expectedCRLF = "function test1(){}\r\n\r\nfunction test2(){}";

const cleanedCRLF = cleanUpDocument(contentCRLF);

console.log('--- CRLF TEST ---');
if (cleanedCRLF === expectedCRLF) {
    console.log("SUCCESS: CRLF handled correctly.");
} else {
    console.log("FAILURE: CRLF not handled.");
    console.log("Expected representation:", JSON.stringify(expectedCRLF));
    console.log("Actual representation:  ", JSON.stringify(cleanedCRLF));
}

// Keep original file test
const testFilePath = path.join(__dirname, 'test_cleanup.uc');
if (fs.existsSync(testFilePath)) {
    const content = fs.readFileSync(testFilePath, 'utf8');
    const cleaned = cleanUpDocument(content);
    // Just output for manual verification
    console.log('--- FILE CLEANED ---');
    console.log(cleaned.substring(0, 50) + '...');
}
