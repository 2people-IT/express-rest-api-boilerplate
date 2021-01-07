import User from '../../../models/user'

export default async ({ params }, res, next) => {
  try {
    const user = await User.findById(params.id)

    if (!user) {
      return res.status(400).json({ error: true, message: 'Invalid :id parameter' })
    }

    await user.remove()

    return res.json({
      success: true
    })
  } catch (err) {
    return next(err)
  }
}
