class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class MethodNotAllowed extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 405;
  }
}

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message
  });
};

export default { BadRequest, NotFound, MethodNotAllowed, errorMiddleware };
