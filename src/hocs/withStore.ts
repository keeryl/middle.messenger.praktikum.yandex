import store, { StoreEvents } from '../utils/Store';
import { Block } from '../utils/Block';
import { isEqual } from '../utils/helpers';

export function withStore(mapStateToProps: (state: any) => any) {

  return function wrap(Component: typeof Block){

    return class WithStore extends Component {
      private eventHandler: () => void;
      constructor(props: any) {

        let state = mapStateToProps(store.getState());

        const eventHandler = () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
            state = newState
          }
        }
        super({ ...props,  ...state });
        this.eventHandler = eventHandler;
        store.on(StoreEvents.Updated, this.eventHandler);

      }

      componentWillUnmount() {
        store.off(StoreEvents.Updated, this.eventHandler);
      }
    }
  }
}
