import { NextFunction, Request, Response } from 'express';
import { RadarPostBody } from '../types/radarPostBody';
import TargetService from '../services/targetService';

export const postRadarQuery = (req: Request, res: Response, next: NextFunction): void => {
  const radarDetails: RadarPostBody = req.body;

  try {
    const targetService = new TargetService(radarDetails);
    const nextTargetCoordinates = targetService.getNextTargetToDestroy();

    res.status(200).send({ x: nextTargetCoordinates.x, y: nextTargetCoordinates.y });
    return;
  } catch (error) {
    next(error);
  }
};
