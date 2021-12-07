const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
let auth = require('./var')

app.get('/api', (req, res) => {

  const AuthStr = `Bearer ${auth.token.token}`
          
  axios.get('https://api.givebutter.com/v1/campaigns/52418', {headers: {Authorization: AuthStr}})
    .then(response => res.send(response.data))
    .catch(err => console.error(err));
})

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})