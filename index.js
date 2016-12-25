const fs = require('fs')
const http = require('http')
const ip = require('ip')
// const Bonjour = require('bonjour')
const fetch = require('node-fetch')
const config = require('./config')

// const bonjour = Bonjour()

// bonjour.find({ type: 'airplay' }, (devices) => {
// })

const HOST = ip.address()
const PORT = 8080


const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'video/mp4')
  // res.writeHead(200)
  fs.createReadStream(config.file).pipe(res)
})

server.listen(PORT)

async function play() {
  try {
    const res = await fetch(`http://${config.ip}:${config.port}/play`, {
      method: 'POST',
      body: `Content-Location: http://${HOST}:${PORT}\nStart-Position: 0`,
    })
    const text = await res.text()
    console.log('play succeed', text)
  } catch (err) {
    console.error(err)
  }
}

play()
