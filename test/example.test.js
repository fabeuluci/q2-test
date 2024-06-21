const assert = require("assert");

describe("Test each", () => {
    each([
        [1, 2],
        [4, 5]
    ]).it("value %s is lower than %s", ([a, b]) => {
        assert(a < b);
    });
});


it("Bla blah", () => {
    assert(true);
});

describe("Suite name for blah", () => {
    it("Bla blah", () => {
        assert(true);
    });
    it("Hey ho", () => {
        assert(true);
    });
});
