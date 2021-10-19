import expressJwt from 'express-jwt'

export const requireSignIn = expressJwt({
  getToken: () => req.cookies.token,
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
})
