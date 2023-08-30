type Listener = (...args: any[]) => void;

interface EventListeners {
  [eventName: string]: Listener[];
}

export class EventEmitter {
  private listeners: EventListeners = {};

  on(eventName: string, listener: Listener): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  off(eventName: string, listener: Listener): void {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      this.listeners[eventName] = eventListeners.filter(l => l !== listener);
    }
  }

  emit(eventName: string, ...args: any[]): void {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      for (const listener of eventListeners) {
        listener(...args);
      }
    }
  }
}
