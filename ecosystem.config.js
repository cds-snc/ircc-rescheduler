module.exports = {
    apps : [{
      name        : "api",
      cwd         : "./api",
      script      : "index.js",
      watch       : true,
      env: {
        "NODE_ENV": "development"
      }
    },{
      name       : "web",
      cwd        : "./web/build",
      script     : "server.js",
      instances  : "max",
      exec_mode  : "cluster",
      watch      : true,
      env: {
        "NODE_ENV": "development"
      }
    }]
  }
