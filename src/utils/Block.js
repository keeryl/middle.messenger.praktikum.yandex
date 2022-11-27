import { EventBus } from './EventBus.js';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

export class Block {

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

   _element = null;

  constructor(propsWithChildren = {}) {
    this.id = nanoid(6);
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this.props = this._makePropsProxy(props);
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {}

  _componentDidMount() {
    this.componentDidMount()
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }
  _componentDidUpdate() {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  render() {
    return '';
  }

  _render() {
    const template = this.render();
    const fragment = this.compile(template, {...this.props, children: this.children});
    console.log(this._element)
    const newElement = fragment.firstElementChild;
    this._element?.replaceWith(newElement);
    this._element = newElement;

    this._addEvents();
  }

  compile(template, context) {
    const contextAndStubs = { ...context };
    const compiled = Handlebars.compile(template);
    console.log(contextAndStubs)
    const temp = document.createElement('template');
    temp.innerHTML = compiled(contextAndStubs);
    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
      if(!stub) {
        return;
      }
      component.getContent().append(...Array.from(stub.childNodes));
      stub.replaceWith(component.getContent());
    });
    return temp.content;
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _addEvents() {
    const { events={} } = this.props;
    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _createResources() {

  }

  _getChildrenAndProps(childrenAndProps) {
    const props = {};
    const children = {};
    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
         children[key] = valuel;
      } else {
        props[key] = value;       }
    });
    return { props, children };
  }

  setProps = nextProps => {
    if(!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  }

  _makePropsProxy(props) {

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, prop, value) {
        const oldTarget = {...target}
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  getContent() {
    return this.element;
  }

  get element() {
    return this._element;
  }

}
