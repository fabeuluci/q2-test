const assert = require("assert");

it("Abc test", () => {
    assert(true);
});

each([
    [1, 2],
    {a: 4, b: "zxc"}
]).it("nr %#, first: %s, second %s", input => {
    assert(!!input);
});
