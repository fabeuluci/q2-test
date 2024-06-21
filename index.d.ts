declare function describe(suiteName: string, func: () => unknown): void;
declare function it(testName: string, func: () => unknown): void;
declare function each<T>(samples: T[]): {it(format: string, func: (sample: T) => unknown): void;};
declare function mockFn<T>(fun: T): T&{mock: {calls: any[][]}};
type Mock<T = Function> = T&{mock: {calls: any[][]}};
