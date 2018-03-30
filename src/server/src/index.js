import express from 'express'
import cors from 'cors'
import renderer from './helpers/renderer'
import App from '../../client/src/containers/App'


const app = express()
const port = 3000

app.use(cors())

app.get('*', (req, res, next ) => {
  res.send(renderer())
})

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})