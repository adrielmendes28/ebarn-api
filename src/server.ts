import Mongoose from 'mongoose';
import express from 'express';
import webpush from 'web-push';
import { Server } from '@overnightjs/core';
import { TractorController } from './controllers/tractorController';
import { AuthController } from './controllers/authController';
import { GenerateController } from './controllers/generateController';
import { NotificationController } from './controllers/notificationController';

export default class ChallengeServer extends Server {
  constructor() {
    super(true);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.setupControllers();
    this.setupDatabase();
    this.setupWebPush();
  }

  private setupControllers(): void {
    const tractorController = new TractorController();
    const authController = new AuthController();
    const generateController = new GenerateController();
    const notificationController = new NotificationController();

    super.addControllers([
      tractorController,
      authController,
      generateController,
      notificationController,
    ]);
  }

  private setupDatabase(): void {
    const connString =
      'mongodb+srv://eadmin:eadmin@cluster0.xlcjd.mongodb.net/Cluster0?retryWrites=true&w=majority';

    Mongoose.connect(connString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  private setupWebPush(): void {
    const PUBLIC_VAPID =
      'BGkEYi4jP0NmTaT4qy_ChaTx4ChtUyjHZnj7L3hqdOm0tMuixOA1yl9bboXDEKDZC-RrDFWFSiWCbR9_yJ7H-uU';
    const PRIVATE_VAPID = 'WMVHr2z3zz56fDIj99J-qiDqljF5MZqH0sqy2rqlH7w';

    webpush.setVapidDetails(
      'mailto:tractor@ebarn.com',
      PUBLIC_VAPID,
      PRIVATE_VAPID
    );
  }

  public start(port: number): void {
    this.app.listen(port);
  }
}
('');
