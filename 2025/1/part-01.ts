import { open } from 'node:fs/promises';

const START_POSITION = 50;
const LENGTH = 100;
enum DIRECTION {
  R = 'R',
  L = 'L',
}
type DirectionType = DIRECTION.R | DIRECTION.L;

function parseLine(line: string) {
  const rotationParts = line.split('');
  const direction = rotationParts.shift() as DirectionType;
  const movements = parseInt(rotationParts.join(''));

  return [direction, movements] as const;
}

function executeMovements(currentPosition: number, direction: DirectionType, movements: number) {
  let position;
  if (direction === DIRECTION.R) {
    position = currentPosition + movements;
  } else {
    position = currentPosition - movements;
  }

  position = ((position % LENGTH) + LENGTH) % LENGTH;

  return position;
}

async function main() {
  const fileHandler = await open('./input-part-01.txt');
  let position = START_POSITION;
  let matches = 0;

  for await (const line of fileHandler.readLines()) {
    const [direction, movements] = parseLine(line);

    position = executeMovements(position, direction, movements)

    if (position === 0 || position === LENGTH) {
      matches++;
    }
  }

  await fileHandler.close();

  console.log(matches);
}

main();
