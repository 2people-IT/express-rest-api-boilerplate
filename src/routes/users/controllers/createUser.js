import User from '../../../models/user'
import * as mail from '../../../services/mail'

export default async ({ bodymen: { body } }, res, next) => {
  try {
    let user = await User.findOneByEmail(body.email)

    if (user) {
      return res.status(400).json({ error: true, message: 'Email already registered' })
    }

    user = await User.create(body)

    await mail.sendPassword({ to: body.email, password: body.password })

    return res.json({
      user: user.view(true)
    })
  } catch (err) {
    return next(err)
  }
}
