import User from '../../../models/user'

export default async ({ querymen: { query, select, cursor } }, res, next) => {
  try {
    const count = await User.count(query)
    const users = await User.find(query, select, cursor)

    return res.render('users', {
      title: 'Users',
      emailsVisible: true,
      users: users.map((user) => user.view(true)),
      count
    })
  } catch (err) {
    return next(err)
  }
}
