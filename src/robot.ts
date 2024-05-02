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
          return target._state = value
        }
        return target._state[prop] = value;
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
    this.go_center()
    this.hands_down()
  }

  private reset_details() {
    this._state = {}
  }
}