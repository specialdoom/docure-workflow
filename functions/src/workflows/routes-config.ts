import { Application } from "express";
import { isAuthenticated } from "../auth/authenticated";
import { add, all, get } from "./controller";

export function worfklowRoutesConfig(app: Application) {
  // add new article
  app.post('/workflow', [
    isAuthenticated,
    add
  ]);
  app.get('/workflows', [
    isAuthenticated,
    all
  ]);
  app.get('/workflow/:id', [
    isAuthenticated,
    get
  ]);
}