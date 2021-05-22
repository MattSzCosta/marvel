import { sequelize } from "../models";
import {
  HealthChecker,
  LivenessCheck,
  ReadinessCheck,
  State,
} from "@cloudnative/health/src/healthcheck/HealthChecker";

const checker = new HealthChecker();

checker.registerReadinessCheck(
  new ReadinessCheck("mariadb", () => {
    return sequelize.authenticate();
  })
);

checker.registerLivenessCheck(new LivenessCheck("health", () => Promise.resolve()));

const liveness = (req, res, next) =>
  checker
    .getLivenessStatus()
    .then((status) => process(status, res))
    .catch((err) => next(err));

const readines = (req, res, next) =>
  checker
    .getReadinessStatus()
    .then((status) => process(status, res))
    .catch((err) => next(err));

const process = (status, res) => {
  res.statusCode = 200;
  switch (status.status) {
    case State.UP:
      res.statusCode = 200;
      break;
    case State.DOWN:
      res.statusCode = 503;
      break;
  }
  res.send(status);
};

export { readines, liveness };
