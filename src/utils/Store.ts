import { set } from './helpers';
import { EventBus } from './EventBus';

export enum StoreEvents {
  Updated = 'updated'
}

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    this.emit(StoreEvents.Updated);
  }

  public getState() {
    return this.state;
  }

  public clear() {
    this.state = {};
  }
}

const store = new Store();

export default store;
