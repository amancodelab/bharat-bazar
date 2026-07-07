const successResponse = (res, statusCode, msg, data = null) => {
  return res.status(statusCode).json({
    status: true,
    msg,
    data,
  })
}

module.exports = successResponse;