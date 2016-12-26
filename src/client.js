const { parse } = require('querystring')
const fetch = require('node-fetch')

module.exports = class Request {
  constructor({ ip, port }) {
    // this.ip = ip
    // this.port = port
    this.fetch = (url, options) => fetch(`http://${ip}:${port}/${url}`, options)
  }

  async play({ location, position }) {
    const res = await this.fetch('/play', {
      method: 'POST',
      body: `Content-Location: ${location}\nStart-Position: ${position}`,
    })

    if (res.status !== 200) {
      throw new Error('fail')
    }

    return true
  }

  async getPosition() {
    const res = await this.fetch('/scrub')
    const text = await res.text()
    return parse(text, '\n', ' ')
  }
}
