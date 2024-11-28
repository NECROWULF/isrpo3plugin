const vscode =  require('vscode');

function isNumber(n){
  for(let i = 0; i < n.length; ++i){
    if(n.substring(i,i+1) == "*" || n.substring(i,i+1) == "/"){
      return false;
    }
  }
  return true;
}

function mult(list){
  let n = Number(list[0]);
  for(let i = 1; i < list.length; ++i){
    if(isNumber(list[i])){
      n *= Number(list[i]);
    }else{
      n /= Number(list[i].split("/")[1]);
    }
  }
  return n;
}

function sum(list){
  let n = 0;
  for(let i = 0; i < list.length; ++i){
    if(!isNumber(list[i])){
      n += mult(list[i].replaceAll("/", "*1/").split("*"));
    }else{
      n += Number(list[i]);
    }
  }
  return n;
}

function calculator() {
  return vscode.commands.registerTextEditorCommand('calculator.calculator', (editor, edit) => {
      const selection = editor.selection;
      text = editor.document.getText(selection).replaceAll(" ","").replaceAll("-","+-").split("+");

      edit.replace(selection, sum(text));
  });
}
// 1 4*9 -3*-5 5/2
function activate(context) {
  context.subscriptions.push(calculator());
}

function deactivate() {}

module.exports = {activate, deactivate}
