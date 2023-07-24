import axios, { AxiosResponse } from 'axios';
import Method from '../enum/method';
import Url from '../url/url';
import RequestConfig from './requestconfig';
import ResponseBody from '../response/responsebody';

class Request {
  method : Method;

  url : Url;

  config : RequestConfig;

  constructor(method? : Method, url ?: Url, config ?: RequestConfig) {
    this.method = method ?? Method.GET;
    this.url = url ?? undefined;
    this.config = config ?? undefined;
  }

  async send() : Promise<ResponseBody> {
    const res : AxiosResponse = await axios({
      method: Method[<number><any> this.method].toLowerCase(),
      baseURL: this.url.url ?? undefined,
      headers: this.config.headers ?? undefined,
      data: this.config.data ?? undefined,
    });
    return {
      data: res.data,
      status: res.status,
      headers: res.headers,
    };
  }
}

export default Request;
