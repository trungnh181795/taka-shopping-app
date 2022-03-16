const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const response = require("../utils/responseTemp");

/**
 * Create an user
 */
const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.send(response(httpStatus.CREATED, 'Create User Success', { user }));
});

/**
 * Get users
 */
const getUsers = catchAsync(async (req, res) => {
  if (req.query.email) req.query.email = req.query.email.toLowerCase();
  const filter = pick(req.query, ['email', 'username', 'role']);
  const options = pick(req.query, ['sortBy', 'order', 'size', 'page']);
  const users = await userService.queryUsers(filter, options, res);
  res.send(response(httpStatus.OK, 'Query Users Success', users));
});

/**
 * Get an user
 */
const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserByPk(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(response(httpStatus.OK, 'Get User Success', user));
});

/**
 * Get own user
 */
const getMyProfile = catchAsync(async (req, res) => {
  const user = await userService.getUserByPk(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(response(httpStatus.OK, 'Get profile success', user));
});

/**
 * Update an user
 */
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserByPk(req.params.userId, req.body);
  res.send(response(httpStatus.OK, 'Update user success', user));
});

/**
 * Delete an user
 */
const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserByPk(req.params.userId);
  res.send(response(httpStatus.OK, 'Delete user success'));
});

/**
 * Change contact by own user
 */
const changeContact = catchAsync(async (req, res) => {
  const user = await userService.updateUserByPk(req.user.id, req.body);
  res.send(response(httpStatus.OK, 'Change contact success', user));
});

/**
 * Change email by own user
 */
const changeEmail = catchAsync(async (req, res) => {
  const user = await userService.updateUserByPk(req.user.id, req.body);
  res.send(response(httpStatus.OK, 'Change email success', user));
});

/**
 * Change password by own user
 */
const changePassword = catchAsync(async (req, res) => {
  const user = await userService.changePasswordByPk(req.user.id, req.body);
  res.send(response(httpStatus.OK, 'Change password success', user));
});

/**
 * Change username by own user
 */
const changeUsername= catchAsync(async (req, res) => {
  const user = await userService.updateUserByPk(req.user.id, req.body);
  res.send(response(httpStatus.OK, 'Change username success', user));
});

/**
 * Change avatar by own user
 */
const changeAvatar= catchAsync(async (req, res) => {
  const user = await userService.updateUserByPk(req.user.id, req.body);
  res.send(response(httpStatus.OK, 'Change avatar success', user));
});

/**
 * Get own tokens
 */
const getOwnTokens = catchAsync(async (req, res) => {
  const user = await userService.getUserByPk(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const tokens = await userService.getAllTokenByUserId(req.user.id);
  res.send(response(httpStatus.OK, 'Get tokens success', tokens));
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getMyProfile,
  changeContact,
  changeEmail,
  changePassword,
  changeUsername,
  changeAvatar,
  getOwnTokens,
};
