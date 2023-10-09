import Response from './Response.class';

export default class SuccessResponse extends Response {
  constructor(data) {
    super({
      data,
      message: 'Success',
      code: 200,
    });
  }
}
