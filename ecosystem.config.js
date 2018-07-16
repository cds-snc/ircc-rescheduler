module.exports = {
    apps : [{
      name        : "api",
      cwd         : "./api",
      script      : "npm",
      args        : "start",
      watch       : true,
      env: {
        "NODE_ENV": "development"
      },
      env_production: {
        "NODE_ENV": "production"
      }
    },{
      name       : "web",
      cwd        : "./web",
      script     : "npm",
      args       : "start",
      instances  : "max",
      exec_mode  : "cluster",
      watch      : true,
      env: {
        "NODE_ENV": "development"
      },
      env_production: {
        "NODE_ENV": "production"
      }
    }]
  }
