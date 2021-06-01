import * as functions from "firebase-functions";
import express from 'express';
import cors from 'cors'
import { worfklowRoutesConfig } from './workflows/routes-config';

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
worfklowRoutesConfig(app);

export const docureWorkflows = functions.https.onRequest(app);