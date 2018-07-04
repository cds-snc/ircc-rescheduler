module.exports = {
    apps : [{
      name        : "api",
      cwd         : "./api",
      script      : "index.js",
      watch       : true,
      env: {
        "NODE_ENV": "development"
      },
      env_production: {
        "NODE_ENV": "production"
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
      },
      env_production: {
        "NODE_ENV": "production"
      }
    }],
    deploy: {
      production: {
        // SSH key path, default to $HOME/.ssh
        key: "~/Downloads/ircc-vm.pem",
        // SSH user
        user: "ubuntu",
        // SSH host
        host: ["ec2-35-183-87-90.ca-central-1.compute.amazonaws.com"],
        // SSH options with no command-line flag, see 'man ssh'
        // can be either a single string or an array of strings
        ssh_options: "StrictHostKeyChecking=no",
        // GIT remote/branch
        ref: "origin/new_local_dev",
        // GIT remote
        repo: "https://github.com/cds-snc/ircc-rescheduler.git",
        // path in the server
        path: "/home/ubuntu/ircc-rescheduler",
        // Pre-setup command or path to a script on your local machine
        // pre-setup: "apt-get install git ; ls -la",
        // Post-setup commands or path to a script on the host machine
        // eg: placing configurations in the shared dir etc
        "post-setup": "ls -la",
        // pre-deploy action
        "pre-deploy-local": "echo 'This is a local executed command'",
        // post-deploy action
        "post-deploy": "yarn build_web && yarn build_api",
      },
    }
  }
