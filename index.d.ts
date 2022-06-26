declare function describe(suiteName: string, func: () => unknown): void;
declare function it(testName: string, func: () => unknown): void;
declare function each<T>(samples: T[]): {it(format: string, func: (sample: T) => unknown): void;};
