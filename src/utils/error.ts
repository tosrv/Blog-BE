// Error status and message
export class AppError extends Error {
  status: number;

  constructor(status = 500, message: string) {
    super(message);
    this.status = status;
  }
}

export default AppError;