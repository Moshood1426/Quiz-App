const { UnauthenticatedError } = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthenticatedError("User is not allowed to access this route");
};

module.exports = checkPermissions;
