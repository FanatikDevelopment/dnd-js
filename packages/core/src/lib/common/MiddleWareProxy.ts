import { MiddleWare } from './types';

export default class MiddleWareProxy<Api> implements MiddleWare<Api> {
  private _next?: MiddleWareProxy<Api>;

  readonly api: Api;

  constructor(mw: MiddleWare<Api>) {
    this.api = mw.api;
    this._next = mw.next ? new MiddleWareProxy<Api>(mw.next) : undefined;
  }

  get next(): MiddleWareProxy<Api> | undefined {
    return this._next;
  }

  set next(value: MiddleWareProxy<Api> | undefined) {
    this._next = value;
  }

  setNext(mw: MiddleWare<Api>) {
    this._next = new MiddleWareProxy<Api>(mw);
  }
}
