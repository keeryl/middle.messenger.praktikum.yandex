import Handlebars from 'handlebars';
import { Block } from '../utils/Block';

function registerComponent(name: string, Component: typeof Block): void {
  Handlebars.registerHelper(name, function({ data, fn, hash }) {
    fn
    const component = new Component(hash);
    if (!data.root.children) {
      data.root.children = {}
    }
    data.root.children[component.id] = component;
    return `<div data-id="${component.id}"></div>`;
  });
}

export default registerComponent;
