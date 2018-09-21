// eslint-disable-next-line security/detect-child-process
const { execSync } = require('child_process')
const { readFileSync } = require('fs')

export default () => {
  let gitHashString = '0000000'

  // try first to read from a version file
  try {
    gitHashString = readFileSync('./VERSION')
    gitHashString = gitHashString.toString('utf8').replace(/\s/g, '')
  } catch (e) {
    // do nothing: no file was found
  }

  // if in a git repo, we can get the last commit hash directly (overrides VERSION file)
  try {
    gitHashString = execSync('git rev-parse --short HEAD', {
      stdio: ['pipe', 'pipe', null],
    })
      .toString()
      .trim()
  } catch (e) {
    // do nothing: not in a git repo
  }

  return gitHashString
}
