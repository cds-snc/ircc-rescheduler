{
  "name": "ircc-rescheduler",
  "description": "",
  "scripts": {},
  "env": {
    "PORT": { "required": true },
    "PROJECT_PATH": { "required": true },
    "RAZZLE_AWS_ACCESS_KEY_ID": { "required": true },
    "RAZZLE_AWS_REGION": { "required": true },
    "RAZZLE_AWS_SECRET_ACCESS_KEY": { "required": true },
    "RAZZLE_IRCC_RECEIVING_ADDRESS": { "required": true },
    "RAZZLE_PAPER_FILE_NUMBER_PATTERN": { "required": true },
    "RAZZLE_SENDING_ADDRESS": { "required": true },
    "RAZZLE_SITE_URL": { "required": true }
  },
  "formation": {},
  "addons": [],
  "buildpacks": [
    {
      "url": "https://github.com/timanovsky/subdir-heroku-buildpack"
    },
    {
      "url": "heroku/nodejs"
    }
  ]
}
