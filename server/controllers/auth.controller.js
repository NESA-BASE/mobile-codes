const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const authService = require("../services/auth.service");
const emailService = require("../services/email.service");
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const Sequelize = require("sequelize");

const register = catchAsync(async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      res.status(httpStatus.BAD_REQUEST).send({
        message: "Email already exists",
        fields: error.fields,
      });
    } else {
      throw error;
    }
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await authService.loginWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendPasswordResetEmail(req.body.email, resetPasswordToken);
  res
    .status(httpStatus.NO_CONTENT)
    .send({ message: "Password reset email sent" });
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res
    .status(httpStatus.NO_CONTENT)
    .send({ message: "Password reset successful" });
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user.email
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res
    .status(httpStatus.NO_CONTENT)
    .send({ message: "Verification email sent" });
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send({ message: "Email verified" });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
