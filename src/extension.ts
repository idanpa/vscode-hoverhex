'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let aa = vscode.languages.registerHoverProvider({scheme: '*', language: '*'}, {
        provideHover(document, position, token) {
            const hoveredWord = document.getText(document.getWordRangeAtPosition(position));
            let resultArr = /^(0x[0-9a-fA-F]+)[Uu]?[Ll]{0,2}$/g.exec(hoveredWord);
            if (resultArr) {
                var x = parseInt(resultArr[1], 16);
                var splitWord = [];
                var len = resultArr[1].length;

                for(var i = len; i > 6; i -= 4) {
                    splitWord.push(resultArr[1].substr(i - 4, 4))
                }
                splitWord.push(resultArr[1].substr(0, i))

                return new vscode.Hover( splitWord.reverse().join("_") + ' = ' + x);
            }

        }
    });
    context.subscriptions.push(aa);
}

export function deactivate() {
}
