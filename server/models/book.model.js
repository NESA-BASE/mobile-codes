const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/sequelize");

class Book extends Model {
  static paginate = async ({ page = 1, pageSize = 10 }) => {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return this.findAndCountAll({ offset, limit });
  };
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Book",
    timestamps: true,
  }
);

module.exports = Book;
