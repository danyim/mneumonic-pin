import yargs from "yargs";
import { rotateSeed, unrotateSeed } from "./src/lib";

async function init() {
  try {
    const argv = await yargs(process.argv.slice(2))
      .usage(
        `Wallet mneumoic seed rotator using a PIN

$0 <command> [args]

Usage:
  Rotate seed:
    $0 --seed="your_seed" --pin=1234
  Unrotate seed:
    $0 --seed="your_seed" --pin=1234 --unrotate`
      )
      .options({
        seed: {
          type: "string",
          describe: "Your mneumonic seed (24 words)",
          alias: "s",
        },
        pin: {
          type: "string",
          describe: "PIN (must be exactly 4 digits 1-6)",
          alias: "p",
        },
        unrotate: {
          type: "boolean",
          default: false,
          describe: "Unrotate the seed with the PIN",
          alias: "u",
        },
      })
      .parseSync();

    if (!argv.seed || !argv.pin) {
      throw new Error("Invalid input");
    }

    const operation = argv.unrotate ? unrotateSeed : rotateSeed;
    console.log(
      `- Original seed: ${argv.seed}\n` +
        `- New seed: ${operation(argv.seed, argv.pin)}\n`
    );
  } catch (err) {}
}

init();
