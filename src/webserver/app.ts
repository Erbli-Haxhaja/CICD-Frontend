import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';

const app = express();
app.disable("x-powered-by");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use("/", express.static(path.join(__dirname, "..", "webapp")));

app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, PATCH");
  res.setHeader("Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  // res.setHeader("Content-Security-Policy", "img-src 'self'");
  next();
});

app.use((_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "webapp", "index.html"));
});

export default app;