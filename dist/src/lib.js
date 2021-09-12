"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bip39_json_1 = __importDefault(require("./bip39.json"));
/** Generates a mneumonic seed. For testing purposes only. */
function generateSeed(words = 24) {
    const max = bip39_json_1.default.words.length;
    const seed = [];
    for (let k = 0; k < words; k++) {
        seed.push(bip39_json_1.default.words[Math.floor(Math.random() * max)]);
    }
    return seed.join(" ");
}
exports.generateSeed = generateSeed;
/** Rotate the seed with a pin */
function rotateSeed(seed, pin) {
    if (!validatePin(pin)) {
        throw new Error(`Invalid PIN: "${pin}". Must be 4 digits, 1-6.`);
    }
    const seedArray = seed.split(" ");
    let rotated = [];
    const rows = 4;
    const columns = 6;
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            let value = seedArray[r * columns + c];
            // If we're in the right position, perform a lookahead for the next position in the PIN. Use a
            // bounds check and wraparound if bound is hit
            if (Number(pin[r]) === c) {
                const nextRow = (r + 1) % rows;
                const nextCol = Number(pin[nextRow]);
                const next = seedArray[nextRow * columns + nextCol];
                value = next;
            }
            row.push(value);
        }
        rotated = rotated.concat(row);
        // console.log(row);
    }
    return rotated.join(" ");
}
exports.rotateSeed = rotateSeed;
/** Unrotate the seed with a pin */
function unrotateSeed(seed, pin) {
    if (!validatePin(pin)) {
        throw new Error(`Invalid PIN: "${pin}". Must be 4 digits, 1-6.`);
    }
    const seedArray = seed.split(" ");
    let rotated = [];
    const rows = 4;
    const columns = 6;
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            let value = seedArray[r * columns + c];
            // If we're in the right position, perform a lookahead for the next position in the PIN. Use a
            // bounds check and wraparound if bound is hit
            if (Number(pin[r]) === c) {
                const nextRow = r === 0 ? rows - 1 : (r - 1) % rows;
                const nextCol = Number(pin[nextRow]);
                const next = seedArray[nextRow * columns + nextCol];
                value = next;
            }
            row.push(value);
        }
        rotated = rotated.concat(row);
        // console.log(row);
    }
    return rotated.join(" ");
}
exports.unrotateSeed = unrotateSeed;
/** Validate a 4-digit pin, 1-6 */
function validatePin(pin) {
    return new RegExp("[1-6]{4}").test(pin);
}
exports.validatePin = validatePin;
