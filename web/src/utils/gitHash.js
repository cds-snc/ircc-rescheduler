// eslint-disable-next-line security/detect-child-process
const { execSync } = require('child_process')
const { readFileSync } = require('fs')

export default () => {
  let gitHashString = '0000000'

  try {
    gitHashString = execSync('git rev-parse --short HEAD', {
      stdio: ['pipe', 'pipe', null],
    })
      .toString()
      .trim()
  } catch (e) {}

  try {
    gitHashString = readFileSync('./VERSION')
    gitHashString = gitHashString.toString('utf8').replace(/\s/g, '') + '-1'
  } catch (e) {}

  try {
    gitHashString = readFileSync('../VERSION')
    gitHashString = gitHashString.toString('utf8').replace(/\s/g, '') + '-2'
  } catch (e) {}

  try {
    gitHashString = readFileSync('../../VERSION')
    gitHashString = gitHashString.toString('utf8').replace(/\s/g, '') + '-3'
  } catch (e) {}

  try {
    gitHashString = readFileSync('../../../VERSION')
    gitHashString = gitHashString.toString('utf8').replace(/\s/g, '') + '-4'
  } catch (e) {}

  try {
    gitHashString = readFileSync('../../../../VERSION')
    gitHashString = gitHashString.toString('utf8').replace(/\s/g, '') + '-5'
  } catch (e) {}

  try {
    gitHashString = readFileSync('../../../../../VERSION')
    gitHashString = gitHashString.toString('utf8').replace(/\s/g, '') + '-6'
  } catch (e) {}

  console.log('gitHashString:', gitHashString)
  return gitHashString
}
