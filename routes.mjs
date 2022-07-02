import { resolve } from "path";
import db from "./db/models/index.mjs";

import initUsersController from "./controllers/users.mjs";
import initOrdersController from "./controllers/kopiOrders.mjs";

export default function bindRoutes(app) {
  const usersController = initUsersController(db);
  const ordersController = initOrdersController(db);

  // Root route returns the Webpack-generated main.html file
  // app.get('/', (request, response) => {
  //   response.sendFile(resolve('src', 'main.html'));
  // });

  app.get("/", usersController.index);
  app.post("/play", ordersController.getOrdersObject);
  app.post("/submit-kopi", ordersController.handleSubmission);
}
