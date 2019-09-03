const express = require('express')
const cors = require('cors')
const app = express()
const fetch = require('node-fetch')

app.use(cors())

app.get('/mentions/:query', function (req, res, next) {
  const apiUrl = `https://community.fandom.com/api.php?action=query&list=allusers&auprefix=${req.params.query}&format=json`
  
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      console.error(err)
    });
})

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 80')
})