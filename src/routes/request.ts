import express from 'express';
import { isLoggedIn, isNotBanned } from '../utils/auth';
import Request from '../models/request';
import { requestStatus } from '../types/request';
import logger from '../utils/logger';

const router = express.Router();

router.get(
  '/',
  isLoggedIn,
  isNotBanned,
  async (_req: express.Request, res: express.Response) => {
    try {
      const requests = await Request.find({});
      logger.info('[GET /api/requests] Got all requests succesfully!');
      return res.json(requests);
    } catch (e: any) {
      logger.error(`GET /api/requests] ${e.msg}`);
      return res.status(400).json({
        err: 'Could not fetch all requests',
      });
    }
  }
);

router.get(
  '/:id',
  isLoggedIn,
  isNotBanned,
  async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
      const request = await Request.findById(id);
      logger.info(`[GET /api/requests/${id}] Got request succesfully!`);
      return res.json(request);
    } catch (e: any) {
      logger.error(`GET /api/requests/${id}] ${e.msg}`);
      return res.status(400).json({
        err: `Could not fetch the request with id: ${id}`,
      });
    }
  }
);

router.post(
  '/',
  isLoggedIn,
  isNotBanned,
  async (req: express.Request, res: express.Response) => {
    const loggedInUser: any = req.user;
    const id = loggedInUser.id;
    const { service, seller, price, information } = req.body;
    const status = requestStatus.requested;
    try {
      const request = await Request.create({
        service: service,
        seller: seller,
        buyer: id,
        price: price,
        information: information,
        status: status,
      });
      return res.json(request);
    } catch (e: any) {
      return res.status(400).json({
        err: 'Could not create request',
      });
    }
  }
);

router.put(
  '/:request_id',
  isLoggedIn,
  isNotBanned,
  async (req: express.Request, res: express.Response) => {
    const loggedInUser: any = req.user;
    const id = loggedInUser.id;
    const { request_id } = req.params;
    const { status } = req.body;

    try {
      const request = await Request.findById(request_id);
      if (request !== null && request.seller === id) {
        await Request.findOneAndUpdate({ _id: request_id }, { status });
        return res.json({
          msg: 'Request updated',
          data: await Request.findById(request_id),
        });
      } else {
        throw Error();
      }
    } catch (e: any) {
      return res.status(400).json({
        err: 'Request could not be updated',
      });
    }
  }
);

router.delete(
  '/:request_id',
  isLoggedIn,
  isNotBanned,
  async (req: express.Request, res: express.Response) => {
    const loggedInUser: any = req.user;
    const id = loggedInUser.id;
    const { request_id } = req.params;

    try {
      const request = await Request.findById(request_id);
      if (request !== null && (request.buyer === id || request.seller === id)) {
        await Request.findByIdAndDelete(request_id);
        return res.json({
          msg: 'Request deleted',
        });
      } else {
        throw Error();
      }
    } catch (e: any) {
      return res.status(400).json({
        err: 'Request could not be deleted',
      });
    }
  }
);

export default router;
