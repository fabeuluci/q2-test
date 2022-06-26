import * as fs from "fs";
import * as path from "path";

let currentSuite: string;
let passed = 0;
let failed = 0;
const promises: any[] = [];
const start = Date.now();

function describe(suiteName: string, func: () => unknown) {
    currentSuite = suiteName;
    func();
    currentSuite = "";
}

async function it(testName: string, func: () => unknown) {
    execute(currentSuite, testName, func, []);
}

async function execute(suiteName: string, testName: string, func: Function, args: unknown[]) {
    try {
        const res = func.apply(null, args);
        if (res && typeof((<PromiseLike<unknown>>res).then) == "function") {
            promises.push(res);
            await res;
        }
        passed++;
        console.log("  \x1b[32mSuccess\x1b[0m" + (suiteName ? " " + suiteName : ""), testName);
    }
    catch (e) {
        failed++;
        console.log("  \x1b[31mFail\x1b[0m" + (suiteName ? " " + suiteName : ""), testName, e);
    }
}

function each<T>(samples: T[]): {it(format: string, func: (sample: T) => unknown): void;} {
    const suiteName = currentSuite;
    return {
        it: (testNameFormat: string, func: Function) => {
            for (const [i, sample] of samples.entries()) {
                const testName = formatString(testNameFormat, sample, i);
                execute(suiteName, testName, func, [sample]);
            }
        }
    };
}

function formatString(format: string, args: unknown, index: number) {
    let result = format;
    if (typeof(args) == "object" && args != null) {
        if (Array.isArray(args)) {
            for (const arg of args) {
                result = result.replace("%s", "" + arg);
            }
        }
        else {
            for (const arg in args) {
                result = result.replace("%s", "" + arg);
            }
        }
    }
    else {
        result = result.replace("%s", "" + args);
    }
    result = result.replace("%#", "" + index);
    return result;
}

function executeInPath(filePath: string, logPath: boolean) {
    if (fs.statSync(filePath).isDirectory()) {
        if (filePath.endsWith("node_modules")) {
            return;
        }
        for (const entry of fs.readdirSync(filePath)) {
            executeInPath(path.resolve(filePath, entry), logPath);
        }
    }
    else if (filePath.endsWith(".test.js")) {
        try {
            if (logPath) {
                console.log("Processing ", filePath);
            }
            require(filePath);
        }
        catch (e) {
            failed++;
            console.log("  \x1b[31mFail\x1b[0m Cannot read file " + filePath, e);
        }
    }
}

(<any>global).describe = describe;
(<any>global).it = it;
(<any>global).each = each;

async function go() {
    console.log("TESTING");
    
    executeInPath(path.resolve(process.argv.length >= 3 ? process.argv[2] : "."), process.argv.includes("--debug"));
    await Promise.allSettled(promises);
    
    console.log("============");
    console.log((failed == 0 ? "\x1b[32mSUCCESS\x1b[0m" : "\x1b[31mFAILED\x1b[0m") + " " + passed + " passed, " + failed + " failed in " + (Date.now() - start) + " ms");
    process.exit(failed == 0 ? 0 : 1);
}
go();
