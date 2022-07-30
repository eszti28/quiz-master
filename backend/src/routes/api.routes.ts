import cors from 'cors';
import express from 'express';

const apiRouter = express.Router();

apiRouter.use(cors());
apiRouter.use(express.json());
