let express = require('express'),
  ffmpeg = require('fluent-ffmpeg')

const app = express()

// app.use(express.static(`${__dirname }/flowplayer`))

// app.get('/', (req, res) => {
//   res.send('index.html')
// })

app.get('/', (req, res) => {
  res.contentType('flv')
  // make sure you set the correct path to your video file storage
  const pathToMovie = '/Users/z/Desktop/test.mp4'
  const proc = ffmpeg(pathToMovie)
    // use the 'flashvideo' preset (located in /lib/presets/flashvideo.js)
    .preset('flashvideo')
    // setup event handlers
    .on('end', () => {
      console.log('file has been converted succesfully')
    })
    .on('error', (err) => {
      console.log(`an error happened: ${err.message}`)
    })
    // save to stream
    .pipe(res, { end: true })
})

app.listen(4000)
