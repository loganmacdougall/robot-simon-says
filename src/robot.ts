interface LooseObject {
  [key: string | symbol]: any
}

export default class Robot implements LooseObject {
  private _node: Element
  private _details: LooseObject
  private _state: LooseObject
  private handler: ProxyHandler<Robot>;
  [key: string | symbol]: any

  constructor(node: Element, details: LooseObject) {
    this._node = node
    this._details = details
    this._state = {}

    // Setting up the proxy handler to intercept property gets
    this.handler = {
      get: (target, prop, receiver) => {
        if (prop in target) {
          return Reflect.get(target, prop, receiver)
        } else if (prop in target._state) {
          return Reflect.get(target._state, prop, receiver)
        } else {
          return Reflect.get(target._details, prop, receiver)
        }
      },
      set: (target, prop, value, _receiver) => {
        if (target[prop] == target._state) {
          target._state = value
        } else {
          target._state[prop] = value
        }

        if (prop == "name") target.set_nametag_node()
        target.set_data_node()

        return true
      }
    };

    return new Proxy(this, this.handler);
  }

  public go_left() {
    if (this._node.classList.contains("right")) {
      this._node.classList.remove("right")
    } else if (!this._node.classList.contains("left")) {
      this._node.classList.add("left")
    }
  }

  public go_right() {
    if (this._node.classList.contains("left")) {
      this._node.classList.remove("left")
    } else if (!this._node.classList.contains("right")) {
      this._node.classList.add("right")
    }
  }

  public go_center() {
    if (this._node.classList.contains("left")) {
      this._node.classList.remove("left")
    }
    if (this._node.classList.contains("right")) {
      this._node.classList.remove("right")
    }
  }

  public hands_up() {
    if (!this._node.classList.contains("hand-up")) {
      this._node.classList.add("hand-up")
    }
  }

  public hands_down() {
    if (this._node.classList.contains("hand-up")) {
      this._node.classList.remove("hand-up")
    }
  }

  public reset() {
    this.reset_details()
    this.set_nametag_node()
    this.set_data_node()
    this.go_center()
    this.hands_down()
  }

  public state_dump_as_string() {
    let state = { ...this._details, ...this._state }
    return JSON.stringify(state, null, 2)
  }

  private reset_details() {
    this._state = {}
  }

  private get_property(prop: string): any {
    let value = this._state[prop]
    if (value === undefined) value = this._details[prop]
    if (value === undefined) value = undefined
    return value
  }

  private set_nametag_node() {
    let name: string | undefined = this.get_property("name")
    if (!name) return
    let nametagNode: HTMLElement | null = this._node.querySelector('.robot-nametag')
    if (!nametagNode) return
    nametagNode.innerText = name
  }

  private set_data_node() {
    let str_state = this.state_dump_as_string()
    let dataNode: HTMLElement | null = this._node.querySelector('.robot-data')
    if (!dataNode) return
    dataNode.innerText = str_state
  }
}