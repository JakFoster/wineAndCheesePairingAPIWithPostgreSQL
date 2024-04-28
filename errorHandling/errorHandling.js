// Custom error class 
export class CustomError extends Error {
  constructor(message, statusCode) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handling utility function
export function errorHandler(error, res) {
  if (error instanceof CustomError) {
    // console.error(error.stack)
    res.status(error.statusCode).json({ success: false, error: error });
    return;
  } else {
    res.status(500).json({ success: false, error: error });
  }
}
