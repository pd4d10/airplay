const fs = require('fs')
const http = require('http')
const mime = require('mime')

function server({ filePath, fileSize, port = 8080 }) {
  return http.createServer((req, res) => {
    const contentType = mime.lookup(filePath)

    const range = req.headers.range || '0-'
    console.log('Request range ', range)

    let [start, end] = range.replace(/bytes=/, '').split('-')
    start = parseInt(start, 10)
    end = Math.min(fileSize - 1, end ? parseInt(end, 10) : fileSize - 1)
    const chunksize = (end - start) + 1
    if (start > end || isNaN(start) || isNaN(end)) {
      return res.end(416)
    }

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
    })

    return fs.createReadStream(filePath, { start, end }).pipe(res)
  })
  .listen(port)
}

module.exports = server
