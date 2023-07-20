import chalk from 'chalk';

export const log = (label: string, message: any, color: any = 'black') => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(
    chalk.bgKeyword(color)(chalk.black(` ${label} `)),
    chalk.keyword('black')(message)
  );
};
