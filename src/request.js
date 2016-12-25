const fetch = require('node-fetch')

async function play({ ip, port, location, position }) {
  try {
    const res = await fetch(`http://${ip}:${port}/play`, {
      method: 'POST',
      body: `Content-Location: ${location}\nStart-Position: ${position}`,
    })

    if (res.status !== 200) {
      console.log('fail')
      return
    }

    console.log('play succeed')
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  play,
}
