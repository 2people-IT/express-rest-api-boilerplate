import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import path from 'path'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env, root } from '../../config'

export default (apiRoot, routes) => {
  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', path.join(root, 'src/views'))

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  return app
}
