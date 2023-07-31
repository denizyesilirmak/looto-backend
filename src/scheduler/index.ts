import Schedule, { Job } from 'node-schedule';
import { log, randomNumberGenerator } from '../utils';
import gameModel, { IGameSchema } from '../models/game/game.model';
import drawModel from '../models/draw/draw.model';

class DrawScheduler {
  private schedule!: typeof Schedule;
  private jobs!: Job[];

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

  private draw(game: IGameSchema) {
    log('SCHEDULER', `Draw for ${game.name} game will be held`, 'orange');
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
