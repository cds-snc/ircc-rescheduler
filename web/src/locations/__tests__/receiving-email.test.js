const fs = require('fs')
const path = require('path')

const checkFile = async (fpath) => {
  console.log(fpath)
  /*
  return import(fpath).then(myModule => {
    console.log(myModule.email)
    return myModule.email
  })
  */
 return Promise.resolve('test')
}

const checkFiles = () => {
  const filePath = path.resolve(__dirname, '../')
  const file = 'calgary.js'
  const obj = require(`${filePath}/${file}`)
  //console.log(obj.email)
  expect(obj.email).toEqual('calgaryC@cic.gc.ca')

  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.error('Could not list the directory.', err)
      process.exit(1)
    }

    files.forEach(async function(file, index) {
      if (path.extname(file) === '.js' && file !== 'index.js') {
        await checkFile(`${filePath}/${file}`)
        expect(false).toEqual(true)
      }
    })
  })
}

describe('Location receiving address', () => {
  it('has has receiving address', async () => {
    checkFiles()
    //expect(true).toEqual(false)
  })
})
