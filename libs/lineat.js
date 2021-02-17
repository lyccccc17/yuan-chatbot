const { getenv } = require('../libs/helpers')
const line = require('@line/bot-sdk')

const config = {
  channelId: getenv('DEV_LINE_CHANNEL_ID'),
  channelSecret: getenv('DEV_LINE_CHANNEL_SECRET'),
  channelAccessToken: getenv('DEV_LINE_CHANNEL_ACCESSTOKEN'),
}

const client = new line.Client(config)

module.exports = {
  line,
  client,
  middleware: line.middleware(config),
}
