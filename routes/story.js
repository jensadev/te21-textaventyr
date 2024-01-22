const express = require('express')
const router = express.Router()
const pool = require('../db')

router.get('/', async (req, res) => {
  try {
    const [parts] = await pool.promise().query('SELECT * FROM jens_part')
    const [options] = await pool.promise().query('SELECT * FROM jens_option')
    res.json({ parts, options })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [part] = await pool
      .promise()
      .query('SELECT * FROM jens_part WHERE id = ?', [req.params.id])
    const [options] = await pool
      .promise()
      .query('SELECT * FROM jens_option WHERE part_id = ?', [req.params.id])
    res.json({ ...part[0], options })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

module.exports = router
