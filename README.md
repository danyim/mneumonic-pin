# menumonic-pin

Add an additional layer of complexity to your crypto wallet's mneumonic seed ([BIP39](https://raw.githubusercontent.com/bitcoin/bips/master/bip-0039/english.txt)) by using a PIN-like number<sup>[1](#1)</sup> to obscure

## Usage

```bash
# To produce a new seed:
$ npx github:danyim/menumonic-pin --seed="$YOUR_SEED" --pin=$YOUR_PIN

# To return the original seed
$ npx github:danyim/menumonic-pin --seed="$YOUR_SEED" --pin=$YOUR_PIN --unrotate
```

## Warnings

This is just a proof-of-concept. Please understand the simple algorithm before relying on this as your OpSec.

The obfuscation performed by this algorithm can easily be brute forced if the attacker has your seed string.

### PIN-like Number

The PIN should be four digits from 1-6, e.g. `1246`, `1111`, or `6666`. **Not** `0123` or `6789`

## Links

Based on https://goodopsec.org/protection/seed-phrase/
