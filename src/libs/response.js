export const successResponse = (response, data) => {
  response
    .set('Content-Type', 'application/json')
    .status(200)
    .json(data);
};

export const badRequestResponse = (response) => {
  response
    .set('Content-Type', 'application/json')
    .status(400)
    .send('Bad request');
};

export const notFoundResponse = response => {
  response
    .set('Content-Type', 'application/json')
    .status(200)
    .json({
      error: {
        code: '3001',
        message: 'Not Found'
      }
    });
};

export const internalServerErrorResponse = (response, msg) => {
  response
    .set('Content-Type', 'application/json')
    .status(500)
    .json(msg);
};

export const unAuthorizedResponse = (response) => {
  response
    .set('Content-Type', 'application/json')
    .status(401)
    .json({
      error: {
        code: 401,
        message: 'Unauthorized'
      }
    });
};
