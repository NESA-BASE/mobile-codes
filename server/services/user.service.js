const httpStatus = require("http-status");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");

// Create a new user
const createUser = async (userBody) => {
  try {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    return User.create(userBody);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// Get all users
const getUsers = async (options) => {
  try {
    const { filter, page, pageSize, sortBy } = options;
    const users = await User.paginate({
      filter,
      page,
      pageSize,
      sortBy,
    });
    return users;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// Get user by id
const getUserById = async (userId) => {
  try {
    return User.findOne({ where: { id: userId } });
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// Get user by email
const getUserByEmail = async (email) => {
  try {
    return User.findOne({ where: { email } });
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// Update user by id
const updateUserById = async (userId, updateBody) => {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    if (
      updateBody.email &&
      (await User.isEmailTaken(updateBody.email, userId))
    ) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

// Delete user by id
const deleteUserById = async (userId) => {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    await user.destroy({ force: true });
    return user;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
