const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (error, req, res, next) => {
  const defaultError = {
    status_code: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong, Please try again later..",
  };
  
  //Handling mongoose validation error
  if (error.name === "ValidationError") {
    (defaultError.status_code = StatusCodes.BAD_REQUEST),
      (defaultError.message = Object.values(error.errors)
        .map((item) => item.message)
        .join(","));
  }

  //Handling mongoose unique error
  if (error.code && error.code === 11000) {
    defaultError.status_code = StatusCodes.BAD_REQUEST;
    defaultError.message = `${Object.keys(
      error.keyValue
    )}field has to be unique`;
  }

  if(error.name === "CastError") {
    defaultError.message = `No item found with id : ${error.value}`;
    defaultError.statusCode = 404;
  }

  res.status(defaultError.status_code).json({ msg: defaultError.message});
};

module.exports = errorHandlerMiddleware;
