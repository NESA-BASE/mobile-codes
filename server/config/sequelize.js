const { Sequelize } = require("sequelize");
const { mysql } = require("./config");

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  port: mysql.port,
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
});

module.exports = {
  sequelize,
};
