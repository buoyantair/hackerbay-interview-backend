// Server file
require('dotenv').config()
const app = require('./app')

const { PORT } = process.env

app.listen(PORT, () => {
  console.log('Koa server running at http://localhost:3000')
})
