type Listener = (...args: any[]) => void;

class Emiiter {
  private events: Record<string, Listener[]> = {};

  on(event: string, fn: Listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(fn);
  }

  emit(event: string, ...args: any[]) {
    this.events[event]?.forEach((fn) => fn(...args));
  }
}

export const emitter = new Emiiter();
