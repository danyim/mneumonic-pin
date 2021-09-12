"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_interactive_1 = __importDefault(require("yargs-interactive"));
const lib_1 = require("./src/lib");
const options = {
    seed: {
        type: "input",
        describe: "Enter your mneumonic seed (24 words)",
        alias: "s",
    },
    pin: {
        type: "confirm",
        describe: "PIN (must be exactly 4 digits 1-6)",
        alias: "p",
    },
    unrotate: {
        type: "boolean",
        default: false,
        describe: "Unrotate the seed with the PIN",
        alias: "u",
    },
};
yargs_interactive_1.default()
    .usage(`
Wallet mneumoic seed rotator using a PIN

$0 <command> [args]

Usage:
  Rotate seed:
    $0 --seed="your_seed" --pin=1234
  Unrotate seed:
    $0 --seed="your_seed" --pin=1234 --unrotate`)
    .interactive(options)
    .then((result) => {
    // Your business logic goes here.
    // Get the arguments from the result
    // e.g. myCli(result.name);
    const operation = result.unrotate ? lib_1.unrotateSeed : lib_1.rotateSeed;
    console.log(`- Original seed: ${result.seed}\n` +
        `- New seed: ${operation(result.seed, result.pin)}\n`);
});
