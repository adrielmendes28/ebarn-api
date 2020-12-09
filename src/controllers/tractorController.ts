import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  ClassMiddleware,
} from '@overnightjs/core';
import { BAD_REQUEST, OK } from 'http-status-codes';
import { TractorDao } from '../daos/tractorDao';

import authMiddleware from '../middlewares/authMiddleware';
import cors from 'cors';

@Controller('tractor')
@ClassMiddleware([cors()])
@ClassMiddleware(authMiddleware)
export class TractorController {
  private tractorDao = new TractorDao();

  @Get('list')
  private async getAllTractorList(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const query = await this.tractorDao.readAll();
      return res.status(OK).json(query);
    } catch (err) {
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }

  @Post('add')
  private async createNewTractor(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { manufacturer, modelName, image } = req.body;
      const query = await this.tractorDao.create({
        manufacturer,
        modelName,
        image
      });
      return res.status(OK).json(query);
    } catch (err) {
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }

  @Put('update')
  private async updateTractorByID(req: Request, res: Response): Promise<any> {
    try {
      const { id, update } = req.body;
      await this.tractorDao.updateByID(id, update);
      update._id = id;
      return res.status(OK).json(update);
    } catch (err) {
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }

  @Delete('delete/:id')
  private async deleteTractorByID(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const query = await this.tractorDao.deleteByID(id);
      return res.status(OK).json(query);
    } catch (err) {
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }
}
