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

export const notFoundResponse = response => {
  response
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json({
      error: {
        code: '3001',
        message: 'Not Found'
      }
    });
};

function internalServerErrorResponse(res, msg) {
  res
    .setHeader('Content-Type', 'application/json')
    .status(500)
    .json(msg);
}

module.exports = successResponse;
