enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
};

type Options = {
method: METHOD;
data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

class Api {

  private request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
    const {method, data} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };

  public get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.GET});
  };

  public put(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.PUT});
  }

  public post(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.POST});
  }

  public delete(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHOD.DELETE});
  }

}

export default Api;
