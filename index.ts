import yargsInteractive from "yargs-interactive";
import { rotateSeed, unrotateSeed } from "./src/lib";

const options: any = {
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

yargsInteractive()
  .usage(
    `
Wallet mneumoic seed rotator using a PIN

$0 <command> [args]

Usage:
  Rotate seed:
    $0 --seed="your_seed" --pin=1234
  Unrotate seed:
    $0 --seed="your_seed" --pin=1234 --unrotate`
  )
  .interactive(options)
  .then((result) => {
    // Your business logic goes here.
    // Get the arguments from the result
    // e.g. myCli(result.name);
    const operation = result.unrotate ? unrotateSeed : rotateSeed;
    console.log(
      `- Original seed: ${result.seed}\n` +
        `- New seed: ${operation(result.seed, result.pin)}\n`
    );
  });
