import chalk from 'chalk';

/**
 * @description Log message with label and color
 * returns if process.env.NODE_ENV is production
 * we don't want to log anything in production
 * @param {string} label
 * @param {any} message
 * @param {any} color
 * @memberof DrawScheduler
 */
export const log = (label: string, message: any, color: any = 'black') => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(
    chalk.bgKeyword(color)(chalk.black(` ${label} `)),
    chalk.keyword('black')(message)
  );
};

/*
 * @description Generate random numbers
 * @param {number} min
 * @param {number} max
 * @param {number} count
 * @returns {number[]}
 * @memberof DrawScheduler
 * @returns number[]
 * @example randomNumberGenerator(1, 49, 6) => [1, 2, 3, 4, 5, 6]
 */
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
