import "reflect-metadata";
import express from "express";
import "./database";
import { routes } from "./routes";
import cors from 'cors';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(routes);

const PORT = process.env.PORT || 3000;

createConnection().then(async () => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch(error => console.log(error));
