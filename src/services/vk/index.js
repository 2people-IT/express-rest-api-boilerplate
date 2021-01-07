import request from 'request-promise'
import queryString from 'query-string'
import { vk } from '../../config'

export const getUser = (accessToken) =>
  request({
    uri: 'https://api.vk.com/method/users.get?v=5.103&access_token=' + accessToken,
    json: true
  }).then(({ response }) => {
    /* eslint-disable camelcase */
    const { id, first_name, last_name, email } = response[0]

    return {
      id,
      email,
      name: `${last_name} ${first_name}`
    }
    /* eslint-enable camelcase */
  })

const getAccessTokenFromCode = async (code) => {
  const params = queryString.stringify({
    client_id: vk.clientId,
    client_secret: vk.clientSecret,
    redirect_uri: vk.redirectUri,
    code
  })

  const response = await request({
    method: 'GET',
    uri: `https://oauth.vk.com/access_token?${params}`,
    json: true
  })

  if (!response || !response.access_token) {
    throw new Error('Invalid reponse vk get token', response)
  }

  return response.access_token
}

export const getUserByCode = async (code) => {
  const accessToken = await getAccessTokenFromCode(code)
  return getUser(accessToken)
}
