import { Request, Response } from 'express';

export const getHealthPing = (req: Request, res: Response): Response<string> => {
  return res.status(200).send('Ok');
};
