import bip39 from "./bip39.json";

/** Generates a mneumonic seed. For testing purposes only. */
export function generateSeed(words: number = 24): string {
  const max = bip39.words.length;
  const seed = [];
  for (let k = 0; k < words; k++) {
    seed.push(bip39.words[Math.floor(Math.random() * max)]);
  }
  return seed.join(" ");
}

/** Rotate the seed with a pin */
export function rotateSeed(seed: string, pin: string): string {
  if (!validatePin(pin)) {
    throw new Error(`Invalid PIN: "${pin}". Must be 4 digits, 1-6.`);
  }

  const seedArray = seed.split(" ");
  let rotated: string[] = [];
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

/** Unrotate the seed with a pin */
export function unrotateSeed(seed: string, pin: string): string {
  if (!validatePin(pin)) {
    throw new Error(`Invalid PIN: "${pin}". Must be 4 digits, 1-6.`);
  }

  const seedArray = seed.split(" ");
  let rotated: string[] = [];
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

/** Validate a 4-digit pin, 1-6 */
export function validatePin(pin: string): boolean {
  return new RegExp("[1-6]{4}").test(pin);
}
