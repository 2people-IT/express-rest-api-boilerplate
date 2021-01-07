import { sign } from '../../../services/jwt'

export default async ({ user }, res, next) => {
  try {
    const token = await sign(user.id)

    return res.json({
      token,
      user: user.view(true)
    })
  } catch (err) {
    return next(err)
  }
}
