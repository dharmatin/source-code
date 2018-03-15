export const handleSuccess = (response, data) => {
  return response
    .set('Content-Type', 'application/json')
    .status(200)
    .send(data)
    .end();
};

export const handleBadRequest = response => {
  response
    .set('Content-Type', 'application/json')
    .status(400)
    .send('Bad request')
    .end();
};

export const handleNotFound = response => {
  response
    .set('Content-Type', 'application/json')
    .status(404)
    .send({
      error: {
        code: '3001',
        message: 'Not Found',
      },
    })
    .end();
};

export const handleInternalServerError = response => {
  return response
    .set('Content-Type', 'application/json')
    .status(500)
    .send('Internal Server Error')
    .end();
};

export const handleUnauthorized = response => {
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

export const handleResponseMessage = (response, message) => {
  response
    .set('Content-Type', 'application/json')
    .status(200)
    .send({
      message: message,
    })
    .end();
};

export const handleForbidden = response => {
  response
    .set('Content-Type', 'application/json')
    .status(403)
    .send({
        message: 'Forbidden'
    })
    .end();
};