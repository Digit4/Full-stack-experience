const catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error(error);
      const errorResponse = {
        message: 'Internal Server Error',
      };

      errorResponse.error = error;

      return res.status(500).json(errorResponse);
    }
  };
};

module.exports = catchAsync;
