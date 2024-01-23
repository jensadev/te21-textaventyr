const express = require('express')
const router = express.Router()

const story = require('../data/story.json')

router.get('/', function (req, res) {
  console.log(story.parts[0])
  res.render('index.njk', {
    username: req.session.username,
    title: 'Welcome',
    part: story.parts[0],
  })
})

router.get('/story', function (req, res) {
  const part = story.parts.find((part) => part.id === 0)
  res.render('part.njk', {
    username: req.session.username,
    title: part.name,
    part: part,
  })
})

router.post('/username', function (req, res) {
  req.session.username = req.body.username
  console.log(req.session.username)
  res.redirect('/story/0') // story/0
})

router.get('/story/:id', function (req, res) {
  let part = story.parts.find((part) => part.id === parseInt(req.params.id))
  if (!part) {
    res.status(404).render('404.njk', { title: '404' })
    return
  }

  const name = part.name.replace('[PLAYER]', req.session.username)
  part = { ...part, name: name }
  res.render('part.njk', { title: name, part: part })
})

const pool = require('../db')

router.get('/dbtest', async (req, res) => {
  try {
    const [parts] = await pool.promise().query('SELECT * FROM jens_part')
    res.json({ parts })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = router
