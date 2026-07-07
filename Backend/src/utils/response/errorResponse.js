const errorResponse = (res, statusCode = 500, msg = "Internal Server Issue", data = null) => {
  return res.status(statusCode).json({
    status: false,
    msg,
    data
  })
}

module.exports = errorResponse;