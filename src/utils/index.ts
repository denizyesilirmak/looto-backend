import chalk from 'chalk';

export const log = (label: string, message: any) => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(
    chalk.bgBlack(chalk.redBright(chalk.bold(' ' + label + ' '))),
    chalk.bgMagentaBright(chalk.black(message))
  );
};
