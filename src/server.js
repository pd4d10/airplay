const fs = require('fs')
const express = require('express')
const mime = require('mime')
const ffmpeg = require('fluent-ffmpeg')

function server({ filePath, fileSize, port = 8080 }) {
  const app = express()
  app.get('/', (req, res) => {
    res.contentType('flv')

    ffmpeg(filePath)
      // .preset('flashvideo')
    //       .format('m4v')
    .videoBitrate('512k')
    .videoCodec('libx264')
      // .format('mp4')
      // .videoCodec('libx264')
      // .audioCodec('libmp3lame')
      .on('error', (err) => {
        console.log(`An error occurred: ${err.message}`)
      })
      .on('end', () => {
        console.log('Processing finished !')
      })
      .pipe(res, { end: true })
  })
  app.listen(port)
  // return http.createServer((req, res) =>
    // const contentType = mime.lookup(filePath)
    // const contentType = 'video/mp4'

    // const range = req.headers.range || '0-'
    // console.log('Request range ', range)

    // let [start, end] = range.replace(/bytes=/, '').split('-')
    // start = parseInt(start, 10)
    // end = Math.min(fileSize - 1, end ? parseInt(end, 10) : fileSize - 1)
    // const chunksize = (end - start) + 1
    // if (start > end || isNaN(start) || isNaN(end)) {
    //   return res.end(416)
    // }

    // res.writeHead(206, {
    //   'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    //   'Accept-Ranges': 'bytes',
    //   'Content-Length': chunksize,
    //   'Content-Type': contentType,
    // })

    // return ffmpeg(fs.createReadStream(filePath, { start, end }))

    // return fs.createReadStream(filePath, { start, end }).pipe(res)
  // )
  // .listen(port)
}

module.exports = server
