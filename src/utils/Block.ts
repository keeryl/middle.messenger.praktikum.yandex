import { EventBus } from './EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

export class Block<P extends Record<string, unknown> = any> {

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
    FLOW_CWU: "flow:component-will-unmount"
  } as const;

   _element: any = null;
   id: string;
  //  children: Record<string, Block | Block[]>;
   children: Record<string, Block>;
   props: P;
   eventBus: () => EventBus;

  constructor(propsWithChildren: P) {
    this.id = nanoid(6);
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;
    this.props = this._makePropsProxy(props);
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  protected init() {}

  private _init() {
    this.init()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  private _componentDidMount() {
    this.componentDidMount()
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    // Object.values(this.children).forEach(child => {
    //   if (Array.isArray(child)) {
    //     child.forEach(ch => ch.dispatchComponentDidMount());
    //   } else {
    //     child.dispatchComponentDidMount();
    //   }
    // });
  }

  protected componentDidUpdate(oldProps: P, newProps: P): boolean {
    return true;
  }
  private _componentDidUpdate(oldProps: P, newProps: P): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentWillUnmount() {}

  private _componentWillUnmount() {
    this.componentWillUnmount();
  }

  dispatchComponentWillUnmount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CWU);
  }

  protected render(): string {
    return '';
  }

  private _render() {
    Object.values(this.children).forEach(child => {
      child.dispatchComponentWillUnmount();
    });
    const template = this.render();
    const fragment = this.compile(template, {...this.props, children: this.children});
    const newElement = fragment.firstElementChild;
    this._element?.replaceWith(newElement);
    this._element = newElement;
    this._removeEvents();
    this._addEvents();
  }

  compile(template: string, context: any) {

    const contextAndStubs = { ...context };
    const compiled = Handlebars.compile(template);
    const temp = document.createElement('template');
    temp.innerHTML = compiled(contextAndStubs);
    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
      if(!stub) {
        return;
      }
      component.getContent()?.append(...Array.from(stub.childNodes));
      stub.replaceWith(component.getContent());
      component.dispatchComponentDidMount();
    });
    return temp.content;



///////////

    // const contextAndStubs = { ...context };
    // Object.entries(this.children).forEach(([name, component]) => {
    //   if (Array.isArray(component)) {
    //     contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`)
    //   } else {
    //     contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    //   }
    // });
    // const compiled = Handlebars.compile(template);
    // const temp = document.createElement('template');
    // temp.innerHTML = compiled(contextAndStubs);

    // const replaceStub = (component: Block) => {
    //   const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
    //   if (!stub) {
    //     return;
    //   }
    //   component.getContent()?.append(...Array.from(stub.childNodes));
    //   stub.replaceWith(component.getContent()!);
    // }

    // Object.entries(this.children).forEach(([_, component]) => {
    //   if (Array.isArray(component)) {
    //     component.forEach(replaceStub);
    //   } else {
    //     replaceStub(component);
    //   }
    // });

    // return temp.content;
    ///////
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
  }

  private _addEvents() {
    const {events = {}} = this.props as P & { events: Record<string, () => void> };
    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const {events = {}} = this.props as P & { events: Record<string, () => void> };
    if (!!this.props.events) {
      Object.keys(events).forEach(eventName => {
        this._element.removeEventListener(eventName, events[eventName]);
      });
    }
  }

  private _getChildrenAndProps(childrenAndProps: P): {props: P, children: Record<string, Block>} {
    const props = {} as Record<string, unknown>;
    // const children: Record<string, Block | Block[]> = {};
    const children: Record<string, Block> = {};

    // Object.entries(childrenAndProps).forEach(([key, value]) => {
    //   if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)) {
    //     children[key as string] = value;
    //   } else if (value instanceof Block) {
    //     children[key as string] = value;
    //   } else {
    //     props[key] = value;
    //   }
    // });

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  setProps = (nextProps: P): void => {
    if(!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  }

  private _makePropsProxy(props: P) {

    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, prop, value): boolean {
        const oldTarget = {...target}
        target[prop as keyof P] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...oldTarget }, { ...target });
        return true;
      },

      deleteProperty(): never {
        throw new Error('Нет доступа');
      }
    });
  }

  public getContent() {
    return this.element;
  }

  get element() {
    return this._element;
  }

}


