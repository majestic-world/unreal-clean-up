// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "unreal-code-cleanup" is now active!');

	// Command registered in package.json
	const disposable = vscode.commands.registerCommand('unreal-code-cleanup.clean', async (...args: any[]) => {

		// Determine the target URI(s)
		let targetUri: vscode.Uri | undefined;
		
		// If triggered from Explorer context menu
		if (args.length > 0 && args[0] instanceof vscode.Uri) {
			targetUri = args[0];
		} 
		// If triggered from Command Palette or Editor context menu -> use active editor
		else if (vscode.window.activeTextEditor) {
			targetUri = vscode.window.activeTextEditor.document.uri;
		}

		if (!targetUri) {
			vscode.window.showErrorMessage('Nenhum arquivo selecionado ou editor ativo para limpar.');
			return;
		}

		try {
			await processDocument(targetUri);
			vscode.window.showInformationMessage('Limpeza Unreal concluída!');
		} catch (error) {
			vscode.window.showErrorMessage(`Erro ao limpar arquivo: ${error}`);
		}
	});

	context.subscriptions.push(disposable);
}

async function processDocument(uri: vscode.Uri) {
	const document = await vscode.workspace.openTextDocument(uri);
	const text = document.getText();
	const newText = cleanUpDocument(text);

	if (text === newText) {
		return; 
	}

	const edit = new vscode.WorkspaceEdit();
	const fullRange = new vscode.Range(
		document.positionAt(0),
		document.positionAt(text.length)
	);

	edit.replace(uri, fullRange, newText);
	await vscode.workspace.applyEdit(edit);
	// Optionally save the document
	await document.save();
}

function cleanUpDocument(text: string): string {
	// 1. Remove Block Comments /* ... */
	// We use a regex that matches start of comment, anything in between (non-greedy), and end of comment.
	// We also handle newlines within the comment correctly.
	let cleaned = text.replace(/\/\*[\s\S]*?\*\//g, '');

	// 2. Remove Line Comments // ...
	// Matches // until end of line
	cleaned = cleaned.replace(/\/\/.*/g, '');

	// 3. Trim trailing whitespace from each line
	cleaned = cleaned.replace(/[ \t]+$/gm, '');

	// 4. Remove duplicate blank lines
	// Determine EOL (End Of Line) based on the file content or default to \n
	const eol = text.includes('\r\n') ? '\r\n' : '\n';
	
	// Create a regex that matches 3 or more line endings (mixed or consistent)
	// We use (\r\n|\r|\n) to capture any style of newline
	cleaned = cleaned.replace(/(\r\n|\r|\n){3,}/g, eol + eol);

    // 5. Trim leading/trailing blank lines from the file
    cleaned = cleaned.trim();

	return cleaned;
}

// This method is called when your extension is deactivated
export function deactivate() {}
