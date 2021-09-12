import yargsInteractive from "yargs-interactive";
import { rotateSeed, unrotateSeed } from "./lib";

const options: any = {
  seed: { type: "input", describe: "Enter your mneumonic seed (24 words)" },
  pin: {
    type: "confirm",
    describe: "PIN (must be exactly 4 digits 1-6)",
  },
  unrotate: {
    type: "boolean",
    default: false,
    describe: "Unrotate the seed with the PIN",
  },
};

yargsInteractive()
  .usage("$0 <command> [args]")
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
