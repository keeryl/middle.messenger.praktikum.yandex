import { Block } from './Block.js';
import Handlebars from 'handlebars';

function registerComponent(name, Component) {
    // console.log(Component);
    // console.log(name);
  Handlebars.registerHelper(name, function({ data, fn, hash }) {
    // console.log('name',name);
    // console.log('data',data);
    // console.log('fn',fn);
    // console.log('hash',hash);

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
