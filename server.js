// server.js
require('dotenv').config({
  path: 'variables.env'
})

const express = require('express')
const cors = require('cors')
const webPush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

app.use(
  express.static(
    path.join(__dirname, 'client')
  )
)

const publicVapidKey =
  process.env.PUBLIC_VAPID_KEY
const privateVapidKey =
  process.env.PRIVATE_VAPID_KEY

webPush.setVapidDetails(
  'mailto:test@example.com',
  publicVapidKey,
  privateVapidKey
)
const subscriptions = []
app.post('/subscribe', (req, res) => {
  const subscription = req.body
  res.status(201).json({})
  console.log(req.body)

  const payload = JSON.stringify({
    title:
      'Push notifications with Service Workers'
  })
  subscriptions.push()
  webPush
    .sendNotification(
      subscription,
      payload
    )
    .catch(error =>
      console.error(error)
    )
})

app.set(
  'port',
  process.env.PORT || 5000
)
const server = app.listen(
  app.get('port'),
  () => {
    console.log(
      `Express running → PORT ${
        server.address().port
      }`
    )
  }
)
