export interface MiddleWare<Api> {
  next?: MiddleWare<Api>;
  api: Api;
}

export type NOf<T> = {
  n: number;
  of: T[];
};

export const checkNOf =
  <T>(config: NOf<T>) =>
  (selected: T[]) => {
    if (selected.length != config.n) {
      throw new Error(
        `Selection failure: length mismatch, expected ${
          config.n
        } of ${JSON.stringify(config.of)} received ${selected}`
      );
    }

    if (selected.find((current) => !config.of.includes(current))) {
      throw new Error(
        `Selection failure: value mismatch, expected ${
          config.n
        } of ${JSON.stringify(config.of)} received ${selected}`
      );
    }
  };
