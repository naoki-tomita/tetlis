type Listener = (data?: any) => void;
export class Observable {
  listenersMap: { [type: string]: Array<Listener> } = {};
  on(type: string, listener: Listener) {
    this.listenersMap[type] = [...(this.listenersMap[type] || []), listener];
  }

  emit(type: string, data?: any) {
    (this.listenersMap[type] || []).forEach(listener => listener(data));
  }
}
