import User from '../../../models/user'
import * as mail from '../../../services/mail'

export default async ({ params, user, bodymen: { body } }, res, next) => {
  try {
    const _user = await User.findById(params.id)

    if (!_user) {
      return res.status(400).json({ error: true, message: 'Invalid id parameter' })
    }

    if (user.id.toString() !== _user.id.toString()) {
      return res.status(401).json({ error: true, message: 'You can\'t change other user\'s password' })
    }

    await _user.updatePassword(body.password)

    if (user.email) {
      await mail.sendPassword({ to: user.email, password: body.password })
    }

    return res.json({
      success: true
    })
  } catch (err) {
    return next(err)
  }
}
