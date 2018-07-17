module.exports = {
  apps: [
    {
      name: 'web',
      cwd: './web',
      script: 'npm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
