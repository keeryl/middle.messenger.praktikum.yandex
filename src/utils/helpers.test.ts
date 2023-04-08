import { expect } from 'chai';
import { Indexed, set } from './helpers'

describe('set helper', () => {
  let obj = {};
  const path = 'a.b';
  const value = 3;

  beforeEach(() => {
    obj = {}
  });

  it('should set a value by keypath', () => {
    const result = set(obj, path, value) as Indexed;
    expect(result).to.deep.eq({ ...obj, a: {b: value }});
  });

  it('should return passed object parametr if it is not an object', () => {
    const notObj = 'string';
    const result = set(notObj, path, value) as Indexed;
    expect(result).to.eq(notObj);
  });

  it('should throw an Error if passed `path` parametr is not a string', () => {
    const notStringPath = 3;
    const func = () =>  set(obj, notStringPath, value);
    expect(func).to.throw(Error)
  });

  it('should mutate passed object, not create a new one', () => {
    set(obj, path, value) as Indexed;
    // @ts-ignore
    expect(obj.a.b).to.eq(value);
  });

});
