import express from 'express'
import dataRoutes from './routes/dataRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
const app = express()

// Api start
app.get('/', (req, res) => {
  res.send('Api is running.....')
})

app.use('/api/data', dataRoutes)

// middleware for not found
app.use(notFound)

//middleware for any error occured
app.use(errorHandler)

// Api listen
app.listen(5000, console.log('Server running......'))
