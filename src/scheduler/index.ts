import Schedule, { Job } from 'node-schedule';
import { log, randomNumberGenerator } from '../utils';
import gameModel, { IGameSchema } from '../models/game/game.model';
import drawModel from '../models/draw/draw.model';
import telegramServiceInstance from '../services/telegram';
import cronParser from 'cron-parser';
import { Timezone } from 'node-schedule';
import { da } from 'date-fns/locale';

class DrawScheduler {
  private schedule!: typeof Schedule;
  private jobs!: Job[];

  /**
   * @description Start automatic draw scheduler
   * Get all games from database and create a job for each game with cron expression
   * @returns void
   * @memberof DrawScheduler
   */
  start() {
    log('SCHEDULER', 'Automatic draw scheduler started', 'orange');

    gameModel.find({}).then((games) => {
      this.jobs = games.map((game: IGameSchema) => {
        return Schedule.scheduleJob(game.cronExpression, (drawDate) => {
          this.draw(game);
        });
      });
    });
  }

  /**
   * @description draw for given game
   * it will be called by scheduler when cron job is triggered
   * this function will generate random numbers and save them to database
   * set next draw date for given game for next cron job
   * @param {IGameSchema} game
   * @memberof DrawScheduler
   * @returns void
   */

  private draw(game: IGameSchema) {
    log('SCHEDULER', `Draw for ${game.name} game will be held`, 'orange');
    telegramServiceInstance.sendMessage(`Draw for ${game.name}`);

    //get next draw date
    const nextDrawDate = cronParser.parseExpression(game.cronExpression).next();

    const dateNow = new Date();
    
    //update next draw date
    gameModel
      .findOneAndUpdate(
        {
          _id: game._id,
        },
        {
          nextDrawDate: nextDrawDate.toDate(),
          lastDrawDate: dateNow,
        }
      )
      .exec();

    const draw = new drawModel({
      game: game._id,
      numbers: randomNumberGenerator(
        game.mininumNumber,
        game.maximumNumber,
        game.requriedNumbers
      ),
      extraNumbers: randomNumberGenerator(
        game.mininumNumber,
        game.maximumNumber,
        game.extraNumbers
      ),
    });
    draw.save().then((draw) => {
      log('SCHEDULER', `Draw for ${game.name} game held`, 'orange');
    });
  }

  getSchedule() {
    return this.schedule;
  }

  getJobs() {
    return this.jobs;
  }
}

const drawSchedulerInstance = new DrawScheduler();

export { drawSchedulerInstance as drawScheduler };
