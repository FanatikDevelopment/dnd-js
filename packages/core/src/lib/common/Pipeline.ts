import MiddleWareProxy from './MiddleWareProxy';
import { MiddleWare } from './types';

export default class Pipeline<Api> {
  public root?: MiddleWareProxy<Api>;

  constructor(root?: MiddleWare<Api>) {
    this.root = root ? new MiddleWareProxy<Api>(root) : undefined;
  }

  get last(): MiddleWareProxy<Api> | undefined {
    if (!this.root) {
      return undefined;
    }

    const getLast = (current: MiddleWareProxy<Api>): MiddleWareProxy<Api> =>
      current.next ? getLast(current.next) : current;

    return getLast(this.root);
  }

  find(
    f: (mw: MiddleWareProxy<Api>) => boolean
  ): MiddleWareProxy<Api> | undefined {
    return this.visit((current) => (f(current) ? current : undefined));
  }

  pipe(mw: MiddleWare<Api>): this {
    if (!this.root) {
      this.root = new MiddleWareProxy<Api>(mw);
      return this;
    }

    this.last!.setNext(mw);
    return this;
  }

  unpipe(
    f?: (mw: MiddleWareProxy<Api>) => boolean
  ): MiddleWare<Api> | undefined {
    if (!f) {
      const result = this.root;
      this.root = undefined;
      return result;
    }

    return this.visit<MiddleWareProxy<Api>>(
      (current, previous): MiddleWareProxy<Api> | undefined => {
        if (!current || !f(current)) {
          return undefined;
        }

        const result = current;
        if (!previous) {
          this.root = current.next;
        } else {
          previous.next = current.next;
        }

        return result;
      }
    );
  }

  filter(f: (mw: MiddleWareProxy<Api>) => boolean): this {
    let current = this.root;
    let previous: MiddleWareProxy<Api> | undefined;

    while (current) {
      if (f(current)) {
        previous = current;
        current = current.next;
        continue;
      }

      if (!previous) {
        this.root = current.next;
      } else {
        previous.next = current.next;
      }

      current = current.next;
    }

    return this;
  }

  insert(
    mw: MiddleWare<Api>,
    after?: (mw: MiddleWareProxy<Api>) => boolean
  ): this {
    if (!after || !this.root) {
      const oldRoot = this.root;
      this.root = new MiddleWareProxy<Api>(mw);
      if (oldRoot) {
        this.pipe(oldRoot);
      }

      return this;
    }

    let current: MiddleWareProxy<Api> | undefined = this.root;
    let oldNext: MiddleWareProxy<Api> | undefined;

    while (current) {
      if (!after(current)) {
        current = current.next;
        continue;
      }

      oldNext = current.next;
      current.next = new MiddleWareProxy<Api>(mw);
      if (oldNext) {
        this.pipe(oldNext);
      }
      return this;
    }

    this.pipe(mw);

    return this;
  }

  visit<R = any>(
    f: (
      mw: MiddleWareProxy<Api>,
      previous: MiddleWareProxy<Api> | undefined,
      pipeline: Pipeline<Api>
    ) => R | undefined
  ): R | undefined {
    if (!this.root) {
      return undefined;
    }

    const step = (
      current: MiddleWareProxy<Api>,
      prev?: MiddleWareProxy<Api>
    ): R | undefined => {
      const result = f(current, prev, this);
      if (result) {
        return result;
      }

      if (current.next) {
        return step(current.next, current);
      }

      return undefined;
    };

    return step(this.root);
  }
}
