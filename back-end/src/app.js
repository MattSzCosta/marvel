import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
// import { errorHandler } from './helpers/error';
import routes from './routes/routes';
import { error, liveness, readines } from "./middlewares";

dotenv.config();

const app = express();

console.log(`Allow ${process.env.FRONT_END_ALLOW}`);

app.use(cors({ credentials: true, origin: process.env.FRONT_END_ALLOW }))
    .use(bodyParser.json())
    .use("/readiness", readines)
    .use("/liveness", liveness)
    .use(routes)
    .use(bodyParser.urlencoded({ extended: true }))
    .use(error);

export default app;
