export class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

export class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

export class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

export class MethodNotAllowed extends Error {
  constructor(message) {
    super(message);
    this.status = 405;
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ status, message });
};
