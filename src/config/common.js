const common = {
  local: {
    url: {
      base: 'localhost',
      newlaunch: 'localhost',
    },
    image: {
      baseUrl: 'https://d3p0bla3numw14.cloudfront.net',
      sharpieUrl: 'https://img.rea-asia.com/rumah123',
    },
  },
  staging: {
    url: {
      base: 'https://dev.sg.rumah123.com',
      newlaunch: 'https://newlaunch.dev.rumah123.com',
    },
    image: {
      baseUrl: 'https://d3p0bla3numw14.cloudfront.net',
      sharpieUrl: 'https://img.rea-asia.com/rumah123',
    },
  },
  production: {
    url: {
      base: 'https://www.rumah123.com',
      newlaunch: 'https://newlaunch.rumah123.com',
    },
    image: {
      baseUrl: 'https://d3p0bla3numw14.cloudfront.net',
      sharpieUrl: 'https://img.rea-asia.com/rumah123',
    },
  },
  test: {},
};

export default common;
