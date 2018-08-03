// eslint-disable-next-line security/detect-child-process
const { execSync } = require('child_process')

export default () => {
  try {
    return execSync('git rev-parse --short HEAD', {
      stdio: [process.stdin, process.stdout, null],
    })
      .toString()
      .trim()
  } catch (e) {
    return '0000000'
  }
}
