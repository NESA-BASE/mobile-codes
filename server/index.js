const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");
const { sequelize } = require("./config/sequelize");

let server;
sequelize
  .authenticate()
  .then(() => {
    logger.info("Connected to MySQL");
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error("Unable to connect to MySQL", err);
  });
sequelize.sync();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexceptedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexceptedErrorHandler);
process.on("unhandledRejection", unexceptedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
