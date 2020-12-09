import { Request, Response } from 'express';
import { Controller, Post, ClassMiddleware, Get } from '@overnightjs/core';
import { OK } from 'http-status-codes';
import webpush from 'web-push';
import cors from 'cors';

const md5 = require('md5');

@Controller('notification')
@ClassMiddleware([cors()])
export class NotificationController {
  tempDatabase: Array<webpush.PushSubscription> = [];
  hashNoRepeat: Array<string> = [];

  @Post('subscription')
  private async subscribeToNotifications(
    req: Request,
    res: Response
  ): Promise<Response> {
    if(!this.hashNoRepeat.includes(md5(req.body.endpoint))){
        this.hashNoRepeat.push(md5(req.body.endpoint));
        this.tempDatabase.push(req.body);
    }
    return res.status(OK).json(req.body);
  }

  @Post('sendNotification')
  private async sendNotification(
    req: Request,
    res: Response
  ): Promise<Response> {    
    const notificationPayload = {
      notification: {
        title: 'New tractor added',
        body: req.body.fullModel,
        icon: 'assets/icon-512x512.png',
      },
    };

    const promises: Array<any> = [];
    this.tempDatabase.forEach((subscription) => {
      promises.push(
        webpush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload)
        )
      );
    });
    return Promise.all(promises).then(() => res.sendStatus(200));
  }
}
