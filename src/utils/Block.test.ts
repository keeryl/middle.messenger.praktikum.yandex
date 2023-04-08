import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type { Block as BlockType } from './Block'

const eventBusMock = {
  on: sinon.stub(),
  emit: sinon.stub(),
}

const { Block } = proxyquire('./Block', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;
      on = eventBusMock.on;
    }
  }
}) as { Block: typeof BlockType}

describe('Block class', () => {

  beforeEach(() => {
    eventBusMock.on.reset();
    eventBusMock.emit.reset();
  });

  class ComponentMock extends Block {}

  it('should fire init event on initialization',  () => {
    new ComponentMock({});
    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });

  it('should fire CDU event on setProps',  () => {
    const component = new ComponentMock({});
    component.setProps({a: "a"});
    expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(true);
  });

  it('should getContent() method return this._element',  () => {
    const component = new ComponentMock({});
    component._element = 3
    const res = component.getContent();
    expect(res).to.eq(3);
  });

  it('should setProps() method make Object.assign()',  () => {
    const component = new ComponentMock({});
    component.setProps({a: 'a'});
    component.setProps({b: 'b'})
    expect(component.props).to.include({a: 'a', b: 'b'});
  });

});
