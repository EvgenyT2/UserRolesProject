require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { users } = require('./data')

app.use(express.json())
app.use(cors())


app.post('/login', (req, res) => {

  const username = req.body.username
  const user = { name: username }

  const password = req.body.password

  const dbUser = users.find(user => user.username === username)

  if (dbUser.password !== password) {
    res.sendStatus(401)
  } 

  const accessToken = generateAccessToken(user)
  res.json({ accessToken: accessToken })
})

app.get('/home', authenticateToken, (req, res) => {
  res.json(users.filter(user => user.username === req.user.name))
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' })
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401)
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err)
    if (err) {
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}

app.listen(4000, () => {
	console.log('Server up at 4000')
})