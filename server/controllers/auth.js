import User from '../models/user'
import { hashPassword, comparePassword } from '../utils/auth'

export const register = async (req, res) => {
  try {
    // console.log(req.body)
    const { name, email, password } = req.body
    // validation
    if (!name) return await res.status(400).send('Name is required')
    if (!password || password.length < 6) {
      return await res
        .status(400)
        .send('password should be min 6 characters long ')
    }
    let userExist = await User.findOne({ email }).exec()
    if (userExist) return await res.status(400).send('Email is  already taken')

    // hashPassword
    const hashedPassword = await hashPassword(password)

    // register
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    })
    await user.save()
    // console.log('saved user', user)
    return await res.json({ ok: true })
  } catch (error) {
    console.log(error)
    return await res.status(400).send('ERROR..!! Try again..')
  }
}
