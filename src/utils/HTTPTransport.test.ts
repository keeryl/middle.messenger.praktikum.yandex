import sinon from 'sinon';
import HTTPTransport from './HTTPTransport';
import { expect } from 'chai';

describe('HTTPTransport class', () => {

  let requests: sinon.SinonFakeXMLHttpRequest[] = [];
  const originalXHR = global.XMLHttpRequest

  before(() => {
    const XHR = sinon.useFakeXMLHttpRequest()
    //@ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = (xhr) => {
      requests.push(xhr);
    }
  });

  afterEach(() => {
    requests = []
  });

  after(() => {
    global.XMLHttpRequest = originalXHR;
  });

  describe('GET method', () => {

    it('should make GET request', () => {
      const transport = new HTTPTransport('/');
      transport.get();
      const request = requests[0];
      expect(request.method).to.eq('Get');
    });

  });

  describe('POST method', () => {

    it('should make POST request', () => {
      const transport = new HTTPTransport('/');
      transport.post();
      const request = requests[0];
      expect(request.method).to.eq('Post');
    });

  });

  describe('PUT method', () => {

    it('should make PUT request', () => {
      const transport = new HTTPTransport('/');
      transport.put();
      const request = requests[0];
      expect(request.method).to.eq('Put');
    });

  });

  describe('PATCH method', () => {

    it('should make PATCH request', () => {
      const transport = new HTTPTransport('/');
      transport.patch();
      const request = requests[0];
      expect(request.method).to.eq('Patch');
    });

  });

  describe('DELETE method', () => {

    it('should make DELETE request', () => {
      const transport = new HTTPTransport('/');
      transport.delete();
      const request = requests[0];
      expect(request.method).to.eq('DeletE');
    });

  });

});
