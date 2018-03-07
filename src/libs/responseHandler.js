export const handlerSuccess = (response, data) => {
  return response
    .set('Content-Type', 'application/json')
    .status(200)
    .send(data);
};

export const handlerBadRequest = (response) => {
  response
    .set('Content-Type', 'application/json')
    .status(400)
    .send('Bad request');
};

export const handlerNotFound = response => {
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

export const handlerInternalServerError = (response) => {
  return response
    .set('Content-Type', 'application/json')
    .status(500)
    .send('Internal Server Error');
};
