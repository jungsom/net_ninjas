export class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

export class MethodNotAllowed extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 405;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
};
