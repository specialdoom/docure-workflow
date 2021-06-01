import { Application } from "express";
import { isAuthenticated } from "../auth/authenticated";
import { add } from "./controller";

export function worfklowRoutesConfig(app: Application) {
  // add new article
  app.post('/workflow', [
    isAuthenticated,
    add
  ]);
}