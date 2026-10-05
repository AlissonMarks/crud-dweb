import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import * as clientController from '../controllers/client.controller';

const router = Router();

function asyncHandler(handler: (req: Request, res: Response) => Promise<void>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res).catch(next);
  };
}

router.get('/clients', asyncHandler(clientController.index));
router.get('/clients/:id', asyncHandler(clientController.show));
router.post('/clients', asyncHandler(clientController.store));
router.put('/clients/:id', asyncHandler(clientController.update));
router.patch('/clients/:id', asyncHandler(clientController.patch));
router.delete('/clients/:id', asyncHandler(clientController.destroy));

export default router;

