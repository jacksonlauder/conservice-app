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
  // process.env.TOKEN_SECRET = '10596874-jaxium-social-network-development-secret'
  app.use(morgan("dev"));
  app.use(cors());
}

function setProdEnv(app) {
  console.log("Setting prod env");
  process.env.DB_URL = "mongodb://localhost:27017/prod-db";
  // process.env.DB_URL = 'mongodb+srv://jacksonlauder:10596874@jaxium-db.4yzkv.mongodb.net/jaxium-db?retryWrites=true&w=majority'
  // process.env.TOKEN_SECRET = '10596874-jaxium-social-network-production-secret'
  app.use(express.static(__dirname + "/../../dist"));
}
