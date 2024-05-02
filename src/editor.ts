import { editor as mEditor } from 'monaco-editor';
// @ts-ignore
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import Robot from './robot'

let editor: mEditor.IStandaloneCodeEditor | undefined = undefined

export default () => {
  // @ts-ignore
  self.MonacoEnvironment = {
    getWorker(_: any, _label: string) {
      return new tsWorker();
    }
  };

  const code_container = document.getElementById("code-container")!
  editor = mEditor.create(code_container, {
    value: ['if (robot.age < 10) {', '\trobot.go_left();', '} else {', '\trobot.go_right();', '}'].join('\n'),
    automaticLayout: true,
    language: "javascript",
    quickSuggestions: {
      "comments": false,
      "strings": false,
      "other": false
    },
    suggest: {
      showFields: false,
      showFunctions: false
    },
    fontSize: 24,
    lineNumbers: "off",
    minimap: { enabled: false },
    theme: 'hc-black'
  })
}

export function getRobotFunction() {
  // @ts-ignore robot gets used in the eval
  return (robot: Robot) => {
    eval(editor!.getValue())
  }
}