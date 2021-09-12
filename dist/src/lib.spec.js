"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
describe("generateSeed", () => {
    it("should generate a seed", () => {
        const result = (0, lib_1.generateSeed)();
        expect(result).toBeTruthy();
        // console.log(result);
    });
    it("should generate default 24 words", () => {
        const result = (0, lib_1.generateSeed)();
        expect(result.split(" ")).toHaveLength(24);
    });
    it("should generate variable # of words", () => {
        const lengths = [1, 5, 30, 100];
        lengths.forEach((len) => {
            expect((0, lib_1.generateSeed)(len).split(" ")).toHaveLength(len);
        });
    });
});
describe("rotateSeed", () => {
    it("should rotate a seed with a pin", () => {
        const seed = "proof auto use march present inside announce bleak nerve tilt icon scene matter crater girl field distance camp avocado lawsuit pride injury point music";
        const expected = "proof nerve use march present inside announce bleak field tilt icon scene matter crater girl point distance camp avocado lawsuit pride injury auto music";
        const pin = "1234";
        const result = (0, lib_1.rotateSeed)(seed, pin);
        expect(result).toEqual(expected);
    });
});
describe("unrotateSeed", () => {
    it("should unrotate a seed with a pin", () => {
        const seed = "proof nerve use march present inside announce bleak field tilt icon scene matter crater girl point distance camp avocado lawsuit pride injury auto music";
        const expected = "proof auto use march present inside announce bleak nerve tilt icon scene matter crater girl field distance camp avocado lawsuit pride injury point music";
        const pin = "1234";
        const result = (0, lib_1.unrotateSeed)(seed, pin);
        expect(result).toEqual(expected);
    });
});
