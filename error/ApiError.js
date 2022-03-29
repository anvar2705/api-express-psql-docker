class ApiError extends Error {
  error

  constructor(status, code, message) {
    super()
    this.status = status
    this.error = {
      code: code,
      message: message,
    }
  }

  static clientError(code, message) {
    return new ApiError(400, code, message)
  }
  static serverError(code, message) {
    return new ApiError(500, code, message)
  }
}

module.exports = ApiError
