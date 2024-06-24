declare function describe(suiteName: string, func: () => unknown): void;
declare function it(testName: string, func: () => unknown): void;
declare function each<T>(samples: T[]): {it(format: string, func: (sample: T) => unknown): void;};
declare function mockFn<T>(fun: T): T&{mock: {calls: any[][]}};
declare function expect(value: any): {
    toBe(newValue: any): void;
    toEqual(newValue: any): void;
    toBeTruthy(): void;
    toBeFalsy(): void;
    toBeNull(): void;
    toContain(str: any): void;
    toBeInstanceOf(clazz: any): void;
    objectContaining(props: any): void;
    not: {
        toBe(newValue: any): void;
        toEqual(newValue: any): void;
        toBeTruthy(): void;
        toBeFalsy(): void;
        toBeNull(): void;
        toContain(str: any): void;
        toBeInstanceOf(clazz: any): void;
        objectContaining(props: any): void;
    };
}
type Mock<T = Function> = T&{mock: {calls: any[][]}};
