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
    this.statusCode = 405
  }
}

export const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
};

