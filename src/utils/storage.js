const typeJudge = (arg, type) => {
  return Object.prototype.toString.call(arg).slice(8, -1) === type;
}

const ss = window.sessionStorage;

export const Session = {
  get(key) {
    if (key) return JSON.parse(ss.getItem(key))
    return null
  },
  set(key, value) {
    const arg = arguments[0];
    if (typeJudge(arg, "Object")) {
      for (let i in arg) {
        ss.setItem(i, JSON.stringify(arg[i]))
      }
    } else {
      ss.setItem(key, JSON.stringify(value))
    }
  },
  remove(key) {
    if (typeJudge(key, "Array")) {
      for (let i in key) {
        ss.removeItem(key[i])
      }
    } else {
      ss.removeItem(key)
    }
  },
  clear() {
    ss.clear()
  }
}
