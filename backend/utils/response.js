class Response {
  constructor(statusCode, message, isSuccess, data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.isSuccess = isSuccess;
    this.data = data;
  }
}

module.exports = Response;