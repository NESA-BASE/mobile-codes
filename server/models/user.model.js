const { DataTypes, Model, Op } = require("sequelize");
const { sequelize } = require("../config/sequelize");
const bcrypt = require("bcryptjs");
const { roles } = require("../config/roles");

class User extends Model {
  static async isEmailTaken(email, excludeUserId) {
    const user = await this.findOne({
      where: { email, id: { [Op.ne]: excludeUserId } },
    });
    return !!user;
  }

  static async paginate({
    filter = {},
    page = 1,
    pageSize = 10,
    sortBy = "createdAt:desc",
  }) {
    const order = sortBy.split(",").map((sortOption) => {
      const [key, order] = sortOption.split(":");
      return [key, order.toUpperCase()];
    });

    const { count, rows } = await this.findAndCountAll({
      where: filter,
      order,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    return {
      totalItems: count,
      items: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
  }

  async isPasswordMatch(password) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notContains: "password",
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: roles,
      defaultValue: "user",
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 8);
        }
      },
    },
  }
);

module.exports = User;
