const fs = require('fs')
const Promise = require('bluebird')
const ip = require('ip')
// const Bonjour = require('bonjour')
const config = require('./config')
const server = require('./server')
const request = require('./request')

// const bonjour = Bonjour()

// bonjour.find({ type: 'airplay' }, (devices) => {
// })

const HOST = ip.address()
const PORT = 8080

async function index(filePath) {
  try {
    const stat = await Promise.promisify(fs.stat)(config.file)
    if (!stat) {
      console.log('File not exists')
      return
    }

    server({
      filePath,
      fileSize: stat.size,
    })

    request.play({
      ip: config.ip,
      port: config.port,
      location: `http://${HOST}:${PORT}`,
      position: 0,
    })
  } catch (err) {
    console.log(err)
  }
}

index(config.file)
