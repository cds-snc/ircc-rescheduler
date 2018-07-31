import childProcess from 'child_process'

export default () =>
  childProcess
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim()
