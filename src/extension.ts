'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let aa = vscode.languages.registerHoverProvider({scheme: '*', language: '*'}, {
        provideHover(document, position, token) {
            const hoveredWord = document.getText(document.getWordRangeAtPosition(position));
            if (/^0x[0-9a-fA-F]+$/g.test(hoveredWord)) {
                var x = parseInt(hoveredWord, 16);
                var splitWord = [];
                var len = hoveredWord.length;

                for(var i = len; i > 6; i -= 4) {
                    splitWord.push(hoveredWord.substr(i - 4, 4))
                }
                splitWord.push(hoveredWord.substr(0, i))

                return new vscode.Hover( splitWord.reverse().join("_") + ' = ' + x);
            }

        }
    });
    context.subscriptions.push(aa);
}

export function deactivate() {
}
