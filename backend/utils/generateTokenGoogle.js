import jwt from 'jsonwebtoken'

/**
 * Generates a JWT token and sets it as a cookie in the response.
 * @param {string} userId - The user ID (or other unique identifier).
 * @param {Object} res - The Express response object.
 * @returns {string} - The generated JWT token.
 */
const generateTokenGoogle = (userId, res = null) => {
  // Generate JWT token with a payload that includes the user ID
  const token = jwt.sign({ userId }, process.env.KEUR_EXPRESS, {
    expiresIn: '30d',
  })

  if (res) {
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
  }

  return token
}
export default generateTokenGoogle
