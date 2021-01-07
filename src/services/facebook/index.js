import request from 'request-promise'

export const getUser = async (accessToken) => {
  const { id, name, email, picture } = await request({
    uri: 'https://graph.facebook.com/me',
    json: true,
    qs: {
      access_token: accessToken,
      fields: 'id, name, email, picture'
    }
  })

  return {
    picture: picture.data.url,
    id,
    name,
    email
  }
}
