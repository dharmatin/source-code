function successResponse(res, data) {
  res
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json(data);
}

function badRequestResponse() {
  res
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json(data);
}

function notFoundResponse(res, data) {
  res
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json(data);
}

function internalServerErrorResponse(res, msg) {
  res
    .setHeader('Content-Type', 'application/json')
    .status(500)
    .json(msg);
}

module.exports = successResponse;
