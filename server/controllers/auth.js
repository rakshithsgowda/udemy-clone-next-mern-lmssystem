import jwt from 'jsonwebtoken'
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
  } catch (err) {
    console.log(err)
    return await res.status(400).send('ERROR..!! Try again..')
  }
}

export const login = async (req, res) => {
  try {
    // console.log(req.body)
    const { email, password } = req.body
    // check if our db has user with that email
    const user = await User.findOne({ email }).exec()
    if (!user) return res.status(400).send('No user found')
    // check password
    const match = await comparePassword(password, user.password)
    // create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    // return user and token to client, exclude hashed password
    user.password = undefined
    // sending token in cokkiiee
    res.cookie('token', token, {
      httpOnly: true,
      // secure:true
      // only works on https
    })
    // send user as a json response
    res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(400).send('Error. Try again')
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('token')
    return res.json({ message: 'signout successfull' })
  } catch (err) {
    console.log(err)
  }
}
