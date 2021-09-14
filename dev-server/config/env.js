import express from "express";
import morgan from "morgan";
import cors from "cors";

export function setEnvironment(app) {
  if (process.env.NODE_ENV !== "production") {
    setDevEnv(app);
  } else {
    setProdEnv(app);
  }
}

function setDevEnv(app) {
  console.log("Setting dev env");
  process.env.NODE_ENV = "development";
  process.env.DB_URL = "mongodb://localhost:27017/app-db";
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors());
}

function setProdEnv(app) {
  console.log("Setting prod env");
  process.env.DB_URL = "mongodb://localhost:27017/prod-db";
  process.env.DB_URL = 'mongodb+srv://jacksonlauder:Bh39V8hHza0APaN5@conservice-app-db.otmd2.mongodb.net/conservice-app-db?retryWrites=true&w=majority'
  app.use(express.json());
  app.use(express.static(__dirname + "/../../dist"));
}
