const Jwt = require('jsonwebtoken');

if (!process.env.SECRETKEY) {
  console.log("No sercret key is found");
  throw new Error("No Secret Key is found")
};

const secretKey = process.env.SECRETKEY;

class JwtProvider {
  constructor(secretKey) {
    this.SECRETKEY = secretKey
  }
  createJwt(payload) {
    return Jwt.sign(payload, this.SECRETKEY, { expiresIn: "7d" })
  }
  createJwtAccessToken(payload) {
    return Jwt.sign(payload, this.SECRETKEY, { expiresIn: "2h" })
  }

  getEmailFromJwt(token) {
    try {
      const decode = Jwt.verify(token, this.SECRETKEY);

      return decode.email;

    } catch (error) {
      console.log("Error Message:", error.message);
      throw new Error("Invalid Token");
    }

  }

  verifyJwtToken(token) {
    try {
      return Jwt.verify(token, this.SECRETKEY);

    } catch (error) {
      console.log("Error Message:", error.message);
      throw new Error("Invalid Token")
    }
  }

  createAccessTokenFromRefreshToken(refreshToken) {
    try {
      const decoded = Jwt.verify(
        refreshToken,
        this.SECRETKEY
      );

      const { iat, exp, ...payload } = decoded;

      return this.createJwtAccessToken(payload);
    } catch (error) {
      throw new Error("Invalid Refresh Token");
    }
  }
}

module.exports = new JwtProvider(secretKey);