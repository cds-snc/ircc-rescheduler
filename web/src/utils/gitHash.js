const { execSync } = require('child_process')

export default () => {
  try {
    return execSync('git rev-parse --short HEAD', {
      stdio: ['pipe', 'pipe', null],
    })
      .toString()
      .trim()
  } catch (e) {
    return '0000000'
  }
}
