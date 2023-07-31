import chalk from 'chalk';

export const log = (label: string, message: any, color: any = 'black') => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(
    chalk.bgKeyword(color)(chalk.black(` ${label} `)),
    chalk.keyword('black')(message)
  );
};

export const randomNumberGenerator = (
  min: number,
  max: number,
  count: number
) => {
  const numbers: number[] = [];
  while (numbers.length < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
};
