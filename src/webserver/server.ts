import * as http from 'http';

import app from './app';


export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

const normalizePort = (val: string) => {
  var rawPort = parseInt(val, 10);

  if (isNaN(rawPort)) {
    // named pipe
    return val;
  }

  if (rawPort >= 0) {
    // port number
    return rawPort;
  }

  return false;
};

const onError = (error: ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const port = normalizePort(process.env.PORT || "4444");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.listen(port);
