import express from 'express';
import cookieParser from 'cookie-parser';

export class ExpressApp {
  app = express();

  constructor() {
    this.setAppSettings();
    this.setAppRouter();
  }

  setAppSettings = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  };

  setAppRouter = () => {
    this.app.use('/ping', (req, res, next) => {
      return res.status(200).json('pong');
    });
  };
}
