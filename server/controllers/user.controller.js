const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const userService = require("../services/user.service");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const { sortBy, limit, page } = req.query;
  const options = {
    filter,
    page: parseInt(page) || 1,
    pageSize: parseInt(limit) || 10,
    sortBy: sortBy || "createdAt:desc",
  };

  try {
    const result = await userService.getUsers(options);
    res.send(result);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res
    .status(httpStatus.NO_CONTENT)
    .send({ message: "User deleted successfully" });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
