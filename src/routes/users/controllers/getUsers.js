import User from '../../../models/user'

export default async ({ querymen: { query, select, cursor } }, res, next) => {
  try {
    const count = await User.count(query)
    const users = await User.find(query, select, cursor)

    return res.json({
      rows: users.map((user) => user.view()),
      count
    })
  } catch (err) {
    return next(err)
  }
}
