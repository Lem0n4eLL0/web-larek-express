/* eslint max-classes-per-file: "off" */
export interface ErrorResponse {
  message: String
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
  ) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(404, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad request error') {
    super(400, message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflict error') {
    super(409, message);
  }
}
