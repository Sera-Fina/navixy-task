export default class Response {
  constructor({
    data,
    message,
    code,
  }) {
    this.data = data;
    this.messege = message;
    this.code = code;
  }
}
