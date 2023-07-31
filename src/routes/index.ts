import { app } from '../../index';
import { adminRouter } from './admin/admin.route';
import { authRouter } from './auth/auth.route';
import { citiesRouter } from './city/city.route';
import { drawRouter } from './draw/draw.route';
import { gameRouter } from './game/game.route';
import { generalRouter } from './general/general.route';
import { profileRouter } from './profile/profile.route';
import { sslRouter } from './ssl/ssl.route';

class Routes {
  constructor() {
    console.log('Routes constructor');
  }

  initRoutes() {
    app.use(`/api/${process.env.API_VERSION}/`, generalRouter);
    app.use(`/api/${process.env.API_VERSION}/cities`, citiesRouter);
    app.use(`/api/${process.env.API_VERSION}/auth`, authRouter);
    app.use(`/api/${process.env.API_VERSION}/profile`, profileRouter);
    app.use(`/api/${process.env.API_VERSION}/games`, gameRouter);
    app.use(`/api/${process.env.API_VERSION}/admin`, adminRouter);
    app.use(`/api/${process.env.API_VERSION}/draws`, drawRouter);
    app.use('/.well-known/acme-challenge', sslRouter);
  }
}

const routes = new Routes();

export { routes };
