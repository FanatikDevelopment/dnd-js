import Pipeline from './Pipeline';

interface TestApi {
  id?: string;
  test?: (val: number) => number;
}

describe('Pipeline', () => {
  describe('last', () => {
    const p = new Pipeline<TestApi>();

    it('should return undefined if the pipe is empty', () => {
      expect(p.last).toBeUndefined();
    });

    it('should return root if the pipe contains a single middleware', () => {
      p.pipe({ api: { test: (v: number) => v * 2 } });
      expect(p.last).toBe(p.root);
    });

    it('should return the last middleware', () => {
      const mws: TestApi[] = [...Array(5)].map(() => ({
        test: (v: number) => v * 2,
      }));

      mws.forEach((current) => {
        p.pipe({ api: current });
        expect(p.last?.api).toBe(current);
      });
    });
  });

  describe('find', () => {
    const p = new Pipeline<TestApi>()
      .pipe({ api: { id: '1' } })
      .pipe({ api: { id: '2' } })
      .pipe({ api: { id: '3' } })
      .pipe({ api: { id: '4' } })
      .pipe({ api: { id: '5' } })
      .pipe({ api: { id: '6' } });
    it('should return the first middleware that matches the predicate', () => {
      expect(p.find((mw) => mw.api.id === '7')).toBeUndefined();
      expect(p.find((mw) => mw.api.id === '3')?.api.id).toBe('3');
      expect(p.find((mw) => mw.api.id !== '1')?.api.id).toBe('2');
    });
  });

  describe('unpipe', () => {
    const p = new Pipeline<TestApi>();

    beforeEach(() => {
      p.unpipe();
      p.pipe({ api: { id: '1' } })
        .pipe({ api: { id: '2' } })
        .pipe({ api: { id: '3' } })
        .pipe({ api: { id: '4' } })
        .pipe({ api: { id: '5' } })
        .pipe({ api: { id: '6' } });
    });
    it('should remove all middlewares if no predicate and return the old root', () => {
      expect(p.unpipe()?.api.id).toBe('1');
    });

    it('should remove the first middleware that matches the predicate and return it', () => {
      expect(p.unpipe((mw) => mw.api.id === '1')?.api.id).toBe('1');
      expect(p.root?.api.id).toBe('2');
      const unpiped = p.unpipe((mw) => mw.api.id === '5');
      expect(unpiped?.api.id).toBe('5');
      expect(unpiped?.next?.api.id).toBe('6');
      const previous = p.find((mw) => mw.api.id === '4');
      expect(previous?.next?.api.id).toBe('6');
    });
  });

  describe('filter', () => {
    const p = new Pipeline<TestApi>();

    beforeEach(() => {
      p.unpipe();
      p.pipe({ api: { id: '1' } })
        .pipe({ api: { id: '2' } })
        .pipe({ api: { id: '3' } })
        .pipe({ api: { id: '4' } })
        .pipe({ api: { id: '5' } })
        .pipe({ api: { id: '6' } });
    });
    it('should be able to remove root', () => {
      expect(p.filter((mw) => mw.api.id !== '1').root?.api.id).toBe('2');
    });

    it('should keep each middleware that matches the predicate', () => {
      expect(
        p.filter((mw) => ['1', '3', '5'].includes(mw.api.id ?? '')).root?.api.id
      ).toBe('1');
      expect(p.root?.next?.api.id).toBe('3');
      expect(p.root?.next?.next?.api.id).toBe('5');
      expect(p.root?.next?.next?.next).toBeUndefined();
    });

    it('should remove each middleware that does not match the predicate', () => {
      expect(p.filter((mw) => mw.api.id === '3').root?.api.id).toBe('3');
      expect(p.root?.next).toBeUndefined();
    });

    it('should clear the pipeline if no mw match the predicate', () => {
      expect(p.filter((mw) => false).root).toBeUndefined();
    });
  });

  describe('insert', () => {
    const p = new Pipeline<TestApi>();

    beforeEach(() => {
      p.unpipe();
      p.pipe({ api: { id: '1' } })
        .pipe({ api: { id: '3' } })
        .pipe({ api: { id: '5' } });
    });
    it('should prepend the mw if no after predicate passed', () => {
      expect(p.insert({ api: { id: '0' } }).root?.api.id).toBe('0');
    });

    it('should append the mw if no mw matches the after predicate passed', () => {
      expect(p.insert({ api: { id: '6' } }, () => false).last?.api.id).toBe(
        '6'
      );
    });

    it('should insert the mw after the first mw that matches the predicate', () => {
      p.insert({ api: { id: '2' } }, (mw) => mw.api.id === '1')
        .insert({ api: { id: '4' } }, (mw) => mw.api.id === '3')
        .insert({ api: { id: '6' } }, (mw) => mw.api.id === '5');
      let current = p.root;
      let index = 1;
      while (current) {
        expect(current.api.id).toBe(`${index}`);
        current = current.next;
        ++index;
      }
    });
  });
});
