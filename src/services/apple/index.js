import crypto from 'crypto'
import appleSignin from 'apple-signin-auth'

export const getUser = async (idToken, nonce) => {
  try {
    const { sub: userAppleId } = await appleSignin.verifyIdToken(idToken, {
      // Optional Options for further verification - Full list can be found here https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
      audience: ['com.app', 'com.app.test'], // client id - can also be an array
      nonce: nonce ? crypto.createHash('sha256').update(nonce).digest('hex') : undefined,
      // If you want to handle expiration on your own, or if you want the expired tokens decoded
      ignoreExpiration: true // default is false
    })

    return {
      id: userAppleId
    }
  } catch (err) {
    console.error('Apple Auth Error', err)
    // Token is not verified

    return { id: null }
  }
}
