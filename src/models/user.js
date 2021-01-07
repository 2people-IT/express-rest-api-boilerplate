import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import { env } from '../config'

const roles = ['user', 'admin']

const userSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/
    // trim: true,
    // lowercase: true
  },
  password: {
    type: String,
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  services: {
    facebook: String,
    github: String,
    google: String,
    vk: String,
    apple: String
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  picture: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

userSchema.index({ email: 1 }, { sparse: true })

userSchema.path('email').set(function (email) {
  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1')
  }

  return email
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view (full) {
    const view = {}
    let fields = ['id', 'name', 'picture']

    if (full) {
      fields = [...fields, 'email', 'createdAt']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  },

  async updateOne (data) {
    Object.assign(this, data)
    await this.save()

    return this
  },

  async updatePassword (password) {
    this.password = password
    await this.save()

    return this
  }
}

userSchema.statics = {
  roles,

  async createFromService ({ service, id, email, name, picture }) {
    let user = await this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] })

    if (!user) {
      user = await this.create({
        services: { [service]: id },
        name,
        picture,
        ...(email ? { email } : {})
      })
    }

    return user
  },

  async findOneByEmail (email) {
    return this.findOne({ email })
  },

  async createFromEmail ({ email, password, name, picture }) {
    return this.create({
      email,
      password,
      name,
      picture
    })
  }
}

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model
