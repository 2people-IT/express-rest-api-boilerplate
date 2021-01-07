/* eslint-disable no-unused-vars */
import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.config({
    path: path.join(__dirname, '../.env'),
    example: path.join(__dirname, '../.env.example')
  })
}

const root = path.join(__dirname, '..')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root,
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    defaultEmail: 'no-reply@express-rest-api-boilerplate.com',
    sendgridKey: requireProcessEnv('SENDGRID_KEY'),
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    passwordLength: 6,
    vk: {
      clientId: requireProcessEnv('VK_CLIENT_ID'),
      clientSecret: requireProcessEnv('VK_CLIENT_SECRET'),
      redirectUri: requireProcessEnv('VK_REDIRECT_URI')
    },
    mail: {
      host: requireProcessEnv('MAIL_HOST'),
      port: requireProcessEnv('MAIL_PORT'),
      login: requireProcessEnv('MAIL_LOGIN'),
      password: requireProcessEnv('MAIL_PASSWORD'),
      from: requireProcessEnv('MAIL_FROM'),
      templatesPath: path.join(root, 'src/views/mails')
    },
    mongo: {
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
    }
  },
  test: { },
  development: {
    mongo: {
      uri: 'mongodb://localhost/express-rest-api-boilerplate-dev',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/express-rest-api-boilerplate'
    }
  }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports