import User from '../../../models/user'

export default async ({ bodymen: { body }, params, user }, res, next) => {
  try {
    let _user = user

    if (params.id !== 'me') {
      const isAdmin = user.role === 'admin'

      if (!isAdmin || params.id.toString() !== user.id.toString()) {
        return res.status(401).json({ error: true, message: 'You can\'t change other user\'s data' })
      }

      _user = await User.findById(params.id)

      if (!_user) {
        return res.status(400).json({ error: true, message: 'Invalid :id parameter' })
      }
    }

    await _user.updateOne(body)

    return res.json({
      user: _user.view(true)
    })
  } catch (err) {
    return next(err)
  }
}
