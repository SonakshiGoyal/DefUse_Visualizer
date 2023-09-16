// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
require('readline');
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let hopforward = vscode.commands.registerCommand('hop.hopforward', function () {
		
		const editor = vscode.window.activeTextEditor;
		let lines = editor.document.getText().split("\n");
		//const uri = vscode.Uri;
		const selection = editor.selection;
		const ddg = [["x", 17, "y", 18],["y", 18, "x", 6],["x", 6, "y", 7],["y", 23, "x", 6]]
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
			const highlighted = editor.document.getText(selectionRange).trim();
			//vscode.window.showInformationMessage(highlighted);
			const currline = editor.selection.active.line;
			//vscode.window.showInformationMessage(String(lineno));
			console.log(currline)
			for (let i = 0 ;i <ddg.length; i++)
			{
				if (ddg[i][0]==highlighted && ddg[i][1]==currline+1){
					const decoration = vscode.window.createTextEditorDecorationType({
                        backgroundColor: 'yellow', // Your desired highlight color
                        color: 'black' // Your desired text color
                    });
					console.log(String(ddg[i]))
					let l = new Number(ddg[i][3]).valueOf() -1
					
					let range = editor.document.lineAt(l).range;
					let ind = lines[l].indexOf(String(ddg[i][2]))
					let pos1 = new vscode.Position(l,ind)
					let pos2= new vscode.Position(l,ind+String(ddg[i][2]).length)
					const rangeToHighlight = new vscode.Range(pos1, pos2);
					editor.setDecorations(decoration, [rangeToHighlight]);

                    // Optionally, you can remove the decoration after a delay or when needed.
                    setTimeout(() => decoration.dispose(), 2000);

					editor.selection =  new vscode.Selection(pos1,pos2);
					editor.revealRange(range);
					
				}

			}

		}
		
	});


	let hopback = vscode.commands.registerCommand('hop.hopback', function () {
		
		const editor = vscode.window.activeTextEditor;
		let lines = editor.document.getText().split("\n");
		//const uri = vscode.Uri;
		const selection = editor.selection;
		const ddg = [["x", 17, "y", 18],["y", 18, "x", 6],["x", 6, "y", 7],["y", 23, "x", 6]]
		if (selection && !selection.isEmpty) {
			const decoration = vscode.window.createTextEditorDecorationType({
				backgroundColor: 'yellow', // Your desired highlight color
				color: 'black' // Your desired text color
			});
			const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
			const highlighted = editor.document.getText(selectionRange).trim();
			const currline = editor.selection.active.line;
			console.log(currline)
			for (let i = 0 ;i <ddg.length; i++)
			{
				if ((ddg[i][2]==highlighted || ddg[i][0]==highlighted) && ddg[i][3]==currline+1){
					console.log(String(ddg[i]))
					let l = new Number(ddg[i][1]).valueOf() -1
					
					let range = editor.document.lineAt(l).range;
					let ind = lines[l].indexOf(String(ddg[i][0]))
					let pos1 = new vscode.Position(l,ind)
					let pos2= new vscode.Position(l,ind+String(ddg[i][0]).length)
					const rangeToHighlight = new vscode.Range(pos1, pos2);
					editor.setDecorations(decoration, [rangeToHighlight]);

                    // Optionally, you can remove the decoration after a delay or when needed.
                    setTimeout(() => decoration.dispose(), 2000);

					editor.selection =  new vscode.Selection(pos1,pos2);
					editor.revealRange(range);
					
				}

			}

		}
		
	});

	context.subscriptions.push(hopforward);
	context.subscriptions.push(hopback);
	
}

// This method is called when your extension is deactivated

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
