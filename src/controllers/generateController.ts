import { Request, Response } from 'express';
import { Controller, Get, ClassMiddleware } from '@overnightjs/core';
import { BAD_REQUEST, OK } from 'http-status-codes';

import cors from 'cors';
import authMiddleware from '../middlewares/authMiddleware';
import fs from 'fs';

@Controller('generate')
@ClassMiddleware([cors()])
@ClassMiddleware(authMiddleware)
export class GenerateController {
  @Get('')
  private async getRandomTractor(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      let randomBetweenTwoIntegers = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      let capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

      let randomTractorFactory = () => {
        let assetsPath = './src/assets/tractor-brands';
        let brands = fs.readdirSync(assetsPath, 'utf-8');
        let randomBrand = randomBetweenTwoIntegers(0, brands.length - 1);
        let manufacturer = brands[randomBrand];
        let tractorsModels = fs.readdirSync(
          `${assetsPath}/${manufacturer}`,
          'utf-8'
        );
        let randomModel = randomBetweenTwoIntegers(
          0,
          tractorsModels.length - 1
        );
        let imagePath = `${assetsPath}/${manufacturer}/${tractorsModels[randomModel]}`;

        let fileName = tractorsModels[randomModel];
        let modelName = fileName
          .replace(/-/g, ' ')
          .replace(/_/g, ' ')
          .replace(/  /g, ' ')
          .split('.')[0];

        manufacturer = capitalize(
          manufacturer.replace(/-/g, ' ').replace(/_/g, ' ')
        ).toUpperCase();
        modelName = capitalize(modelName.toUpperCase()).replace(
          `${manufacturer} `,
          ''
        );

        let bitmap = fs.readFileSync(imagePath);
        let image = new Buffer(bitmap).toString('base64');

        return {
          manufacturer,
          modelName,
          image,
        };
      };

      return res.status(OK).json(randomTractorFactory());
    } catch (err) {
      return res.status(BAD_REQUEST).json({
        error: err.message,
      });
    }
  }
}
