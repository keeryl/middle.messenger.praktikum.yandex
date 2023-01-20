export class EventBus {

  constructor() {
    this.listeners = {}
  }

  on(event, callback) {
    // console.log(event, callback);
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    // console.log(event, callback);
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event}`)
    }
    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  emit(event, ...args) {
    // console.log(event);
    // console.log(...args)
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event}`)
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    })
  }
}
