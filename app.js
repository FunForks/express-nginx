/**
 * app.js
 */

const express = require('express')
const PORT = 8888

const app = express()

app.get('/', (req, res) => {
  const protocol = req.protocol
  const host = req.headers.host
  const origin = req.get("origin") || req.socket.remoteAddress
  
  const message = `<pre>Connection
from ${origin}
to   ${protocol}://${host}
at   ${Date()}</pre>`

  res.send(message)
})

app.listen(PORT, logHostsToConsole)

function logHostsToConsole() {
  // Check what IP addresses are used by this computer
  const nets = require("os").networkInterfaces()
  const ips = Object.values(nets)
  .flat()
  .filter(({ family }) => (
    family === "IPv4")
  )
  .map(({ address }) => address)

  // ips will include `127.0.0.1` which is the "loopback" address
  // for your computer. This address is not accessible from other
  // computers on your network. The host name  "localhost" can be
  // used as an alias for `127.0.0.1`, so you can add that, too.
  ips.unshift("localhost")

  // Log in the Terminal which URLs can connect to your server
  const hosts = ips.map( ip => (
    `http://${ip}:${PORT}`)
  )

  // /private/etc/hosts defines app.org as running at 127.0.0.1
  // and /opt/homebrew/etc/nginx/servers/app.conf creates...
  //
  //   proxy_pass http://127.0.0.1:8888
  //
  // ... so we can connect through http://app.local, too.

  hosts.push("\n  http://app.local")

  console.log(`Express server listening at:
  ${hosts.join("\n  ")}
`);
}
