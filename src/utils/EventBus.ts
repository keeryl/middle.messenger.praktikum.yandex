// export class EventBus<E extends { [Ev: string]: unknown[] }> {
//   private readonly listeners: {
//     [K in keyof E]?: Array<(...args: E[K]) => void>
//   };
//   constructor() {
//     this.listeners = {}
//   };

//   on<K extends keyof E>(event: K, callback: (...args: E[K]) => void ): void {
//     if (!this.listeners[event]) {
//       this.listeners[event] = [];
//     }
//     this.listeners[event]!.push(callback);
//   }

//   off<K extends keyof E>(event: K, callback: (...args: E[K]) => void):  void | never {
//     if (!this.listeners[event]) {
//       throw new Error(`Нет события ${event as string}`)
//     }
//     this.listeners[event] = this.listeners[event]!.filter(
//       listener => listener !== callback
//     );
//   }

//   emit<K extends keyof E>(event: K, ...args: E[K]): void | never {
//     if (!this.listeners[event]) {
//       throw new Error(`Нет события ${event as string}`)
//     }
//     this.listeners[event]!.forEach(listener => {
//       listener(...args);
//     })
//   }
// }



type Handler<A extends any[] = unknown[]> = (...args: A) => void;
type MapInterface<P> = P[keyof P]

export class EventBus<
  E extends Record<string, string> = Record<string, string>,
  Args extends Record<MapInterface<E>, any[]> = Record<string, any[]>
> {
  private readonly listeners: {
    [K in MapInterface<E>]?: Handler<Args[K]>[]
  } = {};

  on<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }


    this.listeners[event]?.push(callback);
  }

  off<Event extends MapInterface<E>>(event: Event, callback: Handler<Args[Event]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback
    );
  }

  emit<Event extends MapInterface<E>>(event: Event, ...args: Args[Event]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event]!.forEach(listener => {
      listener(...args);
    });
  }
}
