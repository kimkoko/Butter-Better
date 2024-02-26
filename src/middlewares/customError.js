class customError extends Error {
  constructor(status, message) {
    super(message);
    super.status = status;
  }
}

exports.module = customError;
