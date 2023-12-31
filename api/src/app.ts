import express, { Express, Request, Response, NextFunction } from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';

import allRoutes from '@/routes';

const path = require('path');

const middleware = (app: Express) => {

  app.use(cors());

  app.use(bodyParser.json()); // Parse JSON bodies
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

  app.use((req: Request, res: Response, next: NextFunction) => {
    // console.log('do stuff');
    next();
  });
}

const routes = (app: Express) => {
  app.use(allRoutes);
}

const exceptionHandler = () => {

}

const App = () => {
  const app = express();

  // public path
  app.use(express.static(path.join(__dirname, 'public')));

  middleware(app);
  routes(app);
  exceptionHandler();

  const listen = (port: number = 3000) => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`)
    });
  }

  return { app, listen };
};

export default App;