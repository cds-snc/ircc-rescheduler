module.exports = {
    apps : [{
      name        : "api",
      cwd         : "./api",
      script      : "index.js",
      watch       : true,
      env: {
        "NODE_ENV": "production"
      }
    },{
      name       : "web",
      cwd        : "./web/build",
      script     : "server.js",
      instances  : "max",
      exec_mode  : "cluster"
    }]
  }
