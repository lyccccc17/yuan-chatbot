const _ = require('lodash')
const { liffIds } = require('../libs/helpers')
const createError = require('http-errors')
const express = require('express')

const router = express.Router()

const LIFF_GRT_RENDER = {
  share: async (req, res) => {
    res.render('share')
  },
}

router.param('size', async (req, res, next, size) => {
  if (!_.includes(['full', 'tall', 'compact'], size)) next(createError('無效 size'))

  // 設定一些常用的輔助函式
  res.locals.liffId = liffIds[size]
  next()
})

router.use('/:size', async (req, res, next) => {
  try {
    console.log('router.use', req.url)
    const path = new URL(req.url, 'https://localhost').pathname.slice(1)
    if (LIFF_GRT_RENDER[path]) return await LIFF_GRT_RENDER[path](req, res)
    return res.render('endpoint')
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router
