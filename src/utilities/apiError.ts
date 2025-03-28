class ApiError extends Error {
  data: null;
  isOperational: boolean;
  success: boolean;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.success = false;
    this.data = null;
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;