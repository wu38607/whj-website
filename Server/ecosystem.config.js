module.exports = {
  apps: [
    {
      name: 'WhjWebsite',
      script: './bin/www',
      watch: true,
      ignore_watch: ["../store", "../store/books", "../store/images"],
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'production',
        PORT: 80
      }
    }
  ]
};
