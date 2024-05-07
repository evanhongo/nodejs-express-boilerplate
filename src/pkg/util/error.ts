export abstract class CustomError extends Error {
  code: number;

  constructor(msg: string) {
    super(msg);
  }
}

export class ErrorNotFound extends CustomError {
  constructor(msg: string) {
    super(msg);
    this.code = 404;
  }
}
