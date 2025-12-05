import { open } from 'node:fs/promises';

const START_POSITION = 50;
const LENGTH = 100;

function parseLine(line) {
  const rotationParts = line.split('');
  const direction = rotationParts.shift();
  const movements = parseInt(rotationParts.join(''));

  return [direction, movements];
}

function executeMovements(currentPosition, direction, movements) {
  let matches = 0;
  const step = direction === 'R' ? 1 : -1;
  const MOD = LENGTH;
  let position = (currentPosition + step * movements) % MOD;
  let target;

  if (position < 0) position += MOD;

  if (step === 1) {
    target = (-currentPosition % MOD + MOD) % MOD;
  } else {
    target = (currentPosition % MOD + MOD) % MOD;
  }

  if (target === 0) {
    matches = Math.floor(movements / MOD);
  } else {
    if (target <= movements) {
      matches = Math.floor((movements - target) / MOD) + 1;
    } else {
      matches = 0;
    }
  }

  return [position, matches];
}

async function main() {
  const fileHandler = await open('./input.txt');
  let position = START_POSITION;
  let matches = 0;

  for await (const line of fileHandler.readLines()) {
    const [direction, movements] = parseLine(line);

    const [newPosition, newMatches] = executeMovements(position, direction, movements);
    position = newPosition;
    matches += newMatches;
  }

  await fileHandler.close();

  console.log(matches);
}

main();
