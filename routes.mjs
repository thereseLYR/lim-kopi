import { resolve } from 'path';
import db from "./db/models/index.mjs";

import initUsersController from './controllers/users.mjs';
import initGamesController from './controllers/games.mjs';

export default function bindRoutes(app) {
  const usersController = initUsersController(db)
  const gamesController = initGamesController(db)

  // Root route returns the Webpack-generated main.html file
  // app.get('/', (request, response) => {
  //   response.sendFile(resolve('src', 'main.html'));
  // });

  app.get('/', usersController.index);
  app.get('/something', usersController.someDataFunction)
}
