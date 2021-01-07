import { Router } from 'express'
import { password, facebook, github, google, vk, apple } from '../../services/passport'
import login from './middlewares/login'

const router = new Router()

/**
 * @api {post} /auth/facebook Authenticate with Facebook
 * @apiName AuthenticateFacebook
 * @apiGroup Auth
 * @apiParam {String} access_token Facebook user accessToken.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Invalid credentials.
 */
router.post('/facebook',
  facebook(),
  login)

/**
 * @api {post} /auth/google Authenticate with Google
 * @apiName AuthenticateGoogle
 * @apiGroup Auth
 * @apiParam {String} access_token Google user accessToken.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Invalid credentials.
 */
router.post('/google',
  google(),
  login)

/**
 * @api {post} /auth/github Authenticate with Github
 * @apiName AuthenticateGithub
 * @apiGroup Auth
 * @apiParam {String} access_token Github user accessToken.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Invalid credentials.
 */
router.post('/github',
  github(),
  login)

/**
 * @api {post} /auth/apple Authenticate with Apple
 * @apiName AuthenticateApple
 * @apiGroup Auth
 * @apiParam {String} access_token Apple user accessToken.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Invalid credentials.
 */
router.post('/apple',
  apple(),
  login)

/**
 * @api {post} /auth/vk Authenticate with Vk
 * @apiName AuthenticateVk
 * @apiGroup Auth
 * @apiParam {String} access_token Vk user accessToken.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Invalid credentials.
 */
router.post('/vk',
  vk(),
  login)

/**
 * @api {post} /auth Authenticate with Email and Password
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiPermission public
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Master access only or invalid credentials.
 */
router.post('/',
  password(),
  login)

export default router
