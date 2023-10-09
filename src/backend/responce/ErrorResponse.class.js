import Response from './Response.class';

export default class ErrorResponse extends Response {
  constructor(data, message, code) {
    super({
      data,
      message: message || 'Not Found',
      code: code || 400,
    });
  }
}
