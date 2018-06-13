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
    }],
    "deploy": {
        "production": {
            "user": "ircc",
            "host": ["13.71.191.141"],
            "ref": "origin/deploy_with_pm2",
            "repo": "https://github.com/cds-snc/ircc-rescheduler.git",
            "path": "/home/ircc/ircc-rescheduler-new",
            "ssh_options": "StrictHostKeyChecking=no",
            "post-setup": "ls -al",
            "post-deploy": "yarn restart",
            "env": {
                "NODE_ENV": "production"
            }
        }
    }
  }
