let robot_file_input = document.getElementById("robot-file")!

export let fileWatcher = document.createElement('watcher')

export default () => {
  robot_file_input.addEventListener("change", async (e: Event) => {
    const target = e.target as HTMLInputElement;
    let file = target.files?.[0] ?? null
    if (file) {
      let file_contents = await file.text()
      let robot_data = await JSON.parse(file_contents)
      fileWatcher.dispatchEvent(new CustomEvent("robotDataChange", {
        detail: robot_data,
        bubbles: false,
        cancelable: true,
        composed: false,
      }));
    }
  })
}