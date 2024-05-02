import Robot from "./robot"
import { getRobotFunction } from "./editor"
import { fileWatcher } from "./robot_data"

let playButton = document.getElementById("robot-play-button")!
let resetButton = document.getElementById("robot-reset-button")!
let robotContainer = document.getElementById("robots")!

let robots: Robot[] = []

export default () => {
  fileWatcher.addEventListener("robotDataChange", (e: Event) => {
    let robot_data: any[] = (<CustomEvent>e).detail

    robots = []
    robotContainer.innerHTML = ''

    robot_data.forEach(data => {
      let robotNode = createRobotNode(data)
      let robot = new Robot(robotNode, data)

      robots.push(robot)
      robotContainer.appendChild(robotNode)
    })
  })

  playButton?.addEventListener("click", () => {
    let func = getRobotFunction()
    robots.forEach(robot => {
      robot.reset()
      func(robot)
    })
  })

  resetButton?.addEventListener("click", () => {
    robots.forEach(robot => {
      robot.reset()
    })
  })
}

function createRobotNode(data: any) {
  let robotNode = document.createElement("div")
  robotNode.classList.add("robot")
  let robotNametagNode = document.createElement("span")
  robotNametagNode.classList.add("robot-nametag")
  robotNametagNode.textContent = `${data.name ?? ''}`
  let robotDataNode = document.createElement("pre")
  robotDataNode.classList.add("robot-data")
  robotDataNode.textContent = `${JSON.stringify(data, null, 2)}`
  let robotImageNode = document.createElement("div")
  robotImageNode.classList.add("robot-image")

  robotNode.appendChild(robotNametagNode)
  robotNode.appendChild(robotImageNode)
  robotNode.appendChild(robotDataNode)

  return robotNode
}
