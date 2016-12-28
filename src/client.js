/**
 * https://nto.github.io/AirPlay.html
 */

const { parse } = require('querystring')
const fetch = require('node-fetch')

module.exports = class Request {
  constructor({ ip, port }) {
    this.fetch = (url, options) => fetch(`http://${ip}:${port}${url}`, options)
  }

  async post(url) {
    const res = this.fetch(url, { method: 'POST' })
    return res.status === 200
  }

  async getServerInfo() {
    const res = this.fetch('/server-info')
    const text = await res.text()
    return text
  }

  async play({ location, position }) {
    const res = await this.fetch('/play', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/parameters',
      },
      body: `Content-Location: ${location}\nStart-Position: ${position}`,
    })
    return res.status === 200
  }

  setPosition(position) {
    return this.post(`/scrub?position=${position}`)
  }

  setRate(rate) {
    return this.post(`/rate?value=${rate}`)
  }

  stop() {
    return this.post('/stop')
  }

  async getPosition() {
    const res = await this.fetch('/scrub')
    const text = await res.text()
    return parse(text, '\n', ': ')
  }

  async getPlayBackInfo() {
    const res = await this.fetch('/playback-info')
    const text = await res.text()
    return text
  }
}
