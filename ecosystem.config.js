module.exports = {
  apps: [
    {
      name: 'hapi-site',
      script: 'server.js',
      kill_timeout: 1600,
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: '139.196.102.39',
      ref: 'origin/master',
      repo: 'git@github.com:nanzm/hapi-site.git',
      path: '/var/www/production',
      // pre-deploy action
      'post-setup': 'ls -la',
      'pre-deploy-local': 'echo \'This is a local executed command\'',
      'post-deploy': 'git pull && npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
