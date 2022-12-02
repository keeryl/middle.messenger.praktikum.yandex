import { Block } from './Block.js';
import Handlebars from 'handlebars';

function registerComponent(name, Component) {
  Handlebars.registerHelper(name, function({ data, fn, hash }) {

    // console.log(Component);
    // console.log(name);
    // console.log(data);
    // console.log(fn);
    // console.log(hash);

    const component = new Component(hash);

    if (!data.root.children) {
      data.root.children = {}
    }

    data.root.children[component.id] = component;
    const contents = fn ? fn(this) : '';
    return `<div data-id="${component.id}"></div>`
  });
}

export default registerComponent;
