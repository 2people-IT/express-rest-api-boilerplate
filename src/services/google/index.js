import request from 'request-promise'

export const getUser = async (accessToken) => {
  const { id, name, email, picture } = await request({
    uri: 'https://www.googleapis.com/userinfo/v2/me',
    json: true,
    qs: {
      access_token: accessToken
    }
  })

  return {
    picture,
    id,
    name,
    email
  }
}
