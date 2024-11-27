const vscode =  require('vscode');

function count(list){
  let n = 0;
  for(let i = 0; i < list.length; ++i){
    n += Number(list[i]);
  }
  return n;
}

function calculator() {
  return vscode.commands.registerTextEditorCommand('calculator.calculator', (editor, edit) => {
      const selection = editor.selection;
      text = editor.document.getText(selection).replaceAll(" ","").replaceAll("-","+-").split("+");

      edit.replace(selection, count(text));
  });
}

function activate(context) {
  context.subscriptions.push(calculator());
}

function deactivate() {}

module.exports = {activate, deactivate}