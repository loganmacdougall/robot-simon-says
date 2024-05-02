import * as monaco from 'monaco-editor';
// @ts-ignore
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import Robot from './robot'

let editor: monaco.editor.IStandaloneCodeEditor | undefined = undefined

export default () => {
  // @ts-ignore
  self.MonacoEnvironment = {
    getWorker(_: any, _label: string) {
      return new tsWorker();
    }
  };

  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

  const code_container = document.getElementById("code-container")!
  editor = monaco.editor.create(code_container, {
    value: ['if (robot.age < 10) {', '\trobot.go_left();', '} else {', '\trobot.go_right();', '}'].join('\n'),
    automaticLayout: true,
    language: "javascript",
    fontSize: 24,
    lineNumbers: "off",
    minimap: { enabled: false },
    theme: 'hc-black'
  })
}

export function getRobotFunction() {
  return (robot: Robot) => {
    eval(editor!.getValue())
  }
}