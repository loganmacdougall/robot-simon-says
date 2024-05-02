let tabs = Array.from(document.getElementsByClassName("tab"))
let tab_buttons = Array.from(document.getElementsByClassName("tab-button"))

export default () => {
  function open_tab(id: string) {
    tabs.forEach(tab => {
      if (tab.id == id && !tab.classList.contains("active")) {
        tab.classList.add("active")
      }
      else if (tab.id != id && tab.classList.contains("active")) {
        tab.classList.remove("active")
      }
    });
  }

  tab_buttons.forEach(btn => {
    btn.addEventListener("click", _ => {
      tab_buttons.forEach(b => b.classList.remove("active"))
      open_tab(btn.attributes.item(0)?.value!)
      btn.classList.add("active")
    })
  })
}