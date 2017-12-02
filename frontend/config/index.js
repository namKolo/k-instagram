const config = {
  server: {
    host: 'localhost',
    port: process.env.PORT || 3000
  },

  env: process.env.NODE_ENV || 'development'
};

module.exports = config;
