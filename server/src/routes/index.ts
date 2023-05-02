import { Router } from 'express';
import * as controllers from '../controllers/index';

export const index = Router();

index.get('/hello', controllers.hello);
