export const handlerSuccess = (response, data) => {
  return response
    .set('Content-Type', 'application/json')
    .status(200)
    .send(data)
    .end();
};

export const handlerBadRequest = response => {
  response
    .set('Content-Type', 'application/json')
    .status(400)
    .send('Bad request')
    .end();
};

export const handlerNotFound = response => {
  response
    .set('Content-Type', 'application/json')
    .status(200)
    .send({
      error: {
        code: '3001',
        message: 'Not Found',
      },
    })
    .end();
};

export const handlerInternalServerError = response => {
  return response
    .set('Content-Type', 'application/json')
    .status(500)
    .send('Internal Server Error')
    .end();
};

export const handlerUnauthorized = response => {
  response
    .set('Content-Type', 'application/json')
    .status(401)
    .send({
      error: {
        code: 401,
        message: 'Unauthorized',
      },
    })
    .end();
};
