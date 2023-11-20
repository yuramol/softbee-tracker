module.exports = {
  apps: [
    {
      name: 'dev.strapi.track.sofrtbee.io',
      script: 'npm',
      args: 'start',
      cwd: './backend',
      env: {
        NODE_ENV: 'development',
        PORT: 1338,
      },
    },
    {
      name: 'front',
      script: 'serve',
      cwd: './frontend',
      env: {
        NODE_ENV: 'development',
        PORT: 8081, 
        PM2_SERVE_PATH: './build',
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_PORT: 8085
      },
    },
    {
      name: 'strapi.track.sofrtbee.io',
      script: 'npm',
      args: 'start',
      cwd: './backend',
      env: {
        NODE_ENV: 'production',
        PORT: 1337,
      },
    },
    {
      name: 'track.sofrtbee.io',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 8109,
      },
    },
  ],
};
